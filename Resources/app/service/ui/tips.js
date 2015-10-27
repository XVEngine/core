/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    
    app.registerService(function() {
        namespace.tips = new namespace.tips();
    });


    namespace.tips = function() {
        this.createElement();
        this.tips = [];
        this.bindEvents();
        this.run();
    };

    namespace.tips.prototype.createElement = function () {
        var $services  = app.utils.getServices();
        this.$tips = $("<xv-tips>");
        $services.append(this.$tips);
    };
    
    
    
    namespace.tips.prototype.show = function($element){
        this.hide($element);
        this.tips.push({
            "element" : $element,
            "tips" : null
        });
        
    };
    
    
    namespace.tips.prototype.hide = function($element){
        var self = this;
        var itemG = null;
        this.tips.forEach(function(item, index){
            if(item.element.is($element)){
                self.tips.splice(index, 1);
                itemG = item;
            }
        });
        
        this.destroyTip(itemG);
        return true;
    };
    
    
    
    namespace.tips.prototype.destroyTip = function(item){
        if(!item){
            return true;
        }
        
        if(item.tips){
            item.tips.remove();
        }
        return true;
    };
    
    namespace.tips.prototype.createTip = function($element){
        var $tip = $("<div>");
        
        return $tip;
    };
    
    
    
    namespace.tips.prototype.refreshTip = function(item){
        var $element = item.element;

        var text = $element.attr("xv-tip");
        
        if(!text){
            this.hide($element);
            return;
        }
        text = text.trim();

        if(!text){
            this.hide($element);
            return;
        }
        
        
        if(!item.tips){
            var $tip = this.createTip();
            this.$tips.append($tip);
            setTimeout(function(){
                $tip.addClass("show");
            }, 100);
            $element.data("_xv_tip", $tip);
            $tip.data("_xv_tip_element", $element);
            item.tips = $tip;
        }else{
            var $tip = item.tips;
        }
        
        $tip.html(text);
        
        var tipSizes = $tip[0].getBoundingClientRect();
        
        var el = $element[0];
        
        
        var bounds = el.getBoundingClientRect();
        var center = {
            top : (bounds.top) - tipSizes.height,
            left: (bounds.left + (bounds.width/2)) - (tipSizes.width/2)
        };
        
        $tip.css("top" , center.top+"px");
        $tip.css("left" , center.left+"px");
        

        return true;
    };
    
    
    namespace.tips.prototype.setTip = function(username, component){
        app.utils.buildComponent(component).then(function(){

        });

    };

    namespace.tips.prototype.tick = function(){
        var self = this;
        this.tips.forEach(function(item){
            var $element = item.element;
            if(!$element.is(":visible")){
                self.hide($element);
                return;
            }
            self.refreshTip(item);
        });

    };
    
    namespace.tips.prototype.run = function(){
        var self = this;


        window.setInterval(function(){
            self.tick();
        }, 250);

        /*
        app.utils.requestAnimFrame(function(){
            self.tick();
            self.run();
        });*/
    };

    namespace.tips.prototype.hideAll = function(){
        this.$tips.find(">div:visible").click();
        return true;
    };

    namespace.tips.prototype.bindEvents = function(){
        var self = this;
        this.$tips.on("click", ">div", function(){
            var $element = $(this).data("_xv_tip_element");
            if($element){
                self.hide($element);
            }
            $(this).remove();
            return false;
        });
        
        app.utils.getApplication().on("mouseenter tap", ".xv-tip-hover", function (e) {
            namespace.tips.show($(this));
        });
        
        app.utils.getApplication().on("mouseleave focusout mouseup", ".xv-tip-hover", function (e) {
            namespace.tips.hide($(this));
        });
        
        
    };



    return namespace.tips;
})(__ARGUMENT_LIST__);