define([
  'jquery','underscore','backbone',
  'leaflet',
  'esri.leaflet',
  'leaflet.draw',
  'leaflet.label',
  'leaflet.markercluster',
  'proj4.leaflet',
  'proj4',
  'text!./mapTemplate.html'
], function(
  $, _, Backbone,
  leaflet,
  esriLeaflet,
  leafletDraw,
  leafletLabel,
  markercluster,
  proj4Leaflet,
  proj4,
  template
){
  var MapView = Backbone.View.extend({
    initialize : function(){
      //console.log('MapView.initialize')

      // set up an empty layer group for all our overlay and basemap layers
      this._layerGroup = new L.layerGroup()
      this._baseLayerGroup = new L.layerGroup()
      this.viewUpdating = false      

      this.listenTo(this.model, "change:active",        this.handleActive);
      this.listenTo(this.model, "change:view",          this.handleViewUpdate);

      this.listenTo(this.model, "change:baseLayers",    this.handleBaseLayersUpdate);
      this.listenTo(this.model, "change:addLayers",     this.handleAddLayersUpdate);
      this.listenTo(this.model, "change:removeLayers",  this.handleRemoveLayersUpdate);
      this.listenTo(this.model, "change:activeLocation", this.handleLayersUpdate);
      this.listenTo(this.model, "change:filteredLocations", this.handleLocationsUpdate);

      this.listenTo(this.model, "change:customLayerEdit", this.handleCustomsUpdate);
      this.listenTo(this.model, "change:customLayerData", this.handleCustomsUpdate);
      this.listenTo(this.model, "change:mapControl",   this.mapControl);
      this.listenTo(this.model, "change:invalidateSize",   this.invalidateSize);

      this.render()

      var that = this
      waitFor(
        function(){ return that.model.mapConfigLoaded() },
        function(){ that.configureMap() }
      )
    },
    render : function(){
      //console.log('MapView.render')
      this.$el.html(_.template(template)({t:tlang}))
      var that = this
      waitFor(
        function(){
          return that.model.mapConfigured()
        },
        function(){
          that.updateBaseLayers()
        }
      )
      return this
    },
    // map configuration has been read
    configureMap : function(){
      //console.log('MapView.configureMap')

      // set map options
      var config = this.model.getConfig()
      this.model.setMapOptions(config.mapOptions)

      // initialise custom projections
      this.initProjections() // updates mapOptions

      // initialise leaflet map
      this._map = L.map(
        config.mapID,
        this.model.getMapOptions()
      )
      .on('zoomstart', _.bind(this.onZoomStart, this))
      .on('movestart', _.bind(this.onMoveStart, this))
      .on('zoomend', _.bind(this.onZoomEnd, this))
      .on('moveend', _.bind(this.onMoveEnd, this))
      .on("resize",  _.debounce(_.bind(this.resize, this), 500))
      
      // init draw
      this.initDraw()
      
      
      // position map on current view
      this.updateMapView()

      this._zoomControl = L.control.zoom({
        zoomInText:'<span class="icon-wwf_plus"></span>',
        zoomOutText:'<span class="icon-wwf_minus"></span>'
      })
      var attControl = 
        L.control.attribution({position:'bottomleft'})
        .setPrefix('')
        .addAttribution(this.model.getConfig().attribution)
      this._map.addControl(attControl)

      // set up an empty layer group for all our overlay and basemap layers
      this._layerGroup.addTo(this._map)
      this._baseLayerGroup.addTo(this._map)

      this.model.setMap(this._map) // HACK
      this.model.mapConfigured(true)

    },
    initProjections : function(){
      //console.log('MapView.initProjections')
      // initialise proj4 definitions
      if (typeof this.model.getConfig().proj4defs !== 'undefined') {
        proj4.defs(this.model.getConfig().proj4defs)
      }


      // set map projection
      var projection = this.model.getConfig().projection
      if (typeof projection !== 'undefined') {
        this.model.setCrs(new L.Proj.CRS(
          projection.crs,
          projection.proj4def,
          {
            resolutions: projection.resolutions,
            origin: projection.origin// for zoom level 1: resolution(px)
          })
        )
        this.model.setMapOptions(
          _.extend(this.model.get('mapOptions'), {crs:this.model.getCrs()})
        )
      }
    },
    initDraw : function(){
      // Initialise the draw control and pass it the FeatureGroup of editable layers

      this._map.on('draw:created', _.bind(this.onDrawCreated,this));
      this._map.on('draw:edited', _.bind(this.onDrawEdited,this));
      this._map.on('draw:deleted', _.bind(this.onDrawDeleted,this));
      
      this.updateCustomLayers()

    },
    updateMapView : function(){
//      console.log('MapView.updateMapView ')      
      var currentView = this.model.getView()

      // check if pre-configured view
      if (currentView !== null && typeof currentView === 'string') {
        currentView = this.model.getConfigView(currentView)
      }

      if ( currentView !== null
              && typeof currentView !== 'undefined'
              && typeof currentView.center !== 'undefined'
              && typeof currentView.zoom !== 'undefined'
              && typeof currentView.dimensions !== 'undefined' ){

        if (this.model.mapConfigured()){
          var zoomUpdated = this.getZoomForDimensions(currentView)

          // check if change really necessary
          if ( this._map.getZoom() !== zoomUpdated
                || this.roundDegrees(this._map.getCenter().lat) !== currentView.center.lat
                || this.roundDegrees(this._map.getCenter().lng) !== currentView.center.lng) {
            this._map.setView(currentView.center, zoomUpdated,{animate:true})            
          }
        } else {
          // todo not sure about this one
          var defaultView = this.model.getDefaultView()
          this._map.setView(defaultView.center,this.getZoomForDimensions(defaultView),{animate:true})
        }
      } else {
        var defaultView = this.model.getDefaultView()
        this._map.setView(defaultView.center,this.getZoomForDimensions(defaultView),{animate:true})
      }

      this.triggerMapViewUpdated()
      
    },

    updateBaseLayers : function() {
      this._baseLayerGroup.clearLayers()

      var that = this
      this.model.getBaseLayers().each(function(layer){
        layer.getMapLayer(
          function(mapLayer){
            that._baseLayerGroup.addLayer(mapLayer)
          },
          {
            map:that._map
          }
        )
      })
    },
    refreshLayers : function() {
      var that = this

    },
    addLayers : function(){
      var layers = this.model.getAddLayers()
      var that = this
      if (layers.length){
        // add new layers
        _.each(layers,function(layer){
          layer.getMapLayer(
            function(mapLayer, layer){
              if (layer.getType() === "raster") {
//                console.log('map.addlayerraster: ' + layer.id)
               
                that._layerGroup.addLayer(mapLayer)
              }
            },
            {
              map:that._map
            }
          )
        })
        // wait for all layers (execpt raster to be loaded before adding to map to keep correct order
        waitFor(
          function(){
            return !that.model.activeLayersLoading()
          },
          function(){
            _.each(layers,function(layer){
              if (layer.getType() !== "raster") {
                layer.getMapLayer(
                  function(mapLayer, layer){
//                    console.log('map.addlayer: ' + layer.id)
                    
                    // wait for map view change to be finished before adding layers
                    waitFor(
                      function(){
                        return !that.zooming && !that.moving
                      },
                      function(){
                        that._layerGroup.addLayer(mapLayer)
                        // fade animate
                        if(layer.fadeEnabled()) {
                          that.$('.leaflet-overlay-pane .wwf-layer-'+layer.id).animate({opacity:1},'fast', 'linear')
                        }
                      }
                    )
                  },
                  {
                    map:that._map
                  }
                )
              }
            })
            that.model.setAddLayers([])
          }
        )
      }
    },
    removeLayers : function(){
      var layers = this.model.getRemoveLayers()
      var that = this
      if (layers.length){
        _.each(layers,function(layer){
          //console.log('map.removelayer: ' + layer.id)
          layer.getMapLayer(
            function(mapLayer, layer){

              if(layer.fadeEnabled()) {
                that.$('.leaflet-overlay-pane .wwf-layer-'+layer.id).animate({opacity:0},'fast', 'linear').promise().done(function(){
                  that._layerGroup.removeLayer(mapLayer)
                })
              } else {
                that._layerGroup.removeLayer(mapLayer)
              }

            },
            {
              map:that._map
            }
          )
          if (layer.isCustom()){
            if (layer.getDrawControl()._map) {
              this._map.removeControl(layer.getDrawControl())
            }
          }
        },this)
      }
    },


    updateCustomLayers : function() {
      
      _.each(this.model.getActiveLayers(),function(layer){
        if (layer.isCustom()){
          if (layer.isEdit()){
            if (!layer.getDrawControl()._map) {
              this._map.addControl(layer.getDrawControl())
              
              this.$('.leaflet-draw-draw-polyline').html("<span class='icon-wwf_line'></span>")
              this.$('.leaflet-draw-draw-polygon').html("<span class='icon-wwf_polygon'></span>")
              this.$('.leaflet-draw-draw-rectangle').html("<span class='icon-wwf_square'></span>")
              this.$('.leaflet-draw-draw-circle').html("<span class='icon-wwf_circle'></span>")
              this.$('.leaflet-draw-draw-marker').html("<span class='icon-wwf_marker'></span>")
              this.$('.leaflet-draw-draw-note').html("<span class='icon-wwf_type'></span>")
              this.$('.leaflet-draw-edit-edit').html("<span class='icon-wwf_edit'></span>")
              this.$('.leaflet-draw-edit-remove').html("<span class='icon-wwf_remove'></span>")
              
            }
          } else {
            if (layer.getDrawControl()._map) {
              this._map.removeControl(layer.getDrawControl())
            }
          }
        }
      },this)            

    },









    // event handlers for model change events
    handleActive : function(){
      //console.log('MapView.handleActive')
      if (this.model.isActive()) {
        this.$el.show()
        var that = this
        waitFor(
          function(){
            return that.model.mapConfigured()
          },
          function(){
            that.invalidateSize(false);
          }
        )
      } else {
        this.$el.hide()
      }
    },

    handleViewUpdate : function(){
      //console.log('MapView.handleViewUpdate')
      var that = this
      // wait for config files to be read
      waitFor(
        function(){
          return that.model.mapConfigured()
        },
        function(){
          that.updateMapView()
        }
      )
    },
    handleLocationsUpdate : function(){
      //console.log('MapView.handleLocationsUpdate')
      var that = this
      // wait for config files to be read
      waitFor(
        function(){
          return that.model.mapConfigured()
        },
        function(){
          that.refreshLayers()
        }
      )
    },
    handleLayersUpdate : function(){
      //console.log('MapView.handleLayersUpdate')
      var that = this
      // wait for config files to be read
      waitFor(
        function(){
          return that.model.mapConfigured()
        },
        function(){
          that.refreshLayers()
        }
      )
    },
    handleAddLayersUpdate : function(){
//      console.log('MapView.handleLayersUpdate')
      var that = this
      // wait for config files to be read
      waitFor(
        function(){
          return that.model.mapConfigured()
        },
        function(){
          that.addLayers()
        }
      )
    },
    handleRemoveLayersUpdate : function(){
      //console.log('MapView.handleLayersUpdate')
      var that = this
      // wait for config files to be read
      waitFor(
        function(){
          return that.model.mapConfigured()
        },
        function(){
          that.removeLayers()
        }
      )
    },
    handleBaseLayersUpdate : function(){
      //console.log('MapView.handleBaseLayersUpdate')
      var that = this
      // wait for config files to be read
      waitFor(
        function(){
          return that.model.mapConfigured()
        },
        function(){
          that.updateBaseLayers()
        }
      )
    },
    handleCustomsUpdate : function(){
      //console.log('MapView.handleCustomsUpdate')
      var that = this
      // wait for config files to be read
      waitFor(
        function(){
          return that.model.mapConfigured()
        },
        function(){
          that.updateCustomLayers()
        }
      )

    },
    mapControl : function(){
      var that = this
      // wait for config files to be read
      waitFor(
        function(){
          return that.model.mapConfigured()
        },
        function(){
          if (that.model.getMapControl()) {
            
            that.$el.removeClass('control-disabled')
            
            // zoomControl
            if (!that._zoomControl._map) {
              that._zoomControl.addTo(that._map)
            }
            
            // interactions
            that.enableInteractions()
                    
            
          } else {
            
            that.$el.addClass('control-disabled')
            
            // zoomControl
            if (that._zoomControl._map) {
              that._zoomControl.removeFrom(that._map)
            }
            
            // interactions
            that.disableInteractions()
            
          }
        })
    },
    
    enableInteractions:function(){
      // interactions
      this._map.dragging.enable()
      this._map.touchZoom.enable()
      this._map.doubleClickZoom.enable()
      this._map.scrollWheelZoom.enable()
      this._map.boxZoom.enable()
      if (typeof this._map.tap !== 'undefined') {
        this._map.tap.enable()           
      }

    },
    disableInteractions:function(){
      // interactions
      this._map.dragging.disable()
      this._map.touchZoom.disable()
      this._map.doubleClickZoom.disable()
      this._map.scrollWheelZoom.disable()
      this._map.boxZoom.disable()
      if (typeof this._map.tap !== 'undefined') {
        this._map.tap.disable()           
      }

    },

    // event Handlers for view events
    resize : function (){
      //console.log('MapView.resize')
      this.updateMapView()
    },
    invalidateSize : function (animate){
      //console.log('MapView.invalidateSize')
      animate = typeof animate !== 'undefined' ? animate : false
      if (typeof this._map !== 'undefined' ) {
        this._map.invalidateSize(animate)
      }
    },
    onZoomStart : function(e) {
//      console.log('MapView.onZoomStart')

      // make sure map state really changed
      this.zooming = true

    },
    onMoveStart : function(e) {
      //console.log('MapView.onMoveStart')
      this.moving = true
    },
    onZoomEnd : function(e) {
//      console.log('MapView.onZoomEnd')
      this.zooming = false
      this.triggerMapViewUpdated()

    },
    onMoveEnd : function(e) {
      //console.log('MapView.onMoveEnd')
      this.moving = false
      this.triggerMapViewUpdated()
    },
    onDrawCreated : function(e) {
      // also consider https://github.com/dwilhelm89/compress-geojson or https://github.com/sapienlab/jsonpack      
      
      var geojson = e.layer.toGeoJSON()      
      geojson.properties.featureid = Math.random().toString(36).slice(-5)
      geojson.properties.type = e.layerType
      
      // type specific stuff
      var that = this            
      // round coordinates
      if (geojson.geometry.type === 'Polygon') {
        geojson.geometry.coordinates[0] = _.map(geojson.geometry.coordinates[0],function(pt){
          return [this.roundDegrees(pt[0]),this.roundDegrees(pt[1])]
        },this)
      }
      if (geojson.geometry.type === 'Point') {
        geojson.geometry.coordinates = [
          this.roundDegrees(geojson.geometry.coordinates[0]),
          this.roundDegrees(geojson.geometry.coordinates[1])
        ]        
      }      
      // remember type specific fields
      if (e.layerType === 'circle') {
        geojson.properties.radius = Math.round(e.layer._mRadius)
      }

      
      this.$el.trigger('customUpdated',{
        layer:{
          id:this.model.get('customLayerEdit'),
          shapes:[geojson]
        }
      })
    },
    onDrawEdited : function(e) {
//      				if (layerType === undefined) { layerType = 'note'};

          
      var shapes = []
      var that = this
      e.layers.eachLayer(function (layer) {
        var geojson = layer.toGeoJSON()  
        
        // GEO type sepcific stuff
        // round coordinates
        if (geojson.geometry.type === 'Polygon') {
          geojson.geometry.coordinates[0] = _.map(geojson.geometry.coordinates[0],function(pt){
            return [that.roundDegrees(pt[0]),that.roundDegrees(pt[1])]
          })
        }        
        if (geojson.geometry.type === 'Point') {
          geojson.geometry.coordinates = [
            that.roundDegrees(geojson.geometry.coordinates[0]),
            that.roundDegrees(geojson.geometry.coordinates[1])
          ]        
        }
        // SHAPE type sepcific stuff        
        if (layer.feature.properties.type === 'circle') {
          geojson.properties.radius = Math.round(_.values(e.layers._layers)[0]._mRadius)
        }

        shapes.push(geojson)
      });
      

      
      this.$el.trigger('customUpdated',{
        layer:{
          id:this.model.get('customLayerEdit'),
          shapes:shapes
        }
      })
    },
    onDrawDeleted : function(e) {
//      				if (layerType === undefined) { layerType = 'note'};

      var shapes = []      
      var that = this
       e.layers.eachLayer(function (layer) {
        shapes.push(layer.feature.properties.featureid)
      });
      this.$el.trigger('customDeleted',{
        layer:{
          id:this.model.get('customLayerEdit'),
          shapes:shapes
        }
      })
    },

    // event triggers (upstream)
    triggerMapViewUpdated : function() {

      //console.log('MapView.triggerMapViewUpdated ')

      // make sure only one event gets broadcasted
      // when map is moved and zoomed at the same time
      if (!this.viewUpdating) {
        var that = this
        this.viewUpdating = true
        waitFor(
          function(){
            return that.model.mapConfigured() && that.model.getView()!== null
          },
          function(){
            that.viewUpdating = false
            var view = that.model.getView()
            if (typeof view !== 'undefined'
              && (view.zoom !== that._map.getZoom()
              || view.center.lat !== that.roundDegrees(that._map.getCenter().lat)
              || view.center.lng !== that.roundDegrees(that._map.getCenter().lng)
              || !_.isEqual(view.dimensions, that.getDimensions()))) {
              that.$el.trigger('mapViewUpdated',{
                zoom : that._map.getZoom(),
                center : {
                  lat:that.roundDegrees(that._map.getCenter().lat),
                  lng:that.roundDegrees(that._map.getCenter().lng)
                },
                dimensions : that.getDimensions()
              })
            }
          }
        )
      }
    },


    // UTILS
    getDimensions : function() {
      return [this.$el.innerWidth(),this.$el.innerHeight()]
    },
    getZoomOffset : function(view) {

      var dimActual = this.getDimensions()
      var printMargin = this.model.getMode() === 'print'
        ? this.model.attributes.config.printMargin * 2
        : 0
      var dim = [view.dimensions[0] - printMargin, view.dimensions[1] - printMargin]

      var factor = 1
      var offset = 0
      var zoomed = 1

      // if actual dimensions wider > scale height
      if (dimActual[0]/dimActual[1] > dim[0]/dim[1]){
        factor = dimActual[1]/dim[1]
      } else {
        factor = dimActual[0]/dim[0]
      }

      // factor 1 >> no zoom level change for factor 1
      if (factor === 1) {
        return offset

      // factor > 1  >> test higher zoom levels
      } else if (factor > 1) {

        while (zoomed*1.9 < factor) {
          zoomed = zoomed*2
          offset++
        }

      // factor < 1  >> test lower zoom levels
      } else {

        var offset = 0
        var zoomed = 1

        while (zoomed > factor) {
          zoomed = zoomed/2
          offset--
        }
      }
      return offset
    },
    getZoomForDimensions : function(view) {
      return Math.max(
        Math.min(
          view.zoom + this.getZoomOffset(view),
          this._map.getMaxZoom()
        ),
        this._map.getMinZoom()
      )

    },
    setZoomClass : function(){
      // remove previous zoom class
      this.$el.removeClass (function (index, classes) {
        return (classes.match (/\bzoom-level-\S+/g) || []).join(' ');
      });
      // set new zoom class
//      this.$el.addClass('zoom-level-' + this._map.getZoom());
      this.$el.addClass('zoom-level-' + this.model.getZoom());
    },
    roundDegrees : function(value){
      //round to 4 decimals
      return Math.round(value * 10000) / 10000
    }



  });

  return MapView;

});
