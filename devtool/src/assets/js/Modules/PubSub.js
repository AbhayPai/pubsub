/*
 *      Example Usage
 *      App.Hook.PubSub.subscribe('subscribeToAppFirst',
 *          function functionName(data) {
 *              your definition
 *          }
 *      );
 *
 *      App.Hook.PubSub.publish('subscribeToAppFirst', unlimited,
 *          params, are, allowed, here
 *      );
 *
 *      App.Hook.PubSub.unPublish('subscribeToAppFirst');
 *
 */
export default function PubSub() {
    'use strict';

    let events = {};

    function subscribe(eventName, fn) {
        if(typeof eventName !== "string") {
            throw new Error("First parameter must be a string");
        }

        if (typeof fn !== 'function') {
            throw new Error('Second parameter must be a function.');
        }

        // if(fn.name === '') {
        //     throw new Error('Function cannot be annonymous');
        // }

        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
    }

    function unPublish(eventName) {
        if (events[eventName]) {
            for (var i = 0; i < events[eventName].length; i++) {
                if (typeof events[eventName][i] === 'function') {
                    events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }

    function publish(eventName, data) {
        if (typeof data !== 'object') {
            throw new Error(`Publish argument should be object`);
        }

        if (events[eventName]) {
            events[eventName].forEach(function(fn) {
                fn(data);
            });
        } else {
            throw new Error(`Publisher "${eventName}" not found`);
        }
    }

    return {
        publish: publish,
        subscribe: subscribe,
        unPublish: unPublish
    };
}
