define("dist/backbone-paginator/main",["gallery/backbone/1.1.0/backbone","gallery/underscore/1.5.2/underscore","$","willkan/backbone-localStorage/1.1.6/backbone.localStorage","jquery/jquery/1.10.1/jquery"],function(a){var b=a("gallery/backbone/1.1.0/backbone"),c=a("willkan/backbone-localStorage/1.1.6/backbone.localStorage"),d=a("jquery/jquery/1.10.1/jquery"),e=a("gallery/underscore/1.5.2/underscore"),f=b.Model.extend({initialize:function(){console.log("BookModel-initialize")},defaults:{id:null,title:"",author:"",description:""}}),g=b.Collection.extend({localStorage:new c("books-backbone"),model:f,initialize:function(){console.log("BookCollection-initialize")}}),h=b.View.extend({el:"#library",events:{"click #add":"addBook"},updateDebug:function(){d("#output").text(JSON.stringify(this.collection.toJSON(),null,4))},initialize:function(a){console.log("BookListView-initialize",a.page),this.collection.bind("reset",this.render,this),this.collection.bind("all",this.updateDebug,this);this.options=a,this.pageSize=a.pageSize,this.len=this.collection.models.length,this.startPos=(a.page-1)*this.pageSize,this.endPos=Math.min(this.startPos+this.pageSize,this.len)},render:function(){return console.log("BookListView-render",this.options),this.$el.html(d("#indexTemplate").html()),this.addAll(),new k({collection:this.collection,page:this.options.page,pageSize:this.options.pageSize}).render().el,this},addAll:function(){console.log("addAll"),this.$el.find("tbody").children().remove();for(var a=this.startPos;a<this.endPos;a++)this.addOne(this.collection.models[a])},addOne:function(a){console.log("addOne");var b=new i({model:a});this.$el.find("tbody").append(b.render().el)},addBook:function(){}}),i=b.View.extend({tagName:"tr",className:"book-list-item",template:e.template(d("#rowTemplate").html()),events:{"click .delete":"deleteBook"},initialize:function(){console.log("BookListItemView-initialize"),this.model.bind("change",this.render,this)},render:function(){return this.$el.html(this.template(this.model.toJSON())),this},deleteBook:function(a){{var b=this;this.model.id}a.preventDefault(),a.stopPropagation(),confirm("Are you sure?")&&this.model.destroy({success:function(a,c){console.log("success",a,c),b.close()},error:function(a,b){console.log("error",a,b)}})},close:function(){d(this.el).unbind(),d(this.el).remove()}}),j=b.View.extend({el:"#library",template:e.template(d("#formTemplate").html()),initialize:function(){console.log("BookView-initialize"),this.model.bind("change",this.render,this)},events:{"change input":"change","click .save":"saveBook","click .delete":"deleteBook"},render:function(){return this.$el.html(this.template(this.model.toJSON())),this},saveBook:function(){if(event.preventDefault(),event.stopPropagation(),this.model.set({title:this.$el.find("input[name=title]").val(),author:this.$el.find("input[name=author]").val(),description:this.$el.find("textarea[name=description]").val()}),console.log(this.model,this.model.isNew()),this.model.isNew()){console.log("add",this.model),app.bookList.create(this.model),app.navigate("library/index",!0)}else console.log("edit"),this.model.save(),window.history.back();return!1},deleteBook:function(){},close:function(){this.$el.unbind(),this.$el.empty()}}),k=b.View.extend({el:"#libraryPaginator",initialize:function(a){this.options=a,this.collection.bind("reset",this.render,this),this.render()},render:function(){var a=this.collection.models,b=a.length,c=Math.ceil(b/this.options.pageSize);d(this.el).html('<ul class="pagination pagination-lg"/>');for(var e=0;c>e;e++)this.$el.find("ul").append("<li"+(e+1===this.options.page?" class='active'":"")+"><a href='#library/page/"+(e+1)+"'>"+(e+1)+"</a></li>");return this}}),l=b.Router.extend({routes:{"":"list","library/index":"list","library/page/:page":"list","book/add":"addBook","book/:id":"bookDetails"},initialize:function(){console.log("BookRouter-initialize")},list:function(a){console.log("list"),this.bookList&&(this.requestedId=null);var b=this,c=a?parseInt(a,10):1;this.bookList=new g,this.bookList.fetch({success:function(){b.bookListView=new h({collection:b.bookList,page:c,pageSize:2}),b.bookListView.render().el,b.requestedId&&b.bookDetails(b.requestedId)}})},bookDetails:function(a){console.log("bookDetails",a),this.bookList?(this.book=this.bookList.get(a),this.bookView&&this.bookView.close(),this.bookView=new j({model:this.book}),this.bookView.render().el):(this.requestedId=a,this.list())},addBook:function(){this.bookView&&this.bookView.close(),this.bookView=new j({model:new f}),this.bookView.render().el}});window.app=new l,b.history.start()});