define([
	'jquery', 'underscore', 'backbone',
  'jsonpack',
  'models/ContentCollection',
  'models/OceanModel',
  'models/StoryModel',
  'models/PageModel',
], function($,_, Backbone,
  jsonpack,
  ContentCollection,
  OceanModel,
  StoryModel,
  PageModel
) {

	var AppModel = Backbone.Model.extend({

		initialize : function(options){
			this.options = options || {};

      this.set("appConfigLoaded", false)
      this.set("layersConfigLoaded", false)
      this.set("mapConfigLoaded", false)
      this.set("layersConfigured", false)

      var that = this

      /// read global configuration file
      $.ajax({
        dataType:"json",
        url: this.attributes.baseurl + '/' +  this.attributes.configPath,
        success: function(json) {
          //console.log("... success loading app config")
          that.setConfig(json[0])
          that.initModels()
        },
        error: function(){
          console.log("error loading app config")

        }
      })


			// shortcut + screenshot ready check
			window.systemapic = {

				ready : function () {

					// this function will be called periodically from server-side during screenshotting,
					// and should return true when all layers are finished loading.

					return that.mapReady();
				},

				// bumps
				version : '0.4',

				// shortcut (dev only)
				app : this,

				// console colors (dev only)
				style : 'color: blue; font-weight: bold'
			}

			// debug
			//console.log.log('%cVersion: ', systemapic.style, systemapic.version);
		},
    setConfig:function(config) {
      return this.set('config',config)
    },
    getConfig:function() {
      return this.attributes.config
    },
    initModels : function(){
      // init pages, ocean and story models
      this.setPages(new ContentCollection(
        this.getConfig().pages, {model: PageModel}
      ))
      this.setOceans(new ContentCollection(
        this.getConfig().oceans, {model: OceanModel}
      ))
      this.setStories(new ContentCollection(
        this.getConfig().stories, {model: StoryModel}
      ))

    },

    // PRINT SERVER ===================================================================
		storeMapStateOnServer : function (print) {
			print = typeof print !== 'undefined' ? print : false;

      if (print) {
        this.set('printURL', 'loading');
      }
			// generate mapid
			var id = Math.random().toString(36).slice(-8)

			// store id
			this.set('serverStateId', id);

      // TEMP TODO
      // var url = window.location.href + '&mode=print',
      var url = 'http://www.rom.on.ca/wwf/#!' + window.location.href.split('#!')[1] + '&mode=print'


      var state = _.clone(this.attributes.route)
      if (typeof state.query !== 'undefined') {
        state.query = _.clone(state.query)
        delete state.query.print
        delete state.query.modal
        delete state.query.modalid
      }

			// hash to store
			var json = JSON.stringify({
				map : id,
				state : {
					map_state : state,
					snapshot : print,
					print_url : url
					// everything in this `state` key will be stored as JSON on server,
					// add_more_keys : 'if you like',
				}
			});

			// http options
			var options = {
				json : json,
				url : this.attributes.serverURL + 'set' // using different endpoints instead of io:set
			}

			// send http request
			this.request(options, function (err, response) {

				// sanity checks
				if (err || !response) return console.error('Something went wrong: ', err || 'No response data.');

				// debug
				console.log('%cSaved state to server, got this response: ', systemapic.style, response);

				// set id
				this.set('serverStateId', id);

        if (print) {
					// get screenshot
					this.getScreenshotFromServer(id, function (err, url) {
						if (err) return console.error('Something went wrong: ', err);

						// set print url
						this.set('printURL', url);
					}.bind(this));
				}

			}.bind(this));

			return id;
		},

		getPrintURL : function(){
			return this.attributes.printURL
		},

		setPrintURL : function(printURL){
			this.set('printURL', printURL)
		},

		getMapStateFromServer : function (id, callback) {

			// payload
			var json = JSON.stringify({
				map : id,
			});

			// http options
			var options = {
				url : this.attributes.serverURL + 'get', // using /get/ route
				json : json
			}

			// send http request
			this.request(options, function (err, response) {
				if (err) return console.error('Something went wrong:', err);

				// debug
				console.log('%cGot saved state from server: ', systemapic.style, response);

        response = this.parse(response)

				// all good
				callback && callback(response.err, response.data);

			}.bind(this));

			return this;
		},

		// we'll do a separate fn for screenshots, using a hash id that's already been stored
		getScreenshotFromServer : function (id, callback) {

			// payload
			var json = JSON.stringify({
				map : id, // an already saved hash id
//        format: 'jpg',
				width : 3300, //letter 3300  //default 1620,
				height : 2550, //letter 2550 //default 1080,
				quality : 100
				//
				// @timo: with these values, you get an image size of 1.2MB
				// 	  with png 10MB. jpeg 100% 5MB.


			});

			// http request options
			var options = {
				url : this.attributes.serverURL + 'print',
				json : json
			}

			// send request to server
			this.request(options, function (err, response) {
				if (err) return console.error('Something went wrong: ', err);

				// parse response
				var data = this.parse(response);

				// debug
				console.log('%cReceived data: ', systemapic.style, data); // {print_id: "asdads", err: null}

				// sanity checks
				if (!data) return console.error('Something went wrong: no data.');
				if (data.err) return console.error('Something went wrong: ', data.err);

				// screenshot has been created on server, and saved under unique id, available at this url;
				var url = this.attributes.serverURL + 'print/' + data.print_id + '.jpeg';

				// debug
				console.log('%cGET screenshot at this url:', systemapic.style, url); //  https://timo.systemapic.com/map/print/asdads

				// all good
				callback && callback(null, url);

			}.bind(this));

			return this;
		},

		// helper fn for http requests
		request : function (options, callback) {

			// get url, json
			var url = options.url;
			var json = options.json;

			// sanity check
			if (!url || !json) return console.error('Missing parameters!');

			// new request
			var http = new XMLHttpRequest();

			// open
			http.open('POST', url, true);

			// must set json content type
			http.setRequestHeader('Content-type', 'application/json');

			// handle response
			http.onreadystatechange = function() {
				if (http.readyState != 4) return;

				if (http.status == 200) {
					// all good
					callback && callback(null, http.responseText);
				} else {
					// return error
					callback && callback(http.status);
				}
			}

			// send json
			http.send(json);
		},
		getServerStateId : function() {
			//todo get mapID from server
			// for now set locally
			return this.attributes.serverStateId
		},

		// helper fn for parsing with try/catch (a lot of weird stuff can come from http requests)
		parse : function (json) {
			try {
				var data = JSON.parse(json);
			} catch (e) {
				console.error('error parsing: ', e, json);
				var data = false;
			}
			return data;
		},





    // ROUTE VALIDATION ===================================================================

    validateRouter : function(callback){

      // check and validate module defaults
      var module = this.getActiveModule()
      var router = this.get('router')
      // 0. check module
      if (module === '') {
          router.update({
            route: 'home'
          })
          callback(false)
      } else {

        // 1. check map view
        if (typeof this.getQuery().view === 'undefined') {
          // set module default map view
          router.queryUpdate({
            view: this.getMapviewForModule(true)
          })
          callback(false)
        } else {

          // 2. check if all module default layers are active
          var activeLayers = this.getActiveLayerIds()
          var moduleLayers = this.getLayerIdsByModule(module.id)
          var activeModuleLayers = _.intersection(activeLayers, moduleLayers)

          if (activeModuleLayers.length !== moduleLayers.length) {
            // activate module default layers
            router.queryUpdate({
              layers: _.union(activeLayers, moduleLayers)
            })
            callback(false)

          } else {
            var pass = true
            // 3. check ocean default layers
            if (module.id === 'ocean'){
              var ocean = this.getActiveOcean()
              var activeLayers = this.getActiveLayerIds()
              var oceanLayers = this.getLayerIdsByOcean(ocean.id)
              var activeOceanLayers = _.intersection(activeLayers, oceanLayers)

              if (activeOceanLayers.length !== oceanLayers.length) {
                // activate ocean default layers
                router.queryUpdate({
                  layers: _.union(activeLayers, oceanLayers)
                })
                pass = false
              }
            }
            if (!pass) {
              callback(false)
            } else {              
              // 5. check allowed query args
              var illegalArgs = _.difference(_.keys(this.getQuery()), module.query_allow)
              if (illegalArgs.length > 0) {
                //remove illegal query args
                router.queryAllow(module.query_allow, true)
                callback(false)

              } else {
                callback(true)
              }
            }
          } // check 2
        } // check 1
      } // check 0
    },


    getViews:function(){
      return this.attributes.views
    },


    // APP STATE ===================================================================
    getRouter:function(){
      return this.attributes.router
    },
    getBaseURL: function(){
      return this.attributes.baseurl
    },
		setRoute : function(route) {
			// console.log('AppModel.setRoute')
			this.set('route',{
				route : route.route,
				path : route.path,
				query : route.query
			});
			return this;
		},
		getDeFactoRoute : function(){
      return !this.attributes.subpage
        ? this.attributes.route.route
        : this.attributes.sourcePath.route
    },
    isSubpage : function(val){
      if (typeof val !== 'undefined'){
        this.set('subpage',val)
      } else {
        return this.attributes.subpage
      }
    },
    getHistory:function(){
      return this.attributes.history
    },
    getHistoryWithoutPages : function(){
      return _.filter(this.attributes.history,function(historyObject){
        return !historyObject.fragment.startsWith('!/page')
      })
    },
    pushHistory:function(historyObject){
      this.attributes.history.push(historyObject)
    },
		getRoute : function (){
			return this.attributes.route.route
		},
		getPath : function (){
			return this.attributes.route.path
		},
		getQuery : function (){
			return this.attributes.route.query
		},
    getSourcePath:function(){
      return this.attributes.sourcePath
    },
    setSourceQuery : function(query) {
      this.attributes.sourcePath.query = query
    },


    getActiveCategory: function(){
      return typeof this.attributes.route.query.cat !== 'undefined'
        ? this.attributes.route.query.cat
        : ''
    },
    setMode : function(mode){
      this.set('mode',mode)
    },
    getMode : function(){
      return this.attributes.mode
    },

		appConfigured : function(){
      return typeof this.attributes.config !== 'undefined'
    },

    isViewActive : function(view) {
      
      var routeConditions = {
        home: ['home','map'],
        ocean: ['ocean','map'],
        story: ['story','map','key'],
        layers: ['layers','map','key'],
        page:['pages']
      }
      
      var viewConditions = {
        modal : typeof this.getQuery().modal !== 'undefined'
      }
      
      return (routeConditions[this.getDeFactoRoute()].indexOf(view) >=0)
          || (typeof viewConditions[view] !== 'undefined' && viewConditions[view])            
      
    },



    // MODULES ===================================================================
    getModule:function(moduleId){
      return typeof moduleId !== 'undefined' ? _.findWhere(this.attributes.config.modules,{id:moduleId}) : this.getActiveModule()
    },
    getActiveModule:function(){

      var route = this.getRoute()

      if (_.contains(_.pluck(this.attributes.config.modules,'id'), route)) {
        return _.findWhere(this.attributes.config.modules,{id:route})
      } else {
        return ''
      }

    },


    // PAGES ===================================================================
    setPages : function(collection){
      this.set('pages',collection)
    },
    getPages : function(){
      return this.attributes.pages
    },
    getActivePage:function(){
      return this.attributes.pages.findWhere({id:this.getPath()})
    },





    // LAYERS ===================================================================


    //state
    layersLoading : function(){
      return typeof this.attributes.layerCollection === 'undefined'
        ? true
        : this.attributes.layerCollection.isLoading()      
    },
    layerLoaded : function(layerId){
      return this.getLayers().get(layerId).isLoaded()
    },
    layersConfigLoaded : function(){
      return typeof this.attributes.layersConfig !== 'undefined'
    },
    layersConfigured : function(val){
      if (typeof val !== 'undefined') {
        this.set('layersConfigured',val)
      } else {
        return this.attributes.layersConfigured
      }
    },


    // config
    loadLayersConfig : function(){
      var that = this
      $.ajax({
        dataType: "json",
        url: this.attributes.baseurl + '/' + this.attributes.config.layersConfig,
        success: function(json) {
          //console.log("... success loading layer config")
          that.set("layersConfig",json)
        },
        error: function(){
          console.log("error loading layer config")

        }
      })
    },
    getLayersConfig : function(){
      return this.attributes.layersConfig
    },

    getLayer : function(layerId){
      return this.getLayers().get(layerId)
    },
		getLayers : function() {
			return this.attributes.layerCollection;
		},

		setLayers : function(layers) {
			this.set('layerCollection',layers);
			return this;
		},


    setActiveLayersFromQuery : function() {
			this.attributes.layerCollection.setActive(this.getActiveLayerIds());
			return this;
		},
 		// returns array not collection
		getActiveLayers : function() {
			return this.attributes.layerCollection.byActive();
		},
    // active on map
		getActiveLayerIds : function() {
			var query = this.attributes.route.query
			return (typeof query.layers !== 'undefined') ? query.layers : [];
		},
    // active content
    getActiveLayerId : function(){
      if (this.isLayerItemActive()) {
        return this.getPath()
      } else {
        return ''
      }
    },
    isLayerItemActive : function(){
      return this.isViewActive('layers') && this.getPath()!== 'home'
    },

    getLayerIdsByModule:function(moduleId){
      var module = typeof moduleId !== 'undefined' ? this.getModule(moduleId) : this.getActiveModule()
      return typeof module.layers !== 'undefined' || module.layers === ''
        ? _.map(module.layers.split(','),function(layerid){return layerid.trim()})
        : []
    },
    getLayerIdsByOcean:function(oceanId){
      var ocean = typeof oceanId !== 'undefined' ? this.getOcean(oceanId) : this.getActiveOcean()
      return typeof ocean.get('layers') !== 'undefined' || ocean.get('layers') === ''
        ? _.map(ocean.get('layers').split(','),function(layerid){return layerid.trim()})
        : []
    },
    getLayerIdsByGroup:function(group){
      return _.pluck(this.getLayers().byGroup(group).models,'id')
    },

    preloadLayers: function(layerIds) {

      _.each(layerIds,function(layerId){
        var layer = this.attributes.layerCollection.get(layerId)
        this.attributes.views.map.model.preloadLayer(layer)
      },this)

    },

    getKeyLayers : function() {
      return this.attributes.layerCollection.byActiveKey()
    },

		getCustomData : function(unpack) {
      unpack = typeof unpack !== 'undefined' ? unpack : false
			// console.log('AppModel.getActiveLayerIds')
			var query = this.attributes.route.query
      var customData = (typeof query.cdata !== 'undefined') ? query.cdata : jsonpack.pack([]);
      return unpack ? jsonpack.unpack(customData) : customData
		},

		getCustomLayerIds : function() {
			var query = this.attributes.route.query
			return (typeof query.clayers !== 'undefined') ? query.clayers : [];
		},
    getCustomEdit:function(){
			var query = this.attributes.route.query
			return (typeof query.cedit !== 'undefined') ? query.cedit : '';      
    },


    // MAP ========================================================================
    loadMapConfig : function(){
      var that = this
      $.ajax({
        dataType: "json",
        url: this.attributes.baseurl + '/' + this.attributes.config.mapConfig,
        success: function(json) {
          //console.log("... success loading mapconfig")
          that.set("mapConfig",json[0])
          that.set("mapConfigLoaded",true)
        },
        error: function(){
          console.log("error loading map config")

        }
      })
    },
    mapConfigLoaded : function(){
      return this.attributes.mapConfigLoaded
    },
    getMapConfig : function(){
      return this.attributes.mapConfig
    },

    mapReady : function(){
      return this.appConfigured() 
        && this.layersConfigured() 
        && this.mapConfigured() 
        && !this.layersLoading();
    },
    mapConfigured : function() {
      return typeof this.attributes.views.map !== 'undefined' && this.attributes.views.map.model.mapConfigured()
    },

		getActiveMapview : function(raw){
      raw = typeof raw !== 'undefined' ? raw : false
      var view = typeof this.attributes.route.query.view !== 'undefined'
        ? this.attributes.route.query.view
        : 'default'
      return raw ? view : this.toMapviewObject(view)
    },

    toMapviewObject : function(view){

			if (typeof view !== 'undefined') {
				var view_split = view.split('||');

        if (view_split.length === 2) {

          var view = view_split[0].split('|');
          var dimensions = view_split[1].split('|');

          if (view.length === 3 && dimensions.length === 2) {

            return {
              center : {lat:parseFloat(view[0]),lng:parseFloat(view[1])},
              zoom : parseFloat(view[2]),
              dimensions : [parseFloat(dimensions[0]),parseFloat(dimensions[1])]
            }

          } else {
            return null
          }

        } else {
          // try predefined view
          return view
        }

			} else {
				return null;
			}
		},

    getMapviewForModule:function(raw){
      raw = typeof raw !== 'undefined' ? raw : false
      var module = this.getActiveModule()
      var view
      switch (module.id) {
        case 'home' :
            view = module.mapview
          break
        case 'story' :
            view = this.getActiveStory().getMapview()
          break
        case 'ocean' :
            view = this.getActiveOcean().getMapview()
          break
        default :
            view = this.getActiveMapview(true) // raw
          break
      }
      return raw ? view : this.toMapviewObject(view)
    },






    // OCEANS    ========================================================================
    getOcean:function(oceanid){
      return this.attributes.oceans.findWhere({id:oceanid})
    },
    setOceans : function(collection){
      this.set('oceans',collection)
    },
    getOceans : function(){
      return this.attributes.oceans
    },
    getActiveOcean:function(){
      return this.getOcean(this.getActiveOceanId())
    },
    getActiveOceanId:function(){
      if (this.attributes.route.route === 'home') {
        return ''
      } else if (this.attributes.route.route === 'ocean') {
        return this.attributes.route.path
      } else if (this.attributes.route.route === 'story') {
        return this.getActiveStory().getOceanId()
      } else {
        return typeof this.attributes.route.query.ocean !== 'undefined'
          ? this.attributes.route.query.ocean
          : ''
      }
    },
    getNextOceanId : function(){
      var id = this.getActiveOceanId()
      var oceans = _.pluck(this.attributes.oceans.models,'id')
      var itemIndex = oceans.indexOf(id)
      var nextIndex = itemIndex === oceans.length-1 // if last item
        ? 0 // then get first item
        : itemIndex+1 // else get next item
      return oceans[nextIndex]
    },
    getPreviousOceanId : function(){
      var id = this.getActiveOceanId()
      var oceans = _.pluck(this.attributes.oceans.models,'id')
      var itemIndex = oceans.indexOf(id)
      var previousIndex = itemIndex === 0 // if first item
        ? oceans.length-1 // then get last item
        : itemIndex-1 // else get previous item
      return oceans[previousIndex]
    },





    // STORIES ========================================================================
    getStory: function(storyid){
      return this.attributes.stories.findWhere({id:storyid})
    },
    setStories: function(collection){
      this.set('stories',collection)
    },
    // returns collection
    getStories : function(){
      return this.attributes.stories
    },
    getStoriesByOcean:function(oceanid){
      oceanid = typeof oceanid !== 'undefined' ? oceanid : this.getActiveOceanId()
      return this.attributes.stories.where({ocean:oceanid})
    },
    getActiveStory:function(){
      return this.getStory(this.getActiveStoryId())
    },
    getActiveStoryId:function(){
      return (this.attributes.route.route === 'story')
        ? this.attributes.route.path
        : ''
    },
    getNextStoryId : function(){
      var id = this.getActiveStoryId()
      var stories = _.pluck(this.attributes.stories.where({ocean:this.getActiveOceanId()}),'id')
      var itemIndex = stories.indexOf(id)
      var nextIndex = itemIndex === stories.length-1 // if last item
        ? 0 // then get first item
        : itemIndex+1 // else get next item
      return stories[nextIndex]
    },
    getPreviousStoryId : function(){
      var id = this.getActiveStoryId()
      var stories = _.pluck(this.attributes.stories.where({ocean:this.getActiveOceanId()}),'id')
      var itemIndex = stories.indexOf(id)
      var previousIndex = itemIndex === 0 // if first item
        ? stories.length-1 // then get last item
        : itemIndex-1 // else get previous item
      return stories[previousIndex]
    },





	});


	return AppModel;

});
