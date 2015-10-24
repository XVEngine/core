(function(namespace, app, globals) {

    namespace.request = function(data) {
        this.data = data;
        var self = this;
        this.url = data.url;
        this.requestOptions = this.data.options.forEach ? {} : this.data.options;
        
        this.promise = app.utils.getResolved(true).then(function(){
            return self.prepareParams();
        }).then(function(){
            return self.doRequest();
        });
        
    };
    
    namespace.request.prototype.prepareParams = function(){
        var worker = app.utils.getResolved(true);
        var self = this;
        
        
        /**
         * GET
         */
        Object.keys(this.data.get).forEach(function(key){
            worker = worker.then(function(){
                return app.utils.getValue(self.data.get[key]);
            }).then(function(val){
                if(!self.requestOptions.get){
                    self.requestOptions.get = {};
                }
                self.requestOptions.get[key] = val;
                return true;
            });
            
        });
        
        
        /**
         * POST
         */
        Object.keys(this.data.post).forEach(function(key){
            worker = worker.then(function(){
                return app.utils.getValue(self.data.post[key]);
            }).then(function(val){
                if(!self.requestOptions.post){
                    self.requestOptions.post = {};
                }
                self.requestOptions.post[key] = val;
                return true;
            });
            
        });
        
        /**
         * HEADERS
         */
        Object.keys(this.data.headers).forEach(function(key){
            worker = worker.then(function(){
                return app.utils.getValue(self.data.headers[key]);
            }).then(function(val){
                if(!self.requestOptions.headers){
                    self.requestOptions.headers = {};
                }
                self.requestOptions.headers[key] = val;
                return true;
            });
        });
        
        
        /**
         * FILES
         */
        Object.keys(this.data.files).forEach(function(key){
            worker = worker.then(function(){
                return app.utils.getValue(self.data.files[key]);
            }).then(function(val){
                if(!self.requestOptions.files){
                    self.requestOptions.files = {};
                }
                self.requestOptions.files[key] = val;
                return true;
            });
        });


        /**
         * Params
         */
        Object.keys(this.data.params).forEach(function(key){
            worker = worker.then(function(){
                return app.utils.getValue(self.data.params[key]);
            }).then(function(val){
                self.url = self.url.replace(key, val);
                return true;
            });
        });
        
        
        return worker;
    };
    
    namespace.request.prototype.doRequest = function(){
        var request = app.service.request.create(this.url);
        request.setOptions(this.requestOptions);
        return request.run();
    };
    

    return namespace.request;
})(__ARGUMENT_LIST__);