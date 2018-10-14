;

'use strict';

console.log('tools.events start');

tools.events = {

	active_click:function(e){
		console.log('active_click');
		e.preventDefault();
		if ($(this).hasClass('abled')) {

		    var href = $(this).attr('href');
	        open_from_url(href,true);
		}
	},
    rebind: function() {
    	var $lk_logo = tools.view.wrap.find('.header').find('.logo');
    	$lk_logo.unbind('click');
    	$lk_logo.click(function(event) {
    		var href = '/tools'
	        open_from_url(href,true);
    	});
    	tools.view.wrap.find('.biz').unbind('click',tools.events.active_click);
    	tools.view.wrap.find('.biz').click(tools.events.active_click);

    	tools.view.wrap.find('.version-link').unbind('click');
    	tools.view.wrap.find('.version-link,.faq-pop').click(function(e){
    		e.preventDefault();

	        open_from_url($(this).attr('href'),true);


    	});

    	tools.view.wrap.find('.news-head').unbind('click');
	   	tools.view.wrap.find('.news-head').click(function() { // при клике на заголовок, он же кнопка открытия текста
	        tools.view.togle_open_news(this); // открываем или же скрываем текст
	    });
    }

}
