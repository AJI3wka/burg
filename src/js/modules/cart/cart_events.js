;

'use strict';

console.log('cart.events start');

cart.events = {

	rebind_cart:function(){
		cart.view.wrap.find('.more').unbind('click').click(function(){
			$('header').find('.korzina').trigger('click');
		});
		cart.view.wrap.find('.sld1').find('a').unbind('click').click(function(e){
			e.preventDefault();
			if ($(this).is('.main')) {
				open_from_url($(this).attr('href'),true)
			}
		});
		cart.view.wrap.find('.oforml').unbind('click').click(function(){
			open_from_url('/checkout',true);
		});

	},
    rebind: function() {}

}
