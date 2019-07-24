/**
 * Create a link base on 2 params (data)
 * text = anchor/title
 * url = url
 */
module.exports = function (text, url) {
    return "<a href='" + url + "' title='" + text + "'>" + text + "</a>";
};
