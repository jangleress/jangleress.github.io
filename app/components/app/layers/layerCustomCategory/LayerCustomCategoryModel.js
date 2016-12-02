define([
  'jquery', 'underscore', 'backbone'
], function($,_, Backbone) {

  var LayerCustomCategoryModel = Backbone.Model.extend({
    initialize : function(options){
      this.options = options || {};
      this.set('editTitleId', '')
      this.set('editColorId', '')
    },
    setActive : function(active){
      active = typeof active !=='undefined' ? active : true
      this.set('active', active)
    },
    isActive : function(){
      return this.attributes.active
    },
    getCategory : function(){
      return this.attributes.category
    },
    setCategories : function(categories){
      this.set('categories',categories)
    },    
    getCategories : function(){
      return this.attributes.categories
    },    
    setLayers : function(layers){
      return this.set('layers',layers)
    },
    getLayers : function(){
      return this.attributes.layers
    },
    setEdit : function(layerid){
      this.set('edit', layerid)
    },
    setCustomData : function(cdata){
      this.set('customData', cdata)
    },
    getCustomData : function(){
      return this.attributes.customData
    },
    setEditTitleId : function(layerid){
      this.set('editTitleId', layerid)
    },
    getEditTitleId : function(){
      return this.attributes.editTitleId
    },
    setEditColorId : function(layerid){
      this.set('editColorId', layerid)
    },
    getEditColorId : function(){
      return this.attributes.editColorId
    },
    setActiveLayerIds : function(activeLayerIds){
      this.set('activeLayerIds', activeLayerIds)
    },
    getOcean : function(){
      return this.attributes.ocean
    }
  });

  return LayerCustomCategoryModel;

});
