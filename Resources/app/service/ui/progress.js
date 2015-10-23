/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {


    
    app.registerService(function() {
        namespace.progress = new namespace.progress();
    }, -100);


    namespace.progress = function() {
        this.initObject();
    };
    
    

    namespace.progress.prototype.getSVG = function() {
        var tmplString = app.utils.getString(function () {
            /**<string>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                    <rect x="0" y="6.64444" width="4" height="16.7111" opacity="0.2" class="fillColor">
                      <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
                      <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
                      <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
                    </rect>
                    <rect x="8" y="5.85556" width="4" height="18.2889" class="fillColor" opacity="0.2">
                      <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
                      <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
                      <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
                    </rect>
                    <rect x="16" y="8.35556" width="4" height="13.2889" class="fillColor" opacity="0.2">
                      <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
                      <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
                      <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
                    </rect>
                  </svg>
             </string>*/
        });
        return $(tmplString);
    };
   
   

    namespace.progress.prototype.initObject = function() {
        this.$element = $("<xv-progress>");
        this.$element.appendTo("application > services");
        var $svgContainer = $("<div>");
        this.$unblur = $("<input>").attr("type", "text");
        this.$element.attr("tabindex", "-1");
        $svgContainer.append(this.getSVG());
        $svgContainer.append(this.$unblur);
        this.$element.append($svgContainer);
    };
   
   /**
    * 
    * @returns {progress_L8.namespace.progress.prototype}
    */
    namespace.progress.prototype.show = function (transparent) {
        this.$element.addClass("show");
        if(transparent) {
            this.$element.addClass("transparent");
        }
        this.$element.focus();
        return this;
    };

    /**
     *
     * @returns {namespace.progress}
     */
    namespace.progress.prototype.hide = function () {
        this.$element.removeClass("show");
        this.$element.removeClass("transparent");
        return this;
    };

    /**
     *
     * @returns {namespace.progress}
     */
    namespace.progress.prototype.isShowed = function () {
        return this.$element.is(".show");
    };



    return namespace.progress;
})(__ARGUMENT_LIST__);