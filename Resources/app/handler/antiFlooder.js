(function (namespace, app, globals) {

    var flooders = {};

    namespace.antiFlooder = function (item) {

        clearTimeout(flooders[item.id]);
        flooders[item.id] = setTimeout(function () {

            var handlerParser = new app.handlerParser();
            handlerParser.setHandlers(item.handlers);
            handlerParser.parse();

        }, item.timeout);

    };



    return namespace.antiFlooder;
})(__ARGUMENT_LIST__);