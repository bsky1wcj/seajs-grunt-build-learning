define(function(require, exports, module){
	var Backbone = require('backbone'),
		_ = require('underscore');

	var BookModel = Backbone.Model.extend({
		initialize: function(){
			console.log('BookModel-initialize');
	    },
		defaults: {
			id: null,
			title: '',
			author: '',
			description: ''
		},
		validate: function (attrs) {
			console.log('BookModel-validate===============');
			var errors = {};
			if (attrs.title === '') {
				errors.title = "title 不能为空！";
			}
			if (attrs.author === '') {
				errors.author = "author 不能为空！";
			}
			if (attrs.description === '') {
				errors.description = "description 不能为空！";
			}


			if (!_.isEmpty(errors)) {
				return errors;
			}
		}


	});

	module.exports = BookModel;

});