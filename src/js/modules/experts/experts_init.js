;

'use strict';

console.log('experts.init start');

experts.init = function() {
    console.log('experts.init!!!!');
    run_module('helpers');
    experts.events.rebind();
};
experts.init();
