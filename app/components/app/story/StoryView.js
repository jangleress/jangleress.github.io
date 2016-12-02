define([
  'jquery',
  'underscore',
  'backbone',
  'leaflet',
  'jquery.waypoints',
  'bootstrap',
  'text!templates/oceanHeaderTemplate.html',
  'text!./storyBottomHintsTemplate.html',
  'text!templates/layerControlPlaceholderTemplate.html',
  'text!templates/storyNavTemplate.html'
], function (
  $, _, Backbone,
  leaflet,
  waypoints,
  bootstrap,
  oceanHeaderTemplate,
  storyBottomHintsTemplate,
  layerControlPlaceholderTemplate,
  storyNavTemplate
) {
  var StoryView = Backbone.View.extend({
    events: {
      'click .chapter-link': 'handleChapterLink',
      'click .previous-story-link': 'handlePreviousStoryLink',
      'click .next-story-link': 'handleNextStoryLink',
      'click .play-button': 'handlePlayAudio',
      "click .toggle-layer" : "toggleLayer",
      "click .layer-info-link" : "handleLayerInfoLink",
      'click .story-link': 'handleStoryLink'           
    },

    initialize: function () {
      this.listenTo(this.model, 'change:active', this.handleActive)
//      this.listenTo(this.model, 'change:chapter', this.handleChapterUpdate)
      this.listenTo(this.model, 'change:story', this.handleStoryUpdate)

      $(window).on('resize', _.debounce(_.bind(this.resize, this), 200))
//      this.$el.on('scroll', _.debounce(_.bind(this.scrolled, this), 200))

      this.scroll_offset_chapter = 50
      this.waypoints_offset_chapter = 100
      this.waypoints_offset_layers = 175
      this._scrolling = false
    },

    render: function () {

      return this
    },
    resize: function () {
      if (typeof this.model !== 'undefined'){
        if (this.model.isActive()){
          this.refreshWaypoints()
        }
      }

    },

    loadStory: function(){
      var story = this.model.getStory()
      if (this.model.isActive() && story !== null) {
        this.$el.html('<span class="loading-animation content-loading-animation"></span>')

        var that = this
        story.getContent(function(content){
          that.$el.html('')
          that.$el.append(content)
          that.populatePlaceholders()

          that.initSlideshow()
          that.initWaypoints()
          
          that.initActives()
          that.initLayers()
          that.initAudio()
        })
      }
    },

    initLayers: function() {
      this.$el.trigger('preloadLayers', {
        layerids:
          _.without(_.uniq(_.flatten(
            _.map($('.story-item'),function(item){
              return _.map($(item).data('layers').split(','), function (layerid) { return layerid.trim() })
            })
          )),"")
      })
    },
    initActives: function () {
      // init sub memu, highlight first
      this.$('.chapter-link[data-chapterid="0"]').addClass('active')
      // init item layers
      var story = this.model.getStory()
      var that = this
      waitFor(function(){
        return story.isContentReady()
      },function(){
        that.itemTriggered({
          layers: $('#chapter-0 .story-item').data('layers')
        })
      })

    },
    populatePlaceholders:function(){
      var story = this.model.getStory()
      var that = this
      waitFor(function(){
        return story.isContentReady()
      },function(){
        var oceanid = story.getOceanId()
        that.$('.placeholder-ocean').html(_.template(oceanHeaderTemplate)({
          ocean:oceanid,
          t:tlang
        }))
        that.$('.placeholder-story-layer-hint').html(_.template(storyBottomHintsTemplate)({
          ocean:oceanid,
          t:tlang
        }))
        
        that.$('.placeholder-story-nav').html(_.template(storyNavTemplate)({
          stories:_.filter(that.model.getStories(),function(s){
            return s.id !== that.model.getStory().id
          }),
          linkClass:'ocean-color'
        }))
        
        that.$('.story-item').each(function(i,el){
          var layerIds = _.without(
              _.map($(el).data('layers').split(','), function (layerid) { 
                return layerid.trim() 
              }),
            "")
          if (layerIds.length) {
            $(el).find('.placeholder-layercontrol').html(
              '<h5 class=layer-control-title">'+ tlang.nav.layers +'</h5>\n\
               <ul class="list-unstyled layer-control-list"></ul>'
            )
            _.each(layerIds,function(layerid){
              var layer = that.model.attributes.layers.findWhere({id:layerid}) 
              $(el).find('.placeholder-layercontrol .layer-control-list').append(
                '<li class="layer-control-list-item">' + 
                _.template(layerControlPlaceholderTemplate)({
                  id : layerid,
                  title : layer.getTitle(),
                  hint : layer.getHint(),
                  info:true,
                  toggable : false,
                  layerGradient: layer.makeLayerGradientKey(),
                  layerCategories: layer.makeLayerCategoriesKey(),
                  isActive : true,
                  keyHtml : layer.getKeySquareIcon('sm'),
                  t:tlang
                })
                + '</li>'
              ) 
            })          
          }          
        })
      })
    },
    initWaypoints: function () {
      var that = this

      // Chapter scrolls into view from bottom
      this.$('.story-item').waypoint({
        handler: function (direction) {
          //console.log("$('.story-item').waypoint " + direction)
          if (!that._scrolling && that.model.isActive()) {
            if (direction === 'down') {
              that.itemTriggered({
                layers: $(this.element).data('layers') 
              })
            } else {
              var $prev = $('.story-item').index(this.element) !== 0
                ? $($('.story-item')[$('.story-item').index(this.element)-1])
                : $(this.element)
              that.itemTriggered({
                layers: $prev.data('layers')
              })
            }
          }
        },
        context: this.$('.content-scroll'),
        offset: this.waypoints_offset_layers,
        continuous: true
      })
      
      this.$('.chapter-link').removeClass('active')
      this.$('.chapter').waypoint({
        handler: function (direction) {
          //console.log("$('.story-chapter').waypoint " + direction)
          if (that.model.isActive()) {
            if (direction === 'down') {
              that.chapterTriggered($(this.element).data('chapterid'))
            } else {
              var $prev = $(this.element).data('chapterid') > 0
                ? $('#chapter-'+($(this.element).data('chapterid')-1))
                : $(this.element)
              if ($prev.length !== 0) {
                that.chapterTriggered($prev.data('chapterid'))
              }
            }
          }
        },
        context: this.$('.content-scroll'),
        offset: this.waypoints_offset_chapter,
        continuous: true
      })
      
      
      this.$el.removeClass('chapter-nav-stuck')      
      this.$('.chapter-nav').waypoint({
        handler: function (direction) {
          if (that.model.isActive()) {
            if (direction === 'down') {
              that.$el.addClass('chapter-nav-stuck')
            } else {
              that.$el.removeClass('chapter-nav-stuck')
            }
          }
        },
        context: this.$('.content-scroll')
      })
    },

    refreshWaypoints: function () {
      var story = this.model.getStory()
      var that = this
      waitFor(function(){
        return story.isContentReady()
      },function(){
        window.Waypoint.refreshAll()
      })
    },

    initSlideshow : function(){
      if ( this.$('.carousel').length > 0){
        this.$('.carousel').carousel({
          interval : false
        })
      }
    },

    initAudio:function(){
      var that = this
      
      this.$('.audio').each(function(){
        //init total playing time
        
        var $this = $(this)
        
        var audio = $this.find('audio').get(0)        
        var interval = null
        
        audio.addEventListener('loadedmetadata',function(){
          audio.setAttribute('data-time',audio.duration);
          
          $this.find('.time-total').html(that.formatTime(audio.duration))
        },false);
        
        
        audio.addEventListener('play', function() {
          interval = setInterval(function() {
            that.audioUpdateTime(audio, $this)            
          },10)
        })
        audio.addEventListener('pause', function(){
          clearInterval(interval)          
        })
        audio.addEventListener('ended', function(){
          clearInterval(interval)
          $this.find('.audio-slider').width('100%')          
          $this.find('.play-button').addClass('end')
          $this.find('.play-button').removeClass('active')
        })
        
        
        $this.find('.audio-position').on('click',function(e){
          $this.find('.play-button').removeClass('end')                    
          //update currenttime
          var percentageOfSong = e.offsetX/$(this).width()
          audio.currentTime = percentageOfSong * audio.duration          
          
          //Updates the track progress div
          $(this).find('.audio-slider').width(e.offsetX + "px")
          
          //update currenttime display
          $this.find('.time-progress').html(that.formatTime(audio.currentTime))          
          
        })
        
      })
    },
    formatTime:function(duration){
        var mins = Math.floor(duration / 60);
        var secs = Math.floor(duration) - mins * 60;
        var time = "";
        time += "" + mins + ":" + (secs < 10 ? "0" : "");
        time += "" + secs;    
        return time
    },
    audioUpdateTime: function(audio, $audio){
      var slider = $audio.find('.audio-position')
      
      //Fills out the slider with the appropriate position.
      var percentageOfSong = (audio.currentTime/audio.duration)
      var percentageOfSlider = slider.width() * percentageOfSong
      //Updates the track progress div.
      slider.find('.audio-slider').width((Math.round(percentageOfSlider*100)/100) + "px")
      
      $audio.find('.time-progress').html(this.formatTime(audio.currentTime))
            
    },    
    
    
    
    scrollToChapter: function (chapter) {
      //console.log('ScrollToChapter: ', chapter)

      var $scroller = this.$('.content-scroll')

      var that = this
      if (typeof chapter === 'undefined'
      || chapter === ''
      || chapter === 0
      || chapter === '0') {
        if ($scroller.scrollTop() !== 0) {
          this._scrolling = true
          $scroller.animate({
              scrollTop: 0
            },
            'fast',
            'swing',
            function(){that.onScrollAnimationEnd(0)}
          )
        }
      } else {
        if (this.$('#chapter-' + chapter).offset().top !== 0) {
          this._scrolling = true
          console.log('story.onScrollAnimationStart')
          $scroller.animate({
              scrollTop: this.$('#chapter-' + chapter).offset().top + $scroller.scrollTop() - this.scroll_offset_chapter
            },
            'slow',
            'swing',
            function(){that.onScrollAnimationEnd(chapter)}
          )
        }
      }
    },
    onScrollAnimationEnd: function (chapter) {
      console.log('story.onScrollAnimationEnd')

      var layers = this.$('#chapter-'+chapter+' .story-item').first().data('layers')
      this.triggerLayers(_.map(layers.split(','), function (layerid) { return layerid.trim() }))      
      
      this._scrolling = false
      
      this.chapterTriggered(chapter)      
      
    },



    chapterTriggered: function (chapter) {
      //console.log('StoryView.chapterTriggered ' + chapter)

      this.$('.chapter-link').removeClass('active')
      this.$('.chapter-link[data-chapterid="' + chapter + '"]')
        .addClass('active')

    },
    itemTriggered: function (args) {
      //console.log('StoryView.itemTriggered, layers' + args.layers)

      if (!this._scrolling && typeof args.layers !== 'undefined') {
        this.triggerLayers(_.map(args.layers.split(','), function (layerid) { return layerid.trim() }))
      }
    },
    triggerLayers: function(layerIds){
      //console.log('StoryView.triggerLayers')
      layerIds = typeof layerIds !== 'undefined' ? layerIds : ''
    //  trigger an event that is in appview that updates layers and map.
      this.$el.trigger('storyItemActivated', {
        layerIds: layerIds
      })
    },



    // downstream: event handlers for model change events
    handleActive: function () {
      //console.log('StoryView.handleActive')
      var that = this
      if (this.model.isActive()) {
        this.$el.show()        
        that.$el.removeClass('chapter-nav-stuck')
      } else {
        this.$el.hide()
        that.$el.removeClass('chapter-nav-stuck')
      }
    },

    handleStoryUpdate : function(){
      //console.log('StoryView.handleStoryUpdate')
      this.loadStory()
    },

    // in view
    handleChapterLink : function(e){
      e.preventDefault()
      // handle event in view - don't triggger update via route
      this.scrollToChapter($(e.target).data('chapterid'))
    },
    handlePreviousStoryLink : function(e) {
      e.preventDefault()
      this.$el.trigger('previousStoryLinkClick',{target:e.target,id:this.model.getStory().id})
    },
    handleNextStoryLink : function(e) {
      e.preventDefault()
      this.$el.trigger('nextStoryLinkClick',{target:e.target,id:this.model.getStory().id})
    },
    handlePlayAudio : function(e) {
      e.preventDefault()
      var $btn = this.$(e.target).closest('.play-button')
      var $audioComponent = this.$(e.target).closest('.audio')
      var audio = $audioComponent.find('audio').get(0)
      
      
      
      if (audio.ended){
        // reset and play        
        audio.play();
        $btn.addClass('active')             
        $btn.removeClass('end')             
        
      } else if (audio.paused){
        audio.play();
        $btn.addClass('active')      
      } else {
        audio.pause();
        $btn.removeClass('active')
      }
    },
    handleLayerInfoLink : function(e){
      e.preventDefault()
      this.$el.trigger('layerInfoLinkClick',{target:e.target, id:$(e.target).data('layerid')})
    },    
    toggleLayer : function(e){
      e.preventDefault()
      e.stopPropagation()
      // do nothing
    },
    handleStoryLink: function (e) {
      e.preventDefault()
      this.$el.trigger('storyLinkClick', { target: e.target, id: $(e.target).data('storyid') })
    },    
    
  })

  return StoryView
})
