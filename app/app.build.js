({
  appDir: "../",
  baseUrl: "app",
  dir: "../../build",
  paths: {
    'domReady' : 'libs/domReady',    
    'jquery': 'libs/jquery',
    'jquery.deparam': 'libs/jquery.deparam',
    'jquery.waypoints': 'libs/jquery.waypoints',    //scrolling
    'showdown': 'libs/showdown', //markdown support
    'jsonpack': 'libs/jsonpack', //json utility
    'jquery.spectrum': 'libs/spectrum', // color picker
    'underscore': 'libs/underscore', //core
    'backbone': 'libs/backbone', //core
    'bootstrap': 'libs/bootstrap', //carousel
    'leaflet': 'libs/leaflet-src', //gis
    'esri.leaflet' : 'libs/esri-leaflet-src',//gis
    'leaflet.draw' : 'libs/leaflet.draw-custom',//gis
    'leaflet.label' : 'libs/leaflet.label',//gis
    'leaflet.markercluster' : 'libs/leaflet.markercluster',//gis
    'proj4.leaflet' : 'libs/proj4-leaflet',//gis
    'proj4' : 'libs/proj4-src_infinity',//gis
    'topojson' : 'libs/topojson',//gis
    'templates': 'templates'//core
  },    
  modules: [
    {
      name: "main",
	  name: "unbind"
    }
  ],
  optimizeCss: 'standard'
})