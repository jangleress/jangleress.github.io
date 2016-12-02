define([
  'jquery', 'underscore', 'backbone'
], function($,_, Backbone) {

  var KeyModel = Backbone.Model.extend({
    initialize: function (options) {
      this.options = options || {}
      this.set('activeLayers',[])
      this.set('addLayers',[])
    },
    setActiveLayers : function(layers){

      this.set('addLayers', _.difference(layers,this.attributes.activeLayers)) // in active layers but not in previous

      this.set('activeLayers', layers)
    },
    setAllowLayerToggle : function(bool) {
      this.set('allowLayerToggle',bool)
    },
    setCustomLayerData : function(cdata) {
      this.set('customLayerData',cdata)
    },
    getAllowLayerToggle : function() {
      return this.attributes.allowLayerToggle
    },
    getActiveLayers: function () {
      return this.attributes.activeLayers
    },
    getAddLayers : function(){
      return this.attributes.addLayers
    },
    setActive : function(active){
      active = typeof active !=='undefined' ? active : true
      this.set('active', active)
    },
    isActive : function(){
      return this.get('active')
    },    
  });

  return KeyModel;

});
