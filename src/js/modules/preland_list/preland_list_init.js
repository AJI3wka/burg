;

'use strict';

console.log('preland_list.init start');

preland_list.init = function() {
    console.log('preland_list.init!!!!');
    preland_list.view.wrap = $('#preland-list');
    // preland_list.events.rebind();
    
	    preland_list.controller.get_list(function(data){
	    	preland_list.view.refresh_list(data);
	    });
};
preland_list.init();
