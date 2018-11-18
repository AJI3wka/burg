;

'use strict';

console.log('delivery.view start');


delivery.view = {
	render_static:function(){
		var $w = $('.sec1');

		var rend = function(){
			
			$w.find('#del-s').html(global_delivery_price);
			$w.find('#del').html(global_delivery_min_cart);
			$w.find('#del2').html(global_max_cache);
		}

		if (global_delivery_price) {
			rend();
		}else{
			get_site_settings(rend)
		}
	}

}
