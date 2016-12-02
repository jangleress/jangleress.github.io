define([
  'jquery', 'underscore', 'backbone',  
  './LayerModel',
  'leaflet',
  'leaflet.draw',
  'text!templates/divSvgIconTemplate.html'  
], function($,_, Backbone,
  LayerModel,
  leaflet,
  leafletDraw,
  divSvgIconTemplate
){
  
  var LayerModelCustom = LayerModel.extend({    
    initializeSource : function(){
      
      var layerIndex = parseInt(this.id.split('_c')[1]) 
      
      var title = tlang.ux.layers.custom_default_title 
        + ( layerIndex > 0 
            ? ' ' + (layerIndex + 1) 
            : ''
          )
      
      this.set('mapLayer',new L.FeatureGroup())
      this.set('ocean',this.id.split('_c')[0])
      this.setTitle(title)
      
      var color = this.getRandomColor()
      
      this.set('style',{
        fillColor:color,
        color:color,
        weight:3
      })
      // ICON STYLES
      this.attributes.icon = {
        type: 'marker',
        width : 15,
        height : 25        
      }
      
      this.set('control',new L.Control.Draw({
        draw: {
          rectangle:{
            showArea:false
          },
          polygon:{
            showArea:false
          },
          circle:{
            showRadius: false
          },
          polyline:{
            showLength: false
          },
          marker:{
            icon:this.getMarkerIcon()
          }
        },
        edit: {
          featureGroup: this.attributes.mapLayer,
          edit: {            
            selectedPathOptions: {
              maintainColor: true         
            }          
          }
        },
        position: 'topright'
      }))
      
      L.drawLocal = {
        draw : {
          toolbar: {
            actions: {
              title: tlang.ux.layers.cancel,
              text: tlang.ux.layers.cancel
            },
            finish: {
              title: tlang.ux.layers.draw.finish,
              text: tlang.ux.layers.draw.finish
            },
            undo: {
              title: tlang.ux.layers.draw.undo,
              text: tlang.ux.layers.draw.undo
            },
            buttons: {
              polyline: tlang.ux.layers.draw.add_line,
              polygon: tlang.ux.layers.draw.add_area,
              rectangle: tlang.ux.layers.draw.add_rectangle,
              circle: tlang.ux.layers.draw.add_circle,
              marker: tlang.ux.layers.draw.add_marker
            }
          },
          handlers: {
            circle: {
              tooltip: {
                start: tlang.ux.layers.draw.circle_tooltip
              }
            },
            marker: {
              tooltip: {
                start: tlang.ux.layers.draw.marker_tooltip
              }
            },
            polygon: {
              tooltip: {
                start: tlang.ux.layers.draw.polygon_tooltip_start,
                cont: tlang.ux.layers.draw.polygon_tooltip_continue,
                end: tlang.ux.layers.draw.polygon_tooltip_end
              }
            },
            polyline: {
              tooltip: {
                start: tlang.ux.layers.draw.line_tooltip_start,
                cont: tlang.ux.layers.draw.line_tooltip_continue,
                end: tlang.ux.layers.draw.line_tooltip_end
              }
            },
            rectangle: {
              tooltip: {
                start: tlang.ux.layers.draw.rectangle_tooltip
              }
            },
            simpleshape: {
              tooltip: {
                end: tlang.ux.layers.draw.tooltip_end
              }
            }
          }
        },
        edit: {
          toolbar: {
            actions: {
              save: {
                title: tlang.ux.layers.confirm,
                text: tlang.ux.layers.confirm
              },
              cancel: {
                title: tlang.ux.layers.cancel,
                text: tlang.ux.layers.cancel
              }
            },
            buttons: {
              edit: tlang.ux.layers.draw.edit,
              editDisabled: tlang.ux.layers.draw.edit,
              remove: tlang.ux.layers.draw.remove,
              removeDisabled: tlang.ux.layers.draw.remove
            }
          },
          handlers: {
            edit: {
              tooltip: {
                text: tlang.ux.layers.draw.edit_tooltip,
                subtext: tlang.ux.layers.draw.edit_tooltip_hint
              }
            },
            remove: {
              tooltip: {
                text: tlang.ux.layers.draw.remove_tooltip
              }
            }
          }
        }
      }
    },    
    
    getMarkerIcon : function(){
      var w = this.attributes.icon.width
      var h = this.attributes.icon.height
      var svgIcon = _.template(divSvgIconTemplate)({
        color: 'rgba(0,0,0,0.5)',
        weight: 2,
        fillColor: this.attributes.style.fillColor
      })
      return L.icon( {
        iconUrl: "data:image/svg+xml;base64," + btoa(svgIcon),
        iconSize: [w, h],
        iconAnchor: [w/2, h]
      })
    },
    getDrawControl:function(){
      return this.attributes.control
    },
    getColor:function(){
      return this.attributes.style.color
    },
    setColor:function(color){
      this.set('style',_.extend(this.attributes.style,{
        fillColor:color,
        color:color
      }))
      this.initStyles()
      this.initCssStyles()
    },
    getRandomColor: function (){
      return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
    },
    getMapLayer : function (callback){
      callback(this.attributes.mapLayer,this)
    }, 
    setEdit:function(bool){
      this.set('edit', bool)
    },
    isEdit:function(){
      return this.attributes.edit 
    },
    setTitle : function(title) {
      this.set('title',title)
    },
    getTitle : function() {
      return this.attributes.title
    },
    setCustomData: function(cdata) {
      if (typeof cdata !== 'undefined') {
        if (cdata.id === this.id) {
          if(typeof cdata.title !== 'undefined'){
            this.setTitle(cdata.title)
          }
          if(typeof cdata.color !== 'undefined'){
            this.setColor(cdata.color)
          }
          if(typeof cdata.shapes !== 'undefined'){
            this.attributes.mapLayer.clearLayers()        
            if (cdata.shapes.length > 0) {      
              var that = this      
              _.each(cdata.shapes,function(shape){                
                L.geoJson(
                  shape,
                  { 
                    onEachFeature: function (feature, layer) { 
                      
                      //type specific handling
                      switch (shape.properties.type) {
                        case 'rectangle' :
                          var rect = new L.Rectangle(
                            layer.getBounds(), 
                            that.attributes.style
                          );
                          rect.feature = layer.feature
                          layer = rect                        
                          break
                        case 'circle' :
                          var circle = new L.Circle(
                            layer.getLatLng(), 
                            shape.properties.radius,
                            that.attributes.style
                          );
                          circle.feature = layer.feature
                          layer = circle
                          break
                        case 'polyline' :
                          var line = new L.Polyline(
                            layer.getLatLngs(),                            
                            that.attributes.style
                          );
                          line.feature = layer.feature
                          layer = line
                          break
                        case 'polygon' :
                          var line = new L.Polygon(
                            layer.getLatLngs(),                            
                            that.attributes.style
                          );
                          line.feature = layer.feature
                          layer = line
                          break
                        case 'marker' :
                          var marker = new L.marker(
                            layer.getLatLng(),
                            {icon:that.getMarkerIcon()}
                          )
                          marker.feature = layer.feature
                          layer = marker
                          break
                      }    
                      //_.extend({},that.attributes.style,{fillOpacity:0.1})
                      that.attributes.mapLayer.addLayer(layer);
                    }
                  }
                )                       
              })          
            }
          }          
        }
      }
      
    },
    getReference : function(isPrint){      
      isPrint = typeof isPrint !== 'undefined' ? isPrint : false
      return isPrint 
        ? tlang.ux.print.custom_attribution
        : ''
    },
    
        
        
  });

  return LayerModelCustom;

});