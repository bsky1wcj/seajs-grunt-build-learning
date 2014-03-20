define("dist/todo-backbone/main-debug", [ "gallery/backbone/1.1.0/backbone-debug", "gallery/underscore/1.5.2/underscore-debug", "$-debug", "./routers/library-debug", "./collections/library-debug", "./models/book-debug", "./views/book-debug", "jquery/jquery/1.10.1/jquery-debug", "./views/library-debug", "./views/add-book-debug", "./views/edit-book-debug", "gallery/bootstrap/3.0.0/bootstrap-debug" ], function(require) {
    var Backbone = require("gallery/backbone/1.1.0/backbone-debug"), LibraryRouter = require("./routers/library-debug"), Bootstrap = require("gallery/bootstrap/3.0.0/bootstrap-debug");
    window.app = new LibraryRouter();
    Backbone.history.start();
});

define("dist/todo-backbone/routers/library-debug", [ "gallery/backbone/1.1.0/backbone-debug", "gallery/underscore/1.5.2/underscore-debug", "$-debug", "dist/todo-backbone/collections/library-debug", "dist/todo-backbone/models/book-debug", "dist/todo-backbone/views/book-debug", "jquery/jquery/1.10.1/jquery-debug", "dist/todo-backbone/views/library-debug", "dist/todo-backbone/views/add-book-debug", "dist/todo-backbone/views/edit-book-debug" ], function(require, exports, module) {
    var Backbone = require("gallery/backbone/1.1.0/backbone-debug"), LibraryCollection = require("dist/todo-backbone/collections/library-debug"), BookModel = require("dist/todo-backbone/models/book-debug"), BookView = require("dist/todo-backbone/views/book-debug"), LibraryView = require("dist/todo-backbone/views/library-debug"), AddBookView = require("dist/todo-backbone/views/add-book-debug"), EditBookView = require("dist/todo-backbone/views/edit-book-debug");
    var LibraryRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "library/index": "index",
            "book/add": "create",
            "book/:id/edit": "edit",
            "book/:id/view": "show"
        },
        initialize: function(options) {
            console.log("LibraryRouter-initialize");
        },
        create: function() {
            console.log("create");
            if (this.bookView) {
                this.bookView.close();
            }
            this.bookView = new AddBookView({
                collection: this.bookList,
                model: new BookModel()
            });
            this.bookView.render().el;
        },
        edit: function(id) {
            console.log("edit");
            if (this.bookList) {
                if (this.bookView) {
                    this.bookView.close();
                }
                this.bookView = new EditBookView({
                    model: this.bookList.get(id)
                });
                this.bookView.render().el;
            } else {
                this.requestedId = id;
                this.index();
            }
        },
        index: function() {
            console.log("index");
            if (this.bookList) {
                this.requestedId = null;
            }
            var self = this;
            this.bookList = LibraryCollection;
            this.bookList.fetch({
                success: function() {
                    self.libraryView = new LibraryView({
                        collection: self.bookList
                    });
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

define("dist/todo-backbone/collections/library-debug", [ "gallery/backbone/1.1.0/backbone-debug", "gallery/underscore/1.5.2/underscore-debug", "$-debug", "dist/todo-backbone/models/book-debug" ], function(require, exports, module) {
    var Backbone = require("gallery/backbone/1.1.0/backbone-debug"), BookModel = require("dist/todo-backbone/models/book-debug");
    var LibraryCollection = Backbone.Collection.extend({
        url: "server/list.php",
        model: BookModel,
        initialize: function() {
            console.log("LibraryCollection-initialize");
        }
    });
    module.exports = new LibraryCollection();
});

define("dist/todo-backbone/models/book-debug", [ "gallery/backbone/1.1.0/backbone-debug", "gallery/underscore/1.5.2/underscore-debug", "$-debug" ], function(require, exports, module) {
    var Backbone = require("gallery/backbone/1.1.0/backbone-debug"), _ = require("gallery/underscore/1.5.2/underscore-debug");
    var BookModel = Backbone.Model.extend({
        initialize: function() {
            console.log("BookModel-initialize");
        },
        defaults: {
            id: null,
            title: "",
            author: "",
            description: ""
        },
        validate: function(attrs) {
            console.log("BookModel-validate===============");
            var errors = {};
            if (attrs.title === "") {
                errors.title = "title 不能为空！";
            }
            if (attrs.author === "") {
                errors.author = "author 不能为空！";
            }
            if (attrs.description === "") {
                errors.description = "description 不能为空！";
            }
            if (!_.isEmpty(errors)) {
                return errors;
            }
        }
    });
    module.exports = BookModel;
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

define("dist/todo-backbone/views/library-debug", [ "gallery/backbone/1.1.0/backbone-debug", "gallery/underscore/1.5.2/underscore-debug", "$-debug", "jquery/jquery/1.10.1/jquery-debug", "dist/todo-backbone/views/book-debug" ], function(require, exports, module) {
    var Backbone = require("gallery/backbone/1.1.0/backbone-debug"), $ = require("jquery/jquery/1.10.1/jquery-debug"), _ = require("gallery/underscore/1.5.2/underscore-debug"), BookView = require("dist/todo-backbone/views/book-debug");
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

define("dist/todo-backbone/views/add-book-debug", [ "gallery/backbone/1.1.0/backbone-debug", "gallery/underscore/1.5.2/underscore-debug", "$-debug", "jquery/jquery/1.10.1/jquery-debug" ], function(require, exports, module) {
    var Backbone = require("gallery/backbone/1.1.0/backbone-debug"), // BookModel = require('../models/book'),
    $ = require("jquery/jquery/1.10.1/jquery-debug"), _ = require("gallery/underscore/1.5.2/underscore-debug");
    var AddBookView = Backbone.View.extend({
        el: "#library",
        className: "addBookContainer",
        template: $("#formTemplate").html(),
        events: {
            "click .save": "save"
        },
        initialize: function(options) {
            console.log("AddBookView-initialize");
            this.collection = options.collection;
            this.model = options.model;
            this.model.bind("invalid", this.showErrors, this);
        },
        showErrors: function(model, errors) {
            this.$el.find(".has-error").removeClass("has-error");
            this.$el.find(".alert").html(_.values(errors).join("<br>")).show();
            // highlight the fields with errors
            _.each(_.keys(errors), _.bind(function(key) {
                this.$el.find("*[name=" + key + "]").parent().addClass("has-error");
            }, this));
        },
        render: function() {
            //tmpl is a function that takes a JSON object and returns html
            var tmpl = _.template(this.template);
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            this.$el.html(tmpl(this.model.toJSON()));
            this.$el.find("h2").text("Create New Book");
            return this;
        },
        close: function() {
            this.$el.unbind();
            this.$el.empty();
        },
        //点击".save" 时销毁模型
        save: function(event) {
            var self = this, _id = this.model.get("id");
            event.preventDefault();
            event.stopPropagation();
            this.model.set({
                title: this.$el.find("input[name=title]").val(),
                author: this.$el.find("input[name=author]").val(),
                description: this.$el.find("textarea[name=description]").val()
            });
            // console.log(JSON.stringify(this.model));
            //save model
            this.model.save(null, {
                type: "GET",
                url: "server/add.php",
                // data: 'id=' + _id,
                data: $.param(this.model.toJSON()),
                success: function(model, response) {
                    // console.log('success', model,response);
                    self.collection.add(self.model);
                    window.location.hash = "library/index";
                },
                error: function(model, response) {
                    console.log("error", model, response);
                }
            });
        }
    });
    module.exports = AddBookView;
});

define("dist/todo-backbone/views/edit-book-debug", [ "gallery/backbone/1.1.0/backbone-debug", "gallery/underscore/1.5.2/underscore-debug", "$-debug", "jquery/jquery/1.10.1/jquery-debug" ], function(require, exports, module) {
    var Backbone = require("gallery/backbone/1.1.0/backbone-debug"), // BookModel = require('../models/book'),
    $ = require("jquery/jquery/1.10.1/jquery-debug"), _ = require("gallery/underscore/1.5.2/underscore-debug");
    var EditBookView = Backbone.View.extend({
        el: "#library",
        className: "editBookContainer",
        template: $("#formTemplate").html(),
        events: {
            "click .save": "save"
        },
        initialize: function(options) {
            console.log("EditBookView-initialize");
            this.model.bind("change", this.render, this);
            this.model.bind("invalid", this.showErrors, this);
        },
        showErrors: function(model, errors) {
            this.$el.find(".has-error").removeClass("has-error");
            this.$el.find(".alert").html(_.values(errors).join("<br>")).show();
            // highlight the fields with errors
            _.each(_.keys(errors), _.bind(function(key) {
                this.$el.find("*[name=" + key + "]").parent().addClass("has-error");
            }, this));
        },
        render: function() {
            //tmpl is a function that takes a JSON object and returns html
            var tmpl = _.template(this.template);
            //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            this.$el.html(tmpl(this.model.toJSON()));
            this.$el.find("h2").text("Edit Book");
            return this;
        },
        close: function() {
            this.$el.unbind();
            this.$el.empty();
        },
        //点击".save" 时销毁模型
        save: function(event) {
            console.log("save");
            var self = this, _id = this.model.get("id");
            event.preventDefault();
            event.stopPropagation();
            this.model.set({
                title: this.$el.find("input[name=title]").val(),
                author: this.$el.find("input[name=author]").val(),
                description: this.$el.find("textarea[name=description]").val(),
                id: _id
            });
            // this.model.save();
            // console.log(JSON.stringify(this.model));
            //save model
            this.model.save(null, {
                type: "GET",
                url: "server/add.php",
                // data: 'id=' + _id,
                data: $.param(this.model.toJSON()),
                success: function(model, response) {
                    console.log("success", model, response);
                    // Delete view
                    window.location.hash = "library/index";
                },
                error: function(model, response) {
                    console.log("error", model, response);
                }
            });
        }
    });
    module.exports = EditBookView;
});
