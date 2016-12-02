define([
  'jquery', 'underscore', 'backbone'
], function($,_, Backbone) {

  var LayerHomeModel = Backbone.Model.extend({
    initialize : function(options){
      this.options = options || {};
    },
    getContent : function(){
      return this.attributes.content
    },
    getOcean : function(){
      return this.attributes.ocean
    },
    setOcean : function(ocean){
      this.set("ocean", ocean)
    },
    getCategories : function(){
      return this.attributes.categories
    },
    setCategories : function(categories){
      this.set('categories',categories)
    },    
    setActive : function(active){
      active = typeof active !=='undefined' ? active : true
      this.set('active', active)
    },
    isActive : function(){
      return this.get('active')
    }
  });

  return LayerHomeModel;

});
