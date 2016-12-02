define([
  'jquery', 'underscore', 'backbone'
], function($,_, Backbone) {

  var HeaderModel = Backbone.Model.extend({
    initialize : function(options){
      this.options = options || {};
    },
    setActivePath : function (path) {
      this.set('activePath', path)
    },
    setActivePage : function (page) {
      this.set('activePage', page)
    },
    getActivePage : function (){
      return this.attributes.activePage
    },
    getMode : function () {
      return this.attributes.mode
    }
  });

  return HeaderModel;

});
