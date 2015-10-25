/**
 * Bootstrap class
 * @param {object} namespace
 * @param {object} app
 * @param {window} globals
 * @returns {object}
 */
(function(namespace, app, globals) {

    app.registerService(function() {
        namespace.tab = new namespace.tab();
    });


    /**
     * 
     * @returns {undefined}
     */
    namespace.tab = function() {
        this.openedTabs = [];
        this.createTime = globals.moment().format("X");

        this.setCurrentTabID(app.utils.getRandomString(12));
        this.setInterval(800);
        this.initEvents();
    };




    /**
     * 
     * @returns {String}
     */
    namespace.tab.prototype.getCurrentTabID = function(){
        return this._tabID;
    };


    /**
     * 
     * @param {String} tabID
     * @returns {tab_L8.namespace.tab.prototype}
     */
    namespace.tab.prototype.setCurrentTabID = function(tabID){
        this._tabID = tabID;
        return this;
    };


    /**
     * 
     * @param {Number} time
     * @returns {ticker_L8.namespace.refresher.prototype}
     */
    namespace.tab.prototype.setInterval = function(time){
        var self = this;
        this.interval = time;
        clearInterval(this._interval);
        if(!time){
           return this; 
        }
        self.tick();
        this._interval = setInterval(function(){
            self.tick();
        }, time);
        return this;
    };
    


    /**
     * 
     * @returns {undefined}
     */
    namespace.tab.prototype.tick = function(){
        var self = this;
        var tabs = this.getTabs();
        this.openedTabs = [];
        var now = globals.moment().format("X");
        tabs.forEach(function(item){
            var diff = now - item.lastPingTimestamp;
            if(diff > 1){
                return;
            }
            if(item.id == self.getCurrentTabID()){
                return;
            }
            self.openedTabs.push(item);
        });
        
        
        this.openedTabs.push({
            "id" : this.getCurrentTabID(),
            "lastPingTimestamp" : now,
            "createTimestamp" : this.createTime,
            "url" : globals.location.href
        });
        
        this.setTabs(this.openedTabs);
    };
    
    /**
     * 
     * @returns {Array|Number.tab.prototype.getTabs.tabs|Object}
     */
    namespace.tab.prototype.getTabs = function(){
        var tabs = JSON.parse(globals.localStorage.getItem(__PATH__.className+"_tabs"));
        if(!tabs){
            tabs = [];
        }
        return tabs;
    };
    
    /**
     * 
     * @param {type} tabs
     * @returns {tab_L8.namespace.tab.prototype}
     */
    namespace.tab.prototype.setTabs = function(tabs){
        tabs.sort(function(a, b) {return a.createTimestamp - b.createTimestamp;});
        globals.localStorage.setItem(__PATH__.className+"_tabs", JSON.stringify(this.openedTabs));
        return this;
    };
    
    
    
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.tab.prototype.isOldestTab = function(tabID){
        if(typeof tabID === "undefined"){
            tabID = this.getCurrentTabID();
        }
        if(!this.openedTabs[0]){
           return false; 
        }
        return this.openedTabs[0].id == tabID;
    };
    
    
    /**
     * Temporary funciton... will be remove
     * @returns {undefined}
     */
    namespace.tab.prototype.displayMessage = function(){
        $(document).avgrund({
            openOnEvent: false,
                height: 110,
                showClose: true,
                showCloseText: 'Close',
                closeByEscape: true,
                closeByDocument : true,
                template: '<div style="padding: 15px; padding-bottom: 30px">Please close other tabs. Now your timer is stopped.</div>'
        });
    };
    
    
    
    namespace.tab.prototype.removeSelf = function(){
        var self = this;
        var tabs = this.getTabs();
        this.openedTabs = [];
        var now = globals.moment().format("X");
        tabs.forEach(function(item){
            var diff = now - item.lastPingTimestamp;
            if(diff > 1){
                return;
            }
            if(item.id == self.getCurrentTabID()){
                return;
            }
            self.openedTabs.push(item);
        });
        
        this.setTabs(this.openedTabs);
    };
    
    
    /**
     * Temporary funciton... will be remove
     * @returns {undefined}
     */
    namespace.tab.prototype.initEvents = function(){
        var self = this;
        $(globals).on("beforeunload", function(){
            self.setInterval(0);
            self.removeSelf();
        });
    };
    
    
    
    return namespace.tabs;
})(__ARGUMENT_LIST__);