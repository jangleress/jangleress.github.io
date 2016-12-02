define([
  'jquery', 'underscore', 'backbone',
  'leaflet',  
  'leaflet.label',  
  'text!templates/labelTemplate.html',
  'text!templates/divIconTemplate.html'
], function($,_, Backbone, 
  leaflet,
  leafletLabel,
  labelTemplate
){
  
  var FeatureModel = Backbone.Model.extend({
    initialize : function(options) {
      this.options = options || {};    
            
      // set parent reference on marker
//      this.attributes.marker.options.parent = this
      
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
      this.makeFeatureLabel()
      this.initStyles()
    },  
    
    initStyles:function(){
      var featureStyle = this.attributes.parentLayer.attributes.featureStyle
      if (typeof featureStyle !== 'undefined'){
                
        var attrValue = this.attributes[featureStyle.attribute].split(' ').join('-')
        
//        if (this.attributes.featureStyle.attribute)
//        
//        var style = this.attributes.featureStyle[this.attributes.featureStyle.attribute]
//      
        if (typeof featureStyle[attrValue] !== 'undefined') {
          this.attributes.featureLayer.setStyle(featureStyle[attrValue].style)
        }
        
      }
    },
    
    getAttributeValue: function(attr){
      var attr_split_prefix = attr.split('[')     
      var prefix = attr_split_prefix[0]

      var attr_split_suffix = attr_split_prefix[1].split(']')     
      var suffix = attr_split_suffix.length > 1 ? attr_split_suffix[1] : ''
      var attr = attr_split_suffix[0]

      return prefix + this.attributes[attr] + suffix
    },        
    makeFeatureLabel : function(){
        
        var title = this.getTitle()
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
        this.attributes.featureLayer.bindLabel(
          _.template(labelTemplate)(args),
          this.attributes.labelOptions.options      
        )

    },    
    getCategoryText:function(){
      
      var cat = this.getCategory()
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
      return this.get('featureCategory')      
    },
    getTitle:function(){
      return this.getAttribute('featureTitle',lang)
    },
    getDescription:function(){
      return this.getAttribute('featureDescription',lang)
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

  return FeatureModel;

});



