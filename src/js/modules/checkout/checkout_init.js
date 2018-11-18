;

'use strict';

console.log('checkout.init start');

checkout.init = function() {
    console.log('checkout.init!!!!');
    run_module('menu');

    $('header').find('.korzina').addClass('opened');
    checkout.view.wrap = $('.sec1');
    
    checkout.events.rebind();

	if (global_delivery_price) {
		
		run_module('ls');	

			checkout.view.wrap.find('#del').html(global_max_cache);
	}else{
		get_site_settings(function(){

			checkout.view.wrap.find('#del').html(global_max_cache);
    		run_module('ls');
    		
		})
	}

};
checkout.init();
