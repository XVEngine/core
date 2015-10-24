(function(namespace, app, globals) {

    namespace.multi = function(item) {
        this.item = item;
        this.promise = this.parseHandlers(item.handlers);
    };


    namespace.multi.prototype.parseHandlers = function(handlers){
        var handlerParser = new app.handlerParser();
        handlerParser.setHandlers(handlers);
        return handlerParser.parse();
    };
    

    return namespace.multi;
})(__ARGUMENT_LIST__);