[
  { 
    "mapID" : "basemap",
    "attribution" : "<a class='page-link' data-pageid='basemap' href='#' >Basemap Attribution</a>",
    "mapOptions" : {
      "minZoom":2,
      "maxZoom":8,
      "zoomControl" : false,
      "attributionControl": false
    },
    "printMargin" : 100,
    "labelOptions" : {      
      "options" : {
        "offset":[0,0],
        "direction" : "right",
        "pane":"popupPane"
      },
      "timeout":3000
    },
    "clusterOptions" : {
      "showCoverageOnHover" : false,
      "zoomToBoundsOnClick" : true,
      "spiderfyOnMaxZoom" : true,
      "maxClusterRadius" : 66,     
      "singleMarkerMode" : false,
      "removeOutsideVisibleBounds" : false,
      "spiderfyDistanceMultiplier":1
    },
    "views" : {
      "default" : {
        "center" : { "lat": 65, "lng": -90},
        "zoom" : 4,
        "dimensions" : [850,700]        
      }
    },
    "boundsPadding" : [0,0], 
    "projection":{      
      "name": "Canada Polar Stereographic",
      "crs": "EPSG:5937",
      "proj4def": "+proj=sterea +lat_0=90 +lat_ts=90 +lon_0=-100 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m +no_defs +nadgrids=@null",
      "resolutions": [156543.04,78271.52,39135.76, 19567.88, 9783.94, 4891.97, 2445.985, 1222.9925, 611.49625, 305.748125, 152.8740625, 76.43703125, 38.218515625, 19.1092578125, 9.55462890625],            
      "origin": [-20037509.12,20037509.12]      
    },
    "crsDefault" : {       
      "type": "name",
      "properties": {
        "name": "urn:ogc:def:crs:EPSG::5937"
      }    
    },
    "proj4defs" : [
      [ "urn:ogc:def:crs:EPSG::4326",   "+proj=longlat +datum=WGS84 +no_defs" ],
      [ "urn:ogc:def:crs:EPSG::102002", "+proj=lcc +lat_1=50 +lat_2=70 +lat_0=40 +lon_0=-96 +x_0=0 +y_0=0 +datum=NAD83 +units=m +no_defs" ],      
      [ "urn:ogc:def:crs:EPSG::53003",  "+proj=mill +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +R_A +a=6371000 +b=6371000 +units=m +no_defs" ],      
      [ "urn:ogc:def:crs:EPSG::3978",   "+proj=lcc +lat_1=49 +lat_2=77 +lat_0=49 +lon_0=-95 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs" ],
      [ "urn:ogc:def:crs:EPSG::5937",   "+proj=sterea +lat_0=90 +lat_ts=90 +lon_0=-100 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m +no_defs +nadgrids=@null" ]
    ],
    "arcgisOptions" :   { 
      "ip" : "72.0.211.8",
      "path" : "arcgis/rest/services",
      "queryArgs" : {
        "returnGeometry" : true,
        "geometryPrecision" : 0,
        "maxAllowableOffset" : 1000,
        "where" : "1=1",
        "outFields":"*",
        "outSR":"5937",             
        "geometryType":"esriGeometryEnvelope",
        "f":"json"    
      },
      "queryArgsRaster" : {
        "dpi" : 96,
        "transparent" : true,
        "format" : "png8",
        "f":"image"
      }
    },
    "layerStyles" : {
      "default": {
        "color": "black",
        "weight":1,      
        "opacity":0.8,   
        "fillOpacity":0.3
      }, 
      "marker": {
        "fillColor": "#05a4db",
        "fillOpacity":1,
        "color": "#000",
        "weight":1,      
        "opacity":0.4        
      }, 
      "polygon": {
        "color": "black",
        "weight":0,      
        "opacity":0.8,   
        "fillOpacity":0.5,
        "lineJoin":"round"
      }, 
      "line": {
        "color": "black", 
        "weight":1,       
        "opacity":0.8
      },    
      "circle": {
        "color": "black",
        "weight":1,     
        "opacity":0.8, 
        "fillOpacity":0.2
      },
      "raster" : {
        "opacity" : 0.9
      }      
    },
    "cssStyle" : {
      "backgroundColor" : "black",
      "borderColor" : "black",
      "borderWidth" : 0,
      "borderRadius" : 0,
      "backgroundImage" : "none"
    },    
    "printScales" : {
      "default" : 4,
      "circle" : 3,
      "marker" : 2
    }    
  }
  
]
