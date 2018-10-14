;

'use strict';

console.log('a_list.init start');

a_list.init = function() {
    console.log('a_list.init!!!!');
    a_list.view.wrap = $('#user-campaign-list');
    // a_list.events.rebind();
    a_list.controller.get_list(function(data){
    	a_list.view.refresh_list(data);
    });
};
a_list.init();
