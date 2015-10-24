/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    namespace.handlerParser = function(handlers) {
        this.handlers = [];
        if(handlers){
            this.setHandlers(handlers);
        }
    };
    
    namespace.handlerParser.prototype.setHandlers = function(handlers) {
        this.handlers = handlers;
        return this;
    };


    namespace.handlerParser.prototype.parse = function() {
        var worker = app.utils.getResolved(true);
        if(!this.handlers.length){
            return worker;
        }
        
        this.handlers.forEach(function(item) {
            var handlerName = item.name;
            if(!app.handler[handlerName]){
                console.error("app::handlerParser: Not found  handler "+handlerName);
                return true;
            }
            worker = worker.then(function(){
                var event = new app.handler[handlerName](item);
                return event.promise ? event.promise : true;
            });
        });
        
        worker.fail(function(){
            console.error(arguments);
        });


        return worker;
    };
    

    return namespace.handlerParser;
})(__ARGUMENT_LIST__);