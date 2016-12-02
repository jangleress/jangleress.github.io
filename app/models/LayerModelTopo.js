define([
  'jquery', 'underscore', 'backbone',  
  './LayerModel',
  'topojson'
], function($,_, Backbone,
  LayerModel,
  topojson
){
  
  var LayerModelTopo = LayerModel.extend({    
    loadData : function (callback){ 
      
      //console.log('try loading topojson layer: ' + this.id)
      this.setLoading(true)
      
      var that = this
      
      
      $.ajax({
        dataType: "json",
        url: this.attributes.baseurl + '/' + this.attributes.path,
        success: function(data) {
          
          var geojson = topojson.feature(data,data.objects[Object.keys(data.objects)[0]])
                  
                  
          that.setLoading(false)
          //console.log("success loading topojson layer")
          callback(L.Proj.geoJson(
            _.extend({},geojson,{crs:that.getCrs()}),
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
            //console.log("error loading geojson layer")

            that.setLoading(false)
        }
      }); 
      
     
    }
        
  });

  return LayerModelTopo;

});






