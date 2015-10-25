/**
 *
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function (namespace, app, globals) {


    app.registerService(function () {
        namespace.ajax = new namespace.ajax();
    });


    namespace.ajax = function () {
        this.bindEvents();
        this.beforeHandler = null;
    };


    namespace.ajax.prototype.bindEvents = function () {
        var self = this;
        var $application = $("application");


        $application.on("click", ".xv-request", function (e) {
            var $this = $(this);
            var currThis = this;


            if(e.target.tagName === "X-A"){ //link insie link
                $this = $("<a>").attr("href", e.target.getAttribute("href"));
                currThis = $this[0];
            }


            var url = $this.attr("href");
            self.doRequest(url);
            return false;
        });


        $application.on("click", ".xv-request-reload", function () {

            var url = $(this).attr('href');
            self.doReloadRequest(url);
            return false;
        });
    };



    namespace.ajax.prototype.doRequest = function (url, options) {
        var self = this;
        return self.resolve().then(function () {
            return self.createRequest(url)
                .setOptions(options || {})
                .addHeader("X-XV-Source", "service.ui.ajax")
                .run();
        });
    };


    namespace.ajax.prototype.doReloadRequest = function (url) {
        var self = this;
        return self.resolve().then(function () {
            return self.createRequest(url)
                .addHeader("X-XV-First-Request", 1)
                .addHeader("X-XV-Source", "bootstrap")
                .run();
        });
    };


    /**
     *
     * @param url
     * @returns {url}
     */
    namespace.ajax.prototype.createRequest = function (url) {
        var request = app.service.request.create(url);
        request.addHeader("X-XV-Source", "service.ui.ajax");
        return request;
    };


    /**
     *
     * @returns {*}
     */
    namespace.ajax.prototype.resolve = function () {
        if(!this.beforeHandler){
            return app.utils.getResolved();
        }

        var handlerParser = new app.handlerParser();
        handlerParser.setHandlers([this.beforeHandler]);
        return handlerParser.parse();
    };


    /**
     *
     * @param handler
     * @returns {namespace.ajax}
     */
    namespace.ajax.prototype.setBeforeHandler = function (handler) {
        this.beforeHandler = handler;
        return this;
    };




    return namespace.ajax;
})(__ARGUMENT_LIST__);