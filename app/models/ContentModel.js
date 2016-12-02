define([
  'jquery', 'underscore', 'backbone','showdown','leaflet'
], function($,_, Backbone,showdown,leaflet
){
  
  var ContentModel = Backbone.Model.extend({
    initialize : function(options){ 
      this.options = options || {};         
      this.isContentLoading = false
      this.isContentLoaded = false
      
    },    
    loadContent : function (callback, selector){
      // default: could be overridden in specific model to apply specific content transformation
      var that = this
      $.get(this.getUrl(), function(content) {
        
        var $selected = $(content).find(selector)
        
        $selected = that.setupContent($selected)
        
        callback($selected.children())
      })
    },
    setupContent : function ($selected){
      var converter = new showdown.Converter({ghCodeBlocks: false});
        // convert markdown
        $selected.find('.convert-markdown').each(function(){
          $(this).html(converter.makeHtml($(this).text().trim().split('_ ').join("<br/>")))
        })      
        
        // open external links in new tab/window
        $selected.find('a[href^="http"], .link-download').attr('target','_blank');//make external links open in a new tab                    
        
        // add download icon
        $selected.find('.link-download').prepend('<span class="icon-wwf_download"></span>')
        
        // use retina images
        if (L.Browser.retina) {
          $selected.find('img.img-retina, .item-media-type-graphic img').each(function(i,img){
            var $img = $(img)
            $img.attr('src', $img.attr('src').replace('.png','@2.png'))
            $img.attr('src', $img.attr('src').replace('.jpg','@2.jpg'))                  
            $img.attr('src', $img.attr('src').replace('.gif','@2.gif'))                  
          })              
        }    
        
        return $selected
      
    },    
    isContentReady : function(){
      return !this.isContentLoading && this.isContentLoaded
      
      
    },
    getUrl : function(){
      if (typeof this.attributes.url !== 'undefined' ) {
        var baseurl = $('#application').data('baseurl')
        if (lang !== 'en') {
          return baseurl + '/' + lang + this.attributes.url
        } else {
          return baseurl + this.attributes.url
        }
      }
    },
    getContent : function(callback, selector){
      selector = typeof selector !== 'undefined' ? selector : '.content'
            
      // temporary workaround #225
      if (this.isContentLoaded && typeof this.attributes.content !== 'undefined' && this.attributes.content[0].innerHTML !== ''){        
        callback(this.attributes.content)
      } else {
        var that = this
        // already loading
        if (this.isContentLoading) {
          waitFor(
            function(){ 
              return that.isContentLoaded 
            },
            function(){ 
              callback(that.attributes.content, that )
            }
          )
        } else {	
          this.isContentLoading = true
          
          this.loadContent(function(result){
            // todo add error handling 
            that.set('content', result)
            that.isContentLoading = false
            that.isContentLoaded = true
            callback(that.attributes.content)
          }, selector)        
        }
      }
    }
  });

  return ContentModel;

});



