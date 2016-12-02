define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/oceanHeaderTemplate.html',
  'text!templates/categoryCountTemplate.html'
], function($, _, Backbone,oceanHeaderTemplate,catCountTemplate){

  var LayerHomeView = Backbone.View.extend({
    events : {
      "click .close-item" : "closeHome"
    },
    initialize : function(){

      this.listenTo(this.model, "change:active", this.handleActive);
      this.listenTo(this.model, "change:ocean", this.handleOceanChange);
      this.listenTo(this.model, "change:categories", this.handleCategoriesChange);
      this.render()
    },
    render: function(){

      var that = this
      this.$('.content').html('<span class="loading-animation panel-loading-animation"></span>')
      this.model.getContent().getContent(function(content){
        that.$('.content').html('')
        that.$('.content').append(content)
        that.$('.content').addClass('layers-home')
        that.populatePlaceholders()
        that.updateCategoryCounts()
      })

      return this
    },
    updateCategoryCounts:function(){      
      var that = this
      this.$('.layer-links td a').each(function(){
        var catid = $(this).data('catid')      
        var cat = _.findWhere(that.model.getCategories(),{value:catid})
        
        $(this).find('.cat-layers-remove').remove()
        
        if(cat.activeCount > 0) {
          $(this).append(_.template(catCountTemplate)({cat:cat}))
        }
        
      })
    },
    populatePlaceholders:function(){
      var ocean = this.model.getOcean()
      var that = this
      waitFor(function(){
        return that.model.getContent().isContentReady()
      },function(){
        that.$('.placeholder-ocean').html(_.template(oceanHeaderTemplate)({
          ocean:ocean,
          t:tlang
        }))
      })
    },
    // event handlers for model change events
    handleOceanChange : function(){
      this.populatePlaceholders()
    },
    handleCategoriesChange : function(){
      this.updateCategoryCounts()
    },
    handleActive : function(){
      //console.log('layerHome.handleActive')
      if (this.model.isActive()) {        
        this.$el.show()
        this.updateCategoryCounts()
      } else {
        this.$el.hide()
      }
    },
    closeHome: function(e){
      if (e.target !== e.currentTarget) return;
      e.preventDefault()
      e.stopPropagation()
      this.$el.addClass('hidden-xs')
      this.$el.addClass('hidden-sm')
    },
    handlePageLink : function(e){
      e.preventDefault()
      e.stopPropagation()
      this.$el.trigger('pageLinkClick',{target:e.target,id:$(e.target).data('pageid')})
      $('#navbar-collapse').collapse('hide')
    },


  });

  return LayerHomeView;

});
