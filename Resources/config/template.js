/*!
* @package XV-Engine
* @version <%= pkg.version %>
* @date <%= grunt.template.today("yyyy-mm-dd") %>
* @author Krzysztof Bednarczyk
*/
var application = {};
(function(app) {
    app.authors = [
        "Krzysztof Bednarczyk"
    ];
    app.version = 0.5;


    app.namespace = function (namespace) {
        var nsparts = namespace.split(".");
        var parent = app;

        // we want to be able to include or exclude the root namespace
        // So we strip it if it's in the namespace
        if (nsparts[0] === "app") {
            nsparts = nsparts.slice(1);
        }

        // loop through the parts and create
        // a nested namespace if necessary
        for (var i = 0; i < nsparts.length; i++) {
            var partname = nsparts[i];
            // check if the current parent already has
            // the namespace declared, if not create it
            if (typeof parent[partname] === "undefined") {
                parent[partname] = {};
            }
            // get a reference to the deepest element
            // in the hierarchy so far
            parent = parent[partname];
        }
        // the parent is now completely constructed
        // with empty namespaces and can be used.
        return parent;
    };




    app.newClass = function (_extendObj) {
        var buildOnlyValue = "___c4130e7caaf6a2e021562b37c2444607___";
        var constructorMethodName = "__construct";


        var finalResult = function (arg) {

            if (_extendObj && typeof _extendObj.__$$cache === "function") {
                if (arg === buildOnlyValue) {
                    return _extendObj.__$$cache;
                }

                var resultInstance = new _extendObj.__$$cache();
                resultInstance[constructorMethodName] && resultInstance[constructorMethodName].apply(resultInstance, arguments);
                return resultInstance;
            }


            var self = this;
            var newClass = function () {

            };

            //extend object with parent
            if (_extendObj && typeof _extendObj.extend == "function") {
                var _class = _extendObj.extend();
                if (_class.xvClass) {
                    var classItem = (new _class(buildOnlyValue));
                    newClass.prototype = Object.create(classItem.prototype);
                } else {
                    newClass.prototype = Object.create(_class.prototype);
                }

            }


            Object.keys(this.constructor.prototype).forEach(function (keyName) {
                var item = self.constructor.prototype[keyName];
                var value = typeof item === "object" ? Object.create(item) : item;

                if (typeof newClass.prototype[keyName] === "function") {
                    value.__$$super = newClass.prototype[keyName];
                }


                newClass.prototype[keyName] = value;
            });


            //super class
            newClass.prototype._super = function (parent) {
                if (typeof parent !== "function") {
                    throw new Error("To use _super() method you need pass arguments.callee argument");
                }

                if (typeof parent.__$$super !== "function") {
                    return function () {
                        throw new Error("Undefined parent function", parent)
                    }
                }
                return parent.__$$super.bind(this);
            };


            //extend object with parent
            if (_extendObj && typeof _extendObj.trait == "function") {
                var _traits = _extendObj.trait();
                if (typeof _traits == "function") {
                    _traits = [_traits];
                }

                _traits.forEach(function (trait) {

                });
            }


            _extendObj && (_extendObj.__$$cache = newClass);


            if (arg === buildOnlyValue) {
                return newClass;
            }

            var instance = new newClass();
            instance[constructorMethodName] && instance[constructorMethodName].apply(instance, arguments);
            return instance;
        };

        finalResult.xvClass = true;
        return finalResult;
    };


    app.servicesInitList = [];

    app.registerService = function (callable, priority) {
        app.servicesInitList.push({
            init: callable,
            priority: priority | 0
        });
    };

    app.generateGettersAndSetters = function(objectPrototype, values){
        Object.keys(values).forEach(function(name){
            var upperCased = name[0].toUpperCase() + name.slice(1);
            var lowerCased = name[0].toLowerCase() + name.slice(1);

            objectPrototype["get"+upperCased] = function(){
                return this["__"+lowerCased];
            };

            objectPrototype["set"+upperCased] = function(value){
                this["__"+lowerCased] = value;
                return this;
            };

            objectPrototype["__"+lowerCased] = values[name];
        });

        return true;
    };


    //--scripts--//


})(application);