import PubSub from 'ModulePath/PubSub';
import * as Utility from 'LibrariesPath/Utilities/Utility';

export default function BaseController() {
    this.registerController = function(controller) {
        if (!controller || Object.getOwnPropertyNames(controller).length <= 0) {
            return;
        }

        if (!/Chrome/.test(navigator.userAgent) && !/Google Inc/.test(navigator.vendor)) {
            document.body.innerHTML = '<h1 class="text-muted display-1 text-center">Sorry Folks!!! Change your browser. App is not supported in ' + navigator.userAgent + '</h1>';
            return;
        }

        window.App = window.App || {};
        App.Hook = App.Hook || {};
        App.Hook.PubSub = new PubSub();

        if (controller.preprocess) {
            controller.preprocess(controller);
        }

        if (controller.render) {
            controller.render(controller);
        }

        Utility.addEventListener(document, 'readystatechange', function() {
            if (document.readyState === 'complete' && controller.ready) {
                controller.ready(controller);
            }
        });
    };
}
