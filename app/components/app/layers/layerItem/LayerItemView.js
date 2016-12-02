define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/categoryPlaceholderTemplate.html',
  'text!templates/layerControlPlaceholderTemplate.html',
  'text!templates/layerReferencePlaceholderTemplate.html',
  'text!templates/oceanHeaderTemplate.html'
], function(
  $, _, Backbone,
  categoryPlaceholderTemplate,
  layerControlPlaceholderTemplate,
  layerReferencePlaceholderTemplate,
  oceanHeaderTemplate
){

  var LayerItemView = Backbone.View.extend({
    events : {
      "click .toggle-layer" : "toggleLayer",
      "click .close-item" : "closeItem"

    },
    initialize : function(){

      this.listenTo(this.model, "change:activeLayerIds", this.render);
      this.listenTo(this.model, "change:active", this.handleActive);
      this.render()
    },
    render: function(){
      var that = this

      this.$el.html('<span class="loading-animation panel-loading-animation"></span>')
      this.model.getLayer().getContent(function(content){
        that.$el.html('')
        that.$el.append(content)
        that.populatePlaceholders()        
      })

      return this
    },

    populatePlaceholders : function(){
      var layer = this.model.getLayer()
      if (layer.getCategory() !== 'undefined') {
        this.$('.placeholder-category').html(_.template(categoryPlaceholderTemplate)({
          catId : layer.getCategory(),
          catTitle : tlang.categories[layer.getCategory()] ,
          subcatTitle : layer.getSubcategory() !== 'undefined'
                ? tlang.subcategories[layer.getSubcategory()].title
                : ''
        }))
      }

      this.$('.placeholder-ocean').html(_.template(oceanHeaderTemplate)({
        ocean:this.model.getOcean(),
        t:tlang
      }))

      this.$('.placeholder-layercontrol').html(_.template(layerControlPlaceholderTemplate)({
        id : layer.id,
        title : layer.getTitle(),
        hint : layer.getHint(),
        info:false,
        toggable : !layer.isBasemap(),
        layerGradient: layer.makeLayerGradientKey(),
        layerCategories: layer.makeLayerCategoriesKey(),
        isActive : layer.isActive() || layer.isBasemap(),
        keyHtml : layer.getKeySquareIcon('sm'),
        t:tlang
      }))


      this.$('.placeholder-layer-reference').html(_.template(layerReferencePlaceholderTemplate)({
        text : layer.getReference().linkify()
      }))
      this.$('.placeholder-layer-reference').find('a[href^="http"]').attr('target','_blank');//make external links open in a new tab                    

    },

    // event handlers for model change events
    handleActive : function(){
      //console.log('layerHome.handleActive')
      if (this.model.isActive()) {
        this.$el.show()
      } else {
        this.$el.hide()
      }
    },
    // event handlers for view events
    toggleLayer : function(e){
      e.preventDefault()
      e.stopPropagation()
      if($(e.currentTarget).data('toggable') || $(e.currentTarget).data('toggable') === 'true') {
        this.$el.trigger('layerToggled',{id:$(e.currentTarget).data('layerid')})
      }
    },
    closeItem : function(e){
        e.preventDefault()
        e.stopPropagation()
        this.$el.trigger('closeLayerInfo',{target:e.target,id:this.model.get('layer').id})              
    }


  });

  return LayerItemView;

});
