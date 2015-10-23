/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    app.registerService(function() {
        namespace.cssLoader = new namespace.cssLoader();
    });


    /**
     * 
     * @returns {undefined}
     */
    namespace.cssLoader = function() {

    };




    /**
     * 
     * @returns {String}
     */
    namespace.cssLoader.prototype.load = function(files){
        var self = this;
        if(typeof files == "string"){
            files = [files];
        }
        
        var worker = Q.fcall(function(){
            return true;
        });
        
        files.forEach(function(file){
            worker = worker.then(function(){
                return self._load(file);
            });
            
        });
        
        return worker;
    };


    namespace.cssLoader.prototype._load = function (file) {
        var css = globals.document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("type", "text/css");
        css.setAttribute("href", file);
        document.getElementsByTagName("head")[0].appendChild(css);
        return true;
    };


    /**
     * Add inline style tag
     * @param {String} id
     * @param {String} source
     * @returns {boolean}
     */
    namespace.cssLoader.prototype.appendInline = function (id, source) {
        this.remove(id);
        var $link = $("<style>");
        $link.addClass("service-css-loader");
        $link.attr("type", "text/css");
        $link.html(source);
        $link.attr("item-id", id);
        $("head").append($link);
        return true;
    };


    /**
     * Remove inline style tag
     * @param {String} id
     * @returns {boolean}
     */
    namespace.cssLoader.prototype.remove = function (id) {

        $("head style.service-css-loader").each(function(){
            var $this = $(this);
            if($this.attr("item-id") == id){
                $this.remove();
            }
        });


        return true;
    };


    
    
    
    return namespace.cssLoader;
})(__ARGUMENT_LIST__);