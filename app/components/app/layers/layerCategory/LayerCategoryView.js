define([
  'jquery',
  'underscore',
  'backbone',
  'text!./layerCategoryTemplate.html']  
], function($, _, Backbone, template, catNavTemplate){

  var LayerCategoryView = Backbone.View.extend({
    events : {
      "click .toggle-layer" : "toggleLayer",
      "click .layer-info-link" : "handleLayerInfoLink",
      "click .print-map" : "handlePrintMap",
      "click .close-item" : "closeCategory"
    },
    initialize : function(){

      this.listenTo(this.model, "change:active", this.handleActive);
      this.listenTo(this.model, "change:activeLayerIds", this.handleActiveLayersUpdate);
      this.listenTo(this.model, "change:categories", this.handleActiveLayersUpdate);

    },
    render: function(){

      // group by subcategory
      var subcategorized = _.groupBy(this.model.getLayers().models,
        function(layer){ return layer.getSubcategory()}
      )
      
      var grouped = {}
      
      // group by group
      _.each(subcategorized,function(layers, subcategory){
        grouped[subcategory] = _.groupBy(layers,
          function(layer){return layer.getGroup()}
        )
      })      
      
      this.$el.html(_.template(template)({
        category:this.model.getCategory(),
        catNav : _.template(catNavTemplate)({
          categories:this.model.getCategories(),
          t:tlang,
          category:this.model.getCategory()}),
        ocean:this.model.getOcean(),
        grouped:grouped,
        lang:lang,
        t:tlang
      }));
      // init tooltips
      var that = this
      $(function () {
        that.$('[data-toggle="tooltip"]').tooltip()
      })
      
      return this
    },

    // event handlers for model change events
    handleActive : function(){
      //console.log('layerControl.handleActive')
      if (this.model.isActive()) {
        this.render()
        this.$el.show()
      } else {
        this.$el.hide()
      }
    },
    handleActiveLayersUpdate : function(){
      this.render()
    },
    closeCategory: function(e){
      e.preventDefault()
      e.stopPropagation()
      this.$el.trigger('layerCategoryClose')
    },


    // event handlers for view events
    toggleLayer : function(e){
      e.preventDefault()
      e.stopPropagation()
      this.$el.trigger('layerToggled',{id:$(e.currentTarget).data('layerid')})
    },
    toggleLayerGroup : function(e){
      e.preventDefault()
      this.$el.trigger('layerGroupToggled',{
        group:  $(e.currentTarget).data('groupid'),
        active: !$(e.currentTarget).data('active')
      })
    },
    handleLayerInfoLink : function(e){
      e.preventDefault()
      this.$el.trigger('layerInfoLinkClick',{target:e.target, id:$(e.target).data('layerid')})
    },
    handlePrintMap : function(e){
      e.preventDefault()
      this.$el.trigger('printMapModal')
    },
  });

  return LayerCategoryView;

});
