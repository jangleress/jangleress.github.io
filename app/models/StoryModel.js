define([
  'jquery', 'underscore', 'backbone',
  './ContentModel'
], function($,_, Backbone, 
  ContentModel
){
  
  var StoryModel = ContentModel.extend({
    initialize : function(options) {
      this.options = options || {};    
      this.isContentLoading = false
      this.isContentLoaded = false      
            
      var url = '/story/' + this.id + '/'
      
      this.set('url',url)
    },
    getTitle:function(){
      return this.attributes.title[lang]
    },
    getOceanId:function(){
      return this.attributes.ocean
    },
    getMapview : function (){
      return this.attributes.mapview
    },
    getMarker : function(){
      return this.attributes.marker.split('|').reverse()
    }
  });

  return StoryModel;

});



