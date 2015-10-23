/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    app.registerService(function() {
        namespace.animations = new namespace.animations();
    });




    namespace.animations = function() {

    };


    namespace.animations.prototype.delay = function(ms){
        var deferred = Q.defer();
        setTimeout(deferred.resolve, ms);
        return deferred.promise;
    };

    namespace.animations.prototype.blink = function($el){
        var self = this;

        return app.utils.getResolved().then(function(){
            $el.removeClass("animation-blink blink-color");
            return self.delay(10);
        }).then(function(){
            $el.addClass("animation-blink");
            return self.delay(10);
        }).then(function(){
            $el.addClass("blink-color");
            return self.delay(500);
        }).then(function(){
            $el.removeClass("blink-color");
            return self.delay(500);
        }).then(function(){
            $el.removeClass("animation-blink blink-color");
            return self;
        });
    };
    

    return namespace.animations;
})(__ARGUMENT_LIST__);