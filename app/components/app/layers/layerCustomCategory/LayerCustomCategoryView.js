define([
  'jquery',
  'underscore',
  'backbone',
  'jquery.spectrum',
  'text!./layerCustomCategoryTemplate.html'
], function($, _, Backbone, spectrum, template, catNavTemplate){

  var LayerCustomCategoryView = Backbone.View.extend({
    events : {
      "click .toggle-layer" : "toggleLayer",
      "click .edit-layer" : "handleLayerEdit",
      "click .edit-layer-title" : "handleLayerTitleEdit",
      "click .save-layer-title" : "handleLayerTitleSave",
      "click .edit-layer-color" : "handleLayerColorEdit",
      "click .cancel-layer-color" : "handleLayerColorCancel",
      "click .save-layer-color" : "handleLayerColorSave",
      "click .add-layer" : "handleLayerAdd",
      "click .remove-layer" : "handleLayerRemove",
      "click .print-map" : "handlePrintMap",
      "click .close-item" : "closeCategory"
    },
    initialize : function(){

      this.listenTo(this.model, "change:layers", this.handleLayersUpdate);
      this.listenTo(this.model, "change:customData", this.handleLayersUpdate);
      this.listenTo(this.model, "change:edit", this.handleLayersUpdate);
      this.listenTo(this.model, "change:active", this.handleActive);
      this.listenTo(this.model, "change:activeLayerIds", this.handleActiveLayersUpdate);
      this.listenTo(this.model, "change:categories", this.handleActiveLayersUpdate);
      
    },
    render: function(){
           
      this.$el.html(_.template(template)({
        category:this.model.getCategory(),
        catNav : _.template(catNavTemplate)({
          categories:this.model.getCategories(),
          t:tlang,
          category:this.model.getCategory()}),
        ocean:this.model.getOcean(),
        layers:this.model.getLayers().models,
        editTitle:this.model.getEditTitleId(),
        editColor:this.model.getEditColorId(),
        lang:lang,
        t:tlang
      }));
      
      if(this.model.getEditTitleId() !== '') {
      
        var that = this
        this.$('.input-layer-title')
          .on('click', this.selectOnClick)
          .keyup(function(e){
            if(e.keyCode == 13)
            {
              $(this).trigger("enterKey");
            }
          })
          .bind("enterKey",function(e){
            that.handleLayerTitleSave(e)
          });
      }
      
      if(this.model.getEditColorId() !== '') {
        var that = this
        this.$('.input-layer-color').spectrum({          
          flat:true,
          showInitial: true,
          chooseText:tlang.ux.layers.confirm,          
          cancelText:'',
          clickoutFiresChange: false
        })
        .on('change.spectrum',_.bind(that.handleLayerColorSave,this))
      }
      
      return this
    },
    selectOnClick: function(e){
      e.preventDefault()
      e.target.focus();
      e.target.select();
      setTimeout(function () {
        e.target.setSelectionRange(0, 9999);
      }, 1);
    },    

    // event handlers for model change events
    handleActive : function(){
      //console.logconsole.log('layerControl.handleActive')
      if (this.model.isActive()) {
        this.render()
        this.$el.show()
      } else {
        this.$el.hide()
      }
    },
    handleLayersUpdate : function(){
      this.model.setEditTitleId('')
      this.model.setEditColorId('')
      this.render()
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
    handlePrintMap : function(e){
      e.preventDefault()
      this.$el.trigger('printMapModal')
    },
    handleLayerAdd : function(e) {
      e.preventDefault()
      this.$el.trigger('addCustomLayer', {ocean: this.model.getOcean()})
    },
    handleLayerRemove : function(e) {
      e.preventDefault()
      this.$el.trigger('removeCustomLayer', {id:$(e.target).data('layerid')})
    },
    handleLayerEdit : function(e) {
      e.preventDefault()
      this.$el.trigger('editCustomLayer', {id:$(e.target).data('layerid')})
    },
    handleLayerTitleEdit : function(e) {
      e.preventDefault()
      this.model.setEditTitleId($(e.target).closest('a').data('layerid'))
      this.render()
    },
    handleLayerColorEdit : function(e) {
      e.preventDefault()      
      this.model.setEditColorId($(e.target).closest('a').data('layerid'))
      this.render()
    },
    handleLayerTitleSave : function(e){
      e.preventDefault()
      var layerid = $(e.target).data('layerid')
      var newTitle = this.$('.title input[data-layerid='+layerid+']').val()
      if (newTitle !== this.model.getLayers().findWhere({id:layerid}).getTitle()) {
        this.$el.trigger('customUpdated', {layer:{id:layerid,title:newTitle}})      
      } else {
        this.model.setEditTitleId('')
        this.render()        
      }
    },
    handleLayerColorSave : function(e, value){
      e.preventDefault()
      var layerid = $(e.target).data('layerid')
      var color = value.toHexString()
      this.$el.trigger('customUpdated', {layer:{id:layerid,color:color}})      
    },
    handleLayerColorCancel : function(e, value){
      e.preventDefault()
      this.model.setEditColorId('')
      this.render()   
    }
  });

  return LayerCustomCategoryView;

});
