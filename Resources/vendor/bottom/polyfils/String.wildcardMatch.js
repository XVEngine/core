if(!String.prototype.wildcardMatch){
    String.prototype.wildcardMatch = function(find) {
        find = find.replace(/[\-\[\]\/\{\}\(\)\+\.\\\^\$\|]/g, "\\$&");
        find = find.replace(/\*/g, ".*");
        find = find.replace(/\?/g, ".");
        var regEx = new RegExp(find, "i");
        return regEx.test(this);
    };
}