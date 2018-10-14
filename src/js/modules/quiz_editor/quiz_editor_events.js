;

'use strict';

console.log('quiz_editor.events start');

quiz_editor.events = {

    remove_req_hander: function() {
        $(this).removeClass('reqired_inp');
    },
    inp_selectors_nandler: function() {
        quiz_editor.model.update_data($(this));
    },
    inp_selectors: function() {
        var selectors = '';
        for (var i = quiz_editor.model.input_arr.length - 1; i >= 0; i--) {
            selectors += quiz_editor.model.input_arr[i].selector;

            if (i != 0) {
                selectors += ',';
            }
        }
        console.log('asdasddsl;kdasldaslk , ', selectors);
        //if (document.location.href.indexOf('quiz') == -1) {

            quiz_editor.view.helper.find(selectors).unbind('blur', quiz_editor.events.inp_selectors_nandler)
            quiz_editor.view.helper.find(selectors).on('blur', quiz_editor.events.inp_selectors_nandler)
   
        //}
    },
    rebind_sortable: function() {
        var el = document.getElementById('quest_items_wrap');
        var sortable = new Sortable(el, {
                animation:150,
            onUpdate: function() {
                quiz_editor.view.update_quest_num();
                quiz_editor.model.update_quest_num();
            },

        });
    },
    rebind_quest_list: function($list) {

        $list.uitooltip();
        quiz_editor.events.rebind_sortable();
        $list.find('.delete').unbind('click');
        $list.find('.delete').click(function() {
            var _this = $(this);
            show_confirm('Удалить вопрос безвозвратно?', function() {
                quiz_editor.model.delete_question(_this.closest('.item').attr('data-id'));

            });
        });

        $list.find('.hide').unbind('click');
        $list.find('.hide').click(function() {
            var _this = $(this);
            if (_this.hasClass('hids')) {

                _this.removeClass('hids').attr('title', 'Скрыть');
                quiz_editor.model.unhide_question(_this.closest('.item').attr('data-id'));
            } else {
                _this.addClass('hids').attr('title', 'Не скрывать');
                quiz_editor.model.hide_question(_this.closest('.item').attr('data-id'));
            }

        });

        $list.find('.button').unbind('click');
        $list.find('.button').click(function() {
            var _this = $(this);
            quiz_editor.model.run_edit_question_or_form(_this.closest('.item').attr('data-id'));


        });
    },
    qe_node_keydown_handler: function(event) {
        if (event.keyCode == 13 || event.keyCode == 27) {
            event.stopPropagation();
            event.preventDefault();

            var _this = this;
            var $all_ce = $(this).closest('.atomq_pop').find('.atomq_editable[contenteditable="true"]');
            var next_index = false;

            $(this).blur();


            if (event.keyCode != 27) {

                $all_ce.each(function(index, el) {

                    if (this == _this) {

                        if (index != $all_ce.length - 1) {
                            next_index = index + 1;
                        }

                    }

                    if (next_index && index == next_index) {

                        $(this).focus();
                    }

                });
            }

            return false;
            // $(this).attr('contenteditable',false);
        }
    },
    qe_rebind: function() {


        if (quiz_editor.model.glvrd.inited) {
            quiz_editor.model.glvrd.clean_test();
        }
        if(!if_defined(quiz_editor.view.view_ed_bd)){
                return;
        }
        var $bd = quiz_editor.view.view_ed_bd;

        var selectors_nodes = '';
        var images_selectors = '';
        var inputs_selectors = '';
        for (var i = quiz_editor.model.qe_selectors.length - 1; i >= 0; i--) {

            if (quiz_editor.model.qe_selectors[i].type == 'node') {

                selectors_nodes += quiz_editor.model.qe_selectors[i].selector;
                //if (i!=0) {
                selectors_nodes += ',';
                //}
            } else if (quiz_editor.model.qe_selectors[i].type == 'img_in' || quiz_editor.model.qe_selectors[i].type == 'img_ans') {

                images_selectors += quiz_editor.model.qe_selectors[i].selector;
                //if (i!=0) {
                images_selectors += ',';
                //}
            } else if (quiz_editor.model.qe_selectors[i].type == 'input') {

                inputs_selectors += quiz_editor.model.qe_selectors[i].selector;
                //if (i!=0) {
                inputs_selectors += ',';
                //}
            }
        }
        selectors_nodes = selectors_nodes.slice(0, -1);
        images_selectors = images_selectors.slice(0, -1);
        inputs_selectors = inputs_selectors.slice(0, -1);


        console.log('qe_rebind', selectors_nodes);
        var $imgs = $bd.find(images_selectors);
        var $elems = $bd.find(selectors_nodes);
        var $inputs = $bd.find(inputs_selectors);
        var $add_btn = $bd.find('.atomq_a.atomq_a_add');

        $elems.unbind('keydown', quiz_editor.events.qe_node_keydown_handler);
        $elems.keydown(quiz_editor.events.qe_node_keydown_handler);


        $inputs.unbind('keydown', quiz_editor.events.qe_node_keydown_handler);
        $inputs.keydown(quiz_editor.events.qe_node_keydown_handler);


        $imgs.each(function(index, el) {
            if ($(this).children('label').length == 0) {

                $(this).append('<label for="q_upoad_' + index + '" class="atomq_label"></label><form action="#" enctype="multipart/form-data"><input name="file" class="q_upoad" type="file" id="q_upoad_' + index + '"></form><form action="#" enctype="multipart/form-data"><input name="file" class="q_upoad_croped" type="file" id="q_upoad_croped_' + index + '"></form>');
            }
        });

        $imgs.find('input.q_upoad[type="file"]').unbind('change')
        $imgs.find('input.q_upoad[type="file"]').on('change',function () {
            
            var _this = this;

            var options = {

                min:[80,80],
                aspects:[
                    [1,1]
                ],
                default:[1,1],
                free:false,
                valid_types:["image/png", "image/jpeg","image/pjpeg"],
                out:{

                  width: 80,
                  height: 80,
                  minWidth: 80,
                  minHeight: 80,
                  img_type:'jpg'
                }
            }


            var $node = $(_this).closest('.atomq_editable');
            //var type = $(this).attr('data-upload-type');
            var type = $node.attr('data-up-type');

            if (type=='q_man') {
                options = {

                    min:[120,120],
                    aspects:[
                        [1,1]
                    ],
                    default:[1,1],
                    free:false,
                    valid_types:["image/png", "image/jpeg","image/pjpeg"],
                    out:{
                        
                      width: 80,
                      height: 80,
                      minWidth: 80,
                      minHeight: 80,
                      img_type:'jpg'
                    }
                }
            }else if(type=='q_logo') {
                options = {

                    min:[400,100],
                    aspects:[],
                    free:true,
                    valid_types:["image/png", "image/jpeg","image/pjpeg"],
                    padding:true,
                    out:{
                        
                      width: 300,
                      height: 80,
                      minWidth: 300,
                      minHeight:80,
                      img_type:'png'
                    }
                }
            }else if(type=='q_fbg') {
                options = {

                    min:[624,600],
                    aspects:[[52,50]],
                    default:[52,50],
                    free:false,
                    valid_types:["image/png", "image/jpeg","image/pjpeg"],
                    out:{
                        
                      width: 624,
                      height: 600,
                      minWidth: 624,
                      minHeight:600,
                      img_type:'jpg'
                    }
                }
            }else if(type=='q_gift') {
                options = {

                    min:[144,120],
                    aspects:[[12,10]],
                    default:[12,10],
                    free:false,
                    padding:true,
                    valid_types:["image/png", "image/jpeg","image/pjpeg"],
                    out:{
                        
                      width: 120,
                      height: 100,
                      minWidth: 120,
                      minHeight:100,
                      img_type:'png'
                    }
                }
            }else if(type=='q_ans_2') {
                options = {

                    min:[500,500],
                    aspects:[[1,1],[32,12]],
                    aspectsNames:['Квадратное','Горизонтальное'],
                    default:[1,1],
                    free:false,
                    valid_types:["image/png", "image/jpeg","image/pjpeg"],
                    out:{
                        
                      width: 500,
                      height: 200,
                      minWidth: 500,
                      minHeight: 200,
                      img_type:'jpg'
                    }
                }
            }else if(type=='q_ans_3') {
                options = {

                    min:[500,500],
                    aspects:[[188,120],[1,1],[188,293]],
                    aspectsNames:['Горизонтальное','Квадратное','Вертикальное'],
                    default:[1,1],
                    free:false,
                    valid_types:["image/png", "image/jpeg","image/pjpeg"],
                    out:{
                        
                      width: 500,
                      height: 200,
                      minWidth: 500,
                      minHeight: 200,
                      img_type:'jpg'
                    }
                }
            }

            one_crope(_this,options,function(elem,options) {
                
                var $label = $node.find('label');

                var node_type;

                for (var i = quiz_editor.model.qe_selectors.length - 1; i >= 0; i--) {
                    if ($node.is(quiz_editor.model.qe_selectors[i].selector)) {
                        node_type = quiz_editor.model.qe_selectors[i].type;
                    }

                }


                quiz_editor.controller.send_crop(options,elem,function(data){

                    if (node_type == 'img_in') {

                        $node.find('img').attr('src', data.data.img_url);
                    } else {
                        $node.css({
                            'background-image': 'url(' + data.data.img_url + ')'
                        });

                    }

                    quiz_editor.model.qe_update($node);

                    $('#one_cropper').removeClass('opened');
                    global_one_cropper.destroy();
                    removeURLparameter('cropper');
                    //$('#one_cropper').find('.close').trigger('click')

                })
                $(_this).val('');

            });

        });

        $imgs.find('input.q_upoad_croped[type="file"]').unbind('change')
        $imgs.find('input.q_upoad_croped[type="file"]').on('change',quiz_editor.events.qe_file_change_handler);



        var mouseover_handler = function() {

            if (!$(this).hasClass('atomq_focused') && !$(this).find('input,textarea').hasClass('atomq_focused')) {

                var _this = $(this);
                quiz_editor.view.q_append_info_links(_this);
                //$(this).find('span.atomq_info')


                // setTimeout(function() {
                    _this.find('span.atomq_info').css({'display':'block'});
                    // body...
                // },100)

            }
        };

        var mouseleave_handler = function() {
            $(this).children('span.atomq_info').hide();

        }


        var blur_handler = function() {
            var _this = $(this);

            _this.removeClass('atomq_focused');


            if (_this.is('input') || _this.is('textarea')) {

                _this.attr('placeholder', _this.val()).val('');
            }




            // var $elem = $(this).children('span.atomq_info');
            // if (_this.is('textarea')) {
            //     $elem = $(this).closest('.atomq_a_l').children('span.atomq_info');

            // }
            //setTimeout(function() {
              //  $elem.remove();
                quiz_editor.model.qe_update(_this);
            //}, 100);
            //
            if(_this.is('[contenteditable]')){
                var $placeh = _this.find('.placeh');
                if (_this.text() ==''&&$placeh.length==0||_this.text() =='?'&&$placeh.length==0) {
                    _this.append('<span class="placeh" contenteditable="true">'+_this.attr('data-placeh')+'</span>');
                }
            }

                //quiz_editor.model.qe_update(_this);

        }

        var foucs_handler = function() {
            if($(this).is('[contenteditable]')){
                var $placeh = $(this).find('.placeh');
                if ($placeh.length>0) {
                    $placeh.remove();
                    //$(this).focus();
                    var elem = $(this)[0];

                    setTimeout(function() {

                        if(elem != null) {
                            if(elem.createTextRange) {
                                var range = elem.createTextRange();
                                range.move('character', 0);
                                range.select();
                            }
                            else {
                                if(elem.selectionStart) {
                                    elem.setSelectionRange(0, 0);
                                }
                            }
                        }
                }, 100);
                    // setTimeout(function() {
                    //     $(this).focus();
                    // }, 100);
                    // return false
                    
                }
            }
            if (!$(this).hasClass('atomq_focused')) {


                $(this).addClass('atomq_focused')


                if ($(this).is('input') || $(this).is('textarea')) {

                    $(this).val($(this).attr('placeholder'));
                }



                var $elem = $(this).children('span.atomq_info');
                if ($(this).is('textarea')) {
                    $elem = $(this).closest('.atomq_a_l').children('span.atomq_info');

                }

                $elem.hide();
                


                //$(this).focus();
                // setTimeout(function() {
                //     $elem.remove();
                // }, 100);

            }

        }



        $elems.unbind('focus');
        $elems.on('focus', foucs_handler);

        $elems.unbind('blur');
        $elems.on('blur', blur_handler);

        $inputs.unbind('focus');
        $inputs.on('focus', foucs_handler);

        $inputs.unbind('blur');
        $inputs.on('blur', blur_handler);

        $imgs.unbind('mouseover mouseleave');
        $imgs.hover(mouseover_handler, mouseleave_handler);
         // $imgs.each(function(index, el) {
         //     append_info_links($(this));
         // });

        $elems.unbind('mouseover mouseleave');
        $elems.hover(mouseover_handler, mouseleave_handler);
         // $elems.each(function(index, el) {
         //    append_info_links($(this));
         // });

        $inputs.each(function(index, el) {
            // if ($(this).is('textarea')) {
            var $par = $(this).parent();
            //append_info_links($par);

            $par.unbind('mouseover mouseleave');
            $par.hover(mouseover_handler, mouseleave_handler);
            // }else{
            // 	atomq_input_wrap
            // }			
        });

        $add_btn.each(function(index, el) {
            quiz_editor.view.q_append_info_links($(this));
        });


        $bd.find('.atomq_on_of_input').find('.trig').unbind('click')

        $bd.find('.atomq_on_of_input').find('.trig').click(function() {
            var updated = 0;
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
                updated = 1;

            }


            var id = $(this).closest('form').attr('data-id');

            for (var i = quiz_editor.model.q_data.content.forms.length - 1; i >= 0; i--) {
                if (quiz_editor.model.q_data.content.forms[i].id == id) {

                    quiz_editor.model.q_data.content.forms[i].inp[$(this).parent().find('input').attr('name')].on = updated;

                }
            }

            quiz_editor.model.save();
        });
        $bd.find('.quiz_editor_form_append').find('.trig').unbind('click')

        $bd.find('.quiz_editor_form_append').find('.trig').click(function() {
            var updated = 'on';
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                updated = 'off';
            } else {

                $(this).addClass('active');
            }



            var id = $(this).closest('.atomq_frm-part').find('form.atomq_l_r_f_r').attr('data-id');
            for (var i = quiz_editor.model.q_data.content.forms.length - 1; i >= 0; i--) {
                if (quiz_editor.model.q_data.content.forms[i].id == id) {
                    quiz_editor.model.q_data.content.forms[i].appending = updated;

                }
            }

            quiz_editor.model.save();
        });



        $bd.find('.atomq_a_rds,.atomq_a_rss').unbind('mouseover mouseleave');
        $bd.find('.atomq_a_rds,.atomq_a_rss').hover(mouseover_handler, mouseleave_handler);


        $bd.find('.atomq_a_rds,.atomq_a_rss').unbind('click');
        $bd.find('.atomq_a_rds,.atomq_a_rss').click(function(e) {
            e.stopPropagation();
            quiz_editor.model.range_settings($(this));
        });

        $bd.find('.atomq_a.atomq_a_add').unbind('click');
        $bd.find('.atomq_a.atomq_a_add').click(function(event) {

            if ($(this).is('.atomq_a_can_miss')) {

                quiz_editor.model.qe_add_can_miss($(this));

            } else {

                quiz_editor.model.qe_add_answer($(this));
            }

        });

        $bd.find('.atomq_a').children('.atomq_delete').unbind('click');
        $bd.find('.atomq_a').children('.atomq_delete').click(function() {

            var _this = this;
            if (!$(this).closest('.atomq_a').attr('data-index')) {

                quiz_editor.model.qe_remove_can_miss($(_this));

            } else {
                show_confirm('Удалить ответ безвозвратно?', function() {

                    quiz_editor.model.qe_delete_answer($(_this));
                });
            }
        });
        var $inp_list = $bd.find('#form_items_list')[0];
        if ($bd.find('#form_items_list').length>0  && if_defined($inp_list)) {

            new Sortable($bd.find('#form_items_list')[0], {
                animation:150,
                onUpdate: function() {
                    $bd.find('#form_items_list').children().each(function(index, el) {
                        
                        var inp = $(this).find('input').attr('name')


                        var id = $(this).closest('form.atomq_l_r_f_r').attr('data-id');
                        for (var i = quiz_editor.model.q_data.content.forms.length - 1; i >= 0; i--) {
                            if (quiz_editor.model.q_data.content.forms[i].id == id) {
                                quiz_editor.model.q_data.content.forms[i].inp[inp].num = index+1;

                            }
                        }


                    });
                    quiz_editor.model.save();
                }

            });
            
        }

        $bd.find('.quiz_check_text').unbind('click');
        $bd.find('.quiz_check_text').click(function(e) {
            e.preventDefault();
            if (window.glvrd) {

                quiz_editor.model.glvrd.clean_test();                
                quiz_editor.view.glvrd.wrap.addClass('opened');
            }
        });
        
                quiz_editor.events.glvrd.rebind();

        setTimeout(function() {

            quiz_editor.view.view_ed_window.sliders.init();
        }, 1);



    },

    qe_file_change_handler: function(e) {
        e.preventDefault();

        console.log('lp3_editor_file_input_change_handler');
        var $inp = $(this);
        var $node = $(this).closest('.atomq_editable');
        //var type = $(this).attr('data-upload-type');
        var type = $node.attr('data-up-type');
        var $label = $node.find('label');

        var node_type;

        for (var i = quiz_editor.model.qe_selectors.length - 1; i >= 0; i--) {
            if ($node.is(quiz_editor.model.qe_selectors[i].selector)) {
                node_type = quiz_editor.model.qe_selectors[i].type;
            }

        }


        quiz_editor.controller.upload_file(this, type, function(data) {
            //logo, bg, , block_bg, slide, , download  

            // } else if (type == 'block_bg') {

            //     $wrap.find('input[name="block_bg_m"]').val(data.data.img_url);
            //     $wrap.find('input[name="block_bg_d"]').val(data.data.img_url).trigger('blur');
            // }


            if (node_type == 'img_in') {

                $node.find('img').attr('src', data.data.img_url);
            } else {
                $node.css({
                    'background-image': 'url(' + data.data.img_url + ')'
                });

            }
            $inp.val('');

            quiz_editor.model.qe_update($node);


        });

    },
    escape_keydown: function(e) {
        if (e.keyCode == 27) {
            if ($('#quiz_edit_range').closest('.arcticmodal-container_i2').length > 0) {
                $('#quiz_edit_range').arcticmodal('close');
            } else if ($('#quiz_form_settings').closest('.arcticmodal-container_i2').length > 0) {

                $('#quiz_form_settings').arcticmodal('close');

            }else{
                quiz_editor.view.close_view_editor();
            }
        }
    },
    pop_edit_keydown: function(event) {
        if (event.keyCode == 13 || event.keyCode == 27) {
            event.stopPropagation();
            event.preventDefault();

            var _this = this;
            var $all_ce = $(this).closest('#quiz_edit_range').find('.inp-wrap:visible').find('input');
            var next_index = false;

            $(this).blur();


            if (!$(this).is('textarea') && event.keyCode != 27) {

                $all_ce.each(function(index, el) {

                    if (this == _this) {

                        if (index != $all_ce.length - 1) {
                            next_index = index + 1;
                        }

                    }

                    if (next_index && index == next_index) {

                        $(this).focus();
                    }

                });
            }

            return false;
            // $(this).attr('contenteditable',false);
        }
    },
    rebind_form_list: function() {

        var $form_edit = quiz_editor.view.editor.find('.froms_part').find('.button.edit');
        //quiz_editor.view.editor.find('.froms_part').find('.button.edit').unbind('click');
        $form_edit.unbind('click');
        $form_edit.click(function() {

            var _this = $(this);
            quiz_editor.model.run_edit_question_or_form(_this.closest('.item').attr('data-id'), true);

        });
        var $form_settings = quiz_editor.view.editor.find('.froms_part').find('.button.settings');
        //quiz_editor.view.editor.find('.froms_part').find('.button.edit').unbind('click');
        $form_settings.unbind('click');
        $form_settings.click(function() {

            var _this = $(this);
            quiz_editor.view.open_form_settings(_this.closest('.item').attr('data-id'));


        });
    },
    rebind: function() {

        quiz_editor.view.helper.find('.reqired_inp').unbind('blur', quiz_editor.events.remove_req_hander);
        quiz_editor.view.helper.find('.reqired_inp').on('blur', quiz_editor.events.remove_req_hander);



         quiz_editor.view.editor.find('.question_type,.qt_heading,.part>h2').find('a.help').unbind('click');
         quiz_editor.view.editor.find('.question_type,.qt_heading,.part>h2').find('a.help').click(function(e) {
             e.preventDefault();
             e.stopPropagation();
             if(document.location.href.indexOf('edit_by_step')>-1){
                if(typeof step_faq != 'undefined' && if_defined(step_faq)){
                    if(typeof step_ed_q != 'undefined' && if_defined(step_ed_q)){
                        var f_id = $(this).attr('data-target');
                        //alert('asd'+f_id)
                        step_ed_q.view.toggle_tar_inst(f_id);
                    }

                }

             }else{
                open_from_url($(this).attr('href'),true);

             }
         });;

        quiz_editor.view.editor.find('.quest_part').find('.add-btn').unbind('click');
        quiz_editor.view.editor.find('.quest_part').find('.add-btn').click(function() {
            quiz_editor.view.open_select_type_question();
        });

        quiz_editor.view.editor.find('.quest_part').find('.question_type').unbind('click');
        quiz_editor.view.editor.find('.quest_part').find('.question_type').click(function() {
            quiz_editor.model.create_question($(this).attr('data-type'));

            quiz_editor.view.close_select_type_question();
            quiz_editor.view.render_questions();
        });


        quiz_editor.view.editor.find('#quiz_edit_range').find('input').unbind('blur keydown');

        quiz_editor.view.editor.find('#quiz_edit_range').find('input').ForceNumericOnly();


        quiz_editor.view.editor.find('#quiz_edit_range').find('input').blur(function(event) {
            var $pop = $(this).closest('#quiz_edit_range');
            var name = $(this).attr('name');
            var id = $pop.attr('data-id');
            var index = parseInt($pop.attr('data-index'));

            var in_index = 0;

            if (name == 'value') {
                in_index = parseInt($(this).attr('data-index'))
            }

            for (var i = quiz_editor.model.q_data.content.questions.length - 1; i >= 0; i--) {
                if (quiz_editor.model.q_data.content.questions[i].id == id) {

                    if (name == 'value') {
                        quiz_editor.model.q_data.content.questions[i].answers[index][name][in_index] = $(this).val();
                    } else {
                        quiz_editor.model.q_data.content.questions[i].answers[index][name] = $(this).val();

                    }
                }
            }

            quiz_editor.model.save();


        });

        quiz_editor.view.editor.find('#quiz_edit_range').find('input').keydown(quiz_editor.events.pop_edit_keydown);


        // quiz_editor.view.helper.find('.i_info_btn').unbind('click');
        // quiz_editor.view.helper.find('.i_info_btn').click(function(e) {
        //     e.preventDefault();
        //     $(this).closest('.help_info_wrap').toggleClass('opened');
        //     e.stopPropagation();
        // });
        
        quiz_editor.view.helper.find('.i_info_btn').unbind('click');
        quiz_editor.view.helper.find('.i_info_btn').click(function(e) {
            e.preventDefault();
            var $first_link = $(this).closest('.help_info_wrap').find('.i_info_pop').first()
            $first_link.attr('href',$first_link.attr('href').split('&')[0]);
            $first_link.trigger('click');
            e.stopPropagation();
        });



        quiz_editor.view.editor.find('#quiz_form_settings').find('textarea').unbind('blur keydown');

        quiz_editor.view.editor.find('#quiz_form_settings').find('textarea').blur(function(event) {
            var $pop = $(this).closest('#quiz_form_settings');
            var id = $pop.attr('data-id');

            for (var i = quiz_editor.model.q_data.content.forms.length - 1; i >= 0; i--) {
                if (quiz_editor.model.q_data.content.forms[i].id == id) {

                    quiz_editor.model.q_data.content.forms[i].aftersend = $(this).val();

                }
            }

            quiz_editor.model.save();


        });

        quiz_editor.view.editor.find('#quiz_form_settings').find('textarea').keydown(quiz_editor.events.pop_edit_keydown);





        quiz_editor.view.editor.find('#quiz_form_settings').find('.trig').unbind('click')
        quiz_editor.view.editor.find('#quiz_form_settings').find('.trig').click(function() {
            var $this = $(this)
            if ($this.hasClass('active')) {
                $this.removeClass('active');
                var $pop = $(this).closest('#quiz_form_settings');
                var id = $pop.attr('data-id');

                for (var i = quiz_editor.model.q_data.content.forms.length - 1; i >= 0; i--) {
                    if (quiz_editor.model.q_data.content.forms[i].id == id) {

                        quiz_editor.model.q_data.content.forms[i].aftersend_file = 0;
                        quiz_editor.model.save();

                    }
                }
            } else {
                $this.addClass('active');
            }

        });


        quiz_editor.view.editor.find('#quiz_form_settings').find('#aftersend_file_quiz').unbind('change')
        quiz_editor.view.editor.find('#quiz_form_settings').find('#aftersend_file_quiz').on('change',function(e) {
            e.preventDefault();
            ////alert('changed');
            var type = 'download';
            var $this = $(this);
            var $label = $this.closest('form').find('label');

            quiz_editor.controller.upload_file(this, type, function(data) {
                //logo, bg, , block_bg, slide, , download  

                // } else if (type == 'block_bg') {

                //     $wrap.find('input[name="block_bg_m"]').val(data.data.img_url);
                //     $wrap.find('input[name="block_bg_d"]').val(data.data.img_url).trigger('blur');
                // }
				var $pop = $this.closest('#quiz_form_settings');
                var id = $pop.attr('data-id');

                for (var i = quiz_editor.model.q_data.content.forms.length - 1; i >= 0; i--) {
                    if (quiz_editor.model.q_data.content.forms[i].id == id) {

                        quiz_editor.model.q_data.content.forms[i].aftersend_file = data.data.img_url;
                        quiz_editor.model.save();
                    }
                }

                var text = $label.text();

                $label.addClass('loaded');
                $label.html('Файл загружен');
                setTimeout(function(){
                    $label.html(text);
                    $label.removeClass('loaded');
                },5000);


            });

        });



        // quiz_editor.view.editor.find('.reqired_inp')
        quiz_editor.events.inp_selectors();
        quiz_editor.view.helper.uitooltip();
    },
    rebind_list:function () {
        var $wr = quiz_editor.view.list;
        $wr.find('.quiz_list_item').unbind('click')
        $wr.find('.quiz_list_item').click(function(){
            ////alert('clicked');
            var $this = $(this); 
            if ($this.hasClass('enabled')) {
                var $list = $this.next();
                if($list.is(':visible')){
                    $list.hide()
                }else{
                    $list.show();

                }
            }else{
                var id = $this.attr('data-id');


                function end(){

                    $this.parent().hide();
                    var $enabled = $this.parent().parent().find('.enabled');
                    $enabled.html($this.html());
                    $enabled.attr('data-id',$this.attr('data-id'));

                    updateQueryStringParam('qi',id);
                    //quiz_editor.model.defaul_init();

                    quiz_editor.model.defaul_init();
                    quiz_editor.view.helper.find('#quiz_panel').show();
                    
                }


                if (id != 'new') {

                    var page_id = getURLParameter('i');
                    quiz_editor.controller.attach_quiz_to_page(id,page_id);
                    //get_user_info();

                     end();
                }else{
                    //end();
                    get_user_info(function(){

                        if(parseInt(global_user_data.limits['QUIZ'].used)>parseInt(global_user_data.limits['QUIZ'].limit)){


                            show_info_pop('Вы превысили лимит созданных квизов для вашего тарифного плана. Пожалуйста удалите лишние или оплатите <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тариф</a> с подходящими вам лимитами.','Лимит тарифного плана превышен');
                            //open_from_url('/quiz',true);
                            return false;

                        }else if(parseInt(global_user_data.limits['QUIZ'].used)==parseInt(global_user_data.limits['QUIZ'].limit)){

                            show_info_pop('Вы заполнили лимит созданных квизов для вашего тарифного плана. Пожалуйста удалите лишние или оплатите <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тариф</a> с подходящими вам лимитами.','Лимит тарифного плана');
                
                            //show_info_pop('Вы превысили лимит созданных квизов для вашего тарифного плана. Пожалуйста удалите лишние или оплатите <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тариф</a> с подходящими вам лимитами.','Лимит тарифного плана превышен');
                            //open_from_url('/quiz',true);
                            return false;

                        }
                        

                        end();
                            return false;
                    },function(){},true);
                    //end();
                }


            }
        })
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
            quiz_editor.model.glvrd.update_from_el($(this));
            


        },
        i_focus_h:function(e){
            quiz_editor.events.glvrd.make_focused(this,true);
        },
        i_blur_h:function(e){
            //e.preventDefault();
            //e.stopPropagation();

            if (quiz_editor.events.glvrd.i_key_timeout) {
                 clearTimeout(quiz_editor.events.glvrd.i_key_timeout)
            }
            quiz_editor.view.glvrd.wrap.find('#c_edit_f').removeClass('g_focused').removeAttr('id');
            var $elem = $(this);
            // setTimeout(function(){

                quiz_editor.model.glvrd.update_real_val($elem);   
            // },2000);         
        },
        i_key_time:3000,
        i_key_timeout:false,
        make_focused:function(_this,focus){

            // if (focus) {

            //     $(_this).trigger('keydown');
            // }

            if (quiz_editor.events.glvrd.i_key_timeout) {
                clearTimeout(quiz_editor.events.glvrd.i_key_timeout)
            }
            quiz_editor.view.glvrd.wrap.find('#c_edit_f').removeClass('g_focused').removeAttr('id');

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
            
            quiz_editor.events.glvrd.make_focused(this);

            if (quiz_editor.events.glvrd.i_key_timeout) {
                clearTimeout(quiz_editor.events.glvrd.i_key_timeout)
            }
            var $inp = $(this);
            quiz_editor.events.glvrd.i_key_timeout = setTimeout(function(){
                quiz_editor.model.glvrd.update_real_val($inp);

            },3000);

        },
        rebind_inputs:function(){
            var $inps = quiz_editor.view.glvrd.wrap.find('.g_textarea,.g_input');
            var $frg = $inps.find('.fragment');

            $frg.unbind('mouseenter mouseleave');
            $frg.hover(function() {
                quiz_editor.view.glvrd.show_desc($(this).attr('data-ind'));
            }, function() {
                quiz_editor.view.glvrd.hide_desc();
            
            });
            
            $inps.unbind('blur');
            $inps.blur(this.i_blur_h);

            $inps.unbind('focus');
            $inps.focus(this.i_focus_h);            

            $inps.unbind('keydown');
            $inps.keydown(this.i_keydown_h);            

        },
        rebind:function(){
            // quiz_editor.model.glvrd.full_data = {
            //     descriptor:'',
            //     offer_h2:'',
            //     offer_h1:'',
            //     pre_form_offer:''
            // };quiz_editor.view.view_ed_bd

            if (if_defined(quiz_editor.view.glvrd.wrap)) {
                    quiz_editor.view.glvrd.wrap.find('.close').unbind('click');
                    quiz_editor.view.glvrd.wrap.find('.close').click(function(e){

                        quiz_editor.view.glvrd.wrap.removeClass('opened');

                    });
            }

            if (if_defined(quiz_editor.view.view_ed_bd)) {

                var $inps = quiz_editor.view.view_ed_bd.find('p.atomq_editable');
                // $inps.unbind('focus',this.focus_h);
                // $inps.on('focus',this.focus_h);

                $inps.unbind('blur',this.blur_h);
                $inps.on('blur',this.blur_h);
            }
        }
    }

}