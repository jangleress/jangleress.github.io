define([
  'jquery', 'underscore', 'backbone',  
  './LayerModel',
  'proj4.leaflet'
], function(
  $,_, Backbone,
  LayerModel,
  proj4Leaflet
){
  
  var LayerModelGeoJson = LayerModel.extend({    
    loadData : function (callback){ 
      
      //console.log('try loading geojson layer: ' + this.id)
      this.setLoading(true)
      
      var that = this     

      $.ajax({
        dataType: "json",
        url: this.attributes.baseurl + '/' + this.attributes.path,
        success: function(data) {
          that.setLoading(false)
          //console.log("success loading geojson layer")
          callback(L.Proj.geoJson(
            _.extend({},data,{crs:that.getCrs()}),
            { 
              style : that.attributes.style,
              filter : function(feature) {
                // apply all filters 
                return typeof that.attributes.filters !== 'undefined' 
                  ? _.reduce(that.attributes.filters, function(bool,val,key){              
                      return bool || feature.properties[key] === val
                    }, false)
                  : true
              },
              className : 'wwf-layer wwf-layer-'+that.id+' '+'wwf-layer-type-'+that.attributes.type
            }
          ))              
        },
        error: function(){
            console.log("error loading geojson layer")

            that.setLoading(false)
        }
      });        
    }
        
  });

  return LayerModelGeoJson

});



