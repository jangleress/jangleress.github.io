define([
  'jquery', 'underscore', 'backbone',  
  './LayerModel',
  'leaflet',
  'proj4.leaflet',
  './LocationModel',
  './LocationCollection'  
], function($,_, Backbone,
  LayerModel,
  leaflet,  
  proj4Leaflet,  
  LocationModel,
  LocationCollection  
){
  
  var LayerModelNav = LayerModel.extend({    
    makeLayer : function (locations, options){
      this.set('title','')
      var geojson = this.makeGeoJsonLayer(locations)  
      options = typeof options !== 'undefined' ? options : {}
      var labelOptions = typeof options.labelOptions !== 'undefined' ? options.labelOptions : {}
      var that = this          
      this.set('locations', new LocationCollection(
        _.map(geojson.getLayers(),function(marker){                                    
          return _.extend({}, marker.feature.properties,
            {
              markerLayer : marker,
              parentLayer:that,
              labelOptions:labelOptions,
              className : geojson.options.className
            }
          )
        }),
        {
          model:LocationModel,
          eventContext: this.collection.options.eventContext
//          print: this.collection.options.print,
//          printScale:this.scaleFactorMarker
        }
      ))
      var markerGroup = new L.layerGroup()        
      _.each(this.get('locations').models,function(location){        
        markerGroup.addLayer(location.get('markerLayer'))
      },this)
            
      this.set('mapLayer', markerGroup) 
              
      
    },
    makeGeoJsonLayer:function(locations){
      return L.Proj.geoJson(
        {
          "type": "FeatureCollection",
          "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::4326" } },                                                                                
          "features": _.map(locations,function(location){
            return {
              "type" : "Feature",
              "properties" : {
                "id" : location.id,
                "title" : location.title
              },
              "geometry" : {
                "type" : "Point",
                "coordinates" : location.location
              }
            }
          })
        }
      )        
    },
    getMapLayer : function (callback){
      callback(this.attributes.mapLayer, this)
    }
        
        
  });

  return LayerModelNav;

});