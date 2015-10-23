/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    app.registerService(function() {
        namespace.css = new namespace.css();
    }, -10);


    /**
     * 
     * @returns {undefined}
     */
    namespace.css = function() {
        this.rules = {};
        this.createElement();
    };

    namespace.css.prototype.createElement = function () {
        this.$style = $("<style>");
        this.$style.attr({
            "class" : "css-service",
            "type" : "text/css"
        });

        $("html head").append(this.$style);

        return this;
    };

    namespace.css.prototype.addRule = function (rule, def) {
        this.rules[rule] = def;
        this.refresh();
        return this;
    };

    namespace.css.prototype.removeRule = function (rule) {
        if(this.rules[rule]){
            delete this.rules[rule];
        }
        this.refresh();
        return this;
    };

    namespace.css.prototype.refresh = function () {
        var self = this;
        var css = "";
        Object.keys(this.rules).forEach(function (rule) {
            var ob = self.rules[rule];
            var def = "";
            Object.keys(ob).forEach(function(name){
                def += name+":"+ob[name]+";";
            });
            css += rule + " { " + def + " }"
        });
        this.$style.html(css);
        return this;
    };



    return namespace.css;
})(__ARGUMENT_LIST__);