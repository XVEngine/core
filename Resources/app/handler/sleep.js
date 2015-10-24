(function(namespace, app, globals) {

    namespace.sleep = function(item) {
        this.item = item;
        this.promise = this.start();
    };
    
    namespace.sleep.prototype.start = function(){
        var deferred = Q.defer();
        setTimeout(function(){
            deferred.resolve();
        }, this.item.timeout);
        return deferred.promise;
    };
    

    return namespace.sleep;
})(__ARGUMENT_LIST__);