(function(src, filepath) {


    var className = filepath.split("/app/").pop(); //this must be done better


    className = className.substr(0, className.length-3);
    var splited = className.split('/');
    var __CLASS__ = "app."+splited.join('.');
    splited.pop();

    className = splited.join('.');
    
    var __ARGUMENT_LIST__ = (className ? "app.namespace('"+className+"')" : "app" )+", app, window";
    
    src = src.replace(/__ARGUMENT_LIST__/g, __ARGUMENT_LIST__);
    
    var sourceArray = src.split("\n");
    var lastMehtod = "undefined";
    
    sourceArray.forEach(function(line, i){
        
        
        /**
         * For methods in class
         */
        var regExp = /namespace\.[A-Za-z0-9]+\.prototype.([A-Za-z0-0]+)\s*\=\s*(function)/gi;
        var res = regExp.exec(line);
        if(res){
            lastMehtod = res[1];
        }
        
        /**
         * For static
         */
        var regExp = /namespace\.[A-Za-z0-9]+\.([A-Za-z0-0]+)\s*\=\s*(function)/gi;
        var res = regExp.exec(line);
        if(res){
            lastMehtod = res[1];
        }
        
        /**
         * For constructor
         */
        var regExp = /namespace\.([A-Za-z0-0]+)\s*\=\s*(function)/gi;
        var res = regExp.exec(line);
        if(res){
            lastMehtod = "constructor";
        }
        
        
        var stringify = JSON.stringify({
            "className" : __CLASS__,
            "line" : i,
            "method" : lastMehtod
        });
        stringify  = "("+stringify+")";
        line = line.replace(/__PATH__/g, stringify);
        sourceArray[i] = line;
    });
    src = sourceArray.join("\n");
    
    /**
     * Replace app.utils.getString 
     */
    var re = /\/\*\*<string[^>]*>([\s\S]*?)<\/string>\*\//ig;
    src = src.replace(re, function(all, part1, part2){
        return "return "+JSON.stringify(part1.trim())+";";
    });
    return src;
});