;

'use strict';

console.log('checkout.view start');


checkout.view = {
	render_cart:function(){


		var summ = 0;
		var list_html = '';
		for(var key in ls.model.to_pay){
			if(ls.model.to_pay.hasOwnProperty(key)){
				if(Array.isArray(ls.model.to_pay[key])){
					
					for (var i = 0; i < ls.model.to_pay[key].length; i++) {
						if (ls.model.to_pay[key][i].count>0) {
					
							var lot_price = ls.model.to_pay[key][i].price*ls.model.to_pay[key][i].count;
							summ+=lot_price;

							list_html+='<div class="pos" data-category="'+key+'" data-id="'+ls.model.to_pay[key][i].id+'">';
							list_html+='<div class="close"></div>';
							list_html+='<div class="l_z">';
							list_html+='<div class="img_wrap">';
							list_html+='<img src="'+ls.model.to_pay[key][i].img+'" alt="">';
							list_html+='</div>';
							list_html+='<div class="n_info">';
							list_html+='<p class="h5">'+ls.model.to_pay[key][i].name+'</p>';
							list_html+='<div class="netto">'+ls.model.to_pay[key][i].weight;
							if (key !='drinks') {

								list_html+=' г';
							}else{
								list_html+=' л';
							}

							list_html+='</div>';
							list_html+='</div>';
							list_html+='</div>';
							list_html+='<div class="r_z">';
							list_html+='<p class="cina">'+lot_price+' грн</p>';
							list_html+='<div class="num">';
							list_html+='<button class="minus_w"></button>';
							list_html+='<p class="howmuch">'+ls.model.to_pay[key][i].count+'</p>';
							list_html+='<button class="plus_w"></button>';
							list_html+='</div>';
							list_html+='</div>';
							list_html+='</div>';
						}					
					}
				}
			}
		}
		if (summ>0) {

			checkout.view.wrap.find('.cart').show().find('.list').html(list_html);
			checkout.view.wrap.find('.empty').hide();
			if (summ>global_delivery_min_cart) {
				checkout.view.wrap.find('.itogo').find('.dstv').find('span').html(0);
				checkout.view.wrap.find('.itogo').find('.oplt').find('span').html(summ);
			}else{
				checkout.view.wrap.find('.itogo').find('.dstv').find('span').html(global_delivery_price);
				
				checkout.view.wrap.find('.itogo').find('.oplt').find('span').html(global_delivery_price+summ);
			}

			checkout.view.wrap.find('.infm').removeClass('disactive');
		}else{

			checkout.view.wrap.find('.cart').hide();
			checkout.view.wrap.find('.empty').show();
			checkout.view.wrap.find('.infm').addClass('disactive');

		}
		checkout.view.render_pay_type(summ);
		checkout.events.rebind_cart();

	},
	render_pay_type:function(summ){

		var $p = checkout.view.wrap.find('.pay').find('.inp-wrap');

		$p.find('input').val('none');
		$p.removeClass('error-input');

		$p.find('.tog').removeClass('active').removeClass('disactive');

		if (summ>=global_max_cache) {
			$p.find('.gotivka').addClass('disactive');
		}

	},
	render_user_data:function(){
		var inf = checkout.view.wrap.find('.infm');

		if(ls.model.hasOwnProperty('user_data')){
			for(var key in ls.model.user_data){
				if(ls.model.user_data.hasOwnProperty(key)){
					
					inf.find('input[name="'+key+'"],textarea[name="'+key+'"]').val(ls.model.user_data[key]);


				}
			}
		}

		run_module('map');
		checkout.events.rebind_checkout();

	}

}
