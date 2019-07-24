var ReferrerCatchUp;
(function (ReferrerCatchUp) {
    var Initialize = (function () {
        function Initialize(obj) {
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
        Initialize.prototype.ankerLoop = function (param) {
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
        Initialize.prototype.getQueryString = function (url) {
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
        Initialize.prototype.filterReferrer = function (param) {
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
        Initialize.prototype.filterAllowDomain = function (href) {
            for (var _i = 0, _a = this.allowDomains; _i < _a.length; _i++) {
                var allowDomain = _a[_i];
                if (allowDomain === '*' || href.indexOf(allowDomain) !== -1) {
                    return true;
                }
            }
            return false;
        };
        return Initialize;
    }());
    ReferrerCatchUp.Initialize = Initialize;
})(ReferrerCatchUp || (ReferrerCatchUp = {}));
