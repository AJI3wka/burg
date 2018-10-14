;

'use strict';

console.log('lp3_edit.view start');


lp3_edit.view = {
	wrap:false,
	step_slider:false,
	edit_frame:false,
	edit_frame_body:false,
	frame_init_rendering_timer:false,
	reload_question:function(question_id, _this) {
    return //УДАЛИТЬ ПОСЛЕ ВОЗВРАЩЕНИЯ ПОШАГОВОЙ ФОРМЫ

	    var questions = lp3_edit.cur_data[3].questions; //перепозначение вопросов

	    var step = parseInt(question_id.split('_')[0]);//получение шага  ("[3]_40")

	    console.log('lp3_reload_question(', question_id, ') step = ', step);
	    if (step < 4) {//отсечение попытки загрузки фопросов с шага выше 4

	        console.log('reloading_question_step = ', step);

	        var $wrap = lp3_edit.view.wrap.find('#questions_col').find('.form_step[data-step="' + step + '"]');//присваивание прееменной области конкретного шага

	        $wrap.find('.step_form_input').removeClass('on_step_line');
	        if ($wrap.find('.step_form_input.focused').length < 1 && $wrap.find('.step_form_input.on_step_line').length < 1) {
	            $wrap.find('.answer_field').removeClass('on_step_line');
	        }

	        for (var i = 0; i < questions.length; i++) {//цикл по всех вопросах
	            if (if_defined(questions[i].id) && questions[i].id == question_id) {//если ИД обозначено и ИД равно входящему парметру

	                var question = questions[i];//перепозначение вопроса

	                console.log('question = ', question);

	                //ищем инпуты, скидываем с нимх клас с ошибкой, записываем занчения с полученого вопроса(который в совю очередь берется с кеша)
	                $wrap.find('textarea[name="question_text"]').removeClass('error-input').val(question.text);//текст вопроса
	                $wrap.find('input[name="qestion_bg_d"]').removeClass('error-input').val(question.backgroundImageDesktop);//бекграунд вопроса  десктоп
	                $wrap.find('.upload_file_btn.error-button').removeClass('error-button');//снимаем с кнопки загрузки клас ошибки
	                $wrap.find('input[name="qestion_bg_m"]').removeClass('error-input').val(question.backgroundImageMobile);//бекграунд вопроса мобила
	                $wrap.find('input[type="file"]').val('');//очистка инпута загрузки файла
	                $wrap.find('.upload_file_btn').removeClass('error-input');//снимаем с кнопки загрузки клас ошибки
	                var input_counter = 0; //счетчик заполненіх ответов(конкретно заполненіх инпутов)
	                var autopen_id = 0; //идентификатор ответа для автозагрузки

	                for (var j = 0; j < 4; j++) {//цикл 4 ответа по номеру в масиве
	                    var question_number = j + 1;//номер ответа в каркасе с единицы
	                    var $input = $wrap.find('.step_form_input[data-number="' + question_number + '"]').find('textarea[name="answer_text"]');//получение конкретно инпута ответа
	                    $input.attr('data-id', question.id + '_' + question_number);//заполнение ИД
	                    $input.attr('data-id-b', question.id + '_' + question_number);//заполнение маски ИД

	                    /*---- формирование второй части ИД ответов на вопросы(часть номера вопроса) старт-------*/
	                    var question_part = question_id.split('_');//получаем ИД 
	                    question_part = parseInt(question_part[question_part.length - 1]);
	                    //question_id = 0; question_part = 0;
	                    //question_id = 1_1; question_part = 1;
	                    //question_id = 2_2; question_part = 2;

	                    if (question_part == 0) {
	                        question_part = 1;
	                    }

	                    question_part = (question_part - 1) * 4 + question_number;
	                    //question_id = 0; question_part = question_number
	                    //question_id = 1_1; question_part = question_number
	                    //question_id = 2_2; question_part = 4+question_number

	                    /*---- формирование второй части ИД ответов на вопросы конец-------*/

	                    var step_part = step + 1;//часть ИД вопроса отвечающая за шаг формы
	                    var next_question_id = step_part + '_' + question_part;//формирование идентификторв следующего вопроса
	                    $input.attr('data-next-question', next_question_id);//записываем его в аторибут

	                    $input.removeClass('error-input').val('').closest('.step_form_input').removeClass('on_step_line');//скидываем инпут к дефолту
	                    //console.log('$input = ',$input);
	                    if (if_defined(question.answers[j])) {//если ответ есть в кеше
	                        if (if_defined(question.answers[j].id) && if_defined(question.answers[j].text)) {//если у ответа обозначен ИД и текст

	                            var cached_next_question = question.answers[j].nextQueston;
	                            if(cached_next_question != next_question_id){

	                                remove_conflict_in_questions(i,j,cached_next_question,next_question_id);//удаляем конфликт в вопросах
	                                lp3_rebuild_question_cache();
	                                lp3_edit.view.reload_question(question_id);
	                                return false;
	                                
	                            }else{

	                                //заполняем, заполняем ласт-пушед, добавляем клас активного откта
	                                $input.val(question.answers[j].text).attr('data-next-question', cached_next_question);
	                                if (j == 0) {
	                                    $input.closest('.step_form_input').addClass('on_step_line').closest('.answer_field').addClass('on_step_line');
	                                }
	                                input_counter++;//+1 к счетчику заполнены ответов

	                                if (autopen_id == 0) {//если автовывод еще не обозначен
	                                    autopen_id = cached_next_question;//забираем его с кеша
	                                }

	                            }

	                        }

	                    } 
	                }

	                console.log('input_counter = ', input_counter);


	                //если ответов 0
	                if (input_counter == 0) {
	                    $wrap.next('.form_step').removeClass('active').next('.form_step').removeClass('active').next('.form_step').removeClass('active');//скрыть остальные ответы
	                } else {

	                    if (input_counter == 1) {//если количество полей равно 1
	                        console.log('autopen_id = ', autopen_id);

	                    } else {//если не равно один - показать следующий ответ

	                        $wrap.next('.form_step').addClass('active');
	                    }
	                    lp3_check_qestion(autopen_id);//проверить существование вопроса если не существет - создать

	                    lp3_edit.view.reload_question(autopen_id);//автозагрузка вопроса

	                }


	                if (step > 0) {//если это не 1 шаг
	                    var finded_way = false;//флаг правельности шага
	                    $wrap.prev().find('textarea[name="answer_text"]').each(function(index) {//цикл по ответах в предидущем шаге
	                        if ($(this).attr('data-next-question') == question_id) {//если соответсвуют идентификаторы
	                            $(this).closest('.form_step').attr('data-chosen', index + 1);//записываем в врап этапа выбранный ответ(индекс с 0)
	                            // $(this).closest('.step_form_input').addClass('on_step_line');//накидываем клас пути
	                            // $(this).next('span.show_next').addClass('active');//включаем у полученого елемента "срелочку пути"
	                            finded_way = true;//путь сущетсвет
	                        }
	                    });
	                    if (!finded_way) {//если пути не найдено

	                        lp3_edit.view.reload_question(lp3_questions_get_prew_id_by_id(question_id));//перезагрузить предыдущий ответ
	                        lp3_edit.view.reload_question(question_id);//перезагрузить текущий вопрос
	                        lp3_edit.view.reload_question_way();//переформировать путь
	                        //lp3_reload_question(question_id);
	                    } else {




	                    }
	                }

	                $wrap.attr('data-id', question_id).addClass('active');//отобразить врап етапа и записать ИД
	            }
	        }

	        if (if_defined(_this)) {
	        	var $this = $(_this);
	            $this.closest('.form_step').find('.step_form_input').removeClass('on_step_line')
	            $this.closest('.step_form_input').addClass('on_step_line').closest('.answer_field').addClass('on_step_line');
	        }

	    } else {

	    }
	},
	reload_question_way:function() {
    
	    var $wrap = lp3_edit.view.wrap.find('#questions_col');//врап ответов

	    $wrap.find('.form_step').each(function() {//цикл по каждой колонке отображения

	    	var $this = $(this);

	        var question_id = $this.attr('data-id');//получение идентификатора впороса

	        if (if_defined(question_id)) {//если он существует
	            var $target_row = $this.prev('.form_step');//целевая колонка шага
	            $target_row.find('textarea[data-next-question]').closest('.step_form_input').removeClass('on_step_line');//отключаем активные классы пути
	            var $input = $target_row.find('textarea[data-next-question="' + question_id + '"]');//целеовй ответ
	            $input.closest('.step_form_input').addClass('on_step_line');//накидываем клас пути
	            // $input.closest('.step_form_input').trigger('click');//накидываем клас пути
	            var chosen = $input.closest('.step_form_input').attr('data-number');//номер ответа
	            $target_row.attr('data-chosen', chosen); //записываем выбранный ответ в атрибут колонки шага
	        }

	    });
	},
	bad_validate_questions:function(validate_obj){

	    lp3_edit.view.reload_question(validate_obj.id);//перезагружаем в отображение вопрос по ИД
	    var step = validate_obj.id.split('_')[0];//получаем шаг
	    var $wrap = lp3_edit.view.wrap('#questions_col').find('.form_step[data-step="' + step + '"]');//врап = колокнка шга
	    //var error_text = '';
	    console.log('validate_obj = ', validate_obj);
	    if (!validate_obj.text) {//проверка текста
	        $wrap.find('textarea[name="question_text"]').addClass('error-input');//добавляем клас ошибки
	    } else {
	        $wrap.find('textarea[name="question_text"]').removeClass('error-input');//убираем клас ошибки

	    }
	    if (!validate_obj.background) {//проверка фонаответов

	        $wrap.find('label.upload_file_btn').addClass('error-button');//добавляем клас ошибки
	        $wrap.find('input[name="qestion_bg_d"]').addClass('error-input');//добавляем клас ошибки
	    } else {
	        $wrap.find('label.upload_file_btn').removeClass('error-button');//убираем клас ошибки
	        $wrap.find('input[name="qestion_bg_d"]').removeClass('error-input');//убираем клас ошибки

	    }
	    if (validate_obj.answers > 0) {//проверка ответов
	        for (var z = 0; z < 4; z++) {// цикл по ответам
	            var number = z + 1;//номер ответа с 1ницы
	            var $input = $wrap.find('.step_form_input[data-number="' + number + '"]').find('textarea');//получение инпута
	            //var error_input_count = 0;
	            if ($input.val() == '') {//если значение пусто
	                $input.addClass('error-input').addClass('error-answer-must');//накидываем класс ошибки и класс "обязательности ответа"
	                validate_obj.answers--;//уменьшаем количество инпутов в валидационном объекте
	            }
	            if (validate_obj.answers == 0) {//если количество оставшихся для валидации 0 - выходим из цикла
	                z = 4;
	            }
	        }
	    }
	    lp3_edit.view.reload_question_way();
	},
	clean_values:function() {

	    var $wrap = lp3_edit.view.wrap;

	    $wrap.find('.valid').unbind('blur', lp3_edit.events.valid_input_blur_handler);

	    for (var i = 0; i < lp3_edit.model.templates_input_array.length; i++) {
	        var template =  lp3_edit.model.templates_input_array[i];

	        $wrap.find(template.selector).val(template.default).attr('data-last-pushed', template.default).attr('data-page-part', template.part).trigger('blur');
	    }


	    $wrap.find('.domain').removeAttr('data-pasted-value'); //удаляем значение атрибута для проверки смены домена
	    // $wrap.find('.logo_view').removeAttr('style'); //удаляем атрибут стиль(в котором вероятно старый логотип) с предпросмотра лого

	    //$wrap.find('.step').removeClass('valid_step'); //
	    $wrap.find('.error_info').text(''); //


	    $wrap.find('.trig_btn').removeClass('active'); //удаляем со всех перемычек активный класс
	    // $('#questions_col').hide();
	    //кидываем настройки полей формы к дефолту при этом набрасывая клас сlean который будет блокировать валидацию при автоматическом вставлянии данных

	    $wrap.find('.trig_btn[data-target="form_input"]').closest('.field_inp').removeClass('active'); //удаляем со всех перемычек активный класс

	    $wrap.find('.form_name,.form_phone,.form_email,.form_custom,input[name="input_count"]').val('0').attr('data-last-pushed', '0');

	    // if (!$wrap.find('.trig_btn[data-input="email"]').hasClass('active')) {
	    //     $wrap.find('.trig_btn[data-input="email"]').trigger('click');
	    // }
	    // if ($wrap.find('.trig_btn[data-input="custom"]').hasClass('active')) {
	    //     $wrap.find('.trig_btn[data-input="custom"]').trigger('click');
	    // }
	    // if ($wrap.find('.trig_btn[data-input="name"]').hasClass('active')) {
	    //     $wrap.find('.trig_btn[data-input="name"]').trigger('click');
	    // }
	    // if (!$wrap.find('.trig_btn[data-input="phone"]').hasClass('active')) {
	    //     $wrap.find('.trig_btn[data-input="phone"]').trigger('click');
	    // }
	    $wrap.find('.trig_btn[data-input="name"]').addClass('active').closest('.field_inp').addClass('active');
	    $wrap.find('.trig_btn[data-input="phone"]').addClass('active').closest('.field_inp').addClass('active');

	    //удаяем все "ошибочные" классы, так как это очистка(сброс на дефолт)
	    lp3_edit.view.wrap.find('.error-input').removeClass('error-input');
	    lp3_edit.view.wrap.find('.error-button').removeClass('error-button');
	    $wrap.find('.valid').bind('blur', lp3_edit.events.valid_input_blur_handler);


	},
	clean_blocks:function() {
	    var $page_wrap = lp3_edit.view.wrap;
	    var $all_wrap = $page_wrap.find('.block_row');


	    $all_wrap.find('.block_bg_d').val('');
	    $all_wrap.find('.block_bg_m').val('');
	    $all_wrap.find('.block_slide_image').val('');
	    $all_wrap.find('.block_slide_video').val('0');
	    $all_wrap.find('.block_slide_content').val('');
	    $all_wrap.find('.block_name').val('');
	    $all_wrap.find('.trig_btn').removeClass('active');
	    $all_wrap.find('.trig_line').each(function(){
	        $($(this).find('.trig_wrap')[0]).removeClass('active');
	        $($(this).find('.trig_wrap')[1]).addClass('active');
	    });


	    var $block_wrap = $page_wrap.find('.block_trig_wrap');

	    $block_wrap.removeClass('active');
	    $block_wrap.find('.block_trig_btn').removeClass('active');
	    $block_wrap.find('.block_bg_d').val('0');
	    $block_wrap.find('.block_bg_m').val('0');
	    $block_wrap.find('.block_slide_image').val('0');
	    $block_wrap.find('.block_slide_video').val('0');
	    $block_wrap.find('.block_slide_content').val('0');
	    $block_wrap.find('.block_name').val('0');

	    $all_wrap.find('.i-sync').hide();
	},
	reload_blocks_block:function() {
		if(!if_defined(lp3_edit.model.cur_data[2].blocks)){
			lp3_edit.model.cur_data[2].blocks = [];
		}
	    var blocks = lp3_edit.model.cur_data[2].blocks;
	    var $wrap = lp3_edit.view.wrap;

	    var $blocks = $wrap.find('.block_row');

	    //if(blocks.length<2){
	    lp3_edit.view.clean_blocks();
	    //}

	    $blocks.each(function(index) {

	    	var $bthis = $(this);

	        var $slides = $bthis.find('.slide_element');

	        if (if_defined(blocks) && if_defined(blocks[index])) {


	            //$slide_wrap.html('');
	            $bthis.find('.block_trig_wrap').addClass('active');
	            $bthis.find('.block_trig_btn').addClass('active');

	            //var slides_string = '';

	            if (blocks[index].name != '0') {


	                $bthis.find('input[name="block_bg_d"]').val(blocks[index].backgroundImageDesktop).attr('data-last-pushed', blocks[index].backgroundImageDesktop);
	                $bthis.find('input[name="block_bg_m"]').val(blocks[index].backgroundImageMobile).attr('data-last-pushed', blocks[index].backgroundImageMobile);
	                $bthis.find('input[name="block_name"]').val(blocks[index].name).attr('data-last-pushed', blocks[index].name);

	                if (blocks[index].backgroundImageDesktop != 0) {
	                    $bthis.find('.trig_btn[data-target="block_bg"]').addClass('active');
	                }

	                var slides_count = 0;

	                $slides.each(function(index2) {
	                	
	                	var $sthis = $(this);

	                    if (if_defined(blocks[index].slides[index2])) {

	                        if (if_defined(blocks[index].slides[index2].file)) {

	                            var file = blocks[index].slides[index2].file;
	                            var video, image;
	                            if (file.indexOf('dnk.bz') > -1) {
	                                video = '0';
	                                image = file;
	                                if ($sthis.find('.trig_btn').hasClass('active')) {
	                                    $sthis.find('.trig_btn').trigger('click');
	                                }
	                                slides_count++
	                            } else if (file != '0') {
	                                video = 'https://www.youtube.com/watch?v=' + file;
	                                image = '0';
	                                if (!$sthis.find('.trig_btn').hasClass('active')) {
	                                    $sthis.find('.trig_btn').trigger('click');
	                                }
	                                slides_count++
	                            } else {
	                                file = '0';
	                                video = '0';
	                                image = '0';
	                                if ($sthis.find('.trig_btn').hasClass('active')) {
	                                    $sthis.find('.trig_btn').trigger('click');
	                                }
	                            }

	                            if (index2 > 0 && file == '0') {

	                                image = '0';
	                                video = '0';
	                                file = '0';
	                                $sthis.removeClass('active');
	                            } else {
	                                if (file == '0') {
	                                    image = '';
	                                    video = '0';
	                                    file = '';

	                                }
	                                $sthis.addClass('active');
	                            }

	                        } else {
	                            file = '0';
	                            video = '0';
	                            image = '0';
	                            if ($sthis.find('.trig_btn').hasClass('active')) {
	                                $sthis.find('.trig_btn').trigger('click');
	                            }

	                            if (index2 > 0 && file == '0') {
	                                $sthis.removeClass('active');
	                            } else {
	                                file = '';
	                                video = '0';
	                                image = '';
	                                $sthis.addClass('active');
	                            }
	                        }


	                        $sthis.find('input[name="block_slide_content"]').removeClass('active').val(file).attr('data-last-pushed', file);
	                        $sthis.find('input[name="block_slide_image"]').removeClass('active').val(image).attr('data-last-pushed', image);
	                        $sthis.find('input[name="block_slide_video"]').removeClass('active').val(video).attr('data-last-pushed', video);


	                        if (if_defined(blocks[index].slides[index2].description)) {
	                            $sthis.find('input[name="block_slide_title"]').addClass('active').val(blocks[index].slides[index2].description).attr('data-last-pushed', blocks[index].slides[index2].description);

	                        } else {
	                            $sthis.find('input[name="block_slide_title"]').removeClass('active').val('').attr('data-last-pushed', '');
	                        }

	                    } else {

	                        $sthis.find('input[name="block_slide_title"]').removeClass('active').val('').attr('data-last-pushed', '');
	                        $sthis.find('input[name="block_slide_content"]').removeClass('active').val('0').attr('data-last-pushed', '0');
	                        $sthis.find('input[name="block_slide_image"]').removeClass('active').val('0').attr('data-last-pushed', '0');
	                        $sthis.find('input[name="block_slide_video"]').removeClass('active').val('0').attr('data-last-pushed', '0');

	                        if (index2 > 0) {

	                            $sthis.removeClass('active');
	                        } else {
	                            $sthis.find('input[name="block_slide_title"]').removeClass('active').val('').attr('data-last-pushed', '');
	                            $sthis.find('input[name="block_slide_content"]').removeClass('active').val('').attr('data-last-pushed', '');
	                            $sthis.find('input[name="block_slide_image"]').removeClass('active').val('').attr('data-last-pushed', '');
	                            $sthis.find('input[name="block_slide_video"]').removeClass('active').val('0').attr('data-last-pushed', '0');
	                            $sthis.addClass('active');

	                        }

	                    }

	                });

	                if (slides_count == 7) {
	                    $bthis.find('.slides_button').closest('.block_button').removeClass('active');
	                } else {
	                    $bthis.find('.slides_button').closest('.block_button').addClass('active');
	                }

	            }

	        } else {
	            if (index > 0) {

	                $slides.each(function(index2) {

	                	var $sthis = $(this);
	                    $sthis.find('input[name="block_slide_title"]').removeClass('active').val('').attr('data-last-pushed', '');
	                    $sthis.find('input[name="block_slide_content"]').removeClass('error-input').val('0').attr('data-last-pushed', '0');
	                    $sthis.find('input[name="block_slide_image"]').removeClass('error-input').val('0').attr('data-last-pushed', '0');
	                    $sthis.find('input[name="block_slide_video"]').removeClass('error-input').val('0').attr('data-last-pushed', '0');

	                    $sthis.find('label.upload_file_btn.error-button').removeClass('error-button');

	                    if (index2 > 0) {

	                        $sthis.removeClass('active');

	                    } else {

	                        $sthis.addClass('active');

	                    }

	                });

	                $bthis.find('input[name="block_name"]').val('0').trigger('blur');
	                $bthis.find('input[name="block_bg_m"]').val('0').trigger('blur');
	                $bthis.find('input[name="block_bg_d"]').val('0').trigger('blur');

	            } else {
	                $slides.each(function(index2) {
	                	var $sthis = $(this);

	                    $sthis.find('input[name="block_slide_title"]').removeClass('active').val('').attr('data-last-pushed', '');
	                    $sthis.find('input[name="block_slide_content"]').removeClass('error-input').val('0').attr('data-last-pushed', '0');
	                    $sthis.find('input[name="block_slide_image"]').removeClass('error-input').val('0').attr('data-last-pushed', '0');
	                    $sthis.find('input[name="block_slide_video"]').removeClass('error-input').val('0').attr('data-last-pushed', '0');

	                    $sthis.find('label.upload_file_btn.error-button').removeClass('error-button');

	                    if (index2 > 0) {

	                        $sthis.removeClass('active');
	                    } else {
	                        $sthis.find('input[name="block_slide_title"]').removeClass('active').val('').attr('data-last-pushed', '');
	                        $sthis.find('input[name="block_slide_content"]').removeClass('error-input').val('').attr('data-last-pushed', '');
	                        $sthis.find('input[name="block_slide_image"]').removeClass('error-input').val('').attr('data-last-pushed', '');
	                        $sthis.find('input[name="block_slide_video"]').removeClass('error-input').val('0').attr('data-last-pushed', '0');

	                        $sthis.addClass('active');

	                    }

	                });

	                $bthis.find('input[name="block_name"]').val('');
	                $bthis.find('input[name="block_bg_m"]').val('');
	                $bthis.find('input[name="block_bg_d"]').val('');
	            }

	        }

	        if (index > 0) {
	            if (blocks.length > index) {
	                if (!$bthis.closest('.trig_btn[data-target="block_row"]').hasClass('active')) {
	                    $bthis.closest('.trig_btn[data-target="block_row"]').trigger('click');
	                }
	            } else {
	                if ($bthis.closest('.trig_btn[data-target="block_row"]').hasClass('active')) {
	                    $bthis.closest('.trig_btn[data-target="block_row"]').trigger('click');
	                }
	            }

	            lp3_edit.view.live_iframe_change($bthis);

	            lp3_edit.view.reload_blocks_fancy_in_iframe();

	        }

	        // if (blocks.length < index && index > 1) {

	        //     if ($(this).find('input[name="block_name"]').val() == '0') {

	        //         //$(this).find('.block_row_shadow').children('.trig-wrap').hide();
	        //         //$(this).find('.block_row_shadow').children('.trig.to_right').removeClass('active');

	        //     } else {


	        //         // $(this).find('.block_row_shadow').children('.trig_wrap').show();
	        //         // $(this).find('.block_row_shadow').children('.trig_btn').addClass('active');

	        //     }

	        // } else {}

	    });

	    setTimeout(function(){
	        $blocks.find('.i-sync').hide(); //спрятать иконку синхронизации
	    },500);

	},
	paste_page_data_from_cache:function() {
		////alert('paste_page_data_from_cache '+lp3_edit.model.cur_data.quiz);

	    var form_in_cache = lp3_edit.model.cur_data['form'];
	    var screen_1_in_cache = lp3_edit.model.cur_data['1'];
	    var screen_2_in_cache = lp3_edit.model.cur_data['2'];
	    var screen_3_in_cache = lp3_edit.model.cur_data['3'];
	    var main_in_cache = lp3_edit.model.cur_data['main'];

	    console.log(form_in_cache, screen_1_in_cache, screen_2_in_cache, screen_3_in_cache, main_in_cache);

	    var key1, key2, key3, key4, key5, template;

	    var $wrap = lp3_edit.view.wrap;

	    $wrap.find('.valid').unbind('blur', lp3_edit.events.valid_input_blur_handler);




	    for (key1 in form_in_cache) {
	        if (form_in_cache.hasOwnProperty(key1)) {
	            for (var i = 0; i < lp3_edit.model.templates_input_array.length; i++) {
	                template = lp3_edit.model.templates_input_array[i];
	                if (template.part == 'form' && template.key == key1) {



	                    var key = template.key;

	                    if (if_defined(form_in_cache[key1])) {

	                        $wrap.find(template.selector).val(form_in_cache[key1]).attr('data-last-pushed', form_in_cache[key1]).trigger('blur');

	                    }

	                    if (key == 'custom' || key == 'email' || key == 'phone' || key == 'name') { //аналогичная обработка чебкокса
	                        if (form_in_cache[key] != '0') {
	                            if (!$wrap.find('.trig_btn[data-input="' + key + '"]').hasClass('active')) {
	                                // $wrap.find('.trig_btn[data-input="' + key + '"]').trigger('click');
	                                $wrap.find('.trig_btn[data-input="' + key + '"]').addClass('active').closest('.field_inp').addClass('active');
	                            }

	                        } else {
	                            if ($wrap.find('.trig_btn[data-input="' + key + '"]').hasClass('active')) {
	                                // $wrap.find('.trig_btn[data-input="' + key + '"]').trigger('click');
	                                $wrap.find('.trig_btn[data-input="' + key + '"]').removeClass('active').closest('.field_inp').removeClass('active');
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

	                }
	            }
	        }
	    }


	    for (key2 in screen_1_in_cache) {
	        if (screen_1_in_cache.hasOwnProperty(key2)) {
	            for (var j = 0; j < lp3_edit.model.templates_input_array.length; j++) {
	                template = lp3_edit.model.templates_input_array[j];
	                if (template.part == '1' && template.key == key2) {


	                    if (key2 == 'backgroundVideo' || key2 == 'contentVideo') { //если это видео на фон либо продающее
	                        if (screen_1_in_cache[key2] != '0') { //если наполнение не == 0 (отключено/нету)
	                            //переводим ИД в ссылку ютуб
	                            var file = screen_1_in_cache[key2];
	                            if (file.indexOf('http') <= -1 && file != '') {
	                               screen_1_in_cache[key2] = screen_1_in_cache[key2].replace(screen_1_in_cache[key2], 'https://www.youtube.com/watch?v=' + screen_1_in_cache[key2]);
	                            
	                            }
	                            
	                        }
	                    }




	                    if (if_defined(screen_1_in_cache[key2])) {
	                        $wrap.find(template.selector).val(screen_1_in_cache[key2]).attr('data-last-pushed', screen_1_in_cache[key2]).trigger('blur');
	                    }
	                }
	            }
	        }
	    }


	    for (key3 in screen_2_in_cache) {
	        if (screen_2_in_cache.hasOwnProperty(key3)) {
	            for (var k = 0; k < lp3_edit.model.templates_input_array.length; k++) {
	                template = lp3_edit.model.templates_input_array[k];
	                if (template.part == '2' && template.key == key3 && if_defined(screen_2_in_cache[key3])) {
	                    $wrap.find(template.selector).val(screen_2_in_cache[key3]).attr('data-last-pushed', screen_2_in_cache[key3]).trigger('blur');
	                }
	            }
	        }
	    }

	    for (key4 in screen_3_in_cache) {
	        if (screen_3_in_cache.hasOwnProperty(key4)) {
	            for (var l = 0; l < lp3_edit.model.templates_input_array.length; l++) {
	                template = lp3_edit.model.templates_input_array[l];
	                if (template.part == '3' && template.key == key4 && if_defined(screen_3_in_cache[key4])) {
	                    $wrap.find(template.selector).val(screen_3_in_cache[key4]).attr('data-last-pushed', screen_3_in_cache[key4]).trigger('blur');
	                }
	            }
	        }
	    }

	    for (key5 in main_in_cache) {
	        if (main_in_cache.hasOwnProperty(key5)) {
	            for (var y = 0; y < lp3_edit.model.templates_input_array.length; y++) {
	                template = lp3_edit.model.templates_input_array[y];
	                if (template.part == 'main' && template.key == key5) {



	                    if (key5 == 'logoImage') { //аналогичная обраотка для логотипа
	                        if (main_in_cache[key5] != '0') {
	                            $('.preview').attr('data-logo', '1');
	                        }
	                    }
	                    if (if_defined(main_in_cache[key5])) {
	                        $wrap.find(template.selector).val(main_in_cache[key5]).attr('data-last-pushed', main_in_cache[key5]).trigger('blur');
	                    }
	                }
	            }
	        }
	    }
	    var cur_id = getURLParameter('i');
	    if(if_defined(lp3_edit.model.cur_data.id)){

	    	var cur_id = lp3_edit.model.cur_data.id
			console.log('lp3_edit.model.cur_data.id = ' + lp3_edit.model.cur_data.id);

	    }


		lp3_edit.view.wrap.find('.preview').attr('href', 'http://client.dnk.bz/'+cur_id+'/');
	    	

	    
	    $wrap.find('.valid').bind('blur', lp3_edit.events.valid_input_blur_handler);

	},
	init_steps_slider:function() {
		
		var $wrap = lp3_edit.view.wrap;

		var $slider = $wrap.find('.steps_slider');
		if (!$slider.hasClass('initedSlider')) {
			lp3_edit.view.step_slider = $slider.bxSlider({
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
					lp3_edit.view.to_next_step(+newIndex+1);
					updateQueryStringParam('p',+newIndex+1);

					if(newIndex == 3 && if_defined(lp3_edit.model.cur_data.quiz)){

						lp3_edit.view.wrap.addClass('quiz_lock');

					}else{

						lp3_edit.view.wrap.removeClass('quiz_lock');
					}
				},
				onSlideAfter: function($slideElement, oldIndex, newIndex) {
					lp3_edit.view.resize_edit_frame();
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
    		//lp1_edit.events.rebind();

			var page = getURLParameter('p');
			
			if(page){

				lp3_edit.view.step_slider.goToSlide(parseInt(page)-1);

			}else{
			
				lp3_edit.view.step_slider.goToSlide(0);
			
			}
			
			if ($wrap.find('.iframe_wrap iframe').length > 0) {
				lp3_edit.view.resize_edit_frame(); // змаштабировать iframe
			}
		}	
	},
	to_next_step:function(next) {
		var $steps_btn = lp3_edit.view.wrap.find('.steps_pager_item');
		$steps_btn.removeClass('active passed');
		console.log('to_next_step(',next,')')
		$($steps_btn[+next-1]).addClass('active');
		for (var i=0; i<+next; i++) {
			$($steps_btn[i]).addClass('passed');
		}
		// if (next === 2 || next === 3 || next === 4) {
		// 	lp3_edit.view.scroll_iframe_to_selector('.sec1');
		// } else if (next === 5) {
		// 	lp3_edit.view.scroll_iframe_to_selector('.sec2');

		// } else if (next === 6) {
		// 	lp3_edit.view.scroll_iframe_to_selector('.sec3');

		// }
		var $wrap = lp3_edit.view.wrap;
		if(next == 7){
			$wrap.addClass('last_page_active');

			lp3_edit.model.init_helpers();
		}else{

			$wrap.removeClass('quiz_lock');
			$wrap.removeClass('last_page_active');

		}

			lp3_edit.view.wrap.find('.main').removeClass('for_wide_step');
		//}
	},
	validate_step:function(step_num){
		console.log('validate_step');
		var $wrap = lp3_edit.view.wrap;

		var $this_step = $wrap.find('.step[data-step="'+step_num+'"]');
		$wrap.find('.error-input,.error-button').removeClass('error-input error-button');
		$this_step.removeClass('valid_step');

		// validate.wrap($this_step,function(){

		// 	$this_step.addClass('valid_step');
		// });
		
		if ($this_step.find('.error-input,.error-button').length > 0) {

			
			return false;

		} else {

			
			return true;
		}
	},
	init_go_to_step:function(current, next) {
		console.log('init_go_to_step(',current, next,')')
		if (next < current) {
			lp3_edit.view.step_slider.goToSlide(next-1);
		} else if (lp3_edit.view.step_slider) {
			// for (var i=1; i<next; i++) {
			// 	if (!lp3_edit.view.wrap.find('.step[data-step="'+i+'"]').hasClass('valid_step')) {
			// 		if(!lp3_edit.view.validate_step(i)) {
			// 			lp3_edit.view.step_slider.goToSlide(i-1);
			// 			return;
			// 		}
			// 	}
			// }
			lp3_edit.view.step_slider.goToSlide(next-1);
		}
	},

	insert_edit_frame:function(callback){

		function ready_frame(){


			lp3_edit.view.edit_frame = document.getElementById("for_preview_lp3").contentWindow;
			lp3_edit.view.edit_frame_body = lp3_edit.view.wrap.find('#for_preview_lp3').contents();

			if(callback){
				
				callback();

			}else{

				lp3_edit.view.insert_full_data_in_frame();
			}

			lp3_edit.view.resize_edit_frame(); // змаштабировать iframe

		}

		var frame_src = source_url+"/frame/lp3_template/"

		var $lp1_ed = lp1_edit.view.wrap;

		var $div = $lp1_ed.find('.iframe_wrap'); // находим нужный слайд

		// var iframe = '<iframe id="for_preview_lp1" width="100%" height="100%" src="lp1_template/"></iframe>'; // создать iframe
		var $iframe = $div.find('#for_preview_lp3');


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

		var $lp3_ed = lp3_edit.view.wrap;
		var $iframe_wrap = $lp3_ed.find('.iframe_wrap');

		if ($iframe_wrap.find('iframe').length < 1 || $(window).width() < 768) return;
		

		var lp3_W = parseInt($(window).width());
		var lp3_H = parseInt($(window).height());
		var steps_right_offset = Math.abs(parseInt($lp3_ed.find('.steps_wrap').css('margin-right')));
		var steps_top_offset = parseInt($lp3_ed.find('.header').height());
		
		var divW = lp3_W - steps_right_offset; // ширина блока з iframe
		var divH = lp3_H - steps_top_offset; // ширина блока з iframe

		console.log('lp3_H = ',lp3_H,'; divH = ',divH);

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

        	lp3_edit.model.load_quiz(quiz_editor.model.q_data.content);
        	
		}	

		console.log('lp3_H = ',lp3_H,'; divH = ',divH);

		if(lp3_edit.view.resize_frame_timer){
			clearTimeout(lp3_edit.view.resize_frame_timer);
		}
		
		var $iframe = $iframe_wrap.find('iframe')
		
		if($iframe.width()!=divW || $iframe.height()!=divH){
			
			$iframe_wrap.addClass('blacked');
			
			$iframe_wrap.width(divW+'px');



			lp3_edit.view.resize_frame_timer = setTimeout(function(){


				// if(lp1_edit.view.resize_frame_timer){
				// 	clearTimeout(lp1_edit.view.resize_frame_timer);
				// }

				$iframe.width(divW+'px');
				$iframe.height(divH+'px');

				setTimeout(function(){
					$iframe_wrap.removeClass('blacked');
				},400);


			},200);
			
		}

	},	
	live_iframe_change:function($this) {
		var $lp3_ed = lp3_edit.view.wrap;
		if ($lp3_ed.find('.iframe_wrap').find('iframe').length < 1 || $(window).width() < 768) return;

		var $iframe = lp3_edit.view.edit_frame_body;
		var iFrame = lp3_edit.view.edit_frame;
		var $view_body = $iframe.contents();

		var data_type = $this.attr('data-input-type');
		var data_last_pushed = $this.attr('data-last-for-iframe');
		var val = $this.val();

		var $rend_el;
		var gentime = new Date().getTime();
		
		if (val == data_last_pushed 
		&& data_type != 'bg_ekran_1_d' 
		&& data_type != 'logo_img' 
		&& data_type != 'bg_ekran_2_d'
		&& data_type != 'block_bg_d'
		&& data_type != 'form_bg_d'
		&& !$this.hasClass('block_row')) return;

		if (val == data_last_pushed){
			if(data_type == 'bg_ekran_1_d'||
				data_type == 'logo_img'||
				data_type == 'bg_ekran_2_d'||
				data_type == 'block_bg_d'||
				data_type == 'block_slide_content'||
				data_type == 'form_bg_d'){
				return
			}
				
		}
		if (val == data_last_pushed) return;

		lp3_edit.view.close_fancy_in_iframe();

		// screen 1
		if (data_type == 'descriptor') {
			if (val == '') $view_body.find('.descr>span').text('Дескриптор');
			else $view_body.find('.descr>span').text(val);
			$rend_el = $view_body.find('.descr>span');

		} else if (data_type == 'offer_h1') {
			if (val == '') $view_body.find('#h1').text('Оффер основа');
			else $view_body.find('#h1').text(val);
			$rend_el = $view_body.find('h1.h1>span');

		} else if (data_type == 'offer_h2') {
			if (val == '') $view_body.find('#h2').text('Оффер преимущество');
			else $view_body.find('#h2').text(val);
			$rend_el = $view_body.find('h2.h2>span');

		} else if (data_type == 'pre_form_button') {
			if (val == '') $view_body.find('.pre-form .btn>span').text('Надпись на кнопке ведущей к форме');
			else $view_body.find('.pre-form .btn>span').text(val);
			$rend_el = $view_body.find('.pre-form .btn>span');

		} else if (data_type == 'lp3_pre_form_offer') {
			if (val == '0') {
				$view_body.find('.pre-form .h3>span').text('');
				$view_body.find('body').attr('data-pre-form-offer', '0');
			} else if (val == '') {
				$view_body.find('.pre-form .h3>span').text('Дополнительный оффер');
				$view_body.find('body').attr('data-pre-form-offer', '1');
			} else {
				$view_body.find('.pre-form .h3>span').text(val);
				$view_body.find('body').attr('data-pre-form-offer', '1');
			}
			$rend_el = $view_body.find('.pre-form .h3>span');

		} else if (data_type == 'page_email') {
			if (val == '') {
				$view_body.find('.email>span').text('Email на странице');
				$view_body.find('input[name="email"]').attr('placeholder', 'Email');
			} else {
				$view_body.find('.email>span').text(val);
				$view_body.find('input[name="email"]').attr('placeholder', val);
			}
			$rend_el = $view_body.find('.email>span');
			
		} else if (data_type == 'act_email') {
			if (val == '') $view_body.find('input[name="act_e"]').val('act_email@gmail.com');
			else $view_body.find('input[name="act_e"]').val(val);
			
		} else if (data_type == 'page_addr') {
			if (val == '') $view_body.find('.addr>span').text('Адрес на странице');
			else $view_body.find('.addr>span').text(val);
			$rend_el = $view_body.find('.addr>span');
			
		} else if (data_type == 'ph1') {
			if (val == '') {
				$view_body.find('#phone-link').text('Телефон для заявок');
				$view_body.find('input[name="phone"]').attr('placeholder', 'Телефон');
			} else {
				$view_body.find('#phone-link').text(val);
				$view_body.find('input[name="phone"]').attr('placeholder', val);
			}
			
		} else if (data_type == 'ph4') {
			$view_body.find('.a-phone').text(val);
			if ( if_defined(iFrame.make_phone_link) ) iFrame.make_phone_link();

		} else if (data_type == 'bg_ekran_1_d') {
			if (val != '0' && val != '') {
				$view_body.find('.body-wrap.sec1').css('background-image', 'url(' + val + '?' + gentime + ')');
			} else {
				$view_body.find('.body-wrap.sec1').css('background-image', 'url(img/bg_default.svg)');
			}

		} else if (data_type == 'bg_video') {
		 	
			if (youtube_parser(val)) {
				//$view_body.find('.sec1').css('background-image', 'none');
				$view_body.find('body').attr('data-bg-video', youtube_parser(val));
				$view_body.find('.video-background').show();
				iFrame.vid_bg = youtube_parser(val);
				if (if_defined(iFrame.init_bg_video)) {
					iFrame.init_bg_video();
				}
				if ( if_defined(iFrame.YT) ) iFrame.onYouTubeIframeAPIReady();
			} else {
				$view_body.find('body').attr('data-bg-video', '0');
				$view_body.find('.video-background').hide();
				$lp3_ed.find('.bg_img_d').trigger('blur');
				iFrame.vid_bg = '0';
			}
			
		} else if (data_type == 'view_video') {
			if (val != '0' && val != '') {
				var d = new Date();
				$view_body.find('.body-wrap .video-btn-wrap .text').html(val);
			} else {				
				$view_body.find('.body-wrap .video-btn-wrap .text').html('Посмотреть видео');
			}

		} else if (data_type == 'video') {

			if (youtube_parser(val)) {
				$view_body.find('body').attr('data-content-video', youtube_parser(val));
				$view_body.find('.block_play_video').show();
				$view_body.find('.video-wrap>img').css('opacity', '0');
				iFrame.vid_content = youtube_parser(val);

				if (if_defined(iFrame.init_bg_video)) {
					iFrame.init_bg_video();
				}
				if ( if_defined(iFrame.YT) ) iFrame.onYouTubeIframeAPIReady();
			} else {
				$view_body.find('.block_play_video').hide();
				$view_body.find('body').attr('data-content-video', '0');
				lp3_edit.view.live_iframe_change($lp3_ed.find('.bg_ekran_1_d'));
				iFrame.vid_content = '0';
				
			}

		} else if (data_type == 'logo_img') {
			if (val != '0' && val != '') {
				$view_body.find('.logo').css('background-image', 'url(' + val + '?' + gentime + ')');
				$view_body.find('body').attr('data-logo', 'url(' + val + '?' + gentime + ')');
			} else {
				$view_body.find('.logo').css('background-image', 'none');
				$view_body.find('body').attr('data-logo', '0');
			}
			
		} else if ($this.hasClass('bg_shadow')) {
			$view_body.find('.bg-shadow').css('opacity', val);
			var ui_val = parseFloat(val) * 100;
			$lp3_ed.find(".range_slider").slider("value", ui_val);
			$lp3_ed.find('.range_line').css('width', ui_val + '%');
		} 





		// screen 2
		else if (data_type == 'h2_ekran_2') {
			if (val == '') $view_body.find('#s2h2').text('Заголовок экрана');
			else $view_body.find('#s2h2').text(val);

		} else if (data_type == 'bg_ekran_2_d') {
			if (val != '0' && val != '') {
				$view_body.find('.body-wrap.sec2').css('background-image', 'url(' + val + '?' + gentime + ')');
			} else {
				$view_body.find('.body-wrap.sec2').css('background-image', 'none');
			}

		} else if ($this.hasClass('block_row')) {
			var block_num = $this.attr('data-block-row');
			var block_count = 1 + $this.closest('.step').find('.block_trig_btn.active').length;
			$view_body.find('body').attr('data-blocks-count', block_count);
			$lp3_ed.find('.block_trig_wrap .block_name').each(function(){
				lp3_edit.view.live_iframe_change($(this));
			});
			$lp3_ed.find('.block_trig_wrap .block_bg_d').each(function(){
				lp3_edit.view.live_iframe_change($(this));
			});

		} else if (data_type == 'block_name') {
			var block_num = $this.closest('.block_row').attr('data-block-row');
			var selector = '.block-wrap[data-block="' + block_num + '"]';
			if (val == '' || val == '0') $view_body.find(selector).find('.block-p>span').text('Название (заголовок) блока');
			else $view_body.find(selector).find('.block-p>span').text(val);

		} else if (data_type == 'block_bg_d') {
			var block_num = $this.closest('.block_row').attr('data-block-row');
			var selector = '.block-wrap[data-block="' + block_num + '"] .block';
			if (val != '0' && val != '') {
				$view_body.find(selector).css('background-image', 'url(' + val + '?' + gentime + ')');
			} else {
				$view_body.find(selector).css('background-image', 'none');
			}


		}




		// screen 3
		else if (data_type == 'h2_ekran_3') {
			if (val == '') $view_body.find('#s3h2').text('Заголовок экрана формы');
			else $view_body.find('#s3h2').text(val);

		} else if (data_type == 'form_head') {
			if (val == '') {
				$view_body.find('#outer-form .h3>span,#inner-form .h3>span').text('Надпись на форме');
			} else {
				$view_body.find('#outer-form .h3>span,#inner-form .h3>span').text(val);
			}
			$rend_el = $view_body.find('#outer-form .h3>span,#inner-form .h3>span');

		} else if (data_type == 'form_bg_d') {
			// if (if_defined(iFrame.global_json) && if_defined(iFrame.global_json.form)) {
				iFrame.global_json.form.backgroundImageDesktop = val + '?' +gentime;
				iFrame.global_json.form.backgroundImageMobile = val + '?' + gentime;
			// }
			if (val != '0' && val != '') {
				$view_body.find('.sec3').css('background-image', 'url(' + val + '?' + gentime + ')');
			}
			lp3_edit.view.reload_question_in_iframe();

		} else if ($this.hasClass('form_name')) {
			$view_body.find('body').attr('data-form-name', val);

		} else if ($this.hasClass('form_phone')) {
			$view_body.find('body').attr('data-form-phone', val);

		} else if ($this.hasClass('form_email')) {
			$view_body.find('body').attr('data-form-email', val);

		} else if ($this.hasClass('form_custom')) {
			$view_body.find('body').attr('data-form-custom', val);

		} else if ($this.hasClass('form_custom_name')) {
			if (val == '') $view_body.find('input[name="custom_name"]').val('Название поля');
			else $view_body.find('input[name="custom_name"]').val(val);

		} else if ($this.hasClass('form_custom_plac')) {
			if (val == '') $view_body.find('input[name="custom"]').attr('placeholder', 'Надпись на поле');
			else $view_body.find('input[name="custom"]').attr('placeholder', val);
			
		} else if (data_type == 'form_button') {
			if (val == '') {
				$view_body.find('#outer-form .btn>span,#inner-form .btn>span').text('Надпись на кнопке');
			} else {
				$view_body.find('#outer-form .btn>span,#inner-form .btn>span').text(val);
			}
			$rend_el = $view_body.find('#outer-form .btn>span,#inner-form .btn>span');

		} else if (data_type == 'aftersend_text') {
			if (val == '') $view_body.find('#sended .h3').text('Сообщение после отправки формы');
			else $view_body.find('#sended .h3').text(val);

		} else if (data_type == 'requsites_text') {
			if (val == '') $view_body.find('.requesits').text('Строка реквизитов снизу сайта');
			else $view_body.find('.requesits').text(val);

		}



		if (if_defined($rend_el)) {

			if ( if_defined(iFrame.change_main_text) ) iFrame.change_main_text($rend_el);


			if ( if_defined(iFrame.init_rendering) ){
				if(lp3_edit.view.frame_init_rendering_timer){
					clearTimeout(lp3_edit.view.frame_init_rendering_timer);
				}
				lp3_edit.view.frame_init_rendering_timer = setTimeout(function(){

					iFrame.init_rendering();
				},100);
			} 
		}

		$this.attr('data-last-for-iframe', val);

	},
	close_fancy_in_iframe:function() {

		if (lp3_edit.view.wrap.find('.iframe_wrap').find('iframe').length < 1 || $(window).width() < 768) return;

		var iFrame = lp3_edit.view.edit_frame;

		if (if_defined(iFrame.$)  && if_defined(iFrame.$.fancybox)) {
			iFrame.$.fancybox.close();
		}

	},
	open_fancy_element_in_iframe:function(group_num, index_num) {

		return; // Не нужна на данном етапе

		if (lp3_edit.view.wrap.find('.iframe_wrap').find('iframe').length < 1 || $(window).width() < 768) return;

		var iFrame = lp3_edit.view.edit_frame;

		var group = 'block_' + group_num;
		var index = index_num || 0;

		iFrame.$.fancybox.open(iFrame.gloabal_gallery[group], {
			index: index,
			maxWidth: '90%',
			maxHeight: '90%',
			padding: 0,
			nextEffect: 'fade',
			prevEffect: 'fade',
			fitToView: false,
			autoSize: false,
			helpers: {
				media: {},
				overlay: {
					locked: false
				},
				showEarly: false
			}
		});
	},
	reload_blocks_fancy_in_iframe:function() {


		if (lp3_edit.view.wrap.find('.iframe_wrap').find('iframe').length < 1 || $(window).width() < 768) return;

		var iFrame = lp3_edit.view.edit_frame;
		var $view_body = lp3_edit.view.edit_frame_body;

		if (if_defined(iFrame.global_json)) iFrame.global_json.screens[2].blocks = lp3_edit.model.cur_data[2].blocks;
		iFrame.gloabal_gallery = {
		    block_0: [],
		    block_1: [],
		    block_2: [],
		    block_3: []
		};
		if (if_defined(iFrame.blocks_init)) iFrame.blocks_init();

		var block_count = 1 + lp3_edit.view.wrap.find('.block_trig_btn.active').length;
		$view_body.find('body').attr('data-blocks-count', block_count);

	},
	insert_data_in_iframe:function(){

		if (lp3_edit.view.wrap.find('.iframe_wrap').find('iframe').length < 1) return;


	    // $view_body.find('.sec3').attr('data-question-form', '0');
	    // $view_body.find('.quest-wrap').html('');

		lp3_edit.view.wrap.find('.change_iframe').each(function() {
			lp3_edit.view.live_iframe_change($(this));
		});

		lp3_edit.view.reload_question_in_iframe();
		
	},
	reload_question_in_iframe:function() {

		var $lp3_ed = lp3_edit.view.wrap;

		if ($lp3_ed.find('.iframe_wrap').find('iframe').length < 1 || $(window).width() < 768) return;

		var iFrame = lp3_edit.view.edit_frame;

		if (if_defined(iFrame.global_json) && if_defined(iFrame.global_json.screens) && if_defined(iFrame.global_json.screens[3])) {
			if(if_defined(lp3_edit.model.cur_data[3].questions)){
				iFrame.global_json.screens[3].questions = lp3_edit.model.cur_data[3].questions;
				iFrame.form_questions = lp3_edit.model.cur_data[3].questions;
			}else{
				lp3_edit.model.cur_data[3].questions = [];
				iFrame.global_json.screens[3].questions = lp3_edit.model.cur_data[3].questions;
				iFrame.form_questions = lp3_edit.model.cur_data[3].questions;
			}
		}
		// iFrame.global_quest_answer = [];
		// iFrame.global_form_history = [];
		if (if_defined(iFrame.show_form_questions_list_for_prewiev)) {
			iFrame.show_form_questions_list_for_prewiev();
		}
	},
	live_reload_quest_inp_for_iframe:function($this) {
		var $lp3_ed = lp3_edit.view.wrap;
		if ($lp3_ed.find('.iframe_wrap').find('iframe').length < 1 || $(window).width() < 768) return;

		var $view_body = lp3_edit.view.edit_frame_body;
		var iFrame = lp3_edit.view.edit_frame;

		var val = $this.val();

		var quest_id = $this.closest('.form_step').attr('data-id') || '0';
		var $wrap = $view_body.find('.sec3').find('.quest-wrap[data-quest-id="'+quest_id+'"]');

		if ($wrap.length < 1) {
			if (if_defined(iFrame.show_form_questions_list_for_prewiev)) iFrame.show_form_questions_list_for_prewiev();
		}


		if ($this.hasClass('question_text')) {
			console.log('!_!_!_question_text_!_!_!');

			if (val === '') val = 'Вопрос';

			$wrap.find('.quest>span').text(val);

		} 
		else if ($this.hasClass('answer_text')) {
			console.log('!_!_!_answer_text_!_!_!');

			var data_next = $this.attr('data-next-question');

			var $field = $wrap.find('.answer[data-to-question="'+data_next+'"]');

			if ($field.length < 1 && val !== '') {
				$wrap.find('.answer-inner-wrap').append('<div class="answer" data-to-question="'+data_next+'"><span>'+val+'</span></div>');
				iFrame.reload_answers_click_handler();

			} else if ($field.length > 0 && val !== '') {
				$field.children('span').text(val);

			} else if ($field.length > 0 && val === '') {
				$field.remove();

			}

		} 
		else if ($this.hasClass('qestion_bg_d')) {
			console.log('!_!_!_qestion_bg_d_!_!_!');

			var d = new Date().getTime();
			var url_img = 'url(' + val + '?' + d + ')';

			$wrap.attr('data-bgd', val + '?' + d);
			$wrap.attr('data-bgm', val + '?' + d);

			// if (val != '0' && val != '') {
			// 	$view_body.find('.sec3').css('background-image', url_img);
			// } else {
			// 	$view_body.find('.sec3').css('background-image', 'none');
			// }

		}

		if (if_defined(iFrame.open_question_by_id)) iFrame.open_question_by_id(quest_id);

	},
	scroll_iframe_to_selector:function(selector){

		if (lp3_edit.view.wrap.find('.iframe_wrap').find('iframe').length < 1 || $(window).width() < 768) return;

		var $view_body = lp3_edit.view.edit_frame_body;

		$view_body.find("html, body").animate({
			scrollTop: $view_body.find(selector).offset().top
		}, 1000);
	},
	load_quiz:function(data){

		if(if_defined(lp3_edit.view.edit_frame) && if_defined(lp3_edit.view.edit_frame.atom_quiz)){
			lp3_edit.view.edit_frame.atom_quiz.qiuz_data = Object.assign({},data);
			//quiz_edit.view.edit_frame.atom_quiz.quiz_data = data;
			lp3_edit.view.edit_frame.atom_quiz.load();
		}
		
	}



}
