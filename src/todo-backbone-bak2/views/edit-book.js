define(function(require, exports, module){
	var Backbone = require('backbone'),
		// BookModel = require('../models/book'),
		$ = require('jquery'),
  		_ = require('underscore');

  	var EditBookView = Backbone.View.extend({
  		el: '#library',
		className: 'editBookContainer',
		template: $( '#formTemplate' ).html(),
		events: {
			'click .save': 'save'
		},
		initialize: function (options) {
			console.log('EditBookView-initialize');
			this.model = options.model;
			this.reader();

		},
		reader: function() {
			//tmpl is a function that takes a JSON object and returns html
			var tmpl = _.template( this.template );

			//this.el is what we defined in tagName. use $el to get access to jQuery html() function
			this.$el.html( tmpl( this.model.toJSON() ) );
			this.$el.find('h2').text('Edit Book');

			return this;
		},
		close: function() {
			this.$el.unbind();
			this.$el.empty();
		},
		//点击".save" 时销毁模型
		save: function(event) {
			console.log('save');
			var self = this,
				_id = this.model.get('id');
			event.preventDefault();
      		event.stopPropagation();


			this.model.set({
		        title: this.$el.find('input[name=title]').val(),
		        author: this.$el.find('input[name=author]').val(),
		        description: this.$el.find('textarea[name=description]').val(),
		        id: _id
	      	});
			// this.model.save();
			// console.log(JSON.stringify(this.model));

			//save model
			this.model.save(null, {
				type: 'GET',
				url: 'server/add.php',
				// data: 'id=' + _id,
				data: $.param(this.model.toJSON()),
				success:function(model,response){
					console.log('success', model,response);
					// Delete view
					window.location.hash = "library/index";
				},
				error:function(model, response){
					console.log('error', model, response);
				}
			});

			
		}
  	});

  	module.exports = EditBookView;
});