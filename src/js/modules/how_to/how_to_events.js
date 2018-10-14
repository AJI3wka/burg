;

'use strict';

console.log('how_to.events start');

how_to.events = {

	popstate:function(){

		$('.arcticmodal-container_i2').children('.faq').last().addClass('force').arcticmodal('close');

		setTimeout(function(){

			window.removeEventListener('popstate', how_to.events.popstate);
			
		},100);
	},
	rebind:function(){

	},
    rebind_pop: function($wrap) {


		window.removeEventListener('popstate', how_to.events.popstate);
		window.addEventListener('popstate', how_to.events.popstate);

    	if ($wrap.find('.vklad-text').length>0) {
    		$wrap.find('.vklad-text').unbind('click');//анбинд лик евенов с кнопок-вкладок
	        $wrap.find('.vklad-text').click(function(event) {//клик по кнопке-вкладек
	            var $vklad_wrap = $(this).closest('.faq');//позначние области влкадок
	            $vklad_wrap.find('.vklad-text').removeClass('active');//удалить со всех кнопок вкладок клас active
	            $(this).addClass('active');//этой кнопке добавить класс active
	            $vklad_wrap.find('.vklad').removeClass('active');//всем областям вкладок удалить клас active
	            $vklad_wrap.find('.vklad[data-vklad="' + $(this).attr('data-vklad') + '"]').addClass('active');//соответсвующей области добавить active

	            //перезагрузка всех слайдеров
	            for (var i = 0; i < how_to.view.sliders.length; i++) {
	                how_to.view.sliders[i].reloadSlider();
	            }

	            if($(this).parent().children().length>1){
	            	updateQueryStringParam('v',$(this).attr('data-vklad'));
	            }

	        });

	        var v = getURLParameter('v');
	        if (v) {

		        $wrap.find('.vklad-text[data-vklad="'+v+'"]').trigger('click');

	        }else{

		        //по дефолту открывае вкладку с видео
		        $wrap.find('.vklad-text:first-of-type').trigger('click');
	        }

    	}else{

        	$wrap.find('.link').unbind('click')
        	$wrap.find('.link').click(function(e) {
        		e.preventDefault();

        		open_from_url($(this).attr('href'),true);

        	});
    	}
        


    }

}
