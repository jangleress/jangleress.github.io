define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var HomeView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
      this.listenTo(this.model, 'change:active', this.handleActive) 
      var that = this      
      
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
    
    // event handlers for model change events
    handleActive: function () {
      //console.log('HomeView.handleActive')
      if (this.model.isActive()) {
        this.$el.show()          
      } else {
        this.$el.hide()     
      }    
    }



  })

  return HomeView
})
