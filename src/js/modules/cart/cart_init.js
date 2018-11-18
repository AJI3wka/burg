;

'use strict';

console.log('cart.init start');

cart.init = function() {
    console.log('cart.init!!!!');
    run_module('menu');

    $('header').find('.korzina').addClass('opened');
    cart.view.wrap = $('.sec1');

    var $c = $('#cart_wrp').closest('.cart-wrap');
    if($c.hasClass('opened')){

    }else{
    	$c.animate({
    		bottom: 0},
    		250, function() {
    		$c.addClass('opened');
    	});
    }
    
    cart.events.rebind();


	if (global_delivery_price) {
		
		run_module('ls');	
	}else{
		get_site_settings(function(){

    		run_module('ls');
    		
		})
	}

};
cart.init();
