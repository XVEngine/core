/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    app.registerService(function() {
        namespace.resolver = new namespace.resolver();
    });


    /**
     * 
     * @returns {undefined}
     */
    namespace.resolver = function() {
        this.resolvers = {};
    };




    /**
     * 
     * @returns {String}
     */
    namespace.resolver.prototype.create = function(id){
        this.resolvers[id] = Q.defer();
        return this.resolvers[id].promise;
    };



    /**
     *
     * @returns {String}
     */
    namespace.resolver.prototype.resolve = function(id){
        if(!this.resolvers[id]){
            return false;
        }

        this.resolvers[id].resolve();
        delete this.resolvers[id];
        return true;
    };

    /**
     *
     * @returns {String}
     */
    namespace.resolver.prototype.reject = function(id){
        if(!this.resolvers[id]){
            return false;
        }

        this.resolvers[id].reject();
        delete this.resolvers[id];
        return true;
    };

    
    return namespace.resolver;
})(__ARGUMENT_LIST__);