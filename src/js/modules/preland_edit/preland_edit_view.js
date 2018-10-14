;

'use strict';

console.log('preland_edit.view start');


preland_edit.view = {
	wrap:false,
	step_slider:false,
	edit_frame:false,
	edit_frame_body:false,
	frame_render_timer:false,
	frame_from_fullscreen_timer:false,
	frame_to_fullscreen_timer:false,
	resize_frame_timer:false,
	init_steps_slider:function() {
		
		var $wrap = preland_edit.view.wrap;

		var $slider = $wrap.find('.steps_slider');
		if (!$slider.hasClass('initedSlider')) {
			preland_edit.view.step_slider = $slider.bxSlider({
				responsive: true,
				infiniteLoop: false,
				controls: false,
				adaptiveHeight: true,
				adaptiveHeightSpeed: 0,
				pager: false,
				speed: 500,
				minSlides: 1,
				maxSlides: 1,
				moveSlides: 1,
				slideMargin: 50,
				touchEnabled: false,
				onSlideBefore: function($slideElement, oldIndex, newIndex) {
					preland_edit.view.to_next_step(+newIndex+1);
					updateQueryStringParam('p',+newIndex+1);

					if(newIndex == 2 && if_defined(preland_edit.model.cur_data.quiz)){

						preland_edit.view.wrap.addClass('quiz_lock');

					}else{

						preland_edit.view.wrap.removeClass('quiz_lock');
					}
				},
				onSlideAfter: function($slideElement, oldIndex, newIndex) {
					preland_edit.view.resize_edit_frame();
				},
		      onSliderLoad:function(){
		      	setTimeout(function(){
		      		after_init();
		      	});
		      	 //after_init();
		      }
			});
			$slider.addClass('initedSlider');
		}else{
			after_init();
		}

		function after_init(){
    		//preland_edit.events.rebind();

			var page = getURLParameter('p');
			
			if(page){

				preland_edit.view.step_slider.goToSlide(parseInt(page)-1);

				if(parseInt(page)-1 == 2 && if_defined(preland_edit.model.cur_data.quiz)){
					preland_edit.view.wrap.addClass('quiz_lock');
				}	
			}else{
			
				preland_edit.view.step_slider.goToSlide(0);
			
			}
			
			if ($wrap.find('.iframe_wrap iframe').length > 0) {
				preland_edit.view.resize_edit_frame(); // змаштабировать iframe
			}
		}
	},
	insert_edit_frame:function(callback){

		function ready_frame(){


			preland_edit.view.edit_frame = document.getElementById("for_preview_preland").contentWindow;
			preland_edit.view.edit_frame_body = preland_edit.view.wrap.find('#for_preview_preland').contents();

			if(callback){
				
				callback();

			}else{

				preland_edit.view.insert_full_data_in_frame();
			}

			preland_edit.view.resize_edit_frame(); // змаштабировать iframe

		}

		var frame_src = source_url+"/frame/preland_template/"

		var $preland_ed = preland_edit.view.wrap;

		var $div = $preland_ed.find('.iframe_wrap'); // находим нужный слайд

		// var iframe = '<iframe id="for_preview_lp1" width="100%" height="100%" src="lp1_template/"></iframe>'; // создать iframe
		var $iframe = $div.find('#for_preview_preland');


	    $iframe.unbind('load');

	    $iframe.bind('load',function(){
	    
	        ready_frame();
	    

	    });

	    if($iframe.attr('src') != frame_src){
	        
	        $iframe.attr('src', frame_src);

	    }else{
	        ready_frame();
	    }

	},
	resize_edit_frame:function(animate,back) {

		var $preland_ed = preland_edit.view.wrap;
		var $iframe_wrap = $preland_ed.find('.iframe_wrap');

		if ($iframe_wrap.find('iframe').length < 1 || $(window).width() < 768) return;
		
		
		var lp3_W = parseInt($(window).width());
		var lp3_H = parseInt($(window).height());
		var steps_right_offset = Math.abs(parseInt($preland_ed.find('.steps_wrap').css('margin-right')));
		var steps_top_offset = parseInt($preland_ed.find('.header').height());
		
		var divW = lp3_W - steps_right_offset; // ширина блока з iframe
		var divH = lp3_H - steps_top_offset; // ширина блока з iframe

		console.log('lp3_H = ',lp3_H,'; divH = ',divH);
		console.log('steps_right_offset = ',steps_right_offset,'; lp3_W = ',lp3_W,'; divW = ',divW);

		if (!animate) {

			
		}else{
			divW = lp3_W - 80;
			divH = lp3_H - 58;
		}

		if(back){

			divW = lp3_W - 530;
			divH = lp3_H - 116;
		}

		if(if_defined(quiz_editor)&& if_defined(quiz_editor.model) && if_defined(quiz_editor.model.q_data)&&if_defined(quiz_editor.model.q_data.qid)){

        	preland_edit.model.load_quiz(quiz_editor.model.q_data.content);
        	
		}	

		console.log('lp3_H = ',lp3_H,'; divH = ',divH);

		if(preland_edit.view.resize_frame_timer){
			clearTimeout(preland_edit.view.resize_frame_timer);
		}
		
		var $iframe = $iframe_wrap.find('iframe')
		
		if($iframe.width()!=divW || $iframe.height()!=divH){
			
			$iframe_wrap.addClass('blacked');
			
			$iframe_wrap.width(divW+'px');



			preland_edit.view.resize_frame_timer = setTimeout(function(){


				// if(preland_edit.view.resize_frame_timer){
				// 	clearTimeout(preland_edit.view.resize_frame_timer);
				// }

				$iframe.width(divW+'px');
				$iframe.height(divH+'px');

				setTimeout(function(){
					$iframe_wrap.removeClass('blacked');
					preland_edit.view.edit_frame_body.find('body').addClass('prelanded').removeClass('hide_preland');
				},400);


			},200);
			
		}

	},
	insert_full_data_in_frame:function(){

		preland_edit.view.wrap.find('.change_iframe').each(function() {
			preland_edit.view.live_change_frame($(this));
		});

	},
	live_change_frame:function($elem){

		var $preland_ed = preland_edit.view.wrap;

		if ($preland_ed.find('.iframe_wrap').find('iframe').length < 1 || $(window).width() < 768) return;

		var iFrame = preland_edit.view.edit_frame;
		var $view_body = preland_edit.view.edit_frame_body;

		var data_type = $elem.attr('data-input-type');
		var data_last_pushed = $elem.attr('data-last-for-iframe');
		var val = $elem.val();		
		
		if (val == data_last_pushed 
		&& data_type != 'bg_img_d' 
		&& data_type != 'bg_img_m' 
		&& data_type != 'logo_img'
		&& !$elem.hasClass('content_autoplay')) return;

		var $rend_el;

		if (data_type == 'descriptor') {
			$rend_el = $view_body.find('.atom_preland_descr').children('span');
			if (val == '') $rend_el.html('Дескриптор');
			else $rend_el.html(val);

		} else if (data_type == 'offer_h1') {
			$rend_el = $view_body.find('h1.atom_preland_h1').children('span');
			if (val == '') $rend_el.html('Оффер основа');
			else $rend_el.html(val);

		} else if (data_type == 'offer_h2') {
			$rend_el = $view_body.find('h2.atom_preland_h2').children('span');
			if (val == '') $rend_el.html('Оффер преимущество');
			else $rend_el.html(val);

		} else if (data_type == 'page_email') {
			$rend_el = $view_body.find('.atom_preland_email').children('span');
			if (val == '') {
				$rend_el.html('Email на странице');
				$view_body.find('input[name="email"]').attr('placeholder', 'Email');
			} else {
				$rend_el.html(val);
				$view_body.find('input[name="email"]').attr('placeholder', val);
			}
			
		} else if (data_type == 'act_email') {

			if (val == '') $view_body.find('input[name="act_e"]').val('act_email@gmail.com');
			else $view_body.find('input[name="act_e"]').val(val);
			
		} else if (data_type == 'page_addr') {
			$rend_el = $view_body.find('.atom_preland_addr').children('span');
			if (val == '') $rend_el.html('Адрес на странице');
			else $rend_el.html(val);
			
		} else if (data_type == 'ph1') {
			if (val == '') {
				$view_body.find('#atom_preland_phone-link').html('Телефон для заявок');
				$view_body.find('input[name="phone"]').attr('placeholder', 'Телефон');
			} else {
				$view_body.find('#atom_preland_phone-link').html(val);
				$view_body.find('input[name="phone"]').attr('placeholder', val);
			}
			
		} else if (data_type == 'ph4') {
			$view_body.find('.atom_preland_a-phone').html(val);
			if ( if_defined(iFrame.atom_preland.make_phone_link) ) iFrame.atom_preland.make_phone_link();

		} else if (data_type == 'bg_img_d') {
			if (val != '0' && val != '') {
				var d = new Date();
				$view_body.find('.atom_preland_body-wrap.atom_preland_sec1').css('background-image', 'url(' + val + '?' + d.getTime() + ')');
				$view_body.find('#atom_preland_pop-form').css('background-image', 'url(' + val + '?' + d.getTime() + ')');
			} else {
				$view_body.find('.atom_preland_body-wrap.atom_preland_sec1').css('background-image', 'url(img/bg_default.svg)');
				$view_body.find('#atom_preland_pop-form').css('background-image', 'url(img/bg_default.svg)');
			}

		} else if (data_type == 'bg_video') {
		 	
			if (youtube_parser(val)) {
				$view_body.find('.atom_preland_sec1').css('background-image', 'none');
				$view_body.find('#atom_preland').attr('data-bg-video', youtube_parser(val));
				$view_body.find('.atom_preland_video-background').show();
				iFrame.vid_bg = youtube_parser(val);
				if(if_defined(iFrame.atom_preland_init_bg_video)){

					iFrame.atom_preland_init_bg_video();
				}
				if ( if_defined(iFrame.YT) ) iFrame.onYouTubeIframeAPIReady();
			} else {
				$view_body.find('#atom_preland').attr('data-bg-video', '0');
				$view_body.find('.atom_preland_video-background').hide();
				$preland_ed.find('.bg_img_d').trigger('blur');
				iFrame.vid_bg = '0';
			}
			
		} else if (data_type == 'view_video') {
			if (val != '0' && val != '') {
				$view_body.find('.atom_preland_body-wrap .atom_preland_video-btn-wrap .atom_preland_text').html(val);
			} else {				
				$view_body.find('.atom_preland_body-wrap .atom_preland_video-btn-wrap .atom_preland_text').html('Посмотреть видео');
			}

		} else if (data_type == 'close_preland') {
			if (val != '0' && val != '') {
				$view_body.find('.atom_preland_conf-link').html(val);
			} else {				
				$view_body.find('.atom_preland_conf-link').html('Узнать подробнее');
			}

		} else if (data_type == 'open_preland') {
			if (val != '0' && val != '') {
				$view_body.find('.atom_preland_fixed_button').html(val);
			} else {				
				$view_body.find('.atom_preland_fixed_button').html('Показать специальное предложение');
			}

		} else if (data_type == 'video') {

			if (youtube_parser(val)) {
				$view_body.find('#atom_preland').attr('data-content-video', youtube_parser(val));
				$view_body.find('.atom_preland_block_play_video').show();
				$view_body.find('.atom_preland_video-wrap>img').css('opacity', '0');
				iFrame.vid_content = youtube_parser(val);
				if(if_defined(iFrame.atom_preland_init_bg_video)){

					iFrame.atom_preland_init_bg_video();

				}
				if(if_defined(iFrame.atom_preland.reload_content_video)){

					iFrame.atom_preland.reload_content_video();
					
				}
				
				if ( if_defined(iFrame.YT) ) iFrame.onYouTubeIframeAPIReady();
			} else {
				$view_body.find('.atom_preland_block_play_video').hide();
				$view_body.find('#atom_preland').attr('data-content-video', '0');
				iFrame.vid_content = '0';
				
			}
			
		} else if ($elem.hasClass('content_autoplay')) {

			$view_body.find('#atom_preland').attr('data-content-autoplay', val);
			iFrame.content_autoplay = val;
			if ( if_defined(iFrame.YT) &&  if_defined(iFrame.YT.Player)) iFrame.onYouTubeIframeAPIReady();

		} else if (data_type == 'logo_img') {
			if (val != '0' && val != '') {
				var d = new Date();
				$view_body.find('.atom_preland_logo').css('background-image', 'url(' + val + '?' + d.getTime() + ')');
				$view_body.find('#atom_preland').attr('data-logo', 'url(' + val + '?' + d.getTime() + ')');
			} else {
				$view_body.find('.atom_preland_logo').css('background-image', 'none');
				$view_body.find('#atom_preland').attr('data-logo', '0');
			}
			
		}  else if (data_type == 'mirror_domain'||data_type == 'protocol'||data_type == 'mirror_page') {
			////alert('catched'+data_type);
			if (val.length>1) {
				var $page = $elem.closest('.scroll_content')
				var preland_addes = $page.find('input.protocol').val()+$page.find('input.mirror_domain').val()+'/'+$page.find('input.mirror_page').val();
				$view_body.find('#mirror_prewiev').attr('src', preland_addes);
			}
			
		}else if ($elem.hasClass('bg_shadow')) {
			$view_body.find('.atom_preland_bg-shadow').css('opacity', val);
			var ui_val = parseFloat(val) * 100;
			$preland_ed.find(".range_slider").slider("value", ui_val);
			$preland_ed.find('.range_line').css('width', ui_val + '%');
		} 


		if ($elem.hasClass('content_pre_form')) {
			$view_body.find('#atom_preland').attr('data-pre-form', val);
			$rend_el = $view_body.find('.atom_preland_main-form').find('.atom_preland_h3').children('span');
			if (if_defined($rend_el)) {
				setTimeout(function(){
					if ( if_defined(iFrame.atom_preland.change_main_text) ) iFrame.atom_preland.change_main_text($rend_el[0]);
					if ( if_defined(iFrame.atom_preland.init_rendering) ) iFrame.atom_preland.init_rendering();
				}, 400);
			}

		} else if ($elem.hasClass('content_pre_form_offer')) {
			$view_body.find('#atom_preland').attr('data-pre-form-offer', val);

		} else if ($elem.hasClass('pre_form_button')) {
			$rend_el = $view_body.find('.atom_preland_pre-form').find('.atom_preland_btn').children('span');
			if (val == '') $rend_el.html('Кнопка ведущая к форме');
			else $rend_el.html(val);

		} else if ($elem.hasClass('pre_form_offer')) {
			$rend_el = $view_body.find('.atom_preland_pre-form').find('.atom_preland_h3').children('span');
			$rend_el.html(val);

		}
		



		if ($elem.hasClass('form_name')) {
			$view_body.find('#atom_preland').attr('data-form-name', val);
		} else if ($elem.hasClass('form_phone')) {
			$view_body.find('#atom_preland').attr('data-form-phone', val);
		} else if ($elem.hasClass('form_email')) {
			$view_body.find('#atom_preland').attr('data-form-email', val);
		} else if ($elem.hasClass('form_custom')) {
			$view_body.find('#atom_preland').attr('data-form-custom', val);
		}

		if ($elem.hasClass('form_name') ||
			$elem.hasClass('form_phone') ||
			$elem.hasClass('form_email') ||
			$elem.hasClass('form_custom')) {
				var input_count = 0;
				input_count += +$preland_ed.find('.form_name').val();
				input_count += +$preland_ed.find('.form_phone').val();
				input_count += +$preland_ed.find('.form_email').val();
				input_count += +$preland_ed.find('.form_custom').val();
				$view_body.find('#atom_preland').attr('data-input-count', input_count);
		}

		if ($elem.hasClass('form_custom_name')) {
			if (val == '') $view_body.find('input[name="custom_name"]').val('Название поля');
			else $view_body.find('input[name="custom_name"]').val(val);

		} else if ($elem.hasClass('form_custom_plac')) {
			if (val == '') $view_body.find('input[name="custom"]').attr('placeholder', 'Надпись на поле');
			else $view_body.find('input[name="custom"]').attr('placeholder', val);
		}

		if ($elem.hasClass('form_head')) {
			if (val == '') {
				$view_body.find('.atom_preland_main-form').find('.atom_preland_h3').children('span').html('Надпись на форме');
				$view_body.find('#atom_preland_pop-form').find('.atom_preland_h3').children('span').html('Надпись на форме');
			}
			else {
				$view_body.find('.atom_preland_main-form').find('.atom_preland_h3').children('span').html(val);
				$view_body.find('#atom_preland_pop-form').find('.atom_preland_h3').children('span').html(val);
			}
			
		} else if ($elem.hasClass('form_button')) {
			if (val == '') {
				$view_body.find('.atom_preland_main-form').find('button[type="submit"]').children('span').html('Надпись на кнопке');
				$view_body.find('#atom_preland_pop-form').find('button[type="submit"]').children('span').html('Надпись на кнопке');
			} else {
				$view_body.find('.atom_preland_main-form').find('button[type="submit"]').children('span').html(val);
				$view_body.find('#atom_preland_pop-form').find('button[type="submit"]').children('span').html(val);
			}
			
		}



		if (if_defined($rend_el)) {

			if ( if_defined(iFrame.atom_preland.change_main_text) ) iFrame.atom_preland.change_main_text($rend_el[0]);
			//if ( if_defined(iFrame.init_rendering) ) iFrame.init_rendering();
		}

		$elem.attr('data-last-for-iframe', val);

		if(if_defined(iFrame.atom_preland.hard_rerender)){
		

			if (preland_edit.view.frame_render_timer) {
				clearTimeout(preland_edit.view.frame_render_timer);
			}

			preland_edit.view.frame_render_timer = setTimeout(function(){

				iFrame.atom_preland.hard_rerender();
				
			},1500);
		

		}
	

	},
	to_next_step:function(next){
		var $wrap = preland_edit.view.wrap;

		var $steps_btn = $wrap.find('.steps_pager_item');
		$steps_btn.removeClass('active passed');
		
		$($steps_btn[+next-1]).addClass('active');
		
		for (var i=0; i<+next; i++) {
			$($steps_btn[i]).addClass('passed');
		}

		if ($wrap.find('.iframe_wrap').find('iframe').length > 0 || $(window).width() > 767) {

			if (next === 3) {
				if ($wrap.find('.content_pre_form').val() == '1') {
					preland_edit.view.edit_frame_body.find('.pre-form .btn').trigger('click');
				}
			} else {
				var $pop_form = preland_edit.view.edit_frame_body.find('#pop-form');
				if ( if_defined(preland_edit.view.edit_frame.close_popup) ) preland_edit.view.edit_frame.close_popup($pop_form);
			}

		}


		if(next == 6){
			$wrap.addClass('last_page_active');

			preland_edit.model.init_helpers();
		}else{
			$wrap.removeClass('last_page_active');

			$wrap.removeClass('quiz_lock');
		}

	},
	go_to_step:function(current, next){
		if (next < current) {
			preland_edit.view.step_slider.goToSlide(next-1);
		} else if (preland_edit.view.step_slider) {

			// for (var i=1; i<next; i++) {
			// 	if (!preland_edit.view.wrap.find('.step[data-step="'+i+'"]').hasClass('valid_step')) {
			// 		if(!preland_edit.model.validate_step(i)) {
			// 			preland_edit.view.step_slider.goToSlide(i-1);
			// 			return;
			// 		}
			// 	}
			// }

			preland_edit.view.step_slider.goToSlide(next-1);
		}
	},
	paste_values:function(data,from_cache){

		if(data){
	    	preland_edit.model.cur_data = data;

		}else{
			data = preland_edit.model.cur_data;
		}

	    console.log('          paste_page_values(', data, ')');

	    var $wrap = preland_edit.view.wrap;
	    

		var $trigs = $wrap.find('.trig_btn');

		$trigs.addClass('pasting');
	    
	    if(!from_cache){
	    	preland_edit.view.clean_inputs();//очситка всех значений
	    }

	    if (if_defined(data.name)) {//Если существует такое значение вставляем его в поле
	        $wrap.find('input[name="land_name"]').val(data.name);
	    }

	    if (if_defined(data.template)) {//Если существует такое значение вставляем его в поле
	        $wrap.find('input[name="template"]').val(data.template);
	    }

	  
	    if (if_defined(data.id)) {//Если существует такое значение вставляем его в поле
	    	var cur_id = getURLParameter('i');
	        if(cur_id != data.id){

	        	updateQueryStringParam('i',data.id);

	        	// if(cur_id == 'new'){

	        	// 	dnk_atom_events({type:'event',category:'create',action:'preland',link:data.id});


	        	// }

	        }

			preland_edit.view.wrap.find('.preview').attr('href', 'http://'+data.domain+'/');	        


	    }

	    if (if_defined(data.quiz)) {//Если существует такое значение вставляем его в поле
	    	var cur_id = getURLParameter('qi');
	        if(cur_id != data.quiz){

	        	updateQueryStringParam('qi',data.quiz);

	        	// if(cur_id == 'new'){

	        	// 	dnk_atom_events({type:'event',category:'create',action:'lp1',link:data.id});


	        	// }
	        	//         	

	        }else{

	        }

			if (!$wrap.find('.trig_btn[data-target="quiz_enabled"]').hasClass('active')) {//если тригер(в области редактора) с таким ключем не имеет активного класа
                $wrap.find('.trig_btn[data-target="quiz_enabled"]').trigger('click');//модулируем клик по нему(для переключения)
            }	

			//lp1_edit.view.wrap.find('.preview').attr('href', 'http://client.dnk.bz/'+data.id+'/');	        

	    }

	    if (if_defined(data.domain)) {//Если домен заполнен записываем его в поле и накидываем атрибут вставленного значения(для проверки смены домена во время редактирования)

	        $wrap.find('input[name="domain"]').val(data.domain).attr('data-pasted-value', data.domain);;
	    } else {//если нет, добавляем пустое значение  ватрибуте
	        $wrap.find('input[name="domain"]').attr('data-pasted-value', '');
	    }

	    var content = data.content;//перепозначение контента в данных
	    console.log('          paste_page_values() - content', content);

	    /*-------обработка полученого контента  старт ---------*/
	    for (var key in content) {//цыкл по всем параметрам контента
			
			if(if_defined(content[key])){
				if (content[key].toString().indexOf(' <br>') != -1) {//если в занчении найдено <br>

					var regex = / <br\s*[\/]?>/gi;
					content[key] = content[key].replace(regex, "\n");//заменяем все <br> на перенос строки
				}
				
			}

	        if (key == 'bg_video' || key == 'content_video') {//если это видео на фон либо продающее
	            if (content[key] != '0') {//если наполнение не == 0 (отключено/нету)
	                //переводим ИД в ссылку ютуб
	                if(content[key].indexOf('youtube')==-1){	                
	                	content[key] = content[key].replace(content[key], 'https://www.youtube.com/watch?v=' + content[key]);
	                }
	                if (!$wrap.find('.trig_btn[data-target="' + key + '"]').hasClass('active')) {//если тригер(в области редактора) с таким ключем не имеет активного класа
	                    $wrap.find('.trig_btn[data-target="' + key + '"]').trigger('click');//модулируем клик по нему(для переключения)
	                }
	            } else {//если нету наполнения (0)
	                if ($wrap.find('.trig_btn[data-target="' + key + '"]').hasClass('active')) {//если тригер(в области редактора) с таким ключем имеет актривный класс
	                    $wrap.find('.trig_btn[data-target="' + key + '"]').trigger('click');//модулируем клик по нему(для переключения)
	                }
	            }
	        }

	        if (key == 'logo_img') {//аналогичная обраотка для логотипа
	            if (content[key] != '0') {
	                if (!$wrap.find('.trig_btn[data-target="logo"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="logo"]').trigger('click');
	                    console.log('          paste_page_values() - logo_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="logo"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="logo"]').trigger('click');
	                    console.log('          paste_page_values() - logo_click');
	                }
	            }
	        }

	        if (key == 'mirror_protocol') {//аналогичная обраотка для логотипа
	        	$wrap.find('.select').find('.item').each(function(index, el) {
	        		if($(this).text() != content[key]){
	        			$(this).removeClass('active');
	        		}else{
	        			$(this).addClass('active');
	        		}
	        	});

	            $wrap.find('input.protocol').val(content[key]);
	            // if (content[key] != 'https://') {
	            //     if (!$wrap.find('.trig_btn[data-target="logo"]').hasClass('active')) {
	            //         $wrap.find('.trig_btn[data-target="logo"]').trigger('click');
	            //         console.log('          paste_page_values() - logo_click');
	            //     }
	            // } else {
	            //     if ($wrap.find('.trig_btn[data-target="logo"]').hasClass('active')) {
	            //         $wrap.find('.trig_btn[data-target="logo"]').trigger('click');
	            //         console.log('          paste_page_values() - logo_click');
	            //     }
	            // }
	        }

	        if (key == 'content_autoplay') {//аналогичная обраотка для параметра автоплея
	            if (content[key] != '0') {
	                if (!$wrap.find('.trig_btn[data-target="content_autoplay"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="content_autoplay"]').trigger('click');
	                    console.log('          paste_page_values() - content_autoplay_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="content_autoplay"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="content_autoplay"]').trigger('click');
	                    console.log('          paste_page_values() - content_autoplay_click');
	                }
	            }
	        }

	        if (key == 'content_pre_form') {//аналогичная обраотка для параметра формы в попапе
	            if (content[key] != '0') {
	                if (!$wrap.find('.trig_btn[data-target="pre_form"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="pre_form"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="pre_form"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="pre_form"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            }
	        }

	        if (key == 'metrics') {//аналогичная обраотка для параметра яндекс метрики
	            if (content[key] != '0' && content[key] != 'undefined' && content[key] != '' && content[key] != 'null' && content[key] != null)  {
	                if (!$wrap.find('.trig_btn[data-target="metrics"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="metrics"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="metrics"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="metrics"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            }
	        }

	        if (key == 'mirror_iframe_trig') {//аналогичная обраотка для параметра яндекс метрики
	            if (content[key] != '0' && content[key] != 'undefined' && content[key] != '' && content[key] != 'null' && content[key] != null)  {
	                if (!$wrap.find('.trig_btn[data-target="mirror_iframe_trig"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="mirror_iframe_trig"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="mirror_iframe_trig"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="mirror_iframe_trig"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            }
	        }
	        if (key == 'head_codes') {//аналогичная обраотка для параметра гугл аналитики
	            if (content[key] != '0' && content[key] != 'undefined' && content[key] != '' && content[key] != 'null' && content[key] != null)  {
	                if (!$wrap.find('.trig_btn[data-target="head_codes"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="head_codes"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="head_codes"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="head_codes"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            }
	        }



	        if (key == 'n_head_codes') {//аналогичная обраотка для параметра гугл аналитики
	            if (content[key] != '0' && content[key] != 'undefined'  && content[key] != '0' && content[key] != '' && content[key] != 'null' && content[key] != null)  {
	                if (!$wrap.find('.trig_btn[data-target="n_head_codes"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="n_head_codes"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="n_head_codes"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="n_head_codes"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            }
	        }

	        if (key == 'event_submited') {//аналогичная обраотка для параметра гугл аналитики
	            if (content[key] != '0' && content[key] != 'undefined'  && content[key] != '0' && content[key] != '' && content[key] != 'null' && content[key] != null)  {
	                if (!$wrap.find('.trig_btn[data-target="event_submited"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="event_submited"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="event_submited"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="event_submited"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            }
	        }
	        
	        if (key == 'n_body_codes') {//аналогичная обраотка для параметра гугл аналитики
	            if (content[key] != '0' && content[key] != 'undefined' && content[key] != ''  && content[key] != '0' && content[key] != 'null' && content[key] != null)  {
	                if (!$wrap.find('.trig_btn[data-target="n_body_codes"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="n_body_codes"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="n_body_codes"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="n_body_codes"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            }
	        }


	        if (key == 'favicon_img') {//аналогичная обраотка для параметра гугл аналитики
	            if (content[key] != '0' && content[key] != 'undefined' && content[key] != ''  && content[key] != '0' && content[key] != 'null' && content[key] != null)  {
	                if (!$wrap.find('.trig_btn[data-target="favicon"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="favicon"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="favicon"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="favicon"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            }
	        }



	        if (key == 'og_title') {//аналогичная обраотка для параметра гугл аналитики
	            if (content[key] != '0' && content[key] != 'undefined' && content[key] != ''  && content[key] != '0' && content[key] != 'null' && content[key] != null)  {
	                if (!$wrap.find('.trig_btn[data-target="og"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="og"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="og"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="og"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            }
	        }


	        

	        if (key == 'vcard_category') {//аналогичная обраотка для параметра гугл аналитики
	            if (content[key] != '0' && content[key] != 'undefined' && content[key] != ''  && content[key] != '0' && content[key] != 'null' && content[key] != null)  {
	                if (!$wrap.find('.trig_btn[data-target="vcard"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="vcard"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="vcard"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="vcard"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            }
	        }

	        

	        if (key == 'meta_description' || key == 'meta_keywords') {//аналогичная обраотка для параметра гугл аналитики
	            if (content[key] != '0' && content[key] != 'undefined' && content[key] != ''  && content[key] != '0' && content[key] != 'null' && content[key] != null)  {
	                if (!$wrap.find('.trig_btn[data-target="meta"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="meta"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="meta"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="meta"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            }
	        }	        


	        if (key == 'aftersend_file') {//аналогичная обраотка для параметра гугл аналитики
	            if (content[key] != '0' && content[key] != 'undefined' && content[key] != ''  && content[key] != '0' && content[key] != 'null' && content[key] != null)  {
	                if (!$wrap.find('.trig_btn[data-target="aftersend_file"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="aftersend_file"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="aftersend_file"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="aftersend_file"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            }
	        }	

	        if (key == 'metrics_visor') {//аналогичная обраотка для параметра гугл аналитики
	            if (content[key] != '0' && content[key] != 'undefined' && content[key] != ''  && content[key] != '0' && content[key] != 'null' && content[key] != null)  {
	                if (!$wrap.find('.trig_btn[data-target="metrics_visor"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="metrics_visor"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            } else {
	                if ($wrap.find('.trig_btn[data-target="metrics_visor"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-target="metrics_visor"]').trigger('click');
	                    console.log('          paste_page_values() - content_pre_form_click');
	                }
	            }
	        }	  
	        
	        //заполнение полей ввода в преедлах области редактора занчениями с конетнта
	        var $cur_input = $wrap.find('input[name="' + key + '"],textarea[name="' + key + '"]');

	        if($cur_input.val() != content[key]){
	        	$cur_input.val(content[key]).attr('data-last-pushed', '').trigger('input');
	        }
	       


	        if (key == 'form_custom' || key == 'form_email' || key == 'form_phone' || key == 'form_name') { //аналогичная обработка чебкокса

	            var data_input = key.split('_')[1];

	            if (content[key] != '0') {
	                if (!$wrap.find('.trig_btn[data-input="' + data_input + '"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-input="' + data_input + '"]').addClass('active').closest('.field_inp').addClass('active');
	                }

	            } else {
	                if ($wrap.find('.trig_btn[data-input="' + data_input + '"]').hasClass('active')) {
	                    $wrap.find('.trig_btn[data-input="' + data_input + '"]').removeClass('active').closest('.field_inp').removeClass('active');
	                }
	            }
	            var count_of_inputs = 0;
	            var $inputs = $wrap.find('.form_name,.form_phone,.form_email,.form_custom');
	            $inputs.each(function(){
	                if ($(this).val() == "1") {
	                    count_of_inputs++;
	                }
	            });
	            $wrap.find('input[name="input_count"]').val(count_of_inputs);
	        }

	        //console.log(key,':',content[key]);

	        if (key == 'form_custom_name' || key == 'form_custom_plac') {//обработка названия и плейсхолдера custom поля формы
	            if (content[key] != '0') {//если не 0 вставляем занчения
	                $wrap.find('input[name="form_custom_name"]').val(content['form_custom_name']).trigger('blur');
	                $wrap.find('input[name="form_custom_plac"]').val(content['form_custom_plac']).trigger('blur');
	            } else {//если 0 - всавляем пустое значение
	                $wrap.find('input[name="form_custom_name"]').val('');
	                $wrap.find('input[name="form_custom_plac"]').val('');

	            }
	        }
	    }

	    /*-------обработка полученого контента конец ---------*/


	    for (var i = preland_edit.model.inputs.length - 1; i >= 0; i--) {//по всему вектору всевозможных полей

	        var inp = preland_edit.model.inputs[i];

	        if (inp.hasOwnProperty('key')) {//если елемент вектора имеет key (что заначит тчо он хранится на бекенде)

	            var $input = $wrap.find(inp.selector);//присваиванее елемнет jq инпута

	            $input.attr('data-last-pushed', $input.val());// запись текущего значения  ватрибут data-last-pushed (для автосейва)

	        }

	    }
		$trigs.removeClass('pasting');

	    $('.radio').removeClass('clean');//удаление класа который блокирует стандартные действия радиобатон(сделано для установки значений)

	    // $('#input_count').val($wrap.find('.radio.active').length);//заполнение поля input_count (поле нужно для проверки количества выбраных полей)

	    console.log('          paste_page_values() - values_pasted - ', content);



	    preland_edit.events.bind_input_listening();//включить "слушанье" полей ввода для автосейва вносимих изменений

	},
	clean_inputs:function(){
		var $wrap = preland_edit.view.wrap;

		preland_edit.events.unbind_input_listening();

	    $wrap.find('.step').removeClass('valid_step');

	    console.log('          clean_page_editor_values()');

	    for (var i = preland_edit.model.inputs.length - 1; i >= 0; i--) {//по всему вектору полей
	        var inp = preland_edit.model.inputs[i];//получение объекта для этого поля ввода
	        $wrap.find(inp.selector).val(inp.default).trigger('input');//запись в инпут с селектором взятым с вектора дефолтного значениея и триггер input
	    }

	    $wrap.find('.domain').removeAttr('data-pasted-value');//удаляем значение атрибута для проверки смены домена
	    $wrap.find('.logo_view').removeAttr('style');//удаляем атрибут стиль(в котором вероятно старый логотип) с предпросмотра лого

	    $wrap.find('.trig_btn').removeClass('active');//удаляем со всех перемычек активный класс

	    $wrap.find('.trig_btn[data-target="form_input"]').closest('.field_inp').removeClass('active'); //удаляем со всех перемычек активный класс

	    $wrap.find('.form_name,.form_phone,.form_email,.form_custom,input[name="input_count"]').val('0').attr('data-last-pushed', '0');

	    //кидываем настройки полей формы к дефолту при этом набрасывая клас сlean который будет блокировать валидацию при автоматическом вставлянии данных
	    $wrap.find('.trig_btn[data-input="name"]').val('1').attr('data-last-pushed', '1').addClass('active').closest('.field_inp').addClass('active');
	    $wrap.find('.trig_btn[data-input="phone"]').val('1').attr('data-last-pushed', '1').addClass('active').closest('.field_inp').addClass('active');

	    //удаяем все "ошибочные" классы, так как это очистка(сброс на дефолт)
	    $wrap.find('.error-input').removeClass('error-input');
	    $wrap.find('.error-button').removeClass('error-button');

	    $wrap.find('.error_info').html('');

	},
	start_autosave:function($this){

		var $sync_ico = $this.closest('.field_wrap').prev('.field_title').find('span.i-sync');

	        if($this.closest('#questions_col').length>0){

	            $sync_ico = $this.closest('#questions_col').find('span.i-sync');

	        } else if ($this.hasClass('lp3_pre_form_offer')) {

	            $sync_ico = $this.closest('.pre_form_offer').prev('.field_title').find('span.i-sync');

	        } else if ($this.hasClass('iph1')) {

	            $sync_ico = $this.closest('.step').find('.field_title.phone_g').find('span.i-sync');

	        } else if ($this.hasClass('iph4')) {

	            $sync_ico = $this.closest('.step').find('.field_title.ph_g').find('span.i-sync');

	        } else if ($this.closest('.slide_element').length>0) {

	            $sync_ico = $this.closest('.slide_element').find('span.i-sync');

	        } else if ($this.hasClass('metrics') || $this.hasClass('head_codes') || $this.hasClass('n_head_codes') || $this.hasClass('n_body_codes') || $this.hasClass('event_submited')) {

	            $sync_ico = $this.closest('.trig_wrap').closest('.field_wrap').prev('.field_title').find('span.i-sync');

	        } else if ($this.parent('.form_field_settings').length>0) {

	            $sync_ico = $this.siblings('.field_title').find('span.i-sync');

	        }

	    $sync_ico.fadeIn(300);//показываем возле ближайшего .label иконку синхронизации

	},
	end_autosave:function($this){
		var $sync_ico = $this.closest('.field_wrap').prev('.field_title').find('span.i-sync');

		if($this.closest('#questions_col').length>0){

			$sync_ico = $this.closest('#questions_col').find('span.i-sync');

		} else if ($this.hasClass('lp3_pre_form_offer')) {

			$sync_ico = $this.closest('.pre_form_offer').prev('.field_title').find('span.i-sync');

		} else if ($this.hasClass('iph1')) {

			$sync_ico = $this.closest('.step').find('.field_title.phone_g').find('span.i-sync');

		} else if ($this.hasClass('iph4')) {

			$sync_ico = $this.closest('.step').find('.field_title.ph_g').find('span.i-sync');

		} else if ($this.closest('.slide_element').length>0) {

			$sync_ico = $this.closest('.slide_element').find('span.i-sync');

		} else if ($this.hasClass('metrics') || $this.hasClass('head_codes') || $this.hasClass('n_head_codes') || $this.hasClass('n_body_codes') || $this.hasClass('event_submited')) {

			$sync_ico = $this.closest('.trig_wrap').closest('.field_wrap').prev('.field_title').find('span.i-sync');

		} else if ($this.parent('.form_field_settings').length>0) {

			$sync_ico = $this.siblings('.field_title').find('span.i-sync');

		}

        $this.attr('data-last-pushed', $this.val());//записываем этому инпутп в атрибут значение поля
        $sync_ico.addClass('checked').fadeOut(700, function() {
            //добавляем галочку на иконку снихронизации, скрываем за 700мс и уираем класс галочки с иконки синхронизации
            $sync_ico.removeClass('checked')
        });

	}

}
