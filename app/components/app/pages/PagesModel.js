define([
  'jquery', 'underscore', 'backbone'
], function($,_, Backbone) {

  var PagesModel = Backbone.Model.extend({
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
    setPath : function(path){
      this.set('path', path)
    },
    getPageId : function(){
      return this.attributes.path
    },
    getPages : function(){
      return this.attributes.pages
    },
    getPage : function(){
      return this.attributes.pages.findWhere({id:this.attributes.path})
    },
    getPagesByCategory: function(){
      return this.attributes.pages.where({parent:this.getPage().getParent()})
    }

  });

  return PagesModel;

});
