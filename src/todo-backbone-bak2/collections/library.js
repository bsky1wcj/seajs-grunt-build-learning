define(function(require, exports, module){
	var Backbone = require('backbone'),
		BookModel = require('../models/book');

	var LibraryCollection = Backbone.Collection.extend({
		url: 'server/list.php',
		model:  BookModel,
		initialize: function() {
			console.log('LibraryCollection-initialize');
		}
	});

	module.exports = new LibraryCollection();

});