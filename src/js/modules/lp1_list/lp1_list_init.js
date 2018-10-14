;

'use strict';

console.log('lp1_list.init start');

lp1_list.init = function() {
    console.log('lp1_list.init!!!!');
    lp1_list.view.wrap = $('#user-list');
    // lp1_list.events.rebind();
	    lp1_list.controller.get_list(function(data){
	    	lp1_list.view.refresh_list(data);
	    });
};
lp1_list.init();
