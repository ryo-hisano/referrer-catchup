var ReferrerCatchUp = (function () {
    function ReferrerCatchUp(obj) {
        this.allowDomains = ['*'];
        this.ignoreLists = [];
        if (obj !== undefined) {
            this.allowDomains = obj.allow_domains;
            if (obj.ignore_lists !== null) {
                this.ignoreLists = obj.ignore_lists;
            }
        }
        var QueryString = this.getQueryString(window.location.href);
        if (!QueryString) {
            return;
        }
        this.ankerLoop(QueryString);
    }
    ReferrerCatchUp.prototype.ankerLoop = function (param) {
        var _this = this;
        var ankers = document.getElementsByTagName('a');
        Array.prototype.map.call(ankers, function (anker) {
            var href = anker.href;
            if (_this.filterAllowDomain(href) && /^https?(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/.test(href)) {
                if (anker.href.indexOf('?') === -1) {
                    anker.href += '?' + param.slice(1);
                }
                else {
                    anker.href += param;
                }
            }
        });
    };
    ReferrerCatchUp.prototype.getQueryString = function (url) {
        var _this = this;
        if (url.indexOf('?') === -1) {
            return '';
        }
        var temp = Array();
        var keys = url.slice(url.indexOf('?') + 1).split('&');
        var params = '';
        Array.prototype.map.call(keys, function (key) {
            key = key.indexOf('#') !== -1 ? key.substring(0, key.indexOf('#')) : key;
            if (key === '') {
                return;
            }
            temp = key.split('=');
            if (_this.filterReferrer(temp[0])) {
                params += '&' + temp[0] + '=' + temp[1];
            }
        });
        return params;
    };
    ReferrerCatchUp.prototype.filterReferrer = function (param) {
        if (this.ignoreLists) {
            for (var _i = 0, _a = this.ignoreLists; _i < _a.length; _i++) {
                var ignoreList = _a[_i];
                if (param === ignoreList) {
                    return false;
                }
            }
        }
        return true;
    };
    ReferrerCatchUp.prototype.filterAllowDomain = function (href) {
        for (var _i = 0, _a = this.allowDomains; _i < _a.length; _i++) {
            var allowDomain = _a[_i];
            if (allowDomain === '*' || href.indexOf(allowDomain) !== -1) {
                return true;
            }
        }
        return false;
    };
    return ReferrerCatchUp;
}());
