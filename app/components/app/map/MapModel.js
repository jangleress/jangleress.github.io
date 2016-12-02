define([
  'jquery', 'underscore', 'backbone',
  'leaflet'
], function(
  $,_, Backbone,
  leaflet
){

  var MapModel = Backbone.Model.extend({
    initialize : function(options){
      this.options = options || {};

      this.set('activeLayers',[])
      this.set('removeLayers',[])
      this.set('addLayers',[])
      this.set('keepLayers',[])

      this.set('mapConfigured',false)
      
      this.set('mapControl',null)
//      this.loadMapConfig()
      this.processMapConfig()
    },
    processMapConfig : function(){
      this.setConfigViews(this.attributes.config.views)
    },
    preloadLayer :function(layer){
      if (layer.get("type") !== 'point'
        && layer.get("type") !== 'raster'
      ) {
        layer.getMapLayer(
          function(){},
          {
            map:this.attributes.map
          }
        )
      }
    },
    getConfig : function(){
      return this.attributes.config
    },
    getMapOptions : function(){
      var options = _.clone(this.attributes.mapOptions)

      if (this.getMode() === 'print') {
        options.maxZoom = options.maxZoom + 2
      }

      return options
    },
    mapConfigLoaded : function(){
        return typeof this.attributes.config !== 'undefined'
    },
    mapConfigured : function(val){
      if (typeof val !== 'undefined') {
        return this.set('mapConfigured',val)
      } else {
        return this.attributes.mapConfigured
      }
    },
    setView : function(view){
      this.set('view',view)
    },
    getView : function (){
      return this.attributes.view
    },
    setConfigViews : function(views){
      this.set('configViews',views)
    },
    getConfigView : function(view){
      return this.attributes.configViews[view]
    },
    getDefaultView : function (){
      return this.getConfigView('default')
    },
    setBaseLayers : function(layers){
      this.set('baseLayers', layers)
    },
    getBaseLayers : function(){
      return this.attributes.baseLayers
    },
    setActiveLayers : function(layers){
      this.set('removeLayers', _.difference(this.attributes.activeLayers,layers)) // in previous layers but not in active
      this.set('addLayers', _.difference(layers,this.attributes.activeLayers)) // in active layers but not in previous
      this.set('keepLayers', _.intersection(this.attributes.activeLayers,layers)) // previous and active layers

      var that = this
      waitFor(
        function(){
          return that.mapConfigured() && !that.activeLayersLoading()
        },
        function(){
          that.set('activeLayers', layers) // active layers
        }
      )
    },

    activeLayersLoading : function(){
      var layersLoading =  _.where(_.pluck(this.attributes.addLayers,'attributes'),{'loading':false}).length
      return layersLoading.length === this.attributes.addLayers.length
    },
    getActiveLayers : function(){
      return this.attributes.activeLayers
    },
    getRemoveLayers : function(){
      return this.attributes.removeLayers
    },
    getAddLayers : function(){
      return this.attributes.addLayers
    },
    setAddLayers : function(addLayers){
      this.set('addLayers', addLayers)
    },
    getKeepLayers : function(){
      return this.attributes.keepLayers
    },
    setCustomShapes : function(customs){
      this.set('customs', customs)
    },
    getCustomShapes : function(){
      return this.attributes.customs
    },
    getCrs : function(){
      return this.attributes.crs
    },
    setCrs : function(crs){
      this.set('crs', crs)
    },
    setInvalidateSize : function(invalidateSize){
      this.set('invalidateSize', invalidateSize)
    },
    getZoom : function(){
      return this.attributes.zoom
    },
    getMapControl : function(){
      return this.attributes.mapControl
    },
    setMapControl : function(bool){
      this.set('mapControl', bool)
    },
    setMap : function(map){
      this.set('map', map)
    },
    setMapOptions : function(mapOptions){
      this.set('mapOptions', mapOptions)
    },
    setActive : function(active){
      active = typeof active !=='undefined' ? active : true
      this.set('active', active)
    },
    isActive : function(){
      return this.get('active')
    },
    getMode : function(){
      return this.attributes.mode
    },
    getType : function(){
      return this.attributes.type
    }

  });

  return MapModel;

});
