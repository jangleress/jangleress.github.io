define([
  'jquery', 'underscore', 'backbone'
], function($,_, Backbone) {

  var PrintModel = Backbone.Model.extend({
    initialize: function (options) {
      this.options = options || {}
    },
    getActiveLayers: function () {
      return this.attributes.activeLayers
    },
    getMapId : function(){
      return this.attributes.mapid
    }
  });

  return PrintModel;

});
