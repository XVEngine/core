/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {
    namespace.request = function(url, options) {
        this.options = this.getDefaultOptions();

        this.setURL(url);
        this.setOptions(options);
        
        this.promise = {};
        
        if(this.options.autorun){
            this.run();
        }
    };

    namespace.request.prototype.getDefaultOptions = function(){
        var $page = app.utils.getPage();
        
        return {
            autorun: false,
            progress: true,
            disableErrors : false,
            headers : {
                "X-XV-Request": 1,
                "Accept" : "application/json, text/javascript, application/xvengine, */*; q=0.01"
            }
        };
    };
    
    namespace.request.prototype.run = function(){

        if(!this.checkLink(this.url)){
            alert("xvEngine Secruity: Unable to load resources from " + this.url + ". This domain is external.");
            return this.promise;
        }

        if(this.options.files){
            this.promise = this.files(this.url, this.options.get || {}, this.options.post || {}, this.options.files);
        }else if(this.options.post){
            this.promise = this.post(this.url, this.options.get || {}, this.options.post);
        }else{
            this.promise = this.get(this.url, this.options.get || {});
        }
        this.runProgress();
        return this.promise;
    };

    /**
     *
     * @returns {boolean}
     */
    namespace.request.prototype.checkLink = function(url){
        var a = document.createElement('a'), loc = window.location;
        a.href = url;
        return true;
        return a.hostname == loc.hostname &&
            a.port == loc.port;
    };


    namespace.request.prototype.setURL = function(url){
        this.url = url;
        return this;
    };
    
    /**
     * 
     * @param {String} url
     * @returns {request_L8.namespace.request.prototype|undefined}
     */
    namespace.request.prototype.runProgress = function(url){
        if(!this.options.progress){
            return;
        }

        app.service.ui.progress.show();
        this.promise = this.promise.fin(function(){
            app.service.ui.progress.hide();
        });
        return this;
    };
    
    
    namespace.request.prototype.setOptions = function(options){
        this.options = $.extend(true, this.options, options);
        return this;
    };



    namespace.request.prototype.setOption = function(option , value){
        this.options[option] = value;
        return this;
    };



    
    namespace.request.prototype.setTimeout = function(timeout){
        this.options.timeout = timeout;
        return this;
    };
    
    namespace.request.prototype.addHeader = function(name, value){
        this.options.headers[name] = value;
        return this;
    };
    
    
    namespace.request.prototype.addPost = function(name, value){
        !this.options.post && (this.options.post = {});
        this.options.post[name] = value;
        return this;
    };
    
    namespace.request.prototype.addGet = function(name, value){
        !this.options.get && (this.options.get = {});
        this.options.get[name] = value;
        return this;
    };
    
    namespace.request.prototype.addFile = function(name, value){
        !this.options.files && (this.options.files = {});
        this.options.files[name] = value;
        return this;
    };
    

    
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.request.prototype.post = function(url, get, post) {
        var self = this;
        var deferred = Q.defer();


        var options = {
            type: "POST",
            url: url,
            data: post,
            headers: this.options.headers,
            success: function(text) {
                app.service.utils.functions.parseJson(text).then(function(json){
                    deferred.resolve(json);
                    self.execHandlers(json);
                });
            },
            beforeSend: function (xhr) {
                self._xhr = xhr;
            },
            dataType: "text",
            error : function(jqXHR, textStatus, errorThrown ){
                deferred.reject(null);
                if(self.options.disableErrors){
                        return;
                }

                
                
                if(jqXHR.responseText){
                    app.service.ui.progress.hide();
                    var wnd = window.open("about:blank", "", "_blank");
                    wnd.document.write(jqXHR.responseText);
                }
                
                var error = new app.error();
                error.setMessage("Unable to execute request to "+url+ ", status "+textStatus);
                error.setPath(__PATH__);
                error.setException(errorThrown);
                error.setData({
                    jqXHR : jqXHR,
                    textStatus : textStatus,
                    errorThrown : errorThrown
                });
                error.done();
            }
        };
        
        if(this.options.timeout){
            options.timeout = this.options.timeout;
        }
        
        $.ajax(options);
        return deferred.promise;
    };
    /**
     * 
     * @returns {undefined}
     */
    namespace.request.prototype.get = function(url, get) {
        var self = this;
        var deferred = Q.defer();
        $.ajax({
            type: "GET",
            url: url,
            data: get,
            headers: this.options.headers,
            success: function(text) {
                app.service.utils.functions.parseJson(text).then(function(json){
                    deferred.resolve(json);
                    self.execHandlers(json);
                });

            },
            beforeSend: function (xhr) {
                self._xhr = xhr;
            },
            dataType: "text",
            error : function(jqXHR, textStatus, errorThrown){
                deferred.reject(null);
                if(self.options.disableErrors){
                        return;
                }

                if(jqXHR.responseText){
                    app.service.ui.progress.hide();
                    var wnd = window.open("about:blank", "", "_blank");
                    wnd.document.write(jqXHR.responseText);
                }
                
                var error = new app.error();
                error.setMessage("Unable to execute request to "+url+ ", status "+textStatus);
                error.setPath(__PATH__);
                error.setException(errorThrown);
                error.setData({
                    jqXHR : jqXHR,
                    textStatus : textStatus,
                    errorThrown : errorThrown
                });
                error.done();
            }
        });
        return deferred.promise;
    };
    
    
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.request.prototype.files = function(url, get, post, files) {
        var self = this;
        var deferred = Q.defer();
        var xhr = new XMLHttpRequest();
        this._xhr = xhr;
        
        
        xhr.upload.addEventListener("progress", function(rpe){
            deferred.notify({
                event : "request.upload.progress",
                percent : rpe.loaded / (rpe.total||rpe.loaded||1),
                total : rpe.total,
                loaded : rpe.loaded
            });
        }, false);
        
        xhr.addEventListener("error", function(e){
            deferred.reject(e);
        }, false);
        
        xhr.addEventListener("abort", function(e){
            deferred.reject(e);
        }, false);
        
        xhr.addEventListener("load", function(req){

            app.service.utils.functions.parseJson(req.target.responseText).then(function(json){
                deferred.resolve(json);
                self.execHandlers(json);
            });
        }, false);
        
               
        xhr.open("post", url, true);
        
        for(var i in this.options.headers){
            xhr.setRequestHeader(i, this.options.headers[i]);
        }



        for(var x in files){
            post[x] = files[x];
        }
        
        xhr.send(Object.toFormData(post));
        
        return deferred.promise;
    };




    /**
     * 
     * @returns {undefined}
     */
    namespace.request.prototype.getXHR = function(json) {
        return this._xhr;
    };
    
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.request.prototype.execHandlers = function(json) {
        if (!json.handlers) {
            return;
        }

        var handlerParser = new app.handlerParser();
        handlerParser.setHandlers(json.handlers);
        return handlerParser.parse();
    };

    return namespace.request;
})(__ARGUMENT_LIST__);