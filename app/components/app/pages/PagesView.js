define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'text!./subpageNavTemplate.html'
], function($, _, Backbone, bootstrap, subpageNavTemplate){

  var PagesView = Backbone.View.extend({
    events : {
      "click .page-link" : "handlePageLink"      
    },
    initialize : function(){
      this.listenTo(this.model, "change:active", this.handleActive);
      this.listenTo(this.model, "change:path", this.handlePathChange);
    },
    render: function(){
      return this
    },
    loadPage: function(){
      var pageid = this.model.getPageId()
      var page = this.model.getPage()
      var pageClass = 'page-' + pageid            
      this.$('.page').hide()
      if (this.$('.'+pageClass).length === 0) {
        this.$el.append('<div class="page ' + pageClass + '"><div class="content-full content-wrap"><span class="loading-animation page-loading-animation"></span></div></div>')

        var that = this
        page.getContent(function(content){
          that.$('.'+pageClass).html('')
          that.$('.'+pageClass).append(content)
          that.populatePlaceholders()
          that.initBlockquotes()
          that.initSlideshow() 
        })
      } else {
        this.$('.'+pageClass).show()        
      }
       
    },           
    initSlideshow : function(){
      if ( this.$('.carousel').length > 0){
        this.$('.carousel').carousel({
          interval : false
        })
      }
    },    
    initBlockquotes:function(){
      var pageid = this.model.getPageId()      
      var pageClass = 'page-' + pageid      
      this.$('.'+pageClass).find('blockquote').each(function(index) {
        if(index % 2 === 1) {
         $(this).addClass('blockquote-offset-right')
        }
      })   
    },
    populatePlaceholders:function(){      
      var pageid = this.model.getPageId()
      var page = this.model.getPage()
      var pageClass = 'page-' + pageid
      
      var that = this
      waitFor(function(){
        return page.isContentReady()
      },function(){
        
        // set up page header where applicable
        
        // sub navigation 
        if (that.model.getPagesByCategory().length) {
          var args = {
            pages:that.model.getPagesByCategory(),
            pageactive:pageid
          }
          that.$('.'+pageClass).find('.placeholder-subpage-nav').html(_.template(subpageNavTemplate)(args))
        }
        // section title
        if (typeof that.model.getPage().getParent() !== 'undefined') { 
          that.$('.'+pageClass).find('.placeholder-section-title').html(tlang.nav[that.model.getPage().getParent()])
        }
      })
    },    
    handlePageLink : function(e){

      if (typeof $(e.target).data('pageid') !== 'undefined') {
        e.preventDefault()
        e.stopPropagation()
        this.$el.trigger('pageLinkClick',{target:e.target,id:$(e.target).data('pageid')})        
      } else {
        // check for modal
        if ($(e.target).attr('href').startsWith('#?modal=')) {
          e.preventDefault()
          e.stopPropagation()
          var modaltype = $(e.target).attr('href').split('modal=')[1]
          this.$el.trigger('modalOpen',{target:e.target,type:modaltype})
        } else if ($(e.target).attr('href').startsWith('#?page=')) {
          e.preventDefault()
          e.stopPropagation()
          var pageid = $(e.target).attr('href').split('page=')[1]        
          this.$el.trigger('pageLinkClick',{target:e.target,id:pageid})
        } else {
          e.stopPropagation()
        }
      }

    },
    
    // event handlers for model change events
    handleActive : function(){
      //console.log('PagesView.handleActive')
      if (this.model.isActive()) {
        this.$el.show()
      } else {
        this.$el.hide()
      }
    },
    handlePathChange : function(){
      this.loadPage()
    }

  });

  return PagesView;
});
