(function(src, filepath) {
    var currentPath = require("path").resolve().split("\\").join("/");

    var path = filepath.substr(0, filepath.length - 5).replace(currentPath, "");


    return "@import '.."+path+"'; \n";
});