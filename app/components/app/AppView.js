define([
  'jquery','underscore','backbone','jsonpack',
  'domReady!',
  './header/HeaderView', './header/HeaderModel',
  './key/KeyView', './key/KeyModel',
  './print/PrintView', './print/PrintModel',
  './story/StoryView', './story/StoryViewModel',
  './home/HomeView',
  './ocean/OceanView', './ocean/OceanViewModel',
  './pages/PagesView', './pages/PagesModel',
  './map/MapView', './map/MapModel',
  './modal/ModalView', './modal/ModalModel',
  './layers/LayersView', './layers/LayersModel',
  'models/ViewModel',
  'models/LayerCollection',
  'models/LayerModelArcGis',
  'models/LayerModelArcGisRaster',
  'models/LayerModelTopo',
  'models/LayerModelGeoJson',
  'models/LayerModelMapboxTiles',
  'models/LayerModelCustom',
  'models/LayerModelNav'
], function(
  $, _, Backbone, jsonpack,
  domReady,
  HeaderView, HeaderModel,
  KeyView, KeyModel,
  PrintView, PrintModel,
  StoryView, StoryViewModel,
  HomeView,
  OceanView, OceanViewModel,
  PagesView, PagesModel,
  MapView, MapModel,
  ModalView, ModalModel,
  LayersView, LayersModel,
  ViewModel,
  LayerCollection,
  LayerModelArcGis,
  LayerModelArcGisRaster,
  LayerModelTopo,
  LayerModelGeoJson,
  LayerModelMapboxTiles,
  LayerModelCustom,
  LayerModelNav
){

  var AppView = Backbone.View.extend({
    el: $("#application"),
    // view events upstream to pass to router if needed ///////////////////////////////////////////////////////
    events : {
      "click .close-item" : function(e,args){
        e.preventDefault()
        //console.log('AppView.closeItem')

        // last non-page history
        var history = this.model.getHistoryWithoutPages()

        if (history.length === 0){
          // no history
          this.model.getRouter().resetApp()
        } else {
          this.model.getRouter().goToFragment(history[history.length-1].fragment)
        }

      },
      "click .module-link" : function(e){
        e.preventDefault()
        var id = $(e.target).closest('[data-module]').data('module')
        this.$el.trigger('moduleLinkClick',{target:e.target,id:id})
      },
      "click .ocean-link" : function(e){
        e.preventDefault()
        var id = $(e.target).closest('[data-oceanid]').data('oceanid')
        this.$el.trigger('oceanLinkClick',{target:e.target,id:id})
      },
      "click .page-link" : function(e){
        e.preventDefault()
        var id = $(e.target).closest('[data-pageid]').data('pageid')
        this.$el.trigger('pageLinkClick', { target: e.target, id: id })
      },
      moduleLinkClick : function(e,args){
        //console.log('AppView.moduleLinkClick')

        var moduleId = args.id

        switch (moduleId) {
          case ('story') :
            this.model.getRouter().update({
              link: true,
              route: 'ocean',
              path:this.model.getActiveOceanId(),
              query:{
                view:this.model.getActiveOcean().getMapview(),
                clayers:this.model.getCustomLayerIds(),
                cdata:this.model.getCustomData()
              }
            })
            break
          case ('layers') :

            this.model.getRouter().update({
              link: true,
              route: 'layers',
              path:'home',
              query:{
                view:this.model.getActiveOcean().getMapview(),
                ocean:this.model.getActiveOceanId(),
                clayers:this.model.getCustomLayerIds(),
                cdata:this.model.getCustomData()
              }
            })

            break
        }

      },
      // general navigation events
      resetApp : function(e,args){
        //console.log('AppView.resetApp')
        this.model.getRouter().resetApp()
      },
      pageLinkClick : function(e,args){
        //console.log('AppView.pageLinkClick')
        this.model.getRouter().update({
          link: true,
          route: 'page',
          path: args.id,
          query:{
            view:this.model.getActiveMapview(true),
            clayers:this.model.getCustomLayerIds(),
            cdata:this.model.getCustomData()
          }
        })
      },
      storyLinkClick : function(e,args){
//        console.log('AppView.storyLinkClick')
        this.model.getRouter().update({
          link: true,
          route: 'story',
          path: args.id,
          query:{
            view:this.model.getStory(args.id).getMapview(),
            clayers:this.model.getCustomLayerIds(),
            cdata:this.model.getCustomData()
          }
        })
      },
      nextStoryLinkClick : function(e,args){
        this.$el.trigger('storyLinkClick', { target: e.target, id: this.model.getNextStoryId() })
      },
      previousStoryLinkClick : function(e,args){
        this.$el.trigger('storyLinkClick', { target: e.target, id: this.model.getPreviousStoryId() })
      },
      oceanLinkClick : function(e,args){
        //console.log('AppView.oceanLinkClick')

        this.model.getRouter().update({
          link: true,
          route: 'ocean',
          path: args.id,
          query:{
            view:this.model.getOcean(args.id).getMapview(),
            clayers:this.model.getCustomLayerIds(),
            cdata:this.model.getCustomData()
          }
        })
      },
      nextOceanLinkClick : function(e,args){
        this.$el.trigger('oceanLinkClick', { target: e.target, id: this.model.getNextOceanId() })
      },
      previousOceanLinkClick : function(e,args){
        this.$el.trigger('oceanLinkClick', { target: e.target, id: this.model.getPreviousOceanId() })
      },


      // print events
      storeMap : function(e) {
        this.model.storeMapStateOnServer()
      },
      printMap : function(e,args) {
        this.model.storeMapStateOnServer(true)
      },
      shareOnFacebook : function(e,args){
        this.model.storeMapStateOnServer(true)
      },

      printMapModal : function(e) {
        this.model.getRouter().queryUpdate({
          'modal':'print',
          'modalid':this.model.storeMapStateOnServer(true)
        })
      },

      // map view events
      mapViewUpdated : function(e,args){
        //console.log('AppView.mapViewUpdated')

        var viewUpdated = args.center.lat + '|' +
          args.center.lng + '|' +
          args.zoom + '||' +
          args.dimensions[0] + '|' +
          args.dimensions[1]

        if (viewUpdated !== this.model.getActiveMapview(true)) {
          this.model.getRouter().queryUpdate({
            view : viewUpdated
          })
        }


      },
      addCustomLayer : function(e,args){
        //console.log('AppView.addCustomLayer')
        
        var cLayerIds = this.model.getCustomLayerIds()
        
        var cLayerIndex = cLayerIds.length 
         ? parseInt(_.last(cLayerIds).split('_c')[1]) + 1
         : 0
        
        var layerid = args.ocean + '_c' + cLayerIndex
        
        // 1. set active
        // 2. add custom
        // 3. enable editing
        this.model.getRouter().queryUpdate({
          layers: _.uniq(this.model.getActiveLayerIds().concat(layerid)),
          clayers : cLayerIds.concat(layerid),
          cedit: layerid
        })                
      },      
     removeCustomLayer : function(e,args){
        //console.log('AppView.removeCustomLayer')
        
        var layerid = args.id          
        
        var customData = _.reject(this.model.getCustomData(true),function(item){
          return item.id = layerid
        })
        
        
        this.model.getRouter().queryUpdate({          
          layers : _.without(this.model.getActiveLayerIds(), layerid),
          clayers : _.without(this.model.getCustomLayerIds(), layerid),
          cedit : this.model.getCustomEdit() === layerid ? '' : this.model.getCustomEdit(),
          cdata : customData.length > 0 ? jsonpack.pack(customData) : ''
        })                
      },      
      editCustomLayer : function(e,args){
        //console.log//console.log('AppView.editCustomLayer')        
        
        this.model.getRouter().update({
          link: true,
          extendQuery:true,
          route: 'layers',          
          path:'home',
          query:{    
            layers: _.uniq(this.model.getActiveLayerIds().concat(args.id)),
            cat:'custom',
            cedit : this.model.getCustomEdit() === args.id ? '' : args.id
          }
        })
        
      },      
      customDeleted : function(e,args){
        var customData = this.model.getCustomData(true)
        
        var layerData = _.findWhere(customData,{'id':args.layer.id})     
        
        if(typeof layerData !== 'undefined') {
          
          if (typeof args.layer.shapes !== 'undefined') {            
            var layerDataShapesUpdated = []
            _.each(layerData.shapes, function(shape){
              if(args.layer.shapes.indexOf(shape.properties.featureid) < 0) {
                layerDataShapesUpdated.push(shape)
              }              
            }) 
            layerData.shapes = layerDataShapesUpdated
          }
          
          this.model.getRouter().queryUpdate({
            cdata : jsonpack.pack(customData)
          })        
        }
        
        
      },
      customUpdated : function(e,args){
//        console.log('AppView.customUpdated')
        
        var customData = this.model.getCustomData(true)
        
        var layerData = _.findWhere(customData,{'id':args.layer.id})
        
        if(typeof layerData !== 'undefined') {
          // preserve previous shapes
          if (typeof args.layer.shapes !== 'undefined') {
            
            var updated_shapes = _.pluck(_.pluck(args.layer.shapes,'properties'),'featureid')
            _.each(layerData.shapes, function(shape){
              if(updated_shapes.indexOf(shape.properties.featureid) < 0) {
                args.layer.shapes.push(shape)
              }
            })
          }
          
          // extend everything else 
          _.extend(layerData,args.layer)
          
        } else {          
          // new layer
          var layerNew = args.layer
          // store layer color (#79)
          layerNew.color = this.model.getLayer(args.layer.id).getColor()
          customData.push(layerNew)
        }
        
        this.model.getRouter().queryUpdate({
          cdata : jsonpack.pack(customData)
        })
      },
      
      mapMarkerClick : function(e,args){
        // check if location an ocean
        if (_.pluck(this.model.getOceans().models,'id').indexOf(args.locationId) >= 0) {
          this.$el.trigger('oceanLinkClick', { target: e.target, id: args.locationId })
        }
        // check if location a story
        if (_.pluck(this.model.getStories().models,'id').indexOf(args.locationId) >= 0) {
          this.$el.trigger('storyLinkClick', { target: e.target, id: args.locationId })
        }



      },
      // story events
      storyItemActivated : function(e,args){
        //console.log('AppView.layersSet')
        this.model.getRouter().queryUpdate({
          layers: args.layerIds
        })
      },
      //layer view events
      layerToggled : function(e,args){
        //console.log('AppView.layerToggled')

        var toggle = typeof args.toggle !== 'undefined'
            ? args.toggle
            : this.model.getActiveLayerIds().indexOf(args.id) === -1

        var layers = typeof args.id === 'string'
            ? [args.id]
            : args.id

        this.model.getRouter().queryUpdate({
          cedit:'',
          layers : toggle
            ? _.uniq(this.model.getActiveLayerIds().concat(layers))
            : _.difference(this.model.getActiveLayerIds(), layers)
        })

      },
      preloadLayers:function(e,args){
        var that = this
        waitFor(
          function(){
            return that.model.layersConfigured()
              && that.model.mapConfigured()
          },
          function(){
            that.model.preloadLayers(args.layerids)
          }
        )

      },
      layerCategoryClose: function(e,args){
        this.model.getRouter().queryDelete('cat')
      },
      layerCategoryOpen : function(e,args){

        this.model.getRouter().update({
          link: true,
          extendQuery:true,
          path:'home',
          query:{
            cat: args.id,
            cedit : ''
          }
        })
      },
      layerCategoryRemove:function(e,args){
        var removeLayers = _.pluck(this.model.getActiveLayers().byCategory(args.id).models,'id')
        this.model.getRouter().queryUpdate({
          cedit:'',
          layers :  _.difference(this.model.getActiveLayerIds(), removeLayers)
        })        
      },
      layerCategoryLinkClick : function(e,args){
        // get updated query without triggering route event
        var queryUpdated = this.model.getRouter().queryToggle(
        {
          cat: args.id,
          cedit : ''
        }, false)

        this.model.getRouter().update({
          link: true,
          path:'home',
          query:queryUpdated
        })
      },
      layerInfoLinkClick : function(e,args){
        if (this.model.isViewActive('layers')) {    
          this.model.getRouter().update({
            route:'layers',
            path:args.id
          })
        } else {
          this.model.getRouter().queryUpdate({
            'modal':'layer',
            'modalid':args.id
          })
        }
      },
      layerInfoSubpage : function(e,args){    
        var layer = this.model.getLayers().get(args.id)
        this.model.getRouter().update({
          route:'layers',
          path:args.id,
          query:{
            view:this.model.getOcean(layer.getOcean()).getMapview(),
            ocean:layer.getOcean(),
            layers:[args.id]
          }
        })       
      },
      closeLayerInfo :function(e,args){
        var layer = this.model.getLayers().get(args.id)
        if (this.model.isViewActive('layers')) {    
          // check if layer is associated with ocean
          if (typeof layer.getOcean() !== 'undefined') {
            // just go to the layer's ocean's category select
            this.model.getRouter().update({
              link: true,
              extendQuery:true,
              path:'home',
              query:{
                cat: layer.getCategory(),
                cedit : '',
                ocean:layer.getOcean()
              }
            })
          } else {
            //if not see app has current ocean
            if (this.model.getActiveOceanId() !== '') {
              // go to layers home 
              this.model.getRouter().update({
                link: true,
                extendQuery:true,
                path:'home',
                query:{
                  cat: '',
                  cedit : '',
                  ocean:this.model.getActiveOceanId()
                }
              })              
            } else {
              // if not reset (could happen when landing on basemap)
              this.model.getRouter().resetApp()
            }            
          } 
        } else if (this.model.isViewActive('modal')) {
          this.model.getRouter().queryDelete(['modal','modalid'])          
        }
      },
      modalOpen: function(e,args){
        this.model.getRouter().queryUpdate({
          'modal':args.type
        })
      },
      modalClose: function(e,args){
        this.model.getRouter().queryDelete(['modal','modalid'])
      }

    }, // end view events






    initialize : function(){
      //console.log('appview.initialize')

      //the layer model types by source
      this.layerModels = {
        arcgis:   LayerModelArcGis,
        arcgisraster:   LayerModelArcGisRaster,
        topo:     LayerModelTopo,
        geojson:  LayerModelGeoJson,
        mapbox:   LayerModelMapboxTiles,
        custom:   LayerModelCustom,
        appconfig:      LayerModelNav
      }

      // shortcut
      this.views = this.model.getViews()


      // render app once config is loaded
      var that = this
      waitFor(
        //when
        function(){
          return that.model.appConfigured()
        },
        //then
        function(){
          // set Application mode ("print")
          that.checkMode()

          that.render()

          that.model.loadMapConfig()
          that.model.loadLayersConfig()
          waitFor(
            //when
            function(){
              return that.model.layersConfigLoaded()
               && that.model.mapConfigLoaded()
            },
            //then
            function(){ that.configureLayers() }
          )



        }
      )


      waitFor(
        function(){return that.model.mapReady()},
        function(){//console.log('MAP LOADED');
          that.$el.addClass('app-loaded')
        }
      )

      // model change events
      this.listenTo(this.model, "change:route", this.routeChanged);
      this.listenTo(this.model, "change:serverStateId", this.serverStateIdChanged);
      this.listenTo(this.model, "change:printURL", this.printUrlChanged);
    },

    render: function(){
      //console.log("AppView.render");

      // set classes
      this.setClass()

      this.setNavBottomOceanActiveClass()

      this.setNavBottomModuleActiveClass()


      var that = this
      this.model.validateRouter(function(pass){

        if (pass) {

          // wait for config files to be read
          waitFor(
            function(){
              return that.model.layersConfigured()
            },
            function(){
              that.updateCustomLayers()
              that.model.setActiveLayersFromQuery()
            }
          )
          // update dynamic layer filters

//          that.updateLayerFilters()
          // update active locations based on active module
          
          // update active locations based on query
//          that.updateActiveLocations()

          // init/update components
          that.renderHeader()
          that.renderHome()
          that.renderOcean()
          that.renderStory()
          that.renderPages()
          that.renderLayers()
          that.renderMap()
          that.renderModal()
          that.renderKey()

          if (that.model.getMode() === 'print') {
            that.renderPrint()
          }

        }
      })

      return this
    },

    setClass : function(){
      this.$el.removeClass (function (index, classes) {
        return (classes.match (/\bmodule-\S+/g) || []).join(' ');
      });
      this.$el.removeClass (function (index, classes) {
        return (classes.match (/\bocean-\S+/g) || []).join(' ');
      });
      this.$el.removeClass('layer-item')
      this.$el.removeClass('layer-category')

      this.$el.addClass(this.model.getActiveModule().class)

      if (this.model.getActiveLayerId() !== '') {
        this.$el.addClass('layer-item')
      } else {
        if (this.model.isViewActive('layers') && this.model.getActiveCategory() !== '') {
          this.$el.addClass('layer-category')
        }
      }
      if (this.model.getActiveOceanId() !== '') {
        this.$el.addClass('ocean-'+this.model.getActiveOceanId())
      }

    },
    setNavBottomOceanActiveClass : function(){
      this.$('#nav-bottom-oceans .ocean-link').removeClass('active');

      if (this.model.getActiveOceanId() !== '') {
        this.$('#nav-bottom-oceans .ocean-link-'+this.model.getActiveOceanId()).addClass('active')
      }
    },

    setNavBottomModuleActiveClass : function(){
      this.$('#nav-bottom-modules .module-link').removeClass('active');
      var highlight = this.model.getActiveModule().id === 'layers' ? 'layers' : 'story'
      this.$('#nav-bottom-modules .module-link[data-module="'+highlight+'"]').addClass('active')
    },

    renderHeader : function(){
      this.views.header = this.views.header || new HeaderView({
        el:this.$('header'),
        model:new HeaderModel({
          mode:this.model.getMode()
        }),
      });
      this.views.header.model.setActivePath(this.model.getPath())
      this.views.header.model.setActivePage(this.model.getActivePage())
    },
    renderKey : function(){
      this.views.key = this.views.key || new KeyView({
        el:this.$('#key'),
        model:new KeyModel({
        })
      });
      
      if (this.model.isViewActive('key')) {
        
        var that = this
        // wait for config files to be read
        waitFor(
          function(){
            return that.model.layersConfigured()
          },
          function(){
            that.views.key.model.setActive(true)
            that.views.key.model.setActiveLayers(that.model.getKeyLayers().models) // set active layers - // only those that have key not set to false
            that.views.key.model.setCustomLayerData(that.model.getCustomData())

          }
        )        
      } else {
        this.views.key.model.setActive(false)
      }      
      this.views.key.model.setAllowLayerToggle(this.model.getActiveModule().id === 'layers')


    },
    renderPrint : function(){

      if (this.$('#print').length > 0) {

        var that = this
        // wait for config files to be read
        waitFor(
          function(){
            return that.model.layersConfigured()
          },
          function(){

            that.views.print = new PrintView({
              el:that.$('#print'),
              model:new PrintModel({
                mapid:        that.model.getQuery().modalid, // todo check serverStateId
                activeLayers: that.model.getKeyLayers().models
              })
            })
          }
        )
      }
    },
    renderHome : function() {
      if (this.$('#home').length > 0 && !this.model.isSubpage()) {
        this.views.home = this.views.home || new HomeView({
          el:this.$('#home'),
          model:new ViewModel({})
        });
        if (this.model.isViewActive('home')) {
          this.views.home.model.setActive(true)
        } else {
          this.views.home.model.setActive(false)
        }
      }
    },
    renderOcean : function() {
      if (this.$('#ocean').length > 0) {
        this.views.ocean = this.views.ocean || new OceanView({
          el:this.$('#ocean'),
          model:new OceanViewModel({})
        });
        if (this.model.isViewActive('ocean')) {
          this.views.ocean.model.setActive(true)
          this.views.ocean.model.setOcean(this.model.getActiveOcean())
          this.views.ocean.model.setStories(this.model.getStoriesByOcean())
        } else {
          this.views.ocean.model.setActive(false)
        }
      }
    },
    renderStory : function() {
      if (this.$('#story').length > 0) {
        
      var that = this
        waitFor(
          function(){
            return that.model.layersConfigured()
          },
          function(){
            that.views.story = that.views.story || new StoryView({
              el:that.$('#story'),
              model:new StoryViewModel({       
                layers:that.model.getLayers()                
              })
            });
            if (that.model.isViewActive('story')) {
              that.views.story.model.setActive(true)
              that.views.story.model.setStories(that.model.getStoriesByOcean())
              that.views.story.model.setStory(that.model.getActiveStory())              
            } else {
              that.views.story.model.setActive(false)
              that.views.story.model.setStory(null)
            }            
          }
        )        
      }
    },
    renderPages : function() {
      if (this.$('#pages').length > 0) {
      // update page component

        this.views.pages = this.views.pages || new PagesView({
          el:this.$('#pages'),
          model:new PagesModel({
            pages : this.model.getPages()
          })
        });
        if (this.model.isViewActive('pages')) {
          this.views.pages.model.set('isSubpage',this.model.isSubpage())
          
          this.views.pages.model.setActive(true)
          this.views.pages.model.setPath(this.model.getPath())
          
        } else {
          this.views.pages.model.setActive(false)
        }



      }

    },
    renderModal : function() {

      if (this.$('#modal').length > 0) {

        var that = this
        waitFor(
          function(){
            return that.model.layersConfigured()
          },
          function(){
            // update story component
            that.views.modal = that.views.modal || new ModalView({
              el:that.$('#modal'),
              model:new ModalModel({
                layers:that.model.getLayers(),
                printURL:'',
                modalid:''
              })
            });
            if (that.model.isViewActive('modal')) {
              that.views.modal.model.setActive(true)

              that.views.modal.model.set({
                modal:    that.model.getQuery().modal,
                modalid:  that.model.getQuery().modalid,
                ocean:    that.model.getActiveOceanId()
              })
            } else {
              that.views.modal.model.setActive(false)
              that.views.modal.model.set({
                modal:'',
                modalid: ''
              })
            }
          }
        )

      }

    },
    renderMap : function(){
      if (this.$('#map').length > 0) {

        var that = this
        // wait for config files to be read
        waitFor(
          function(){
            return that.model.layersConfigured() && that.model.mapConfigLoaded()
          },
          function(){

            that.views.map = that.views.map || new MapView({
              el:that.$('#map'),
              model: new MapModel({
                baseLayers: that.model.getLayers().byBasemap(true), // pass layer collection
                config :    that.model.getMapConfig(),
                mode:       that.model.getMode()
              })
            });
            // update map component
            if (that.model.isViewActive('map')) {
              that.views.map.model.setActive(true)


              that.views.map.model.setMapControl(
                that.model.getActiveModule().mapControl && that.model.getMode() !== 'print'
              )

              that.views.map.model.setView(that.model.getActiveMapview())
              that.views.map.model.setActiveLayers(that.model.getActiveLayers().models) // set active layers
              
              that.views.map.model.set({
                customLayerEdit:that.model.getCustomEdit(),
                customLayerData:that.model.getCustomData()
              })
              
              that.views.map.model.setInvalidateSize(Date.now())
              that.$el.removeClass('app-loaded')
              waitFor(
                function(){
                  return that.model.mapReady()
                },
                function(){
                  that.$el.addClass('app-loaded')
                }
              )
            } else {
              that.views.map.model.setActive(false)
            }


          }
        )
      }
    },
    renderLayers : function(){

      if (this.$('#layers').length > 0) {

        // update layerControl model
          // wait for config files to be read
        var that = this
        waitFor(
          function(){
            return that.model.layersConfigured()
          },
          function(){
            that.views.layers = that.views.layers || new LayersView({
              el:that.$('#layers'),
              model:new LayersModel({
                layers:         that.model.getLayers(),
                activeLayerIds: that.model.getActiveLayerIds()
              })
            });

            if (that.model.isViewActive('layers')) {


              // update layers model
              that.views.layers.model.set({
                active:         true,
                layerId:        that.model.getActiveLayerId(), // the layer item
                category:       that.model.getActiveCategory(),
                ocean:          that.model.getActiveOceanId(),
                customLayerIds: that.model.getCustomLayerIds(),
                customLayerEdit:that.model.getCustomEdit(),
                customLayerData:that.model.getCustomData(),
                activeLayerIds: that.model.getActiveLayerIds() // all active layer ids
              })

            } else {
              that.views.layers.model.setActive(false)
            }
          }
        )
      }
    },




    checkMode : function(){
      var route = this.model.getRoute()
      var query = this.model.getQuery()
      // check for print mode
      if (route === 'layers'
          && typeof query.mode !== 'undefined'
          && query.mode === 'print') {
        this.model.setMode('print')
        this.$el.addClass('mode-print')
      }
    },

    configureLayers : function(){

      // read layers
      var layers = _.map(this.model.getLayersConfig(),function(layer,index){
        layer.order = index
        return layer
      })

      var collectionOptions = {
        baseurl : this.model.getBaseURL(),
        comparator : 'order',
        print: this.model.getMode() === 'print',
        mapConfig: this.model.getMapConfig(),
        eventContext : this.$el
      }

      var layerCollection = new LayerCollection(
        null,
        collectionOptions
      )


      // get types by source
      var sources = _.chain(layers).pluck('source').uniq().value()

      // build collection for all sources
      _.each(sources,function(source){

        layerCollection.add(
          new LayerCollection(
            _.filter(layers,function(layer){
              return layer.source === source
            }),
            _.extend({},collectionOptions,{model: this.layerModels[source]})
          ).models
        )
      },this)
      this.model.setLayers(layerCollection)
      this.initNavLayers()
      this.model.layersConfigured(true)
    },
    initNavLayers:function(){
      // first set up ocean layer
      this.model.getLayer('oceans').makeLayer(
        _.map(this.model.getOceans().models,function(ocean){
          return {
            location: ocean.getMarker(),
            title: ocean.getTitle(),
            id: ocean.id,
          }
        })
      )
      // then story layers
      _.each(this.model.getOceans().models, function(ocean){
        this.model.getLayer(ocean.id).makeLayer(
          _.map(this.model.getStoriesByOcean(ocean.id),function(story){
            return {
              location: story.getMarker(),
              title: story.getTitle(),
              id: story.id,
            }
          }),
          {
            "labelOptions" : {      
              "options" : {
                "offset":[0,0],
                "direction" : "right",
                "pane":"popupPane",
                "className":"storyLabel"
              },
              "timeout":3000
            }
          }
        )
      },this)

    },
    updateCustomLayers : function() {
      var that = this
      waitFor(
        function(){
          return that.model.layersConfigured()
        },
        function(){
          var activeIds = that.model.getCustomLayerIds()
          
          // delete custom layers         
          that.model.getLayers().remove(_.difference(
            _.pluck(that.model.getLayers().bySource('custom').models,'id'), 
            activeIds
          ))
          
          // custom_layers
          _.each(activeIds,function(id){
            
            // create custom layer if not already existing
            if (typeof that.model.getLayer(id) === 'undefined') {
              that.model.getLayers().add(
                new that.layerModels['custom']({
                  id:id,
                  title:'',
                  category:'custom',
                  source:'custom',                  
                  type:'mixed'
                },{
                  collection:that.model.getLayers()
                })                 
              )
            }
            that.model.getLayer(id).setEdit(id === that.model.getCustomEdit())
            var layerData = _.findWhere(that.model.getCustomData(true),{'id':id})
            that.model.getLayer(id).setCustomData(layerData)
            
            
          })
          
          
//          if (typeof that.model.getQuery().ctitle !== 'undefined') {
//            customLayer.setTitle(that.model.getQuery().ctitle)
//          }
//          customLayer.setCustomShapes(that.model.getCustomData(true))
          
        })
        
    },
    
    
    
    // VIEW MODEL EVENT: downstream
    routeChanged:function(){
      //console.log('AppView.routeChanged ' +JSON.stringify(this.model.get('route')))
      this.model.pushHistory({
        fragment : Backbone.history.fragment
      });
      this.render()
    },
    serverStateIdChanged:function(){
      //console.log('AppView.serverStateIdChanged: ' + this.model.getServerStateId())
      // update app on map-id change
//      this.views.modal.model.set('modalid',this.model.get('serverStateId'))
      this.model.getRouter().queryUpdate({
        'modal':'print',
        'modalid':this.model.getServerStateId()
      })
    },
    printUrlChanged:function(){
      //console.log('AppView.printurlchanged: ' + this.model.getPrintURL())
      this.views.modal.model.setPrintURL(this.model.getPrintURL())
    },





  });
  return AppView;

});
