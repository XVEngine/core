/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    namespace.action = function(item) {
        var self = this;
        var worker = app.utils.getResolved(true);
        this.components = app.protocols.getAll(item.component);

        if(!this.components.length && !item.ignoreNotFound){
            console.error("app::handlers:action: Not found any item " + item.component);
        }

        
        this.components.forEach(function(component){
            worker = worker.then(function(){
                return self.exec(component, item.call);
            });
        });


        worker = worker.fail(function(){
            console.error(arguments);
        });

        this.promise = worker;
    };



    namespace.action.prototype.exec = function(component, callList) {
        var self  = this;
        var worker = app.utils.getResolved(true);
        callList.forEach(function(item){
            if(!component[item.method]){
                console.error("app::handlers:action: Not found method " + item.method + " in ", component);
                return;
            }
            
            worker = worker.then(function(){
                return app.utils.parseArguments(item.arguments);
            }).then(function(){
                return component[item.method].apply(component, arguments[0]);
            });
        });
        return worker;
    };
    

    return namespace.action;
})(__ARGUMENT_LIST__);