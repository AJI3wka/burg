;

'use strict';

console.log('lp3_edit.model start');

var lp3_edit = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

lp3_edit.model = {
	cur_data:{
		1:{},
		2:{},
		3:{},
		main:{},
		form:{}
	},

	default_question_object:[{
	    id: '0',
	    text: '',
	    backgroundImageDesktop: '',
	    backgroundImageMobile: '',
	    answers: [{
	        id: '0_1',
	        text: '',
	        nextQueston: '1_1'
	    }, {
	        id: '0_2',
	        text: '',
	        nextQueston: '1_2'
	    }, {
	        id: null,
	        text: '',
	        nextQueston: ''
	    }, {
	        id: null,
	        text: '',
	        nextQueston: ''
	    }]
	}],
	templates_input_array:[{
	    selector: '.input_count',
	    default: '2'
	}, {
	    selector: '.template',
	    default: 'page3/wov',
	    key_name: 'template',
	    part: 'main'
	}, {
	    selector: '.logo_img',
	    default: '0',
	    key: 'logoImage',
	    part: 'main'
	}, {
	    selector: '.iph1',
	    default: '',
	    key: 'phoneP1',
	    part: 'main'
	}, {
	    selector: '.iph4',
	    default: '',
	    key: 'phoneP4',
	    part: 'main'
	}, {
	    selector: '.page_addr',
	    default: '',
	    key: 'pageAddress',
	    part: 'main'
	}, {
	    selector: '.act_email',
	    default: '',
	    key: 'actEmail',
	    part: 'main'
	}, {
	    selector: '.page_email',
	    default: '',
	    key: 'pageEmail',
	    part: 'main'
	}, {
	    selector: '.page_title',
	    default: '',
	    key: 'title',
	    part: 'main'
	}, {
	    selector: '.land_name',
	    default: '',
	    key: 'name',
	    part: 'main'
	}, {
	    selector: '.domain',
	    default: '',
	    key: 'domain',
	    part: 'main'
	}, {
	    selector: '.metrics',
	    default: '',
	    key: 'metrics',
	    part: 'main'
	}, {
	    selector: '.head_codes',
	    default: '',
	    key: 'head_codes',
	    part: 'main'
	}, {
	    //новые поля main start
	    selector: '.favicon_img',
	    default: '0',
	    key: 'favicon',
	    part: 'main'
	}, {
	    selector: '.og_title',
	    default: '0',
	    key: 'ogTitle',
	    part: 'main'
	}, {
	    selector: '.og_descriptor',
	    default: '0',
	    key: 'ogDescriptor',
	    part: 'main'
	}, {
	    selector: '.og_img',
	    default: '0',
	    key: 'ogImage',
	    part: 'main'
	}, {
	    selector: '.vcard_category',
	    default: '0',
	    key: 'vcardCategory',
	    part: 'main'
	}, {
	    selector: '.metrics_visor',
	    default: '',
	    key: 'metrics_visor',
	    part: 'main'
	},{
	    selector: '.n_head_codes',
	    default: '',
	    key: 'n_head_codes',
	    part: 'main'
	},{
	    selector: '.n_body_codes',
	    default: '',
	    key: 'n_body_codes',
	    part: 'main'
	},{
	    selector: '.vcard_company',
	    default: '0',
	    key: 'vcardCompany',
	    part: 'main'
	}, {
	    selector: '.vcard_works',
	    default: '0',
	    key: 'vcardWorks',
	    part: 'main'
	}, {
	    selector: '.meta_description',
	    default: '0',
	    key: 'metaDescription',
	    part: 'main'
	}, {
	    selector: '.meta_keywords',
	    default: '0',
	    key: 'metaKeywords',
	    part: 'main'
	        //новые поля main end
	}, {
	    selector: '.bg_shadow',
	    default: '0.8',
	    key: 'backgroundShadow',
	    part: '1'
	}, {
	    selector: '.bg_ekran_1_m',
	    default: '',
	    key: 'backgroundImageMobile',
	    part: '1'
	}, {
	    selector: '.bg_ekran_1_d',
	    default: '',
	    key: 'backgroundImageDesktop',
	    part: '1'
	}, {
	    selector: '.content_video',
	    default: '0',
	    key: 'contentVideo',
	    part: '1'
	        // }, {
	        //     selector: '.content_autoplay',
	        //     default: '1',
	        //     key: 'contentAutoplay',
	        //     part: '1'
	}, {
	    selector: '.view_video',
	    default: 'Посмотреть видео',
	    key: 'view_video',
	    part: '1'
	        // }, {
	        //     selector: '.content_autoplay',
	        //     default: '1',
	        //     key: 'contentAutoplay',
	        //     part: '1'
	},{
	    selector: '.bg_video',
	    default: '0',
	    key: 'backgroundVideo',
	    part: '1'
	}, {
	    selector: '.offer_h1',
	    default: '',
	    key: 'offerH1',
	    part: '1'
	}, {
	    selector: '.offer_h2',
	    default: '',
	    key: 'offerH2',
	    part: '1'
	}, {
	    selector: '.pre_form_button',
	    default: '',
	    key: 'preButtonText',
	    part: '1'
	}, {
	    selector: '.pre_form_button',
	    default: '',
	    key: 'preButtonText',
	    part: '1'
	}, {
	    selector: '.lp3_pre_form_offer',
	    default: '0',
	    key: 'preOfferText',
	    part: '1'
	}, {
	    selector: '.descriptor',
	    default: '',
	    key: 'descriptor',
	    part: '1'
	}, {
	    //новые поля '2' start
	    selector: '.h2_ekran_2',
	    default: '',
	    key: 'block2H2',
	    part: '2'
	}, {
	    selector: '.bg_ekran_2_d',
	    default: '0',
	    key: 'backgroundImageDesktop',
	    part: '2'
	}, {
	    selector: '.bg_ekran_2_m',
	    default: '0',
	    key: 'backgroundImageMobile',
	    part: '2'
	        //новые поля '2' end
	}, {
	    //блоков поля '2' start
	    selector: '.block_name',
	    default: '',
	    key: 'name',
	    part: 'blocks_2'
	}, {
	    selector: '.block_bg_d',
	    default: '',
	    key: 'backgroundImageDesktop',
	    part: 'blocks_2'
	}, {
	    selector: '.block_bg_m',
	    default: '',
	    key: 'backgroundImageMobile',
	    part: 'blocks_2'
	}, {
	    selector: '.block_slide_img',
	    default: '',
	    part: 'blocks_2'
	}, {
	    selector: '.block_slide_video',
	    default: '',
	    part: 'blocks_2'
	}, {
	    selector: '.block_slide_content',
	    default: '',
	    key: 'file',
	    part: 'blocks_2'
	}, {
	    selector: '.block_slide_title',
	    default: '',
	    key: 'description',
	    part: 'blocks_2'
	        //блоков поля '2' end
	}, {
	    //Еще один неопределенный селектор
	    selector: '.h2_ekran_3',
	    default: '',
	    key: 'block3H2',
	    part: '3'
	}, {
	    selector: '.form_bg_d',
	    default: '',
	    key: 'backgroundImageDesktop',
	    part: 'form'
	}, {
	    selector: '.form_bg_m',
	    default: '',
	    key: 'backgroundImageMobile',
	    part: 'form'
	}, {
	    //блок вопросов start
	    selector: '.question_text',
	    default: '',
	    key: 'text',
	    part: '3'
	}, {
	    selector: '.answer_text',
	    default: '',
	    key: 'text',
	    part: '3'
	        //блок вопросв конец
	}, {
	    selector: '.qestion_bg_d',
	    default: '',
	    key: 'backgroundImageDesktop',
	    part: '3'
	}, {
	    selector: '.qestion_bg_m',
	    default: '',
	    key: 'backgroundImageMobile',
	    part: '3'
	}, {
	    selector: '.form_head',
	    default: '',
	    key: 'head',
	    part: 'form'
	}, {
	    selector: '.form_button',
	    default: '',
	    key: 'buttonText',
	    part: 'form'
	}, {
	    selector: '.event_submited',
	    default: '',
	    key: 'event_submited',
	    part: 'main'
	}, {
	    selector: '.form_name',
	    default: '1',
	    key: 'name',
	    part: 'form'
	}, {
	    selector: '.form_phone',
	    default: '1',
	    key: 'phone',
	    part: 'form'
	}, {
	    selector: '.form_email',
	    default: '0',
	    key: 'email',
	    part: 'form'
	}, {
	    selector: '.form_custom',
	    default: '0',
	    key: 'custom',
	    part: 'form'
	}, {
	    selector: '.form_custom_name',
	    default: '',
	    key: 'customName',
	    part: 'form'
	}, {
	    selector: '.form_custom_plac',
	    default: '',
	    key: 'customPlaceholder',
	    part: 'form'
	}, {
	    //новые поля 'form' start
	    selector: '.requsites_text',
	    default: '',
	    key: 'reqesitesText',
	    part: 'form'
	}, {
	    selector: '.aftersend_text',
	    default: '',
	    key: 'aftersendText',
	    part: 'form'
	}, {
	    selector: '.aftersend_file',
	    default: '0',
	    key: 'aftersendFile',
	    part: 'form'

	}],
	reinit:function(){

    	lp3_edit.model.cur_data[3].questions = lp3_edit.model.default_question_object;
	},
	questions_get_prew_id_by_id:function(question_id) {
	/**
	 * [questions_get_prew_id_by_id получить ид предидущего вопроса]
	 * @param  {[string]} question_id [question_id - идентификатор вопроса]
	 * @return {[string]}             [question_id - идентифкатор предыдщего вопроса]
	 */

	    console.log('lp3_questions_get_prew_id_by_id(', question_id, ')');

	    var step = parseInt(question_id.split('-')[0]);//получение текущего шага
	    var quest_num = parseInt(question_id.split('_')[1]);//полчение номера вопроса
	    console.log('quest_num = ', quest_num);
	    var prew_qouest_num = Math.ceil(quest_num / 4);//получение номера прдедыущего этапа
	    var prew_step = step - 1;//предыдущий шаг
	    var prew_id = prew_step + '_' + prew_qouest_num;//ИД предыщего вопроса

	    console.log('returned = ', prew_id);

	    return prew_id;//возвращение значения

	},
	save_qestion:function(question_id) {
		/**
		 * [save_qestion сохранить вопрос с введенных данных в кеш]
		 * @param  {[string]} question_id [ИД вопроса]
		 */

	    console.log('lp3_save_qestion(' + question_id + ')');

	    //lp3_rebuild_question_cache();
	    var questions = lp3_edit.model.cur_data[3].questions;//берем объект вопросов с кеша

	    for (var i = 0; i < questions.length; i++) {//цикл по всей длине объекта
	        if (if_defined(questions[i].id) && questions[i].id == question_id) {//поиск нужного ИД

	            //var question = questions[i];

	            var $wrap = lp3_edit.view.wrap.find('#questions_col').find('.form_step[data-id="' + question_id + '"]');//врап ответа 

	            var question_text = $wrap.find('textarea[name="question_text"]').val();//текст вопроса
	            console.log(question_text);
	            var qestion_bg_d = $wrap.find('input[name="qestion_bg_d"]').val();//фон десктоп
	            var qestion_bg_m = $wrap.find('input[name="qestion_bg_m"]').val();//ajy мобайл

	            if (if_defined(question_text)) {//если ответ не пуст и существует
	                lp3_edit.model.cur_data[3].questions[i].text = question_text;//записываем в кеш
	            } else {
	                lp3_edit.model.cur_data[3].questions[i].text = '';//если пуст или не существует записываем пустое значение

	            }

	            if (if_defined(qestion_bg_d)) {//если фон_десктоп не пуст и существует

	                lp3_edit.model.cur_data[3].questions[i].backgroundImageDesktop = qestion_bg_d;//записываем в кеш
	            } else {
	                lp3_edit.model.cur_data[3].questions[i].backgroundImageDesktop = '';//если пуст или не существует записываем пустое значение

	            }

	            if (if_defined(qestion_bg_m)) {//если фон_мобайл не пуст и существует

	                lp3_edit.model.cur_data[3].questions[i].backgroundImageMobile = qestion_bg_m;//записываем в кеш

	            } else {
	                lp3_edit.model.cur_data[3].questions[i].backgroundImageMobile = '';//если пуст или не существует записываем пустое значение

	            }

	            for (var j = 0; j < 4; j++) {//цикл 0-3 для ответов
	                var answer_number = j + 1;//номер ответа
	                var $input = $wrap.find('.step_form_input[data-number="' + answer_number + '"]').find('textarea[name="answer_text"]');//поиск инпута
	                var answer_text = $input.val();//текст ответа
	                var next_question = $input.attr('data-next-question');//ИД следующего вопроса
	                var answer_id = $input.attr('data-id');//ИД ответа
	                //console.log('$input = ',$input);
	                console.log(answer_text);
	                if (if_defined(answer_text)) {//если текст ответа существет и не пуст

	                    if (!if_defined(lp3_edit.model.cur_data[3].questions[i].answers[j])) {//если в кеше еще нету ответа под этим номерм
	                        lp3_edit.model.cur_data[3].questions[i].answers[j] = {};//создать его
	                    }

	                    lp3_edit.model.cur_data[3].questions[i].answers[j].text = answer_text;//записываем ответ в кеш
	                        
	                    if (if_defined(next_question)) {//если существует ИЛ след вопроса и не пуст
	                        lp3_edit.model.cur_data[3].questions[i].answers[j].nextQueston = next_question;//записываем в кеш
	                    } else {
	                        lp3_edit.model.cur_data[3].questions[i].answers[j].nextQueston = null;//если пуст или не существует записываем пустое значение

	                    }

	                    if (if_defined(answer_id)) {//если существует ИЛ ответа и не пуст
	                        lp3_edit.model.cur_data[3].questions[i].answers[j].id = answer_id;//записываем в кеш
	                    } else {
	                        lp3_edit.model.cur_data[3].questions[i].answers[j].id = null;//если пуст или не существует записываем пустое значение
	                    }

	                } else {

	                    lp3_edit.model.cur_data[3].questions[i].answers[j] = null;//если ответ не заполнен -удаляем его из кеша

	                }

	            }
	        }
	    }
	},
	check_qestion:function(question_id) {
		/**
		 * [check_qestion проверить существование такого вопроса, а если не существет создать]
		 * @param  {string} question_id [ИД вопроса который проверяем]
		 */

	    console.log('lp3_check_qestion(' + question_id + ')');

	    var questions = lp3_edit.model.cur_data[3].questions;//записываем в переменную с кеша

	    var finded = false;//флаг найденого вопроса

	    for (var i = 0; i < questions.length; i++) {
	        if (if_defined(questions[i].id) && questions[i].id == question_id) {
	            finded = true;//поиск по всем ответов на совпадение ИД и скидывание флага
	        }
	    }

	    if (question_id.split('_')[0] == '4') {
	        finded = true;//если это 5тый шаг то скидываем флаг(что бы не создавать лишних вопросов)
	    }

	    if (!finded) {
	        lp3_edit.model.creacte_qestion(question_id);//если не найдено - создать такой вопрос
	    }

	},
	creacte_qestion:function(question_id) {
		/**
		 * [creacte_qestion создать вопрос в кеше]
		 * @param  {[string]} question_id [Идентификтор вопроса]
		 */
	    console.log('lp3_creacte_qestion(',question_id,')');
	    //добавление в объект вопросов в кеше елемента с чистым контеном и идентификтором c входа
	    lp3_edit.model.cur_data[3].questions[page_object_in_cache[3].questions.length] = {

	        id: question_id,
	        text: '',
	        backgroundImageDesktop: '',
	        backgroundImageMobile: '',
	        answers: [{
	            id: null,
	            text: '',
	            nextQueston: null
	        }, {
	            id: null,
	            text: '',
	            nextQueston: null
	        }, {
	            id: null,
	            text: '',
	            nextQueston: null
	        }, {
	            id: null,
	            text: '',
	            nextQueston: null
	        }]
	    }

	},
	make_actual_questions:function(actual_questions,id){

		/**
		 * [make_actual_questions функция цикличного наполнения актуальных вопросов исползуется при очитске объекта вопросов]
		 * @param  {[Array]} actual_questions [вектор актуальных вопросов]
		 * @param  {[String]} id              [ИД вопроса который проверяем]
		 */
	    //console.log('lp3_make_actual_questions(',actual_questions,id,')');

	    var questions = lp3_edit.model.cur_data[3].questions;//берем вопросы с кеша

	    var id_1 = '0';//если нет - проверяем с ноля
	    
	    if(id){
	     
	        id_1 = id;//если ИД указан первичный ИД равен входящему

	    }

	    for (var k = 0; k < questions.length; k++) {//цикл по всей длине вопросов
	        if (questions[k].id == id_1 && if_defined(questions[k].text)) {//если ИД равно первично ИД и заполненный текст
	            var start_1 = questions[k];//ставртовый вопрос - найденный вопрос
	            for (var l = 0; l < start_1.answers.length; l++) {//цикл по стартовом вопросе по ответах
	                if (if_defined(start_1.answers[l]) && if_defined(start_1.answers[l].id) && if_defined(start_1.answers[l].nextQueston) && if_defined(start_1.answers[l].text)) {//если ответ существует и у него существует ИД, след впорос и текст
	                    
	                    var id_2 = start_1.answers[l].nextQueston;//берем ИД с ответа
	                    //добавляем ИД с ответа в список актуальных вопросов
	                    actual_questions[actual_questions.length] = id_2;

	                    if(parseInt(id_2.split('_')[0])<3){//если ИД не последнего шага(шаг 2 и меньше)

	                        lp3_edit.model.make_actual_questions(actual_questions,id_2);//запускаем проверку и по этому шагу
	                    
	                    }
	                        
	                }
	            }
	        }
	    }

	},
	rebuild_question_cache:function() {
		/**
		 * [rebuild_question_cache перестроить объект вопросов в кеше, очистить от нерабочих и не актуальных]
		 */

	    var questions = lp3_edit.model.cur_data[3].questions;//забираем вопросы с кеша
	    //делаем наполнение актуальных вопросов
	    var actual_questions = ['0'];
	    lp3_edit.model.make_actual_questions(actual_questions);

	    console.log('actual_questions = ', actual_questions);

	    var new_questions = [];//чистый объект вопросов
	    for (var ii = 0; ii < actual_questions.length; ii++) {
	        for (var jj = 0; jj < questions.length; jj++) {
	            if (actual_questions[ii] == questions[jj].id) {//поиск пересечений с одинаковыми ИД(поиск по ИД)
	                new_questions[new_questions.length] = questions[jj];//перенос их с старых вопровсв в новую переменную

	            }

	        }
	    }
	    lp3_edit.model.cur_data[3].questions = new_questions;//перезапись кеша
	},
	remove_conflict_in_questions:function(ii,jj,cached_next_question,next_question_id){
		/**
		 * [remove_conflict_in_questions удаление конфликтов в векторе вопросов, возникают при удалении не последнего ответа с объекта]
		 * @param  {[integer]} ii                   [порядковый номер вопроса в векторе вопросов в котором был найден конфликт]
		 * @param  {[integer]} jj                   [порядковый номер ответа в вопросе в котором был найден конфликт]
		 * @param  {[type]} cached_next_question [неправильный идентификатор следующего вопроса]
		 * @param  {[type]} next_question_id     [правильный идентификатор следующего вопроса]
		 */
	    console.log('remove_conflict_in_questions(',ii,jj,cached_next_question,next_question_id,')');

	    //исправление nexQuestion конфликтного вопроса
	    lp3_edit.model.cur_data[3].questions[ii].answers[jj].nextQueston = next_question_id;

	    //перепозначение вопросов
	    var questions = lp3_edit.model.cur_data[3].questions;
	    
	    for (var k = questions.length - 1; k >= 0; k--) {//цикл по всему списку вопросов
	        var f_question = questions[k];

	        if(f_question.id == next_question_id){//если ИД вопроса равно ИД в котором возник конфликт, следовательно эти вопросы старые и не актуальные и их нужно удалить

	            questions[k].id = 'deleted';//присваивание ИД "deleted"
	            questions[k].answers = [];//очистка ответов
	            lp3_edit.model.cur_data[3].questions = questions;//запись в кеш этих вопросов

	        }

	    }


	    for (var i = questions.length - 1; i >= 0; i--) {//повторный цикл по всей длинне вопросов
	        var question = questions[i];//переприсваивание в переменную для удобности роботы

	        if(question.id == cached_next_question){//если вопрос имеет идентификатор "старый" значит этот вопрос должен стать "новым"

	            questions[i].id = next_question_id;//измение ИД вопроса

	            lp3_edit.model.cur_data[3].questions = questions;//запись в кеш изменения
	            
	            var question_id = next_question_id;//ИД вопроса
	            var step = parseInt(question_id.split('_')[0]);//с

	            if(step<3){

	                for (var j = 0; j < 4; j++) {//цикл 4 ответа по номеру в масиве
	                    var question_number = j + 1;//номер ответа в каркасе с единицы
	                    /*---- формирование второй части ИД ответов на вопросы(часть номера вопроса) старт-------*/
	                    var question_part = question_id.split('_');//разделяем ИД вопроса на вектор
	                    question_part = parseInt(question_part[question_part.length - 1]);//получаем часть ИД для формирование нового
	                    //question_id = 0; question_part = 0;
	                    //question_id = 1_1; question_part = 1;
	                    //question_id = 2_2; question_part = 2;

	                    if (question_part == 0) {// если == 0 то присаиваем еденицу
	                        question_part = 1;
	                    }

	                    question_part = (question_part - 1) * 4 + question_number;//формируем часть ИД вопроса которая зависит от ИД пред. вопроса
	                    //question_id = 0; question_part = question_number
	                    //question_id = 1_1; question_part = question_number
	                    //question_id = 2_2; question_part = 4+question_number

	                    /*---- формирование второй части ИД ответов на вопросы конец-------*/
	                    var step_part = step + 1;//часть ИД вопроса отвечающая за шаг формы
	                    var next_question_id_new = step_part + '_' + question_part;//формирование идентификторв следующего вопроса
	                    
	                    if (if_defined(question.answers[j])) {//если ответ есть в кеше
	                        if (if_defined(question.answers[j].id) && if_defined(question.answers[j].text)) {//если у ответа обозначен ИД и текст

	                            var cached_next_question_new = question.answers[j].nextQueston;
	                            if(cached_next_question_new != next_question_id_new){

	                                lp3_edit.model.remove_conflict_in_questions(i,j,cached_next_question_new,next_question_id_new);//удаляем конфликт в вопросах

	                            }

	                        }

	                    } 
	                }

	            }

	        }
	    
	    }

	    //console.log('page_object_in_cache[3].questions === ',page_object_in_cache[3].questions);

	},
	validate_qestions:function() {

	    if (lp3_edit.view.wrap.find('.trig_btn[data-target="step_form"]').hasClass('active')) {
	        
	        lp3_edit.model.rebuild_question_cache();

	        var questions = lp3_edit.model.cur_data[3].questions;

	        for (var l = 0; l < questions.length; l++) {

	            var cur_question = questions[l];

	            if (if_defined(cur_question.id)) {
	             
	                var step = parseInt(cur_question.id.split('_')[0]);

	                if (step<3) {

	                    for (var o = 0; o < cur_question.answers.length; o++) {

	                        if (if_defined(cur_question.answers[0])) {

	                            if (if_defined(cur_question.answers[0].text)) {

	                                 lp3_edit.model.check_qestion(cur_question.answers[0].nextQueston); 

	                            }
	                        }

	                    }

	                }
	                           
	            }

	        }


	        questions = lp3_edit.model.cur_data[3].questions;

	        var validate_obj = {
	            id: false,
	            text: false,
	            background: false,
	            answers: 2,
	            good: false
	        };

	        for (var i = 0; i < questions.length; i++) {

	            var question = questions[i];

	            if (if_defined(question.id)) {

	                validate_obj = {
	                    id: false,
	                    text: false,
	                    background: false,
	                    answers: 2,
	                    good: false
	                };

	                validate_obj.id = question.id;

	                if (if_defined(question.text)) {
	                    validate_obj.text = true;
	                }

	                if (if_defined(question.backgroundImageDesktop) && question.backgroundImageDesktop!='0') {
	                    validate_obj.background = true;
	                }

	                for (var j = 0; j < question.answers.length; j++) {
	                    if (if_defined(question.answers[j])) {

	                        var answer = question.answers[j];

	                        if (if_defined(answer.id)) {
	                            if (if_defined(answer.text)) {
	                                validate_obj.answers--;
	                            }
	                        }

	                    }else{
	                        console.log('if_defined(question.answers[',j,']) = false');
	                    }
	                    if (validate_obj.answers == 0) {
	                        j = question.answers.length;
	                    }
	                }

	                if (!validate_obj.text || !validate_obj.background || validate_obj.answers > 0) {
	                    i = questions.length;
	                } else {
	                    validate_obj.good = true;
	                }

	            }
	        }

	        if (!validate_obj.good) {
	            lp3_edit.view.bad_validate_questions(validate_obj);
	        }


	    }else{

	        lp3_edit.model.cur_data[3].questions = [];

	    }

	},
	parse_all_to_cache:function(part, callback) {

		console.log('parse_all_to_cache(',part,')');

		if (!if_defined(part)) return

	    if (part == 'blocks_2') {
	        part = '2';
	    }

	    /*-------- наполнение объекта page_object_in_cache актуальным контентом, старт ---------*/

	    for (var i = lp3_edit.model.templates_input_array.length - 1; i >= 0; i--) { //по всей длинне вектора полей

	        var inp = lp3_edit.model.templates_input_array[i]; //элемент вектора

	        if (inp.hasOwnProperty('key') && inp.hasOwnProperty('part') && if_defined(inp.part) && inp.part == part) { //если у елемента вектора есть параметр key


	            var cur_val = lp3_edit.view.wrap.find(inp.selector).val();

	            //var page_id = $('#pageId').val();//id страницы

	            // var log_val; //значение иползуемое для логирования

	            var content_key = inp.key; //переопределение ключа на уровне content

	            if (lp3_edit.model.cur_data[part] == null || lp3_edit.model.cur_data[part] == 0) { //если в глобальной переменной нету контента создаем его
	                lp3_edit.model.cur_data[part] = {};
	            }

	            lp3_edit.model.cur_data[part][content_key] = cur_val; //писваивем глобальному обьекту этой сранице в контент с ключем для контент занчение с поля

	            if (content_key == 'offerH1' || content_key == 'formHead' || content_key == 'descriptor') {
	                //если это одна из textarea заменяем пеернос строки на <br>
	                var enter_char = new RegExp(String.fromCharCode(10), 'g');
	                lp3_edit.model.cur_data[part][content_key] = cur_val.replace(/^\s+|\s+$/g, ' ');
	            }

	            if (content_key == 'pageEmail' && cur_val.length == 0) {
	                //если не указан page_email, то присваем ему значение act_email
	                lp3_edit.model.cur_data[part][content_key] = lp3_edit.model.cur_data[part].actEmail
	            }

	            if (content_key == 'backgroundVideo' && cur_val != '0') {
	                //если это bg_video используем ютуб парсер на значении(возвращает ИД виедо ютуб)
	                lp3_edit.model.cur_data[part][content_key] = youtube_parser(cur_val);
	            }

	            if (content_key == 'contentVideo' && cur_val != '0') {
	                //если это content_video используем ютуб парсер на значении(возвращает ИД виедо ютуб)
	                lp3_edit.model.cur_data[part][content_key] = youtube_parser(cur_val);
	            }

	            // log_val = lp3_edit.model.cur_data[part][content_key];

	            // console.log(' key = ', inp.key, ' , val = ', log_val);

	        }


	    }

	    if (part == '2') {
	        lp3_edit.model.parse_blocks_to_cache();
	    }

	    if (part == '3') {

	    }

	    if (part == 'main') {

	    }


	    if (callback) {
	        callback();
	    }


	},
	parse_blocks_to_cache:function() {

	    console.log('lp3_parse_blocks_to_cache()');

	    var $wrap = lp3_edit.view.wrap.find('.step[data-step="2"]');

	    lp3_edit.model.cur_data[2].blocks = [];
	    console.log('lp3_parse_blocks_to_cache() lp3_edit.model.cur_data[2].blocks = ',lp3_edit.model.cur_data[2].blocks)

	    $wrap.find('.block_row').each(function() {

	    	var $this = $(this);
	        var title = $this.find('input.block_name').val();

	        console.log('finded_title = ', title);


	        if (title != '0') {
	            var bg_img_desktop = $this.find('input.block_bg_d').val();
	            var bg_img_mobile = $this.find('input.block_bg_m').val();
	            var i = lp3_edit.model.cur_data[2].blocks.length;
	            lp3_edit.model.cur_data[2].blocks[i] = {
	                name: title,
	                backgroundImageDesktop: bg_img_desktop,
	                backgroundImageMobile: bg_img_mobile,
	                slides: []
	            };

	           	$this.find('.slide_element').each(function() {

	           		var $sthis = $(this);

	                var content = $sthis.find('input.block_slide_content').val();

	                console.log('slide_content = ', content);

	                if (if_defined(content)) {

	                    var description = $sthis.find('input.block_slide_title').val();
	                    lp3_edit.model.cur_data[2].blocks[i].slides[lp3_edit.model.cur_data[2].blocks[i].slides.length] = {
	                        file: content,
	                        description: description
	                    };
	                }

	            });

	        }
	    });
		console.log('lp3_parse_blocks_to_cache() lp3_edit.model.cur_data[2].blocks = ',lp3_edit.model.cur_data[2].blocks)

	    lp3_edit.view.reload_blocks_fancy_in_iframe();

	},
	input_autosave:function($this) {

	    console.log('lp3_input_autosave() - start',$this);

	    if(!lp3_edit.view.wrap.is(':visible')){return false;}

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


	    $sync_ico.fadeIn(300);  //показываем возле ближайшего .label иконку синхронизации


	    var part = $this.attr('data-page-part');


	    lp3_edit.controller.save_page_part(part, function() {
	    	console.log('lp3_edit.controller saved');

	       $sync_ico.addClass('checked').fadeOut(700, function() {
	            //добавляем галочку на иконку снихронизации, скрываем за 700мс и уираем класс галочки с иконки синхронизации

        		$this.attr('data-last-pushed', $this.val());
	            $sync_ico.removeClass('checked');

	            console.log('lp3_input_autosave() - end');
	        });

	    });


	},
	make_questions_object:function(data) {

	    var new_data = {
	        block3H2: data.block3H2
	    };

	    for (var i = 0; i < data.questions.length; i++) {

	        var question = data.questions[i];

	        if (if_defined(question.id)) {


	            var keytext = 'questions[' + i + '][id]';
	            new_data[keytext] = question.id;
	            keytext = 'questions[' + i + '][text]';
	            new_data[keytext] = question.text;
	            keytext = 'questions[' + i + '][backgroundImageDesktop]';
	            new_data[keytext] = question.backgroundImageDesktop;
	            keytext = 'questions[' + i + '][backgroundImageMobile]';
	            new_data[keytext] = question.backgroundImageMobile;

	            for (var j = 0; j < question.answers.length; j++) {
	                if (if_defined(question.answers[j])) {

	                    var answer = question.answers[j];
	                    if (if_defined(answer.id)) {

	                        keytext = 'questions[' + i + '][answers][' + j + '][id]';
	                        new_data[keytext] = answer.id;
	                        keytext = 'questions[' + i + '][answers][' + j + '][text]';
	                        new_data[keytext] = answer.text;
	                        keytext = 'questions[' + i + '][answers][' + j + '][nextQueston]';
	                        new_data[keytext] = answer.nextQueston;

	                    }


	                }


	            }


	        }


	    }

	    return new_data;
	},
	make_blocks_object:function(data) {

	    console.log('lp3_make_blocks_object(', data, ')');

	    var new_data = {
	        block2H2: data.block2H2,
	        backgroundImageDesktop: data.backgroundImageDesktop,
	        backgroundImageMobile: data.backgroundImageMobile
	    };

	    for (var i = 0; i < data.blocks.length; i++) {

	        var block = data.blocks[i];

	        if (if_defined(block.name)) {


	            var keytext = 'blocks[' + i + '][name]';
	            new_data[keytext] = block.name;
	            keytext = 'blocks[' + i + '][backgroundImageDesktop]';
	            new_data[keytext] = block.backgroundImageDesktop;
	            keytext = 'blocks[' + i + '][backgroundImageMobile]';
	            new_data[keytext] = block.backgroundImageMobile;

	            for (var j = 0; j < block.slides.length; j++) {
	                var slide = block.slides[j];
	                if (if_defined(slide.file)) {

	                    keytext = 'blocks[' + i + '][slides][' + j + '][file]';
	                    new_data[keytext] = slide.file;
	                    keytext = 'blocks[' + i + '][slides][' + j + '][description]';
	                    new_data[keytext] = slide.description;

	                }


	            }


	        }


	    }

	    return new_data;
	},
	init_iframe_edit:function(callback){

	    function make_load(){


	        var $lp3_wrap = lp3_edit.view.wrap;
			lp3_edit.view.edit_frame = document.getElementById("for_preview_lp3").contentWindow;
			lp3_edit.view.edit_frame_body = lp3_edit.view.wrap.find('#for_preview_lp3').contents();
	        lp3_edit.view.resize_edit_frame(); 

	        if (callback) {
	        	callback();
	        }
	    }


	    var $preview_iframe = lp3_edit.view.wrap.find("iframe#for_preview_lp3");

	    $preview_iframe.unbind('load');
	    $preview_iframe.on("load", function () {

	        make_load();

	    });

		var frame_src = source_url+"/frame/lp3_template/"
	    console.log($preview_iframe.attr('scr') );

	    if ($preview_iframe.attr('scr') != frame_src) {

	        $preview_iframe.attr('src', frame_src);
	    
	    }else{

	        make_load();

	    }

	},
	paste_data_in_editor:function(){

			lp3_edit.view.paste_page_data_from_cache();

            lp3_edit.view.reload_blocks_block();
            
            lp3_edit.view.insert_data_in_iframe();

            if(if_defined(lp3_edit.model.cur_data[3]) && if_defined(lp3_edit.model.cur_data[3].questions)){
				
				if (lp3_edit.model.cur_data[3].questions.length > 0) {
					// lp3_reload_question('0');
					if (if_defined(lp3_edit.model.cur_data[3].questions[0].text)) {
						$lp3_wrap.find('#questions_col').find('.block_trig_btn').addClass('active');
						$lp3_wrap.find('#questions_col').addClass('active');
						lp3_edit.view.reload_question('0');
						// $lp3_wrap.find('#questions_col').show();
					}

				}
            	
            }		

        

	    if (if_defined(lp3_edit.model.cur_data.quiz)) {//Если существует такое значение вставляем его в поле
	    	var cur_id = getURLParameter('qi');
	        if(cur_id != lp3_edit.model.cur_data.quiz){

	        	updateQueryStringParam('qi',lp3_edit.model.cur_data.quiz);

	        	// if(cur_id == 'new'){

	        	// 	dnk_atom_events({type:'event',category:'create',action:'lp1',link:data.id});


	        	// }
	        	//         	

	        }else{

	        }
	        ////alert('trig_act');

			if (!$('.trig_btn[data-target="quiz_enabled"]').hasClass('active')) {//если тригер(в области редактора) с таким ключем не имеет активного класа
             

                // lp3_edit.model.load_quiz_list();
                // if (getURLParameter('p')==4) {
                //     $('.body').addClass('quiz_lock');

                // }

                // // var qid = getURLParameter('qi')
                // // if (qid) {
                // //     if (if_defined(quiz_editor)) {
                // //         quiz_editor.controller.attach_quiz_to_page(qid,lp1_edit.model.cur_data.id);
                // //     }
                // // }
                // $wrap.find('#quiz_enabled.block_trig_wrap').addClass('active');
                
                //setTimeout(function(){

                $('.trig_btn[data-target="quiz_enabled"]').trigger('click');//модулируем клик по нему(для переключения)

                //},200);
           
            }	

			//lp1_edit.view.wrap.find('.preview').attr('href', 'http://client.dnk.bz/'+data.id+'/');	        

	    }

	},
	load_page_by_id:function(id, callback) {




	        lp3_edit.view.clean_values();



	        if (id != 'new') {
	            lp3_edit.controller.get_page_by_id(id, function(data) {


	                var content = data.content;


	                lp3_edit.model.cur_data['form'] = content.form;
	                lp3_edit.model.cur_data[1] = content.screens[1];
	                lp3_edit.model.cur_data[2] = content.screens[2];
	                lp3_edit.model.cur_data[3] = content.screens[3];
	                lp3_edit.model.cur_data['main'] = content.site;
	                lp3_edit.model.cur_data.quiz = data.quiz;

	                //console.log('!!!!! lp3_get_page_by_id(',id,',',content,',',page_object_in_cache,') !!!!!!!!');

	                

	                if (callback) {
	                    callback();
	                }



	            });

	        } else {
	            lp3_edit.model.cur_data[3].questions = [];
	            var $lp3_wrap = lp3_edit.view.wrap;
	            $lp3_wrap.find('input.form_name').val('1').attr('data-last-pushed', '1');
	            $lp3_wrap.find('input.form_phone').val('1').attr('data-last-pushed', '1');
	            $lp3_wrap.find('input[name="input_count"]').val('2').attr('data-last-pushed', '2');
	            lp3_edit.view.clean_blocks();
	            //lp3_parse_blocks_to_cache();
	            lp3_edit.model.parse_all_to_cache('main');
	            console.log('MAIN PARSED');
	            lp3_edit.model.parse_all_to_cache('form');
	            console.log('FORM PARSED');
	            lp3_edit.model.parse_all_to_cache('1');
	            console.log('1 PARSED');
	            lp3_edit.model.parse_all_to_cache('2');
	            console.log('2 PARSED');
	            lp3_edit.model.parse_all_to_cache('3');
	            console.log('3 PARSED');
	            //lp3_reload_blocks_block();
	                console.log('MAIN SAVED');
	            lp3_edit.controller.save_page_part('main', function() {
	                console.log('MAIN SAVED');

	                lp3_edit.controller.save_page_part('form', function() {
	                    console.log('FORM SAVED');

	                    lp3_edit.controller.save_page_part('1', function() {
	                        console.log('1 SAVED');

	                        lp3_edit.controller.save_page_part('2', function() {
	                            console.log('2 SAVED');

	                            lp3_edit.controller.save_page_part('3', function() {
	                                console.log('3 SAVED');
	                                if (callback) {
	                                    callback();
	                                }
	                            }, 'new');
	                        }, 'new');
	                    }, 'new');
	                }, 'new');

	            }, 'new');
	            //$('#lp3_editor_body').find('.trig_btn[data-target="block_row"]').trigger('click');


	        }


	        lp3_edit.view.scroll_iframe_to_selector('.sec1');


	},


	init_helpers:function(){
		var $wrap = lp3_edit.view.wrap.find('.helpers');
		if ($wrap.children().length==0) {

    		run_module('helpers');
		}
	},
	load_quiz_list:function(){

	    $("#quiz_panel").load(source_url+"/html/parts/quiz/panel.html", function() {
		  //quiz_edit.view.panel = $("#quiz_panel");
		  	//var r_w = $('#qiuz_helper').width()-$("#quiz_panel").closest('.scroll_content').outerWidth() - 20;
			//$('#quiz_editor').css({width:r_w+'px'});
			$('#quiz_editor').load(source_url+"/html/parts/quiz/edit.html", function() {

				run_module('quiz_editor');

			});
		});

		//run_module('quiz_editor');

	},
	remove_quiz_from_page:function(){

		if (if_defined(quiz_editor)) {
			quiz_editor.controller.attach_quiz_to_page(null,lp3_edit.model.cur_data.id);
		}

	},
	load_quiz:function(data){

		if(if_defined(lp3_edit.view.edit_frame) && if_defined(lp3_edit.view.edit_frame.atom_quiz)){
			lp3_edit.view.edit_frame.atom_quiz.qiuz_data = Object.assign({},data);
			//quiz_edit.view.edit_frame.atom_quiz.quiz_data = data;
			lp3_edit.view.edit_frame.atom_quiz.load();
		}
		
	}

};
