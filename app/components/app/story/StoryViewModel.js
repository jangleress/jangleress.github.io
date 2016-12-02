define([
  'jquery', 'underscore', 'backbone',
  'models/ViewModel'
], function($,_, Backbone,ViewModel) {

  return ViewModel.extend({
    initialize : function(options){
      this.options = options || {};
    },
    getLayers : function(){
      return this.attributes.layers
    },
    setLayers : function(layers){
      this.set('layers', layers)
    },
    getStory:function(){
      return this.attributes.story
    },
    setStory:function(story){
      this.set('story',story)
    },
    getStories:function(){
      return this.attributes.stories
    },
    setStories:function(stories){
      this.set('stories',stories)
    },

  });

});
