/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {
    
    namespace.error = function() {
        this.message = "";
        this.path = {
            "line" : 0,
            "className" : "undefined", 
            "method" : "undefined"
        };
        
        this.exception = null;
        this.data = {};
        this.id = app.utils.getRandomString(4);
    };
    
    /**
     * 
     * @param {String} message
     * @returns {error_L8.namespace.error.prototype}
     */
    namespace.error.prototype.setMessage = function(message) {
        this.message = message;
        return this;
    };
    
    
    
    /**
     * 
     * @returns {String}
     */
    namespace.error.prototype.getMessage = function() {
        return this.message;
    };
    
    /**
     * 
     * @param {Object} path
     * @returns {String}
     */
    namespace.error.prototype.setPath = function(path) {
        this.path = path;
        return this;
    };
    
    /**
     * 
     * @returns {Object}
     */
    namespace.error.prototype.getPath = function() {
        return this.path;
    };
    

    
    /**
     * 
     * @param {Object} exception
     * @returns {error_L8.namespace.error.prototype}
     */
    namespace.error.prototype.setException = function(exception) {
        this.exception = exception;
        return this;
    };
    
    
    /**
     * 
     * @returns {Object}
     */
    namespace.error.prototype.getException = function() {
        return this.exception;
    };
    
    /**
     * 
     * @param {Object} data
     * @returns {error_L8.namespace.error.prototype}
     */
    namespace.error.prototype.setData = function(data) {
        this.data = data;
        return this;
    };
    
    /**
     * 
     * @returns {Object}
     */
    namespace.error.prototype.getData = function() {
        return this.data;
    };
    
    
    /**
     * 
     * @returns {Object}
     */
    namespace.error.prototype.__serializeException = function(description) {
        if(!this.exception){
            return {};
        }
        var self = this;
        var data = {};
        
        Object.getOwnPropertyNames(this.exception).forEach(function(index){
            data[index] = self.exception[index];
        });
        
        return data;
    };
    
    /**
     * 
     * @returns {Object}
     */
    namespace.error.prototype.__serializeNavigator = function() {
        var data = {};

        Object.keys(navigator).forEach(function(index){
                var item = navigator[index];
                if(typeof item === 'object'){
                        return;
                }
                data[index] = item;
        });
        return data;
    };
    
    
    /**
     * 
     * @returns {Object}
     */
    namespace.error.prototype.__sendLog = function(description) {
        var data = {
            id : this.id,
            description: description,
            path : this.getPath(),
            message : this.getMessage(),
            data : this.getData(),
            exception : this.__serializeException(),
            navigator : this.__serializeNavigator(),
            history : app.service.history.getStack()
        };
        $.post( "/log/register", { data : JSON.stringify(data) });
        return this;
    };
    
    

    namespace.error.prototype.done = function() {
        var isUnload = $("body").is(".unload");
        if(isUnload){
            return;
        }
        var pathString = this.getPath().className + "::"+ this.getPath().method + ":"+ this.getPath().line;
        
        var alertString = "Error #"+this.id+"\n\n"
                + "Path: "+ pathString + "\n"
                + "Message:"+this.getMessage() +"\n"
                + "\n"
                +"Do you want report this bug?";
        
        var result =  false; //confirm(alertString);
        var description = "";
        if(result){
            description = prompt("Additional message to developer");
            this.__sendLog(description);
        }
        
        console.group("Exception #"+this.id);
        console.error("Message: " , this.getMessage());
        console.error("Path String: " , pathString);
        console.error("Path: " , this.getPath());
        console.error("Exception: " , this.getException());
        console.error("Data: " , this.getData());
        console.groupEnd();

        return this;
    };
    


    return namespace.error;
})(__ARGUMENT_LIST__);