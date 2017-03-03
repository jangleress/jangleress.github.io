define([
  'jquery',
  'underscore',
  'backbone',
  './layerCategory/LayerCategoryView', './layerCategory/LayerCategoryModel',
  './layerCustomCategory/LayerCustomCategoryView', './layerCustomCategory/LayerCustomCategoryModel',
  './layerHome/LayerHomeView', './layerHome/LayerHomeModel',
  './layerItem/LayerItemView', './layerItem/LayerItemModel',
  'models/ContentModel'
], function($, _, Backbone,
LayerCategoryView, LayerCategoryModel,
LayerCustomCategoryView, LayerCustomCategoryModel,
LayerHomeView, LayerHomeModel,
LayerItemView, LayerItemModel,
ContentModel){

  var LayersView = Backbone.View.extend({
    events : {
      "click .cat-link" : "handleCategoryLink",
      "click .cat-layers-remove" : "handleCategoryRemove"
    },
    initialize : function(){
      this.views = {}
      this.listenTo(this.model, "change:active", this.handleActive);
      this.listenTo(this.model, "change:layerId", this.render);
      this.listenTo(this.model, "change:category", this.render);
      this.listenTo(this.model, "change:ocean", this.render);
      this.listenTo(this.model, "change:customLayerEdit", this.handleCustomEditUpdate);
      this.listenTo(this.model, "change:customLayerData", this.handleCustomDataUpdate);
      this.listenTo(this.model, "change:customLayerIds", this.handleCustomLayersUpdate);
      this.listenTo(this.model, "change:activeLayerIds", this.handleActiveLayersUpdate);
    },
    render: function(){

      var category, ocean

      ocean = this.model.getOcean()

      _.each(this.views,function(view){
        view.model.setActive(false)
      })
      this.$('#layer-item').hide()
      this.$('#layers-home').hide()
      this.$('#layers-control').hide()

      var layerId = this.model.getLayerId()

          
     
      
      // Layer Item view =======================================================
      if ( layerId !== '' ){
        if (_.contains(this.model.getLayers().getIds(), layerId )) {
          
          //console.log('LayersView.render item: ' + layerId)
          this.$('#layer-item').show()

          var layer = this.model.getLayers().get(layerId)
          if (ocean !==''){
            if (this.$('#layer-item-'+layerId).length === 0) {
              this.$('#layer-item').append('<div id="layer-item-'+layerId+'"></div>')
            }
            if (layer.get('contentid') !== layerId && this.$('#layer-item-'+layer.get('contentid')).length > 0) {
              this.$('#layer-item-'+layer.get('contentid')).remove()
            }
            this.views['item-'+layerId] = this.views['item-'+layerId] || new LayerItemView({
              el:this.$('#layer-item-'+layerId),
              model:new LayerItemModel({
                id:layerId,
                layer:layer,
                ocean:ocean,
                activeLayerIds:this.model.getActiveLayerIds()
              })
            });

            this.views['item-'+layerId].model.setActive(true)

            category = layer.get('category')
          } else {
            this.$('#layer-item-'+layerId).remove()
            if(typeof layer !== 'undefined') {
              this.$el.trigger('layerInfoSubpage',{id:layer.id})            
            }            
          }
        
        } else {
          // first model matching content id
          this.$('#layer-item-'+layerId).remove()
          var layer = this.model.getLayers().findWhere({'contentid':layerId})
          if(typeof layer !== 'undefined') {
            this.$el.trigger('layerInfoSubpage',{id:layer.id})            
          }
          
        }
        

      } else {
        var categories =_.map(categoriesGlobal.layers,function(cat){
          cat.activeCount = this.model.getLayers().byActive().byOcean(ocean).byCategory(cat.value).length
          return cat
        },this) 

        category = this.model.getCategory()                
        
        // Layer Category view =======================================================
        if (   category === 'custom' 
            || (category !== '' 
                && _.contains(this.model.getLayers().getCategories(), category ))) {

          var viewId = ocean + '-' + category

          this.$('#layers-control').show()
          if (this.$('#layers-control-'+viewId).length === 0) {
            this.$('#layers-control').append('<div id="layers-control-'+viewId+'" class="layers-control-category"></div><div id="translate"><table class="inner"><tbody><tr><td class="english"><a href="https://romtoronto-map.github.io/#!/layers/home?view=50.3616|-59.7097|5||1312|682&ocean=atlantic&cat=wildlife">EN</a></td><td class="french"><a href="https://romtoronto-map.github.io/fr/#!/layers/home?view=50.3616|-59.7097|5||1312|682&ocean=atlantic&cat=wildlife">FR</a></td></tr></tbody></table></div>')
          }

          
          // Layer Custom Category view 
          if (category === 'custom') {
            
            this.views[viewId] = this.views[viewId] || new LayerCustomCategoryView({
              el:this.$('#layers-control-'+viewId),
              model:new LayerCustomCategoryModel({
                id:viewId,
                category: category,
                categories: categories
              })
            });
            this.views[viewId].model.set({
              ocean:ocean,
              layers:this.model.getLayers().byOcean(ocean).byCategory(category),
              activeLayerIds:this.model.getActiveLayerIds(),
              customData:this.model.get('customLayerData'),
              edit: this.model.get('customLayerEdit')
            })
          } else { 
            
          // Layer Category view 
            this.views[viewId] = this.views[viewId] || new LayerCategoryView({
              el:this.$('#layers-control-'+viewId),
              model:new LayerCategoryModel({
                id:viewId,
                category: category,    
                categories: categories                
              })              
            })
            this.views[viewId].model.set({
              ocean:ocean,
              layers:this.model.getLayers().byOptional(true).byOcean(ocean).byCategory(category),
              activeLayerIds:this.model.getActiveLayerIds()
            })            
          }
          this.views[viewId].model.setActive(true)
          
        } else {
          
        // Layer Home view =====================================================
          this.$('#layers-home').show()

          var url = '/layers/home/'

          this.views.home = this.views.home || new LayerHomeView({
            el:this.$('#layers-home'),
            model:new LayerHomeModel({
              content:new ContentModel({url:url})
            })
          });
          this.views.home.model.setOcean(ocean)
          this.views.home.model.setCategories(categories)
          
          this.views.home.model.setActive(true)
          

          category = false
        }

      }
      this.checkActiveCategory(category)

      return this
    },
    checkActiveCategory : function(category) {

      this.$('.layer-links-bar .cat-link-layers').removeClass('active')
      if (category) {
        this.$('.layer-links-bar .cat-link-layers-'+category).addClass('active')
      }

    },

    // event handlers for model change events
    handleActive : function(){
      //console.log('LayersView.handleActive')
      if (this.model.isActive()) {
        this.$el.show()
      } else {
        this.$el.hide()
      }
    },
    handleCustomDataUpdate:function(e){
      // inform category subview
      var ocean = this.model.getOcean()
      var category = this.model.getCategory()
      var viewid = ocean + '-' + category
      
      if ( this.model.isActive()
          && category === 'custom' 
          && typeof this.views[viewid] !== 'undefined') {
        this.views[viewid].model.setCustomData(this.model.get('customLayerData'))     
      }
    },
    handleCustomEditUpdate:function(e){
      // inform category subview
      var ocean = this.model.getOcean()
      var category = this.model.getCategory()
      var viewid = ocean + '-' + category
      
      if ( this.model.isActive()
          && category === 'custom' 
          && typeof this.views[viewid] !== 'undefined') {
        this.views[viewid].model.setEdit(this.model.get('customLayerEdit'))     
      }
    },
    handleCustomLayersUpdate:function(e){
      // inform category subview
      var ocean = this.model.getOcean()
      var category = this.model.getCategory()
      var viewid = ocean + '-' + category
      
      if ( this.model.isActive()
          && category === 'custom' 
          && typeof this.views[viewid] !== 'undefined') {
        this.views[viewid].model.setLayers(
          this.model.getLayers().byOcean(ocean).byCategory(category)                
        )     
      }
    },
    handleActiveLayersUpdate:function(e){
      // inform category subview
      var ocean = this.model.getOcean()      
      var category = this.model.getCategory()
      var viewid = this.model.getOcean() + '-' + category
      var categories =_.map(categoriesGlobal.layers,function(cat){
                cat.activeCount = this.model.getLayers().byActive().byOcean(ocean).byCategory(cat.value).length
                return cat
              },this)      
      if (    this.model.isActive()
          && (category === 'custom' || category !== '')
          && typeof this.views[viewid] !== 'undefined') {
        this.views[viewid].model.set({
          activeLayerIds: this.model.getActiveLayerIds(),
          categories: categories
        })
      }
      if (    this.model.isActive()
          && typeof this.views['item-'+this.model.getLayerId()] !== 'undefined') {
        this.views['item-'+this.model.getLayerId()].model.setActiveLayerIds(
          this.model.getActiveLayerIds()
        )
      }
    },



    handleCategoryLink : function(e){
      e.preventDefault()
      this.$el.trigger('layerCategoryLinkClick',{target:e.target, id:$(e.target).closest('a').data('catid')})
    },
    handleCategoryRemove : function(e){
      e.preventDefault()
      e.stopPropagation()
      this.$el.trigger('layerCategoryRemove',{target:e.target, id:$(e.target).closest('a').data('catid')})
    }

  });

  return LayersView;

});
