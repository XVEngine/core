/**
 * Bootstrap class

 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {
    
    namespace.history = function(item) {
        this.execute(item.operations);
    };


    namespace.history.prototype.execute = function(operations) {
        
        operations.forEach(function(operation){
            if(!app.service.history[operation.method]){
                console.log("Not found method " , operation.method);
                return;
            }
            app.service.history[operation.method].apply(app.services.history, operation.arguments);
            
        });

    };
    
    return namespace.page;
})(__ARGUMENT_LIST__);