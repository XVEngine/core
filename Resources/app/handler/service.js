(function(namespace, app, globals) {

    namespace.service = function(item) {
        var services = app.protocols.service(item.serviceName);
        if(!services.length){
            console.error("app::handlers:service: Not found service " + item.serviceName);
            return;
        }
        this.service = services[0];
        this.promise = this.exec(item.call);
    };

    /**
     * 
     * @param {type} callList
     * @returns {Number.service.prototype.exec.worker}
     */
    namespace.service.prototype.exec = function(callList) {
        var self  = this;
        var worker = app.utils.getResolved(true);


        callList.forEach(function(item){
            if(!self.service[item.method]){
                console.error("app::handlers:service: Not found method " + item.method + " in "+item.serviceName);
                return;
            }
            worker = worker.then(function(){
                return app.utils.parseArguments(item.arguments);
            }).then(function(result){
                return self.service[item.method].apply(self.service, result);
            });
        });
        worker.fail(function () {
            console.error(arguments);
        });
        return worker;
    };
    
    return namespace.service;
})(__ARGUMENT_LIST__);