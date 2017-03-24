(function (window) {
    "use strict";

    var __ajaxSetup__ = {}, ajax = {};

    function defaults(target, obj) {
        for (var prop in obj) {
            target[prop] = target[prop] || obj[prop];
        }
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

    function _fetch(url, method, data, settings, httpRequest) {
        var _ = {};

        _.url = url || '';
        _.method = method || 'GET';
        _.data = data || {};
        _.settings = settings || {};
        _.httpRequest = httpRequest || new XMLHttpRequest();

        if (!_.httpRequest) {
            console.log('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        _.before = function (callback) {
            if (callback.call(this) === false) {
                defaults(_.settings, {abort: true});
            }
            return _fetch(_.url, _.method, _.data, _.settings, _.httpRequest);
        };

        _.then = function (callback) {
            if (_.settings.abort && _.settings.abort === true){
                return false;
            }
            defaults(_.settings, __ajaxSetup__);
            _.httpRequest.onreadystatechange = function () {
                if (_.httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (callback && typeof callback == 'function') {
                        var statusText = 'info';
                        if (_.httpRequest.status >= 200) {
                            statusText = 'success';
                        }
                        if (_.httpRequest.status >= 300) {
                            statusText = 'warning';
                        }
                        if (_.httpRequest.status >= 400) {
                            statusText = 'danger';
                        }
                        callback.call(this, statusText, _.httpRequest.response);
                    }
                }
            };
            if (_.method == 'GET') {
                _.url = [_.url, getQuery(_.data || {}).join('&')].join('?');
                _.data = {};
            }
            _.httpRequest.open(_.method, _.url);
            _.httpRequest.responseType = 'json';
            _.settings.headers = _.settings.headers || {};
            defaults(_.settings.headers, {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            });
            for (var prop in _.settings.headers) {
                _.httpRequest.setRequestHeader(prop, _.settings.headers[prop]);
            }

            _.httpRequest.send(getQuery(_.data || {}).join('&'));
        };

        return _;
    }

    ajax.setup = function(settings){
        defaults(__ajaxSetup__, settings);
    };

    ajax.get = function(url, data){
        return new _fetch(url, 'GET', data);
    };

    ajax.post = function(url, data){
        return new _fetch(url, 'POST', data);
    };

    ajax.put = function(url, data){
        return new _fetch(url, 'PUT', data);
    };

    ajax.patch = function(url, data){
        return new _fetch(url, 'PATCH', data);
    };

    ajax['delete'] = function(url, data){
        return new _fetch(url, 'DELETE', data);
    };

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