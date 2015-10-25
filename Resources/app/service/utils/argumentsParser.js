/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    app.registerService(function() {
        namespace.argumentsParser = new namespace.argumentsParser();
    });


    /**
     * 
     * @returns {undefined}
     */
    namespace.argumentsParser = function() {
    };




    namespace.argumentsParser.prototype.parse = function(obj){

        var newObj = {};
        var deferred = Q.defer();

        var worker = app.utils.getResolved();

        Object.keys(obj).forEach(function(key){
            worker = worker.then(function(){
                return app.utils.getValue(obj[key]);
            }).then(function(result){
                newObj[key] = result;
                return true;
            });
        });

        worker = worker.then(function(){
            deferred.resolve(newObj);
            return true;
        });

        return deferred.promise;
    };


    namespace.argumentsParser.prototype.createAssocArray = function(selector, method, value){
        var result = {};
        var worker = app.utils.getResolved();

        app.protocols.getAll(selector).forEach(function(item){
            var keyName = null;
            worker = worker.then(function(){
                return item[method.method].apply(item, app.utils.ifsetor(method.arguments, []));
            }).then(function(key){
                keyName = key;

                return item[value.method].apply(item,  app.utils.ifsetor(value.arguments, []));
            }).then(function (val) {
                result[keyName] = val;
                return true;
            });

        });

        return worker.then(function(){
            return result;
        });
    };

    return namespace.trackPage;
})(__ARGUMENT_LIST__);