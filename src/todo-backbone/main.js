define(function(require) {
	var Backbone = require('backbone'),
		LibraryRouter = require('./routers/library'),
		Bootstrap = require('bootstrap'); 	
	window.app = new LibraryRouter();

	Backbone.history.start();


});