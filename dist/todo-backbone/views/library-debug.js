define("dist/todo-backbone/views/library-debug", [ "gallery/backbone/1.1.0/backbone-debug", "gallery/underscore/1.5.2/underscore-debug", "$-debug", "jquery/jquery/1.10.1/jquery-debug", "../views/book-debug" ], function(require, exports, module) {
    var Backbone = require("gallery/backbone/1.1.0/backbone-debug"), $ = require("jquery/jquery/1.10.1/jquery-debug"), _ = require("gallery/underscore/1.5.2/underscore-debug"), BookView = require("../views/book-debug");
    var LibraryView = Backbone.View.extend({
        el: "#library",
        events: {
            "click #add": "addBook"
        },
        libraryTemplate: $("#indexTemplate").html(),
        updateDebug: function() {
            $("#output").text(JSON.stringify(this.collection.toJSON(), null, 4));
        },
        initialize: function(options) {
            console.log("LibraryView-initialize");
            // this.collection = options.collection;
            // window.library = this.collection.toJSON();
            // this.collection.bind('add', this.addOne, this);
            this.collection.bind("reset", this.render, this);
            //debug
            this.collection.bind("all", this.updateDebug, this);
            //按标题排序
            this.collection.comparator = function(model) {
                return model.get("title");
            };
        },
        render: function() {
            console.log("LibraryView-render");
            this.$el.html(this.libraryTemplate);
            this.addAll();
            return this;
        },
        addAll: function() {
            console.log("addAll", this.collection);
            this.$el.find("tbody").children().remove();
            _.each(this.collection.models, $.proxy(this, "addOne"));
        },
        addOne: function(item) {
            console.log("addOne");
            var bookView = new BookView({
                collection: this.collection,
                model: item
            });
            this.$el.find("tbody").append(bookView.render().el);
        }
    });
    module.exports = LibraryView;
});

define("dist/todo-backbone/views/book-debug", [ "gallery/backbone/1.1.0/backbone-debug", "gallery/underscore/1.5.2/underscore-debug", "$-debug", "jquery/jquery/1.10.1/jquery-debug" ], function(require, exports, module) {
    var Backbone = require("gallery/backbone/1.1.0/backbone-debug"), $ = require("jquery/jquery/1.10.1/jquery-debug"), _ = require("gallery/underscore/1.5.2/underscore-debug");
    var BookView = Backbone.View.extend({
        tagName: "tr",
        className: "bookContainer",
        template: $("#rowTemplate").html(),
        events: {
            "click .delete": "destroy"
        },
        initialize: function(options) {
            console.log("BookView-initialize", options.model.id);
            this.collection = options.collection;
            this.model = options.model;
            _.bindAll(this, "render", "destroy");
        },
        render: function() {
            console.log("BookView-render");
            //tmpl is a function that takes a JSON object and returns html
            var tmpl = _.template(this.template);
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        },
        //点击".delete" 时销毁模型
        destroy: function(event) {
            var self = this, _id = this.model.get("id");
            event.preventDefault();
            event.stopPropagation();
            if (confirm("Are you sure?")) {
                //Delete model
                this.model.destroy({
                    type: "GET",
                    url: "server/delete.php",
                    // data: 'id=' + _id,
                    data: $.param({
                        id: _id
                    }),
                    success: function(model, response) {
                        console.log("success", model, response);
                        // Delete view
                        self.remove();
                    },
                    error: function(model, response) {
                        console.log("error", model, response);
                    }
                });
            }
        }
    });
    module.exports = BookView;
});
