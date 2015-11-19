/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    namespace.utils = {};

    /**
     * 
     * @returns {undefined}
     */
    namespace.utils.getResolved = function(firstValue) {
        var deferred = Q.defer();
        deferred.resolve(firstValue);
        return deferred.promise;
    };


    namespace.utils.getString = function(func){
        var result = func();
        if(typeof result !== "undefined"){
            return result;
        }
        
        var re = /<string[^>]*>([\s\S]*?)<\/string>/ig;
        result = re.exec(func.toString());
        return result[1].trim();
    };


    namespace.utils.buildComponent = function(options){
        var deferred = Q.defer();
        try {
            var className = "app.component." + options.component;
            var componentClass = eval(className);
  
            var component = new componentClass(options);
            component.setComponentName(className);
            component.create();
            deferred.resolve(component.getElement());
        }
        catch (err) {
            var error = new app.error();
            error.setMessage("Unable to load component "+className);
            error.setPath(__PATH__);
            error.setException(err);
            error.setData(options);
            error.done();
        }
        return deferred.promise;
    };
    
    namespace.utils.getTranistionDuration = function(elementOrSelector){
        var $el = $(elementOrSelector).first();
        if($el.length === 0 ){
            return false;
        }
        var delay = $el.css('transition-duration').toLowerCase();
        return (( delay.indexOf( 'ms' ) > - 1 ) ? parseFloat( delay ) : parseFloat( delay ) * 1000) | 0;
    };
    
    namespace.utils.getTranistionDelay = function(elementOrSelector){
        var $el = $(elementOrSelector).first();
        if($el.length === 0 ){
            return false;
        }
        var delay = $el.css('transition-delay').toLowerCase();
        return ( delay.indexOf( 'ms' ) > - 1 ) ? parseFloat( delay ) : parseFloat( delay ) * 1000;
    };



    namespace.utils.getComponent = function(componentID){
        var $components = namespace.utils.getPage().find("#" + componentID +":first");
        if (!$components.length) {
            return false;
        }
        var component = $components.data("component");
        if(!component){
            return false;
        }
        return component;
    };
    

    namespace.utils.getApplication = function(){
        return $("application");
    };
    
    namespace.utils.getPage = function(){
        return namespace.utils.getApplication().find(" > page.active");
    };
    
    namespace.utils.getServices = function(){
        return namespace.utils.getApplication().find(" > services");
    };
    

    namespace.utils.replaceVars = function(uString, vars){
        var varsRegex = /\{\$([\s\S]*?)\}/gmi;
        return uString.replace(varsRegex, function(orginal, varName){
            var value = '';
                try {
                    value = eval("vars."+varName);
                }catch(e){
                    
                }
                return value;
            });
    };
 
    namespace.utils.isFunction = function(arg){
        return typeof arg === "function";
    };
    
    namespace.utils.isObject = function(arg){
        return typeof arg === "object";
    };

    namespace.utils.replace = function (find, replace, str) {
        return str.split(find).join(replace);
    };


    namespace.utils.parseArguments = function (args) {
       var arr = [];
       args.forEach(function(arg){
           arr.push(namespace.utils.getValue(arg));
       });
       return Q.all(arr);
    };
    
    
    namespace.utils.parseObject = function (obj) {
        return Q.fcall(function () {
            return namespace.utils.getValue(obj);
        }).then(function (obj) {
            return namespace.utils.__parseObject(obj);
        });
    };
    
    
    namespace.utils.__parseObject = function (obj) {
        if(!app.utils.isObject(obj)){
            return obj;
        }
        if(obj.forEach){
            return this.__parseArray(obj);
        }
        
        return this.__parseJSONObject(obj);
    };
    
    namespace.utils.__parseArray = function (obj) {
        var arr = [];
        obj.forEach(function(item){
            arr.push(namespace.utils.parseObject(item));
        });
        return Q.all(arr);
    };
    
     
    namespace.utils.__parseJSONObject = function (obj) {
        var result = {};
        var queue = [];
        Object.keys(obj).forEach(function (keyName) {
            queue.push(namespace.utils.parseObject(obj[keyName]).then(function(res){
                result[keyName] = res;
                return true;
            }));
        });

        return Q.all(queue).then(function(){
            return result;
        });
    };
    
    
   
    
    
    namespace.utils.getValue = function(value) {
        if(!value){
            return value;
        }
        if(!app.utils.isObject(value)){
            return value;
        }
        if(!value.__custom){
            return value;
        }

        
        if(value.__custom == "component"){
           var component =  app.utils.getComponent(value.componentID);
           if(!component){
               console.error("app::utils:getValue: Not found component " + value.componentID);
               return null;
           }
           return component[value.method].apply(component, value.arguments);
        }
        
        if(value.__custom == "custom"){
            var obj = app.protocols.get(value.path);
            
            if(!obj){
                console.error("app::utils:getValue: Not found " + value.path);
                return null;
            }
 
            if(typeof obj[value.method] == "undefined"){
               console.error("app::utils:getValue: Not found method " +value.method + " in "+ value.path);
               return null;
            }
            
           return obj[value.method].apply(obj, value.arguments);
        }
        
        return null;
    };

    namespace.utils.prepareAnimation = function($item){
        $item.addClass("animation-fadeto");
        $item.css("opacity", 0);
        setTimeout(function(){
            $item.css("opacity", 1);
        }, 100);
    };

    namespace.utils.validateEmail = function(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    
    /**
     * 
     * @param {int} length
     * @returns {String}
     */
    namespace.utils.getRandomString = function(length) {
        var len = length || 12;
        var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        return randomString;
    };

    namespace.utils.zeroPad = function(num, numZeros) {
        var n = Math.abs(num);
        var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
        var zeroString = Math.pow(10,zeros).toString().substr(1);
        if( num < 0 ) {
                zeroString = '-' + zeroString;
        }

        return zeroString+n;
    };

    namespace.utils.timeout = function(foo, ms) {
        var deferred = Q.defer();
        setTimeout(function () {
            foo();
            deferred.resolve(true);
        }, ms);
        return deferred.promise;
    };
    
    namespace.utils.getComponentsAreas = function(){
        
        return namespace.utils.getPage().add(
                    namespace.utils.getServices()
                );
    };

    namespace.utils.__requestAnimFrame = (function() {
        return  globals.requestAnimationFrame ||
            globals.webkitRequestAnimationFrame ||
            globals.mozRequestAnimationFrame ||
            function(callback) {
                globals.setTimeout(callback, 1000 / 60);
            };
    })();

    namespace.utils.requestAnimFrame = function(callback){
        namespace.utils.__requestAnimFrame.call(globals, callback);
    };



    namespace.utils.ifsetor = function(val, def){
        return typeof val === "undefined" ? def : val;
    };

    var __scrollBarCache = null;
    namespace.utils.getScrollBarWidth = function (clearCache) {
        clearCache = namespace.utils.ifsetor(clearCache, false);

        if(__scrollBarCache && !clearCache ){
            return __scrollBarCache;
        }
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";

        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild (inner);

        document.body.appendChild (outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) w2 = outer.clientWidth;

        document.body.removeChild (outer);
        __scrollBarCache = (w1 - w2);
        return __scrollBarCache;
    };



    namespace.utils.isEqualObject = function(x, y){

        if(typeof x !== typeof y){
            return false;
        }

        var xKeys = Object.keys(x);
        var yKeys = Object.keys(y);

        if(xKeys.length !== yKeys.length){
            return false;
        }

        var compareResult = true;
        xKeys.forEach(function(key){
            if(x[key] !== y[key]){
                compareResult = false;
            }
        });

        return compareResult;
    };


    namespace.utils.hexToRGB = function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    namespace.utils.imageToFile = function(url, outputFormat, quality){
        var deferred = Q.defer();
        //deferred.resolve(text);
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS'),
                ctx = canvas.getContext('2d');
            canvas.height = img.naturalHeight;
            canvas.width = img.naturalWidth;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(function(file){
                deferred.resolve(file);
                canvas = null;
            }, outputFormat, quality);
        };
        img.src = url;

        return deferred.promise;
    };


    namespace.utils.imageToBase64 = function(url, outputFormat, quality){
        var deferred = Q.defer();
        //deferred.resolve(text);
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS'),
                ctx = canvas.getContext('2d');
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            deferred.resolve(canvas.toDataURL(outputFormat, quality));
            canvas = null;
        };

        img.onerror = function(){
            deferred.reject(arguments);
        };

        img.src = url;

        return deferred.promise;
    };



    namespace.utils.image = function(url){
        var deferred = Q.defer();
        //deferred.resolve(text);
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            deferred.resolve(this);
        };

        img.onerror = function(){
            deferred.reject(arguments);
        };

        img.src = url;
        return deferred.promise;
    };


    /**
     * Get resorce from url
     * @param {String} url
     * @param {String} responseType
     * @returns {*}
     */
    namespace.utils.getResource = function(url, responseType){
        var deferred = Q.defer();
        var xmlHTTP = new XMLHttpRequest();
        xmlHTTP.open( 'GET', url , true );
        xmlHTTP.responseType = app.utils.ifsetor(responseType, "blob");
        var completed = false;
        xmlHTTP.onload = function() {
            completed = true;
            deferred.resolve(this.response);
        };

        xmlHTTP.onprogress = function( event ) {
            if(completed){
                return;
            }

            if ( event.lengthComputable ){
                deferred.notify(event.loaded / event.total);
            }
        };

        xmlHTTP.onloadstart = function() {
            deferred.notify(0);
        };

        xmlHTTP.onloadend = function() {
            deferred.notify(1);
        };

        xmlHTTP.send();

        return deferred.promise;
    };


    namespace.utils.blobToBase64 = function(blob){
        var deferred = Q.defer();
        var reader = new window.FileReader();
        reader.onloadend = function() {
            deferred.notify(1);
        };
        reader.onload = function() {
            deferred.resolve(reader.result);
        };
        reader.onprogress = function(data) {
            if (data.lengthComputable) {
                deferred.notify((data.loaded / data.total));
            }
        };
        reader.onloadstart = function() {
            deferred.notify(0);
        };
        reader.readAsDataURL(blob);
        return deferred.promise;
    };




    namespace.utils.cammelCaseToDashCase = function(str){
        return str.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
    };


    namespace.utils.renderString = function(str, data){
        var fn = new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                "with(obj){p.push('" +
                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");

        return fn( data );
    };

    namespace.utils.isArray = function(arr){
        return $.isArray(arr);
    };



    return namespace.utils;
})(__ARGUMENT_LIST__);
