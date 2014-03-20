define(function(require) {
	var Backbone = require('backbone'),
		LibraryRouter = require('./routers/library'),
		LibraryCollection = require('./collections/library');

	var libraryCollection = LibraryCollection;
		libraryCollection.fetch();
		// libraryCollection.fetch({
		// 	// url: 'server/list.php',
		// 	data: {page: 3},
		// 	success:function(collection,response){
		// 		// self.reader();
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



		// libraryCollection.reset(
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



		libraryRouter = new LibraryRouter({collection: libraryCollection});

	Backbone.history.start();


});