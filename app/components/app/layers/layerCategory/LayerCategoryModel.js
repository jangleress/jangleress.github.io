define([
  'jquery', 'underscore', 'backbone'
], function($,_, Backbone) {

  var LayerCategoryModel = Backbone.Model.extend({
    initialize : function(options){
      this.options = options || {};
    },
    setActive : function(active){
      active = typeof active !=='undefined' ? active : true
      this.set('active', active)
    },
    isActive : function(){
      return this.get('active')
    },
    getCategory : function(){
      return this.attributes.category
    },
    getCategories : function(){
      return this.attributes.categories
    },
    setCategories : function(categories){
      this.set('categories',categories)
    },        
    getLayers : function(){
      return this.attributes.layers
    },
    setLayers : function(layers){
      this.set('layers', layers)
    },
    setActiveLayerIds : function(activeLayerIds){
      this.set('activeLayerIds', activeLayerIds)
    },
    getOcean : function(){
      return this.attributes.ocean
    }
  });

  return LayerCategoryModel;

});
