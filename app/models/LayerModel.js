define([
  'jquery', 'underscore', 'backbone',
  './ContentModel',
  './LocationModel',
  './LocationCollection',
  './FeatureModel',
  './FeatureCollection',
  'leaflet',
  'leaflet.markercluster',  
  'esri.leaflet',
  'text!templates/labelTemplate.html',  
  'text!templates/clusterIconTemplate.html',  
  'text!templates/layerKeyGradientTemplate.html', 
  'text!templates/layerKeyFullGradientTemplate.html', 
  'text!templates/layerKeyCategoricalTemplate.html',
  'text!templates/layerKeyIconTemplate.html',
  'text!templates/divSvgIconTemplate.html'  
], function($,_, Backbone,
  ContentModel,
  LocationModel,
  LocationCollection,  
  FeatureModel,
  FeatureCollection,  
  leaflet,
  markerCluster,
  esriLeaflet,
  labelTemplate,
  clusterIconTemplate,
  layerKeyGradientTemplate,
  layerKeyFullGradientTemplate,
  layerKeyCategoricalTemplate,
  keyIconTemplate,
  divSvgIconTemplate
){
  
  var LayerModel = ContentModel.extend({
    initialize : function(options){
      this.options = options || {};    
      
      //init loading states
      this.isContentLoading = false
      this.isContentLoaded = false

      // init attributes
      this.id = this.attributes.id
      
      this.setBasemap(typeof this.attributes.basemap !== "undefined" && this.attributes.basemap)      
      this.setShowInKey(typeof this.attributes.key === 'undefined' || this.attributes.key !== false)          
            
      this.set('print',this.collection.options.print)
      
      this.set('mapConfig',this.collection.options.mapConfig)
      
      this.set('crs', typeof this.attributes.crs !== 'undefined' 
        ? this.attributes.crs
        : this.attributes.mapConfig.crsDefault
      )
      
      
      if (typeof this.attributes.category === 'undefined') {
        this.setCategory('undefined')
      }
      if (typeof this.attributes.subcategory === 'undefined') {
        this.setSubcategory('undefined')
      }
      if (typeof this.attributes.group === 'undefined') {
        this.setGroup('undefined')
      }
      if (typeof this.attributes.optional === "undefined") {
        this.setOptional(true)
      }
      if (typeof this.attributes.attribution === "undefined") {
        this.set('attribution','')
      }
      
//      this.initFeatureAttributeMap()      

      if (this.attributes.type === 'point') {
        this.set("featureAttributeMap", 
          typeof this.attributes.featureAttributeMap !== 'undefined' 
            ? this.attributes.featureAttributeMap 
            : {}
        )
      }
      
      // model source specific initialisation
      this.initializeSource()      
      
      // content url      
      this.initContentURL()                  
      this.initStyles()
      this.initPrintScale()
      this.initCssStyles()
            
      this.setModuleDefault(false)
      this.setActive(false)
      

    },       
    initializeSource: function(){
      // implement in source model              
    },
    loadData : function (){
      // implement in source model              
    },    
    fadeEnabled : function(){
      return this.get('type') !== 'point'
          && this.get('type') !== 'raster'
    },
    setModuleDefault:function(val){
      this.set('isModuleDefault',val)
    },
    isModuleDefault : function(){      
        return this.attributes.isModuleDefault      
    },
    setActive : function(active){
      active = typeof active !== 'undefined' ? active : true   
      // only when not active already
      if (!this.isActive()) {
        this.set('activeTime',active ? Date.now() + this.attributes.order : false) // warning hack to break same time tie        
      }
      this.set('active',active)      
    },
    isActive : function(){
      return this.attributes.active
    },    
    setOptional : function(optional){
      optional = typeof optional !== 'undefined' ? optional : true  
      this.set('optional', optional)
    },  
    isOptional : function(){
      return this.attributes.optional
    },    
  
    setBasemap : function(basemap){
      basemap = typeof basemap !== 'undefined' ? basemap : true  
      this.set('basemap', basemap)
    },    
    isBasemap : function(){
      return this.attributes.basemap
    },    
    setLoading : function(loading){
      loading = typeof loading !== 'undefined' ? loading : true            
      this.set('loading',loading)
    },
    isLoading : function(){
      return this.attributes.loading
    },
    isLoaded : function(){
      return typeof this.attributes.mapLayer !== 'undefined' && !this.isLoading() 
    },    
    isCustom :function(){
      return this.attributes.source === 'custom'
    },
    setShowInKey : function(bool) {
      this.set("showInKey",bool)
    },
    showInKey : function() {
      return this.attributes.showInKey
    },    
    getHint:function(){
      return this.getAttribute('hint',lang)
    },
    getTitle:function(){
      return this.getAttribute('title',lang)
    },
    getDescription:function(){
      return this.getAttribute('description',lang)
    },
    getAttribute:function(attribute, key){
      var value = this.get(attribute)
      if (typeof key !== 'undefined' && typeof value === 'object') {
        return value[key]
      } else {
        return typeof value !== 'undefined' ? value : ''
      }      
    },        
    getType : function(){      
      return this.attributes.type
    },
    setCategory : function(cat){      
      this.set("category",cat)
    },
    getCategory : function(){      
      return this.attributes.category
    },
    setSubcategory : function(sub){      
      this.set("subcategory",sub)
    },
    getSubcategory : function(){      
      return this.attributes.subcategory
    },
    setGroup : function(group){      
      this.set("group",group)
    },
    getGroup : function(){      
      return this.attributes.group
    },
    getOcean : function(){      
      return this.attributes.ocean
    },
    
    getReference : function(){      
      return this.attributes.attribution
    },
    getCrs : function(){
      return this.attributes.crs
    },
    
    initStyles:function(){
      if (this.attributes.type === 'point' ) {        
        // ICON STYLES
        if (typeof this.attributes.icon === 'undefined') {
          this.attributes.icon = {type: 'marker'}          
        } else if (typeof this.attributes.icon.type === 'undefined') {
          this.attributes.icon.type = 'marker'
        } 
      }      
      // MAP STYLES
      var defaultLayerStyles = _.clone(this.collection.options.mapConfig.layerStyles)
      if (typeof defaultLayerStyles[this.getStyleType()] !=='undefined') {
        if (typeof this.attributes.style !=='undefined') {    
          // fillColor: defaults to color
          if (typeof this.attributes.style.color !== 'undefined' ) {
            this.attributes.style.fillColor = typeof this.attributes.style.fillColor !== 'undefined' 
              ? this.attributes.style.fillColor 
              : this.attributes.style.color        
          }
          if (typeof this.attributes.style.opacity !== 'undefined' ) {
            this.attributes.style.fillOpacity = typeof this.attributes.style.fillOpacity !== 'undefined' 
              ? this.attributes.style.fillOpacity 
              : this.attributes.style.opacity    
          }
            
          // extend default styles with layer specific styles
          this.attributes.style = _.extend(
            {},
            defaultLayerStyles[this.getStyleType()],
            _.clone(this.attributes.style)
          )
        } else {
          this.attributes.style = defaultLayerStyles[this.getStyleType()]          
        }
      
        
        // weight: makes sure we have a number and
        this.attributes.style.weight = parseFloat(this.attributes.style.weight)               
      }
      
      if (this.attributes.type === 'raster') {
          this.attributes.style = _.extend(
            {},
            defaultLayerStyles['raster'],
            _.clone(this.attributes.style)
          )
      }
      
      
      if (this.attributes.type === 'point') {        
        // ICON STYLES
        if (typeof this.attributes.icon === 'undefined') {
          this.attributes.icon = {type: 'marker'}          
        } else if (typeof this.attributes.icon.type === 'undefined') {
          this.attributes.icon.type = 'marker'
        } 
        if (this.attributes.icon.type === 'marker'){
          this.attributes.icon.width = 15
          this.attributes.icon.height = 25        
        }
          
        // CLUSTER STYLES
        if (typeof this.attributes.clusterOptions === 'undefined') {
          this.attributes.clusterOptions = { cluster : false }          
        } else if (typeof this.attributes.clusterOptions.cluster === 'undefined') {
          this.attributes.clusterOptions.cluster = true          
        }  
        
        if (this.attributes.clusterOptions.cluster) {            

          // extend default cluster options if present
          this.attributes.clusterOptions.options = _.extend(
            {},
            typeof this.collection.options.mapConfig.clusterOptions !== 'undefined' 
              ? this.collection.options.mapConfig.clusterOptions : {},
            this.attributes.clusterOptions.options
          )

          // check for custom cluster icon style
          if (typeof this.attributes.clusterOptions.iconStyle === 'undefined') {              
            this.attributes.clusterOptions.iconStyle = {
              "size" : 30,
              "default": {
                "backgroundColor":this.attributes.style.fillColor,
                "color":this.attributes.style.color
              }
            }
          }
          _.extend(
            this.attributes.clusterOptions.options,
            { iconCreateFunction : _.bind(this.clusterIconCreateFunction,this) }                              
          )

        }        
      }
    },
    initPrintScale : function(){
      

      // PRINT SCALE
      this.scaleFactor       = 1
      this.scaleFactorCircle = 1
      this.scaleFactorMarker = 1        
      
      if (this.collection.options.print && this.scaleFactorCircle === 1) {
        this.scaleFactor       = this.collection.options.mapConfig.printScales.default
        this.scaleFactorCircle = this.collection.options.mapConfig.printScales.circle
        this.scaleFactorMarker = this.collection.options.mapConfig.printScales.marker
        
        // weight:  adjust style for print resolution             
        if (typeof this.attributes.style.weight !== 'undefined') {
          if (!(this.attributes.type === 'point' && this.attributes.icon.type === 'marker')){
            this.attributes.style.weight = Math.min(this.attributes.style.weight * this.scaleFactor,5)
          }
        }
        
        // circleSize
        if (typeof this.attributes.icon !== 'undefined' && this.attributes.icon.type === 'circle') {
          this.attributes.icon.size = this.attributes.icon.size * this.scaleFactorCircle
        }
        
        if (this.attributes.type === 'point') {  
          if (this.attributes.clusterOptions.cluster) {                    
            this.attributes.clusterOptions.options.maxClusterRadius = 
              this.attributes.clusterOptions.options.maxClusterRadius * this.scaleFactor  
          }
          if (this.attributes.icon.type === 'marker'){
            this.attributes.icon.width = this.attributes.icon.width * this.scaleFactorMarker
            this.attributes.icon.height = this.attributes.icon.height * this.scaleFactorMarker
          }
        }
      }
    },
    initCssStyles : function(){
      
      // CSS STYLE
      this.attributes.cssStyle =  _.clone(this.collection.options.mapConfig.cssStyle)
 
      // border
      if (typeof this.attributes.style !== 'undefined') {
        
        // border-color, border-width, border-radius
        if (this.attributes.style.weight > 0 || this.getStyleType() === 'line') {
          
          this.attributes.cssStyle.borderColor = this.attributes.style.color

          // set borderWidth based on style weight but make sure its thick enough
          this.attributes.cssStyle.borderWidth = Math.max(this.attributes.style.weight, this.getStyleType() === 'circle' ?  1 : 2)
          this.attributes.cssStyle.borderRadius = 
              typeof this.attributes.icon !== 'undefined' && this.attributes.icon.type === 'circle'
                ? this.attributes.icon.size/2
                : 0                   
        } 
        if (this.getKeyType() === 'categorical' || this.getKeyType() === 'gradient') {
          this.attributes.layerCategories = []
          _.each(this.attributes.key.categories,function(category){          
              var colorRgb = category.fillColor.colorToRgb()                      
              var colorRgba = 'rgba('+colorRgb[0]+','+colorRgb[1]+','+colorRgb[2]+','+
                  Math.min(1,Math.max(0.5,this.attributes.style.opacity*1.5))+')'
          
              var title = typeof category.title !== 'undefined' 
                ? typeof category.title === 'object' 
                  ? category.title[lang] 
                  : category.title
                : this.getTitle()
                
              this.attributes.layerCategories.push({
                color:colorRgba,
                label: title
              })              
          },this)                                  
        }
        
        if ( this.getKeyType() === 'multiPolygon') {
          this.attributes.cssStyle.borderColor = ''
          this.attributes.layerCategories = []
          var colors = []
          
          _.each(this.attributes.featureStyle,function(value, index){
            // default to color
            if (index !== 'attribute') {
              value.style.fillColor = typeof value.style.fillColor !== 'undefined' 
                ? value.style.fillColor
                : typeof value.style.color !== 'undefined' 
                  ? value.style.color
                  : this.attributes.style.fillColor
              value.style.fillOpacity = typeof value.style.fillOpacity !== 'undefined' 
                ? value.style.fillOpacity
                : typeof value.style.opacity !== 'undefined' 
                  ? value.style.opacity
                  : this.attributes.style.fillOpacity
            }
            var style = _.extend({},this.attributes.style,value.style)
            if (index !== 'attribute' && typeof style.fillColor !== 'undefined') {     
              var colorRgb = style.fillColor.colorToRgb()                      
              var colorRgba = 'rgba('+colorRgb[0]+','+colorRgb[1]+','+colorRgb[2]+','+
                  Math.min(1,Math.max(0.5,style.fillOpacity*1.5))+')'
              colors.push(colorRgba)                            
              
              var title = typeof value.title !== 'undefined' 
                ? typeof value.title === 'object' 
                  ? value.title[lang] 
                  : value.title
                : this.getTitle()
              
              this.attributes.layerCategories.push({
                color:colorRgba,
                label: title
              })
            }                        
          },this)
          
          
          // fill up colors
          switch (colors.length) {
            case 0:              
              var colorRgba = this.attributes.style.fillColor.colorToRgb()   
              var color = 'rgba('+colorRgba[0]+','+colorRgba[1]+','+colorRgba[2]+','+
                  Math.min(1,Math.max(0.5,this.attributes.style.fillOpacity*1.5))+')'
              colors.push(color)
              colors.push(color)
              colors.push(color)
              colors.push(color)
              break;
            case 1:              
              colors.push(colors[0])
              colors.push(colors[0])
              colors.push(colors[0])
              break;
            case 2:
              colors.push(colors[1])
              colors.push(colors[0])
              break;
            case 3:                
              colors.push(colors[0])
              break;                
          }
          _.each(colors,function(color, index){
            if (index < 4){
              this.attributes.cssStyle.borderColor += color + ' '
            }
          },this)                      
        } 
        
        // background color
        if ( typeof  this.attributes.style.fillColor !== 'undefined') {
          
          var bgRgba = this.attributes.style.fillColor.colorToRgb()        
          this.attributes.cssStyle.backgroundColor = 
              'rgba('+bgRgba[0]+','+bgRgba[1]+','+bgRgba[2]+','+Math.min(1,Math.max(0.4,this.attributes.style.fillOpacity*1.85))+')'             
        }
        
    
        
        // background image
        if (this.getStyleType() === 'image') {
          var iconUrl 
          if ( typeof this.attributes.key !== 'undefined' ) {
            if (typeof this.attributes.key.iconRetinaUrl !== 'undefined' && L.Browser.retina){
              iconUrl = this.attributes.key.iconRetinaUrl
            } else {
              if (typeof this.attributes.key.iconUrl !== 'undefined' ) {
                iconUrl = this.attributes.key.iconUrl              
              }
            }
          } else {
            if (typeof this.attributes.icon.style.iconUrl === 'object' ) {
              iconUrl = this.attributes.icon.style.iconUrl.key
            } else {
              iconUrl = this.attributes.icon.style.iconUrl
            }
          }        

          this.attributes.cssStyle.backgroundImage = "url('" + $("#application").data('baseurl') + '/' + iconUrl +"')"
        }         
      }         
    },
    
    initContentURL:function(){
      var url = '/' 
      if (typeof this.attributes.pageid !== 'undefined') {
        url += 'page/'
        url += (typeof this.attributes.pageid !== 'undefined' ? this.attributes.pageid : this.id )         
      } else {      
        url += 'layers/'
        url += (typeof this.attributes.contentid !== 'undefined' ? this.attributes.contentid : this.id )         
      }
      url += '/'             
      this.set('url',url) 
    }, 
    
    getKeyType : function(){      
      var type
      if (typeof this.attributes.key !== 'undefined' 
      && typeof this.attributes.key.type !== 'undefined') {
        type = this.attributes.key.type                  
      } else {        
        
        if (this.attributes.type === 'polygon' 
          && typeof this.attributes.featureStyle !== 'undefined'
        ) {
          type = 'multiPolygon'
        } else {
          type = this.getStyleType()
        }      
      }
      return type
    },
    getStyleType : function(){      
      var type = 'default'
      if (typeof this.attributes.key !== 'undefined' 
      && typeof this.attributes.key.type !== 'undefined') {
        type = this.attributes.key.type                  
      } else {        
        
        if (this.attributes.type === 'point') {      
          type = this.attributes.icon.type
        } else if (this.attributes.type === 'mixed') {      
          type = 'polygon'
        } else {
          type = this.attributes.type
        }                         
      }      
      return type
    },
    getKeySquareIcon : function(size){
      return _.template(keyIconTemplate)({
        keySquare:this.getKeySquare("key-"+ size +" key-inner"),
        styleType: this.getStyleType(),
        size:size
      })
    },
    getKeySquare : function(classes) {
      
      switch (this.getKeyType()) {
        case 'multiPolygon':
          classes += ' multiple-areas'
          return '<span class="'+ classes + '" style="'+ this.getCssStyle() + '"></span>' 
          break
        case 'marker':
          var color 
          var colorRgb = this.attributes.style.fillColor.colorToRgb()                      
          var fillColor = 'rgba('+colorRgb[0]+','+colorRgb[1]+','+colorRgb[2]+','+this.attributes.style.fillOpacity+')'           
          colorRgb = this.attributes.style.color.colorToRgb()                      
          var color = 'rgba('+colorRgb[0]+','+colorRgb[1]+','+colorRgb[2]+','+this.attributes.style.opacity+')'             
          var svgIcon = _.template(divSvgIconTemplate)({
            color: color,
            weight: this.attributes.style.weight,
            fillColor: fillColor
          })
          return svgIcon
          
        case 'categorical' : 
          classes += ' categorical'                         
          return _.template(layerKeyCategoricalTemplate)({
            colors:_.pluck(this.attributes.layerCategories,'color'),
            classes: classes
          })
          break;
        case 'gradient' :
          classes += ' key-gradient'                    
          var minColorRgb = this.attributes.key.minmax.min.fillColor.colorToRgb()
          minColorRgb = 'rgb('+minColorRgb[0]+','+minColorRgb[1]+','+minColorRgb[2]+')'             

          var maxColorRgb = this.attributes.key.minmax.max.fillColor.colorToRgb()
          maxColorRgb = 'rgb('+maxColorRgb[0]+','+maxColorRgb[1]+','+maxColorRgb[2]+')'             

          return _.template(layerKeyGradientTemplate)({          
            min: minColorRgb,
            max: maxColorRgb,
            classes: classes
          })  
          break
        default:
          return '<span class="'+ classes + '" style="'+ this.getCssStyle() + '"></span>'        
          break;
      }
    },    

    makeLayerGradientKey:function(){
      if ( this.getKeyType() === 'gradient' ) {
        var minColorRgb = this.attributes.key.minmax.min.fillColor.colorToRgb()
        minColorRgb = 'rgb('+minColorRgb[0]+','+minColorRgb[1]+','+minColorRgb[2]+')'             
        
        var maxColorRgb = this.attributes.key.minmax.max.fillColor.colorToRgb()
        maxColorRgb = 'rgb('+maxColorRgb[0]+','+maxColorRgb[1]+','+maxColorRgb[2]+')'             
        
        return _.template(layerKeyFullGradientTemplate)({          
          minLabel : typeof this.attributes.key.minmax.min.title === 'object' 
            ? this.attributes.key.minmax.min.title[lang]
            : this.attributes.key.minmax.min.title,
          maxLabel : typeof this.attributes.key.minmax.max.title === 'object' 
            ? this.attributes.key.minmax.max.title[lang] 
            : this.attributes.key.minmax.max.title,
          min: minColorRgb,
          max: maxColorRgb
        })
      } else {
        return false
      }
    },
    makeLayerCategoriesKey : function(){
      
      if (this.getKeyType() === 'multiPolygon' 
        || this.getKeyType() === 'categorical'
        || this.getKeyType() === 'gradient'
      ) {
        var layerCategories = []
        _.each(this.attributes.layerCategories,function(group){          
            layerCategories.push({
              color : '<span class="feature-group-color" style="background-color:'+ group.color + ';"></span>',
              label : '<span class="feature-group-label hint">'+ group.label+'</span>'
            })                                  
        },this)        
        return layerCategories
      } else {
        return false
      }
    },
    
    getCssStyle : function(type){
      type = typeof type !== "undefined" ? type : this.getKeyType()
      var css = ''
      switch (type) {                  
        case "line" : 
          css = 'border-color:' + this.attributes.cssStyle.borderColor +';'
          break
        case "marker" : 
        case "polygon" :           
          css = 'background-color:' + this.attributes.cssStyle.backgroundColor +';'
          if (this.attributes.style.weight > 0 ) {
            css += 'border-color:' + this.attributes.cssStyle.borderColor +';'
            css += 'border-width:' + this.attributes.cssStyle.borderWidth +'px;'
          }
          break
        case "multiPolygon" :           
          css = 'border-color:' + this.attributes.cssStyle.borderColor +';'          
          break
        case "circle" :           
          css = 'background-color:' + this.attributes.cssStyle.backgroundColor +';'
          if (this.attributes.style.weight > 0 ) {
            css += 'border-color:' + this.attributes.cssStyle.borderColor +';'
            css += 'border-width:' + this.attributes.cssStyle.borderWidth +'px;'
          }
          break
        case "image" :           
          css = 'background-image:' + this.attributes.cssStyle.backgroundImage +';'
          break
      }
      return css

    },
    
    

    getMapLayer : function(callback,options,force){      
      force = typeof force !== 'undefined' ? force : false
      
      
      
      if (this.isLoaded() && !force){   
        if (typeof callback !== 'undefined') {
          callback(this.attributes.mapLayer, this)
        }
      } else {
        var that = this
        // already loading
        if (this.attributes.loading && !force) {
          waitFor(
            function(){ return that.isLoaded() },
            function(){ 
              if (typeof callback !== 'undefined') {
                callback(that.attributes.mapLayer, that )
              }
            }
          )
        } else {		  
          
          this.loadData(
            function(result){
            // todo add error handling
              
              switch (that.attributes.type) {
                case 'point' :
                  that.set('mapLayer', that.handleResultForPointLayer(result))
                  break
                case 'polygon' :
                  that.set('mapLayer', that.handleResultForPolygonLayer(result))
                default:
                  that.set('mapLayer', result) 
                  break                
              }
              
              if (typeof callback !== 'undefined') {
                callback(that.attributes.mapLayer, that)
              }
            },
            options
          )
        }
      }
    },        
    
    
    handleResultForPolygonLayer: function(result) {
      var options = this.collection.options.mapConfig
      var labelOptions = typeof options.labelOptions !== 'undefined' ? options.labelOptions : {}      
      
        // setup features
        this.set('features', new FeatureCollection(
          _.map(result.getLayers(),function(featureLayer){                                    
            return _.extend({}, featureLayer.feature.properties,
              {
                featureAttributeMap:this.attributes.featureAttributeMap,
                featureLayer : featureLayer,
                parentLayer:this,
                labelOptions:labelOptions,
                className : result.options.className
              }
            )
          },this),
          {
            model:FeatureModel,
            print: this.collection.options.print,
            printScale:this.scaleFactor
          }
        ))
        
        var featureGroup = new L.layerGroup()        
        _.each(this.get('features').models,function(feature){
          featureGroup.addLayer(feature.get('featureLayer'))
        },this)

        return featureGroup
      
    },
    handleResultForPointLayer: function(result) {
      var options = this.collection.options.mapConfig                
      var labelOptions = {}
      if (typeof options !== 'undefined' 
        && typeof options.labelOptions !== 'undefined') {
        labelOptions = $.extend(true,{},options.labelOptions)
      } 
      labelOptions.options.className = typeof labelOptions.options.className !== 'undefined'
        ? labelOptions.options.className
        : 'pointLabel'
      
      
      // setup locations
      this.set('locations', new LocationCollection(
        _.map(result.getLayers(),function(marker){                                    
          return _.extend({}, marker.feature.properties,
            {
              featureAttributeMap:this.attributes.featureAttributeMap,
              markerLayer : marker,
              parentLayer:this,
              labelOptions:labelOptions,
              className : result.options.className
            }
          )
        },this),
        {
          model:LocationModel,
          print: this.collection.options.print,
          printScale:this.scaleFactorMarker
        }
      ))

      var markerGroup = this.attributes.clusterOptions.cluster 
        ? new L.markerClusterGroup(this.attributes.clusterOptions.options)                 
        : new L.layerGroup()              
      
      _.each(this.get('locations').models,function(location){        
        markerGroup.addLayer(location.get('markerLayer'))
      },this)
      
      return markerGroup
    },
    clusterIconCreateFunction : function (cluster) {
      var clusterStyle = this.attributes.clusterOptions.iconStyle
      
      // check attribute specific styles
      var values = typeof clusterStyle.attribute !== 'undefined' 
        ? _.uniq(_.map(cluster.getAllChildMarkers(), function(marker){
            return marker.options.parent.attributes[clusterStyle.attribute]
          }))
        : []
      var style = (values.length === 1)
        ? clusterStyle[values[0]]
        : clusterStyle['default']
      
      // style outer, transparent cluster circle       
      // get rgb background color
      var bgColor_outer = typeof style.backgroundColor !== 'undefined' 
        ? style.backgroundColor.colorToRgb() 
        : [255,255,255]
      var css_outer = 'background-color:rgba('+bgColor_outer[0]+','+bgColor_outer[1]+','+bgColor_outer[2]+',0.5);'
      
      // style inner circle      
      // set background colour
      var css_inner = typeof style.backgroundColor !== 'undefined' 
        ? 'background-color:'+style.backgroundColor+';' 
        : ''
      // set font color
      css_inner += typeof style.color !== 'undefined' 
        ? 'color:'+style.color+';' 
        : ''

      
      return new L.DivIcon({ 
        html: _.template(clusterIconTemplate)({
          css_outer : css_outer,
          css_inner : css_inner,
          childCount : cluster.getChildCount()
        })
, 
        className: 'marker-cluster', 
        iconSize: new L.Point(clusterStyle.size * this.scaleFactor, clusterStyle.size * this.scaleFactor) 
      });
    }
  });

  return LayerModel;

});



