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
			_.bindAll(this, 'reader', 'destroy');
			this.model.bind('change', function() {
				console.log('change');
			});
			// this.listenTo(this.model, 'destroy', this.remove);
			
			// this.model.bind('destroy', this.remove);
		},
		reader: function() {
			console.log('reader');
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
      		// this.model.destroy();
			//Delete model
			this.model.destroy({
				type: 'GET',
				url: 'server/delete.php',
				// data: 'id=' + _id,
				data: {id: _id},
				success:function(model,response){
					console.log('success', model,response);
					//Delete view
					// self.remove();
				// collection.each(function(data){
				//     console.log('success:' + data.get('title'));
				// })
				},
				error:function(model, response){
					console.log(model);
					console.log(response);
					console.log('error');
				}
			});

			// //Delete view
			
		}
  	});

  	module.exports = BookView;
});