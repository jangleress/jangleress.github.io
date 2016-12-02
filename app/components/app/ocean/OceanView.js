define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/storyNavTemplate.html'
], function ($, _, Backbone, storyNavTemplate) {
  var HomeView = Backbone.View.extend({
    events: {
      'click .previous-ocean-link': 'handlePreviousOceanLink',
      'click .next-ocean-link': 'handleNextOceanLink',      
      'click .story-link': 'handleStoryLink'     
    },

    initialize: function () {
      this.listenTo(this.model, 'change:active', this.handleActive)           
      this.listenTo(this.model, 'change:ocean', this.handleOceanChange)           
      this.listenTo(this.model, 'change:stories', this.handleStoriesChange)       
     
    },
    initScroll : function(){
     if (Modernizr.touch) {                        

      var $scroller = this.$('.content-wrap')

      this._scrollOffset = $scroller.offset().top
      this._scrollOffsetInitial = $scroller.offset().top
      this._maxOverflow = $scroller[0].scrollHeight - $('#application').outerHeight()

      this._scrolled = 0 

      $scroller.on({
        'touchstart mousedown': _.bind(function (e) {          
           if (typeof e.originalEvent.changedTouches !== 'undefined') {          
            this._touched = e.originalEvent.changedTouches[0].pageY  // first touch
            $scroller.on('touchmove mousemove', _.bind(this.move,this));
          }
        }, this),
        'touchend mouseup': function (e) {
           $scroller.off('touchmove mousemove');
        }
      })
    }
    },
    move : function(e) {
      e.preventDefault()
      
      var touchobj = e.originalEvent.changedTouches[0]       
      var $scroller = this.$('.content-wrap')      
      var scroll = this._touched - touchobj.pageY      // the distance scrolled
      
      this._touched = touchobj.pageY // last touch update
            
      // move within bounds
      $scroller.css({
          top: ( Math.min(
                  this._scrollOffsetInitial,
                  Math.max(
                    - this._maxOverflow,
                    this._scrollOffset - scroll)
                  )
                ) + 'px'
      });
      
      // remember new offset
      this._scrollOffset = $scroller.offset().top
    },    

    render: function () {      
      return this
    },
    loadOcean: function(){
      var ocean = this.model.getOcean()

      this.$el.html('<div class="content-aside content-wrap"><span class="loading-animation content-loading-animation"></span></div>')

      var that = this
      ocean.getContent(function(content){
        that.$el.html('')
        that.$el.append(content)      
        that.populateStoryNav()
        that.initScroll()
      })
      
    },    
    populateStoryNav:function(){
      var ocean = this.model.getOcean()
      var that = this
      waitFor(function(){
        return ocean.isContentReady()
      },function(){
        var args = {
          stories:that.model.getStories()
        }
        that.$('.placeholder-story-nav').html(_.template(storyNavTemplate)(args))
      })
    },
    // event handlers for model change events
    handleActive: function () {
      //console.log('HomeView.handleActive')
      if (this.model.isActive()) {
        this.$el.show()          
      } else {
        this.$el.hide()     
      }
    },
    handleOceanChange : function(){
      this.loadOcean()
    },    
    handleStoriesChange : function(){
      this.populateStoryNav()
    },    
    
    
    handlePreviousOceanLink : function(e) {
      e.preventDefault()
      this.$el.trigger('previousOceanLinkClick',{target:e.target,id:this.model.getOcean().id})      
    },
    handleNextOceanLink : function(e) {
      e.preventDefault()
      this.$el.trigger('nextOceanLinkClick',{target:e.target,id:this.model.getOcean().id})      
    },        
    handleStoryLink: function (e) {
      e.preventDefault()
      this.$el.trigger('storyLinkClick', { target: e.target, id: $(e.target).data('storyid') })
    },

  })

  return HomeView
})
