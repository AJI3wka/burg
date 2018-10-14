;

'use strict';

console.log('quiz_editor.view start');


quiz_editor.view = {


    render_forms: function() {
        var $wrap = quiz_editor.view.editor.find('.froms_part').find('.list')
        var froms_html = '';
        $wrap.html(froms_html);
        if (!if_defined(quiz_editor.model.q_data.content.forms)) {
            var forms = Object.assign({}, quiz_editor.model.def_data.content.forms)
            quiz_editor.model.q_data.content.forms = forms;
        }
        for (var i = quiz_editor.model.q_data.content.forms.length - 1; i >= 0; i--) {
            // quiz_edit.model.q_data.forms[i]

            froms_html += '<div class="item" data-id="' + quiz_editor.model.q_data.content.forms[i].id + '">';
            froms_html += '<div class="title">Стандартная форма</div>';
            froms_html += '<div class="right">';
            froms_html += '<div class="button settings tooltiped">Настроить</div>';
            froms_html += '<div class="button edit tooltiped">Редактировать</div>';
            // froms_html += '<div class="delete"></div>';
            froms_html += '</div>';
            froms_html += '</div>';
        }
        $wrap.html(froms_html);
        quiz_editor.events.rebind_form_list();
    },
    open_select_type_question: function() {
        //alert('open_list');
        quiz_editor.view.editor.find('.quest_part').find('.add-btn').hide();
        quiz_editor.view.editor.find('.quest_part').find('.quest-types_wrap').show();
        quiz_editor.view.editor.addClass('quest_types');
        //else{


            updateQueryStringParam('types','show');

        if(document.location.pathname.indexOf('edit_by_step')>-1){
            
            quiz_editor.view.editor.find('.quest_part').find('.list').hide();
            
            if(typeof  step_faq != 'undefined' && if_defined(step_faq)){

               step_faq.model.staritng();
            }


        }
        //}
    },
    close_select_type_question: function() {
        quiz_editor.view.editor.find('.quest_part').find('.add-btn').show();
        quiz_editor.view.editor.find('.quest_part').find('.quest-types_wrap').hide();
        quiz_editor.view.editor.removeClass('quest_types');

        //else{

             removeURLparameter('types');
        //}
        if(document.location.pathname.indexOf('edit_by_step')>-1){

            quiz_editor.view.editor.find('.quest_part').find('.show').show();            

            //$('.navigation').find('.m_content').find('h5').html('Список вопросов');
            if(typeof step_faq != 'undefined' && if_defined(step_faq)){
                step_faq.model.staritng();
            }

        }

    },
    update_quest_num: function() {
        console.log('update_quest_num')
        $('#quest_items_wrap').children().each(function(index, el) {
            $(this).find('.num').html(index + 1);
        });;
    },
    render_questions: function() {

        var $wrap = quiz_editor.view.editor.find('.quest_part').find('.list')
        var quest_html = '';
        $wrap.html(quest_html);
        if (quiz_editor.model.q_data.content.questions.length > 0) {

            quiz_editor.model.q_data.content.questions.sort(function(a, b) {
                var keyA = parseInt(a.num),
                    keyB = parseInt(b.num);
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });

            for (var i = 0; i <= quiz_editor.model.q_data.content.questions.length - 1; i++) {
                // quiz_edit.model.q_data.forms[i]

                quest_html += '<div class="item" data-id="' + quiz_editor.model.q_data.content.questions[i].id + '">';
                quest_html += '<div class="num">' + quiz_editor.model.q_data.content.questions[i].num + '</div>';
                quest_html += '<div class="title">' + quiz_editor.model.q_data.content.questions[i].question + '</div>';
                quest_html += '<div class="right">';
                quest_html += '<div class="button btn">Редактировать</div>';
                var addclass = '';
                var tooltip = 'Скрыть';
                if (quiz_editor.model.q_data.content.questions[i].hidden == 1) {
                    addclass = ' hids';
                    tooltip = 'Не скрывать'
                }
                quest_html += '<div class="hide tooltiped' + addclass + '" title="' + tooltip + '"></div>';
                quest_html += '<div class="delete tooltiped" title="Удалить"></div>';
                quest_html += '</div>';
                quest_html += '</div>';

            }

            $wrap.html(quest_html); 
            setTimeout(function(){
                
                $wrap.find('.item').each(function(index, el) {
                    if ($(this).height() > 24) {
                        $(this).addClass('too_long');
                        var width = $(this).find('.right').position().left - (10 + 30 + 10);
                        console.log('width = ', width, $(this).find('.right').position().left, $(this).width());
                        $(this).find('.title').width(width);
                    }
                });
            },50);


            quiz_editor.events.rebind_quest_list($wrap);


        } else {
            quiz_editor.view.open_select_type_question();
        }
    },
    close_view_editor: function() {
        // quiz_editor.view.view_ed_wrap.hide();
        quiz_editor.view.view_ed_wrap.hide();
        if(document.location.pathname.indexOf('edit_by_step')>-1){
            quiz_editor.view.editor.show();
            quiz_editor.view.editor.find('#quest_items_wrap').show();
            quiz_editor.view.editor.find('.quest_part').find('.add-btn').show();
        }

        $(document).unbind('keydown', quiz_editor.events.escape_keydown);
        quiz_editor.view.view_ed_bd.unbind('keydown', quiz_editor.events.escape_keydown);


        quiz_editor.view.paste_data();

    },
    open_help_from_el: function($elem) {
        var $node = $elem.closest('.atomq_editable');
        
    
        function open_from_key(key){

            if(document.location.pathname.indexOf('edit_by_step')>-1){

                var n_key = '';

                if(key == 'quiz_title'){
                    n_key = 'q_title';
                }else if(key == 'quiz_person_name'){
                    n_key = 'q_p_name';

                }else if(key == 'quiz_person_img'){
                    n_key = 'q_p_img';

                }else if(key == 'quiz_person_stat'){
                    n_key = 'q_p_stat';

                }else if(key == 'quiz_logo'){
                    n_key = 'q_logo';

                }else if(key == 'quiz_quest_text'){
                    n_key = 'question';

                }else if(key == 'quiz_quest_descr'){
                    n_key = 'quest_description';

                }else if(key == 'quiz_can_miss'){
                    n_key = 'can_miss';

                }else if(key == 'quiz_2_img'){
                    n_key = 'answers';

                }else if(key == 'quiz_3_img'){
                    n_key = 'answers';

                }else if(key == 'quiz_check'){
                    n_key = 'answers';

                }else if(key == 'quiz_inputs'){
                    n_key = 'answers';

                }else if(key == 'quiz_dates'){
                    n_key = 'answers';

                }else if(key == 'quiz_range'){
                    n_key = 'answers';

                }else if(key == 'quiz_text'){
                    n_key = 'answers';

                }else if(key == 'quiz_textarea'){
                    n_key = 'placeholder';

                }else if(key == 'answers'){
                    n_key = 'answers';

                }else if(key == 'quiz_form_bg'){
                    n_key = 'q_f_bg';

                }else if(key == 'quiz_present_title'){
                    n_key = 'q_f_g_head';

                }else if(key == 'quiz_present_text'){
                    n_key = 'q_f_g_text';

                }else if(key == 'quiz_present_img'){
                    n_key = 'q_f_g_img';

                }else if(key == 'quiz_form_h1'){
                    n_key = 'q_f_h1';

                }else if(key == 'quiz_form_h2'){
                    n_key = 'q_f_h2';

                }else if(key == 'quiz_form_btn'){
                    n_key = 'q_f_btn';

                }


                //alert( key + '   '+n_key);


                step_ed_q.view.toggle_tar_inst(n_key);
        
                //$('#faq_wrp').find('li[data-target='+n_key+']').trigger('click');

            }else{
                open_from_url('/how_to?i='+key);
            }

        }


        if ($node.is('.atomq_h_s')) {


            open_from_key('quiz_title');

        } else if ($node.is('.atomq_l_r_f_r_g_h')) {


            open_from_key('quiz_present_title');

        } else if ($node.is('.atomq_l_r_f_r_g_t')) {


            open_from_key('quiz_present_text');

        } else if ($node.is('.atomq_l_r_f_r_g_i')) {


            open_from_key('quiz_present_img');

        } else if ($node.is('.atomq_l_r_f_r_g_i')) {


            open_from_key('quiz_present_img');

        } else if ($node.is('.atomq_l_r_f_r_h')) {


            open_from_key('quiz_form_h1');

        } else if ($node.is('.atomq_l_r_f_r_t')) {


            open_from_key('quiz_form_h2');

        } else if ($node.is('.atomq_l_r_f_r_b')) {


            open_from_key('quiz_form_btn');

        } else if ($node.is('.atomq_l_r_f_l')) {


            open_from_key('quiz_form_bg');

        } else if ($node.is('.atomq_r_t_n')) {


            open_from_key('quiz_person_name');

        } else if ($node.is('.atomq_r_t_i_w')) {


            open_from_key('quiz_person_img');

        } else if ($node.is('.atomq_r_t_p')) {


            open_from_key('quiz_person_stat');

        } else if ($node.is('.atom_r_b_l_i_w')) {


            open_from_key('quiz_logo');

        } else if ($node.is('.atomq_q_t')) {


            open_from_key('quiz_quest_text');

        } else if ($node.is('.atomq_r_q')) {


            open_from_key('quiz_quest_descr');

        } else if ($node.is('.atom_a_i_ww[data-up-type="q_ans_2"]')) {


            open_from_key('quiz_2_img');

        } else if ($node.is('.atom_a_i_ww[data-up-type="q_ans_3"]')) {


            open_from_key('quiz_3_img');

        } else if ($node.is('.atomq_a_p')) {
            if ($node.is('.atomq_editable_cm')) {


                open_from_key('quiz_can_miss');

            } else {

                if ($node.parent().find('.atom_a_i_ww').length > 0) {

                    $img = $node.parent().find('.atom_a_i');

                    if ($img.length > 0) {


                        if ($img.parent().is('.atom_a_i_ww[data-up-type="q_ans_2"]')) {


                            open_from_key('quiz_2_img');

                        } else if ($img.parent().is('.atom_a_i_ww[data-up-type="q_ans_3"]')) {
                            open_from_key('quiz_3_img');



                        }
                    } else {
                        if ($node.closest('.atomq_a_p_c').length > 0) {

                            open_from_key('quiz_check');

                        }
                    }


                } else {

                    if ($node.parent('.atomq_a_p_i').length > 0) {

                        open_from_key('quiz_inputs');

                    } else if ($node.parent('.atomq_a_p_dp').length > 0) {

                        open_from_key('quiz_dates');

                    } else if ($node.parent('.atomq_a_r').length > 0) {

                        open_from_key('quiz_range');

                    } else if($node.parent('.atomq_a_p_c').length>0){

                        open_from_key('quiz_check');
                    }else{
                        open_from_key('quiz_text');

                    }

                }
            }
        }

        if ($node.length == 0) {
            if ($elem.parent('.atomq_input_wrap').length > 0) {

                if ($elem.parent('.atomq_input_wrap').children('.atomq_a_dp').length > 0) {

                    open_from_key('quiz_dates');

                } else {

                    open_from_key('quiz_inputs');

                }
            }else if($elem.closest('.atomq_a_r').length>0){


                open_from_key('quiz_range');
            } else if ($elem.closest('.atomq_a_l').length > 0) {

                if($elem.closest('.atomq_a_add').length>0){

                    if($elem.closest('.atomq_a_can_miss').length>0){

                        open_from_key('quiz_can_miss');
                    }else{

                        open_from_key('answers');
                   
                    }          
                }else{

                    open_from_key('quiz_textarea');
                }      
            } else if ($elem.closest('.atomq_a_add').length > 0) {
                
                if($elem.closest('.atomq_a_can_miss').length>0){

                    open_from_key('quiz_can_miss');
                }else{

                    open_from_key('answers');
               
                }
            }
        }
        // <a class="link" href="/how_to?i=quiz_title">Квиз. Заголовок квиза</a>
        // <a class="link" href="/how_to?i=quiz_person_name">Квиз. Имя менеджера</a>
        // <a class="link" href="/how_to?i=quiz_person_img">Квиз. Лицо менеджера</a>
        // <a class="link" href="/how_to?i=quiz_person_manager">Квиз. Должность менеджера</a>
        // <a class="link" href="/how_to?i=quiz_logo">Квиз. Логотип</a>
        // <a class="link" href="/how_to?i=quiz_quest_text">Квиз. Текст вопроса</a>
        // <a class="link" href="/how_to?i=quiz_quest_descr">Квиз. Описание вопроса</a>
        // <a class="link" href="/how_to?i=quiz_2_img">Квиз. 2 в ряд</a>
        // <a class="link" href="/how_to?i=quiz_3_img">Квиз. 3 в ряд</a>
        // <a class="link" href="/how_to?i=quiz_text">Квиз. Текстовые</a>
        // <a class="link" href="/how_to?i=quiz_check">Квиз. Чекбоксы</a>
        // <a class="link" href="/how_to?i=quiz_textarea">Квиз. Текстовое поле для ввода</a>
        // <a class="link" href="/how_to?i=quiz_inputs">Квиз. Набор полей</a>
        // <a class="link" href="/how_to?i=quiz_dates">Квиз. Даты</a>
        // <a class="link" href="/how_to?i=quiz_range">Квиз. Ползунки</a>
    },
    eq_paste_static: function() {
        var $bd = quiz_editor.view.view_ed_bd;
        if(if_defined(quiz_editor.model.q_data)&&if_defined(quiz_editor.model.q_data.content)){

        $bd.find('.atomq_editable.atomq_h_s').html(quiz_editor.model.q_data.content.title);
        $bd.find('.atomq_r_t_i_w.atomq_editable').find('img.atomq_r_t_i').attr('src', quiz_editor.model.q_data.content.p_image);
        $bd.find('.atomq_editable.atomq_r_t_n').html(quiz_editor.model.q_data.content.p_name);
        $bd.find('.atomq_editable.atomq_r_t_p').html(quiz_editor.model.q_data.content.p_status);
        $bd.find('.atom_r_b_l_i_w.atomq_editable').find('img.atom_r_b_l_i').attr('src', quiz_editor.model.q_data.content.logo);

        }else{
            $bd.find('.atomq_close').trigger('click');
        }

    },
    eq_render_progress: function(id) {
        var $bd = quiz_editor.view.view_ed_bd;
        if(if_defined(quiz_editor.model.q_data)&&if_defined(quiz_editor.model.q_data.content)){
            for (var i = quiz_editor.model.q_data.content.questions.length - 1; i >= 0; i--) {
                if (quiz_editor.model.q_data.content.questions[i].id == id) {
                    var percantage = Math.round(parseInt(quiz_editor.model.q_data.content.questions[i].num) / quiz_editor.model.q_data.content.questions.length * 100)
                    $bd.find('.atomq_p_p').width(percantage + '%').html(percantage + '%');
                    $bd.find('.atomq_r_t_s_c').html(quiz_editor.model.q_data.content.questions[i].num);
                    $bd.find('.atomq_r_t_s_a').html(quiz_editor.model.q_data.content.questions.length);

                }
            }
        }else{
            $bd.find('.atomq_close').trigger('click');
        }

    },
    eq_render_question: function(id) {
        var $bd = quiz_editor.view.view_ed_bd;
        if(if_defined(quiz_editor.model.q_data)&&if_defined(quiz_editor.model.q_data.content)){
            for (var i = quiz_editor.model.q_data.content.questions.length - 1; i >= 0; i--) {
                if (quiz_editor.model.q_data.content.questions[i].id == id) {

                    var quest = quiz_editor.model.q_data.content.questions[i];

                    //var items_html = '';

                    var t_html = '';
                    var q_html = '';
                    var a_html = '';
                    var cache_rev = quiz_editor.model.q_data.content.rev;
                    t_html += '<p class="atomq_r_q atomq_editable" contenteditable="true" data-id="' + quest.id + '" data-placeh="Введите описание вопроса">' + quest.text + '</p>';
                    q_html += '<p class="atomq_q_t atomq_editable" contenteditable="true" data-id="' + quest.id + '" data-placeh="Введите Ваш вопрос">' + quest.question + '</p>';

                    var a_i_html = '';

                    if (quest.can_miss == 1 && quest.type == 'textarea') {

                        a_i_html += '<div class="atomq_a_l atomq_a_c_miss atomq_editable" data-type="' + quest.type + '" data-id="' + quest.id + '">';

                    } else {

                        a_i_html += '<div class="atomq_a_l" data-type="' + quest.type + '" data-id="' + quest.id + '">';

                    }

                    for (var j = 0; j <= quest.answers.length - 1; j++) {

                        switch (quest.type) {
                            case 'img_2':

                                a_i_html += '<div class="atomq_a atomq_a_p_t" data-index=' + j + '>';
                                a_i_html += '<div class="atomq_delete"></div>';
                                a_i_html += '<div class="atom_a_i_w">';

                                a_i_html +='<div class="atom_a_i_ww atomq_editable" data-up-type="q_ans_2">';
                                a_i_html += '<img class="atom_a_i" src="' + quest.answers[j].img + '">';  

                                a_i_html += '</div>';
                                // a_i_html += '<div class="atom_a_i atomq_editable" data-up-type="q_ans_2" style="background-image:url(' + quest.answers[j].img + '?v=' + cache_rev + ')"></div>';
                                a_i_html += '</div>';
                                a_i_html += '<p class="atomq_a_p atomq_editable" contenteditable="true" data-placeh="Введите вариант ответа">' + quest.answers[j].text + '</p>';
                                a_i_html += '</div>';

                                break;

                            case 'img_3':

                                a_i_html += '<div class="atomq_a atomq_a_p_s" data-index=' + j + '>';
                                a_i_html += '<div class="atomq_delete"></div>';
                                a_i_html += '<div class="atom_a_i_w">';
                                a_i_html +='<div class="atom_a_i_ww atomq_editable" data-up-type="q_ans_3">';
                                a_i_html += '<img class="atom_a_i" src="' + quest.answers[j].img + '">';                            
                                //a_i_html += '<div class="atom_a_i atomq_editable" data-up-type="q_ans_3" style="background-image:url(' + quest.answers[j].img + '?v=' + cache_rev + ')"></div>';
                                a_i_html += '</div>';
                                a_i_html += '</div>';
                                a_i_html += '<p class="atomq_a_p atomq_editable" contenteditable="true" data-placeh="Введите вариант ответа">' + quest.answers[j].text + '</p>';
                                a_i_html += '</div>';

                                break;

                            case 'text':

                                a_i_html += '<div class="atomq_a atomq_a_p_ot" data-index=' + j + '>';
                                a_i_html += '<div class="atomq_delete"></div>';
                                a_i_html += '<p class="atomq_a_p atomq_editable" contenteditable="true" data-placeh="Введите вариант ответа">' + quest.answers[j].text + '</p>';
                                a_i_html += '</div>';

                                break;

                            case 'textarea':

                                a_i_html += '<textarea class="atomq_a atomq_a_p_ta" placeholder="' + quest.answers[j].text + '"></textarea>';


                                break;

                            case 'check':

                                a_i_html += '<div class="atomq_a atomq_a_p_c" data-index=' + j + '>';
                                a_i_html += '<div class="atomq_delete"></div>';
                                a_i_html += '<p class="atomq_a_p atomq_editable" contenteditable="true" data-placeh="Введите вариант ответа">' + quest.answers[j].text + '</p>';
                                a_i_html += '</div>';

                                break;

                            case 'inputs':
                                a_i_html += '<div class="atomq_a atomq_a_p_i" data-index=' + j + '>';
                                a_i_html += '<div class="atomq_delete"></div>';
                                a_i_html += '<p class="atomq_a_p atomq_editable" contenteditable="true" data-placeh="Введите описание поля ввода">' + quest.answers[j].text + '</p>';

                                a_i_html += '<div class="atomq_input_wrap">';
                                a_i_html += '<input type="text" class="atomq_a_i" name="" placeholder="' + quest.answers[j].placeholder + '">';
                                a_i_html += '</div>';
                                a_i_html += '</div>';

                                break;

                            case 'dates':

                                a_i_html += '<div class="atomq_a atomq_a_p_dp" data-index=' + j + '>';
                                a_i_html += '<div class="atomq_delete"></div>';
                                a_i_html += '<p class="atomq_a_p atomq_editable" contenteditable="true" data-placeh="Введите описание поля ввода даты">' + quest.answers[j].text + '</p>';

                                a_i_html += '<div class="atomq_input_wrap">';
                                a_i_html += '<input type="text" class="atomq_a_dp" name="" placeholder="' + quest.answers[j].placeholder + '">';
                                a_i_html += '</div>';
                                a_i_html += '</div>';

                                break;

                            case 'range':

                                a_i_html += '<div class="atomq_a atomq_a_r" data-index=' + j + '>';
                                a_i_html += '<div class="atomq_delete"></div>';
                                a_i_html += '<p class="atomq_a_p atomq_editable" contenteditable="true" data-placeh="Введите описание ползунка">' + quest.answers[j].text + '</p>';

                                if (quest.answers[j].value.length > 1) {

                                    a_i_html += '<div class="atomq_a_rds" ';
                                    a_i_html += 'data-min="' + quest.answers[j].min + '" ';
                                    a_i_html += 'data-max="' + quest.answers[j].max + '" ';
                                    a_i_html += 'data-value-f="' + quest.answers[j].value[0] + '" ';
                                    a_i_html += 'data-value-s="' + quest.answers[j].value[1] + '" ';
                                    a_i_html += '>';
                                    a_i_html += '<div class="atom_r_t_s"></div>';
                                    a_i_html += '<div class="atom_r_t_f"></div>';
                                    a_i_html += '<div class="atom_r_p_pb"></div>';
                                    a_i_html += '<div class="aui-slider-handle aui-slider-handle-start"><div class="atomq_r_v atomq_r_v_s"></div></div>';
                                    a_i_html += '<div class="aui-slider-handle aui-slider-handle-end"><div class="atomq_r_v atomq_r_v_f"></div></div>';
                                    a_i_html += '</div>';

                                } else {

                                    a_i_html += '<div class="atomq_a_rss" ';
                                    a_i_html += 'data-min="' + quest.answers[j].min + '" ';
                                    a_i_html += 'data-max="' + quest.answers[j].max + '" ';
                                    a_i_html += 'data-value="' + quest.answers[j].value[0] + '" ';
                                    a_i_html += '>';
                                    a_i_html += '<div class="atom_r_t_s"></div>';
                                    a_i_html += '<div class="atom_r_t_f"></div>';
                                    a_i_html += '<div class="atom_r_p_pb"></div>';
                                    a_i_html += '<div class="aui-slider-handle"><div class="atomq_r_v"></div></div>';
                                    a_i_html += '</div>';

                                }

                                a_i_html += '</div>';

                                break;

                        }
                        // _m.qiuz_data.questions[i].answers

                    }

                    if (quest.can_miss == 1) {

                        a_i_html += '<div class="atomq_a atomq_a_p_c">';
                        a_i_html += '<div class="atomq_delete"></div>';
                        a_i_html += '<p class="atomq_a_p atomq_editable_cm" contenteditable="true" data-placeh="Пропустить вопрос, я не знаю ответа">' + quest.can_miss_text + '</p>';
                        a_i_html += '</div>';
                    }


                    switch (quest.type) {
                        case 'img_2':

                            a_i_html += '<div class="atomq_a atomq_a_p_t atomq_a_add">';
                            a_i_html += '<p class="atomq_a_p">Добавить вариант ответа</p>';
                            a_i_html += '</div>';

                            break;

                        case 'img_3':

                            a_i_html += '<div class="atomq_a atomq_a_p_s atomq_a_add">';
                            a_i_html += '<p class="atomq_a_p">Добавить вариант ответа</p>';
                            a_i_html += '</div>';

                            break;

                        case 'text':

                            a_i_html += '<div class="atomq_a atomq_a_p_ot atomq_a_add">';
                            a_i_html += '<p class="atomq_a_p">Добавить вариант ответа</p>';
                            a_i_html += '</div>';

                            break;

                        case 'textarea':

                            // a_i_html += '<textarea class="atomq_a atomq_a_p_ta" placeholder="' +quest.answers[0].text + '"></textarea>';


                            if (quest.can_miss != 1) {

                                a_i_html += '<div class="atomq_a atomq_a_p_c atomq_a_add atomq_a_can_miss">';
                                a_i_html += '<p class="atomq_a_p">Добавить возможность не отвечать</p>';
                                a_i_html += '</div>';
                            }
                            break;

                        case 'check':

                            a_i_html += '<div class="atomq_a atomq_a_p_c atomq_a_add">';
                            a_i_html += '<p class="atomq_a_p">Добавить вариант ответа</p>';
                            a_i_html += '</div>';

                            break;

                        case 'inputs':
                            a_i_html += '<div class="atomq_a atomq_a_p_i atomq_a_add">';
                            a_i_html += '<p class="atomq_a_p">Добавить поле ответа</p>';
                            a_i_html += '</div>';
                            if (quest.can_miss != 1) {

                                a_i_html += '<div class="atomq_a atomq_a_p_c atomq_a_add atomq_a_can_miss">';
                                a_i_html += '<p class="atomq_a_p">Добавить возможность не отвечать</p>';
                                a_i_html += '</div>';
                            }

                            break;

                        case 'dates':

                            a_i_html += '<div class="atomq_a atomq_a_p_i atomq_a_add">';
                            a_i_html += '<p class="atomq_a_p">Добавить поле даты</p>';
                            a_i_html += '</div>';

                            if (quest.can_miss != 1) {

                                a_i_html += '<div class="atomq_a atomq_a_p_c atomq_a_add atomq_a_can_miss">';
                                a_i_html += '<p class="atomq_a_p">Добавить возможность не отвечать</p>';
                                a_i_html += '</div>';
                            }

                            break;

                        case 'range':


                            a_i_html += '<div class="atomq_a atomq_a_p_i atomq_a_add atomq_a_half">';
                            a_i_html += '<p class="atomq_a_p">Добавить ползунок</p></p>';
                            a_i_html += '</div>';

                            a_i_html += '<div class="atomq_a atomq_a_p_i atomq_a_add atomq_a_half atomq_double">';
                            a_i_html += '<p class="atomq_a_p">Добавить двойной ползунок</p></p>';
                            a_i_html += '</div>';
                            if (quest.can_miss != 1) {

                                a_i_html += '<div class="atomq_a atomq_a_p_c atomq_a_add atomq_a_can_miss">';
                                a_i_html += '<p class="atomq_a_p">Добавить возможность не отвечать</p>';
                                a_i_html += '</div>';
                            }

                            break;

                    }
                    a_i_html += '</div>';
                    a_html += a_i_html;

                }
                
                $bd.find('.atomq_a_w').html(a_html);
                $bd.find('.atomq_q_t_w').html(q_html);
                $bd.find('.atomq_r_q_w').html(t_html);
                $bd.find('.atomq_l_r_w').removeClass('atomq_l_r_w_o_f');
                $bd.find('.atomq_l_r_w').find('.atomq_l_r_i_w').find('[contenteditable]').attr('contenteditable', 'true');
                //$bd.find('.atomq_l_r_w').find('.atomq_l_r_i_w').find('input,textarea').attr('disabled','true');
                $bd.find('.atomq_l_r_w').find('.atomq_l_r_i_w').find('input,textarea').removeAttr('disabled');
                $bd.find('.atomq_l_r_w').find('.atomq_l_r_f').find('[contenteditable]').attr('contenteditable', 'false');

                var cont = quiz_editor.view.view_ed_bd.find('.atomq_frm-part');
                if (cont.children('.quiz_editor_form_append').length > 0) {
                    cont.children('.quiz_editor_form_append').remove();
                }
                if (cont.children('.quiz_check_text').length == 0) {
                    cont.append('<div class="quiz_check_text">Оценка текстов вопроса по шкале Главреда - <span id="glvrd_quest"></span></div>');
                }                

                if(document.location.pathname.indexOf('edit_by_step')>-1){
                    
                    //quiz_editor.view.view_ed_wrap.find('iframe').height(quiz_editor.view.view_ed_bd.find('.atomq_pop-content').height());
                }

                quiz_editor.events.glvrd.rebind();
                cont.removeClass('form_open');
                if(document.location.pathname.indexOf('edit_by_step')>-1){

                    quiz_editor.view.view_ed_bd.find('.editor_close').attr('style','display:block!important');
                }
            }

        }else{
            $bd.find('.atomq_close').trigger('click');
        }

    },
    eq_render_form: function(id) {
        if(!if_defined(quiz_editor.view.view_ed_bd)){
                return;
        }
        var $bd = quiz_editor.view.view_ed_bd.find('.atomq_l_r_f');
        if(if_defined(quiz_editor.model.q_data)&&if_defined(quiz_editor.model.q_data.content)){

            var form;
            var cache_rev = quiz_editor.model.q_data.content.rev;
            if (!id) {
                id = quiz_editor.model.q_data.content.forms[0].id;
                form = quiz_editor.model.q_data.content.forms[0];
            } else {

                for (var i = quiz_editor.model.q_data.content.forms.length - 1; i >= 0; i--) {
                    if (quiz_editor.model.q_data.content.forms[i].id == id) {
                        form = quiz_editor.model.q_data.content.forms[i]

                    }
                }

            }
            var inputs = [];

            for(var key in form.inp){
                if (form.inp.hasOwnProperty(key)) {
                    var ind = inputs.length;
                    inputs[ind] = form.inp[key];
                    inputs[ind].name = key;
                    if (!if_defined(inputs[ind].num)) {

                        if (key == 'name') {
                            inputs[ind].num = 1;
                        }else if (key == 'phone') {

                            inputs[ind].num = 2;
                        }else if (key == 'email') {
                            inputs[ind].num = 3;

                        }
                    }
                }
            }

            inputs.sort(function(a, b) {
                var keyA = parseInt(a.num),
                    keyB = parseInt(b.num);
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });


            quiz_editor.view.view_ed_bd.find('.atomq_h_s').html(quiz_editor.model.q_data.content.title);
            var html = '<form method="post" data-id="' + id + '" target="#" class="atomq_l_r_f_r">';
            html += '<div class="atomq_l_r_f_r_g_w">';

            html += '<div class="atomq_l_r_f_r_g_i atomq_editable" data-up-type="q_gift"';
            html += ' style="background-image:url(' + form.g_img.replace('"','') + ')"></div>';
            html += '<div class="atomq_l_r_f_r_g_tw">';
            html += '<div class="atomq_l_r_f_r_g_h atomq_editable" contenteditable="true" data-placeh="Заголовок подарка">' + form.g_head + '</div>';
            html += '<div class="atomq_l_r_f_r_g_t atomq_editable" contenteditable="true" data-placeh="Введите описание подарка">' + form.g_text + '</div>';

            html += '</div>';
            html += '</div>';

            html += '<div class="atomq_l_r_f_r_h atomq_editable" contenteditable="true" data-placeh="Отлично, последний шаг">' + form.f_head + '</div>';
            html += '<div class="atomq_l_r_f_r_t atomq_editable" contenteditable="true" data-placeh="Мы отправим ваш расчет в ближайшее время, пожалуйста, заполните форму ниже">' + form.f_text + '</div>';


            
            html += '<div id="form_items_list">';

            for (var i = 0; i < inputs.length; i++) {

                if (inputs[i].name == 'name') {

                    html += '<div class="atomq_l_r_f_r_i_w atomq_l_r_f_r_i_w_name atomq_l_r_f_r_i_w_h atomq_on_of_input">';
                    html += '<input type="text" class="atomq_l_r_f_r_i" disabled="true"  placeholder="Ваше имя" name="name">';
                }else if (inputs[i].name == 'phone') {

                    html += '<div class="atomq_l_r_f_r_i_w atomq_l_r_f_r_i_w_phone atomq_l_r_f_r_i_w_h atomq_on_of_input">';
                    html += '<input type="text" class="atomq_l_r_f_r_i" disabled="true" placeholder="Ваш телефон" name="phone">';
                }else if (inputs[i].name == 'email') {

                    html += '<div class="atomq_l_r_f_r_i_w atomq_l_r_f_r_i_w_email atomq_l_r_f_r_i_w_h atomq_on_of_input">';
                    html += '<input type="text" class="atomq_l_r_f_r_i" disabled="true"  placeholder="Ваш email" name="email">';
                }

                if (inputs[i].on == 1) {

                    html += '<div class="trig active"></div>';
                } else {

                    html += '<div class="trig"></div>';
                }
                html += '</div>';
            }

            html += '</div>'

            html += '<div class="atomq_l_r_f_r_b atomq_editable" contenteditable="true" data-placeh="Получить результат" style="padding: 10px 5px;">' + form.f_btn + '</div>';
            html += '</form>';
            html += '<div class="atomq_l_r_f_l atomq_editable" data-up-type="q_fbg" style="background-image:url(' + form.bg.replace('"','') +  ')"></div>';
            //html += ''
            $bd.html(html);
            $bd.closest('.atomq_l_r_w').addClass('atomq_l_r_w_o_f');
            $bd.closest('.atomq_l_r_w').find('.atomq_l_r_i_w').find('[contenteditable]').attr('contenteditable', 'false');
            $bd.find('.atomq_l_r_w').find('.atomq_l_r_i_w').find('input,textarea').attr('disabled', 'true');
            //$bd.find('.atomq_l_r_w').find('.atomq_l_r_i_w').find('input,textarea').removeAttr('disabled');
            $bd.closest('.atomq_l_r_w').find('.atomq_l_r_f').find('[contenteditable]').attr('contenteditable', 'true');
            //this.show();
            //this.bind();
            $bd.find('form.atomq_l_r_f_r').unbind('submit');
            $bd.find('form.atomq_l_r_f_r').submit(function(e) {
                e.preventDefault();
                return false;
            });
            var cont = quiz_editor.view.view_ed_bd.find('.atomq_frm-part');
            if (cont.children('.quiz_editor_form_append').length == 0) {
                if (if_defined(form.appending) && form.appending =='off') {
                    cont.append('<div class="quiz_editor_form_append">Показывать клиенту сначала только одно поле <div class="trig"></div></div>');            
                }else{
                    cont.append('<div class="quiz_editor_form_append">Показывать клиенту сначала только одно поле <div class="trig active"></div></div>');            
                }
            }else{

                if (if_defined(form.appending) && form.appending =='off') {
                    cont.children('.quiz_editor_form_append').find('.trig').removeClass('active');
                }else{
                    cont.children('.quiz_editor_form_append').find('.trig').addClass('active');
                }
            }
            cont.addClass('form_open');

            if (cont.children('.quiz_check_text').length >0) {
                cont.children('.quiz_check_text').remove();
            }      

            if(document.location.pathname.indexOf('edit_by_step')>-1){

          
                quiz_editor.view.view_ed_bd.find('.editor_close').attr('style','display:none!important');
            }
        }else{
            $bd.find('.atomq_close').trigger('click');
        }

    },
    open_range_settings: function(options) {

        var $pop = quiz_editor.view.editor.find('#quiz_edit_range');

        $pop.attr('data-id', options.id);
        $pop.attr('data-index', options.index);

        $pop.find('input[name="min"]').val(options.min);
        $pop.find('input[name="max"]').val(options.max);

        if (options.value.length == 1) {

            $pop.find('input[name="value"][data-index="0"]').val(options.value[0]);
            $pop.find('p').find('span').hide();
            $pop.find('.inp-wrap').last().hide();
        } else {

            $pop.find('input[name="value"][data-index="0"]').val(options.value[0]);
            $pop.find('input[name="value"][data-index="1"]').val(options.value[1]);
            $pop.find('p').find('span').show();
            $pop.find('.inp-wrap').last().show();

        }

        $pop.arcticmodal({
            afterClose: function() {

                quiz_editor.view.eq_render_question($pop.attr('data-id'));
                quiz_editor.events.qe_rebind();
            }
        });


    },
    open_form_settings: function(id) {
        var $pop = quiz_editor.view.editor.find('#quiz_form_settings');
        $pop.attr('data-id', id);
        for (var i = quiz_editor.model.q_data.content.forms.length - 1; i >= 0; i--) {

            if (quiz_editor.model.q_data.content.forms[i].id == id) {

                $pop.find('textarea').val(quiz_editor.model.q_data.content.forms[i].aftersend);

                if (quiz_editor.model.q_data.content.forms[i].aftersend_file != 0) {

                    $pop.find('.trig').addClass('active');

                } else {

                    $pop.find('.trig').removeClass('active');

                }

            }

        }

        quiz_editor.view.view_ed_bd.on('keydown', quiz_editor.events.escape_keydown);
        $(document).on('keydown', quiz_editor.events.escape_keydown);

        $pop.arcticmodal({
            afterClose: function() {

                //quiz_editor.view.eq_render_question($pop.attr('data-id'));
                //quiz_editor.events.qe_rebind();
            }
        });
    },
    paste_data: function() {
        if(if_defined(quiz_editor)&& if_defined(quiz_editor.model.q_data)){

            quiz_editor.view.helper.find('.quiz_name').val(quiz_editor.model.q_data.name).trigger('blur');
    
            quiz_editor.view.render_forms();
            quiz_editor.view.render_questions();
            }

    },
    load_quiz_list: function(data, only_list) {

        var cur = {
            id: 'none',
            name: 'Выберите квиз'
        };
        var qi = getURLParameter('qi');
        var quiz_select = '<div class="quiz_list-select">';


        if(if_defined(data)){


            for (var i = data.length - 1; i >= 0; i--) {

                quiz_select += '<div class="quiz_list_item" data-id="' + data[i].quiz + '">' + data[i].name + '</div>';

                if (if_defined(qi) && qi == data[i].quiz) {
                    cur.id = data[i].quiz;
                    cur.name = data[i].name;
                }
                //else
                // if(if_defined(quiz_editor)&&if_defined(quiz_editor.model.q_data)&& quiz_editor.model.q_data.qid == data[i].quiz){
                //     cur.id = data[i].quiz;
                //     cur.name = data[i].name;

                // }

                if (!if_defined(qi)) {
                    cur.id = data[i].quiz;
                    cur.name = data[i].name;

                }
            }
        }

        // quiz_select += '<div class="quiz_list_item" data-id="new">Создать новый</div>';

        quiz_select += '</div>';


        var html = '<p class="field_title">Подключенный  квиз</p>';
        html += '<div class="quiz_list">';

        html += '<div class="quiz_list_item enabled" data-id="' + cur.id + '">' + cur.name + '</div>';

        html += quiz_select;

        html += '</div>';

        quiz_editor.view.list.html(html).show();
        quiz_editor.events.rebind_list();


        if (cur.id != 'none') {
            updateQueryStringParam('qi', cur.id);
            quiz_editor.controller.attach_quiz_to_page(cur.id, getURLParameter('i'));


            if (!only_list) {
                quiz_editor.model.defaul_init();
            }
        } else {
            quiz_editor.view.helper.find('#quiz_panel').hide();
        }
    },

    q_append_info_links:function($this){

            if ($this.children('span.atomq_info').length == 0) {

                $this.append('<span class="atomq_info" contenteditable="false">?</span>');
                $this.find('span.atomq_info').unbind('click mouseenter mouseleave');
                $this.find('span.atomq_info').click(function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if ($(this).parent().is(':focus')) {
                        $(this).parent().blur();

                    }
                    quiz_editor.view.open_help_from_el($(this));
                    // open_from_url('/how_to?i=convert_video&v=inst');
                });;
                $this.find('span.atomq_info').mouseenter(function(e) {
                    $(this).parent().attr('contenteditable','false');
                    // open_from_url('/how_to?i=convert_video&v=inst');
                });;
                $this.find('span.atomq_info').mouseleave(function(e) {
                    $(this).parent().attr('contenteditable','true');
                    // open_from_url('/how_to?i=convert_video&v=inst');
                });;
            }
    },
    make_placeholders:function(){
            if(!if_defined(quiz_editor.view.view_ed_bd)){
                    return;
            }
        quiz_editor.view.view_ed_bd.find('[contenteditable]').each(function(index, el) {
            var $clone = $(this).clone();
            $clone.find('span').remove();
            
            var text = $clone.text();
            $clone.remove();

            if (text == '' || $(this).text().length == 0) {
                
                $(this).append('<span class="placeh" contenteditable="true">'+$(this).attr('data-placeh')+'</span>');
                // if(document.location.pathname.indexOf('edit_by_step')>-1){
                //     $(this).find('.atomq_info').show();
                // }
                quiz_editor.view.q_append_info_links($(this));
            }
        });
    },
    glvrd:{
        wrap:false,
        show_desc:function(ind){
            var $o_wrp = this.wrap.find('.g_wrp');
            var frag = quiz_editor.model.glvrd.cur_res.fragments;
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