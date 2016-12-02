define([
  'jquery', 'underscore', 'backbone'
], function($,_, Backbone) {

  var ModalModel = Backbone.Model.extend({
    initialize : function(options){
      this.options = options || {};
    },
    getLayers : function(){
      return this.attributes.layers
    },
    getModal : function(){
      return this.attributes.modal
    },
    getOcean : function(){
      return this.attributes.ocean
    },
    getModalId : function(){
      return this.attributes.modalid
    },    
    setPrintURL : function(url){
      this.set('printURL',url)
    },
    getPrintURL : function(){
      return this.attributes.printURL
    },
    getPath : function(){
      return this.attributes.path
    },
    getPages : function(){
      return this.attributes.pages
    },
    setActive : function(active){
      active = typeof active !=='undefined' ? active : true
      this.set('active', active)
    },
    isActive : function(){
      return this.get('active')
    },
  });

  return ModalModel;

});
