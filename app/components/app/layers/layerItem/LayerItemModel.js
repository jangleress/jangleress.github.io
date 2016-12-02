define([
  'jquery', 'underscore', 'backbone'
], function($,_, Backbone) {

  var LayerItemModel = Backbone.Model.extend({
    initialize : function(options){
      this.options = options || {};
    },
    getLayer : function(){
      return this.attributes.layer
    },
    getOcean : function(){
      return this.attributes.ocean
    },
    setActiveLayerIds : function(activeLayerIds){
      return this.set('activeLayerIds',activeLayerIds)
    },    
    setActive : function(active){
      active = typeof active !=='undefined' ? active : true
      this.set('active', active)
    },
    isActive : function(){
      return this.get('active')
    }
  });

  return LayerItemModel;

});
