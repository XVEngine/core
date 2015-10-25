/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {


    namespace.events = function() {
    };


    namespace.events.prototype._events = {};


    namespace.events.prototype.on = function (eventName, handlers) {
        var self  = this;
        if(! ( handlers instanceof Array)){
            handlers = [handlers];
        }

        if(typeof this._events[eventName] === "undefined"){
            this._events[eventName] = [];
        }

        handlers.forEach(function(handler){
            self._events[eventName].push(handler);
        });
        return this;
    };


    /**
     *
     * @param eventName
     * @param data
     * @returns {*}
     */
    namespace.events.prototype.trigger = function (eventName, data) {
        if(!this._events[eventName]){
            this._events[eventName] = [];
        }

        var handlerParser = new app.handlerParser();
        handlerParser.setHandlers(this._events[eventName]);
        return handlerParser.parse();
    };

    /**
     *
     * @param eventName
     * @returns {namespace.events}
     */
    namespace.events.prototype.off = function (eventName) {
        var self = this;
        if(!eventName){
            Object.keys(this._events).forEach(function(key){
                self._events[key] = [];
            });
            return this;
        }

        if(this._events[eventName]){
            this._events[eventName] = [];
        }
        return this;
    };




    return namespace.events;
})(__ARGUMENT_LIST__);