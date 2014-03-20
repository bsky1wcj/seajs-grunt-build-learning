define(function(require, exports, module){
	var Backbone = require('backbone'),
		BookModel = require('../models/book'),
		BookView = require('../views/book'),
		LibraryView = require('../views/library'),
		AddBookView = require('../views/add-book'),
		EditBookView = require('../views/edit-book');

	var LibraryRouter = Backbone.Router.extend({
		routes: {
			"": "index",
			"library/index": "index",
			"book/add": "create",
			"book/:id/edit": "edit",
			"book/:id/view": "show"
		},

		initialize: function (options) {
			console.log('LibraryRouter-initialize');
			this.collection = options.collection;
			// this.collection.fetch();
			// this.collection.bind('add', this.addOne, this);
			// this.collection.bind('reset', this.addAll, this);
			// this.index();
		},


		create: function() {
			console.log('create');
			if(this.bookView) {
				this.bookView.close();	
			}
			this.bookView = new AddBookView({collection: this.collection, model: new BookModel()});

		},
		edit: function(id) {
			console.log('edit');
			if(this.bookView) {
				this.bookView.close();	
			}
			this.bookView = new EditBookView({model: this.collection.get(id)});
		},
		show: function(id) {

		},
		index: function() {
			console.log('index');
			// this.collection.fetch();
			new LibraryView({collection: this.collection});
		}
	});

	module.exports = LibraryRouter;

});