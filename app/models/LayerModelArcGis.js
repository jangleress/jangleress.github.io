define([
  'jquery', 'underscore', 'backbone',  
  './LayerModel',
  'leaflet',
  'esri.leaflet',  
  'proj4.leaflet'
], function($,_, Backbone,
  LayerModel,
  leaflet,
  esriLeaflet,
  proj4Leaflet
){
  
  var LayerModelArcGis = LayerModel.extend({    
    propSort: function(props) {
      if (!props instanceof Array) props = props.split(",");
      return function sort(a, b) {
        var p;
        a = a.attributes;
        b = b.attributes;
        for (var i = 0; i < props.length; i++) {
          p = props[i];
          if (typeof a[p] === "undefined") return -1;
          if (a[p] < b[p]) return -1;
          if (a[p] > b[p]) return 1;
        }
        return 0;
      };
    },
    loadData : function (callback){    
      //console.log('try loading arcgis layer: ' + this.id)

      this.setLoading(true)                
      
        
      var query = $.param(
        _.extend({}, 
          this.attributes.mapConfig.arcgisOptions.queryArgs,
          this.attributes.queryArgs            
      ))//+ '&' + geometry;

      var that = this

      $.ajax({
        dataType: 'json', 
        url: that.getURL() + 'query?' + query ,                  
        success:function(data){
          that.setLoading(false)                
                    
          
          if (data.error){
            console.log('error loading arcgis layer ' + this.id + '. message: ' + data.error.message
                    + ' - code: ' + data.error.code)
          }
          else if (data.error || data.features.length < 1){
            console.log('error loading arcgis layer ' + this.id + ' - no features')
          }
          else {         
            //console.log("success loading arcgis layer")
            
            if (typeof that.attributes.sortBy !== 'undefined') {
              data.features.sort(that.propSort(that.attributes.sortBy)).reverse()
            }
            
            callback(L.Proj.geoJson(
              _.extend({},L.esri.Util.responseToFeatureCollection(data),{crs:that.getCrs()}),
              {
                style: that.attributes.style,
                className : 'wwf-layer wwf-layer-'+that.id+' '+'wwf-layer-type-'+that.attributes.type
              }
            ))
          }
        },
        error: function(){
          that.setLoading(false)                
          console.log('error loading arcgis layer')
        }
      })
    },   
    getURL : function(){
      return '//' + this.attributes.mapConfig.arcgisOptions.ip + '/' 
                  + this.attributes.mapConfig.arcgisOptions.path + '/'
                  + this.attributes.path
    }
        
  });

  return LayerModelArcGis;

});



