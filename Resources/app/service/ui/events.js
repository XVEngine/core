/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    app.registerService(function() {
        namespace.events = new namespace.events();
    });


    namespace.events = function() {
        this.runElementResizeEvent();
        this.runScrollEvent();
        this.onInsertEvent();
        this.onEscEvent();
    };

    namespace.events.prototype.runElementResizeEvent = function() {
        var self = this;
        var event = document.createEvent("HTMLEvents");


        var elements = null;
        var element = null;
        var currentSizes = null;
        var oldSizes = null;
        var i = 0;

        window.setInterval(function(){
            app.utils.requestAnimFrame(function(){
                elements = document.querySelectorAll('.event-resize');
                for (i = 0; i < elements.length; i++) {
                    element = elements[i];
                    oldSizes = element.__oldSizes;

                    currentSizes = {
                        width : element.offsetWidth,
                        height : element.offsetHeight
                    };
                    if(!(!oldSizes || !(oldSizes.width == currentSizes.width && oldSizes.height == currentSizes.height))){
                        continue;
                    }

                    element.__oldSizes = currentSizes;
                    element.dispatchEvent(new CustomEvent('event-resize'));
                }
            });
        }, 60);





    };
    
    
    namespace.events.prototype.runScrollEvent = function() {

        $(window).on("scroll", function(){
            var elements = document.querySelectorAll('.event-scroll');
            for (var i = 0; i < elements.length; i++) {
                elements[i].dispatchEvent(new CustomEvent('event-scroll'));
            }
        });
        
        $(window).on("beforeunload", function() {
            $("body").addClass("unload");
            var elements = document.querySelectorAll('.event-unload');
            for (var i = 0; i < elements.length; i++) {
                elements[i].dispatchEvent(new CustomEvent('event-unload'));
            }
        });
        
    };

    namespace.events.prototype.onEscEvent = function() {
        $(window).bind('keydown', 'esc', function(){
            $(".event-esc").trigger("event-esc");
        });

        $(window).bind('keydown', 'right', function(){
            $(".event-right").trigger("event-right");
        });

        $(window).bind('keydown', 'left', function(){
            $(".event-left").trigger("event-left");
        });

    };
    
    namespace.events.prototype.onInsertEvent = function() {
        var element = null, subEvents = null, x = null, i = null;

        var observerObject = new MutationObserver(function (mutationRecordsList) {
            mutationRecordsList.forEach(function (item) {
                for (i = 0; i < item.addedNodes.length; i++) {
                    element = item.addedNodes[i];
                    if(element.nodeType !== element.ELEMENT_NODE){
                        continue;
                    }

                    element.classList.contains("event-insert") && element.dispatchEvent(new CustomEvent('event-insert'));
                    element.hasAttribute("component") && element.component && element.component.trigger("onInsert"); //trigger event inside class of compoennt


                    subEvents = element.querySelectorAll('.event-insert');
                    for (x = 0; x < subEvents.length; ++x) {
                        subEvents[x].dispatchEvent(new CustomEvent('event-insert'));
                    }

                    subEvents = element.querySelectorAll('[component]');
                    for (x = 0; x < subEvents.length; ++x) {
                        subEvents[x].component && subEvents[x].component.trigger("onInsert");
                    }
                }
                
            });
        });
        observerObject.observe(globals.document, {
            childList: true,
            subtree: true
        });
    };




    return namespace.events;
})(__ARGUMENT_LIST__);