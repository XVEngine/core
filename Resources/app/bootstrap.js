/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function (namespace, app, globals) {

    namespace.bootstrap = function (handlers) {
        this.handlers = handlers;
        app.services.bootstrap = this;
    };

    namespace.bootstrap.prototype.config = {};

    namespace.bootstrap.prototype.init = function () {
        this.initApplicationDomStructure();
        this.initServices();
        this.bindEvents();
        this.onLoadEvent();
    };


    /**
     *
     * @param nodeList
     */
    namespace.bootstrap.prototype.destroyComponents = function (nodeList) {
        var element = null, subComponents = null, e = null;
        for (var i = 0; i < nodeList.length; i++) {
            element = nodeList[i];
            if(element.nodeType !== element.ELEMENT_NODE){
                continue;
            }

            element.hasAttribute("component") &&
            element.component &&
            element.component.trigger("onDestroy") && //this method "trigger" must always pass positive result
            element.component.destroy &&
            element.component.destroy(this);

            subComponents = element.querySelectorAll('[component]');
            for (var x = 0; x < subComponents.length; ++x) {
                (e = subComponents[x].component) &&
                e.trigger("onDestroy") &&
                e.destroy &&
                e.destroy(this);
            }

        }
    };

    /**
     * 
     * @returns {undefined}
     */
    namespace.bootstrap.prototype.bindEvents = function () {
        var self = this;
        var observerObject = new MutationObserver(function (mutationRecordsList) {
            mutationRecordsList.forEach(function (item) {
                self.destroyComponents(item.removedNodes);
            });
        });
        observerObject.observe(globals.document, {
            childList: true,
            subtree: true
        });


    };
    /**
     * 
     * @returns {undefined}
     */
    namespace.bootstrap.prototype.initServices = function () {
        app.servicesInitList.sort(function(a, b){return a.priority-b.priority;}); //sort by priority
        app.servicesInitList.forEach(function(serviceClass){
            serviceClass.init();
        });
    };
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.bootstrap.prototype.initApplicationDomStructure = function () {
        
        var structure = app.utils.getString(function() {
            /**<string>
                <application>
                        <services>
                                <loading></loading>
                        </services>
                </application>
             </string>*/
        });
        
        $("body").html(structure);
    };
    

    /**
     * 
     * @returns {undefined}
     */
    namespace.bootstrap.prototype.onLoadEvent = function () {
        var handlerParser = new app.handlerParser();
        handlerParser.setHandlers(this.handlers);
        delete this.handlers;
        return handlerParser.parse();
    };
    


    return namespace.bootstrap;
})(__ARGUMENT_LIST__);