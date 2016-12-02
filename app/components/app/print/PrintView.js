define([
  'jquery','underscore','backbone',
  'text!./printTemplate.html',
  'text!./printKeyTemplate.html',
  'text!./printLayerKeyTemplate.html'
], function(
  $, _, Backbone,
  template,
  printKeyTemplate,
  printLayerKeyTemplate
){

  var PrintView = Backbone.View.extend({

    initialize : function(){
      this.render()
    },
    render: function(){
      var url, args, url_current
      var id = this.model.getMapId()

      if (lang === 'en') {
        url = window.location.host;
      } else {
        url = window.location.host+'/'+lang;
      }

      args = {
        t : tlang,
        custom_url : url + '/#!/id/'+id,
        url: url
      }

      this.$el.html(_.template(template)(args))

      this.populateKey()

      return this
    },
    populateKey : function(){
      this.$('.print-key').html(_.template(printKeyTemplate)({
        layerChunks:this.chunk(
            _.map(this.model.getActiveLayers(),function(layer) {
              layer.keyFullHtml = _.template(printLayerKeyTemplate)({
                id : layer.id,
                title : layer.getTitle(),
                hint : layer.getHint(),
                layerGradient: layer.makeLayerGradientKey(),
                layerCategories: layer.makeLayerCategoriesKey(),      
                keyHtml : layer.getKeySquareIcon('lg'),
                reference:layer.getReference(true),
                lang:lang,
                t:tlang
              })
              return layer
            }),
            6
          ).reverse(),
        t:tlang
      })
      )
    },
    chunk : function (array, size) {
      return array.reduce(function (res, item, index) {
        if (index % size === 0) { res.push([]); }
        res[res.length-1].push(item);
        return res;
      }, []);
    }
  });

  return PrintView;

});
