/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    app.registerService(function() {
        namespace.console = console;
    });

    namespace.console = function(){

    };



    return namespace.console;
})(__ARGUMENT_LIST__);