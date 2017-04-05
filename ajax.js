(function (window) {
    "use strict";

    function Ajax() {
        this.__ajaxSetup__ = {};
        this.url = '';
        this.method = 'get';
        this.data = {};
        this.settings = {};
    }

    function merge(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    }

    function getQuery(queryParams, prefix) {
        var query = [];
        prefix = prefix || '';
        if (Object.prototype.toString.call(queryParams) == '[object Array]') {
            queryParams.forEach(function (param, i) {
                getQuery(param, prefix + '[' + i + ']').forEach(function (obj) {
                    query.push(obj);
                });
            });
        } else if (Object.prototype.toString.call(queryParams) == '[object Object]') {
            for (var prop in queryParams) {
                getQuery(queryParams[prop], prefix == '' ? prop : prefix + '[' + prop + ']').forEach(function (param) {
                    query.push(param);
                });
            }
        } else {
            query.push([prefix, encodeURIComponent(queryParams)].join('='));
        }
        return query;
    }

    Ajax.prototype.setup = function (settings) {
        this.__ajaxSetup__ = merge(this.__ajaxSetup__, settings);
    };

    Ajax.prototype.create = function (url, method, data, settings) {
        this.url = url || '';
        this.method = method || 'get';
        this.data = data || {};
        this.settings = settings || {};
    };


    ['get', 'post', 'put', 'patch', 'delete'].forEach(function (method) {
        Ajax.prototype[method] = function (url, data, settings) {
            this.create(url, method, data, settings);
            return this;
        };
    });

    Ajax.prototype.then = function (callback) {
        var xhr = new XMLHttpRequest();
        var self = this;
        if (!xhr) {
            console.log('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        self.settings = merge(self.settings, self.__ajaxSetup__);
        if (self.method == 'get') {
            self.url = [self.url, getQuery(self.data || {}).join('&')].join('?');
            self.data = {};
        }

        self.settings.events = self.settings.events || {};
        for (var event in self.settings.events) {
            xhr.addEventListener(event, function(evt){
                self.settings.events[event].call(self, evt);
            });
        }
        self.settings.uploadEvents = self.settings.uploadEvents || {};
        for (var event in self.settings.uploadEvents) {
            xhr.upload.addEventListener(event, function(evt){
                self.settings.uploadEvents[event].call(self, evt);
            });
        }

        xhr.open(self.method, self.url);
        xhr.responseType = self.settings.responseType || 'json';
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var statusText = 'info';
                if (xhr.status >= 200) {
                    statusText = 'success';
                }
                if (xhr.status >= 300) {
                    statusText = 'warning';
                }
                if (xhr.status >= 400) {
                    statusText = 'error';
                }
                try {
                    var data = JSON.parse(xhr.response);
                    callback.call(self, statusText, data);
                } catch (e) {
                    callback.call(self, statusText, xhr.response);
                }
            }
        };
        self.settings.headers = self.settings.headers || {};
        if (self.settings.contentType !== false) {
            self.settings.headers = merge(self.settings.headers, {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            });
        }
        for (var prop in self.settings.headers) {
            xhr.setRequestHeader(prop, self.settings.headers[prop]);
        }

        xhr.send(self.settings.contentType === false ? self.data : getQuery(self.data || {}).join('&'));
    };

    var ajax = new Ajax();

    // Support CommonJS, AMD & browser
    if (typeof exports === 'object') {
        module.exports = ajax;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return ajax;
        });
    } else {
        window.ajax = ajax;
    }

})(typeof window != 'undefined' ? window : undefined);