var allow_domains = ['*'];
var ignore_lists;
var ReferrerCatchUp;
(function (ReferrerCatchUp) {
    var Initialize = (function () {
        function Initialize(obj) {
            if (obj !== undefined) {
                allow_domains = obj.allow_domains;
                ignore_lists = obj.ignore_lists;
            }
            var QueryString = this.getQueryString(window.location.href);
            if (!QueryString)
                return;
            this.ankerLoop(QueryString);
        }
        Initialize.prototype.ankerLoop = function (param) {
            var _this = this;
            var ankers = document.getElementsByTagName('a');
            [].map.call(ankers, function (anker) {
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
            if (url.indexOf('?') === -1)
                return '';
            var temp = Array();
            var keys = url.slice(url.indexOf('?') + 1).split('&');
            var params = '';
            [].map.call(keys, function (key) {
                key = key.indexOf('#') !== -1 ? key.substring(0, key.indexOf('#')) : key;
                if (key === '')
                    return;
                temp = key.split('=');
                if (_this.filterReferrer(temp[0])) {
                    params += '&' + temp[0] + '=' + temp[1];
                }
            });
            return params;
        };
        Initialize.prototype.filterReferrer = function (param) {
            if (ignore_lists) {
                for (var _i = 0, ignore_lists_1 = ignore_lists; _i < ignore_lists_1.length; _i++) {
                    var ignore_list = ignore_lists_1[_i];
                    if (param === ignore_list) {
                        return false;
                    }
                }
            }
            return true;
        };
        Initialize.prototype.filterAllowDomain = function (href) {
            for (var _i = 0, allow_domains_1 = allow_domains; _i < allow_domains_1.length; _i++) {
                var allow_domain = allow_domains_1[_i];
                if (allow_domain === '*' || href.indexOf(allow_domain) !== -1) {
                    return true;
                }
            }
            return false;
        };
        return Initialize;
    }());
    ReferrerCatchUp.Initialize = Initialize;
})(ReferrerCatchUp || (ReferrerCatchUp = {}));
