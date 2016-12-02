define([
  'jquery', 'underscore', 'backbone',
  './ContentModel'
], function($,_, Backbone, 
  ContentModel
){
  
  var OceanModel = ContentModel.extend({
    initialize : function(options) {
      this.options = options || {};    
      this.isContentLoading = false
      this.isContentLoaded = false      
      
      var url = '/ocean/' + this.id + '/'
      
      this.set('url',url)
    },
    getTitle:function(){
      return tlang.oceans[this.id]
    },
    getMapview : function (){
      return this.attributes.mapview
    },
    getMarker : function(){
      return this.attributes.marker.split('|').reverse()
    }
  });

  return OceanModel;

});



