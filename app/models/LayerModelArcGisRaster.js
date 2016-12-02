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
  
  var LayerModelArcGisRaster = LayerModel.extend({    

    loadData : function (callback,options){    
      //console.log('try loading arcgis raster layer: ' + this.id)

      this.setLoading(true)                
            
      var bbox = this.attributes.options.bbox       

      var imageSize = 0
      if (typeof this.attributes.options.imageSize !== 'undefined') {
        imageSize = this.attributes.options.imageSize
      } else {
        // get image size for highest possible map zoom          
        var p1 = options.map.project([bbox.XMin, bbox.YMin], this.attributes.mapConfig.mapOptions.maxZoom)
        var p2 = options.map.project([bbox.XMax, bbox.YMax], this.attributes.mapConfig.mapOptions.maxZoom)
        imageSize = Math.max(Math.abs(p1.x - p2.x),Math.abs(p1.y - p2.y))
      }

      var query = $.param(_.extend(
        {},
        this.attributes.mapConfig.arcgisOptions.queryArgsRaster,
        {
          bbox : bbox.XMin + ',' + bbox.YMin + ',' + bbox.XMax + ',' + bbox.YMax,
          bboxSR : this.attributes.options.bboxSR,
          imageSR : this.attributes.options.imageSR,
          size : imageSize + ',' + imageSize
        }
      ))
      
      
      var that = this        
      // create image overlay ... will only be executed when added to map
      callback(L.Proj.imageOverlay(
        that.getURL() + 'export?' + query,
        L.bounds(
          [bbox.XMin, bbox.YMin],
          [bbox.XMax, bbox.YMax]
        ),
        that.attributes.style
      ).on('load',function(){
        that.setLoading(false)  
      }))

    },
  
    getURL : function(){
      return '//' + this.attributes.mapConfig.arcgisOptions.ip + '/' 
                  + this.attributes.mapConfig.arcgisOptions.path + '/'
                  + this.attributes.path
    }
        
  });

  return LayerModelArcGisRaster;

});



