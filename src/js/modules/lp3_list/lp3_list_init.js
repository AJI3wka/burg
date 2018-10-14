;

'use strict';

console.log('lp3_list.init start');

lp3_list.init = function() {
    console.log('lp3_list.init!!!!');
    lp3_list.view.wrap = $('#lp3-user-list');
    // lp3_list.events.rebind();
    lp3_list.controller.get_list(function(data){
    	lp3_list.view.refresh_list(data);
    });
};
lp3_list.init();
