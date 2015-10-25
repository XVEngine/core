/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function (namespace, app, globals) {

    app.registerService(function () {
        namespace.request = new namespace.request();
    });




    namespace.request = function () {
        this.headers = {};
    };


    namespace.request.prototype.setHeader = function (key, value) {
        this.headers[key] = value;
        return this;
    };

    namespace.request.prototype.getHeader = function (key) {
        return this.headers[key];
    };



    namespace.request.prototype.clearHeader = function (reg) {
        var self = this;
        var re = new RegExp(reg, "i");
        Object.keys(this.headers).forEach(function(key){
            if(!re.test(key)){
                return true;
            }
            delete self.headers[key];
            return true;
        });

        return this;
    };




    namespace.request.prototype.create = function (url) {
        var self = this;
        var request = new app.core.request(url);
        Object.keys(this.headers).forEach(function(key){
            request.addHeader(key, self.headers[key]);
        });
        return request;
    };


    return namespace.history;
})(__ARGUMENT_LIST__);