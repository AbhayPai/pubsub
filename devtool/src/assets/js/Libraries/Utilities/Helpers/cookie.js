/**
 * Cookies component
 */
export default (function () {
    var Cookie = {};

    /**
     * Gets a cookie by name
     *
     * @param string name
     *
     * @return string
     */
    Cookie.getCookie = function (name) {
        var cookieName = name + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(cookieName) === 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
    };

    /**
     * Remove a cookie by name
     *
     * @param string name
     * @param string path
     */
    Cookie.removeCookie = function (name, path) {
        path = path || '/';

        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=' + path + ';';
    };

    /**
     * Sets a cookie by name
     */
    Cookie.setCookie = function (cname, cvalue, time, path) {
        path = path || '/';

        var expires = '';

        if (time) {
            expires = 'expires=' + time + ';';
        }

        document.cookie = cname + '=' + cvalue + ';' + expires + 'path=' + path;
    };

    return Cookie;
})();
