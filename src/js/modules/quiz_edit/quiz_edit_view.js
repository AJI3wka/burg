 ;

'use strict';

console.log('quiz_edit.view start');


quiz_edit.view = {
	wrap:false,
	step_slider:false,
	edit_frame:false,
	edit_frame_body:false,
	frame_render_timer:false,
	frame_from_fullscreen_timer:false,
	frame_to_fullscreen_timer:false,
	resize_frame_timer:false,
	init_steps_slider:function() {
		
		var $wrap = quiz_edit.view.wrap;

		var $slider = $wrap.find('.steps_slider');
		if (!$slider.hasClass('initedSlider')) {
			quiz_edit.view.step_slider = $slider.bxSlider({
				responsive: true,
				infiniteLoop: false,
				controls: false,
				// adaptiveHeight: true,
				// adaptiveWidth: true,
				// adaptiveWidthSpeed: 0,
				// adaptiveHeightSpeed: 0,
				pager: false,
				speed: 300,
				minSlides: 1,
				maxSlides: 1,
				moveSlides: 1,
				//slideMargin: 50,
				touchEnabled: false,
				onSlideBefore: function($slideElement, oldIndex, newIndex) {
					quiz_edit.view.to_next_step(+newIndex+1);
					updateQueryStringParam('p',+newIndex+1);
					if(newIndex == 0){

						quiz_edit.view.wrap.addClass('quiz_lock');

					}else{

						quiz_edit.view.wrap.removeClass('quiz_lock');
					}


					if(newIndex == 0){

						quiz_edit.view.wrap.find('.to_next_step').show()
						quiz_edit.view.wrap.find('.to_prev_step').hide()
					}else if(newIndex == 4){

						quiz_edit.view.wrap.find('.to_next_step').hide()
						quiz_edit.view.wrap.find('.to_prev_step').show()
					}else{
						quiz_edit.view.wrap.find('.to_next_step').show()
						quiz_edit.view.wrap.find('.to_prev_step').show()
					}		

				},
				onSlideAfter: function($slideElement, oldIndex, newIndex) {
					
					//quiz_edit.view.resize_edit_frame();
					
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
    		//quiz_edit.events.rebind();

			var page = getURLParameter('p');
			var current = quiz_edit.view.step_slider.getCurrentSlide();


			if(page){

				var newIndex = parseInt(page)-1;

				quiz_edit.view.step_slider.goToSlide(newIndex);

				if(current == newIndex && current == 0){
					quiz_edit.view.wrap.addClass('quiz_lock');
				}		
				if(newIndex == 0){

					quiz_edit.view.wrap.find('.to_next_step').show()
					quiz_edit.view.wrap.find('.to_prev_step').hide()
				}else if(newIndex == 4){

					quiz_edit.view.wrap.find('.to_next_step').hide()
					quiz_edit.view.wrap.find('.to_prev_step').show()
				}else{
					quiz_edit.view.wrap.find('.to_next_step').show()
					quiz_edit.view.wrap.find('.to_prev_step').show()
				}		

			}else{
			
				if(current == 0){
					quiz_edit.view.wrap.addClass('quiz_lock');
				}				
	
				if(current == 0){

					quiz_edit.view.wrap.find('.to_next_step').show()
					quiz_edit.view.wrap.find('.to_prev_step').hide()
				}else if(current == 4){

					quiz_edit.view.wrap.find('.to_next_step').hide()
					quiz_edit.view.wrap.find('.to_prev_step').show()
				}else{
					quiz_edit.view.wrap.find('.to_next_step').show()
					quiz_edit.view.wrap.find('.to_prev_step').show()
				}		
				quiz_edit.view.step_slider.goToSlide(0);
			
			}
			
			// if ($wrap.find('.iframe_wrap iframe').length > 0) {
			// 	quiz_edit.view.resize_edit_frame(); // змаштабировать iframe
			// }
		}
	},
	// insert_edit_frame:function(callback){

	// 	function ready_frame(){


	// 		quiz_edit.view.edit_frame = document.getElementById("for_preview_quiz_lp").contentWindow;
	// 		quiz_edit.view.edit_frame_body = quiz_edit.view.wrap.find('#for_preview_quiz_lp').contents();

	// 		if(quiz_edit.view.edit_frame.atomq_load_app){
	// 			quiz_edit.view.edit_frame.atomq_load_app()
	// 		}

	// 		if(callback){
				
	// 			callback();

	// 		}else{

	// 			quiz_edit.view.insert_full_data_in_frame();
	// 		}

	// 		quiz_edit.view.resize_edit_frame(); // змаштабировать iframe


	// 	}

	// 	var frame_src = source_url+"/frame/quiz_page_template/"

	// 	var $lp1_ed = quiz_edit.view.wrap;

	// 	var $div = $lp1_ed.find('.iframe_wrap'); // находим нужный слайд

	// 	// var iframe = '<iframe id="for_preview_lp1" width="100%" height="100%" src="lp1_template/"></iframe>'; // создать iframe
	// 	var $iframe = $div.find('#for_preview_quiz_lp');


	//     $iframe.unbind('load');

	//     $iframe.bind('load',function(){
	    
	//         ready_frame();
	    

	//     });

	//     if($iframe.attr('src') != frame_src){
	        
	//         $iframe.attr('src', frame_src);

	//     }else{
	//         ready_frame();
	//     }

	// },
	// resize_edit_frame:function(animate,back) {

	// 	var $lp1_ed = quiz_edit.view.wrap;
	// 	var $iframe_wrap = $lp1_ed.find('.iframe_wrap');

	// 	if ($iframe_wrap.find('iframe').length < 1 || $(window).width() < 768) return;
		
		
	// 	var lp3_W = parseInt($(window).width());
	// 	var lp3_H = parseInt($(window).height());
	// 	var steps_right_offset = Math.abs(parseInt($lp1_ed.find('.steps_wrap').css('margin-right')));
	// 	var steps_top_offset = parseInt($lp1_ed.find('.header').height());
		
	// 	var divW = lp3_W - steps_right_offset; // ширина блока з iframe
	// 	var divH = lp3_H - steps_top_offset; // ширина блока з iframe

	// 	console.log('lp3_H = ',lp3_H,'; divH = ',divH);
	// 	console.log('steps_right_offset = ',steps_right_offset,'; lp3_W = ',lp3_W,'; divW = ',divW);

	// 	if (!animate) {

			
	// 	}else{
	// 		divW = lp3_W - 80;
	// 		divH = lp3_H - 58;
	// 	}

	// 	if(back){

	// 		divW = lp3_W - 530;
	// 		divH = lp3_H - 116;
	// 	}else{

	// 		if(if_defined(quiz_editor)&&if_defined(quiz_editor.model)&&if_defined(quiz_editor.model.q_data)&&if_defined(quiz_editor.model.q_data.qid)){

 //            	quiz_edit.model.load_quiz(quiz_editor.model.q_data.content);
	// 		}			
	// 	}

	// 	console.log('lp3_H = ',lp3_H,'; divH = ',divH);

	// 	if(quiz_edit.view.resize_frame_timer){
	// 		clearTimeout(quiz_edit.view.resize_frame_timer);
	// 	}
		
	// 	var $iframe = $iframe_wrap.find('iframe')
		
	// 	if($iframe.width()!=divW || $iframe.height()!=divH){
			
	// 		$iframe_wrap.addClass('blacked');
			
	// 		$iframe_wrap.width(divW+'px');



	// 		quiz_edit.view.resize_frame_timer = setTimeout(function(){


	// 			// if(quiz_edit.view.resize_frame_timer){
	// 			// 	clearTimeout(quiz_edit.view.resize_frame_timer);
	// 			// }

	// 			$iframe.width(divW+'px');
	// 			$iframe.height(divH+'px');

	// 			setTimeout(function(){
	// 				$iframe_wrap.removeClass('blacked');
	// 			},400);


	// 		},200);
			
	// 	}

	// },
	// insert_full_data_in_frame:function(){

	// 	quiz_edit.view.wrap.find('.change_iframe').each(function() {
	// 		quiz_edit.view.live_change_frame($(this));
	// 	});

	// },
	// live_change_frame:function($elem){

	// 	var $lp1_ed = quiz_edit.view.wrap;

	// 	if ($lp1_ed.find('.iframe_wrap').find('iframe').length < 1 || $(window).width() < 768) return;

	// 	var iFrame = quiz_edit.view.edit_frame;
	// 	var $view_body = quiz_edit.view.edit_frame_body;

	// 	var data_type = $elem.attr('data-input-type');
	// 	var data_last_pushed = $elem.attr('data-last-for-iframe');
	// 	var val = $elem.val();		
		
	// 	if (val == data_last_pushed 
	// 	&& data_type != 'bg_img_d' 
	// 	&& data_type != 'bg_img_m' 
	// 	&& data_type != 'logo_img'
	// 	&& !$elem.hasClass('content_autoplay')) return;

	// 	var $rend_el;

	// 	if (data_type == 'descriptor') {
	// 		$rend_el = $view_body.find('.descr').children('span');
	// 		if (val == '') $rend_el.text('Дескриптор');
	// 		else $rend_el.text(val);

	// 	} else if (data_type == 'offer_h1') {
	// 		$rend_el = $view_body.find('h1.h1').children('span');
	// 		if (val == '') $rend_el.text('Оффер основа');
	// 		else $rend_el.text(val);

	// 	} else if (data_type == 'offer_h2') {
	// 		$rend_el = $view_body.find('h2.h2').children('span');
	// 		if (val == '') $rend_el.text('Оффер преимущество');
	// 		else $rend_el.text(val);

	// 	} else if (data_type == 'page_email') {
	// 		$rend_el = $view_body.find('.email').children('span');
	// 		if (val == '') {
	// 			$rend_el.text('Email на странице');
	// 			$view_body.find('input[name="email"]').attr('placeholder', 'Email');
	// 		} else {
	// 			$rend_el.text(val);
	// 			$view_body.find('input[name="email"]').attr('placeholder', val);
	// 		}
			
	// 	} else if (data_type == 'act_email') {

	// 		if (val == '') $view_body.find('input[name="act_e"]').val('act_email@gmail.com');
	// 		else $view_body.find('input[name="act_e"]').val(val);
			
	// 	} else if (data_type == 'page_addr') {
	// 		$rend_el = $view_body.find('.addr').children('span');
	// 		if (val == '') $rend_el.text('Адрес на странице');
	// 		else $rend_el.text(val);
			
	// 	} else if (data_type == 'ph1') {
	// 		if (val == '') {
	// 			$view_body.find('#phone-link').text('Телефон для заявок');
	// 			$view_body.find('input[name="phone"]').attr('placeholder', 'Телефон');
	// 		} else {
	// 			$view_body.find('#phone-link').text(val);
	// 			$view_body.find('input[name="phone"]').attr('placeholder', val);
	// 		}
			
	// 	} else if (data_type == 'ph4') {
	// 		$view_body.find('.a-phone').text(val);
	// 		if ( if_defined(iFrame.make_phone_link) ) iFrame.make_phone_link();

	// 	} else if (data_type == 'bg_img_d') {
	// 		if (val != '0' && val != '') {
	// 			var d = new Date();
	// 			$view_body.find('.body-wrap.sec1').css('background-image', 'url(' + val + '?' + d.getTime() + ')');
	// 			$view_body.find('#pop-form').css('background-image', 'url(' + val + '?' + d.getTime() + ')');
	// 		} else {
	// 			$view_body.find('.body-wrap.sec1').css('background-image', 'url(img/bg_default.svg)');
	// 			$view_body.find('#pop-form').css('background-image', 'url(img/bg_default.svg)');
	// 		}

	// 	} else if (data_type == 'view_video') {
	// 		if (val != '0' && val != '') {
	// 			var d = new Date();
	// 			$view_body.find('.body-wrap .video-btn-wrap .text').html(val);
	// 		} else {				
	// 			$view_body.find('.body-wrap .video-btn-wrap .text').html('Посмотреть видео');
	// 		}

	// 	} else if (data_type == 'bg_video') {
		 	
	// 		if (youtube_parser(val)) {
	// 			$view_body.find('.sec1').css('background-image', 'none');
	// 			$view_body.find('body').attr('data-bg-video', youtube_parser(val));
	// 			$view_body.find('.video-background').show();
	// 			iFrame.vid_bg = youtube_parser(val);
	// 			if(if_defined(iFrame.init_bg_video)){

	// 				iFrame.init_bg_video();
	// 			}
	// 			if ( if_defined(iFrame.YT) ) iFrame.onYouTubeIframeAPIReady();
	// 		} else {
	// 			$view_body.find('body').attr('data-bg-video', '0');
	// 			$view_body.find('.video-background').hide();
	// 			$lp1_ed.find('.bg_img_d').trigger('blur');
	// 			iFrame.vid_bg = '0';
	// 		}
			
	// 	} else if (data_type == 'video') {

	// 		if (youtube_parser(val)) {
	// 			$view_body.find('body').attr('data-content-video', youtube_parser(val));
	// 			$view_body.find('.block_play_video').show();
	// 			$view_body.find('.video-wrap>img').css('opacity', '0');
	// 			iFrame.vid_content = youtube_parser(val);
	// 			if(if_defined(iFrame.init_bg_video)){

	// 				iFrame.init_bg_video();

	// 			}
	// 			if(if_defined(iFrame.reload_content_video)){

	// 				iFrame.reload_content_video();
					
	// 			}
				
	// 			if ( if_defined(iFrame.YT) ) iFrame.onYouTubeIframeAPIReady();
	// 		} else {
	// 			$view_body.find('.block_play_video').hide();
	// 			$view_body.find('body').attr('data-content-video', '0');
	// 			iFrame.vid_content = '0';
				
	// 		}
			
	// 	} else if ($elem.hasClass('content_autoplay')) {

	// 		$view_body.find('body').attr('data-content-autoplay', val);
	// 		iFrame.content_autoplay = val;
	// 		if ( if_defined(iFrame.YT) ) iFrame.onYouTubeIframeAPIReady();

	// 	} else if (data_type == 'logo_img') {
	// 		if (val != '0' && val != '') {
	// 			var d = new Date();
	// 			$view_body.find('.logo').css('background-image', 'url(' + val + '?' + d.getTime() + ')');
	// 			$view_body.find('body').attr('data-logo', 'url(' + val + '?' + d.getTime() + ')');
	// 		} else {
	// 			$view_body.find('.logo').css('background-image', 'none');
	// 			$view_body.find('body').attr('data-logo', '0');
	// 		}
			
	// 	} else if ($elem.hasClass('bg_shadow')) {
	// 		$view_body.find('.bg-shadow').css('opacity', val);
	// 		var ui_val = parseFloat(val) * 100;
	// 		$lp1_ed.find(".range_slider").slider("value", ui_val);
	// 		$lp1_ed.find('.range_line').css('width', ui_val + '%');
	// 	} 


	// 	if ($elem.hasClass('content_pre_form')) {
	// 		$view_body.find('body').attr('data-pre-form', val);
	// 		$rend_el = $view_body.find('.main-form').find('.h3').children('span');
	// 		if (if_defined($rend_el)) {
	// 			setTimeout(function(){
	// 				if ( if_defined(iFrame.change_main_text) ) iFrame.change_main_text($rend_el);
	// 				if ( if_defined(iFrame.init_rendering) ) iFrame.init_rendering();
	// 			}, 400);
	// 		}

	// 	} else if ($elem.hasClass('content_pre_form_offer')) {
	// 		$view_body.find('body').attr('data-pre-form-offer', val);

	// 	} else if ($elem.hasClass('pre_form_button')) {
	// 		$rend_el = $view_body.find('.pre-form').find('.btn').children('span');
	// 		if (val == '') $rend_el.text('Надпись на кнопке');
	// 		else $rend_el.text(val);

	// 	} else if ($elem.hasClass('pre_form_offer')) {
	// 		$rend_el = $view_body.find('.pre-form').find('.h3').children('span');
	// 		$rend_el.text(val);

	// 	}
		



	// 	if ($elem.hasClass('form_name')) {
	// 		$view_body.find('body').attr('data-form-name', val);
	// 	} else if ($elem.hasClass('form_phone')) {
	// 		$view_body.find('body').attr('data-form-phone', val);
	// 	} else if ($elem.hasClass('form_email')) {
	// 		$view_body.find('body').attr('data-form-email', val);
	// 	} else if ($elem.hasClass('form_custom')) {
	// 		$view_body.find('body').attr('data-form-custom', val);
	// 	}

	// 	if ($elem.hasClass('form_name') ||
	// 		$elem.hasClass('form_phone') ||
	// 		$elem.hasClass('form_email') ||
	// 		$elem.hasClass('form_custom')) {
	// 			var input_count = 0;
	// 			input_count += +$lp1_ed.find('.form_name').val();
	// 			input_count += +$lp1_ed.find('.form_phone').val();
	// 			input_count += +$lp1_ed.find('.form_email').val();
	// 			input_count += +$lp1_ed.find('.form_custom').val();
	// 			$view_body.find('body').attr('data-input-count', input_count);
	// 	}

	// 	if ($elem.hasClass('form_custom_name')) {
	// 		if (val == '') $view_body.find('input[name="custom_name"]').val('Название поля');
	// 		else $view_body.find('input[name="custom_name"]').val(val);

	// 	} else if ($elem.hasClass('form_custom_plac')) {
	// 		if (val == '') $view_body.find('input[name="custom"]').attr('placeholder', 'Надпись на поле');
	// 		else $view_body.find('input[name="custom"]').attr('placeholder', val);
	// 	}

	// 	if (data_type == 'form_head') {
	// 		$rend_el = $view_body.find('.main-form').find('.h3').children('span');
	// 		if (val == '') {
	// 			$rend_el.text('Надпись на форме');
	// 			$view_body.find('#pop-form').find('.h3').children('span').text('Надпись на форме');
	// 		}
	// 		else {
	// 			$rend_el.text(val);
	// 			$view_body.find('#pop-form').find('.h3').children('span').text(val);
	// 		}
			
	// 	} else if (data_type == 'form_button') {
	// 		$rend_el = $view_body.find('.main-form').find('.btn').children('span');
	// 		if (val == '') {
	// 			$view_body.find('.main-form').find('button[type="submit"]').children('span').text('Надпись на кнопке');
	// 			$view_body.find('#pop-form').find('button[type="submit"]').children('span').text('Надпись на кнопке');
	// 		} else {
	// 			$view_body.find('.main-form').find('button[type="submit"]').children('span').text(val);
	// 			$view_body.find('#pop-form').find('button[type="submit"]').children('span').text(val);
	// 		}
			
	// 	}



	// 	if (if_defined($rend_el)) {

	// 		if ( if_defined(iFrame.change_main_text) ) iFrame.change_main_text($rend_el);
	// 		//if ( if_defined(iFrame.init_rendering) ) iFrame.init_rendering();
	// 	}

	// 	$elem.attr('data-last-for-iframe', val);

	// 	if(if_defined(iFrame.hard_rerender)){
		

	// 		if (quiz_edit.view.frame_render_timer) {
	// 			clearTimeout(quiz_edit.view.frame_render_timer);
	// 		}

	// 		quiz_edit.view.frame_render_timer = setTimeout(function(){

	// 			iFrame.hard_rerender();
				
	// 		},1500);
		

	// 	}
	

	// },
	to_next_step:function(next){
		var $wrap = quiz_edit.view.wrap;

		var $steps_btn = $wrap.find('.steps_pager_item');
		$steps_btn.removeClass('active passed');
		
		$($steps_btn[+next-1]).addClass('active');
		
		for (var i=0; i<+next; i++) {
			$($steps_btn[i]).addClass('passed');
		}

		// if ($wrap.find('.iframe_wrap').find('iframe').length > 0 || $(window).width() > 767) {

		// 	if (next === 6) {
		// 		if ($wrap.find('.content_pre_form').val() == '1') {
		// 			quiz_edit.view.edit_frame_body.find('.pre-form .btn').trigger('click');
		// 		}
		// 	} else {
		// 		var $pop_form = quiz_edit.view.edit_frame_body.find('#pop-form');
		// 		if ( if_defined(quiz_edit.view.edit_frame.close_popup) ) quiz_edit.view.edit_frame.close_popup($pop_form);
		// 	}

		// }

		if(next == 6){
			$wrap.addClass('last_page_active');

			quiz_edit.model.init_helpers();
		}else{
			$wrap.removeClass('last_page_active');
			$wrap.removeClass('quiz_lock');

		}
	},
	go_to_step:function(current, next){
		if (next < current) {
			quiz_edit.view.step_slider.goToSlide(next-1);
		} else if (quiz_edit.view.step_slider) {

			// for (var i=1; i<next; i++) {
			// 	if (!quiz_edit.view.wrap.find('.step[data-step="'+i+'"]').hasClass('valid_step')) {
			// 		//if(!quiz_edit.model.validate_step(i)) {
			// 		//	quiz_edit.view.step_slider.goToSlide(i-1);
			// 		//	return;
			// 		//}
			// 	}
			// }

			quiz_edit.view.step_slider.goToSlide(next-1);
		}
	},
	paste_values:function(data,from_cache){

		if(data){
	    	quiz_edit.model.cur_data = data;

		}else{
			data = quiz_edit.model.cur_data;
		}


	    console.log('          paste_page_values(', data, ')');

	    var $wrap = quiz_edit.view.wrap;
	    

		var $trigs = $wrap.find('.trig_btn');

		$trigs.addClass('pasting');
	    if(!from_cache){
	    	quiz_edit.view.clean_inputs();//очситка всех значений
	    }

	    if (if_defined(data.name)) {//Если существует такое значение вставляем его в поле
	       $wrap.find('input[name="quiz_name"]').val(data.name);
	    }

	    if (if_defined(data.template)) {//Если существует такое значение вставляем его в поле
	        $wrap.find('input[name="template"]').val(data.template);
	    }

	    if (if_defined(data.id)) {//Если существует такое значение вставляем его в поле
	    	var cur_id = getURLParameter('i');
	        if(cur_id != data.id){

	        	updateQueryStringParam('i',data.id);

	        	// if(cur_id == 'new'){

	        	// 	dnk_atom_events({type:'event',category:'create',action:'lp1',link:data.id});


	        	// }

	        }else{

	        }

			$('#preview-site').attr('href', '//client.dnk.bz/'+data.id).show();
			$('#preview-site_s').attr('href', 'https://client.dnk.bz/'+data.id).html('https://client.dnk.bz/'+data.id).addClass('active');
			$('#preview-site_s').closest('.w_prewiev').addClass('ready');	
	    }

	    if (if_defined(data.domain)) {//Если домен заполнен записываем его в поле и накидываем атрибут вставленного значения(для проверки смены домена во время редактирования)


	    	var cyrilic = punycode.ToUnicode(data.domain)

	        $wrap.find('input[name="domain"]').val(cyrilic).attr('data-pasted-value', cyrilic);;


	        		
			$wrap.find('#domain_prev').attr('href', 'http://'+data.domain).show();	
			$wrap.find('#domain_prev_s').attr('href', 'http://'+data.domain).html('http://'+data.domain).addClass('active');

	    } else {//если нет, добавляем пустое значение  ватрибуте
	        $wrap.find('input[name="domain"]').attr('data-pasted-value', '');
			$wrap.find('#domain_prev').hide(); 
			$wrap.find('#domain_prev_s').removeClass('active');
	    }

	    if (if_defined(data.dnk_domain)) {//Если домен заполнен записываем его в поле и накидываем атрибут вставленного значения(для проверки смены домена во время редактирования)
	    	var dom = data.dnk_domain.replace('.atom.dnk.bz','').replace('.steps.one','');;

	        $wrap.find('input[name="inner_domain"]').val(dom).attr('data-last-save', dom);

	        		
			$wrap.find('#in_domain_prev').attr('href', 'https://'+dom+'.'+m_lbl_id).show();

			$wrap.find('#in_domain_prev_s').attr('href', 'https://'+dom+'.'+m_lbl_id).html('https://'+dom+'.'+m_lbl_id).addClass('active');			
       	
	    } else {//если нет, добавляем пустое значение  ватрибуте
	        $wrap.find('input[name="inner_domain"]').attr('data-last-save', '');
			$wrap.find('#in_domain_prev').hide(); 
			$wrap.find('#in_domain_prev_s').removeClass('active');
	    }

	    var content = data.content;//перепозначение контента в данных
	    console.log('          paste_page_values() - content', content);

	    /*-------обработка полученого контента  старт ---------*/
	    for (var key in content) {//цыкл по всем параметрам контента
			
			if(if_defined(content[key])){
				if (content[key].toString().indexOf('<br>') != -1) {//если в занчении найдено <br>

					var regex = /<br\s*[\/]?>/gi;
					content[key] = content[key].replace(regex, "\n");//заменяем все <br> на перенос строки
				}
				
			}


			if (key == 'aftersend_file' ||
				key == 'metrics_visor' ||
				key == 'bg_video' ||
				key == 'content_video' ||
				key == 'logo_img' ||
				key == 'content_autoplay' ||
				key == 'metrics' ||
				key == 'head_codes' ||
				key == 'n_head_codes' ||
				key == 'event_submited' ||
				key == 'n_body_codes' ||
				key == 'favicon_img' ||
				key == 'og_title' ||
				key == 'vcard_category' ||
				key == 'meta_keywords' ||
				key == 'meta_description' 
				){

				var targ = key;

				if (key == 'bg_video' || key == 'content_video'){

	                if(typeof content[key] != 'undefined' &&content[key] != '0' && content[key] != 'undefined' && content[key] != '' && content[key] != 'null' && content[key] != null && content[key].indexOf('youtube')==-1){	                
	                	content[key] = content[key].replace(content[key], 'https://www.youtube.com/watch?v=' + content[key]);
	                }

				}else if(key == 'logo_img'){

					targ = 'logo';

				}else if(key == 'favicon_img'){

					targ = 'favicon';

				}else if(key == 'og_title'){

					targ = 'og';

				}else if(key == 'vcard_category'){

					targ = 'vcard';

				}else if(key == 'meta_keywords' || key== 'meta_description'){

					targ = 'meta';

				}

				if (typeof content[key] != 'undefined' &&content[key] != '0' && content[key] != 'undefined' && content[key] != '' && content[key] != 'null' && content[key] != null)  {
	               


	            	$wrap.find('.trig_btn[data-target="'+targ+'"]').addClass('active');

	            } else {
	               
	            	$wrap.find('.trig_btn[data-target="'+targ+'"]').removeClass('active');


	            }				



			}






	        if (key == 'theme') {//аналогичная обраотка для параметра автоплея
	            if (content[key] != '0' && content[key] != '' && content[key] != 'dark') {
	            	$wrap.find('.trig_btn[data-target="color_theme"]').addClass('active');
	            } else {
	            	$wrap.find('.trig_btn[data-target="color_theme"]').removeClass('active');
	            }
	        }

	        if (key == 'm_color') {//аналогичная обраотка для параметра автоплея
	        	var $list = $wrap.find('.color-list');
	            if (content[key] != '0' && content[key] != '') {
	                if (!$list.find('.c-item[data-val="'+content[key]+'"]').hasClass('active')) {
	                	$list.find('.c-item').removeClass('active');
	                	$list.find('.c-item[data-val="'+content[key]+'"]').addClass('active');
	                }
	            }
	        }    

	        //заполнение полей ввода в преедлах области редактора занчениями с конетнта
	        var $cur_input = $wrap.find('input[name="' + key + '"],textarea[name="' + key + '"]');

	        if($cur_input.val() != content[key]){

	        	if(key == 'act_email'){
	        		//content[key]

                	var n_val = punycode.ToUnicode(content[key].split('@')[0]) + '@' + punycode.ToUnicode(content[key].split('@')[1]);
                	
	        		$cur_input.val(n_val).attr('data-last-pushed', '').trigger('input');
	        	
	        	}else{

	        		$cur_input.val(content[key]).attr('data-last-pushed', '').trigger('input');
	        	}


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


	    for (var i = quiz_edit.model.inputs.length - 1; i >= 0; i--) {//по всему вектору всевозможных полей

	        var inp = quiz_edit.model.inputs[i];

	        if (inp.hasOwnProperty('key')) {//если елемент вектора имеет key (что заначит тчо он хранится на бекенде)



	            var $input = $wrap.find(inp.selector);//присваиванее елемнет jq инпута
	            var val = $input.val();
	            	if(if_defined(val)){
	            		val = val.replace(/\n/g,"<br>"); 
	            	}
	            $input.attr('data-last-pushed', val);// запись текущего значения  ватрибут data-last-pushed (для автосейва)
				
				if(if_defined(val)){

	            	if($input.is('.reqired_inp')){
	            		$input.removeClass('reqired_inp');
	            	}else if($input.attr('name')=="logo_img"||$input.attr('name')=="bg_img_d"){
	            		$input.closest('.field_inp').find('label.reqired_inp').removeClass('reqired_inp')
	            	}

	            }
	        }

	    }

	    $('.radio').removeClass('clean');//удаление класа который блокирует стандартные действия радиобатон(сделано для установки значений)

	    // $('#input_count').val($wrap.find('.radio.active').length);//заполнение поля input_count (поле нужно для проверки количества выбраных полей)

	    console.log('          paste_page_values() - values_pasted - ', content);


		$trigs.removeClass('pasting');

		if (quiz_edit.model.glvrd.inited) {
			quiz_edit.model.glvrd.clean_test();
		}

	    quiz_edit.events.bind_input_listening();//включить "слушанье" полей ввода для автосейва вносимих изменений

	},
	clean_inputs:function(){
		var $wrap = quiz_edit.view.wrap;

		quiz_edit.events.unbind_input_listening();

	    $wrap.find('.step').removeClass('valid_step');

	    console.log('          clean_page_editor_values()');

	    for (var i = quiz_edit.model.inputs.length - 1; i >= 0; i--) {//по всему вектору полей
	        var inp = quiz_edit.model.inputs[i];//получение объекта для этого поля ввода
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

	    $wrap.find('.error_info').text('');

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

	        } else if ($this.hasClass('metrics') || $this.hasClass('head_codes') || $this.hasClass('event_submited') || $this.hasClass('n_head_codes') || $this.hasClass('n_body_codes') || $this.hasClass('new_uploads')) {

	            $sync_ico = $this.closest('.trig_wrap').closest('.field_wrap').prev('.field_title').find('span.i-sync');

	        } else if ($this.parent('.form_field_settings').length>0) {

	            $sync_ico = $this.siblings('.field_title').find('span.i-sync');

	        }

	    $sync_ico.fadeIn(300);//показываем возле ближайшего .label иконку синхронизации

	},
	end_autosave:function($this,bad_response){
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

		} else if ($this.hasClass('metrics') || $this.hasClass('head_codes') || $this.hasClass('n_head_codes') || $this.hasClass('n_body_codes')  || $this.hasClass('event_submited')) {

			$sync_ico = $this.closest('.trig_wrap').closest('.field_wrap').prev('.field_title').find('span.i-sync');

		} else if ($this.parent('.form_field_settings').length>0) {

			$sync_ico = $this.siblings('.field_title').find('span.i-sync');

		}

        $this.attr('data-last-pushed', $this.val().replace(/\n/g,'<br>'));//записываем этому инпутп в атрибут значение поля
        
        if(bad_response){


	        $sync_ico.fadeOut(700, function() {
	            //добавляем галочку на иконку снихронизации, скрываем за 700мс и уираем класс галочки с иконки синхронизации
	            $sync_ico;
	        });
        }else{
	        $sync_ico.addClass('checked').fadeOut(700, function() {
	            //добавляем галочку на иконку снихронизации, скрываем за 700мс и уираем класс галочки с иконки синхронизации
	            $sync_ico.removeClass('checked')
	        });
        }

	},
	glvrd:{
		wrap:false,
		show_desc:function(ind){
			var $o_wrp = this.wrap.find('.g_wrp');
			var frag = quiz_edit.model.glvrd.cur_res.fragments;
			$o_wrp.find('.g_name').html(frag[ind].hint.name);
			$o_wrp.find('.g_text').html(frag[ind].hint.description);
			$o_wrp.find('.g_status').hide();
			$o_wrp.find('.g_desc').show();

		},
		hide_desc:function(){
			var $o_wrp = this.wrap.find('.g_wrp');
			$o_wrp.find('.g_desc').hide();
			$o_wrp.find('.g_status').show();

		}
	}

}
