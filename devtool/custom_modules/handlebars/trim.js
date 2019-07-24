/**
 * Transform any text data to lowercase and
 * concatenate it with dash (-) when whitespace is present
 */
module.exports = function (data) {
    var str = data.toLowerCase(),
        trimmed = str.split(" "),
        joined = trimmed.join("-");

    return joined;
};
