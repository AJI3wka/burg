;

'use strict';

console.log('quiz_editor.model start');

var quiz_editor = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

quiz_editor.model = {
    connect_flag: false,
    qe_selectors: [{

        selector: 'input.atomq_a_i',
        type: 'input',
        arr: [{
            part: 'answer',
            key: 'placeholder'
        }]
    }, {

        selector: 'input.atomq_a_dp',
        type: 'input',
        arr: [{
            part: 'answer',
            key: 'placeholder'
        }]
    }, {

        selector: '.atomq_a.atomq_a_p_ta',
        type: 'input',
        arr: [{
            part: 'answer',
            key: 'text'
        }]
    }, {
        selector: '.atomq_a_p.atomq_editable_cm',
        type: 'node',
        arr: [{
            part: 'question',
            key: 'can_miss_text'

        }]
    }, {

        selector: '.atomq_a_p.atomq_editable',
        type: 'node',
        arr: [{
            part: 'answer',
            key: 'text'

        }]
    }, {

        selector: '.atomq_a_p.atomq_editable',
        type: 'node',
        arr: [{
            part: 'answer',
            key: 'text'

        }]
    }, {
        selector: '.atom_a_i_ww.atomq_editable',
        type: 'img_in',
        arr: [{
            part: 'answer',
            key: 'img'
        }]
    }, {
        selector: '.atomq_l_r_f_r_g_i.atomq_editable',
        type: 'img_ans',
        arr: [{
            part: 'form',
            key: 'g_img'
        }]
    }, {
        selector: '.atomq_l_r_f_l.atomq_editable',
        type: 'img_ans',
        arr: [{
            part: 'form',
            key: 'bg'
        }]
    }, {
        selector: '.atomq_l_r_f_r_g_h.atomq_editable',
        type: 'node',
        arr: [{
            part: 'form',
            key: 'g_head'
        }]
    }, {
        selector: '.atomq_l_r_f_r_g_t.atomq_editable',
        type: 'node',
        arr: [{
            part: 'form',
            key: 'g_text'
        }]
    }, {
        selector: '.atomq_l_r_f_r_h.atomq_editable',
        type: 'node',
        arr: [{
            part: 'form',
            key: 'f_head'
        }]
    }, {
        selector: '.atomq_l_r_f_r_t.atomq_editable',
        type: 'node',
        arr: [{
            part: 'form',
            key: 'f_text'
        }]
    }, {
        selector: '.atomq_l_r_f_r_b.atomq_editable',
        type: 'node',
        arr: [{
            part: 'form',
            key: 'f_btn'
        }]
    }, {

        selector: '.atomq_h_s.atomq_editable',
        type: 'node',
        arr: [{
            // 	part:'main',
            // 	key:'name'	

            // },{
            part: 'content',
            key: 'title'
        }]
    }, {

        selector: '.atomq_r_t_n.atomq_editable',
        type: 'node',
        arr: [{
            part: 'content',
            key: 'p_name'
        }]

    }, {

        selector: '.atomq_r_t_p.atomq_editable',
        type: 'node',
        arr: [{
            part: 'content',
            key: 'p_status'
        }]

    }, {
        selector: '.atomq_q_t.atomq_editable',
        type: 'node',
        arr: [{
            part: 'question',
            key: 'question'
        }]
    }, {
        selector: '.atomq_r_q.atomq_editable',
        type: 'node',
        arr: [{
            part: 'question',
            key: 'text'
        }]
    }, {
        selector: '.atomq_r_t_i_w.atomq_editable',
        type: 'img_in',
        arr: [{
            part: 'content',
            key: 'p_image'
        }]
    }, {
        selector: '.atom_r_b_l_i_w.atomq_editable',
        type: 'img_in',
        arr: [{
            part: 'content',
            key: 'logo'
        }]
    }],

    def_data: {
        name: 'Новый квиз',
        title: '',
        logo: '//cdn.dnk.bz/quiz/core/img/q_logo.png',
        p_image: '//cdn.dnk.bz/quiz/core/img/q_man.jpg',
        p_name: '',
        p_status: '',
        rev: '0',
        content: {
            // questions: [{
            //     id: '11',
            //     numb: '10',
            //     hidden: '0',
            //     question: 'Виберите диапазоны',
            //     text: 'Тект ради текста А минимализм влияющист ради текста А минимализм влияющим фактором будет материал и качество отделки фасадов, а так же количество встроенной техники.',
            //     type: 'range',
            //     can_miss: '1',
            //     can_miss_text: 'Я не заню ответа',
            //     answers: [{
            //         text: 'Укажите желаемое количество',
            //         min: 0,
            //         max: 5,
            //         value: [3]
            //     }, {
            //         text: 'Укажите диапазон цен',
            //         min: 200,
            //         max: 1000000,
            //         value: [240, 120000]
            //     }]
            // }],
            forms: [{
                id: '1',
                bg: '//cdn.dnk.bz/quiz/core/img/q_f_bg.png',
                g_img: '//cdn.dnk.bz/quiz/core/img/q_gift.png',
                g_head: '',
                g_text: '',
                f_head: '',
                f_text: '',
                f_btn: '',
                aftersend: 'Спасибо за заявку, наш менеджер свяжется с Вами в ближайшее время',
                aftersend_file: 0,
                inp: {
                    name: {
                        on: 1
                    },

                    phone: {
                        on: 1
                    },

                    email: {
                        on: 1
                    }
                }
            }]
        },
        ans_by_type: {
            img_2: {
                text: '',
                img: '//cdn.dnk.bz/quiz/core/img/q_a_i.jpg'
            },
            img_3: {
                text: '',
                img: '//cdn.dnk.bz/quiz/core/img/q_a_i.jpg'
            },
            text: {
                text: '',
            },
            check: {
                text: '',
            },
            textarea: {
                text: '',
            },
            inputs: {
                text: '',
                placeholder: 'Введите подсказку на поле',
            },
            dates: {
                text: '',
                placeholder: 'Введите подсказку на поле',
            },
            range: {
                text: '',
                min: 0,
                max: 5,
                value: [3]
            }
        },
        quest_by_type: {
            img_2: {
                question: '',
                text: '',
                type: 'img_2',
                answers: []
            },
            img_3: {
                question: '',
                text: '',
                type: 'img_3',
                answers: []
            },
            text: {
                question: '',
                text: '',
                type: 'text',
                answers: []
            },
            check: {
                question: '',
                text: '',
                type: 'check',
                answers: []
            },
            textarea: {
                question: '',
                text: '',
                type: 'textarea',
                can_miss: '0',
                can_miss_text: '',
                answers: [{
                    text: 'Введите подсказку для заполнения здесь',
                }]
            },
            inputs: {
                question: '',
                text: '',
                type: 'inputs',
                can_miss: '0',
                can_miss_text: '',
                answers: []
            },
            dates: {
                question: '',
                text: '',
                type: 'dates',
                can_miss: '0',
                can_miss_text: '',
                answers: []
            },
            range: {
                question: '',
                text: '',
                type: 'range',
                can_miss: '0',
                can_miss_text: '',
                answers: []
            }
        }
    },
    input_arr: [{
        arr: [{
            part: 'main',
            key: 'name'
                // },{
                //     part:'content',
                //     key:'title'        
        }],
        selector: 'input.quiz_name',
        default: 'Новый квиз',
        view_part: 'helper'
    }],
    paste_data: function() {


    },

    update_data: function($elem) {
        var callback = function(){};
        if ($elem.is('input') || $elem.is('textarea')) {
            for (var i = quiz_editor.model.input_arr.length - 1; i >= 0; i--) {

                if ($elem.is(quiz_editor.model.input_arr[i].selector)) {

                    for (var j = quiz_editor.model.input_arr[i].arr.length - 1; j >= 0; j--) {

                        if (quiz_editor.model.input_arr[i].arr[j].part == 'main') {
                            if (if_defined(!quiz_editor.model.q_data)) {
                                quiz_editor.model.q_data = {};
                            }

                            quiz_editor.model.q_data[quiz_editor.model.input_arr[i].arr[j].key] = $elem.val();
                            if (quiz_editor.model.input_arr[i].arr[j].key == 'name') {
                                if (document.location.pathname.indexOf('quiz') == -1&&$elem.val()!=$elem.attr('data-last-pushed')) {
                                   callback = function(){
                                        quiz_editor.model.update_def_page_name($elem.val());
                                   } 
                                }else{

                                    if (document.location.pathname.indexOf('quiz')>-1&&$elem.val()!=$elem.attr('data-last-pushed'))  {
                                        if(if_defined(quiz_editor.model.q_data.content.default_page)){

                                           callback = function(){
                                                quiz_editor.model.update_def_page_name($elem.val());
                                           } 

                                        }else{
                                            if (if_defined(getURLParameter('i'))&&$elem.val()!=$elem.attr('data-last-pushed')) {
                                                
                                                if (getURLParameter('i').length>5) {
                                                    quiz_editor.model.q_data.content.default_page = getURLParameter('i');

                                                    callback = function(){
                                                        quiz_editor.model.update_def_page_name($elem.val());
                                                    } 
                                                }
                                            }

                                        }
                                    }
                                }
                            }

                        }
                        if (quiz_editor.model.input_arr[i].arr[j].part == 'content') {

                            if (if_defined(!quiz_editor.model.q_data)) {
                                quiz_editor.model.q_data = {};
                            }
                            if (if_defined(!quiz_editor.model.q_data.content)) {
                                quiz_editor.model.q_data.content = {};
                            }
                            quiz_editor.model.q_data.content[quiz_editor.model.input_arr[i].arr[j].key] = $elem.val();
                        }
                    }
                }
            }
        }
        quiz_editor.model.save(callback);
    },
    save: function(callback, no_bg) {

        if (if_defined(!quiz_editor.model.q_data)) {
            quiz_editor.model.q_data = {};
        }
        if (if_defined(!quiz_editor.model.q_data.content)) {
            quiz_editor.model.q_data.content = {};
        }
        var data = quiz_editor.model.q_data;
        data.content.rev = new Date().getTime();
        quiz_editor.controller.save(data, callback, no_bg);
        //quiz_edit.model.load_quiz(quiz_editor.model.q_data.content);

    },
    form_data: function(new_o) {
        if (!new_o) {
            new_o = {
                content: {}
            };
        }

        console.log('new_o.content = ', new_o.content);
        if (!if_defined(new_o.content.forms) || new_o.content.forms.length < 1) {
            new_o.content.forms = [];
            new_o.content.forms[0] = Object.assign({},quiz_editor.model.def_data.content.forms[0]);
        }

        if (!if_defined(new_o.content.questions)) {
            new_o.content.questions = [];
            //new_o.content.forms[0] = quiz_editor.model.def_data.content.forms[0];
        }

        if (!if_defined(new_o.content.title)) {
            new_o.content.title = quiz_editor.model.def_data.title;
        }

        if (!if_defined(new_o.content.p_image)) {
            new_o.content.p_image = quiz_editor.model.def_data.p_image;
        }

        if (!if_defined(new_o.content.p_name)) {
            new_o.content.p_name = quiz_editor.model.def_data.p_name;
        }
        if (!if_defined(new_o.content.p_name)) {
            new_o.content.rev = quiz_editor.model.def_data.rev;
        }

        if (!if_defined(new_o.content.p_status)) {
            new_o.content.p_status = quiz_editor.model.def_data.p_status;
        }


        if (!if_defined(new_o.content.logo)) {
            new_o.content.logo = quiz_editor.model.def_data.logo;
        }

        if (!if_defined(new_o.name)) {

            new_o.name = quiz_editor.model.def_data.name;
        }

        quiz_editor.model.q_data = new_o;
    },
    load_data_by_id: function(id) {

        function make_obj(data){
            quiz_editor.model.q_data = {};
            var cache = {data:{}};
            if(if_defined(data)&&if_defined(data.data)){
                cache = data.data;
            }
            var new_o = {};
            new_o.qid = cache.id;
            new_o.name = cache.name;
            if(typeof cache.data !== 'object'){
                cache.content = JSON.parse(cache.data);

            }else{
                cache.content = cache.data;
            }


            console.log('FIRSTPARSE', typeof cache.content == 'string', typeof cache.content);
            if (typeof cache.content == 'string') {
                new_o.content = JSON.parse(cache.content);
                console.log('SECOND PARSE');
            } else {
                new_o.content = cache.content;
                console.log('WTF', new_o.content, cache.content);
            }

            quiz_editor.model.form_data(new_o);


            console.log('quiz_editor.model.q_data = ', quiz_editor.model.q_data);
            // quiz_editor.model.q_data.content = quiz_editor.model.q_data.data;
            //quiz_edit.model.load_quiz(quiz_editor.model.q_data.content);
        }


        function quiz_ready(){

            if(typeof quiz_edit != 'undefined' && if_defined(quiz_edit)){

                quiz_edit.model.quiz_ready = true;
                if(if_defined(quiz_edit.model.site_ready) && quiz_edit.model.site_ready!='false'){
                    quiz_edit.model.editor_ready = true;
                    quiz_edit.view.wrap.find('.hard_request').fadeOut(350);;
                }
            }
            if(typeof step_ed_q != 'undefined' && if_defined(step_ed_q) && document.location.pathname.indexOf('edit_by_step') >-1){
                step_ed_q.model.editor_ready();
            }


            if (getURLParameter('cropper')&&$('#one_cropper').find('canvas').length>0) {
                $('#one_cropper').addClass('opened');
            }else{
                removeURLparameter('cropper');
            }


            quiz_editor.model.glvrd.init();

        }

        if(if_defined(id)){

        
            quiz_editor.controller.get_quiz(id, function(data) {

                make_obj(data);
                
                quiz_editor.view.paste_data();

                quiz_ready();


            });
        }else{

            make_obj();
            
            quiz_editor.view.paste_data();

            quiz_ready();
        }
    },
    create_question: function(type) {
        console.log('quiz_editor.model.def_data.quest_by_type[type] = ', type, quiz_editor.model.def_data.quest_by_type[type])
        var new_quest = Object.assign({}, quiz_editor.model.def_data.quest_by_type[type]);
        var count = quiz_editor.model.q_data.content.questions.length;

        var id = new Date().getTime();
        new_quest.id = id;
        new_quest.num = count + 1;
        quiz_editor.model.q_data.content.questions[count] = new_quest;

        if(document.location.pathname.indexOf('edit_by_step')>-1){
            if(typeof step_ed_q != 'undefined'){
                step_ed_q.view.make_progress_bar();
            }
        }

        quiz_editor.model.save();
        quiz_editor.model.run_edit_question_or_form(id);

    },
    update_quest_num: function() {
        quiz_editor.view.editor.find('#quest_items_wrap').children().each(function(index, el) {
            var id = $(this).attr('data-id');
            var num = $(this).find('.num').text();
            for (var i = quiz_editor.model.q_data.content.questions.length - 1; i >= 0; i--) {
                if (quiz_editor.model.q_data.content.questions[i].id == id) {
                    quiz_editor.model.q_data.content.questions[i].num = num
                }
            }

        });
        quiz_editor.model.save();
    },
    delete_question: function(id) {
        var index = 0;
        for (var i = quiz_editor.model.q_data.content.questions.length - 1; i >= 0; i--) {
            if (quiz_editor.model.q_data.content.questions[i].id == id) {
                index = i;
            }
        }
        quiz_editor.model.q_data.content.questions.splice(index, 1);
        
        if(document.location.pathname.indexOf('edit_by_step')>-1){
            if(typeof step_ed_q != 'undefined'){
                step_ed_q.view.make_progress_bar();
            }
        }
        quiz_editor.view.render_questions();
        quiz_editor.view.update_quest_num();
        quiz_editor.model.update_quest_num();
        quiz_editor.model.save();
    },
    hide_question: function(id) {
        var index = 0;
        for (var i = quiz_editor.model.q_data.content.questions.length - 1; i >= 0; i--) {
            if (quiz_editor.model.q_data.content.questions[i].id == id) {
                quiz_editor.model.q_data.content.questions[i].hidden = 1;
            }
        }
        // quiz_editor.view.render_questions();
        // quiz_editor.view.update_quest_num();
        // quiz_editor.model.update_quest_num();
        quiz_editor.model.save();
    },
    unhide_question: function(id) {
        var index = 0;
        for (var i = quiz_editor.model.q_data.content.questions.length - 1; i >= 0; i--) {
            if (quiz_editor.model.q_data.content.questions[i].id == id) {
                quiz_editor.model.q_data.content.questions[i].hidden = 0;
            }
        }
        // quiz_editor.view.render_questions();
        // quiz_editor.view.update_quest_num();
        // quiz_editor.model.update_quest_num();
        quiz_editor.model.save();
    },
    init_view_editor: function() {

        function ready() {
            var $iframe = quiz_editor.view.view_ed_wrap.find('iframe');
            quiz_editor.view.view_ed_bd = $iframe.contents().find('body');
            quiz_editor.view.view_ed_window = $iframe[0].contentWindow;


            if(document.location.pathname.indexOf('edit_by_step')>-1){
                quiz_editor.view.view_ed_bd.addClass('inner');
                var $close = quiz_editor.view.view_ed_bd.find('.atomq_close');
    //             $close.css({

    // 'box-shadow': '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)',
    // 'border-radius': '2px',
    // 'display': 'block!important',
    // 'background-image': 'none',
    // 'height': '36px',
    // 'color': '#fff',
    // 'background-color': '#2196F3',
    // 'text-align': 'center',
    // 'letter-spacing': ' .5px',
    // 'cursor': ' pointer',
    // 'margin-top': ' 10px',
    // 'margin-right': ' 10px',
    // 'width': 'initial',
    // 'padding':'0 16px',
    // 'font-size':'14px',
    // 'line-height':'36px',
    // 'text-transform':'uppercase',

    //             }).html('Готово');
                $close.html('К вопросам<span></span>').addClass('editor_close');
                //quiz_editor.view.view_ed_wrap.find('iframe').height(quiz_editor.view.view_ed_bd.find('.atomq_pop-content').height());
            }

            quiz_editor.view.view_ed_bd.find('.atomq_close').unbind('click');
            quiz_editor.view.view_ed_bd.find('.atomq_close').click(function() {
                removeURLparameter('quest');
                removeURLparameter('form');

                    if(document.location.pathname.indexOf('edit_by_step')>-1){
                        if(typeof step_faq !='undefined'){
                            step_faq.model.staritng();
                        }
                    }
                quiz_editor.view.close_view_editor();
            });
            quiz_editor.view.view_ed_wrap.find('.close').unbind('click');
            quiz_editor.view.view_ed_wrap.find('.close').click(function() {
                removeURLparameter('quest');
                removeURLparameter('form');
                    if(document.location.pathname.indexOf('edit_by_step')>-1){
                        if(typeof step_faq !='undefined'){
                            step_faq.model.staritng();
                        }
                    }
                quiz_editor.view.close_view_editor();
            });

            if(getURLParameter('quest')||getURLParameter('form')){
                if(getURLParameter('form')){

                    quiz_editor.model.run_edit_question_or_form(getURLParameter('form'),true);
                }else{
                    quiz_editor.model.run_edit_question_or_form(getURLParameter('quest'))

                }
            }
            if(getURLParameter('types')){
                quiz_editor.view.open_select_type_question();

            }
        }

        if(document.location.pathname.indexOf('edit_by_step')>-1){

            $('#steps_prewiev').html('<div class="wrap"><iframe frameborder="0"></iframe></div></div>');
        
            quiz_editor.view.view_ed_wrap = $('#steps_prewiev');
        }else{

            $('.overlay-wrap').html('<div class="view_edit_window"><div class="overlay"></div><div class="close">Готово</div><div class="wrap"><iframe frameborder="0"></iframe></div></div>');

            quiz_editor.view.view_ed_wrap = $('.view_edit_window');
        }



        var $frame = quiz_editor.view.view_ed_wrap.find('iframe')
        var needed_src = source_url + '/frame/quiz_template/template.php';



        if ($frame.length > 0 && $frame.attr('src') == needed_src) {

            ready();

        } else {

            $frame = quiz_editor.view.view_ed_wrap.find('iframe');
            $frame.unbind('load');

            $frame.bind('load', function() {
                ready();
            });
            if ($frame.attr('src') != needed_src) {

                $frame.attr('src', needed_src);

            } else {
                ready();
            }

        }
    },
    qe_update: function($elem) {

        var val;
        for (var i = quiz_editor.model.qe_selectors.length - 1; i >= 0; i--) {
            if ($elem.is(quiz_editor.model.qe_selectors[i].selector)) {
                if (quiz_editor.model.qe_selectors[i].type == 'node') {
                    
                    var node_content = $elem.html()//convert string to JQuery element
                    //node_content.find("span").remove();//remove span elements
                    val = $elem.text();
                    if(node_content.indexOf('<span')>-1){
                        val = val.slice(0, -1);
                    }
                    //val = $elem.text();
                } else if (quiz_editor.model.qe_selectors[i].type == 'img_in') {
                    val = $elem.find('img').attr('src');
                    var path = $elem.getPath().split('body>')[1];
                    quiz_editor.view.view_ed_bd.find(path).find('img').attr('src',val);

                } else if (quiz_editor.model.qe_selectors[i].type == 'img_ans') {
                    val = $elem.css('background-image').replace(' ','').replace('url(','').replace(')','').replace('"','').replace("'",'').replace('http:','').replace('https:','')
                    console.log('val = ', val);
                    var path = $elem.getPath().split('body>')[1];
                    quiz_editor.view.view_ed_bd.find(path).css('background-image','url('+val+')');
                    
                } else if (quiz_editor.model.qe_selectors[i].type == 'input') {
                    val = $elem.attr('placeholder');
                    console.log('val = ', val);
                }  
                if(if_defined(val)){


                    for (var j = quiz_editor.model.qe_selectors[i].arr.length - 1; j >= 0; j--) {

                        if (quiz_editor.model.qe_selectors[i].arr[j].part == 'main') {

                            quiz_editor.model.q_data[quiz_editor.model.qe_selectors[i].arr[j].key] = val;

                        } else if (quiz_editor.model.qe_selectors[i].arr[j].part == 'content') {
                            quiz_editor.model.q_data.content[quiz_editor.model.qe_selectors[i].arr[j].key] = val;
                            console.log(quiz_editor.model.q_data.content[quiz_editor.model.qe_selectors[i].arr[j].key])


                        } else if (quiz_editor.model.qe_selectors[i].arr[j].part == 'question') {
                            var id = $elem.attr('data-id');

                            if ($elem.is('.atomq_editable_cm')) {
                                id = $elem.closest('.atomq_a_l').attr('data-id')
                            }

                            for (var k = quiz_editor.model.q_data.content.questions.length - 1; k >= 0; k--) {
                                if (quiz_editor.model.q_data.content.questions[k].id == id) {
                                    quiz_editor.model.q_data.content.questions[k][quiz_editor.model.qe_selectors[i].arr[j].key] = val;
                                }
                            }

                        } else if (quiz_editor.model.qe_selectors[i].arr[j].part == 'answer') {
                            var id = $elem.closest('.atomq_a_l').attr('data-id');
                            var index = $elem.closest('.atomq_a').attr('data-index');
                            if ($elem.is('textarea')) {
                                index = 0;
                            }
                            console.log('val = ', val);
                            for (var k = quiz_editor.model.q_data.content.questions.length - 1; k >= 0; k--) {
                                if (quiz_editor.model.q_data.content.questions[k].id == id) {
                                    console.log('quiz_editor.model.q_data.content.questions[k] = ', quiz_editor.model.q_data.content.questions[k]);
                                    quiz_editor.model.q_data.content.questions[k].answers[index][quiz_editor.model.qe_selectors[i].arr[j].key] = val;
                                }
                            }


                        } else if (quiz_editor.model.qe_selectors[i].arr[j].part == 'form') {
                            var id = $elem.closest('.atomq_l_r_f').find('form').attr('data-id');

                            for (var k = quiz_editor.model.q_data.content.forms.length - 1; k >= 0; k--) {
                                if (quiz_editor.model.q_data.content.forms[k].id == id) {
                                    quiz_editor.model.q_data.content.forms[k][quiz_editor.model.qe_selectors[i].arr[j].key] = val;
                                }
                            }


                        }
                    }

                }                
            }
        }
        quiz_editor.model.save();

    },
    qe_add_answer: function($elem) {
        var type = $elem.closest('.atomq_a_l').attr('data-type');
        var id = $elem.closest('.atomq_a_l').attr('data-id');
        var new_ans = Object.assign({}, quiz_editor.model.def_data.ans_by_type[type]);

        if (type == 'range' && $elem.is('.atomq_double')) {
            new_ans.value = [2, 4];
        }

        for (var i = quiz_editor.model.q_data.content.questions.length - 1; i >= 0; i--) {
            if (quiz_editor.model.q_data.content.questions[i].id == id) {


                var count = quiz_editor.model.q_data.content.questions[i].answers.length;
                // new_quest.id = new Date().getTime();
                // new_quest.num = count+1;
                quiz_editor.model.q_data.content.questions[i].answers[count] = new_ans;

            }
        }

        quiz_editor.view.eq_render_question(id);
        setTimeout(function(){quiz_editor.events.qe_rebind();quiz_editor.view.make_placeholders();},100);
        
        quiz_editor.model.save();

    },
    qe_delete_answer: function($elem) {
        var id = $elem.closest('.atomq_a_l').attr('data-id');
        var index = $elem.closest('.atomq_a').attr('data-index');


        for (var i = quiz_editor.model.q_data.content.questions.length - 1; i >= 0; i--) {
            if (quiz_editor.model.q_data.content.questions[i].id == id) {


                quiz_editor.model.q_data.content.questions[i].answers.splice(index, 1);

            }
        }



        quiz_editor.view.eq_render_question(id);
        // quiz_editor.events.qe_rebind();
        setTimeout(function(){quiz_editor.events.qe_rebind();quiz_editor.view.make_placeholders();},100);
        quiz_editor.model.save();

    },
    qe_remove_can_miss: function($elem) {
        var id = $elem.closest('.atomq_a_l').attr('data-id');
        for (var i = quiz_editor.model.q_data.content.questions.length - 1; i >= 0; i--) {
            if (quiz_editor.model.q_data.content.questions[i].id == id) {


                quiz_editor.model.q_data.content.questions[i].can_miss = 0;

            }
        }



        quiz_editor.view.eq_render_question(id);
        // quiz_editor.events.qe_rebind();
        setTimeout(function(){quiz_editor.events.qe_rebind();quiz_editor.view.make_placeholders();},100);
        quiz_editor.model.save();

    },
    qe_add_can_miss: function($elem) {

        var id = $elem.closest('.atomq_a_l').attr('data-id');
        for (var i = quiz_editor.model.q_data.content.questions.length - 1; i >= 0; i--) {
            if (quiz_editor.model.q_data.content.questions[i].id == id) {


                quiz_editor.model.q_data.content.questions[i].can_miss = 1;

            }
        }


        quiz_editor.view.eq_render_question(id);
        // quiz_editor.events.qe_rebind();
        setTimeout(function(){quiz_editor.events.qe_rebind();quiz_editor.view.make_placeholders();},100);
        quiz_editor.model.save();

    },
    range_settings: function($elem) {
        var value;
        if ($elem.attr('data-value')) {
            value = [parseInt($elem.attr('data-value'))]
        } else {
            value = [parseInt($elem.attr('data-value-f')), parseInt($elem.attr('data-value-s'))]
        }
        var options = {
            id: $elem.closest('.atomq_a_l').attr('data-id'),
            index: $elem.closest('.atomq_a_r').attr('data-index'),
            value: value,
            min: $elem.attr('data-min'),
            max: $elem.attr('data-max')
        }
        quiz_editor.view.open_range_settings(options)

    },
    defaul_init: function() {


        var id = getURLParameter('qi');
        var page_id = getURLParameter('i');

        if (!id) {
            open_part('404', true);
        } else {
            if (id == 'new') {

                // lp1_edit.view.insert_edit_frame(function(){

                //        lp1_edit.view.paste_values();//вставить полученные данные в редактор указанного типа

                //        lp1_edit.view.init_steps_slider();

                // });
                quiz_editor.model.form_data();
                quiz_editor.view.paste_data();
                quiz_editor.model.save();

            } else {
                // lp1_edit.view.wrap.find('.reqired_inp').removeClass('reqired_inp');

            if (if_defined(page_id)&&document.location.pathname.indexOf('quiz')>-1) {


                //quiz_edit.model.init_edit_by_id(id,page_id);
                quiz_editor.model.load_data_by_id(id,page_id);
            }else{

                quiz_editor.model.load_data_by_id(id);
            }  
            }
        }


        quiz_editor.events.rebind();

        quiz_editor.model.init_view_editor();
    },
    timer_to_run_edit:false,
    run_step_faq_main:function(id){


        // var inst_id = 'quest_type_steps';

        // for (var i = 0; i < quiz_editor.model.q_data.content.questions.length; i++) {
        //     if(quiz_editor.model.q_data.content.questions[i].id== id){
        //         var type = quiz_editor.model.q_data.content.questions[i].type;
        //         //alert(type);
        //         if(type == 'img_2'){
        //             inst_id = 'step_q_2_img';
        //         }else 
        //         if(type == 'img_3'){
        //             inst_id = 'step_q_3_img';
        //         }else 
        //         if(type == 'text'){
        //             inst_id = 'step_q_text';
        //         }else 
        //         if(type == 'check'){
        //             inst_id = 'step_q_check';
        //         }else 
        //         if(type == 'textarea'){
        //             inst_id = 'step_q_textarea';
        //         }else 
        //         if(type == 'inputs'){
        //             inst_id = 'step_q_inputs';
        //         }else 
        //         if(type == 'dates'){
        //             inst_id = 'step_q_dates';
        //         }else 
        //         if(type == 'range'){
        //             inst_id = 'step_q_range';
        //         }                
        //     }
        // }

        // if(typeof  step_faq != 'undefined' && if_defined(step_faq)){

        //     if(quiz_editor.model.q_data.content.questions.length == 0){
        //         step_faq.model.open_faq(inst_id);
        //     }else{
        //         step_faq.model.open_faq(inst_id,true);

        //     }
        // }
    },
    run_edit_question_or_form: function(id, form) {
        var recurs = function(){
            if(if_defined(quiz_editor)&&if_defined(quiz_editor.model.q_data)&&if_defined(quiz_editor.model.q_data.content)){

                if (form) {
                    // quiz_editor.view.eq_paste_static();
                    // quiz_editor.view.eq_render_progress(id);
                    quiz_editor.view.eq_render_form(id);
                    updateQueryStringParam('form',id);

                } else {

                    quiz_editor.view.eq_paste_static();
                    quiz_editor.view.eq_render_progress(id);
                    quiz_editor.view.eq_render_question(id);


       

                    updateQueryStringParam('quest',id);

                    if(document.location.pathname.indexOf('edit_by_step')>-1){
                        quiz_editor.view.editor.hide();
                                
                        quiz_editor.view.editor.find('.quest_part').find('.list').hide();
                        quiz_editor.view.editor.find('.quest_part').find('.add-btn').hide();

                        //quiz_editor.model.run_step_faq_main(id);
                        if(typeof step_faq !='undefined'){
                            step_faq.model.staritng();
                        }

                    }          
                }

                setTimeout(function(){quiz_editor.events.qe_rebind();quiz_editor.view.make_placeholders();},100);
                // quiz_editor.events.qe_rebind();

                
                quiz_editor.view.view_ed_wrap.show();      


                if(if_defined(quiz_editor.view.view_ed_bd)){

                    quiz_editor.view.view_ed_bd.on('keydown', quiz_editor.events.escape_keydown);
                }
                $(document).on('keydown', quiz_editor.events.escape_keydown);
            }else{
                if(quiz_editor.view.timer_to_run_edit){
                    clearTimeout(quiz_editor.view.timer_to_run_edit);
                }
                quiz_editor.view.timer_to_run_edit = setTimeout(function(){

                    recurs();

                },300);
            }
        }   
        recurs();
    },
    update_def_page_name: function(name) {


        var callback = function(){


            quiz_editor.model.load_quiz_list(true);
        }
        var url = quiz_editor.controller.api_url + 'Page'; //url запроса получения контента

        //var callback = function () {
        //}


        if (if_defined(quiz_editor.model.q_data.content.default_page)) {

            get_json('get', url, {
                siteID: quiz_editor.model.q_data.content.default_page
            }, function(data) { //удачное выполнение гет запроса

                console.log('getted_data = ', data);
                var send_data = data.data;
                send_data.name = name;



                var url = quiz_editor.controller.api_url + 'PageQUIZ/save';

                // var connect_new = false;

                // if (!if_defined(quiz_editor) && !if_defined(quiz_edit.model.cur_data.id) || quiz_editor.model.connect_flag == false && !if_defined(quiz_edit.model.cur_data.id)) {

                //     if(if_defined(quiz_editor)){
                //         quiz_editor.model.save();
                //     }
                //     // quiz_editor.model.save();

                //     if (callback) {
                //         callback()
                //     }
                //     return false;
                // }else if(quiz_editor.model.connect_flag == true){
                //     quiz_editor.model.connect_flag = false;
                //     connect_new = true;

                // }


                //gentime - окончание всех ресурсов для обновление кеша, идентифицирует "версию" лендинга, при этом не ересоздает сайт

                // var send_data = Object.assign({}, quiz_edit.model.cur_data);

                // if (!bg) {
                //     send_data.publish = 1;
                // }

                send_data.template = 'quiz';
                send_data.content = JSON.stringify(send_data.content);

                if (if_defined(send_data.id)) {
                    send_data.siteID = send_data.id;
                }else{
                    send_data.siteID = quiz_editor.model.q_data.content.default_page;
                }

                // if(!if_defined(send_data.name)){
                //     send_data.name = "Новый квиз"
                // }

                if (!if_defined(send_data.domain)) {
                    send_data.domain = 'null'
                }

                get_json('post', url, send_data, function(data) {

                    //var cur_id = getURLParameter('i');

                    // if (if_defined(data.data) && if_defined(data.data.addedID)) {

                    //     if (!if_defined(quiz_edit.model.cur_data.id) || quiz_edit.model.cur_data.id !=data.data.addedID) {

                    //         quiz_edit.model.cur_data.id = data.data.addedID;
                    //         quiz_edit.view.wrap.find('.preview').attr('href', 'http://client.dnk.bz/'+data.data.addedID+'/');
                    //     }

                    //     if(cur_id != data.data.addedID){

                    //         updateQueryStringParam('i',data.data.addedID);

                    //         if(cur_id == 'new'){

                    //             dnk_atom_events({type:'event',category:'create',action:'lp1',link:data.data.addedID});


                    //         }

                    //     }     

                    // }else{
                    //     quiz_edit.model.cur_data.id = cur_id;

                    // }   

                    // if(connect_new){

                    //     quiz_edit.controller.attach_quiz(quiz_editor.model.q_data.qid,data.data.addedID);
                    // }

                    if (callback) {
                        callback()
                    }
                    
                    


                    console.log('save_title = ', data);

                }, false, function() {}, false);


            });

        } else {
            if(if_defined(quiz_editor.model.q_data.qid)){

                var new_data = {
                    name: name,
                    content: {
                        quiz: true,
                        content_pre_form: "1",
                        form_name: "1",
                        form_phone: "1",
                        form_custom: "0",
                        form_email: "0",
                        form_custom_name: "0",
                        form_custom_plac: "0"
                    },
                    domain: 'null'
                };

                new_data.template = 'quiz';
                new_data.content = JSON.stringify(new_data.content);

                // if(if_defined(new_data.id)){
                //     send_data.siteID = send_data.id;
                // }

                // if(!if_defined(send_data.name)){
                //     send_data.name = "Новый квиз"
                // }

                if (!if_defined(new_data.domain)) {
                    new_data.domain = 'null'
                }


                var url = quiz_editor.controller.api_url + 'PageQUIZ/save';
                get_json('post', url, new_data, function(data) {




                    if(getURLParameter('qi') !='new'){

                        quiz_editor.controller.attach_quiz_to_page(getURLParameter('qi'),data.data.addedID,function(){

                            quiz_editor.model.q_data.content.default_page = data.data.addedID;
                            quiz_editor.model.save();
                            if (callback) {
                                callback()
                            }
                        })
       
                    }else{

                        setTimeout(function(){

                            if(getURLParameter('qi') !='new'){
                                    quiz_editor.controller.attach_quiz_to_page(getURLParameter('qi'),data.data.addedID,function(){

                            quiz_editor.model.q_data.content.default_page = data.data.addedID;
                            quiz_editor.model.save();
                            if (callback) {
                                callback()
                            }
                        })
       }
                        },700);
                        
                    }

                    console.log('save_title = ', data);

                }, false, function() {}, false);
            }else{
                    if (callback) {
                        callback()
                    }
            }

        }
    },
    load_quiz_list: function(only_list) {

        quiz_editor.controller.load_quiz_list(function(data) {

            //console.log('quiz_data = ',data);

            quiz_editor.view.load_quiz_list(data,only_list);


        });

    },
    glvrd:{
        inited:false,
        init:function(){
            quiz_editor.view.glvrd.wrap = $('#glvrd_body');
            this.full_data = {
                atomq_q_t:{
                    text:'',
                    num:0,
                    label:'Текст вопроса'  
                },
                atomq_r_q:{
                    text:'',
                    num:1   ,
                    label:'Описание вопроса'
                }
            }
            quiz_editor.view.glvrd.wrap.find('.g_i-wrap').html('');
            if (!if_defined(window.glvrd)) {

                $('head').append('<link rel="stylesheet" href="https://api.glvrd.ru/v1/glvrd.css">');

                $.getScript("https://api.glvrd.ru/v1/glvrd.js", function(data, textStatus, jqxhr) {
                
                    quiz_editor.events.glvrd.rebind();

                    quiz_editor.model.glvrd.inited = true;
                    quiz_editor.model.glvrd.clean_test();
                });

            }else{

                quiz_editor.events.glvrd.rebind();
                quiz_editor.model.glvrd.inited = true;
                quiz_editor.model.glvrd.clean_test();
            
            }
        },
        full_data:{

        },
        clean_test:function(){
            ////alert('clean_test');
               
            quiz_editor.view.glvrd.wrap.find('.g_i-wrap').html('');
            if(if_defined(quiz_editor.view.view_ed_bd)){

                quiz_editor.view.view_ed_bd.find('p.atomq_editable').each(function(index, el) {
                    quiz_editor.model.glvrd.update_from_el($(this));
                });
                this.test();


            }

        },
        cur_res:{

        },
        test:function(){
            ////alert('test');
            var enter_char = String.fromCharCode(10);
            var test_string = '';
            test_string+=this.full_data.atomq_q_t.text+enter_char+'|'+enter_char;
            test_string+=this.full_data.atomq_r_q.text
            var ta = quiz_editor.view.glvrd.wrap.find('.g_textarea');
            glvrd.proofread(test_string, function(result){
                ta.html(test_string);
                if (result.status="ok") {   



                    var score_f = parseFloat(score);
                    var color ="red"
                    if (score_f>=7.5) {
                        color = "green"
                    }else if(score_f > 5){
                        color = "orange"

                    }
                    quiz_editor.view.view_ed_bd.find('#glvrd_quest').html(score);
                    quiz_editor.view.glvrd.wrap.find('.g_result').html(score).css('color',color);

                    var text = 'Замечаний нет';
                    if (result.fragments.length == 1) {
                        text = 'Есть 1 замечание';

                    }else if(result.fragments.length > 1 && result.fragments.length <5){
                        text = 'Есть '+result.fragments.length+' замечания';
                    }else if(result.fragments.length >=5){
                        text = 'Есть '+result.fragments.length+' замечаний';
                    }

                    quiz_editor.view.glvrd.wrap.find('.g_status').html(text);

                    var quiz_cuts = [];
                    quiz_editor.model.glvrd.cur_res = result;


                    var html = test_string;
                    if (result.fragments.length>0) {
                        quiz_cuts[quiz_cuts.length] = 0;
                        html = test_string.slice(0,result.fragments[0].start);

                        for (var i = 0; i < result.fragments.length; i++) {

                            html+= '<span class="fragment" data-ind="'+i+'">'+test_string.slice(result.fragments[i].start,result.fragments[i].end)+'</span>';
                            
                            if (i+1==result.fragments.length) {

                                html+= test_string.slice(result.fragments[i].end);

                            }else{

                                html+= test_string.slice(result.fragments[i].end,result.fragments[i+1].start);
                            }

                            quiz_cuts[quiz_cuts.length] = result.fragments[i].start;
                            quiz_cuts[quiz_cuts.length] = result.fragments[i].end;
                        }
                    
                    }
                        var inps = html.split(enter_char+'|'+enter_char);
                        var $i_wrp = quiz_editor.view.glvrd.wrap.find('.g_i-wrap');
                        for (var i = 0; i < inps.length; i++) {
                             for(var key in quiz_editor.model.glvrd.full_data){
                                if (quiz_editor.model.glvrd.full_data.hasOwnProperty(key)) {

                                    if (quiz_editor.model.glvrd.full_data[key].num == i) {

                                        var $t_inp = $i_wrp.find('.g_input[data-key="'+key+'"],.g_textarea[data-key="'+key+'"]');

                                        if ($t_inp.length>0) {

                                            $t_inp.html(inps[i]);

                                        }else{
                                            var cls = 'g_textarea';
                                            if (key == 'descriptor') {
                                                cls = 'g_input';
                                            }
                                            //if (inps[i].length>5) {

                                                $i_wrp.append('<p class="g_label">'+quiz_editor.model.glvrd.full_data[key].label+'</p>');
                                                $i_wrp.append('<pre class="'+cls+'" data-key="'+key+'" contenteditable="true">'+inps[i]+'</pre>');
                                            
                                            //}
                                        }
                                        
                                        //inps[i]
                                    }
                                }
                             }
                        }
                        var $focused = $i_wrp.find('.g_focused');
                        if ($focused.length>0) {
                            var pos = parseInt($focused.attr('data-selection'))
                            var inp = $focused[0];
                            
                            function createRange(node, chars, range) {
                                if (!range) {
                                    range = document.createRange()
                                    range.selectNode(node);
                                    range.setStart(node, 0);
                                }

                                if (chars.count === 0) {
                                    range.setEnd(node, chars.count);
                                } else if (node && chars.count >0) {
                                    if (node.nodeType === Node.TEXT_NODE) {
                                        if (node.textContent.length < chars.count) {
                                            chars.count -= node.textContent.length;
                                        } else {
                                            range.setEnd(node, chars.count);
                                            chars.count = 0;
                                        }
                                    } else {
                                       for (var lp = 0; lp < node.childNodes.length; lp++) {
                                            range = createRange(node.childNodes[lp], chars, range);

                                            if (chars.count === 0) {
                                                break;
                                            }
                                        }
                                    }
                                } 

                                return range;
                            };
                            function setCurrentCursorPosition(chars) {
                                if (chars >= 0) {
                                    var selection = window.getSelection();

                                    range = createRange(document.getElementById("c_edit_f"), { count: chars });

                                    if (range) {
                                        range.collapse(false);
                                        selection.removeAllRanges();
                                        selection.addRange(range);
                                    }
                                }
                            };
                            setCurrentCursorPosition(pos);
                            $focused.removeAttr('id').removeClass('g_focused')
                        }                   
                    quiz_editor.events.glvrd.rebind_inputs();
                }

                console.log('GLVRD result = ',result);
            });


        },
        update_real_val:function($elem){

            var key = $elem.attr('data-key');
            var enter = String.fromCharCode(10);

            var pre_text = $elem.html();
            pre_text = pre_text.replace(new RegExp('</div>','g'),'');
            pre_text = pre_text.replace(new RegExp('<div>','g'),enter);
            $elem.html(pre_text);

            var text = $elem.text();
            // if (key != 'pre_form_offer') {
            //  text = text.replace(new RegExp(String.fromCharCode(10), 'g'),' ');
            // }else{
            //  if (document.location.pathname.indexOf('quiz')==-1) {

            //      text = text.replace(new RegExp(String.fromCharCode(10), 'g'),' ');
            //  }
            // }
            
            console.log('update_real_val');

            quiz_editor.view.view_ed_bd.find('.atomq_editable.'+key).html(text).trigger('blur');

        },
        update_from_el:function($elem,parse){

            var $clone = $elem.clone() 
            $clone.find('span').remove();
            
            var val = $clone.text();
            // var plac = $elem.attr('data-placeh');
            // console.log('update_from_el   - val =',val,'plac =',plac,'plac =',)
            // if (val == plac) {
            //     val = '';
            // }
            // console.log('update_from_el   - val =',val,'plac =',plac,'plac =',)

            var name = $elem.attr('name');
            if ($elem.hasClass('atomq_q_t') ||
                $elem.hasClass('atomq_r_q')) {
                //if (val.length>5) {
                       
                    if($elem.hasClass('atomq_q_t')){
                        name = 'atomq_q_t';
                    }else{
                        name = 'atomq_r_q';

                    }
                    this.full_data[name].text = val;  
                    if (!parse) {
                        this.test();
                    }       
                    // glvrd.proofread(val, function(result){
                    //     console.log('GLVRD result = ',result)
                    // });

                //}
            }
        }
    }

};