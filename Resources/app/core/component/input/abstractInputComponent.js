(function(namespace, app, globals) {

    namespace.abstractInputComponent = app.newClass({
        extend: function () {
            return app.core.component.abstractComponent;
        }
    });
    

    namespace.abstractInputComponent.prototype.getDefaultParamsAbstract = function() {
        return {
            "label": "",
            "name" : null,
            "value": null,
            "required": false,
            "hidden": false,
            "disable" : false,
            "classes": [],
            "validatorMessages" : {}
        };
    };


    namespace.abstractInputComponent.prototype.init = function() {
        this.params = $.extend(true, this.getDefaultParamsAbstract(), this.params);
        this.$label = this.$element.find(".label");
        this.$input = this.$element.find(".input");

        this.setValidatorMessages(this.params.validatorMessages);
        
        this.setLabel(this.params.label);
        this.disable(this.params.disable);
        this.setRequired(this.params.required);
        this.setHidden(this.params.hidden);
        this.setName(this.params.name);

        this.params.focus && this.setFocus(true);


        if (this.prepare) {
            this.prepare();
        }

        this.setValue(this.params.value);
        return this;
    };


    namespace.abstractInputComponent.prototype.setValue = function(value) {
        this.$input.val(value);
        return this;
    };


    namespace.abstractInputComponent.prototype.getValue = function() {
        return this.$input.val();
    };

    namespace.abstractInputComponent.prototype.setName = function(name) {
        this.$input.attr("name", name);
        return this;
    };
    

    namespace.abstractInputComponent.prototype.setLabel = function(label) {
        this.$element[label ? 'removeClass' : 'addClass']("without-label");
        this.$label.html(label);
        return this;
    };
    
    namespace.abstractInputComponent.prototype.disable = function(val) {
        this._disable = typeof val == "undefined" ?  true : !!val ;
        this.$element[this._disable ? 'addClass' : 'removeClass']("disabled");
        return this;
    };
    
    namespace.abstractInputComponent.prototype.isDisabled = function(val) {
        return this._disable;
    };


    namespace.abstractInputComponent.prototype.setRequired = function(required) {
        this._required = required;
        
        if (this._required) {
            this.$element.addClass("required");
        } else {
            this.$element.removeClass("required");
        }
        return this;
    };

    namespace.abstractInputComponent.prototype.isRequired = function(required) {
        return this._required;
    };

    namespace.abstractInputComponent.prototype.setHidden = function(hidden, speed) {
        this._hidden = hidden;
        this.$element[hidden ? 'addClass' : 'removeClass']("xv-hidden");
        return this;
    };

    namespace.abstractInputComponent.prototype.validateErros = [];
    namespace.abstractInputComponent.prototype.validators = {};


    namespace.abstractInputComponent.prototype.isValidated = function() {
        this.validateErros = [];

        if (this._hidden) {
            return true;
        }

        var value = this.getValue();
        for (var i in this.validators) {
            var validator = this.validators[i];
            if (!validator.apply(this, [value])) {
                this.validateErros.push(i);
            }

        }

        var result = !this.validateErros.length;

        if(result || value.length == 0){
            this.$element.addClass("validated").removeClass("invalidated");
        }else{
            this.$element.addClass("invalidated").removeClass("validated");
        }



        return result;
    };
    
    namespace.abstractInputComponent.prototype.getTipElement = function() {
        return this.$element;
    };
    
    
    
    namespace.abstractInputComponent.prototype.getValidateErros = function() {
        var self = this;
        var messages = [];
        
        this.validateErros.forEach(function(index){
            var msg = self._validatorMessages[index];
            if(msg){
                messages.push(msg);
            }else if(typeof msg === "undefined"){
                messages.push(index);
            }
        });
        return messages;
    };
    
     
    namespace.abstractInputComponent.prototype.showErrorTips = function(){
        var errors = this.getValidateErros();
        errors = errors.slice(0, 1); //fucking stupid think from #120 task
        this.setTipContent(errors.join(", "));
        this.showTip();
        return this;
    };
    
    
    namespace.abstractInputComponent.prototype.setTipContent = function(content){
        this.getTipElement().attr("xv-tip" , content);
        return this;
    };
    
    namespace.abstractInputComponent.prototype.showTip = function(){
        app.service.ui.tips && app.service.ui.tips.show(this.getTipElement());
        return true;
    };
    
    
    namespace.abstractInputComponent.prototype.hideTip = function(){
        app.service.ui.tips && app.service.ui.tips.hide(this.getTipElement());
        return this;
    };
    
    
    
    
    
    
    namespace.abstractInputComponent.prototype.setValidatorMessages = function(messages) {
        this._validatorMessages = messages || {};
        return this;
    };

    namespace.abstractInputComponent.prototype.setValidatorMessage = function(name , message) {
        this._validatorMessages[name] = message;
        return this;
    };

    
    
    

    
    namespace.abstractInputComponent.prototype.onInput = function(){
        this.validated = this.isValidated();
        if(this._disable){
            return false;
        }
        
        return this.trigger("onInput");
    };

    namespace.abstractInputComponent.prototype.setInvalidMessage = function(message){
        this.$element[message ? 'addClass' : 'removeClass']("invalid"); 
    };

    namespace.abstractInputComponent.prototype.setInvalidClass = function(val){
        val = typeof val === "undefined" ? true : !!val;
        
        this.$element[val ? 'addClass' : 'removeClass']("invalid"); 
        return true;
    };
    
    

    namespace.abstractInputComponent.prototype.setFocus = function(value){
        this.$input[value ? "focus" : "blur"]();
        return this;
    };

    namespace.abstractInputComponent.prototype.destroy = function(){
        this.disable();
    };




    return namespace.abstractInputComponent;
})(__ARGUMENT_LIST__);