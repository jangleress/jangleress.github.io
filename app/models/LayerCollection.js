define([
  'jquery', 'underscore', 'backbone',
  './LayerModel'
], function(
  $, _, Backbone,
  model
){
  var LayerCollection = Backbone.Collection.extend({
    model: model,

    initialize: function(models,options) {      
      
      this.options = options || {};     
      
      this.on("add", function(model){
        model.set('baseurl',this.options.baseurl)
        model.set('print',this.options.print)
      });
      
    },
    byIds:function(ids) {
      var filtered = this.filter(function(model) {
        return ids.indexOf(model.id) > -1
      });
      return new LayerCollection(filtered);
    },
    bySource:function(source){      
      return new LayerCollection(this.where({source:source}))   
    },    
    setActive:function(ids){
      this.each(function(model){
        model.setActive(ids.indexOf(model.id) > -1)        
      })
    },    
    byActive:function(bool){
      bool = typeof bool !== 'undefined' ? bool : true      
      var activeLayers = this.where({active:bool})
      return new LayerCollection(_.sortBy(activeLayers,function(layer){
        return layer.get('activeTime')
      }).reverse())
    },
    byOptional:function(bool){
      bool = typeof bool !== 'undefined' ? bool : true      
      return new LayerCollection(this.where({optional:bool, basemap:false}))   
    },
    byActiveKey:function(){
      var active = this.byActive().byKey()
      active.add(this.where({basemap:true}))
      return active
    },
    byKey:function(){      
      return new LayerCollection(this.where({showInKey:true}))   
    },
    byBasemap:function(bool){
      bool = typeof bool !== 'undefined' ? bool : true      
      return new LayerCollection(this.where({basemap:bool}))   
    },
    byLoading:function(bool){
      bool = typeof bool !== 'undefined' ? bool : true      
      return new LayerCollection(this.where({loading:bool}))     
    },
    isLoading:function(){          
      return this.byLoading().length > 0
    },
    byOcean:function(ocean){
      return new LayerCollection(this.filter(function(model){
        return model.getOcean() === ocean
      }))   
    },
    byCategory:function(cat){
      return new LayerCollection(this.where({category:cat}))   
    },
    bySubcategory:function(cat){
      return new LayerCollection(this.where({subcategory:cat}))   
    },
    byGroup:function(group){
      return new LayerCollection(this.where({group:group}))   
    },
    getCategories:function(){
      return _.unique(_.map(this.models,function(model){ return model.attributes.category}))    
    },
    getSubcategories:function(){
      return _.unique(_.map(
        this.models.where(function(model){
          return typeof model.attributes.subcategory !=='undefined'}),
        function(model){ return model.attributes.subcategory}))    
    },
    getGroups:function(){
      return _.unique(_.map(
        this.models.where(function(model){
          return typeof model.attributes.subcategory !=='undefined'}),
        function(model){ return model.attributes.group}))   
    },
    getIds:function(){
      return _.map(this.models,function(model){ return model.id})
    }


  });

  return LayerCollection;
});
