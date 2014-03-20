define(function(require, exports, module){
	var Backbone = require('backbone'),
		$ = require('jquery'),
  		_ = require('underscore'),
  		BookView = require('../views/book');

  	var LibraryView = Backbone.View.extend({
  		el: '#library',
		events: {
			'click #add': 'addBook'
		},
  		libraryTemplate: $( '#indexTemplate' ).html(),
		initialize: function(options) {
			console.log('LibraryView-initialize');
			this.collection = options.collection;
			// window.library = this.collection.toJSON();
			this.collection.bind('add', this.addOne, this);
			this.collection.bind('reset', this.addAll, this);

			//按标题排序
			this.collection.comparator = function(model) {
				return model.get("title");
			};

			// this.listenTo( this.collection, 'add', this.addOne );
			// this.listenTo( this.collection, 'reset', this.addAll );

			// this.collection.fetch();

			console.log(this.collection.toJSON());
			// console.log(JSON.stringify(this.collection.toJSON()));




			// var self = this;
			// this.collection.fetch({
			// 	url: 'server/list.php',
			// 	data: {page: 3},
			// 	success:function(collection,response){
			// 		self.reader();
			// 	// collection.each(function(data){
			// 	//     console.log('success:' + data.get('title'));
			// 	// })
			// 	},
			// 	error:function(collection, response){
			// 		console.log(collection);
			// 		console.log(response);
			// 		console.log('error');
			// 	}
			// });





			// this.collection.reset(
			// 	[
			// 		{
			// 			"title": "Example Note 1",
			// 			"id": "45",
			// 			"author": "David Morrow",
			// 			"description": "Pinterest biodiesel excepteur, ad etsy gluten-free semiotics ennui before they sold out irony ut deserunt jean shorts."
			// 		},
			// 		{
			// 			"title": "Example Note 2",
			// 			"id": "48",
			// 			"author": "David Morrow",
			// 			"description": "Fixie synth quinoa umami single-origin coffee master cleanse sartorial typewriter bushwick ennui readymade, lomo trust fund. Shoreditch direct trade fap cray high life swag, viral cred lo-fi locavore fingerstache wayfarers freegan."
			// 		},
			// 		{
			// 			"title": "Example Note 3",
			// 			"id": "52",
			// 			"author": "David Morrow",
			// 			"description": "You probably haven't heard of them keffiyeh lo-fi, yr bespoke selvage cray polaroid beard. Tofu messenger bag sustainable gastropub, gentrify lomo godard PBR echo park fap yr. Small batch truffaut swag forage tofu shoreditch street art helvetica. Hella helvetica fixie godard forage art party lo-fi."
			// 		}
			// 	]
			// );


			this.reader();
		},
		reader: function() {
			console.log('LibraryView-reader');
			this.$el.html(this.libraryTemplate);
			this.addAll();
      		return this;
		},

		addAll: function() {
			console.log('addAll', this.collection);
			this.$el.find('tbody').children().remove();
			_.each(this.collection.models, $.proxy(this, 'addOne'));
			// this.collection.each(function(item) {
			// 	console.log('addAll-item');
			// 	this.addOne(item);
			// }, this);
		},
		addOne: function(item) {
			console.log('addOne');
			var bookView = new BookView({
				collection: this.collection,
				model: item
			});
			this.$el.find("tbody").append(bookView.reader().el);
		}
  	});

  	module.exports = LibraryView;
});