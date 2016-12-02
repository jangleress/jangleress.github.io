define([
  'jquery', 'underscore', 'backbone',  
  './LayerModel',
  'leaflet'
], function($,_, Backbone,
  LayerModel,
  leaflet
){
  
  var LayerModelMapboxTiles = LayerModel.extend({    
    loadData : function (callback){    
      //console.log('try loading tile layer: ' + this.id)
      this.setLoading(true)     
      
      var mapid = this.attributes.options.id
       
      if (this.collection.options.print && typeof this.attributes.options.printId !== 'undefined'){
        mapid = this.attributes.options.printId
      } else {
        if (L.Browser.retina && typeof this.attributes.options.retinaId !== 'undefined') {
          mapid =  this.attributes.options.retinaId
        }
      }
      
      
      
      var that = this
      callback (L.tileLayer('http://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}', {
        detectRetina: true,
        id: mapid,
        subdomains: ['a','b','c','d'],
        token: this.attributes.options.accessToken,
        zIndex: this.isBasemap() ? 0 : 1,
        opacity: this.isBasemap() 
          ? 1 
          : typeof this.attributes.options.opacity !== 'undefined' 
            ? this.attributes.options.opacity
            : this.attributes.style.opacity             
      })
      .on('loading',function(){
        //console.log("start loading tile layer")  
      })
      .on('load',function(){
        that.setLoading(false)
        //console.log("success loading tile layer")  
      })        
    )
      
      

    
    }

  });

  return LayerModelMapboxTiles;

});



