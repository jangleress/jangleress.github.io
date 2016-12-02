define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap'
], function ($, _, Backbone) {

  var HeaderView = Backbone.View.extend({
    events : {
      "click .home-link" : "handleHomeLink",
      "click .modal-link" : "handleModalLink",
      "click .page-link" : "handlePageLink"
    },
    initialize : function () {
      this.listenTo(this.model, 'change:activePage', this.handleActivePage);
    },
    render: function () {
      return this
    },
    //upstream
    handleHomeLink : function (e) {
      e.preventDefault()
      this.$el.trigger('resetApp')
      $('#navbar-collapse').collapse('hide')
    },
    handlePageLink : function(e){
      e.preventDefault()
      e.stopPropagation()
      this.$el.trigger('pageLinkClick',{target:e.target,id:$(e.target).data('pageid')})
      $('#navbar-collapse').collapse('hide')
    },
    handleModalLink : function(e){
      e.preventDefault()
      this.$el.trigger('modalOpen',{target:e.target,type:$(e.target).data('modaltype')})
      $('#navbar-collapse').collapse('hide')
    },

    // downstream

    handleActivePage: function () {
      this.$('.page-link').removeClass('active');
      if (typeof this.model.getActivePage() !== 'undefined') {
        var navpageid = typeof this.model.getActivePage().getParent() !== 'undefined'
          ? this.model.getActivePage().getParent()
          : this.model.getActivePage().id
        this.$('[data-pageid="' + navpageid + '"]').addClass('active');
      }
    }
  });

  return HeaderView;
});
