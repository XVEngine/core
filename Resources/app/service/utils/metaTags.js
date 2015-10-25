/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    app.registerService(function() {
        namespace.metaTags = new namespace.metaTags();
    });


    /**
     *
     * @returns {undefined}
     */
    namespace.metaTags = function() {

    };


    /**
     * Sets multiple meta tags from object (name: value)
     * @returns {undefined}
     */
    namespace.metaTags.prototype.setMeta = function(obj, className, property){
        for (var k in obj){
            if($.isArray(obj[k])) {
                for (var i in obj[k]) {
                    this.addTag(k, obj[k][i], className, property, true);
                }
            } else {
                this.addTag(k, obj[k], className, property);
            }
        }
    };

    /**
     * Removes meta tag with provided name (id) from head
     * @returns {bool}
     */
    namespace.metaTags.prototype.removeTag = function(id, property){
        var $tag = this.getTagObj(id, property);
        if($tag.length) {
            $tag.remove();
            return true;
        }
        return false;
    };

    /**
     * Removes all meta tag from head
     * @returns {undefined}
     */
    namespace.metaTags.prototype.removeTags = function(className){
        var classTag = className ? '' + className + '' : '';
        $metas = $('head meta:data("metaTag")');
        if(className) {
            $metas = $metas.filter(function() {
                return !jQuery.inArray(className, $(this).data("metaTag"));
            });
        }
        $metas.remove();
        //$('head meta' + classTag).remove();
    };

    /**
     * Helper function. Gets jQuery object of meta tag with provided name
     * @returns {obj}
     */
    namespace.metaTags.prototype.getTagObj = function(id, property){
        var idType = property ? 'property' : 'name';
        return $('head meta[' + idType + '="' + id + '"]');
    };

    /**
     * Adds a meta tag with provided name and value. Replaces it if it exists
     * @returns {void}
     */
    namespace.metaTags.prototype.addTag = function(id, value, className, property, allowMultiple){
        var $tag = this.getTagObj(id, property);
        var idType = property ? 'property' : 'name';
        var classTag = className ? ' ' + className : '';
        if(!$tag.length || allowMultiple) {
            var $meta = $("<meta>").attr({
                "content" : value
            }).attr(idType, id).data('metaTag', [className]);

            $tag = $('head').append($meta);
        } else {
            $tag.attr('content', value);
            $data = $tag.data('metaTag');
            if(!jQuery.inArray(className, $data)) {
                $data.push(className);
                $tag.data('metaTag',$data);
            }
        }
        //$tag.addClass(className);
    };


    return namespace.metaTags;
})(__ARGUMENT_LIST__);