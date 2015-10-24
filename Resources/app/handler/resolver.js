/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    namespace.resolver = function(item) {
        var resolved = app.service.utils.resolver.create(item.id);
        this.promise = this.parseHandler(item.handlers).then(function(){
            return resolved;
        });
    };



    namespace.resolver.prototype.parseHandler = function(handlers){
        if(!handlers){
            return app.utils.getResolved();
        }
        var handlerParser = new app.handlerParser();
        handlerParser.setHandlers(handlers);
        return handlerParser.parse();
    };

    return namespace.resolver;
})(__ARGUMENT_LIST__);