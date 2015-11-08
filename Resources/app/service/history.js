(function (namespace, app, globals) {

    app.registerService(function () {
        namespace.history = new namespace.history();
    });




    namespace.history = function () {
        this._nextID = 1;
        this._customBackHandler = null;
        this.state = globals.history;
        this.$title = $("head title");
        this.stack = [];
        this.bindEvents();
        this._disabledPrev = false;
    };


    /**
     *
     * @returns {number}
     */
    namespace.history.prototype.generateId = function () {
        return this._nextID++;
    };


    /**
     *
     * @returns {number}
     */
    namespace.history.prototype.getLastGeneratedId = function () {
        return this._nextID;
    };


    /**
     *
     * @param {boolean} val
     * @returns {namespace.history}
     */
    namespace.history.prototype.disablePrev = function (val) {
        this._disabledPrev = app.utils.ifsetor(val, true);
        return this;
    };


    /**
     * Set title of page
     * @param {String} title
     * @returns {namespace.history}
     */
    namespace.history.prototype.setTitle = function (title) {
        this.$title.text(title);
        return this;
    };


    /**
     * Add url to history
     * @param  {String} title
     * @param  {String} path
     * @param  {String} tag
     * @returns {namespace.history}
     */
    namespace.history.prototype.push = function (title, path, tag) {
        this.setCustomBack(null);
        var id = this.generateId();
        var data = {
            "id" : id,
            "method" : "stack",
            "tag" : app.utils.ifsetor(tag, null)
        };

        var self = this;
        return Q.fcall(function(){
            return app.utils.getValue(title);
        }).then(function(t) {
            data.title = t;
            return app.utils.getValue(path);
        }).then(function(p){
            data.path  = p;

            self.setTitle(data.title);
            self.state.pushState({
                "id" : id
            }, data.title, data.path);
            return true;
        });
    };

    /**
     * Replace url to history
     * @param  {String} title
     * @param  {String} path
     * @param  {String} tag
     * @returns {namespace.history}
     */
    namespace.history.prototype.replace = function (title, path, tag) {
        this.setCustomBack(null);
        var id = this.generateId();
        var data = {
            "id" : id,
            "method" : "replace",
            "tag" : app.utils.ifsetor(tag, null)
        };

        var self = this;

        return Q.fcall(function(){
            return app.utils.getValue(title);
        }).then(function(t) {
            data.title = t;
            return app.utils.getValue(path);
        }).then(function(p){
            data.path  = p;
            self.setTitle(data.title);
            self.state.replaceState({
                "id" : id
            }, data.title, data.path);
            return true;
        });
    };

    /**
     * Add or replace url to history
     * @param  {String} title
     * @param  {String} path
     * @param  {String} tag
     * @returns {namespace.history}
     */
    namespace.history.prototype.pushOrReplace = function (title, path, tag) {
        var lastElement = this.stack.slice(-1)[0];
        if(lastElement && lastElement.tag == tag ){
            this.stack.pop();
            return this.replace(title, path, tag);
        }
        return this.push(title, path, tag);
    };


    namespace.history.prototype.setCustomBack = function (handler) {
        this._customBackHandler = handler;

        return this;
    };




    
    namespace.history.prototype.back = function () {
        this.state.back();
        return this;
    };
    
    
    namespace.history.prototype.on = function (eventName, handler) {
        return this.stack;
    };
    
    
    namespace.history.prototype.getStack = function () {
        return this.stack;
    };


    /**
     *
     * @returns {namespace.history}
     */
    namespace.history.prototype.pop = function (tag) {
        if(tag){
            var currentStack = this.stack[this.stack.length - 1];
            if(!currentStack || currentStack.tag != tag){
                return this;
            }
        }

        this.stack.pop(); //remove current route
        var last = this.stack.pop();

        if(!last){
            return this;
        }

        this.replace(last.title, last.path);
        return this;
    };


    namespace.history.prototype.bindEvents = function () {
        var self = this;
        var lastXHR = null;
        globals.onpopstate = function (event) {

            if(event.state === null){
                return false;
            }

            if(self._disabledPrev){
                var lastState = self.stack[self.stack.length-1];
                self.state.pushState({
                    "id" : lastState.id
                }, lastState.title, lastState.path);

                return false;
            }

            if(self._customBackHandler){
                var handlerParser = new app.handlerParser();
                handlerParser.setHandlers([self._customBackHandler]);
                self.setCustomBack(null);
                return handlerParser.parse();
            }


            if(lastXHR){
                //lastXHR.abort();
            }
            console.log(event);

            var request = app.service.request.create(globals.document.location);
            request.addHeader("X-XV-History-Request", 1);
            request.run();
            lastXHR = request.getXHR();
        };
    };




    return namespace.history;
})(__ARGUMENT_LIST__);