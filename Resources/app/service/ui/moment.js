/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function (namespace, app, globals) {



    app.registerService(function () {
        namespace.moment = new namespace.moment();
    });


    namespace.moment = function () {
        this.init();


        globals.moment.locale('en', {
            relativeTime : {
                future: "%s left",
                past:   "%s ago",
                s:  "seconds",
                m:  "a minute",
                mm: "%d minutes",
                h:  "an hour",
                hh: "%d hours",
                d:  "a day",
                dd: "%d days",
                M:  "a month",
                MM: "%d months",
                y:  "a year",
                yy: "%d years"
            }
        });


    };

    namespace.moment.prototype.init = function () {
        var self = this;
        this.intercal = globals.setInterval(function(){
            self.refresh();
        }, 5*1000);
        this.bindEvents();
    };

    namespace.moment.prototype.refresh = function () {
        var elements = document.querySelectorAll('moment, time');
        for (var x = 0; x < elements.length; ++x) {
            this.refreshItem($(elements[x]));
        }
    };

    namespace.moment.prototype.refreshItem = function ($element) {
        var momentDate = $element.data("date");
        if(!momentDate){
            var orgDate = $element.text();
            $element.attr("datetime" , orgDate);
            momentDate = globals.moment(orgDate);
            $element.data("date", momentDate);

            $element.attr("title", momentDate.format('YYYY-MM-DD HH:mm:ss'));
            $element.addClass("loaded");
        }
        var newText = momentDate.fromNow();
        if($element.data("lastText") == newText){
            return;
        }

        $element.data("lastText", newText);
        $element.text(newText);
    };

 
    namespace.moment.prototype.bindEvents = function () {
        
        var self = this;
        var element = null, subElements = null;

        var observerObject = new MutationObserver(function (mutationRecordsList) {
            mutationRecordsList.forEach(function (item) {
                for (var i = 0; i < item.addedNodes.length; i++) {
                    element = item.addedNodes[i];
                    if(element.nodeType !== element.ELEMENT_NODE){
                        continue;
                    }

                    subElements = element.querySelectorAll('moment, time');
                    for (var x = 0; x < subElements.length; x++) {
                        self.refreshItem($(subElements[x]));
                    }
                }
            });
        });
        
        observerObject.observe(globals.document, {
            childList: true,
            subtree: true,
            attributes : false
        });
    };
    

    return namespace.moment;
})(__ARGUMENT_LIST__);