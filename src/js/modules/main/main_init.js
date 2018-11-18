;

'use strict';

console.log('main.init start');

main.init = function() {
    console.log('main.init!!!!');
    run_module('menu');

    main.view.wrap = $('.sec1');

    run_module('ls');
    if(getURLParameter('pay')=='suc'){
		localStorage.removeItem('to_pay');
		open_from_url('/thanks',true);    	
    }
    main.events.rebind();
};
main.init();
