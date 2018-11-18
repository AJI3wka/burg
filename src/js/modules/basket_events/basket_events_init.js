;

'use strict';

console.log('basket_events.init start');

basket_events.init = function() {
    console.log('basket_events.init!!!!');
    basket_events.view.wrap = $('body');

    basket_events.model.start_from_url();

    basket_events.events.rebind();
};
basket_events.init();
