;

'use strict';

console.log('lot_list.init start');

lot_list.init = function() {
    console.log('lot_list.init!!!!');
    run_module('menu');

    lot_list.view.wrap = $('#main_cont .sec1');


    lot_list.events.rebind();
    lot_list.model.run_from_url();
};
lot_list.init();
