/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    namespace.protocols = {};

 
    
    
    /**
     * 
     * Simple selector:
     * component://componentID
     * service://servicePath
     */
    namespace.protocols.service = function(selector) {
        try {
            var service = eval('app.services.'+selector);
        }
        catch(e){
            return false;
        }
        return [service];
    };
    
    
    /**
     * 
     * Simple selector:
     * component://componentID
     * service://servicePath
     */
    namespace.protocols.component = function(selector) {
        var $searchArea = app.utils.getComponentsAreas();
        var $components = $searchArea.find("#"+selector);
        var items = [];
        $components.each(function(){
            var $this = $(this);
            var component = $this.data("component");
            if(component){
                items.push(component);
            }
        });
        
        return items;
    };


    /**
     *
     * Simple selector:
     * component://componentID
     * service://servicePath
     */
    namespace.protocols.all = function(selector) {
        var $searchArea = app.utils.getComponentsAreas();

        var $components = $searchArea.find("[id='"+selector+"']");
        var items = [];
        $components.each(function(){
            var $this = $(this);
            var component = $this.data("component");
            if(component){
                items.push(component);
            }
        });

        return items;
    };



    /**
     *
     * Simple selector:
     * selector://cssSelector
     */
    namespace.protocols.selector = function(selector) {
        var $searchArea = app.utils.getComponentsAreas();
        var $components = $searchArea.find(selector);
        var items = [];
        $components.each(function(){
            var $this = $(this);
            var component = $this.data("component");
            if(component){
                items.push(component);
            }
        });

        return items;
    };
    
    
    
    /**
     * 
     * Simple selector:
     * component://componentID
     * service://servicePath
     */
    namespace.protocols.getAll = function(selector) {
        var regexp = /^([a-zA-Z0-9]*)\:\/\/(.*)/gi;
        var match = regexp.exec(selector);
        if(!match){
            return namespace.protocols.component(selector);
        }
        var protocol = match[1];
        if(protocol == "get"){
            return [];
        }
        
        if(typeof namespace.protocols[protocol] === "undefined"){
            return [];
        }
        
        return namespace.protocols[protocol](match[2]);
    };
    
    
    
    /**
     * 
     * Simple selector:
     * component://componentID
     * service://servicePath
     */
    namespace.protocols.get = function(selector) {
        var items = this.getAll(selector);
        return items[0]|| null;
    };
    
    
    
    
    return namespace.protocols;
})(__ARGUMENT_LIST__);