(function ( views ) {

  views.AppView = Backbone.View.extend({
    el : '#content',

    initialize : function () {

      var tags = this.collection;

      tags.on('add', this.addOne, this);
      tags.on('all', this.render, this);

      tags.pager();

    },

    addOne : function ( item ) {
      var view = new views.ResultView({model:item});
      $('#content').append(view.render().el);
    },

    render: function(){
    }
  });

})( app.views );
