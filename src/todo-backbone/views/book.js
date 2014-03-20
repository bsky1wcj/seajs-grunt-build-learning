define(function(require, exports, module){
	var Backbone = require('backbone'),
		$ = require('jquery'),
  		_ = require('underscore');

  	var BookView = Backbone.View.extend({
  		tagName: 'tr',
		className: 'bookContainer',
		template: $( '#rowTemplate' ).html(),
		events: {
			'click .delete': 'destroy'
		},
		initialize: function (options) {
			console.log('BookView-initialize', options.model.id);
			this.collection = options.collection;
			this.model = options.model;

			_.bindAll(this, 'render', 'destroy');
			// this.model.bind('change', this.render);
			// this.listenTo(this.model, 'destroy', this.remove);
			
			// this.model.bind('destroy', this.remove);
		},
		render: function() {
			console.log('BookView-render');
			//tmpl is a function that takes a JSON object and returns html
			var tmpl = _.template( this.template );

			//this.el is what we defined in tagName. use $el to get access to jQuery html() function
			this.$el.html( tmpl( this.model.toJSON() ) );

			return this;
		},
		//点击".delete" 时销毁模型
		destroy: function(event) {
			var self = this,
				_id = this.model.get('id');
			event.preventDefault();
      		event.stopPropagation();


			if(confirm('Are you sure?')) {
				//Delete model
				this.model.destroy({
					type: 'GET',
					url: 'server/delete.php',
					// data: 'id=' + _id,
					data: $.param({id: _id}),
					success:function(model,response){
						console.log('success', model,response);
						// Delete view
						self.remove();
					},
					error:function(model, response){
						console.log('error', model, response);
					}
				});
			}
	

			
		}
  	});

  	module.exports = BookView;
});