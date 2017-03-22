(function (window) {
    var __ajaxSetup__ = {};

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

    function ajax(settings) {
        var opts = settings || {};
        defaults(opts, __ajaxSetup__);

        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            console.log('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        if (opts.beforeSend && opts.beforeSend.call(this, httpRequest, opts) === false) {
            httpRequest.abort();
            return false;
        }

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    if (opts.success && typeof opts.success == 'function') {
                        opts.success.call(this, httpRequest.response, httpRequest.status, httpRequest);
                    }
                } else {
                    if (opts.error && typeof opts.error == 'function') {
                        opts.error.call(this, httpRequest, httpRequest.status);
                    }
                }
                if (opts.complete && typeof opts.complete == 'function') {
                    opts.complete.call(this, httpRequest, httpRequest.status);
                }
            }
        };

        httpRequest.open(opts.method, opts.url);
        httpRequest.responseType = 'json';
        opts.headers = opts.headers || {};
        defaults(opts.headers, {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        });
        for (var prop in opts.headers) {
            httpRequest.setRequestHeader(prop, opts.headers[prop]);
        }

        httpRequest.send(getQuery(opts.data || {}).join('&'));
    }

    ajax.setup = function (settings) {
        defaults(__ajaxSetup__, settings);
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