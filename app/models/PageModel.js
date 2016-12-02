define([
  'jquery', 'underscore', 'backbone',
  './ContentModel'
], function($,_, Backbone, 
  ContentModel
){
  
  var PageModel = ContentModel.extend({
    initialize : function(options) {
      this.options = options || {};    
      this.isContentLoading = false
      this.isContentLoaded = false  
      if (this.attributes.parent === 'undefined' ) {
        this.attributes.parent = this.id
      }
      var url = '/page/' + this.id + '/'
      
      this.set('url',url)
    
    },
    getTitle:function(){
      return this.attributes.title[lang]
    },    
    getParent:function(){
      return this.attributes.parent
    },    
  });

  return PageModel;

});



