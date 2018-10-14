;

'use strict';

console.log('how_to.view start');


how_to.view = {

	wrap:false,
	sliders:false,

	open:function(id){

	    how_to.view.sliders = [];//пустой вектор слайдеров

	    how_to.view.wrap.find('.faq[data-fid="' + id + '"]').arcticmodal({//открыть елемент .faq[data-fid="' + id + '"] в попапе с параметрам

	        afterOpen: function(data, el) {//после открытия
	            var $wrap = $(el); //перепозначаем олбать попапа

	            if ($wrap.is('.full-wrap-video')) {//если это инструкиця только с 1ним мидео на всю область(класс)
	                $wrap.parent('.arcticmodal-container_i2').css('overflow', 'initial');//добавляем стиль на фрейм попапа
	            }

	            var $vid_wrap = $wrap.find('.fvideo');//все видео
	            if ($vid_wrap.length>0) {	            	
		            $vid_wrap.each(function(index, el) {//цикл по елементам виде

		                var vid_id = $(this).attr('data-video-id');//идентификтор видео
		                if ($(this).is('.vimeo')) {//если есть класс вимео
		                    //if (index == 0) {//часть с автоплеем первого видео, не актуално
		                    //   $(this).html('<iframe class="ytb_video" src="https://player.vimeo.com/video/' + vid_id + '?autoplay=0&color=20bcbd&title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
		                    //
		                    //} else {
		                        //вставить каркас под видео вимео
		                        $(this).html('<iframe class="ytb_video" src="https://player.vimeo.com/video/' + vid_id + '?autoplay=0&color=20bcbd&title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
		                    //}
		                } else {//иначе вставить каркас под видеоютуб
		                    $(this).html('<iframe class="ytb_video" src="https://www.youtube.com/embed/' + vid_id + '?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');
		                }
		            });
	            }


	            //arr_lfet_selector = '.faq[data-fid="' + id + '"]' + ' .faq-video-slider'
	            var $sliders = $wrap.find('.slider-bx');
	            if ($sliders.length>0) {

		            //каждый из каркасов слайдеров
		            $sliders.each(function(index, el) {

		            	var $this = $(this)

		                var loading_data = new Date();
		                var id = 'slider_' + loading_data.getTime();

		                $this.attr('id', id);//присваиваем новый сгенерироыанный идентификтора


		                how_to.view.sliders[how_to.view.sliders.length] = $(this).find('.faq-video-slider').bxSlider({//создаем слайдер при этом сразу как элемент веткора
		                    infiniteLoop: true,
		                    nextSelector: '#' + id + '>.slider-right',
		                    prevSelector: '#' + id + '>.slider-left',
		                    controls: true,
		                    pager: false,
		                    auto: false,
		                    speed: 500,
		                    minSlides: 1,
		                    maxSlides: 1,
		                    moveSlides: 1
		                });

		            });
	            }

	            how_to.events.rebind_pop($wrap);


	        },

	        afterClose: function(data, el) {//посоле закрытия

	            //если больше попапов не открыто, удаляем клас блокирующий скролл, проверяем скролл покажет лого если нужно
	           
	            //удаляем все iframe в видео
	            how_to.view.wrap.find('.faq[data-fid="' + id + '"]').find('.fvideo>iframe').remove();

	            for (var i = 0; i < how_to.view.sliders.length; i++) {//разрушаем все слайдеры
	                how_to.view.sliders[i].destroySlider();
	            }

	            if ($(el).hasClass('force')) {
	            	
	            	$(el).removeClass('force');

	            }else{

				    var id = getURLParameter('i');
					
					if (!id) {

						open_from_url(global_default_path,true);
					
					}else{

						open_from_url($('body').attr('data-prew'),true);
						
					}

	            }


	        },
    beforeClose: function() { //функция выпоняемая после закрытия
        //if ($('body').find('.arcticmodal-container').length == 0) {
        $('body').removeClass('scrollpad'); //сбросить клас который выкоючает скролинг в body

    }
	    });
	}

}
