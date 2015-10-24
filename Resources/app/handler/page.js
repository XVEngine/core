/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {
    
    namespace.page = function(item) {
        this.$application = $("application:first");
        this.slideType = item.slideType;
        this.id = item.id;
        this.promise = this.load(item.component);
    };
    

    var renderTimeout = 300;
    
    namespace.page.prototype.load = function(component) {
        var self = this;
        var deferred = Q.defer();
        var scrollIncrement = 0;
        $("html, body").animate({scrollTop:0}, {
            duration : 200,
            easing  : 'linear',
            done : function(){
                if(!scrollIncrement++){
                    return;
                }
                deferred.resolve(self._load(component));
            }
        });
        return deferred.promise;
    };
    
    namespace.page.prototype._load = function(component) {
        var self = this;
        var deferred = Q.defer();
        var $html = $("html");
        var $page = $("<page>");
        if(this.id){
            $page.attr("id" , this.id);
        }
        var $previousPage = self.$application.find(">page.active");
        
        $page.addClass(self.slideType);
        $previousPage.addClass(self.getOppositSlide());
        
        app.utils.buildComponent(component).then(function($element){
            self.$application.append($page);
            $html.addClass("animated");

            
            $previousPage.removeClass("active").addClass("animation");
            $page.addClass("run animation rendering active");
            $page.html($element);
            
            
            
            setTimeout(function(){
                $page.removeClass("rendering");
                $previousPage.addClass("run");
                $page.removeClass("run");
            }, renderTimeout);
            
            
            var animationDuration = globals.Math.max(app.utils.getTranistionDuration($page), app.utils.getTranistionDuration($previousPage));

            setTimeout(function(){
                $previousPage.remove();
                $page.removeClass("animation run");
                $page.removeClass(self.slideType);
                $html.removeClass("animated");
                deferred.resolve(true);
            }, animationDuration+renderTimeout + 100);
            
            
            
        });
        
        return deferred.promise;
    };
    
    
    
    namespace.page.prototype.getOppositSlide = function(){
        switch(this.slideType){
            case "up":
                return ""; //"down";
            case "down":
                return "up";
            case "left":
                return "right";
            case "right":
                return "left";
            case "previous":
                return "previous-opposit";
            case "none":
                return "none-opposit";
        }
    };
    

    return namespace.page;
})(__ARGUMENT_LIST__);