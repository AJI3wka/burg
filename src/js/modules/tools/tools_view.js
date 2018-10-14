;

'use strict';

console.log('tools.view start');


tools.view = {
	wrap:$('#lk_dnk'),
	show_sites_panel:function(){
		console.log('show_sites_panel');
		var $card_wrap = tools.view.wrap.find('.card-wrap');
		$card_wrap.find('.block').removeClass('show_block');
		$card_wrap.find('.block[data-page="sites"]').addClass('show_block');
	},
	togle_open_news:function(elem){
	    var $wrap = $(elem).closest('.news-wrap'); // сохраняем в переменную враппер лк
	    var $newsHead = $wrap.find('.news-head'); // заголовок, он же кнопка открытия текста
	    var $newsBody = $wrap.find('.news-body'); // тело текста
	    if ($newsHead.hasClass('opened')) { // если тело текста открыто,
	        $newsBody.slideUp(700, function() { // то прячем тело текста с анимацией уменшения висоти
	            $newsHead.removeClass('opened'); // по завершению анимации удаляем клас, которий указывает на то открыто ли тело текста
	        });
	    } else { // если же тело текста скрыто,
	        $newsBody.slideDown(700, function() { // то открываем тело текста с анимацией увеличения висоти
	            $newsHead.addClass('opened'); // по завершению анимации накидаем клас, которий указывает на то открыто ли тело текста
	        });
	    }
	},
	show_main_panel:function(){
		console.log('show_sites_panel');
		var $card_wrap = tools.view.wrap.find('.card-wrap');
		$card_wrap.find('.block').removeClass('show_block');
		$card_wrap.find('.block[data-page="lk"]').addClass('show_block');
	},
	show_partner_panel:function(){
		console.log('show_partner_panel');
		var $card_wrap = tools.view.wrap.find('.card-wrap');
		$card_wrap.find('.block').removeClass('show_block');
		$card_wrap.find('.block[data-page="partner"]').addClass('show_block');
	},
	show_partner_cond_panel:function(){
		console.log('show_partner_panel');
		var $card_wrap = tools.view.wrap.find('.card-wrap');
		$card_wrap.find('.block').removeClass('show_block');
		$card_wrap.find('.block[data-page="conditions"]').addClass('show_block');
	}

}
