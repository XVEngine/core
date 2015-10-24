(function (namespace, app, globals) {

    namespace.when = function (item) {
        var self = this;
        this.worker = Q.defer();
        this.whenList = item.when;
        this.promise = this.worker.promise;

        this.parseWhenList(this.whenList).fin(function () {
            self.worker.resolve();
        });

    };



    namespace.when.prototype.parseWhenList = function () {
        var self = this;
        var worker = app.utils.getResolved();
        this.whenList.forEach(function (value) {
            worker = worker.then(function () {
                return self.parse(value);
            });
        });
        return worker;
    };



    namespace.when.prototype.parse = function (when) {

        return this.checkWhen(when.when).then(function (result) {
            var handler = result ? when.then : when.fail;
            
            if(!handler){
                return true;
            }
            
            var handlerParser = new app.handlerParser();
            handlerParser.setHandlers([handler]);
            return handlerParser.parse();
            
        }).fail(function () {
            console.error(arguments);
        });
    };

    namespace.when.prototype.expresions = {
        "isEqual": function (item) {
            return Q.spread([this.getValue(item.param1), this.getValue(item.param2)], function (param1, param2) {
                return param1 == param2;
            });
        },
        "isNotEqual": function (item) {
            return Q.spread([this.getValue(item.param1), this.getValue(item.param2)], function (param1, param2) {
                return param1 != param2;
            });
        },
        "isLess": function (item) {
            return Q.spread([this.getValue(item.param1), this.getValue(item.param2)], function (param1, param2) {
                return parseFloat(param1) < parseFloat(param2);
            });
        },
        "isPositive": function (item) {
            return Q.spread([this.getValue(item.param1)], function (param1) {
                return !!param1;
            });
        },
        "isNegative": function (item) {
            return Q.spread([this.getValue(item.param1)], function (param1) {
                return !param1;
            });
        },
        "isEmpty": function (item) {
            return Q.spread([this.getValue(item.param1)], function (param1) {
                var bool = !!param1;;
                if(!bool){
                    return true;
                }
                if(typeof param1.length === 0){
                    return true;
                }

                return  false;
            });
        },

        "inArray": function (item) {
            return Q.spread([this.getValue(item.param1), this.getValue(item.param2)], function (param1, param2) {
                if(!param2.forEach){
                    return false;
                }

                var result = false;


                param2.forEach(function(item){
                    if(item == param1){
                        result = true;
                        return false;
                    }
                });

                return result;
            });
        }
    };

    /**
     * 
     * @param {type} value
     * @returns {unresolved}
     */
    namespace.when.prototype.getValue = function (value) {
        return app.utils.getValue(value);
    };


    /**
     * 
     * @param {type} when
     * @returns {unresolved}
     */
    namespace.when.prototype.checkWhen = function (when) {
        var self = this;
        var worker = app.utils.getResolved(true);
        when.forEach(function (item) {
            worker = worker.then(function (lastResult) {
                if (!lastResult) {
                    return false;
                }

                var func = self.expresions[item.type];
                if (!func) {
                    return true;
                }

                return func.apply(self, [item]);
            });
        });

        worker = worker.then(function (lastResult) {
            return !!lastResult;
        });

        return worker;
    };



    return namespace.when;
})(__ARGUMENT_LIST__);