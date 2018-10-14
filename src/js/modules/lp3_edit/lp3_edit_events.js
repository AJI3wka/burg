;

'use strict';

console.log('lp3_edit.events start');

lp3_edit.events = {
	autosave_timer:false,
	look_page_click:function(e) {//накидываем клик евент с выводом ошибки

	    if($(this).is('.disactive')){
	        
	        e.preventDefault();

	        show_alert_mess('Необходимые для предпросмотра поля не заполнены');

	    }
	},
	qestion_input_blur_handler:function() {

		var $this = $(this);

	    var question_id = $this.closest('.form_step').attr('data-id'); //получение ИД вопроса

	    var val = $this.val();//присваивание занчения поля

	    if (if_defined(val)) {//если значение сущетсвет и не пусто

	        if ($this.attr('name') == 'answer_text') {//если имя инпута "текст ответа"
	            $this.attr('data-id', $this.attr('data-id-b')).addClass('active');//переносим ИД с втрибута data-id-b в data-id, добавляем активный класс

	            var next_id = $this.attr('data-next-question');//ИД следующего вопрос

	            if (if_defined(next_id)) {//если ид след вопроса существует и е пусто

	                lp3_check_qestion(next_id);//проверить на существование и если не существует создать вопрос в кеше

	            }

	        }

	        if (if_defined(question_id)) {//если ИД вопроса не пусто и существует

	            lp3_save_qestion(question_id);//сохранить вопрос
	            // lp3_reload_question(question_id);//перезагрузить вопрос

	        }

	    } else {//если значение пусто

	        if ($this.attr('name') == 'answer_text') {//если это текст ответа
	            $this.removeAttr('data-id').removeClass('active');//cкидываем активный класс
	            
	            if (if_defined(question_id)) {//если ИД вопросв существует и не пусто

	                lp3_save_qestion(question_id);//сохраняем вопрос
	                lp3_reload_question(question_id);//перезагружаем вопрос

	            }

	        }
	    }

	},
	question_chose_click_handler:function(_this) {

	    var $wrap = $(_this).closest('.form_step');//врап = колонка шага

	    var question_id = $wrap.attr('data-id');//получение ИД вопроса

	    lp3_save_qestion(question_id);//сохранение вопроса

	    var target_id = $(_this).attr('data-next-question');//целевой вопрос для загрузки берется с атрибута инпута который в каркасе стоит перед кнопкаой пути

	    if (target_id && $(_this).val().length > 0) {
	        lp3_check_qestion(target_id);//проверка на существоание вопроса
	        lp3_reload_question(target_id, _this);//перезагрузить целевой вопрос
	    }

	},
	question_validate_button_click_handler:function(e) {
	    e.preventDefault();
	    lp3_edit.model.validate_qestions();
	    if (lp3_edit.view.wrap.find('#questions_col').find('.error-input').length == 0) {
	        show_info_pop('Все вопросы и ответы заполнены верно');
	    }
	},
	file_input_change_handler:function(e) {
	    e.preventDefault();

	    console.log('lp3_editor_file_input_change_handler');

	    var $wrap = $(this).closest('.hidden-box');
	    var type = $(this).attr('data-upload-type');
	    var $label = $(this).closest('.hidden-box').parent().find('label');
	    lp3_edit.controller.upload_file(this, type, function(data) {
	        //logo, bg, , block_bg, slide, , download  
	         
	        if (type == 'quest_bg') {
	            
	            console.log('lp3_upload_answer = ', data);
	            $wrap.find('input[name="qestion_bg_m"]').val(data.response.mobile);
	            $wrap.find('input[name="qestion_bg_d"]').val(data.response.desktop).trigger('blur');

	            $wrap.find('input[name="bg_ekran_1_m"]').val(data.response.mobile);
	            $wrap.find('input[name="bg_ekran_1_d"]').val(data.response.desktop).trigger('blur');

	            $wrap.find('input[name="bg_ekran_2_m"]').val(data.response.mobile);
	            $wrap.find('input[name="bg_ekran_2_d"]').val(data.response.desktop).trigger('blur');

	            $wrap.find('input[name="form_bg_m"]').val(data.response.mobile);
	            $wrap.find('input[name="form_bg_d"]').val(data.response.desktop).trigger('blur');

	        } else if (type == 'favicon') {
	            $wrap.find('input[name="favicon_img"]').val(data.data.img_url).trigger('blur');

	        } else if (type == 'slide') {

	            $wrap.find('input[name="block_slide_img"]').val(data.data.img_url).trigger('blur');
	            $wrap.find('input[name="block_slide_content"]').val(data.data.img_url).trigger('blur');
    			lp3_edit.model.parse_blocks_to_cache();
    			lp3_edit.view.reload_blocks_fancy_in_iframe();

    			lp3_edit.controller.save_page_part('2');

	        } else if (type == 'bg') {
	            $wrap.find('input[name="bg_ekran_1_m"]').val(data.data.img_min_url);
	            $wrap.find('input[name="bg_ekran_1_d"]').val(data.data.img_url).trigger('blur');

	            $wrap.find('input[name="bg_ekran_2_m"]').val(data.data.img_min_url);
	            $wrap.find('input[name="bg_ekran_2_d"]').val(data.data.img_url).trigger('blur');

	            $wrap.find('input[name="form_bg_m"]').val(data.data.img_min_url);
	            $wrap.find('input[name="form_bg_d"]').val(data.data.img_url).trigger('blur');


	        } else if (type == 'social') {

	            $wrap.find('input[name="og_img"]').val(data.data.img_url).trigger('blur');
	        } else if (type == 'logo') {
	            $wrap.find('input[name="logo_img"]').val(data.data.img_url).trigger('blur');


	        } else if (type == 'download') {
	            $wrap.find('input[name="aftersend_file"]').val(data.data.img_url).trigger('blur');


	        } else if (type == 'block_bg') {

	            $wrap.find('input[name="block_bg_m"]').val(data.data.img_url);
	            $wrap.find('input[name="block_bg_d"]').val(data.data.img_url).trigger('blur');
	        }
	        
	        var old_text = $label.html();
	        
	        $label.html('Файл загружен');
	        $label.removeClass('reqired_inp');
	        setTimeout(function(){
	            $label.html(old_text);

	        },4000);


	    });

	},
	form_check_clcik_handler:function() {
	    var $wrap = $(this);
	    var $body = lp3_edit.view.wrap;
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
	                            var inp_val = $(this).val();

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
	                    var inp_val = $(this).val();

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
	trig_click_handler:function(e) {
		var $this = $(this);
	    e.preventDefault();
	    var target = $this.data('target');

	    if (target == 'form_input') {
	        return;
	    }

        if ($this.hasClass('disabled')) {
            
            show_info_pop('Эта функция станет доступна сразу после активации аккаунта по одному из <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тарифов</a>.','Активируйте аккаунт');

            return false;
        }

	    var $wrap = lp3_edit.view.wrap;

	    var $slide_wrap = $this.closest('.slide_element');

	    var $block_wrap = $this.closest('.block_row');

	    var $sync_ico_slide = $slide_wrap.closest('.field_wrap').find('span.i-sync');

	    if (!$this.hasClass('active')) {
	        $this.addClass('active');
	        if (target == 'logo') {
	            $('.preview').attr('data-logo', '1');
	            $wrap.find('.logo_img').val('').trigger('input').trigger('blur');
	        } else if (target == 'bg_video') {
	            $wrap.find('.bg_video').val('');
	        } else if (target == 'content_video') {
	            $wrap.find('.content_video').val('');
	        } else if (target == 'lp3_pre_form_offer') {
	            $wrap.find('.lp3_pre_form_offer').val('');
	        } else if (target == 'bg_ekran_2') {
	            $wrap.find('.bg_ekran_2_d').val('');
	            $wrap.find('.bg_ekran_2_m').val('');
	        } else if (target == 'favicon') {
	            $wrap.find('.favicon_img').val('');
	        } else if (target == 'og') {
	            $wrap.find('.og_title').val('');
	            $wrap.find('.og_descriptor').val('');
	            $wrap.find('.og_img').val('');
	        } else if (target == 'meta') {
	            $wrap.find('.meta_description').val('');
	            $wrap.find('.meta_keywords').val('');
	        } else if (target == 'vcard') {
	            $wrap.find('.vcard_category').val('');
	            $wrap.find('.vcard_company').val('');
	            $wrap.find('.vcard_works').val('');
	        } else if (target == 'step_form') {
	            $wrap.find('#questions_col').addClass('active');
	            // $wrap.find('#questions_col').show();
	            lp3_edit.model.cur_data[3].questions = default_question_object;
	            lp3_edit.model.reload_question('0');
	            $sync_ico_slide = $this.closest('.block_trig_wrap').find('span.i-sync');
	            $sync_ico_slide.fadeIn(300); //показываем возле ближайшего .label иконку синхронизации
	            lp3_edit.controller.save_page_part('3', function() {
	               $sync_ico_slide.addClass('checked').fadeOut(700, function() {
	                    //добавляем галочку на иконку снихронизации, скрываем за 700мс и уираем класс галочки с иконки синхронизации
	                    $sync_ico_slide.removeClass('checked');
	                    console.log('lp3_input_autosave() - end');
	                });
	            });
	            reloadQuestionInIframe();
	            var iFrame = document.getElementById("for_preview");
	            iFrame.contentWindow.open_question_by_id('0');
	            $(iFrame).contents().find('.block_case.not_deleted').find('.back').removeClass('noact');
	        } else if (target == 'ekran2bg') {
	            $wrap.find('.bg_ekran_2_d').val('');
	            $wrap.find('.bg_ekran_2_m').val('');
	        } else if (target == 'block_bg') {
	            $this.closest('.block_row').find('.block_bg_d').val('');
	            $this.closest('.block_row').find('.block_bg_m').val('');
	        } else if (target == 'block_slide') {
	            $slide_wrap.find('.block_slide_content').val('0');
	            $slide_wrap.find('.block_slide_video').val('');
	            $($this.parent('.trig_line').find('.trig_wrap')[1]).removeClass('active');
	            $($this.parent('.trig_line').find('.trig_wrap')[0]).addClass('active');
	            $this.closest('.slide_element').find('label.upload_file_btn').removeClass('error-button');
	            $this.closest('.slide_element').find('.youtube').removeClass('error-input valid-input').parent('.video_inp').removeClass('valid-input');

	            $slide_wrap.find('.block_slide_content').val('');
	            //lp3_edit.model.parse_blocks_to_cache();

	            $sync_ico_slide.fadeIn(300); //показываем возле ближайшего .label иконку синхронизации

	            lp3_edit.controller.save_page_part('blocks_2', function() {

	               $sync_ico_slide.addClass('checked').fadeOut(700, function() {
	                    //добавляем галочку на иконку снихронизации, скрываем за 700мс и уираем класс галочки с иконки синхронизации
	                    $sync_ico_slide.removeClass('checked');

	                    console.log('lp3_input_autosave() - end');
	                });

	            });

	        } else if (target == 'block_row') {
	            if (!$($this.closest('.step').find('.block_trig_wrap')[0]).hasClass('active')) {
	                $this.removeClass('active');
	                $block_wrap = $this.closest('.block_row');
	                $block_wrap.find('.block_trig_btn').addClass('active');
	            }
	            $block_wrap.find('.block_bg_d').val('');
	            $block_wrap.find('.block_bg_m').val('');
	            $block_wrap.find('.block_name').val('');
	            $block_wrap.find('.block_slide_title').val('');
	            $block_wrap.find('.block_slide_image').val('');
	            $block_wrap.find('.block_slide_video').val('0');
	            $block_wrap.find('.block_slide_content').val('');
	            $block_wrap.find('.block_trig_wrap').addClass('active');
	            lp3_edit.model.parse_blocks_to_cache();
	            lp3_edit.view.reload_blocks_block();
	        } else if (target == 'aftersend_file') {
	            $wrap.find('.aftersend_file').val('');
	        } else if (target == 'quiz_enabled') {
                lp3_edit.model.load_quiz_list();
                ////alert(parseInt(getURLParameter('p'))==4);
                if (getURLParameter('p')==4) {
                    $('.body').addClass('quiz_lock');

                }

                // var qid = getURLParameter('qi')
                // if (qid) {
                //     if (if_defined(quiz_editor)) {
                //         quiz_editor.controller.attach_quiz_to_page(qid,lp1_edit.model.cur_data.id);
                //     }
                // }
                $wrap.find('#quiz_enabled.block_trig_wrap').addClass('active');
                
            } else if (target == 'metrics') {
	            $wrap.find('.metrics').val('');
	        } else if (target == 'head_codes') {
	            $wrap.find('.head_codes').val('');
	        } else if (target == 'n_head_codes') {
	            $wrap.find('.n_head_codes').val('');
	        } else if (target == 'n_body_codes') {
	            $wrap.find('.n_body_codes').val('');
	        } else if (target == 'event_submited') {
	            $wrap.find('.event_submited').val('');
	        } else if (target == 'metrics_visor') {
	            $wrap.find('.metrics_visor').val('1').trigger('blur');
	        }
	    } else {
	        var _this = this;
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
	        } else
	        if (target == 'lp3_pre_form_offer') {
	            $wrap.find('.lp3_pre_form_offer').val('0').trigger('blur');
	        } else if (target == 'bg_ekran_2') {
	            $wrap.find('.bg_ekran_2_d').val('0').trigger('blur');
	            $wrap.find('.bg_ekran_2_m').val('0').trigger('blur');
	        } else if (target == 'favicon') {
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
	        } else if (target == 'step_form') {
	            $this.addClass('active');
	            show_confirm('Заполненные данные будут удалены, отключить пошаговую форму?', function() {
	                var $questions = $wrap.find('#questions_col');
	                // $questions.hide();
	                $(_this).removeClass('active');
	                $questions.removeClass('active');
	                lp3_edit.model.cur_data[3].questions = [];
	                lp3_edit.model.reload_question('0');
	                $questions.find('.error-input').removeClass('error-input');
	                $sync_ico_slide = $this.closest('.block_trig_wrap').find('span.i-sync');
	                $sync_ico_slide.fadeIn(300); //показываем возле ближайшего .label иконку синхронизации
	                lp3_edit.controller.save_page_part('3', function() {
	                    $sync_ico_slide.addClass('checked').fadeOut(700, function() {
	                        //добавляем галочку на иконку снихронизации, скрываем за 700мс и уираем класс галочки с иконки синхронизации
	                        $sync_ico_slide.removeClass('checked');
	                        console.log('lp3_input_autosave() - end');
	                    });
	                });
	                lp3_edit.model.cur_data[3].questions = [];
	                lp3_edit.model.reload_question('0');
	                reloadQuestionInIframe();
	                // var iFrame = document.getElementById("for_preview");
	                // iFrame.contentWindow.open_question_by_id('4');
	                // $(iFrame).contents().find('.block_case.not_deleted').find('.back').addClass('noact');
	            });
	        } else if (target == 'ekran2bg') {
	            $wrap.find('.bg_ekran_2_d').val('0').trigger('blur');
	            $wrap.find('.bg_ekran_2_m').val('0').trigger('blur');
	        } else if (target == 'block_bg') {
	            $this.closest('.block_row').find('.block_bg_d').val('0').trigger('blur');
	            $this.closest('.block_row').find('.block_bg_m').val('0').trigger('blur');
	        } else if (target == 'block_slide') {
	            $slide_wrap.find('.block_slide_content').val('0');
	            $slide_wrap.find('.block_slide_img').val('');
	            $($this.parent('.trig_line').find('.trig_wrap')[0]).removeClass('active');
	            $($this.parent('.trig_line').find('.trig_wrap')[1]).addClass('active');
	            $this.closest('.slide_element').find('label.upload_file_btn').removeClass('error-button');
	            $this.closest('.slide_element').find('.youtube').removeClass('error-input valid-input').parent('.video_inp').removeClass('valid-input');
	            
	            lp3_edit.model.parse_blocks_to_cache();
	            $slide_wrap.find('.block_slide_content').val('');

	            $sync_ico_slide.fadeIn(300); //показываем возле ближайшего .label иконку синхронизации

	            lp3_edit.controller.save_page_part('blocks_2', function() {

	               $sync_ico_slide.addClass('checked').fadeOut(700, function() {
	                    //добавляем галочку на иконку снихронизации, скрываем за 700мс и уираем класс галочки с иконки синхронизации
	                    $sync_ico_slide.removeClass('checked');

	                    console.log('lp3_input_autosave() - end');
	                });

	            });
	        } else if (target == 'block_row') {
	            $this.addClass('active');
	            show_confirm('Заполненные данные будут удалены, отключить блок?', function() {
	            	var $block_wrap = $this.closest('.block_row').find('.block_wrap');

	                $block_wrap.find('input.block_bg_d').val('0');
	                $block_wrap.find('input.block_bg_m').val('0');
	                $block_wrap.find('input.block_slide_image').val('0');
	                $block_wrap.find('input.block_slide_video').val('0');
	                $block_wrap.find('input.block_slide_content').val('0');
	                // $block_wrap.find('input.block_name').bind('blur',function(){
	                // 	//alert('blured = '+$(this).val());
	                // 	console.log('blured = ',$(this).val());
	                // });
	                $block_wrap.find('input.block_name').val('0').trigger('blur');

	            	// console.log('$block_wrap = ',$block_wrap);
	            	// console.log('$block_wrap = ',$block_wrap);
	            	// console.log('$block_wrap = ',$block_wrap);
	            	// console.log('$block_wrap = ',$block_wrap.find('input.block_name').val(),$block_wrap);
	             //    ////alert('wtf',$block_wrap,$block_wrap.find('input.block_name').val());
	                $(_this).removeClass('active');
	                $(_this).parent('.block_trig_wrap').removeClass('active');
	                lp3_edit.model.parse_blocks_to_cache();
	                lp3_edit.view.reload_blocks_block();
	            });
	        } else if (target == 'aftersend_file') {
	            $wrap.find('.aftersend_file').val('0').trigger('blur');
	        } else if (target == 'quiz_enabled') {
                //lp1_edit.model.load_quiz_list();
                // var $pre_form = $wrap.find('.trig_btn[data-target="pre_form"]')
                // if (!$pre_form.hasClass('active')) {
                //     $pre_form.trigger('click');
                // }
                $('.body').removeClass('quiz_lock');
                $wrap.find('#quiz_enabled.block_trig_wrap').removeClass('active');
                lp3_edit.model.remove_quiz_from_page();
            } else if (target == 'metrics') {
	            $wrap.find('.metrics').val('0').trigger('blur');
	        } else if (target == 'head_codes') {
	            $wrap.find('.head_codes').val('0').trigger('blur');
	        }else if (target == 'n_head_codes') {
	            $wrap.find('.n_head_codes').val('0').trigger('blur');
	        } else if (target == 'n_body_codes') {
	            $wrap.find('.n_body_codes').val('0').trigger('blur');
	        } else if (target == 'event_submited') {
	            $wrap.find('.event_submited').val('0').trigger('blur');
	        } else if (target == 'metrics_visor') {
	            $wrap.find('.metrics_visor').val('0').trigger('blur');
	        }

	    }
	    if ($this.closest('.form_field_settings').length > 0) {
	        $this.parent('.field_inp').toggleClass('active');
	    }
	},
	valid_input_blur_handler:function() {
		var $this = $(this);

		if(lp3_edit.events.autosave_timer){
			clearTimeout(lp3_edit.events.autosave_timer);
		}


	    validate.input($this);

	    var cur_val = $this.val();
	    var _this = this; //перепрозначем this для проброса дальше\

	    if ($this.attr('data-input-type') == 'block_bg_d' || $this.attr('data-input-type') == 'block_bg_m') {
	        if ($this.closest('.field_wrap').find('.trig_btn.active').length < 1) {
	            $this.closest('.field_wrap').find('.error-input,.error-button').removeClass('error-input error-button');
	        }
	    }

	    if (!$(this).hasClass('error-input') && cur_val != $(this).attr('data-last-pushed')) { //если нет ошибок
	        //если значение и последнее сохраненное значение которое хранится в атрибуте отличаются

	        if ($(this).closest('.hidden-box').length > 0) {
	            $(this).closest('.inp.wrap').find('.button.error-button').removeClass('error-button');
	        }

	        var input_type = $(this).attr('data-input-type');

	        if (input_type == 'block_slide_content') {

	            $(this).closest('.slide_element').find('label.upload_file_btn').removeClass('error-button');
	            $(this).closest('.slide_element').find('.youtube').removeClass('error-input').addClass('valid-input').parent('.video_inp').addClass('valid-input');

	        }

	        if (input_type == 'block_slide_video') {
	            if (youtube_parser(cur_val)) {

	                $(this).closest('.slide_element').find('input[name="block_slide_content"]').val(youtube_parser(cur_val));
	            }
	        }

            //this.attr('data-last-pushed', cur_val);
            var part = $this.attr('data-page-part');

            lp3_edit.model.parse_all_to_cache(part, function() {
                lp3_edit.events.autosave_timer = setTimeout(function(){
                	lp3_edit.model.input_autosave($this);
                },300)
            });


	    } else {
	        console.log('          update_data() - nochanges');
	    }

	},
	trig_input_blur_handler:function() {

		var $this = $(this);

	    var input_type = $this.attr('data-input-type');
	    var val = $this.val();
	    var trig_type;

	    if (input_type == 'favicon_img') {
	        trig_type = 'favicon';
	    } else if (input_type == 'og_title') {
	        trig_type = 'og';
	    } else if (input_type == 'vcard_category') {
	        trig_type = 'vcard';
	    } else if (input_type == 'meta_description') {
	        trig_type = 'meta';
	    } else if (input_type == 'lp3_pre_form_offer') {
	        trig_type = 'lp3_pre_form_offer';
	    } else if (input_type == 'logo_img') {
	        trig_type = 'logo';
	    } else if (input_type == 'bg_video') {
	        trig_type = 'bg_video';
	    } else if (input_type == 'video') {
	        trig_type = 'content_video';
	    } else if (input_type == 'aftersend_file') {
	        trig_type = 'aftersend_file';
	    } else if (input_type == 'bg_ekran_2_m') {
	        trig_type = 'ekran2bg';
	    } else if (input_type == 'metrics') {
	        trig_type = 'metrics';
	    } else if (input_type == 'head_codes') {
	        trig_type = 'head_codes';
	    } else if (input_type == 'n_head_codes') {
	        trig_type = 'n_head_codes';
	    } else if (input_type == 'n_body_codes') {
	        trig_type = 'n_body_codes';
	    } else if (input_type == 'event_submited') {
	        trig_type = 'event_submited';
	    }


	    var $trig = lp3_edit.view.wrap.find('.trig_btn[data-target="' + trig_type + '"]');

	    if (val == '0') {
	        $trig.removeClass('active');
	    } else {
	        $trig.addClass('active');
	    }


	},
	publicate_handler:function(e) {

	    e.preventDefault();

	    validate.wrap(lp3_edit.view.wrap, function() {

	        lp3_edit.model.parse_all_to_cache('main');
	        lp3_edit.model.parse_all_to_cache('form');
	        lp3_edit.model.parse_all_to_cache('1');
	        lp3_edit.model.parse_all_to_cache('2');
	        lp3_edit.model.parse_all_to_cache('3');

	        // lp3_edit.controller.save_page_part('main', function() {

	        //     lp3_edit.controller.save_page_part('form', function() {

	        //         lp3_edit.controller.save_page_part('1', function() {

	        //             lp3_edit.controller.save_page_part('2', function() {

	        //                 lp3_edit.controller.save_page_part('3', function() {

	                            lp3_edit.controller.save_page_part('main', function() {



				                    var current = +lp3_edit.view.wrap.find('.steps_pager_item.active').attr('data-step');
				                    var next =  +lp3_edit.view.wrap.find('.steps_pager_item').last().attr('data-step');
				                    lp3_edit.view.init_go_to_step(current, next);

	                                
	                            },'publicate');
	        //                 }, 'new');
	        //             }, 'new');
	        //         }, 'new');
	        //     }, 'new');

	        // }, 'new');
	    })

	},
	ans_text_focus:function(){
        $(this).parent('.step_form_input').addClass('focused');
        $(this).closest('.answer_field').addClass('on_step_line');
	},
	ans_text_blur:function(){
        $(this).parent('.step_form_input').removeClass('focused');
        if ($(this).closest('.form_step').find('.step_form_input.on_step_line').length < 1) {
            $(this).closest('.form_step').find('.answer_field').removeClass('on_step_line');
        }
	},
	ans_text_input: function(e) {
        e.preventDefault();
        lp3_edit.events.question_chose_click_handler(this);
    },
    slide_title_input:function() {
        if ($(this).val().length > 0) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    },
    change_iframe_input:function() {
        lp3_edit.view.live_iframe_change($(this));
    },
    resize_window:function(){
		if (lp3_edit.view.wrap.is(':visible') && $(window).width() > 767) {
			lp3_edit.view.resize_edit_frame();
		}
	},
	question_change_iframe:function() {
		console.log('!_!_!_!_!_!_!_!_!');
		lp3_edit.view.live_reload_quest_inp_for_iframe($(this));
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



	    var $lp3_wrap = lp3_edit.view.wrap;

	    
    	$lp3_wrap.uitooltip();

    	validate.live($lp3_wrap);

    	$lp3_wrap.find('.i_info_pop,.i_info_vid,.i_info_list').unbind('click');
    	$lp3_wrap.find('.i_info_pop,.i_info_vid,.i_info_list').click(function(e){
    		e.preventDefault();
    		open_from_url($(this).attr('href'),true);
    	});

    	
    	$lp3_wrap.find('input.valid,textarea.valid').unbind('keydown',lp3_edit.events.valid_enter_tab_keypress);
    	$lp3_wrap.find('input.valid,textarea.valid').bind('keydown',lp3_edit.events.valid_enter_tab_keypress);

	    var $quest_col = $lp3_wrap.find('#questions_col');

	    $quest_col.find('input,textarea').unbind('blur',lp3_edit.events.qestion_input_blur_handler);
	    $quest_col.find('input,textarea').bind('blur',lp3_edit.events.qestion_input_blur_handler);


	    var $ans_text = $lp3_wrap.find('.answer_text');

	    $ans_text.unbind('focus',lp3_edit.events.ans_text_focus);
	    $ans_text.bind('focus',lp3_edit.events.ans_text_focus);

	    $ans_text.unbind('blur',lp3_edit.events.ans_text_blur);
	    $ans_text.bind('blur',lp3_edit.events.ans_text_blur);

	    $ans_text.unbind('click change input',lp3_edit.events.ans_text_input);
	    $ans_text.bind('click change input', lp3_edit.events.ans_text_input);

	    $lp3_wrap.find('input[type="file"]').unbind('change', lp3_edit.events.file_input_change_handler);
	    $lp3_wrap.find('input[type="file"]').bind('change', lp3_edit.events.file_input_change_handler);

	    $lp3_wrap.find('.col_part_heading.label').find('.button').unbind('click',lp3_edit.events.question_validate_button_click_handler);
	    $lp3_wrap.find('.col_part_heading.label').find('.button').bind('click',lp3_edit.events.question_validate_button_click_handler);

	    // lp3_init_preview($lp3_wrap);
	    $lp3_wrap.find('.trig_btn').unbind('click');
	    $lp3_wrap.find('.trig_btn').bind('click',lp3_edit.events.trig_click_handler);
	    $lp3_wrap.find('.trig_btn[data-target="form_input"]').bind('click',lp3_edit.events.form_check_clcik_handler);

	    $lp3_wrap.find('input[name="ph4"]').ForceNumericOnly();
	    $lp3_wrap.find('input[name="ph1"]').ForcePhoneOnly();

	    // $lp3_wrap.find('input[name="ph1"]').mask('+9(999)999-99-99');

	    // $lp3_wrap.find('input.youtube').on('blur input change', function() {
	    //     if ($(this).val().length > 10) {
	    //         $(this).addClass('inputed');
	    //     } else {
	    //         $(this).removeClass('inputed');
	    //     }
	    // });

	    $lp3_wrap.find('.block_slide_title').on('blur input change',lp3_edit.events.slide_title_input);
	    $lp3_wrap.find('.block_slide_title').on('blur input change', lp3_edit.events.slide_title_input);

	    $lp3_wrap.find('.slides_button').unbind('click');
	    $lp3_wrap.find('.slides_button').on('click', function(e) {
	        e.preventDefault();
	        var $elements = $(this).closest('.block_row').find('.slide_element.active');
	        var $opening_element = $elements.last().next();
	        $opening_element.find('input[name=block_slide_title]').val('').attr('data-last-pushed', '');
	        $opening_element.find('input[name=block_slide_content]').val('').attr('data-last-pushed', '');
	        $opening_element.find('input[name=block_slide_image]').val('').attr('data-last-pushed', '');
	        $opening_element.find('input[name=block_slide_video]').val('').attr('data-last-pushed', '');
	        $elements.last().next().addClass('active');
	        if ($elements.length >= 6) {
	            $(this).closest('.block_button').removeClass('active');
	        }
	    });


	    $lp3_wrap.find('.delete_slide').unbind('click');
	    $lp3_wrap.find('.delete_slide').on('click', function(e) {
	        e.preventDefault();
	        e.stopPropagation();
	        var $element = $(this).closest('.slide_element');
	        var all_count = $element.parent().children('.slide_element.active').length;
	        if (all_count > 1) {
	            show_confirm('Удалить слайд?', function() {
	                $element.find('input[name=block_slide_title]').val('').attr('data-last-pushed', '');
	                $element.find('input[name=block_slide_content]').val('0').attr('data-last-pushed', '0');
	                $element.find('input[name=block_slide_image]').val('0').attr('data-last-pushed', '0');
	                $element.find('input[name=block_slide_video]').val('0').attr('data-last-pushed', '0');
	                $element.removeClass('active');
	                lp3_edit.model.parse_blocks_to_cache();
	                lp3_edit.view.reload_blocks_block();
	                lp3_edit.controller.save_page_part('2');
	            });
	        } else {
	            show_alert_mess('Минимальное количество слайдов - 1');
	        }
	        if (all_count <= 7) {
	            $element.closest('.block_row').find('.block_button').addClass('active');
	        }
	    });

	    $lp3_wrap.find('input.valid,textarea.valid').unbind('blur',lp3_edit.events.trig_input_blur_handler);
	    $lp3_wrap.find('input.valid,textarea.valid').bind('blur',lp3_edit.events.trig_input_blur_handler);


	    $lp3_wrap.find('input.valid,textarea.valid').unbind('blur',lp3_edit.events.valid_input_blur_handler);
	    $lp3_wrap.find('input.valid,textarea.valid').bind('blur',lp3_edit.events.valid_input_blur_handler);

	    $lp3_wrap.find('.publish_btn,.fast_publish').unbind('click',lp3_edit.events.publicate_handler);
	    $lp3_wrap.find('.publish_btn,.fast_publish').bind('click',lp3_edit.events.publicate_handler);

        $lp3_wrap.find('.exit_editor').unbind('click');
        $lp3_wrap.find('.exit_editor').click(function(e) {
            e.preventDefault();
            open_from_url('/lp3',true);
        });


	    $lp3_wrap.find('.change_iframe').unbind('input blur change', lp3_edit.events.change_iframe_input);
	    $lp3_wrap.find('.change_iframe').bind('input blur change', lp3_edit.events.change_iframe_input);
    	


		$lp3_wrap.find('.range_slider').slider({
			animate: "fast",
			value: 80,
			slide: function(event, ui) {
				console.log(ui.value);
				$(ui.handle).parent('.range_slider').find('.range_line').css('width', ui.value+'%');
				$lp3_wrap.find('.bg_shadow').val(ui.value / 100).trigger('input');
			},
			stop: function() {
				$lp3_wrap.find('.bg_shadow').trigger('blur');
			}
		});

		$lp3_wrap.find('.steps_pager_item').unbind('click')
		$lp3_wrap.find('.steps_pager_item').click(function(){
			var current = +$lp3_wrap.find('.steps_pager_item.active').attr('data-step');
			var next = +$(this).attr('data-step');
			lp3_edit.view.init_go_to_step(current, next);
		})

		$lp3_wrap.find('.to_prev_step').unbind('click')
		$lp3_wrap.find('.to_prev_step').click(function(){
			var current = +$(this).closest('.step').attr('data-step');
			var next = current-1;
			
			lp3_edit.view.init_go_to_step(current, next);
		});

		$lp3_wrap.find('.to_next_step').unbind('click')
		$lp3_wrap.find('.to_next_step').click(function(){
			var current = +$(this).closest('.step').attr('data-step');
			var next = current+1;
			lp3_edit.view.init_go_to_step(current, next);
		});


		
		// инициируем скролл плагин для 
		var $steps = $lp3_wrap.find('.step');
		$steps.each(function(index, el) {
			if (!$(this).is('.mCustomScrollbar')) {

				scroll_reinit($(this));
			}	
		});
		$lp3_wrap.find('.step').find('.mCSB_outside + .mCS-dnk.mCSB_scrollTools_vertical').css('right', '-3px'); // выставляем скролл на нужную позицию относительно блока
		$lp3_wrap.find('.step').find('.mCSB_outside + .mCS-dnk.mCSB_scrollTools_vertical .mCSB_dragger').css('background-color', '#7bbbff'); // выставляем скролл на нужную позицию относительно блока



		$lp3_wrap.find('.i_info_btn').unbind('click')
		$lp3_wrap.find('.i_info_btn').click(function(e) {
			e.preventDefault();
			$(this).closest('.help_info_wrap').toggleClass('opened');
			e.stopPropagation();
		});


		$lp3_wrap.find('.step').unbind('click')
		$lp3_wrap.find('.step').click(function(e) {
			$lp3_wrap.find('.help_info_wrap').removeClass('opened');
		});

		$(window).unbind('resize', lp3_edit.events.resize_window);
		$(window).bind('resize', lp3_edit.events.resize_window);


		$lp3_wrap.find('.question_text,.answer_text').unbind('click input',lp3_edit.events.question_change_iframe);
		$lp3_wrap.find('.question_text,.answer_text').bind('click input',lp3_edit.events.question_change_iframe);

		$lp3_wrap.find('.qestion_bg_d').unbind('click input blur', lp3_edit.events.question_change_iframe);
		$lp3_wrap.find('.qestion_bg_d').bind('click input blur', lp3_edit.events.question_change_iframe);

		// $lp3_wrap.find('.iframe_wrap').on('mouseover', function(){
		// 	clearTimeout(lp3_iframe_from_fullscreen_timer);
		// 	lp3_iframe_to_fullscreen_timer = setTimeout(function(){
		// 		if ($(window).width() > 767) {
		// 			$lp3_wrap.addClass('iframe_active');
		// 			resizeIframeInEditor(true);
		// 			// var active_step = $lp3_wrap.find('.steps_pager_item.active').attr('data-step');
		// 			// var selector = '.sec1';
		// 			// if (active_step == 5) selector = '.sec2';
		// 			// else if (active_step == 6 || active_step == 7) selector = '.sec3';
		// 			// scrollIframeToSelector(selector);
		// 		}
		// 	}, 1500);
		// });

		// $lp3_wrap.find('.iframe_wrap').on('mouseout', function(){
		// 	clearTimeout(lp3_iframe_to_fullscreen_timer);
		// 	lp3_iframe_from_fullscreen_timer = setTimeout(function(){
		// 		$lp3_wrap.removeClass('iframe_active');
		// 		if ($(window).width() > 767) {
		// 			resizeIframeInEditor(true,true);
		// 			// var active_step = $lp3_wrap.find('.steps_pager_item.active').attr('data-step');
		// 			// var selector = '.sec1';
		// 			// if (active_step == 5) selector = '.sec2';
		// 			// else if (active_step == 6 || active_step == 7) selector = '.sec3';
		// 			// scrollIframeToSelector(selector);
		// 		}
		// 	}, 1500);
		// });

		$lp3_wrap.find('.iframe_wrap').unbind('click');
		$lp3_wrap.find('.iframe_wrap').on('click',function(){

			if (!$lp3_wrap.hasClass('iframe_active') && !$lp3_wrap.hasClass('last_page_active') &&!$lp3_wrap.closest('.body').hasClass('quiz_lock')) {
				
				if ($(window).width() > 767) {
					$lp3_wrap.addClass('iframe_active');
					lp3_edit.view.resize_edit_frame(true);
				}

			}

		});


		$lp3_wrap.find('.steps_wrap').unbind('click');
		$lp3_wrap.find('.steps_wrap').on('click',function(){

			if ($lp3_wrap.hasClass('iframe_active')) {

				$lp3_wrap.removeClass('iframe_active');
				if ($(window).width() > 767) {
					lp3_edit.view.resize_edit_frame(true,true);
				}

			}

		});

		$lp3_wrap.find('.header').unbind('click');
		$lp3_wrap.find('.header').on('click',function(){

			if ($lp3_wrap.hasClass('iframe_active')) {

				$lp3_wrap.removeClass('iframe_active');
				if ($(window).width() > 767) {
					lp3_edit.view.resize_edit_frame(true,true);
				}

			}

		});
		$lp3_wrap.find('.domain_button').unbind('click');
		$lp3_wrap.find('.domain_button').click(function(){
			open_from_url('/get_domain',true);
		});

		

        $lp3_wrap.find('.valid.disabled').unbind('focus');
        $lp3_wrap.find('.valid.disabled').focus(function(event) {
            event.preventDefault();
            show_info_pop('Эта функция станет доступна сразу после активации аккаунта по одному из <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тарифов</a>.','Активируйте аккаунт');
            $(this).blur();
        });
		
		$('.ui-wrap').unbind('click');
		$('.ui-wrap').on('click',function(){

			if ($('#lp3_editor_body').length>0 && $lp3_wrap.hasClass('iframe_active')) {

				$lp3_wrap.removeClass('iframe_active');
				if ($(window).width() > 767) {
					lp3_edit.view.resize_edit_frame(true,true);
				}

			}

		});




    }

}
