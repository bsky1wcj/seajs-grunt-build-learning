define(function(require, exports, module){
	var Backbone = require('backbone'),
		LibraryCollection = require('../collections/library'),
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
		},


		create: function() {
			console.log('create');
			if(this.bookView) {
				this.bookView.close();	
			}
			this.bookView = new AddBookView({collection: this.bookList, model: new BookModel()});
			this.bookView.render().el;

		},
		edit: function(id) {
			console.log('edit');
			if(this.bookList) {
				if(this.bookView) {
					this.bookView.close();	
				}
				this.bookView = new EditBookView({model: this.bookList.get(id)});
				this.bookView.render().el;
			} else {
				this.requestedId = id;
				this.index();
			}
	
		},
		index: function() {
			console.log('index');
			if(this.bookList) {
				this.requestedId = null;
			}
			var self = this;
			this.bookList = LibraryCollection;
			this.bookList.fetch({
				success: function() {
					self.libraryView = new LibraryView({collection: self.bookList});
					self.libraryView.render().el;
					if (self.requestedId) {
						self.edit(self.requestedId);
					}
				}
			});

		}
	});

	module.exports = LibraryRouter;

});