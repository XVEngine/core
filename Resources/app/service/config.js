(function (namespace, app, globals) {

    app.registerService(function () {
        namespace.config = new namespace.config();
    }, -1000);




    namespace.config = function () {
        this.configRaw = app.service.bootstrap.config;
    };


    namespace.config.prototype.get = function (path) {
        if (!path) {
            return this.configRaw;
        }

        var keys = path.split(".");
        var lastVal = this.configRaw;
        for (var i in keys) {
            var key = keys[i];
            if (typeof lastVal === "undefined") {
                return null;
            }
            lastVal = lastVal[key];
        }
        return lastVal;
    };

    return namespace.config;

})(__ARGUMENT_LIST__);