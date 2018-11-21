;

'use strict';

console.log('cart.view start');


cart.view = {

	render:function(){
		var summ = 0;
		var list_html = '';
		for(var key in ls.model.to_pay){
			if(ls.model.to_pay.hasOwnProperty(key)){
				if(Array.isArray(ls.model.to_pay[key])){
					
					for (var i = 0; i < ls.model.to_pay[key].length; i++) {
						if (ls.model.to_pay[key][i].count>0) {
					
							var lot_price = ls.model.to_pay[key][i].price*ls.model.to_pay[key][i].count;
							summ+=lot_price;

							var name = 'Бургер ';
							if(key == 'souses'){
								name = 'Соус '
							}else if(key == 'drinks'){
								name = 'Напій '

							}

							list_html+='<div class="pos_basket" data-category="'+key+'" data-id="'+ls.model.to_pay[key][i].id+'">';
							list_html+='<div class="close"></div>';
							list_html+='<div class="l_z">';
							list_html+='<div class="img_wrap">';
							list_html+='<img src="'+ls.model.to_pay[key][i].img+'" alt="">';
							list_html+='</div>';
							list_html+='<div class="n_info">';
							list_html+='<p class="h5"><span>'+name+ls.model.to_pay[key][i].name+'</span></p>';
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
							list_html+='<p class="cina_dop">'+lot_price+' грн</p>';
							list_html+='<div class="num">';
							list_html+='<button class="minus_w"></button>';
							list_html+='<p class="howmuch">'+ls.model.to_pay[key][i].count+'</p>';
							list_html+='<button class="plus_w"></button>';
							list_html+='</div>';
							list_html+='<p class="cina">'+lot_price+' грн</p>';
							list_html+='</div>';
							list_html+='</div>';
						}					
					}
				}
			}
		}
		if (summ>0) {

			cart.view.wrap.find('.cart').show().find('.list').html(list_html);
			cart.view.wrap.find('.empty').hide();
			if (summ>global_delivery_min_cart) {
				cart.view.wrap.find('.butts').find('.dstv').find('span').html(0);
				cart.view.wrap.find('.butts').find('.oplt').find('span').html(summ);
			}else{
				cart.view.wrap.find('.butts').find('.dstv').find('span').html(global_delivery_price);
				
				cart.view.wrap.find('.butts').find('.oplt').find('span').html(global_delivery_price+summ);
			}


		}else{

			cart.view.wrap.find('.cart').hide();
			cart.view.wrap.find('.empty').show();

		}
		cart.events.rebind_cart();
	}

}
