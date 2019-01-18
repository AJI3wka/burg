;

'use strict';

console.log('ls.model start');

var ls = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

ls.model = {

	to_pay:{},
	start_ls:function(){
		ls.model.get_storage();
		ls.model.action_from_url();
		run_module('basket_events');
	},
	action_from_url:function(){
		var $a = $('body');
		var l = $a.attr('data-loaded');


	var $c = $('#cart_wrp').closest('.cart-wrap');	
	var $b = $('body');	
		ls.view.change_main_button();
		if (l != 'cart' && l != 'checkout') {

			$('header').find('.korzina').removeClass('opened');

			$c.removeClass('o_cart').removeClass('o_check');
		    if($c.hasClass('opened')){
		    	$('html,body').scrollTop(0);
		    	$b.removeClass('cart_opened');
		    	$c.animate({
		    		top: '100%'},
		    		250, function() {
		    		$c.removeClass('opened');
		    	});
		    }else{
		    	
		    }    

		}

		if (l == 'card') {

			ls.view.change_cards();

		}else if(l == 'category') {

			ls.view.change_category();

		}else if(l == 'delivery') {

		}else if(l == 'checkout') {

			$b.scrollTop(0);


		    $c.removeClass('o_cart');

		    if($c.hasClass('opened')){


		    	if(!$c.hasClass('o_check')){

			    	$b.removeClass('cart_opened');

			    	$c.animate({
			    		left: '-100%'},
			    		250, function() {

			    		$('html,body').scrollTop(0);
			    		$c.addClass('opened').addClass('o_check');
			    		$b.addClass('cart_opened');
			    	});
		    	}

		    }else{
		    	$c.css('left','-100%');

		    	$c.animate({
		    		top: 0},
		    		250, function() {

		    		$('html,body').scrollTop(0);
		    		$c.addClass('opened').addClass('o_check');
		    		$b.addClass('cart_opened');
		    	});
		    }    

			if(if_defined(checkout)){

    			checkout.view.render_cart();
				checkout.view.render_user_data();
						
			}

		}else if(l == 'cart'){

			$b.scrollTop(0);
		    $c.removeClass('o_check');
		    if($c.hasClass('opened')){

		    	if(!$c.hasClass('o_cart')){

			    	$b.removeClass('cart_opened');

			    	$c.animate({
			    		left: 0},
			    		250, function() {

			    		$('html,body').scrollTop(0);
			    		$c.addClass('opened').addClass('o_cart');
			    		$b.addClass('cart_opened');
			    	});
			    }

		    }else{
		    	

		    	$c.css('left','0%');
		    	$c.animate({
		    		top: 0},
		    		250, function() {
		    		$('html,body').scrollTop(0);
		    		$c.addClass('opened');
		    		$b.addClass('cart_opened');
		    	});
		    }    
			if(if_defined(cart)){

    			cart.view.render();
			}
		}
	},
	clean_storage:function(){
		console.log('clean_storage');
		
		if(if_defined(localStorage['to_pay'])){

			ls.model.to_pay = JSON.parse(localStorage['to_pay']);
		}

		if (if_defined(ls.model.to_pay.last_update)) {


			var timestamp = new Date().getTime();

			if (timestamp-ls.model.to_pay.last_update>24*60*60*1000) {

				ls.model.to_pay.souses = [];
				ls.model.to_pay.burgers = [];
				ls.model.to_pay.garnish = [];
				ls.model.to_pay.drinks = [];

			}

			localStorage['to_pay'] = JSON.stringify(ls.model.to_pay);


		}

	},
	get_storage:function(){
		console.log('get_storage');

		if (!if_defined(localStorage['to_pay'])) {

			ls.model.to_pay = {
				last_update:new Date().getTime(),
				souses:[],
				drinks:[],
				burgers:[],
				garnish:[]
			}
			localStorage['to_pay'] = JSON.stringify(ls.model.to_pay);

		}else{
			ls.model.clean_storage();

			ls.model.to_pay = JSON.parse(localStorage['to_pay']);
		}
	},
	update:function(){


		ls.model.get_storage();


		localStorage['to_pay'] = JSON.stringify(ls.model.to_pay);



	},
	save_storage:function(){
		localStorage['to_pay'] = JSON.stringify(ls.model.to_pay);
		ls.model.start_ls();

	}
};
