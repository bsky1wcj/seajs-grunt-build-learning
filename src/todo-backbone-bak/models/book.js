define(function(require, exports, module){
	var Backbone = require('backbone'),
		$ = require('jquery');

	var BookModel = Backbone.Model.extend({
		initialize: function(){
	        //初始化时绑定监听
	        this.bind("change",function(){
	            console.log('model');
	        });
	    },
		defaults: {
			id: 'Unknown',
			title: 'No title',
			author: 'Unknown',
			description: 'None'
		},

		  sync1: function( method , model , options ) {
		  	console.log(method , model , options);

		    if( method === 'create' || method === 'update' ) {

		      return $.ajax({
		        dataType : 'json',
		        url: 'server/add.php',
		        data: {
		          id: this.get('id') || '',
		          full_name: this.get('full_name') || '',
		          email: this.get('email') || '',
		          phone: this.get('phone') || '',
		          address: this.get('address') || ''
		        },
		        success: function( data ) {
		          $('span.false').html('');
		          if( data.success === true ) {
		            if( method === 'update' ) {
		              App.router.navigate('list', { trigger:true });
		            } else {
		              $('form').get(0).reset();
		            }
		          } else { // Error
		            $.each(data.validationError, function() {
		              $('span.' + this.target).html(this.error);
		            });
		          }
		          $('span.success').html( data.msg ).removeClass( 'false' ).addClass( data.success.toString() );
		        }
		      }); // end of ajax

		    } else if( method === 'delete' ) {
		      var id = this.get('id');

		      return $.getJSON('server/delete.php', { id: id }, function(data) {
		        if( data.success === true ) {
		        	// options.success();
		          //$('#contactTable tr[data-id="'+ id +'"]').hide('slow');
		        } else {
		          alert( data.msg );
		        }
		      }); // end of getJSON
		    }
		  } // end of sync


	});

	module.exports = BookModel;

});