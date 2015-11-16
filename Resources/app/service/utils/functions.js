/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    app.registerService(function() {
        namespace.functions = new namespace.functions();
    });


    /**
     * 
     * @returns {undefined}
     */
    namespace.functions = function() {
    };




    namespace.functions.prototype.renderString = function(string, data){
        return app.service.utils.argumentsParser.parse(data).then(function(newData){
            return app.utils.renderString(string, newData);
        });
    };


    namespace.functions.prototype.evaluate = function(functionString, d){
        return app.service.utils.argumentsParser.parse(d).then(function(newData){
            return (new Function('data', 'app', functionString))(newData, app);
        });
    };


    namespace.functions.prototype.parseJson = function(str){
        if(!this._jsonParser){
            this._initJsonParser();
        }
        return this._jsonParser(str);
    };


    namespace.functions.prototype._initJsonParser = function(){
        if(!window.Response){
            this._jsonParser = function(str){
                return Q.fcall(function () {
                    return JSON.parse( str );
                });
            };

            return;
        }


        this._jsonParser = function(str){
            return Q.fcall(function(){
                return (new Response(str)).json();
            });
        };
    };


    namespace.functions.prototype.renderComponent = function(component){
        return app.utils.buildComponent(component);
    };

    return namespace.functions;
})(__ARGUMENT_LIST__);