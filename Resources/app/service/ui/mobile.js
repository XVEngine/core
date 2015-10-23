/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function (namespace, app, globals) {


    app.registerService(function () {
        namespace.mobile = new namespace.mobile();
    });


    namespace.mobile = function () {
        this.minWidth = 512;
        this.initEvents();
    };

    namespace.mobile.prototype.initEvents = function () {
        var self = this;

    };

    namespace.mobile.prototype.refresh = function () {


    };


    return namespace.mobile;
})(__ARGUMENT_LIST__);