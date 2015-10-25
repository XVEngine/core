(function (namespace, app, globals) {

    app.registerService(function () {
        namespace.opener = new namespace.opener();
    });


    /**
     *
     * @returns {undefined}
     */
    namespace.opener = function () {

    };


    /**
     * Tak, zrobmy tutaj 10000000000 parametorw.... nie ogarniaczajmy sie, przeciez po to sa parametry by przekazywac do nich 100000000 parametrow, a obiekt JSON jest nam nie znany!
     * @returns {String}
     */
    namespace.opener.prototype.openPopUp = function (url, windowName, width, height, options, onClose) {
        width = width ? width : 600;
        height = height ? height : 400;
        var left = (screen.width - width) / 2;
        var top = (screen.height - height) / 2;
        if(options && options != "") {
            options = options + ",";
        } else {
            options = "";
        }
        var win = window.open(url, windowName, options+"width="+width+",height="+height+", top="+top+", left="+left);


        var checker = function () {
            if (!win.closed) {
                setTimeout(checker, 150);
                return true;
            }


            var handlerParser = new app.handlerParser();
            handlerParser.setHandlers(onClose);
            handlerParser.parse();
            return true;
        };


        onClose && onClose.forEach && checker();
    };




    /**
     *
     * @returns {String}
     */
    namespace.opener.prototype.openFile = function (file, windowName, options) {
        var url = URL.createObjectURL(file);
        return this.openPopUp(url, windowName, options);
    };

    /**
     *
     * @returns {String}
     */
    namespace.opener.prototype.open = function (url) {
        var a = window.document.createElement("a");
        a.target = '_blank';
        a.href = url;

        // Dispatch fake click
        var e = window.document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);

        return true;
    };


    namespace.opener.prototype.redirect = function (url) {
        location.href = url;
        return true;
    };



    return namespace.opener;
})
(__ARGUMENT_LIST__);