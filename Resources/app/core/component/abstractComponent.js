(function(namespace, app, globals) {

    

    namespace.abstractComponent = app.newClass({});
    
    
    
    namespace.abstractComponent.prototype.__construct = function(options){
        this.$element = $("<div>");
        this.disableEvents(false);
        this.events = {};
        this.setID(options.id);
        this.setParams(options.params);
        this.setEventsList(options.events);
        this.initReplace();
        this.addClass(this.params.classes);
        this.setAttrs(this.params.attrs);
    };
    
    
    namespace.abstractComponent.prototype.setComponentName = function(name){
        this.$element.attr("component" , name);
        this.componentName = name;
        return this;
    };
    
    namespace.abstractComponent.prototype.getComponentName = function(){
        return this.componentName;
    };
    
    /**
     * 
     * @param {jQuery} $element
     * @returns {_L8.namespace.prototype}
     */
    namespace.abstractComponent.prototype.setElement = function($element) {
        this.$element = $element;
        return this;
    };
    
    /**
     * 
     * @param {jQuery} $element
     * @returns {_L8.namespace.prototype}
     */
    namespace.abstractComponent.prototype.getElement = function() {
        return this.$element;
    };

    /**
     * 
     * @param {jQuery} $element
     * @returns {_L8.namespace.prototype}
     */
    namespace.abstractComponent.prototype.initReplace = function() {
        this.$element = this.replaceWith();
        this.$element.attr({
            "id": this.getID(),
            "component" : "undefined"
        });
        this.$element.data("component", this);
        this.$element.get(0).component = this;
        return this;
    };
    
    
    /**
     * 
     * @returns {$}
     */
    namespace.abstractComponent.prototype.replaceWith = function() {
        return this.getTemplate();
    };
    /**
     * 
     * @returns {$}
     */
    namespace.abstractComponent.prototype.getTemplate = function() {
        return $("<div>");
    };


    
    /**
     * 
     * @param {jQuery} $element
     * @returns {_L8.namespace.prototype}
     */
    namespace.abstractComponent.prototype.setEventsList = function(eventsList) {
        var self = this;
        
        Object.keys(eventsList).forEach(function(eventName){
            var list = eventsList[eventName];
            
            list.forEach(function(event){
                self.on(eventName, event);
            });
        });
        
        return this;
    };

    /**
     * 
     * @returns {object}
     */
    namespace.abstractComponent.prototype.getDefaultParams = function() {
        return {
            classes : ""
        };
    };

    /**
     * 
     * @param {object} params
     * @returns {_L8.namespace.prototype}
     */
    namespace.abstractComponent.prototype.setParams = function(params) {
        this.params = $.extend(true, this.getDefaultParams(), params);
        return this;
    };


    namespace.abstractComponent.prototype.setID = function(id) {
        this.id = id;
        return this;
    };
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.abstractComponent.prototype.getID = function() {
        return this.id;
    };
    
    
    /**
     * 
     * @returns {Numbers}
     */
    namespace.abstractComponent.prototype.height = function() {
        return this.$element.height();
    };
    
    /**
     * 
     * @returns {Numbers}
     */
    namespace.abstractComponent.prototype.width = function() {
        return this.$element.width();
    };
    

    /**
     * 
     * @returns {undefined}
     */
    namespace.abstractComponent.prototype.init = function() {

    };
    

    /**
     * 
     * @returns {undefined}
     */
    namespace.abstractComponent.prototype.create = function() {
        this.init();
        this.trigger("onCreate");
    };
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.abstractComponent.prototype.onResize = function() {

    };
    
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.abstractComponent.prototype.exec = function(handlers) {
        var handlerParser = new app.handlerParser();
        handlerParser.setHandlers(handlers);
        return handlerParser.parse();
    };
    
    
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.abstractComponent.prototype.destroy = function() {

    };
    
    /**
     * 
     * @param {Boolean} value
     * @returns {abstractComponent_L8.namespace.abstractComponent.prototype}
     */
    namespace.abstractComponent.prototype.disableEvents = function(value) {
        (typeof value =="undefined") && (value = true);
        this._disableEvents = value;
        return this;
    };
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.abstractComponent.prototype.hide = function() {
        this.$element.addClass("dnone");
        return this;
    };
    
    /**
     * 
     * @returns {abstractComponent_L8.namespace.abstractComponent.prototype}
     */
    namespace.abstractComponent.prototype.show = function() {
        this.$element.removeClass("dnone");
        return this;
    };


    /**
     *
     * @param classes
     * @returns {namespace.abstractComponent}
     */
    namespace.abstractComponent.prototype.addClass = function(classes) {
        this.$element.addClass(classes);
        return this;
    };


    /**
     *
     * @param classes
     * @returns {namespace.abstractComponent}
     */
    namespace.abstractComponent.prototype.removeClass = function(classes) {
        this.$element.removeClass(classes);
        return this;
    };


    namespace.abstractComponent.prototype.alterClass = function(remove, add) {
        this.$element.alterClass(remove, add);
        return this;
    };

    /**
     * 
     * @param {type} attr
     * @param {type} value
     * @returns {abstractComponent_L8.namespace.abstractComponent.prototype}
     */
    namespace.abstractComponent.prototype.setAttrs = function(attrs) {
        if(!attrs){
            return this;
        }
        var self = this;
        Object.keys(attrs).forEach(function(key){
            self.setAttr(key, attrs[key]);
        });
        return this;
    };
    
    
    /**
     * 
     * @param {type} attr
     * @param {type} value
     * @returns {abstractComponent_L8.namespace.abstractComponent.prototype}
     */
    namespace.abstractComponent.prototype.setAttr = function(attr, value) {
        this.$element.attr(attr,  value);
        return this;
    };
    
    /**
     * 
     * @param {type} attr
     * @returns {abstractComponent_L8.namespace.abstractComponent.prototype@pro;$element@call;attr}
     */
    namespace.abstractComponent.prototype.getAttr = function(attr) {
        return this.$element.attr(attr);
    };

    /**
     * 
     * @param {string|null} eventName
     * @returns {abstractComponent_L8.namespace.abstractComponent.prototype}
     */
    namespace.abstractComponent.prototype.off = function(eventName) {
        if(!eventName){
            this.events = {};
            return this;
        }
        this.events[eventName] = [];
        return this;
    };

    /**
     * 
     * @param {string} eventName
     * @param {Array} handlers
     * @returns {abstractComponent_L8.namespace.abstractComponent.prototype}
     */
    namespace.abstractComponent.prototype.on = function(eventName, handlers) {
        if(! ( handlers instanceof Array)){
            handlers = [handlers]; 
        }
        if(!this.events[eventName]){
            this.events[eventName] = [];
        }
        
        for(var i in handlers){
            this.events[eventName].push(handlers[i]);
        };
        
        return this;
    };
    
    /**
     * 
     * @param {string} eventName
     * @returns {unresolved}
     */
    namespace.abstractComponent.prototype.trigger = function(eventName){
        if(this._disableEvents){
            return app.utils.getResolved();
        }
        
        var handlers = this.events[eventName];
        if(!handlers){
           handlers = []; 
        }
        
        var handlerParser = new app.handlerParser();
        handlerParser.setHandlers(handlers);
        return handlerParser.parse();
    };
    
    
    return namespace.abstractView;
})(__ARGUMENT_LIST__);