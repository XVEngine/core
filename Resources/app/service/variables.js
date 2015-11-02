(function (namespace, app, globals) {

    app.registerService(function () {
        namespace.variables = new namespace.variables();
    });




    namespace.variables = function () {
        this.clear();
    };


    namespace.variables.prototype.get = function (name) {
        return this.data[name]
    };

    namespace.variables.prototype.set = function (name, value) {
        this.data[name] = value;
        return this;
    };


    namespace.variables.prototype.clear = function () {
        this.data = {};
        return this;
    };

    return namespace.variables;

})(__ARGUMENT_LIST__);