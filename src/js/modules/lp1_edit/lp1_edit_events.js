;

'use strict';

console.log('lp1_edit.events start');

lp1_edit.events = {
    update_on_blur_timer: false,
    resize_window_timer: false,
    unbind_input_listening: function() {



        lp1_edit.view.wrap.find(lp1_edit.model.get_input_selectors()).unbind('blur', lp1_edit.events.input_update_on_blur); //на все эти селекторы удаляем с евента выхода с фокуса автосоранения


    },
    bind_input_listening: function() {

        lp1_edit.view.wrap.find(lp1_edit.model.get_input_selectors()).bind('blur', lp1_edit.events.input_update_on_blur); //на все эти селекторы ставим на выход с фокуса евент автосоранения
        //$(selectors).bind('change', input_update_on_blur);

    },
    input_update_on_blur: function(event) {
        ////alert('blur');
        //
        if (lp1_edit.events.update_on_blur_timer) {
            clearTimeout(lp1_edit.events.update_on_blur_timer);
        }

        var $this = $(this);
        // var _this = this

        // validate.input($this);

        // lp1_edit.events.update_on_blur_timer = setTimeout(function(){

        // if ($(this).is('.bg_img_d')) {
        // 	//alert('wtf');
        // }
        //////alert('start_autosave',$this.attr('data-last-pushed'),$this.attr('name'));

        validate.input($this); //валидация этого инпута

        if (!$this.hasClass('error-input')) { //если нет ошибок

            //var _this = _this;//перепрозначем this для пропроса дальше

            if ($this.attr('data-last-pushed') != $this.val()) { //если значение и последнее сохраненное значение которое хранится в атрибуте отличаются




                lp1_edit.model.update_cur_from_elem($this);


                //lp1_edit.events.update_on_blur_timer = setTimeout(function() {

                    lp1_edit.view.start_autosave($this);

                    lp1_edit.controller.save(true, function() {

                        lp1_edit.view.end_autosave($this);

                    },function(){

                        lp1_edit.view.end_autosave($this,true);
                    });

                //}, 300);

            } else {
                console.log('          update_data() - nochanges');
            }

        }

        // },2500);	    

    },
    trig_click_handler: function() {

        var $this = $(this);

        var target = $this.data('target');

        if (target == "form_input") return false;

        if ($this.hasClass('disabled') && !$this.hasClass('pasting')) {
            
            show_info_pop('Эта функция станет доступна сразу после активации аккаунта по одному из <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тарифов</a>.','Активируйте аккаунт');

            return false;
        }

        var $wrap = lp1_edit.view.wrap;

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
            } else if (target == 'aftersend_file') {
                $wrap.find('.aftersend_file').val('').trigger('blur');
            } else if (target == 'quiz_enabled') {
                lp1_edit.model.load_quiz_list();
                if (getURLParameter('p')==3) {
                    $('.body').addClass('quiz_lock');

                }

                // var qid = getURLParameter('qi')
                // if (qid) {
                //     if (if_defined(quiz_editor)) {
                //         quiz_editor.controller.attach_quiz_to_page(qid,lp1_edit.model.cur_data.id);
                //     }
                // }
                $wrap.find('#quiz_enabled.block_trig_wrap').addClass('active');
                var $pre_form = $wrap.find('.trig_btn[data-target="pre_form"]');
                if (!$pre_form.hasClass('active')) {
                    $pre_form.trigger('click');
                }
                $wrap.find('.default_form').hide();
                //lp1_edit.view.live_change_frame($wrap.find('.trig_btn[data-target="quiz_enabled"]'));
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
            } else if (target == 'head_codes') {
                $wrap.find('.head_codes').val('').trigger('blur');
            }if(target == 'metrics_visor'){                
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
            } else
            if (target == 'n_head_codes') {
                $wrap.find('.n_head_codes').val('0').trigger('blur');
            } else
            if (target == 'n_body_codes') {
                $wrap.find('.n_body_codes').val('0').trigger('blur');
            } else
            if (target == 'event_submited') {
                $wrap.find('.event_submited').val('0').trigger('blur');
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
            } else if (target == 'aftersend_file') {
                $wrap.find('.aftersend_file').val('0').trigger('blur');
            } else if (target == 'quiz_enabled') {
                //lp1_edit.model.load_quiz_list();
                // var $pre_form = $wrap.find('.trig_btn[data-target="pre_form"]')
                // if (!$pre_form.hasClass('active')) {
                //     $pre_form.trigger('click');
                // }
                $wrap.find('.default_form').show();
                $('.body').removeClass('quiz_lock');
                $wrap.find('#quiz_enabled.block_trig_wrap').removeClass('active');
                ////alert('false');
                lp1_edit.model.remove_quiz_from_page();
                    
                   // lp1_edit.view.live_change_frame($wrap.find('.trig_btn[data-target="quiz_enabled"]'));
            
            } else
            if (target == 'pre_form') {
                $wrap.find('#pre_form').removeClass('active');
                $wrap.find('.content_pre_form').val('0').trigger('blur');

                //if ($wrap.find('.pre_form_button').val() == '') {
                $wrap.find('.pre_form_button').val('').trigger('blur');
                //}
                $wrap.find('.content_pre_form_offer').val('0').trigger('blur');
                $wrap.find('.pre_form_offer').val('').trigger('blur');
            } else
            if (target == 'page_campaig') {
                $('#page_for_campaign').val('0').trigger('blur');
            } else
            if (target == 'metrics') {
                $wrap.find('.metrics').val('0').trigger('blur');
            } else
            if (target == 'head_codes') {
                $wrap.find('.head_codes').val('0').trigger('blur');
            }else if(target == 'metrics_visor'){                
                $wrap.find('.metrics_visor').val('0').trigger('blur');
            }

        }
    },
    form_check_click_hendler: function() {
        var $wrap = $(this);
        var $body = lp1_edit.view.wrap;
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
                    //if (parseInt($input_count.val()) > 1) {

                        if ($wrap.hasClass('needed')) {

                            var empty_not = $wrap.closest('.form_field_settings').find('.trig_btn.active.needed').length;

                            console.log('empty_not', empty_not);

                            //if (empty_not > 1) {

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

                            //} else {
                            //    show_alert_mess('Email или Телефон обязательное поле в форме')
                            //}
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

                    //} else {
                    //    show_alert_mess('Минимальное количество полей в форме 1');

                    //}

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
    bg_shadow_input_handler: function() {

        var $wrap = lp1_edit.view.wrap;
        // $view_body.find('.bg_shadow').css('opacity', val);
        var ui_val = parseFloat($(this).val()) * 100;
        $wrap.find('.range_slider').slider('value', ui_val);
        $wrap.find('.range_line').css('width', ui_val + '%');

    },
    youtube_helper: function() {
        if ($(this).val().length > 10) {
            $(this).addClass('inputed');
        } else {
            $(this).removeClass('inputed');
        }
    },
    logo_change_handler: function(e) {
        e.preventDefault();

        var $wrap_in = lp1_edit.view.wrap;
        var $label = $(this).closest('.hidden-box').parent().find('label');

        lp1_edit.controller.upload_img(this, 'logo', function(data) {

            var logo = data.data.img_url;

            $wrap_in.find('.logo_img').val(logo).trigger('input').trigger('blur');

            console.log('          upload_img_callback - ', logo);

            var old_text = $label.html();

            $label.html('Файл загружен');
            $label.removeClass('reqired_inp');
            setTimeout(function() {
                $label.html(old_text);

            }, 4000);

        })

    },
    bg_change_handler: function(e) {
        e.preventDefault();
        var $wrap_in = lp1_edit.view.wrap;

        var $label = $(this).closest('.hidden-box').parent().find('label');
        lp1_edit.controller.upload_img(this, 'bg', function(data) {
            var d = new Date();
            var bg = data.data.img_url;
            var bg_m = data.data.img_min_url;

            if(!bg_m){
                bg_m = bg;
            }

            console.log('          upload_img_callback - ', bg, bg_m);
            $wrap_in.find('.bg_img_d').val(bg).trigger('blur');
            $wrap_in.find('.bg_img_m').val(bg_m).trigger('blur');
            //$('.preview').css('background-image', 'url(' + bg + '?' + d.getTime() + ')');
            //$('.sec7 .block .logo_img').css('background-image','url('+logo+'?'+d.getTime()+')');
            var old_text = $label.html();

            $label.html('Файл загружен');
            $label.removeClass('reqired_inp');
            setTimeout(function() {
                $label.html(old_text);

            }, 4000);
        })

    },
    file_input_change_handler: function(e) {

        var $wrap = $(this).closest('.hidden-box');
        var type = $(this).attr('data-upload-type');
        var $label = $(this).closest('.hidden-box').parent().find('label');
        lp1_edit.controller.upload_img(this, type, function(data) {
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
            setTimeout(function() {
                $label.html(old_text);

            }, 4000);


        });

    },
    pre_offer_helper: function() {
        if ($(this).val() != '0' && $(this).val() != '') {
            $('.content_pre_form_offer').val('1').trigger('blur');
        } else {
            $('.content_pre_form_offer').val('0').trigger('blur');
        }
    },
    content_video_helper: function(event) {
        if ($(this).hasClass('active')) {
            $(this).parent().find('.like_abs').hide();
        } else {
            $(this).parent().find('.like_abs').show();
        }
    },
    // change_iframe_helper: function() {
    //     if (!lp1_edit.view.wrap.is(':visible')) {
    //         return false;
    //     }
    //     lp1_edit.view.live_change_frame($(this));
    // },
    // resize_helper: function() {
    //     if (lp1_edit.events.resize_window_timer) {
    //         clearTimeout(lp1_edit.events.resize_window_timer);
    //     }
    //     lp1_edit.events.resize_window_timer = setTimeout(function() {

    //         if (lp1_edit.view.wrap.is(':visible') && $(window).width() > 767) {
    //             lp1_edit.view.resize_edit_frame();
    //         }
    //     }, 150);
    // },
    valid_enter_tab_keypress: function(e) {
        if (e.which == 13 || e.keyCode == 9) {
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
                    $('.to_prev_step:visible').trigger('click');

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
                    $('.to_next_step:visible').trigger('click');

                    if ($page.find('.error-input').length==0) {

                    setTimeout(function() {
                            $page.closest('.step').next('.step').find('input.valid:visible,textarea.valid:visible').first().focus();
                            //$slideElement.find('input.valid:visible,textarea.valid:visible').first().focus();
                        }, 500)
                    }
                        //
                }

            }

            console.log('WTF_TAB = ', $inputs, $inputs.last(), $this)
            return false;
        }

    },
    rebind: function() {

        // lp1_edit.view.wrap = $('#body');

        // lp1_edit.events.unbind_input_listening();
        // lp1_edit.events.bind_input_listening();
        // 
    lp1_edit.view.wrap.find(lp1_edit.model.get_input_selectors()).unbind('focus', lp1_edit.events.pusl_inst.focus_h);
    lp1_edit.view.wrap.find(lp1_edit.model.get_input_selectors()).bind('focus', lp1_edit.events.pusl_inst.focus_h); //на все эти селекторы ставим на выход с фокуса евент автосоранения

    lp1_edit.view.wrap.find(lp1_edit.model.get_input_selectors()).unbind('blur', lp1_edit.events.pusl_inst.blur_h);
    lp1_edit.view.wrap.find(lp1_edit.model.get_input_selectors()).bind('blur', lp1_edit.events.pusl_inst.blur_h); //на все эти селекторы ставим на выход с фокуса евент автосоранения



        var $wrap = lp1_edit.view.wrap;

        $wrap.uitooltip();

        validate.live($wrap);

        $wrap.find('.i_info_pop,.i_info_vid,.i_info_list').unbind('click');
        $wrap.find('.i_info_pop,.i_info_vid,.i_info_list').click(function(e) {
            e.preventDefault();
            open_from_url($(this).attr('href'), true);
        });


        $wrap.find('input.valid,textarea.valid').unbind('keydown', lp1_edit.events.valid_enter_tab_keypress);
        $wrap.find('input.valid,textarea.valid').bind('keydown', lp1_edit.events.valid_enter_tab_keypress);


        $wrap.find('#upfile1').unbind('change', lp1_edit.events.logo_change_handler);
        $wrap.find('#upfile1').bind('change', lp1_edit.events.logo_change_handler);

        $wrap.find('#upfile2').unbind('change', lp1_edit.events.bg_change_handler);
        $wrap.find('#upfile2').bind('change', lp1_edit.events.bg_change_handler);

        $wrap.find('.new_uploads').unbind('change', lp1_edit.events.file_input_change_handler);
        $wrap.find('.new_uploads').bind('change', lp1_edit.events.file_input_change_handler);


        $wrap.find('.trig_btn').unbind('click', lp1_edit.events.trig_click_handler);
        $wrap.find('.trig_btn').bind('click', lp1_edit.events.trig_click_handler);

        $wrap.find('.trig_btn[data-target="form_input"]').unbind('click', lp1_edit.events.form_check_click_hendler);
        $wrap.find('.trig_btn[data-target="form_input"]').bind('click', lp1_edit.events.form_check_click_hendler);

        $wrap.find('input[name="bg_shadow"]').unbind('input', lp1_edit.events.bg_shadow_input_handler);
        $wrap.find('input[name="bg_shadow"]').bind('input', lp1_edit.events.bg_shadow_input_handler);

        $wrap.find('input.youtube').unbind('blur input change', lp1_edit.events.youtube_helper);
        $wrap.find('input.youtube').bind('blur input change', lp1_edit.events.youtube_helper);

        $wrap.find('input[name="phone_p1"]').ForcePhoneOnly();
        $wrap.find('input[name="phone_p4"]').ForceNumericOnly();

        $wrap.find('.publish_btn,.fast_publish').unbind('click')
        $wrap.find('.publish_btn,.fast_publish').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            validate.wrap($wrap, function() {

                lp1_edit.model.send_full_data(function() {

                    var current = +$wrap.find('.steps_pager_item.active').attr('data-step');
                    var next =  +$wrap.find('.steps_pager_item').last().attr('data-step');
                    lp1_edit.view.go_to_step(current, next);

                });

            });
        });

        $wrap.find('.c-item').unbind('click');
        $wrap.find('.c-item').click(function() {
            var $el = $(this);
            $el.parent().children().removeClass('active');
            $el.addClass('active');
            $('.m_color').val($el.attr('data-val')).trigger('blur');
        });



        $wrap.find('.to_advert_editor').unbind('click');
        $wrap.find('.to_advert_editor').click(function(e) {
            e.preventDefault();
            open_from_url('/experts?f=e',true);
        });
        
        $wrap.find('.exit_editor').unbind('click');
        $wrap.find('.exit_editor').click(function(e) {
            e.preventDefault();
            open_from_url('/lp1',true);
        });

        $wrap.find('.text_check_btn').unbind('click');
        $wrap.find('.text_check_btn').click(function(e) {
            e.preventDefault();
            if (window.glvrd) {

                lp1_edit.model.glvrd.clean_test();                
                lp1_edit.view.glvrd.wrap.addClass('opened');
            }
        });


        $wrap.find('.trig[data-target="content_video"]').unbind('click', lp1_edit.events.content_video_helper);
        $wrap.find('.trig[data-target="content_video"]').bind('click', lp1_edit.events.content_video_helper);

        $wrap.find('.pre_form_offer').unbind('change input blur', lp1_edit.events.pre_offer_helper);
        $wrap.find('.pre_form_offer').bind('change input blur', lp1_edit.events.pre_offer_helper);



        $wrap.find('.range_slider').slider({
            animate: "fast",
            value: 80,
            slide: function(event, ui) {
                console.log(ui.value);
                $(ui.handle).parent('.range_slider').find('.range_line').css('width', ui.value + '%');
                $wrap.find('.bg_shadow').val(ui.value / 100).trigger('input');
            },
            stop: function() {
                $wrap.find('.bg_shadow').trigger('blur');
            }
        });

        $wrap.find('.steps_pager_item').unbind('click');
        $wrap.find('.steps_pager_item').click(function() {
            var current = +$wrap.find('.steps_pager_item.active').attr('data-step');
            var next = +$(this).attr('data-step');
            if(next != current){
                lp1_edit.view.go_to_step(current, next);
            }
        });

        $wrap.find('.to_prev_step').unbind('click');
        $wrap.find('.to_prev_step').click(function() {
            var current = +$('.steps_pager_item.active').attr('data-step');
            var next = current - 1;
            lp1_edit.view.go_to_step(current, next);
        });

        $wrap.find('.to_next_step').unbind('click');
        $wrap.find('.to_next_step').click(function() {
            var current = +$('.steps_pager_item.active').attr('data-step');
            var next = current + 1;
            lp1_edit.view.go_to_step(current, next);
        });


        // инициируем скролл плагин для 
        var $steps = $wrap.find('.step');
        // $steps.each(function(index, el) {
        //     if (!$(this).is('.mCustomScrollbar')) {

        //         scroll_reinit($(this));
        //     }
        // });

        // $steps.find('.mCSB_outside + .mCS-dnk.mCSB_scrollTools_vertical').css('right', '-3px'); // выставляем скролл на нужную позицию относительно блока
        // $steps.find('.mCSB_outside + .mCS-dnk.mCSB_scrollTools_vertical .mCSB_dragger').css('background-color', '#7bbbff'); // выставляем скролл на нужную позицию относительно блока


        $wrap.find('.i_info_btn').unbind('click');
        $wrap.find('.i_info_btn').click(function(e) {
            e.preventDefault();
            var $first_link = $(this).closest('.help_info_wrap').find('.i_info_pop').first()
            $first_link.attr('href',$first_link.attr('href').split('&')[0]);
            $first_link.trigger('click');
            e.stopPropagation();
        });

        // $steps.unbind('click');
        // $steps.click(function(e) {
        //     $wrap.find('.help_info_wrap').removeClass('opened');
        // });

        //$wrap.find('.change_iframe').unbind('blur input change', lp1_edit.events.change_iframe_helper);
        //$wrap.find('.change_iframe').bind('blur input change', lp1_edit.events.change_iframe_helper);

        //$(window).unbind('resize', lp1_edit.events.resize_helper);
        //$(window).bind('resize', lp1_edit.events.resize_helper);


        //var $iframe_wrap = $wrap.find('.iframe_wrap');

        // $iframe_wrap.unbind('mouseover');
        // $iframe_wrap.on('mouseover', function(){
        // 	clearTimeout(lp1_edit.view.frame_to_fullscreen_timer);
        // 	clearTimeout(lp1_edit.view.frame_from_fullscreen_timer);
        // 	lp1_edit.view.frame_to_fullscreen_timer = setTimeout(function(){
        // 		if ($(window).width() > 767) {
        // 			$wrap.addClass('iframe_active');
        // 			lp1_edit.view.resize_edit_frame(true);
        // 		}
        // 	}, 1500);
        // });

        // $iframe_wrap.unbind('mouseout');
        // $iframe_wrap.on('mouseout', function(){
        // 	clearTimeout(lp1_edit.view.frame_to_fullscreen_timer);
        // 	clearTimeout(lp1_edit.view.frame_from_fullscreen_timer);
        // 	lp1_edit.view.frame_from_fullscreen_timer = setTimeout(function(){
        // 		$wrap.addClass('iframe_active');
        // 		lp1_edit.view.resize_edit_frame(true,true);
        // 	}, 1500);
        // });

        // $iframe_wrap.unbind('click');
        // $iframe_wrap.on('click', function() {
        //     clearTimeout(lp1_edit.view.frame_to_fullscreen_timer);
        //     clearTimeout(lp1_edit.view.frame_from_fullscreen_timer);

        //     if (!$wrap.hasClass('iframe_active')&&!$wrap.hasClass('last_page_active')&&!$wrap.closest('.body').hasClass('quiz_lock')) {

        //         if ($(window).width() > 767) {
        //             $wrap.addClass('iframe_active');
        //             lp1_edit.view.resize_edit_frame(true);
        //         }

        //     }

        // });


        // $wrap.find('.steps_wrap').unbind('click');
        // $wrap.find('.steps_wrap').on('click', function() {
        //     clearTimeout(lp1_edit.view.frame_to_fullscreen_timer);
        //     clearTimeout(lp1_edit.view.frame_from_fullscreen_timer);

        //     if ($wrap.hasClass('iframe_active')&&!$wrap.hasClass('last_page_active')) {

        //         $wrap.removeClass('iframe_active');
        //         if ($(window).width() > 767) {
        //             lp1_edit.view.resize_edit_frame(true, true);
        //         }

        //     }

        // });

        // $wrap.find('.header').unbind('click');
        // $wrap.find('.header').on('click', function() {
        //     clearTimeout(lp1_edit.view.frame_to_fullscreen_timer);
        //     clearTimeout(lp1_edit.view.frame_from_fullscreen_timer);

        //     if ($wrap.hasClass('iframe_active')&&!$wrap.hasClass('last_page_active')) {

        //         $wrap.removeClass('iframe_active');
        //         if ($(window).width() > 767) {
        //             lp1_edit.view.resize_edit_frame(true, true);
        //         }

        //     }

        // });

        $wrap.find('.domain_button').unbind('click');
        $wrap.find('.domain_button').click(function() {
            open_from_url('/get_domain', true);
        });

        $wrap.find('.valid.disabled').unbind('focus');
        $wrap.find('.valid.disabled').focus(function(event) {
            event.preventDefault();
            show_info_pop('Эта функция станет доступна сразу после активации аккаунта по одному из <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тарифов</a>.','Активируйте аккаунт');
            $(this).blur();
        });

        // $('.ui-wrap').unbind('click');
        // $('.ui-wrap').on('click', function() {
        //     clearTimeout(lp1_edit.view.frame_to_fullscreen_timer);
        //     clearTimeout(lp1_edit.view.frame_from_fullscreen_timer);

        //     if ($('#body').length > 0 && $wrap.hasClass('iframe_active') &&!$wrap.hasClass('last_page_active')) {

        //         $wrap.removeClass('iframe_active');
        //         if ($(window).width() > 767) {
        //             lp1_edit.view.resize_edit_frame(true, true);
        //         }

        //     }

        // });
        // 
        $('#preview-site').unbind('click').click(function(e){
            e.preventDefault();
            var href = $(this).attr('href');
            if(if_defined(href)){
                $('#preview-site-frame').show();
                $('#preview-site-frame').find('.iframe-wrap').append('<iframe src="'+href+'"></iframe>');
            }




        });
        $('#exit-site-prewiew').unbind('click').click(function(e){
            e.preventDefault();
            var $wrap = $('#preview-site-frame');
                $wrap.hide();
                $wrap.find('.iframe-wrap').find('iframe').remove();




        });
        $(window).unbind('resize',lp1_edit.events.bx_resize_fix);
        $(window).on('resize',lp1_edit.events.bx_resize_fix);

        $wrap.find('.inner_domain').unbind('blur');
        $wrap.find('.inner_domain').blur(function(){
            var $this = $(this);
            var val = $this.val();
            if(val != $(this).attr('data-last-save')){
                lp1_edit.view.start_autosave($this);

                
                if(if_defined(val)){

                    lp1_edit.controller.check_atom_domain(val,function(data){
                        console.log('data_check = ',data);
                        if(data.checkAtomDomain){
                            $this.closest('.field_wrap').find('p.error_info').html('');
                            lp1_edit.controller.attach_atom_domain(val,function(data){
                               
                                $this.attr('data-last-save',val);
                                lp1_edit.view.end_autosave($this);

                            },function(data){
                                console.log('data_check = ',data);
                                lp1_edit.view.end_autosave($this,true);
                            })
                        }else{
                            lp1_edit.view.end_autosave($this,true);

                            $('#in_domain_prev').hide();
                    $('#in_domain_prev_s').removeClass('active');
                            $this.addClass('error-input');
                            $this.closest('.field_wrap').find('p.error_info').html('Поддомен уже занят');
                        }
                    },function(data){
                        console.log('data_check = ',data);
                        lp1_edit.view.end_autosave($this,true);
                        $('#in_domain_prev').hide();
                    $('#in_domain_prev_s').removeClass('active');
                        if(data.msg == 'Not valid domain'){
                            show_alert_mess('Введите валидное имя поддомена (используйте латиницу)')
                        }
                    })
                }else{
                    
                    $this.closest('.field_wrap').find('p.error_info').html('');
                    lp1_edit.controller.attach_atom_domain(val,function(data){
                       
                        $this.attr('data-last-save',val);
                        lp1_edit.view.end_autosave($this);

                    },function(data){
                        console.log('data_check = ',data);
                        lp1_edit.view.end_autosave($this,true);
                    })
                }
            }
        });

        $wrap.find('.inner_domain').unbind('focus');
        $wrap.find('.inner_domain').focus(function(){
            $(this).removeClass('error-input');
        });        
    },
    bx_resize_fix:function(){
        $('.steps_slider.initedSlider').find('.step').width($('.steps_slider.initedSlider').closest('.steps_wrap').width());
    },
    glvrd:{
        focus_h:function(){
            var val = $(this).val()
            if (val.length>5) {
                glvrd.proofread(val, function(result){
                    console.log('GLVRD result = ',result)
                });

            }

        },
        blur_h:function(e){
            lp1_edit.model.glvrd.update_from_el($(this));
            


        },
        i_focus_h:function(e){
            lp1_edit.events.glvrd.make_focused(this,true);
        },
        i_blur_h:function(e){
            //e.preventDefault();
            //e.stopPropagation();

            if (lp1_edit.events.glvrd.i_key_timeout) {
                 clearTimeout(lp1_edit.events.glvrd.i_key_timeout)
            }
            lp1_edit.view.glvrd.wrap.find('#c_edit_f').removeClass('g_focused').removeAttr('id');
            var $elem = $(this);
            // setTimeout(function(){

                lp1_edit.model.glvrd.update_real_val($elem);   
            // },2000);         
        },
        i_key_time:3000,
        i_key_timeout:false,
        make_focused:function(_this,focus){

            // if (focus) {

            //     $(_this).trigger('keydown');
            // }

            if (lp1_edit.events.glvrd.i_key_timeout) {
                clearTimeout(lp1_edit.events.glvrd.i_key_timeout)
            }
            lp1_edit.view.glvrd.wrap.find('#c_edit_f').removeClass('g_focused').removeAttr('id');

            function getCharacterOffsetWithin(range, node) {
                var treeWalker = document.createTreeWalker(
                    node,
                    NodeFilter.SHOW_TEXT,
                    function(node) {
                        var nodeRange = document.createRange();
                        nodeRange.selectNode(node);
                        return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
                            NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                    },
                    false
                );

                var charCount = 0;
                while (treeWalker.nextNode()) {
                    charCount += treeWalker.currentNode.length;
                }
                if (range.startContainer.nodeType == 3) {
                    charCount += range.startOffset;
                }
                return charCount;
            }


            var $inp = $(_this);

            function isChildOf(node, parentId) {
                while (node !== null) {
                    if (node.id === parentId) {
                        return true;
                    }
                    node = node.parentNode;
                }

                return false;
            };

            function getCurrentCursorPosition(parentId) {
                var selection = window.getSelection(),
                    charCount = -1,
                    node;

                if (selection.focusNode) {
                    if (isChildOf(selection.focusNode, parentId)) {
                        node = selection.focusNode; 
                        charCount = selection.focusOffset;

                        while (node) {
                            if (node.id === parentId) {
                                break;
                            }

                            if (node.previousSibling) {
                                node = node.previousSibling;
                                charCount += node.textContent.length;
                            } else {
                                 node = node.parentNode;
                                 if (node === null) {
                                     break
                                 }
                            }
                       }
                  }
               }

                return charCount;
            };

            // var el = $inp[0];
            // var range = window.getSelection().getRangeAt(0);
            // //console.log("Caret char pos: " + getCharacterOffsetWithin(range, el))
            // $inp.attr('data-selection',getCharacterOffsetWithin(range,el));
            // 
            $inp.attr('id','c_edit_f')
            $inp.addClass('g_focused')
            $inp.attr('data-selection',getCurrentCursorPosition('c_edit_f'));            
        },
        i_keydown_h:function(e){

            if (e.which == 13) {
            
                if ($(this).attr('data-key') == 'pre_form_offer' && document.location.pathname.indexOf('quiz')>=-1) {

                }else{

                    e.preventDefault();
                    e.stopPropagation();            
                
                }
            }
            
            lp1_edit.events.glvrd.make_focused(this);

            if (lp1_edit.events.glvrd.i_key_timeout) {
                clearTimeout(lp1_edit.events.glvrd.i_key_timeout)
            }
            var $inp = $(this);
            lp1_edit.events.glvrd.i_key_timeout = setTimeout(function(){
                lp1_edit.model.glvrd.update_real_val($inp);

            },3000);

        },
        rebind_inputs:function(){
            var $inps = lp1_edit.view.glvrd.wrap.find('.g_textarea,.g_input');
            var $frg = $inps.find('.fragment');

            $frg.unbind('mouseenter mouseleave');
            $frg.hover(function() {
                lp1_edit.view.glvrd.show_desc($(this).attr('data-ind'));
            }, function() {
                lp1_edit.view.glvrd.hide_desc();
            
            });
            
            $inps.unbind('blur');
            $inps.blur(this.i_blur_h);

            $inps.unbind('focus');
            $inps.focus(this.i_focus_h);            

            $inps.unbind('keydown');
            $inps.keydown(this.i_keydown_h);            

        },
        rebind:function(){
            // lp1_edit.model.glvrd.full_data = {
            //     descriptor:'',
            //     offer_h2:'',
            //     offer_h1:'',
            //     pre_form_offer:''
            // };
            var $inps = lp1_edit.view.wrap.find('input.valid,textarea.valid');

            lp1_edit.view.glvrd.wrap.find('.close').unbind('click');
            lp1_edit.view.glvrd.wrap.find('.close').click(function(e){

                lp1_edit.view.glvrd.wrap.removeClass('opened');

            });

            // $inps.unbind('focus',this.focus_h);
            // $inps.on('focus',this.focus_h);

            $inps.unbind('blur',this.blur_h);
            $inps.on('blur',this.blur_h);
        }
    },
        pusl_inst:{
            focus_h:function(){
                if ($(this).closest('.app-wrap').hasClass('inst_puls')) {
                    $(this).closest('.field_wrap').addClass('puls');
                }
            },
            blur_h:function(){
                $(this).closest('.field_wrap').removeClass('puls');

            }

        }

}