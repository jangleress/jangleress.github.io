define([
  'jquery',
  'underscore',
  'backbone',
  'text!./mapKeyTemplate.html',
  'text!./layerKeyFullTemplate.html'
], function($, _, Backbone, mapKeyTemplate, layerKeyTemplate){

  var KeyView = Backbone.View.extend({
    events : {
      "click .layer-info-link" : "handleLayerInfoLink",
      "click .toggle-layer" : "toggleLayer",
      "click .scroll-up" : "scrollUp",
      "click .scroll-down" : "scrollDown",
      "click .edit-layer" : "handleLayerEdit"      
    },
    initialize : function(){
      this.listenTo(this.model, "change:active", this.handleActive);
      this.listenTo(this.model, 'change:activeLayers', this.handleLayerUpdate)
      this.listenTo(this.model, 'change:customLayerData', this.handleLayerUpdate)
      $(window).on("resize", _.debounce(_.bind(this.resize, this), 100));
    },
    render: function(){
      this.setupScroll();      
      this.populateKey()
      return this
    },
    resize: function(){
      this.setupScroll();
      this.scrollToTop();
    },
    // upstream
    handleLayerInfoLink : function(e){
      e.preventDefault()
      this.$el.trigger('layerInfoLinkClick',{target:e.target, id:$(e.target).data('layerid')})
    },
    toggleLayer : function(e){
      e.preventDefault()
      e.stopPropagation()
      if(this.model.getAllowLayerToggle() && ($(e.currentTarget).data('toggable') || $(e.currentTarget).data('toggable') === 'true')) {
        this.$el.trigger('layerToggled',{id:$(e.currentTarget).data('layerid')})
      }
    },
    handleLayerEdit : function(e){
      e.preventDefault()
      this.$el.trigger('editCustomLayer', {id:$(e.target).data('layerid')})
    },
    // event handlers for model change events
    handleActive : function(){
      if (this.model.isActive()) {
        this.$el.show()
      } else {
        this.$el.hide()
      }
    },

    handleLayerUpdate : function(){

      if (this.model.getActiveLayers().length > 0) {
        this.$el.show()
        this.render()
      } else {
        this.$el.hide()
      }


    },
    

    populateKey : function(){
      var that = this
      this.$el.html(_.template(mapKeyTemplate)({
        preventLayerToggle : !this.model.getAllowLayerToggle(),
        layerKeys:_.map(this.model.getActiveLayers(),function(layer) {
          return _.template(layerKeyTemplate)({
            preventLayerToggle : !that.model.getAllowLayerToggle(),
            id : layer.id,
            title : layer.getTitle(),
            hint : layer.getHint(),
            toggable : !layer.isBasemap(),
            layerGradient: layer.makeLayerGradientKey(),
            layerCategories: layer.makeLayerCategoriesKey(),
            isActive : layer.isActive() || layer.isBasemap(),
            isCustom : layer.isCustom(),
            keyHtml : layer.getKeySquareIcon('lg'),
            lang:lang,
            t:tlang
          })
        }),
        t:tlang
      })
      )

      // briefly show newly added layers
      _.each(this.model.getAddLayers(),function(layer){
        if (!layer.isBasemap()) {
          var $layerItem = this.$('.key-layer-'+layer.id)
          $layerItem.addClass('show-hover')
          setTimeout(function(){
            $layerItem.removeClass('show-hover')
          }, 2000);
        }
      },this)

      //check for overflow
      this.setupScroll();
      this.updateScroll();
    },

    getKeyAvailableHeight : function(){
      return $('#map').outerHeight() 
              - this.$el.offset().top 
              - parseInt(this.$el.css('bottom').replace('px',''))
    },
    setupScroll : function() {


      // check height for scrolling
      this.scroller = {
        cover : this.$('.scroll-cover'),
        inner : this.$('.scroll-scroller'),
        neededh : this.$('.scroll-scroller').outerHeight(),
        availh : this.getKeyAvailableHeight()
      };

   },
   updateScroll : function() {

      var labelHeight = this.$('.map-key-label').outerHeight()

      this.scroller.cover.css('max-height',this.scroller.availh - labelHeight);

      var maxScroll = this.scroller.neededh - (this.scroller.availh - labelHeight);
      if ( maxScroll > 0 ) {
        this.scroller.cover.addClass('scrolling');
        var scrolled = -parseInt(this.scroller.inner.css("top"),10);

        if(scrolled === maxScroll) {
          this.scroller.cover.addClass('scrolled-bottom');
        } else {
          this.scroller.cover.removeClass('scrolled-bottom');
        }
        if(scrolled > 0) {
          this.scroller.cover.addClass('scrolled');
        } else {
          this.scroller.cover.removeClass('scrolled');
        }
      } else {
        this.scroller.cover.removeClass('scrolling');
      }

      this.offsetInfoPanel();

    },
    scrollDown : function (event) {
      event.preventDefault();
      var labelHeight = this.$('.map-key-label').outerHeight()
      var maxScroll = this.scroller.neededh - (this.scroller.availh - labelHeight);
      var scrolled = -parseInt(this.scroller.inner.css("top"),10);
      if (scrolled < maxScroll) {
        var scroll=scrolled + Math.min(this.scroller.availh*0.8,maxScroll-scrolled); // scroll 80% height or max

        var that = this;
        this.scroller.inner.animate({
          top: -scroll
        }, {
          duration: 800,
          step: function() {
            that.hideOverFlow()
          },
          complete: function(){
            that.updateScroll();
          }
        })
      }
    },
    scrollUp : function (event) {
      event.preventDefault();
      var labelHeight = this.$('.map-key-label').outerHeight()
      var scrolled = -parseInt(this.scroller.inner.css("top"),10);

      if (scrolled > 0) {
        var scroll=scrolled - Math.min((this.scroller.availh-labelHeight)*0.8,scrolled); // scroll 95% height or max
        var that = this;
        this.scroller.inner.animate({
          top: -scroll
        }, {
          duration: 800,
          step: function() {
            that.hideOverFlow()
          },
          complete: function(){
            that.updateScroll();
          }
        })
      }
    },

    scrollToTop : function (event) {
      var that = this
      this.scroller.inner.animate({
        top: 0
      }, {
        duration: 100,
        step: function() {
          that.hideOverFlow()
        },
        complete: function(){
          that.updateScroll();
        }
      })
    },

    hideOverFlow : function () {
      var offset = 10
      var topOfKey = this.$el.offset().top 
      var bottomOfKey = this.$el.outerHeight() + this.$el.offset().top 
      
      this.$('.map-key-layer-list-item').each(function(){
        var topOfKeyItem = $(this).offset().top
        var bottomOfKeyItem = $(this).offset().top + $(this).outerHeight()
        if( (topOfKey + offset) > topOfKeyItem
          ||(bottomOfKey - offset) < bottomOfKeyItem){
          $(this).addClass('invisible')
        } else {
          $(this).removeClass('invisible')
        }      
        
      })
      
    },

    offsetInfoPanel : function() {
      var that = this
      this.$('.map-key-layer-list-item').each(function(){
        var panelHeight = $(this).find('.layer-key-panel').outerHeight()
        var labelHeight = $(this).outerHeight()
        var squareDistanceToBottom = window.innerHeight - $(this).offset().top
        if(labelHeight < panelHeight && squareDistanceToBottom > 0){
          if(squareDistanceToBottom < ((panelHeight - labelHeight)/2)){
            $(this).find('.layer-key-panel').addClass('align-bottom')
          }
        }
      })
    }
  });

  return KeyView;

});
