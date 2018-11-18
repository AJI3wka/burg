;

'use strict';

console.log('delivery.init start');

delivery.init = function() {
    console.log('delivery.init!!!!');

    run_module('menu');

    run_module('ls');
    run_module('map');

    delivery.view.render_static();

    delivery.events.rebind();
};
delivery.init();
