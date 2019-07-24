export default function View(config) {
    'use strict';

    var selectorId = document.getElementById(config.selectorId);

    function render() {
        var message = {};

        try {
            if (selectorId) {
                selectorId.innerHTML = require('ViewPath/Templates/Handlebars/' +
                    config.templateName + '.handlebars')(config.templateData);

                message = {
                    code: 'rendering of template ' + config.templateName +'.handlebars is success.'
                };
            } else {
                message = {
                    code: 'rendering of template ' + config.templateName +'.handlebars is failed.'
                };

                throw new Error(config.selectorId + ' Selector of handlebar does not exist.');
            }
        } catch(e) {
            throw new Error(e);
        }

        return message;
    }

    return {
        render: render,
    };
}
