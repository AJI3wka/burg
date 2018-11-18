;

'use strict';

console.log('ls.view start');


ls.view = {
	change_slider:function(){
		var category = document.location.pathname.replace('/card','').replace('/','');
		var list = ls.model.to_pay[category];
		for (var i = 0; i < list.length; i++) {
			var $btw = ls.view.wrap.find('.card').find('.item-wrap').find('.item[data-id="'+list[i].id+'"]').find('.button_wrap')

			if (list[i].count > 0) {
				
				//if (list[i].count>0) {
					$btw.find('.howmuch').html(list[i].count);
					$btw.addClass('has');
				// }else{

				// 	$btw.removeClass('has');
				// }
			}else{
				$btw.removeClass('has');
			}
		}
	},
	change_card_souses:function(){
		var category = 'souses';
		var list = ls.model.to_pay[category];
		for (var i = 0; i < list.length; i++) {
			var $btw = ls.view.wrap.find('.souses').find('.list').find('.item[data-id="'+list[i].id+'"]').find('.btn-wrp')

			if (list[i].count > 0) {
				
				//if (list[i].count>0) {
					$btw.find('span').html(list[i].count);
					$btw.addClass('has');
					$btw.closest('.item').addClass('active');
				// }else{

				// 	$btw.removeClass('has');
				// }
			}else{
				$btw.removeClass('has');
				$btw.closest('.item').removeClass('active');
			}
		}
	},
	change_card_drinks:function(){
		var category = 'drinks';
		var list = ls.model.to_pay[category];
		for (var i = 0; i < list.length; i++) {
			var $btw = ls.view.wrap.find('.drinks').find('.list').find('.item[data-id="'+list[i].id+'"]').find('.btn-wrp')

			if (list[i].count > 0) {
				
				//if (list[i].count>0) {
					$btw.find('span').html(list[i].count);
					$btw.addClass('has');
					$btw.closest('.item').addClass('active');
				// }else{

				// 	$btw.removeClass('has');
				// }
			}else{
				$btw.removeClass('has');
				$btw.closest('.item').removeClass('active');
			}
		}
	},
	change_cards:function(){
		ls.view.change_slider();
		ls.view.change_card_souses();
		ls.view.change_card_drinks();
	},
	change_category:function(){
		var category = document.location.pathname.replace('/','');
		var list = ls.model.to_pay[category];
		for (var i = 0; i < list.length; i++) {
			var $btw = ls.view.wrap.find('.burgs').find('.item-wrap').find('.item[data-id="'+list[i].id+'"]').find('.button_wrap')

			if (list[i].count > 0) {
				
				//if (list[i].count>0) {
					$btw.find('.howmuch').html(list[i].count);
					$btw.addClass('has');
					$btw.closest('.item').addClass('active');
				// }else{

				// 	$btw.removeClass('has');
				// }
			}else{
				$btw.removeClass('has');
				$btw.closest('.item').removeClass('active');
			}
		}
	},
	change_main_button:function(){
		var sum = 0;
		for(var key in ls.model.to_pay){
			if (ls.model.to_pay.hasOwnProperty(key)) {
				if (Array.isArray(ls.model.to_pay[key])) {
					for (var i = 0; i < ls.model.to_pay[key].length; i++) {
						sum += ls.model.to_pay[key][i].price*ls.model.to_pay[key][i].count;
					}
				}
			}
		}
		var $btn = $('header').find('.korzina');
		$btn.find('span').html(sum);
		if (sum>0) {
			$btn.addClass('active');
		}else{
			$btn.removeClass('active');

		}
	}
}
