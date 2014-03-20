define(function(require, exports, module){
	var Backbone = require('backbone');

	var BookModel = Backbone.Model.extend({
		initialize: function(){
			console.log('BookModel-initialize');
	    },
		defaults: {
			id: '',
			title: '',
			author: '',
			description: ''
		}


	});

	module.exports = BookModel;

});