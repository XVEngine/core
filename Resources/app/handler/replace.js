(function(namespace, app, globals) {

    namespace.replace = function(item) {
        var self = this;
        this.promise = this.replaceComponents(item.replaces).then(function(){
            return self.replaceHTML(item.replacesHTML);
        });
    };

    namespace.replace.prototype.replaceComponents = function(replaces) {
        var worker = app.utils.getResolved(true);
        var self = this;


        replaces.forEach(function(item){
            var components = app.protocols.getAll(item.id);
            if(!components.length){
                return true;
            }

            components.forEach(function(component){
                if(!component['getElement']){
                    return true;
                }
                var $element = component.getElement();

                worker = worker.then(function(){
                    return app.utils.buildComponent(item.component);
                }).then(function($view){
                    $element.replaceWith($view);
                    return true;
                });

            });


        });
        
        return worker;
    };

    namespace.replace.prototype.replaceHTML = function(replaces) {
        var worker = app.utils.getResolved(true);
        var self = this;


        replaces.forEach(function(item){
            var $items = app.utils.getComponentsAreas().find(item.selector).each(function(){
                var $el = $(this);
                worker = worker.then(function(){
                    return app.utils.buildComponent(item.component);
                }).then(function($view){
                    $el.replaceWith($view);
                    return true;
                });
            });
        });

        return worker;
    };




    return namespace.replace;
})(__ARGUMENT_LIST__);