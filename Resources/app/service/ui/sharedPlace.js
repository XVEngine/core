/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function (namespace, app, globals) {



    app.registerService(function () {
        namespace.sharedPlace = new namespace.sharedPlace();
    });


    namespace.sharedPlace = function () {
        this.createElement();
    };

    namespace.sharedPlace.prototype.createElement = function () {
        var $services  = app.utils.getServices();
        
        this.$sharedPlace = $("<xv-shared-place>");
        $services.append(this.$sharedPlace);
        
    };


    namespace.sharedPlace.prototype.addComponent = function(component){
        var self = this;
        return app.utils.buildComponent(component).then(function ($item) {
            self.$sharedPlace.append($item);
            return true;
        });
    };


    return namespace.sharedPlace;
})(__ARGUMENT_LIST__);