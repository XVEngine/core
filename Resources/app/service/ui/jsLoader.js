/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function (namespace, app, globals) {

    app.registerService(function () {
        namespace.jsLoader = new namespace.jsLoader();
    });


    /**
     *
     * @returns {undefined}
     */
    namespace.jsLoader = function () {
        this.loadedFiles = [];
    };


    /**
     *
     * @returns {String}
     */
    namespace.jsLoader.prototype.load = function (files) {
        var self = this;
        if (typeof files == "string") {
            files = [files];
        }

        var worker = Q.fcall(function () {
            return true;
        });

        files.forEach(function (file) {
            worker = worker.then(function () {
                return self._load(file);
            });

        });

        return worker;
    };


    /**
     *
     * @param {String} file
     * @returns {Q.promise}
     * @private
     */
    namespace.jsLoader.prototype._load = function (file) {
        var deferred = Q.defer();

        for (i = 0; i < this.loadedFiles.length; i++) {
            if (this.loadedFiles[i] === file) {
                deferred.resolve();
                return deferred.promise;
            }
        }


        var self = this;
        $.getScript(file)
            .done(function () {
                self.loadedFiles.push(file);
                deferred.resolve();
            });
        return deferred.promise
    };


    namespace.jsLoader.prototype.loadString = function (string) {
        if (string) {
            try {
                eval(string);
            } catch (e) {
                console.error(e);
            }
        }
        return true;
    };


    return namespace.jsLoader;
})(__ARGUMENT_LIST__);