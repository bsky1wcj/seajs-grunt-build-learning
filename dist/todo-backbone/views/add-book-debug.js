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
