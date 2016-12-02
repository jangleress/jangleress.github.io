define([
  'jquery',
  'underscore',
  'backbone',
  'jquery.deparam',
  'components/app/AppView',
  'components/app/AppModel'
//  'text!data/layers.json',
//  'text!data/scenarios.json'
], function($, _, Backbone, deparam, AppView, AppModel) {

  var app = {};

//  query args:
//  layers[]=[item_id]
//  view=LAT|LNG|ZOOM||WIDTH|HEIGHT

  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Default
      '' : 'root', // root
      '/' : 'root', // root
      '!' : 'root', // 
      '!/' : 'root', // 
      '!/home' : 'home', // canada
      '!/home/' : 'home', // canada     
      '!/ocean/*path' : 'ocean', // coast home
      '!/story/*path' : 'story', // guided exploration
      '!/id/:id' : 'id', // resurrect map state
      '!/layers' : 'layers', // self explorarion
      '!/layers/' : 'layers', // self explorarion
      '!/layers/*path' : 'layers', // self explorarion
      '!/page/:page' : 'page' // content page 
    },
    resetApp : function(query){
      //console.log('router.resetApp')  
      if(app.model.isSubpage()){
        //console.log('route.resetApp isSubpage')
        window.location.href = 
            'http://' 
          + window.location.host 
          + app.model.getBaseURL()
          + (lang === 'en' ? '' : '/' + lang)          
          + '/'
      } else {              
        this.navigate('',{trigger:true})
      }         
      
    },
    goToFragment : function(fragment) {
      this.navigate(fragment,{trigger:true})
    },
    // delete illegal query args
    queryAllow : function(allowed){
      //console.log('router.queryAllow')              
      this.queryDelete(_.difference(_.keys(app.model.getQuery()),allowed))           
    },
    // delete query args
    queryDelete : function(keys){
      //console.log('router.queryDelete')  
      var query = _.clone(app.model.getQuery())
      if (typeof keys === 'string') {
        delete query[keys]
      } else {
        _.each(keys,function(key){
          delete query[key]
        })
      }
      
      this.update({
        query:query,
        replace:true
      })    
    },
    // update query args
    queryUpdate : function(query, trigger){
      //console.log('router.queryUpdate')  
      var trigger = typeof trigger !== 'undefined' ? trigger : true
      var query = _.extend({}, app.model.getQuery(), query)
      this.update({
        query:query,
        trigger:trigger,
        replace:true
      })      
      return query
    },
    // toggle query args
    queryToggle : function(query, trigger, link){
      //console.log('router.queryToggle')  
      var trigger = typeof trigger !== 'undefined' ? trigger : true
      var link = typeof link !== 'undefined' ? link : false
      
      var currentQuery = _.clone(app.model.getQuery())
      
      if (typeof query === 'object') {
        _.each(query,function(value,key){
          if(_.contains(_.keys(currentQuery),key) && currentQuery[key] === value) {
            delete currentQuery [key]
          } else {
            currentQuery[key] = value
          }
        },this)
      } else {
        if(_.contains(_.keys(currentQuery),query)) {
          delete currentQuery [query]
        } else {
          currentQuery[query] = 'true'
        }
      }
      
      if (trigger) {
        this.update({
          query:currentQuery,      
          link:link
        })      
      }
      return currentQuery
      
    },
    // update route
    update : function(args){
      var link = typeof args.link !== 'undefined' ? args.link : false
      var trigger = typeof args.trigger !== 'undefined' ? args.trigger : true
      var replace = typeof args.replace !== 'undefined' ? args.replace : false
      var extendQuery = typeof args.extendQuery !== 'undefined' ? args.extendQuery : false
      
      var route = typeof args.route !== 'undefined' ? args.route : app.model.getRoute()
      route = route !== '' ? ('/' + route) : ''
      
      var path  = typeof args.path !== 'undefined' ? args.path : (app.model.getPath() !== '' ? app.model.getPath() : '')
      path = path !== '' ? ('/' + path) : ''
      
      var query = typeof args.query !== 'undefined' 
        ? extendQuery 
          ? _.extend({}, app.model.getQuery(), args.query )
          : args.query 
        : app.model.getQuery()
      
      //remove empty args
      _.each(_.clone(query),function(value,key){
        if (!value.length || (value.length === 1 && value[0] === '') || value === '^^^@]') {
          delete query[key]
        }
      })      
      // get query string
      query = $.param(query)
      query = query !== '' ? ('?' + query) : ''
      
      //console.log('router.update: ' + '!' + route+path+query + ' // replace: ' + replace)  
      
      
      
      
      if(link && app.model.isSubpage()){
        //console.log('route.update isSubpage')
        window.location.href = 
            'http://' 
          + window.location.host 
          + app.model.getBaseURL() 
          + (lang === 'en' ? '' : '/' + lang)
          + '/#!'
          + route + path + query
        
      } else {      
        this.navigate(
          '!' + route + path + query,
          {trigger: trigger, replace: replace}
        )
      }      
    },
    goBack : function(){
      window.history.back()
    }
  })

  var initialize = function(args){          
    app.Router = new AppRouter;
    
    var sourcePath = url.replace(/\/$/, "").replace(/^\//, "").split('/')
    
    var queryConf = document.URL.match(/conf=([^&;]+?)(&|#|;|$)/)
    var filename = (queryConf ? queryConf[1] : 'appConfig')
    var configFile = 'app/config/' + filename + '.json.js'

    var route, path
    if (sourcePath[0] === lang) {
      route  = sourcePath.length > 1 ? sourcePath[1] : ''
      path  = sourcePath.length > 2 ? sourcePath[2] : ''
    } else {
      route  = sourcePath[0]
      path  = sourcePath.length > 1 ? sourcePath[1] : ''
    }
    
    // start app
    app.model = app.model || new AppModel({
      sourcePath : {
        route: route,
        path: path,
        query: {}
      },
      views : {},
      history : [],
      baseurl : baseurl,
      configPath : configFile,
      router: app.Router,
      route:{
        route:'',  
        path :'',
        query:{},  
      },
      serverURL : 'https://printserver.wwf.ca/map/' //'https://print.dumpark.com/map/' // todo
    }) 
    
    
    // checkSubPage
    if (app.model.getSourcePath().route === '' 
      || ( app.model.getSourcePath().route === lang  
           && app.model.getSourcePath().path === '')
    ) {
      // if we are at the root location start app at home        
      app.model.isSubpage(false)
    } else {
      
      app.model.isSubpage(true)
      
      // activate layer when on subpage
//      if (app.model.getSourcePath().route === 'layers' && app.model.getSourcePath().path !== 'home'){
//        app.model.setSourceQuery({layers:[app.model.getSourcePath().path]})
//      } 
    }    
    
    // define route handlers
    // root > home
    app.Router.on('route:root', function () {
      //console.log('router.root')       
      if (!app.model.isSubpage()) {
        
        //console.log('start application on root')        
        this.navigate( '!/home',{trigger:true, replace: true} )           
        
      } else {
        
        //console.log('start application on subpage')
        var sourcePath = app.model.getSourcePath()
        app.model.setRoute({
          route : sourcePath.route,
          path  : sourcePath.path,
          query : sourcePath.query
        })                      
        this.navigate( 
          '!/' + sourcePath.route + '/' + sourcePath.path + '?' + $.param(sourcePath.query),
          {trigger:true, replace: true} 
        )            
      }
                  
    })
    
    // home
    app.Router.on('route:home', function (query) {
      //console.log('router.home>setRoute ' )

      app.model.setRoute({
        route : 'home',
        path  : '',
        query : query !== null && typeof query !=='undefined' ? $.deparam(query) : {}
      })
      
      if (typeof app.view === 'undefined') {
        app.view = new AppView({model:app.model})
      }  
    })
    // id: resurrect map state from server
    app.Router.on('route:id', function (id) {
      //console.log('router.id') 
      // todo: get map state from print server and resurrect map 
      var that = this
      app.model.getMapStateFromServer(id, function(err,data){
        if (err) return console.error('Something went wrong: ', err);
        var route = data.state.map_state
        that.navigate(
          '!/' + route.route + '/' + route.path + '?' + $.param(route.query),
          {trigger:true, replace: true}
        )         
      })      
    })
    
    
    
    // ocean home
    // path: /ocean/[ocean_id]    
    app.Router.on('route:ocean', function (path,query) {      
      //console.log('router.ocean>setRoute ' )
      
      path = path !== null && typeof path !=='undefined' ? path : ''
      
      query = query !== null && typeof query !=='undefined' ? $.deparam(query) : {}
      
      app.model.setRoute({
        route :'ocean',
        path  : path,
        query : query
      })
      
      
      
      if (typeof app.view === 'undefined') {
        //console.log('router.ocean>app.view')
        app.view = new AppView({model:app.model})
      }       
    })
    
    // story home
    // path: /story/[story_id]    
    app.Router.on('route:story', function (path,query) {      
      //console.log('router.story>setRoute ' )
      
      path = path !== null && typeof path !=='undefined' ? path : ''
      
      query = query !== null && typeof query !=='undefined' ? $.deparam(query) : {}
      
      app.model.setRoute({
        route :'story',
        path  : path,
        query : query
      })
      
      
      
      if (typeof app.view === 'undefined') {
        //console.log('router.ocean>app.view')
        app.view = new AppView({model:app.model})
      }       
    })
    // self guided exploration
    // path: /layers/[layer_id]    
    app.Router.on('route:layers', function (path,query) {      
      //console.log('router.layers>setRoute ' )
      
      path = path !== null && typeof path !=='undefined' ? path : 'home'
      
      query = query !== null && typeof query !=='undefined' ? $.deparam(query) : {}
      
      app.model.setRoute({
        route :'layers',
        path  : path,
        query : query
      })
      
      
      
      if (typeof app.view === 'undefined') {
        //console.log('router.layers>app.view')
        app.view = new AppView({model:app.model})
      }       
    })
    
    
    //  /page/[page_id]    
    app.Router.on('route:page', function (path,query) {
      //console.log('router.page')        
      app.model.setRoute({
        route :'page',
        path  : path !== null && typeof path !=='undefined' ? path : 'about',
        query : query !== null && typeof query !=='undefined' ? $.deparam(query) : {}
      })
      //console.log('router.layers>setRoute ' )
      
      if (typeof app.view === 'undefined') {
        //console.log('router.page>app.view')
        app.view = new AppView({model:app.model})
      }  
    })
    
    Backbone.history.start();
    app.model.pushHistory({
      fragment : Backbone.history.fragment
    });
  };
  return {
    initialize: initialize
  }
});
