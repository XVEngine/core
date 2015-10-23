/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    app.registerService(function() {
        namespace.jss = new namespace.jss
    });


    /**
     * 
     * @returns {undefined}
     */
    namespace.jss = function() {
        this.rules = {};
        this.createElement();
        this.lastStyle = "";
        this.run();
    };

    namespace.jss.prototype.createElement = function () {
        this.$style = $("<style>");
        this.$style.attr({
            "class" : "jss-service",
            "type" : "text/css"
        });

        $("html head").append(this.$style);
        return this;
    };

    namespace.jss.prototype.run = function () {
        var self = this;

        window.setInterval(function(){
            self.refresh();
        }, 250);

        /*
        app.utils.requestAnimFrame(function(){
            self.refresh();
            self.run();
        });*/
        return this;
    };

    namespace.jss.prototype.addRule = function (rule, def) {
        this.rules[rule] = def;
        this.refresh();
        return this;
    };

    namespace.jss.prototype.removeRule = function (rule) {
        if(this.rules[rule]){
            delete this.rules[rule];
        }
        this.refresh();
        return this;
    };

    namespace.jss.prototype.parseArgument = function(argument){
        return eval(argument);
    };


    namespace.jss.prototype.refresh = function () {
        var self = this;
        var css = "";
        Object.keys(this.rules).forEach(function (rule) {
            var ob = self.rules[rule];
            var def = "";
            Object.keys(ob).forEach(function(name){
                def += name+":"+self.parseArgument(ob[name])+";";
            });
            css += rule + " { " + def + " }"
        });
        if(this.lastStyle === css){
            return this;
        }
        this.lastStyle = css;
        this.$style.html(css);
        return this;
    };

    return namespace.jss;
})(__ARGUMENT_LIST__);