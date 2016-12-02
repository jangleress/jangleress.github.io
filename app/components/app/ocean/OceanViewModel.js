define([
  'jquery', 'underscore', 'backbone',
  'models/ViewModel'
], function($,_, Backbone,ViewModel) {
  
  return ViewModel.extend({
    setOcean:function(ocean){
      this.set('ocean',ocean)
    },    
    getOcean:function(){
      return this.attributes.ocean
    },
    setStories:function(stories){
      this.set('stories',stories)
    },    
    getStories:function(){
      return this.attributes.stories
    }
            
  }); 

});



