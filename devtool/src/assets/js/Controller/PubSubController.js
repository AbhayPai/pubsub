require('SassPath/pubsub.scss');

import View from 'ModulePath/View';
import BaseController from 'ControllerPath/BaseController';

new BaseController().registerController({
    preprocess: function() {
        App.Hook.PubSub.subscribe('globalClick', function (data) {
            // eslint-disable-next-line no-console
            console.log(`call ${data.callback} api`, data);
        });
    },

    render: function() {
        new View({
            selectorId: 'app',
            templateName: 'PubSub',
        }).render();
    },

    ready: function() {
        let buttonIds = ['#login', '#signup', '#unknownSelector'];

        buttonIds.forEach(function(item) {
            document.querySelector(item) ?
                document.querySelector(item).addEventListener('click',
                    function (event) {
                        event.preventDefault();
                        App.Hook.PubSub.publish('globalClick', {
                            target: event.target,
                            callback: event.target.innerText || ''
                        });
                    }
                )
                : '';
        });
    }
});
