/**
 * Stripes helper
 */
module.exports = function (conditional, options) {
    return conditional % 2 === 0 ? options.fn(this) : options.inverse(this);
};
