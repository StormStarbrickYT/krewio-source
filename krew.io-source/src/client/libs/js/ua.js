(function (c, d) {
    function a(f) {
        return function () {
            return f.test(e)
        }
    }
    var e = c.navigator && d.userAgent || "",
        b = {
            isChrome: a(/webkit\W.*(chrome|chromium)\W/i),
            isFirefox: a(/mozilla.*\Wfirefox\W/i),
            isGecko: a(/mozilla(?!.*webkit).*\Wgecko\W/i),
            isIE: function () {
                return "Microsoft Internet Explorer" === d.appName ? !0 : a(/\bTrident\b/) ? !0 : !1
            },
            isKindle: a(/\W(kindle|silk)\W/i),
            isMobile: a(/(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i),
            isOpera: a(/opera.*\Wpresto\W|OPR/i),
            isSafari: a(/webkit\W(?!.*chrome).*safari\W/i),
            isTablet: a(/(ipad|android(?!.*mobile)|tablet)/i),
            isTV: a(/googletv|sonydtv/i),
            isWebKit: a(/webkit\W/i),
            isAndroid: a(/android/i),
            isIOS: a(/(ipad|iphone|ipod)/i),
            isIPad: a(/ipad/i),
            isIPhone: a(/iphone/i),
            isIPod: a(/ipod/i),
            whoami: function () {
                return e
            }
        };
    "function" === typeof define && define.amd ? define([], function () {
        return b
    }) : "undefined" !== typeof module && module.exports ? (module.exports = b.attach, module.exports.UA = b) : c.UA = b
})(window, navigator);