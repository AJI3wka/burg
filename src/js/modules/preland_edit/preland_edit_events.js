;

'use strict';

console.log('preland_edit.events start');

preland_edit.events = {
	update_on_blur_timer:false,
	resize_window_timer:false,
	unbind_input_listening:function(){



	    preland_edit.view.wrap.find(preland_edit.model.get_input_selectors()).unbind('blur', preland_edit.events.input_update_on_blur);//на все эти селекторы удаляем с евента выхода с фокуса автосоранения


	},
	bind_input_listening:function(){

	    preland_edit.view.wrap.find(preland_edit.model.get_input_selectors()).bind('blur', preland_edit.events.input_update_on_blur);//на все эти селекторы ставим на выход с фокуса евент автосоранения
	    //$(selectors).bind('change', input_update_on_blur);

	},
	input_update_on_blur:function(event) {
		////alert('blur');
		//
	    if (preland_edit.events.update_on_blur_timer) {
	        clearTimeout(preland_edit.events.update_on_blur_timer);
	    }

	    var $this = $(this);
	    // var _this = this
	    
	    // validate.input($this);

	    // preland_edit.events.update_on_blur_timer = setTimeout(function(){
	    	
			// if ($(this).is('.bg_img_d')) {
			// 	//alert('wtf');
			// }
			//////alert('start_autosave',$this.attr('data-last-pushed'),$this.attr('name'));

	        validate.input($this);//валидация этого инпута

	        if (!$this.hasClass('error-input')) {//если нет ошибок

	            //var _this = _this;//перепрозначем this для пропроса дальше

	            if ($this.attr('data-last-pushed') != $this.val()) {//если значение и последнее сохраненное значение которое хранится в атрибуте отличаются

	                


	            	preland_edit.model.update_cur_from_elem($this);


	            	preland_edit.events.update_on_blur_timer = setTimeout(function(){

		            	preland_edit.view.start_autosave($this);

		            	preland_edit.controller.save(true,function(){
		            		
		            		preland_edit.view.end_autosave($this);

		            	});   

	            	},300);                 

	            } else {
	                console.log('          update_data() - nochanges');
	            }

	        }

	    // },2500);	    

	},
	trig_click_handler:function() {

		var $this = $(this);

        var target = $this.data('target');

        if (target == "form_input") return false;


        if ($this.hasClass('disabled') && !$this.hasClass('pasting')) {
            
            show_info_pop('Эта функция станет доступна сразу после активации аккаунта по одному из <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тарифов</a>.','Активируйте аккаунт');

            return false;
        }

        var $wrap = preland_edit.view.wrap;

        var $slide_wrap = $this.closest('.slide_element');
        var $sync_ico_slide = $slide_wrap.closest('.field_wrap').find('span.i-sync');

        if (!$this.hasClass('active')) {

            $this.addClass('active');

            if (target == 'logo') {
                $wrap.find('.logo_img').val('')
            } else
            if (target == 'bg_video') {
                $wrap.find('.bg_video').val('')
            } else
            if (target == 'content_autoplay') {
                $wrap.find('.content_autoplay').val('1').trigger('blur');
            } else
            if (target == 'content_video') {
                $wrap.find('.content_video').val('');
                $wrap.find('.template').val('wiv').trigger('blur');
            } else
            if (target == 'pre_form') {
                $wrap.find('#pre_form').addClass('active');
                $wrap.find('.content_pre_form').val('1').trigger('blur');

                // if ($wrap.find('.pre_form_button').val() == '0') {
                    $wrap.find('.pre_form_button').val('').trigger('blur');
                // }
                $wrap.find('.pre_form_offer').val('').trigger('blur');
            } else
            if (target == 'page_campaig') {
                $('#page_for_campaign').val($('#page_selectize').val()).trigger('blur');
            } else if (target == 'metrics') {
                $wrap.find('.metrics').val('').trigger('blur');
            }  else if (target == 'mirror_iframe_trig') {
                $wrap.find('.mirror_iframe_trig').val('1').trigger('blur');
            }else if (target == 'head_codes') {
                $wrap.find('.head_codes').val('').trigger('blur');
            }else
            if (target == 'n_head_codes') {
                $wrap.find('.n_head_codes').val('').trigger('blur');
            } else
            if (target == 'n_head_codes') {
                $wrap.find('.n_head_codes').val('').trigger('blur');
            } else
            if (target == 'event_submited') {
                $wrap.find('.event_submited').val('').trigger('blur');
            } else if (target == 'favicon') {
	            $wrap.find('.favicon_img').val('').trigger('blur');
	        } else if (target == 'og') {
	            $wrap.find('.og_title').val('').trigger('blur');
	            $wrap.find('.og_descriptor').val('').trigger('blur');
	            $wrap.find('.og_img').val('').trigger('blur');
	        } else if (target == 'meta') {
	            $wrap.find('.meta_description').val('').trigger('blur');
	            $wrap.find('.meta_keywords').val('').trigger('blur');
	        } else if (target == 'vcard') {
	            $wrap.find('.vcard_category').val('').trigger('blur');
	            $wrap.find('.vcard_company').val('').trigger('blur');
	            $wrap.find('.vcard_works').val('').trigger('blur');
	        }  else if (target == 'aftersend_file') {
	            $wrap.find('.aftersend_file').val('').trigger('blur');
	        } else if (target == 'quiz_enabled') {
                preland_edit.model.load_quiz_list();
                if (getURLParameter('p')==3) {
                    $('.body').addClass('quiz_lock');

                }
                $wrap.find('#quiz_enabled.block_trig_wrap').addClass('active');
                var $pre_form = $wrap.find('.trig_btn[data-target="pre_form"]');
                if (!$pre_form.hasClass('active')) {
                    $pre_form.trigger('click');
                }
                $wrap.find('.default_form').hide();
            } else if (target == 'metrics_visor') {
	            $wrap.find('.metrics_visor').val('1').trigger('blur');
	        }


        } else {

            $this.removeClass('active');

            if (target == 'logo') {
                $('.preview').attr('data-logo', '0');
                $wrap.find('.logo_img').val('0').trigger('input').trigger('blur');
            } else
            if (target == 'bg_video') {
                $wrap.find('.bg_video').val('0').trigger('blur');
            } else
            if (target == 'content_autoplay') {
                $wrap.find('.content_autoplay').val('0').trigger('blur');
            } else
            if (target == 'content_video') {
                $wrap.find('.content_video').val('0').trigger('blur');
                $wrap.find('.template').val('wov').trigger('blur');
            } else if(target == 'theme') {
                $wrap.find('.theme').val('dark').trigger('blur');
            } else
            if (target == 'pre_form') {
                $wrap.find('#pre_form').removeClass('active');
                $wrap.find('.content_pre_form').val('0').trigger('blur');

                //if ($wrap.find('.pre_form_button').val() == '') {
                    $wrap.find('.pre_form_button').val('0').trigger('blur');
                //}
                $wrap.find('.content_pre_form_offer').val('0').trigger('blur');
                $wrap.find('.pre_form_offer').val('0').trigger('blur');
            } else
            if (target == 'page_campaig') {
                $('#page_for_campaign').val('0').trigger('blur');
            }else 
            if (target == 'metrics') {
                $wrap.find('.metrics').val('0').trigger('blur');
            } else if (target == 'mirror_iframe_trig') {
                $wrap.find('.mirror_iframe_trig').val('0').trigger('blur');
            }else 
            if (target == 'head_codes') {
                $wrap.find('.head_codes').val('0').trigger('blur');
            }else
            if (target == 'n_head_codes') {
                $wrap.find('.n_head_codes').val('0').trigger('blur');
            } else
            if (target == 'n_body_codes') {
                $wrap.find('.n_body_codes').val('0').trigger('blur');
            } else
            if (target == 'event_submited') {
                $wrap.find('.event_submited').val('0').trigger('blur');
            }
 else if (target == 'favicon') {
	            $wrap.find('.favicon_img').val('0').trigger('blur');
	        } else if (target == 'og') {
	            $wrap.find('.og_title').val('0').trigger('blur');
	            $wrap.find('.og_descriptor').val('0').trigger('blur');
	            $wrap.find('.og_img').val('0').trigger('blur');
	        } else if (target == 'meta') {
	            $wrap.find('.meta_description').val('0').trigger('blur');
	            $wrap.find('.meta_keywords').val('0').trigger('blur');
	        } else if (target == 'vcard') {
	            $wrap.find('.vcard_category').val('0').trigger('blur');
	            $wrap.find('.vcard_company').val('0').trigger('blur');
	            $wrap.find('.vcard_works').val('0').trigger('blur');
	        }else if (target == 'aftersend_file') {
	            $wrap.find('.aftersend_file').val('0').trigger('blur');
	        } else if (target == 'quiz_enabled') {
                $wrap.find('.default_form').show();
                $('.body').removeClass('quiz_lock');
                $wrap.find('#quiz_enabled.block_trig_wrap').removeClass('active');
                preland_edit.model.remove_quiz_from_page();
            } else if (target == 'metrics_visor') {
	            $wrap.find('.metrics_visor').val('0').trigger('blur');
	        }

        }
	},
	form_check_click_hendler:function() {
	    var $wrap = $(this);
	    var $body = preland_edit.view.wrap;
	    var $input_count = $body.find('input[name="input_count"]');
	    if (!$wrap.hasClass('clean')) {
	        if (!$wrap.hasClass('frozen')) {
	            if (!$wrap.hasClass('active')) {
	                if (parseInt($input_count.val()) < 3) {

	                    $wrap.addClass('active').parent().addClass('active');

	                    if ($wrap.attr('data-input') == 'name') {
	                        $body.find('.form_name').val('1').trigger('blur');
	                    } else
	                    if ($wrap.attr('data-input') == 'phone') {
	                        $body.find('.form_phone').val('1').trigger('blur');
	                        //$wrap.addClass('needed');
	                    } else
	                    if ($wrap.attr('data-input') == 'email') {
	                        $body.find('.form_email').val('1').trigger('blur');
	                        //$wrap.addClass('needed');
	                    } else
	                    if ($wrap.attr('data-input') == 'custom') {
	                        $body.find('.form_custom').val('1').trigger('blur');

	                        $wrap.closest('.field_inp').find('input').each(function() {
	                            var inp_val = $wrap.val();

	                            //console.log(inp_val);
	                            if (inp_val == '0') {
	                                $wrap.val('').trigger('blur').removeClass('error-input');
	                            }

	                        });
	                    }
	                } else {
	                    show_alert_mess('Максимальное количество полей в форме 3');
	                }
	            } else {
	                if (parseInt($input_count.val()) > 1) {

	                    if ($wrap.hasClass('needed')) {

	                        var empty_not = $wrap.closest('.form_field_settings').find('.trig_btn.active.needed').length;

	                        console.log('empty_not', empty_not);

	                        if (empty_not > 1) {

	                            $wrap.removeClass('active').parent().removeClass('active');

	                            if ($wrap.attr('data-input') == 'name') {
	                                $body.find('.form_name').val('0').trigger('blur');
	                            } else
	                            if ($wrap.attr('data-input') == 'phone') {
	                                $body.find('.form_phone').val('0').trigger('blur');
	                                //$wrap.removeClass('needed');
	                            } else
	                            if ($wrap.attr('data-input') == 'email') {
	                                $body.find('.form_email').val('0').trigger('blur');
	                                //$wrap.removeClass('needed');
	                            } else
	                            if ($wrap.attr('data-input') == 'custom') {
	                                $body.find('.form_custom').val('0').trigger('blur');

	                                $wrap.closest('.field_inp').find('input').each(function() {
	                                    var inp_val = $wrap.val();

	                                    //console.log(inp_val);
	                                    if (inp_val == '') {
	                                        $wrap.val('0').trigger('blur').removeClass('error-input');
	                                    }

	                                });
	                            }

	                        } else {
	                            show_alert_mess('Email или Телефон обязательное поле в форме')
	                        }
	                    } else {


	                        $wrap.removeClass('active').parent().removeClass('active');

	                        if ($wrap.attr('data-input') == 'name') {
	                            $body.find('.form_name').val('0').trigger('blur');
	                        } else
	                        if ($wrap.attr('data-input') == 'phone') {
	                            $body.find('.form_phone').val('0').trigger('blur');
	                            //$wrap.removeClass('needed');
	                        } else
	                        if ($wrap.attr('data-input') == 'email') {
	                            $body.find('.form_email').val('0').trigger('blur');
	                            //$wrap.removeClass('needed');
	                        } else
	                        if ($wrap.attr('data-input') == 'custom') {
	                            $body.find('.form_custom').val('0').trigger('blur');

	                            $wrap.closest('.field_inp').find('input').each(function() {
	                                var inp_val = $wrap.val();

	                                //console.log(inp_val);
	                                if (inp_val == '') {
	                                    $wrap.val('0').trigger('blur').removeClass('error-input');
	                                }

	                            });
	                        }
	                    }

	                } else {
	                    show_alert_mess('Минимальное количество полей в форме 1');

	                }

	            }
	        }

	    } else {
	        $wrap.removeClass('clean');


	        if (!$wrap.hasClass('active')) {

	            $wrap.addClass('active').parent().addClass('active');

	            if ($wrap.attr('data-input') == 'name') {
	                $body.find('.form_name').val('1').trigger('blur');
	            } else
	            if ($wrap.attr('data-input') == 'phone') {
	                $body.find('.form_phone').val('1').trigger('blur');
	                //$wrap.addClass('needed');
	            } else
	            if ($wrap.attr('data-input') == 'email') {
	                $body.find('.form_email').val('1').trigger('blur');
	                //$wrap.addClass('needed');
	            } else
	            if ($wrap.attr('data-input') == 'custom') {
	                $body.find('.form_custom').val('1').trigger('blur');

	                $wrap.closest('.field_inp').find('input').each(function() {
	                    var inp_val = $wrap.val();

	                    //console.log(inp_val);
	                    if (inp_val == '0') {
	                        $wrap.val('').trigger('blur').removeClass('error-input');
	                    }

	                });
	            }

	        } else {

	            $wrap.removeClass('active').parent().removeClass('active');

	            if ($wrap.attr('data-input') == 'name') {
	                $body.find('.form_name').val('0').trigger('blur');
	            } else
	            if ($wrap.attr('data-input') == 'phone') {
	                $body.find('.form_phone').val('0').trigger('blur');
	                //$wrap.removeClass('needed');
	            } else
	            if ($wrap.attr('data-input') == 'email') {
	                $body.find('.form_email').val('0').trigger('blur');
	                //$wrap.removeClass('needed');
	            } else
	            if ($wrap.attr('data-input') == 'custom') {
	                $body.find('.form_custom').val('0').trigger('blur');

	                var inp = $wrap.find('input');
	                inp.each(function() {
	                    var inp_val = $wrap.val();

	                    //console.log(inp_val);
	                    if (inp_val == '') {
	                        $wrap.val('0').trigger('blur').removeClass('error-input');
	                    }

	                });
	            }
	        }


	    }

	    $input_count.val($wrap.closest('.form_field_settings').find('.trig_btn.active').length);

	    //var empty_not = wrap.parent().find('.trig_btn.active.needed').length;

	},
	bg_shadow_input_handler:function() {

        var $wrap = preland_edit.view.wrap;
        // $view_body.find('.bg_shadow').css('opacity', val);
        var ui_val = parseFloat($(this).val()) * 100;
        $wrap.find('.range_slider').slider('value', ui_val);
        $wrap.find('.range_line').css('width', ui_val + '%');

    },
    youtube_helper:function() {
        if ($(this).val().length > 10) {
            $(this).addClass('inputed');
        } else {
            $(this).removeClass('inputed');
        }
    },
	logo_change_handler:function(e){
        e.preventDefault();

        var $wrap_in = preland_edit.view.wrap;
        var $label = $(this).closest('.hidden-box').parent().find('label');

        preland_edit.controller.upload_img(this, 'logo', function(data) {
            
            var logo = data.data.img_url;

            $wrap_in.find('.logo_img').val(logo).trigger('input').trigger('blur');

            console.log('          upload_img_callback - ', logo);
            
            var old_text = $label.html();

            $label.html('Файл загружен');
	        $label.removeClass('reqired_inp');
            setTimeout(function(){
                $label.html(old_text);

            },4000);

        })

    },
	bg_change_handler:function(e){
        e.preventDefault();
        var $wrap_in = preland_edit.view.wrap;
        
        var $label = $(this).closest('.hidden-box').parent().find('label');
        preland_edit.controller.upload_img(this, 'bg', function(data) {
            var d = new Date();
            var bg = data.data.img_url;
            var bg_m = data.data.img_min_url;

            $wrap_in.find('.bg_img_d').val(bg).trigger('blur');
            $wrap_in.find('.bg_img_m').val(bg_m).trigger('blur');

            console.log('          upload_img_callback - ', bg, bg_m);
            //$('.preview').css('background-image', 'url(' + bg + '?' + d.getTime() + ')');
            //$('.sec7 .block .logo_img').css('background-image','url('+logo+'?'+d.getTime()+')');
            var old_text = $label.html();

            $label.html('Файл загружен');
	        $label.removeClass('reqired_inp');
            setTimeout(function(){
                $label.html(old_text);

            },4000);
        })

    },
    pre_offer_helper: function() {
	    if ($(this).val() != '0' && $(this).val() != '') {
	        $('.content_pre_form_offer').val('1').trigger('blur');
	    } else {
	        $('.content_pre_form_offer').val('0').trigger('blur');
	    }
	},
	content_video_helper:function(event) {
        if ($(this).hasClass('active')) {
            $(this).parent().find('.like_abs').hide();
        } else {
            $(this).parent().find('.like_abs').show();
        }
    },
    change_iframe_helper:function() {
		if(!preland_edit.view.wrap.is(':visible')){
			return false;
		}
		preland_edit.view.live_change_frame($(this));
	},
	resize_helper:function(){
		if (preland_edit.events.resize_window_timer) {
			clearTimeout(preland_edit.events.resize_window_timer);
		}
		preland_edit.events.resize_window_timer = setTimeout(function(){

			if (preland_edit.view.wrap.is(':visible') && $(window).width() > 767) {
				preland_edit.view.resize_edit_frame();
			}
		},150);
	},
	file_input_change_handler:function(e) {

	    var $wrap = $(this).closest('.hidden-box');
	    var type = $(this).attr('data-upload-type');
	    var $label = $(this).closest('.hidden-box').parent().find('label');
	    preland_edit.controller.upload_img(this, type, function(data) {
	        //logo, bg, , block_bg, slide, , download  
	         
	        if (type == 'favicon') {
	            $wrap.find('input[name="favicon_img"]').val(data.data.img_url).trigger('blur');

	        } else if (type == 'social') {

	            $wrap.find('input[name="og_img"]').val(data.data.img_url).trigger('blur');
	        } else if (type == 'download') {
	            $wrap.find('input[name="aftersend_file"]').val(data.data.img_url).trigger('blur');


	        } 
	        
	        var old_text = $label.html();
	        
	        $label.html('Файл загружен');
	        $label.removeClass('reqired_inp');
	        setTimeout(function(){
	            $label.html(old_text);

	        },4000);


	    });

	},    
	mirror_domain_helper: function(){
		var new_val = $(this).val();
		//var new_val = 'https://webdone.info/dadas/asdasd/asdasd/';
		var re1 = /^http\:\/\//g;
		var re2 = /^https\:\/\//g;
		var re3 = /^.\*\/\//g;
		var re4 = /^\//g;
		var re5 = /\/.*$/g;
		if (if_defined(new_val.match(re1)) && new_val.match(re1).length>0) {
			new_val = new_val.replace('http://','');
			preland_edit.view.wrap.find('input[name="mirror_protocol"]').val('http://').trigger('blur');

			var $items = preland_edit.view.wrap.find('.select').find('.item');
			$items.removeClass('active');

			$items.each(function(index, el) {
				if($(this).text() == 'http://'){
					$(this).addClass('active');
				}
			});

		}
		if (if_defined(new_val.match(re2)) && new_val.match(re2).length>0) {
			new_val = new_val.replace('https://','');
			preland_edit.view.wrap.find('input[name="mirror_protocol"]').val('https://').trigger('blur');

			var $items = preland_edit.view.wrap.find('.select').find('.item');
			$items.removeClass('active');

			$items.each(function(index, el) {
				if($(this).text() == 'https://'){
					$(this).addClass('active');
				}
			});

		}

		if (if_defined(new_val.match(re3)) && new_val.match(re3).length>0) {
			new_val = new_val.replace(re3,'');
		}		
		if (if_defined(new_val.match(re4)) && new_val.match(re4).length>0) {
			new_val = new_val.replace(re4,'');
		}	

		if (if_defined(new_val.match(re5)) && new_val.match(re5).length>0) {

			preland_edit.view.wrap.find('input[name="mirror_page"]').val(new_val.match(re5)[0]).trigger('blur');

			new_val = new_val.replace(re5,'');
		}

		$(this).val(new_val);

		//return new_val;
	},
	valid_enter_tab_keypress:function(e){
		if ( e.which == 13 || e.keyCode == 9){
	    	e.preventDefault();
	    	e.stopPropagation();

	    	var $this = $(this);
	    	var $page = $this.closest('.scroll_content');
	    	var $inputs = $page.find('input.valid:visible,textarea.valid:visible');


            if (e.shiftKey) {

                if ($inputs.first()[0] != $this[0]) {
                    $this.trigger('blur');
                    var next_last = false;
                    for (var i = $inputs.length - 1; i >= 0; i--) {

                        if (next_last) {
                            next_last = false;
                            $inputs[i].focus();
                        }
                        if ($inputs[i] == $this[0]) {
                            next_last = true
                        }
                    }
                    // $inputs.each(function(index, el) {
                    // 	if (next_last) {
                    // 		next_last = false;
                    // 		$(this).focus();
                    // 	}
                    // 	if ($(this)[0] == $this[0]) {
                    // 		next_last = true
                    // 	}
                    // });

                } else {
                    $this.trigger('blur');
                    $page.find('.to_prev_step').trigger('click');

                    setTimeout(function() {
                            $page.closest('.step').prev('.step').find('input.valid:visible,textarea.valid:visible').last().focus();
                            //$slideElement.find('input.valid:visible,textarea.valid:visible').first().focus();
                        }, 500)
                        //
                }

            } else {

                if ($inputs.last()[0] != $this[0]) {
                    $this.trigger('blur');
                    var next_last = false;
                    $inputs.each(function(index, el) {
                        if (next_last) {
                            next_last = false;
                            $(this).focus();
                        }
                        if ($(this)[0] == $this[0]) {
                            next_last = true
                        }
                    });

                } else {
                    $this.trigger('blur');
                    $page.find('.to_next_step').trigger('click');

                    if ($page.find('.error-input').length==0) {

                    setTimeout(function() {
                            $page.closest('.step').next('.step').find('input.valid:visible,textarea.valid:visible').first().focus();
                            //$slideElement.find('input.valid:visible,textarea.valid:visible').first().focus();
                        }, 500)
                    }
                        //
                }

            }

	    	console.log('WTF_TAB = ',$inputs,$inputs.last(),$this)
	    	return false;
	    }
		
	},
    rebind: function() {

    	// preland_edit.view.wrap = $('#body');

    	// preland_edit.events.unbind_input_listening();
    	// preland_edit.events.bind_input_listening();

    	var $wrap = preland_edit.view.wrap;

    	$wrap.uitooltip();

    	validate.live($wrap);

    	$wrap.find('.i_info_pop,.i_info_vid,.i_info_list').unbind('click');
    	$wrap.find('.i_info_pop,.i_info_vid,.i_info_list').click(function(e){
    		e.preventDefault();
    		open_from_url($(this).attr('href'),true);
    	});
    	
    	$wrap.find('input.valid,textarea.valid').unbind('keydown',preland_edit.events.valid_enter_tab_keypress);
    	$wrap.find('input.valid,textarea.valid').bind('keydown',preland_edit.events.valid_enter_tab_keypress);


    	$wrap.find('#upfile1').unbind('change',preland_edit.events.logo_change_handler);
	    $wrap.find('#upfile1').bind('change',preland_edit.events.logo_change_handler);

    	$wrap.find('#upfile2').unbind('change',preland_edit.events.bg_change_handler);
	    $wrap.find('#upfile2').bind('change',preland_edit.events.bg_change_handler);

		$wrap.find('.new_uploads').unbind('change',preland_edit.events.file_input_change_handler);
		$wrap.find('.new_uploads').bind('change',preland_edit.events.file_input_change_handler);

	    $wrap.find('.trig_btn').unbind('click',preland_edit.events.trig_click_handler);
	    $wrap.find('.trig_btn').bind('click',preland_edit.events.trig_click_handler);

	    $wrap.find('.trig_btn[data-target="form_input"]').unbind('click',preland_edit.events.form_check_click_hendler);
	    $wrap.find('.trig_btn[data-target="form_input"]').bind('click',preland_edit.events.form_check_click_hendler);

	    $wrap.find('input[name="bg_shadow"]').unbind('input',preland_edit.events.bg_shadow_input_handler);
	    $wrap.find('input[name="bg_shadow"]').bind('input',preland_edit.events.bg_shadow_input_handler);

	    $wrap.find('input.mirror_domain').unbind('input',preland_edit.events.mirror_domain_helper);
	    $wrap.find('input.mirror_domain').bind('input',preland_edit.events.mirror_domain_helper);

	    $wrap.find('input.youtube').unbind('blur input change', preland_edit.events.youtube_helper);
	    $wrap.find('input.youtube').bind('blur input change', preland_edit.events.youtube_helper);

	    $wrap.find('input[name="phone_p1"]').ForcePhoneOnly();
	    $wrap.find('input[name="phone_p4"]').ForceNumericOnly();

        $wrap.find('.publish_btn,.fast_publish').unbind('click')
        $wrap.find('.publish_btn,.fast_publish').click(function(e) {
            e.preventDefault();

            validate.wrap($wrap, function() {

                preland_edit.model.send_full_data(function() {

                    var current = +$wrap.find('.steps_pager_item.active').attr('data-step');
                    var next =  +$wrap.find('.steps_pager_item').last().attr('data-step');
                    preland_edit.view.go_to_step(current, next);

                });

            });
        });


        $wrap.find('.exit_editor').unbind('click');
        $wrap.find('.exit_editor').click(function(e) {
            e.preventDefault();
            open_from_url('/preland',true);
        });


	    $wrap.find('.trig[data-target="content_video"]').unbind('click',preland_edit.events.content_video_helper);
	    $wrap.find('.trig[data-target="content_video"]').bind('click',preland_edit.events.content_video_helper);

	    $wrap.find('.pre_form_offer').unbind('change input blur',preland_edit.events.pre_offer_helper);
	    $wrap.find('.pre_form_offer').bind('change input blur',preland_edit.events.pre_offer_helper);



	    $wrap.find('.range_slider').slider({
			animate: "fast",
			value: 80,
			slide: function(event, ui) {
				console.log(ui.value);
				$(ui.handle).parent('.range_slider').find('.range_line').css('width', ui.value+'%');
				$wrap.find('.bg_shadow').val(ui.value / 100).trigger('input');
			},
			stop: function() {
				$wrap.find('.bg_shadow').trigger('blur');
			}
		});

		$wrap.find('.steps_pager_item').unbind('click');
		$wrap.find('.steps_pager_item').click(function(){
			var current = +$wrap.find('.steps_pager_item.active').attr('data-step');
			var next = +$(this).attr('data-step');
			preland_edit.view.go_to_step(current, next);
		});

		$wrap.find('.to_prev_step').unbind('click');
		$wrap.find('.to_prev_step').click(function(){
			var current = +$(this).closest('.step').attr('data-step');
			var next = current-1;
			preland_edit.view.go_to_step(current, next);
		});

		$wrap.find('.to_next_step').unbind('click');
		$wrap.find('.to_next_step').click(function(){
			var current = +$(this).closest('.step').attr('data-step');
			var next = current+1;
			preland_edit.view.go_to_step(current, next);
		});



		// инициируем скролл плагин для 
		var $steps = $wrap.find('.step');
		$steps.each(function(index, el) {
			if (!$(this).is('.mCustomScrollbar')) {

				scroll_reinit($(this));
			}	
		});		

		$steps.find('.mCSB_outside + .mCS-dnk.mCSB_scrollTools_vertical').css('right', '-3px'); // выставляем скролл на нужную позицию относительно блока
		$steps.find('.mCSB_outside + .mCS-dnk.mCSB_scrollTools_vertical .mCSB_dragger').css('background-color', '#7bbbff'); // выставляем скролл на нужную позицию относительно блока


		$wrap.find('.i_info_btn').unbind('click');
		$wrap.find('.i_info_btn').click(function(e) {
			e.preventDefault();
			$(this).closest('.help_info_wrap').toggleClass('opened');
			e.stopPropagation();
		});

		$steps.unbind('click');
		$steps.click(function(e) {
			$wrap.find('.help_info_wrap').removeClass('opened');
		});

		$wrap.find('.change_iframe').unbind('blur input change',preland_edit.events.change_iframe_helper);
		$wrap.find('.change_iframe').bind('blur input change',preland_edit.events.change_iframe_helper);

		$(window).unbind('resize', preland_edit.events.resize_helper);
		$(window).bind('resize', preland_edit.events.resize_helper);


		var $iframe_wrap = $wrap.find('.iframe_wrap');

		// $iframe_wrap.unbind('mouseover');
		// $iframe_wrap.on('mouseover', function(){
		// 	clearTimeout(preland_edit.view.frame_to_fullscreen_timer);
		// 	clearTimeout(preland_edit.view.frame_from_fullscreen_timer);
		// 	preland_edit.view.frame_to_fullscreen_timer = setTimeout(function(){
		// 		if ($(window).width() > 767) {
		// 			$wrap.addClass('iframe_active');
		// 			preland_edit.view.resize_edit_frame(true);
		// 		}
		// 	}, 1500);
		// });

		// $iframe_wrap.unbind('mouseout');
		// $iframe_wrap.on('mouseout', function(){
		// 	clearTimeout(preland_edit.view.frame_to_fullscreen_timer);
		// 	clearTimeout(preland_edit.view.frame_from_fullscreen_timer);
		// 	preland_edit.view.frame_from_fullscreen_timer = setTimeout(function(){
		// 		$wrap.addClass('iframe_active');
		// 		preland_edit.view.resize_edit_frame(true,true);
		// 	}, 1500);
		// });

		$iframe_wrap.unbind('click');
		$iframe_wrap.on('click',function(){
			clearTimeout(preland_edit.view.frame_to_fullscreen_timer);
			clearTimeout(preland_edit.view.frame_from_fullscreen_timer);

			if (!$wrap.hasClass('iframe_active')&&!$wrap.hasClass('last_page_active')&&!$wrap.closest('.body').hasClass('quiz_lock')) {
				
				if ($(window).width() > 767) {
					$wrap.addClass('iframe_active');
					preland_edit.view.resize_edit_frame(true);
				}

			}

		});


		$wrap.find('.steps_wrap').unbind('click');
		$wrap.find('.steps_wrap').on('click',function(){
			clearTimeout(preland_edit.view.frame_to_fullscreen_timer);
			clearTimeout(preland_edit.view.frame_from_fullscreen_timer);

			if ($wrap.hasClass('iframe_active')) {

				$wrap.removeClass('iframe_active');
				if ($(window).width() > 767) {
					preland_edit.view.resize_edit_frame(true,true);
				}

			}

		});

		$wrap.find('.select').children('.item').unbind('click');
		$wrap.find('.select').children('.item').click(function(event) {
			var $select = $(this).parent('.select');
			$select.find('.item').removeClass('active');
			$(this).addClass('active');
			$select.toggleClass('opened');
			$select.find('input[name="miror_protocol"]').val($(this).text()).trigger('blur');
		});;
		// $wrap.find('.select').find('input[name="miror_protocol"]').blur(function(){

		// });

		$wrap.find('.header').unbind('click');
		$wrap.find('.header').on('click',function(){
			clearTimeout(preland_edit.view.frame_to_fullscreen_timer);
			clearTimeout(preland_edit.view.frame_from_fullscreen_timer);

			if ($wrap.hasClass('iframe_active')) {

				$wrap.removeClass('iframe_active');
				if ($(window).width() > 767) {
					preland_edit.view.resize_edit_frame(true,true);
				}

			}

		});
		$wrap.find('.domain_button').unbind('click');
		$wrap.find('.domain_button').click(function(){
			open_from_url('/get_domain',true);
		});
		

        $wrap.find('.valid.disabled').unbind('focus');
        $wrap.find('.valid.disabled').focus(function(event) {
            event.preventDefault();
            show_info_pop('Эта функция станет доступна сразу после активации аккаунта по одному из <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тарифов</a>.','Активируйте аккаунт');
            $(this).blur();
        });

		$('.ui-wrap').unbind('click');
		$('.ui-wrap').on('click',function(){
			clearTimeout(preland_edit.view.frame_to_fullscreen_timer);
			clearTimeout(preland_edit.view.frame_from_fullscreen_timer);

			if ($('#body').length>0 && $wrap.hasClass('iframe_active')) {

				$wrap.removeClass('iframe_active');
				if ($(window).width() > 767) {
					preland_edit.view.resize_edit_frame(true,true);
				}

			}

		});

    }

}
