define([
  'jquery','underscore','backbone',
  'jquery.deparam',
  'text!./modalTemplate.html',
  'text!./modalShareTemplate.html',
  'text!./modalPrintTemplate.html',
  'text!templates/categoryPlaceholderTemplate.html',
  'text!templates/layerControlPlaceholderTemplate.html',
  'text!templates/layerReferencePlaceholderTemplate.html',
  'text!templates/oceanHeaderTemplate.html'
], function(
  $, _, Backbone,
  deparam,
  template,
  shareTemplate,
  printTemplate,
  categoryPlaceholderTemplate,
  layerControlPlaceholderTemplate,
  layerReferencePlaceholderTemplate,
  oceanHeaderTemplate){

  var ModalView = Backbone.View.extend({
    events : {
      "click #modal-wrap" : "closeModal",
      "click .close-item" : "closeModal",
      "click .print-share" : "shareMap",
      "click .select-in-click" : "selectOnClick",
      "click .toggle-layer" : "toggleLayer"
    },
    initialize : function(){
      this.listenTo(this.model, "change:modal", this.handleModalChange);
      this.listenTo(this.model, "change:modalid", this.handleModalChange);
      this.listenTo(this.model, "change:printURL", this.handleModalChange);
      this.listenTo(this.model, "change:active", this.handleActive);
      this.listenTo(this.model, "change:path", this.handlePathChange);
    },
    render: function(){      
      return this
    },
    loadShareContent:function(){
      var url, args, url_current
      if (lang === 'en') {
        url = window.location.protocol+'//'+window.location.host+'/';
      } else {
        url = window.location.protocol+'//'+window.location.host+'/'+lang+'/';
      }
      // lets not share the share dialog
      url_current = window.location.href
      url_current = this.removeURLParam(url_current, 'modal')
      url_current = this.removeURLParam(url_current, 'modalid')
      args = {
          t: tlang,
          url: url,
          url_enc: encodeURIComponent(url),
          url_current: url_current
        };

      this.$('#modal-wrap').html(_.template(shareTemplate)(args))
      this.$('.select-on-click').on('click', this.selectOnClick)
    },
    loadPrintContent:function(){
      var url, args, url_current
      var id = this.model.getModalId()

      if (lang === 'en') {
        url = window.location.protocol+'//'+window.location.host+'/';
      } else {
        url = window.location.protocol+'//'+window.location.host+'/'+lang+'/';
      }

      args = {
          t: tlang,
          url_id: url + '#!/id/'+id,
          print_url: this.model.getPrintURL()
        };

      this.$('#modal-wrap').html(_.template(printTemplate)(args))
      this.$('.select-on-click').on('click', this.selectOnClick)
    },    
    loadLayerContent:function(layerId){
      
      
      if (typeof layerId !== 'undefined'
      && layerId !== ''
      && _.contains(this.model.getLayers().getIds(), layerId )) {

        this.$('#modal-wrap').html(template)

        var layer = this.model.getLayers().get(layerId)
        var that = this

        this.$('.modal').html('<div class="content-aside content-wrap"><span class="loading-animation panel-loading-animation"></span></div>')
        layer.getContent(function(content){
          that.$('.modal').html(content[0])
          that.populatePlaceholders(layer)
        })
      } else {
        this.$el.trigger('modalClose')
      }
    },
    populatePlaceholders : function(layer){
      if (layer.getCategory() !== 'undefined' ) {
        this.$('.placeholder-category').html(_.template(categoryPlaceholderTemplate)({
          catId : layer.getCategory(),
          catTitle : tlang.categories[layer.getCategory()] ,
          subcatTitle : layer.getSubcategory() !== 'undefined'
                ? tlang.subcategories[layer.getSubcategory()].title
                : ''
        }))
      }      
      
      if (this.model.getOcean() !== '') {
        this.$('.placeholder-ocean').html(_.template(oceanHeaderTemplate)({
          ocean:this.model.getOcean(),
          t:tlang
        }))
      } else {
        this.$('.placeholder-ocean').html(tlang.app.title)
      }
      
      this.$('.placeholder-layercontrol').html(_.template(layerControlPlaceholderTemplate)({
        id : layer.id,
        title : layer.getTitle(),
        hint : layer.getHint(),
        info: false,
        toggable : false,        
        layerGradient: layer.makeLayerGradientKey(),
        layerCategories: layer.makeLayerCategoriesKey(),
        isActive : layer.isActive() || layer.isBasemap(),
        keyHtml : layer.getKeySquareIcon('sm'),
        t:tlang
      }))
      
      this.$('.placeholder-layer-reference').html(_.template(layerReferencePlaceholderTemplate)({
        text : layer.getReference()
      }))
    },
   
    removeURLParam : function (url, param)
    {
     var urlparts= url.split('?');
     if (urlparts.length>=2)
     {
      var prefix= encodeURIComponent(param)+'=';
      var pars= urlparts[1].split(/[&;]/g);
      for (var i=pars.length; i-- > 0;)
       if (pars[i].indexOf(prefix, 0)==0)
        pars.splice(i, 1);
      if (pars.length > 0)
       return urlparts[0]+'?'+pars.join('&');
      else
       return urlparts[0];
     }
     else
      return url;
    },
    selectOnClick: function(e){
      e.preventDefault()
      e.target.focus();
      e.target.select();
      setTimeout(function () {
        e.target.setSelectionRange(0, 9999);
      }, 1);
    },
    handleModalChange:function(){
      switch (this.model.getModal()){
        case 'layer' :
          //console.log('modal ' + this.model.getModal())
          this.loadLayerContent(this.model.getModalId())
          break;
        case 'share' :
          //console.log('modal ' + this.model.getModal())
          this.loadShareContent()
          break;
        case 'print' :
          //console.log('modal ' + this.model.getModal())
          this.loadPrintContent()
          break;
        default:
          this.$el.trigger('modalClose')
          break;
      }

    },
    loadPage: function(){
      var path = this.model.getPath()
      var pageClass = 'page-' + path

      this.$('.page').hide()
      if (this.$('.'+pageClass).length === 0) {
        this.$el.append('<div class="page ' + pageClass + '"></div>')

        var that = this
        this.model.getPages().findWhere({id:path}).getContent(function(content){
          that.$('.'+pageClass).append(content)
        })


      } else {
        this.$('.'+pageClass).show()
      }



    },

    // event handlers for model change events
    handleActive : function(){
      //console.log('PagesView.handleActive')
      if (this.model.isActive()) {
        this.$el.show()
        this.render()
      } else {
        this.$el.hide()
      }
    },
    handlePathChange : function(){
      this.loadPage()
    },
    shareMap: function(e){
      e.preventDefault()
      var url

      if (lang === 'en') {
        url = window.location.protocol+'//'+window.location.host+'/';
      } else {
        url = window.location.protocol+'//'+window.location.host+'/'+lang+'/';
      }

      var publish = {
        method: 'feed',
        name: $(document).find('title').text(),
        caption: "",
        description: (
          $(document).find('meta[name=description]').attr('content')
        ),
        link: url + '#!/id/'+this.model.getModalId(),
        display: 'popup',
        picture: this.model.getPrintURL(),
        actions: [{name: $(document).find('title').text(), link: url}] //,
      };
//
      function ui_callback(response) {
//        //console.log('callback1');
//        if (response && response.post_id) {
//          //console.log('callback2');
//        }
      };

      // do facebook
      //console.log('FB.ui');
      FB.ui(publish, ui_callback);


    },
    closeModal: function(e){
      if (e.target !== e.currentTarget) return;
      e.preventDefault()
      e.stopPropagation()
      this.$el.trigger('modalClose')
    },
    toggleLayer : function(e){
      e.preventDefault()
      e.stopPropagation()
      // do nothing
//      if($(e.currentTarget).data('toggable') || $(e.currentTarget).data('toggable') === 'true') {
//        this.$el.trigger('layerToggled',{id:$(e.currentTarget).data('layerid')})
//      }
    },

  });

  return ModalView;

});
