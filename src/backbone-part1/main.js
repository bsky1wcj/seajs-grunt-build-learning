define(function(require) {
	var Backbone = require('backbone'),
		$ = require('jquery'),
  		_ = require('underscore');

	//Models
	var BookModel = Backbone.Model.extend({
		initialize: function(){
			console.log('BookModel-initialize');
	    },
		defaults: {
			id: null,
			title: '',
			author: '',
			description: ''
		}
	});
	
	var BookCollection = Backbone.Collection.extend({
		url: 'server/list.php',
		model:  BookModel,
		initialize: function() {
			console.log('BookCollection-initialize');
		}
	});
	
	// Views
	
  	var BookListView = Backbone.View.extend({
  		el: '#library',
		events: {
			'click #add': 'addBook'
		},
		updateDebug: function () {
			$('#output').text(JSON.stringify(this.collection.toJSON(), null, 4));
			// .animate({scrollTop: $('#offset').scrollHeight}, 1000);
		},
		initialize: function(options) {
			console.log('BookListView-initialize');
			this.collection.bind('reset', this.render, this);


			//debug
			this.collection.bind('all', this.updateDebug, this);

			// this.collection.bind('remove', this.render, this);
			var self = this;

			this.options = options;
			this.pageSize = options.pageSize;
			this.len = this.collection.models.length;
			this.startPos = (options.page - 1) * this.pageSize;
			this.endPos = Math.min(this.startPos + this.pageSize, this.len);

			// console.log(this.collection);
			// this.collection.bind('add', function(book) {
			// 	self.$el.find("tbody").append(new BookListItemView({model: book}).render().el);
			// });

		},
		render: function() {
			console.log('BookListView-render');
			this.$el.html( $('#indexTemplate').html() );
			this.addAll();

			new Paginator({collection: this.collection, page: this.options.page, pageSize: this.options.pageSize}).render().el;

      		return this;
		},

		addAll: function() {
			console.log('addAll');
			this.$el.find('tbody').children().remove();
			// _.each(this.collection.models, $.proxy(this, 'addOne'));

			for(var i = this.startPos; i < this.endPos; i++) {
				this.addOne(this.collection.models[i]);
			}


			// this.collection.each(function(item) {
			// 	console.log('addAll-item');
			// 	this.addOne(item);
			// }, this);
		},
		addOne: function(item) {
			console.log('addOne');
			var bookView = new BookListItemView({
				model: item
			});
			this.$el.find("tbody").append(bookView.render().el);
		},
		addBook: function() {

		}
  	});
	
	
  	var BookListItemView = Backbone.View.extend({
  		tagName: 'tr',
		className: 'book-list-item',
		template: _.template($( '#rowTemplate' ).html()),
		events: {
			'click .delete': 'deleteBook'
		},
		initialize: function () {
			console.log('BookListItemView-initialize');
			this.model.bind('change', this.render, this);

		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		deleteBook: function(event) {
			var self = this,
				_id = this.model.id;
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
						self.close();
					},
					error:function(model, response){
						console.log('error', model, response);
					}
				});
      		}
	

		},
		close:function () {
			$(this.el).unbind();
			$(this.el).remove();
		}
  	});


  	var BookView = Backbone.View.extend({
  		el: '#library',
		template:_.template($('#formTemplate').html()),

		initialize:function () {
			console.log('BookView-initialize');
			this.model.bind("change", this.render, this);
		},
		events:{
			"change input":"change",
			"click .save":"saveBook",
			"click .delete":"deleteBook"
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		saveBook:function () {
			event.preventDefault();
      		event.stopPropagation();
			this.model.set({
		        title: this.$el.find('input[name=title]').val(),
		        author: this.$el.find('input[name=author]').val(),
		        description: this.$el.find('textarea[name=description]').val()
			});
			console.log(this.model, this.model.isNew());
			if (this.model.isNew()) {
				var self = this;
				console.log('add', this.model);
				// console.log(app.bookList);

				//如果用户之间访问路由#book/add, 用create方法时，会找不到collection ,建议不用
				// app.bookList.create(this.model, {
				// 	type: 'GET',
				// 	url: 'server/add.php',
				// 	data: $.param(this.model.toJSON()),
				// 	success:function () {
				// 		app.navigate('library/index', true);
				// 	}
				// });

				this.model.save(null, {
					type: 'GET',
					url: 'server/add.php',
					// data: 'id=' + _id,
					data: $.param(this.model.toJSON()),
					success:function(model,response){
						console.log('success', model, response);

						// window.location.hash = "library/index";
						app.navigate('library/index', true);
					},
					error:function(model, response){
						console.log('error', model, response);
					}
				});

			} else {
				console.log('edit');
				this.model.save(null, {
					type: 'GET',
					url: 'server/add.php',
					// data: 'id=' + _id,
					data: $.param(this.model.toJSON()),
					success:function(model,response){
						console.log('success', model, response);

						// window.location.hash = "library/index";
						// app.navigate('library/index', true);
						window.history.back();
					},
					error:function(model, response){
						console.log('error', model, response);
					}
				});

			}

			return false;
		},
		deleteBook: function() {

		},
		close: function() {
			this.$el.unbind();
			this.$el.empty();
		}
  	});


	//分页
	var Paginator = Backbone.View.extend({
		el: '#libraryPaginator',
		initialize:function (options) {
			console.log('Paginator-initialize');
			this.options = options;
			this.collection.bind('remove', this.render, this);
			this.collection.bind('reset', this.render, this);
			// this.render();
		},

		render:function () {
			console.log('Paginator-render');
			var items = this.collection.models;
			var len = items.length;
			var pageCount = Math.ceil(len / 2);

			$(this.el).html('<ul class="pagination pagination-lg"/>');

			for (var i=0; i < pageCount; i++) {
				this.$el.find("ul").append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#library/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
			}

			return this;
		}
	});

	
	//Router
	var BookRouter = Backbone.Router.extend({
		routes: {
			"": "list",
			"library/index": "list",
			"library/page/:page": "list",
			"book/add": "addBook",
			"book/:id": "bookDetails"
		},

		initialize: function () {
			console.log('BookRouter-initialize');
		},
		list: function(page) {
			console.log('list');
			if(this.bookList) {
				this.requestedId = null;
			}
			var self = this,
				p = page ? parseInt(page, 10) : 1;
			this.bookList = new BookCollection();
			
			this.bookList.fetch({
				data: {
					page: p,
					pageSize: 2
				},
				success: function() {
					self.bookListView = new BookListView({collection: self.bookList, page: p, pageSize: 2});
					self.bookListView.render().el;
					if (self.requestedId) self.bookDetails(self.requestedId);
				}
			});
		},
		bookDetails: function(id) {
			console.log('bookDetails', id);
			if(this.bookList) {
				this.book = this.bookList.get(id);

				// if(this.book) { //编辑数据部存在时
				// 	app.navigate('library/index', false);
				// 	return;
				// }

				if(this.bookView) {
					this.bookView.close();
				}
				this.bookView = new BookView({model: this.book});
				this.bookView.render().el;
			} else { //添加后的路由转向
				this.requestedId = id;
				this.list();
			}
		},
		addBook: function() {
			if(this.bookView) {
				this.bookView.close();
			}
			this.bookView = new BookView({model: new BookModel()});
			this.bookView.render().el;
		}
	});	

	window.app = new BookRouter();

	Backbone.history.start();


});