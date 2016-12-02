define([
  'jquery', 'underscore', 'backbone',
  'leaflet',  
  './ContentModel',
  'text!templates/labelTemplate.html',
  'text!templates/textIconTemplate.html',
  'text!templates/divIconTemplate.html',
  'text!templates/divSvgIconTemplate.html'
], function($,_, Backbone, 
  leaflet,
  ContentModel,
  labelTemplate,
  textIconTemplate,
  divIconTemplate,
  divSvgIconTemplate
){
  
  var LocationModel = ContentModel.extend({
    initialize : function(options) {
      this.options = options || {};    
      this.isContentLoading = false
      this.isContentLoaded = false
      
      this.set('active',false)
      
      // set parent reference on marker
      this.attributes.markerLayer.options.parent = this
      
      // map data attributes
      if (typeof this.attributes.featureAttributeMap !== 'undefined'){
        _.each(this.attributes.featureAttributeMap,function(attr,key){
          
          // language dependent
          if (typeof attr === 'object') {
            var values = {}            
            //for each language
            _.each(attr,function(attribute,lang){
              if(_.contains(attribute,'[')){
                values[lang] = this.getAttributeValue(attribute)
              } else {
                values[lang] = this.attributes[attribute]
              }              
            },this)
            this.set(key,values)
             
          } else {
          
            if(_.contains(attr,'[')){
              this.set(key, this.getAttributeValue(attr))
            } else {
              this.set(key, this.attributes[attr])
            }
          }
          
        },this)
      }      
      this.makeIcon()
      if (typeof this.attributes.parentLayer.get('tooltip') === 'undefined' || this.attributes.parentLayer.get('tooltip')) {
        this.makeLocationLabel()
      }      
      this.initInteractions()
      
    },    
    getAttributeValue: function(attr){
      var attr_split_prefix = attr.split('[')     
      var prefix = attr_split_prefix[0]

      var attr_split_suffix = attr_split_prefix[1].split(']')     
      var suffix = attr_split_suffix.length > 1 ? attr_split_suffix[1] : ''
      var attr = attr_split_suffix[0]

      return prefix + this.attributes[attr] + suffix
    },
    initInteractions:function(){
      var parentLayer = this.attributes.parentLayer
      
      var that = this
      this.attributes.markerLayer
        .off('click')
        .on('click',function(e){              
          if (typeof that.collection.options.eventContext !== "undefined") {
            that.collection.options.eventContext.trigger('mapMarkerClick',{
              target:e.target,
              layerId: parentLayer.get('id'),
              locationId:that.get('id')                
            })
          }
        }) 
    },
    
    makeIcon:function(){
      var parentLayer = this.attributes.parentLayer
      
      var icon
      
      switch (parentLayer.get('icon').type) {
        case 'image':            
          // style
          var iconOptions = _.clone(parentLayer.get('icon').style)
          // classes
          iconOptions.className = 'image-icon ' + this.attributes.className
          
          // image url
          if(typeof iconOptions.iconUrl === 'object') {            
            iconOptions.iconUrl = iconOptions.iconUrl[this.attributes[iconOptions.iconUrl.attribute]]
            if(typeof iconOptions.iconUrl === 'object') {            
              iconOptions.iconUrl = iconOptions.iconUrl[this.attributes[iconOptions.iconUrl.attribute]]
            }
          }                    
          if (this.get('active')) {
            iconOptions.iconUrl = iconOptions.iconUrl.replace('.png','-active.png')            
          }            
          iconOptions.iconUrl = $('#application').data('baseurl') + '/' + iconOptions.iconUrl          

          // scale for print mode
          if (this.collection.options.print) {
            iconOptions.iconSize = [
              iconOptions.iconSize[0] * this.collection.options.printScale, 
              iconOptions.iconSize[1] * this.collection.options.printScale
            ]
            iconOptions.iconAnchor = [
              iconOptions.iconAnchor[0] * this.collection.options.printScale, 
              iconOptions.iconAnchor[1] * this.collection.options.printScale
            ]

            iconOptions.iconUrl = iconOptions.iconUrl.replace('.png','@2.png')            

          } else {                    
            iconOptions.iconRetinaUrl = iconOptions.iconUrl.replace('.png','@2.png')          
          }

          icon = L.icon(iconOptions)
          
          break;
        
        case 'circle' :

          icon = L.divIcon({
            html:_.template(divIconTemplate)({cssStyle:parentLayer.getCssStyle('circle')}),
            className: 'circle-icon ' + this.attributes.className,
            iconSize: new L.Point(parentLayer.get('icon').size,parentLayer.get('icon').size)
          });   
          break;
          
        case 'text-icon-circle' :
      
          var title = this.attributes[parentLayer.get('icon').title.attribute]

          var styleAttribute = this.attributes[parentLayer.get('icon').style.attribute]
          var style = parentLayer.get('icon').style[styleAttribute]

          var iconClass = style.icon
          var color = style.color
          var fillColorRgb = style.fillColor.colorToRgb()
          var fillColorRgbaOuter = 'rgba('+fillColorRgb[0]+','+fillColorRgb[1]+','+fillColorRgb[2]+',0.5)'
          var fillColorRgb = 'rgb('+fillColorRgb[0]+','+fillColorRgb[1]+','+fillColorRgb[2]+')'
          var size = style.size
          var paddingOuter = style.paddingOuter

          icon = L.divIcon({
            html:_.template(textIconTemplate)({            
              title:title,
              iconClass:iconClass,
              size:size,
              paddingOuter:paddingOuter,
              color:color,
              fillColor:fillColorRgb,
              fillColorOuter:fillColorRgbaOuter
            }),
            className: 'text-icon',
            iconSize: new L.Point(size,size)
          });
          break;
        case 'marker' :
        default:
          var w = parentLayer.get('icon').width
          var h = parentLayer.get('icon').height
          var color 
          var colorRgb = parentLayer.attributes.style.fillColor.colorToRgb()                      
          var fillColor = 'rgba('+colorRgb[0]+','+colorRgb[1]+','+colorRgb[2]+','+parentLayer.attributes.style.fillOpacity+')'           
          colorRgb = parentLayer.attributes.style.color.colorToRgb()                      
          var color = 'rgba('+colorRgb[0]+','+colorRgb[1]+','+colorRgb[2]+','+parentLayer.attributes.style.opacity+')'             
          var svgIcon = _.template(divSvgIconTemplate)({
            color: color,
            weight: parentLayer.attributes.style.weight,
            fillColor: fillColor
          })
          
          icon =  L.icon( {
            iconUrl: "data:image/svg+xml;base64," + btoa(svgIcon),
            iconSize: [w, h],
            iconAnchor: [w/2, h]
          })
          
          break
      }
      this.attributes.markerLayer.setIcon(icon)
      
    },    
    makeLocationLabel : function(){

      var title = this.getFeatureTitle()
      title = (typeof title !== 'undefined' && title !== '<Null>' ? title : '')
      
      var category = this.getCategoryText()
      category = (typeof category !== 'undefined' && category !== '<Null>' ? category : '')
      
      var supTitle = this.attributes.parentLayer.getTitle()
      
      var displayTitle = (category !== '' ? category : '')
        + (title !== '' && category !== '' ? ': ' : '')
        + (title !== '' ? title : '')

      if (typeof displayTitle === 'undefined' || displayTitle === '') {
        displayTitle = supTitle
        supTitle = ''
      }


      var args = {
        supTitle : supTitle,
        title : displayTitle,
        description : this.getDescription(lang),             
      }
      this.attributes.markerLayer.bindLabel(
        _.template(labelTemplate)(args),
        this.attributes.labelOptions.options  
      )

    },    
    getCategoryText:function(){
      
      var cat = this.get('category')
      if (cat && typeof cat === 'object') {
        return cat[lang]
      } else {
        if (typeof tlang.categories[cat] !== 'undefined') {
          // global language object
          return tlang.categories[cat]
        } else {
          return cat
        }
      }       
      
      return this.getAttribute('featureTitle',lang)
    },
    getCategory:function(){
      return this.get('category')      
    },
    getFeatureTitle:function(){
      return this.getAttribute('title',lang) !== 'undefined' 
        ? this.getAttribute('title',lang)
        : this.getAttribute('featureTitle',lang)
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
    }
  });

  return LocationModel;

});



