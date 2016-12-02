define([
  'jquery', 'underscore', 'backbone'
], function($,_, Backbone) {

  var LayersModel = Backbone.Model.extend({
    initialize : function(options){
      this.options = options || {};
    },
    getCategory : function(){
      return this.attributes.category
    },
    getOcean : function(){
      return this.attributes.ocean
    },
    getLayerId : function(){
      return this.attributes.layerId
    },
    getLayers : function(){
      return this.attributes.layers
    },
    setActiveLayerIds : function(activeLayerIds){
      return this.set('activeLayerIds',activeLayerIds)
    },
    getActiveLayerIds : function(){
      return this.attributes.activeLayerIds
    },
    setActive : function(active){
      active = typeof active !=='undefined' ? active : true
      this.set('active', active)
    },
    isActive : function(){
      return this.get('active')
    },
  });

  return LayersModel;

});
