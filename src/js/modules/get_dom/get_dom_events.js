;

'use strict';

console.log('get_dom.events start');

get_dom.events = {

	popstate:function(){

		$('.arcticmodal-container_i2').children('#domain_buy').addClass('force').arcticmodal('close');

		setTimeout(function(){

			window.removeEventListener('popstate', get_dom.events.popstate);
			
		},100);
	},

	input_change_blur_domain_buy_handler:function(e) {
	    e.preventDefault(); //отменяем тсандартную реакцию
	    var zones = get_dom.model.global_zones; //присваимваем вектор зон из глобальнйо переменной
	    var $pop_wrap = get_dom.view.pop_wrap; //область покупки домена
	    var $list_wrap = $pop_wrap.find('#domain_list_to_buy'); //область списка найденных доменов
	    if (get_dom.view.global_domain_input_timer) { //если таймер запущен
	        clearTimeout(get_dom.view.global_domain_input_timer); //скинуть таймер
	        get_dom.view.global_domain_input_transfering = false; //скинуть флаг передачи
	        get_dom.view.global_getted_domain_zones = zones.length; //счетчик поулченных зон = длинне вектора зон
	        $list_wrap.html(''); //очищаем список найденных доменов
	    }
	    $pop_wrap.find('.can_be').show(); //отображаем список доступных зон
	    $pop_wrap.find('.pay_funct').hide(); //прячем кнопку покупки
	    var $this = $(this); //переприсваиваем this для подальшего использования
	    var clean_domain = $this.val().replace(/[|&;$%@"<>()+,_=.' ]/g, "").toLowerCase(); //берем значение и очищаем его от спецсивмоволо и преводим в нижний регистр
	    if (clean_domain.length > 0 && clean_domain.length <= 23) { //если строка валидной длинны
	        $this.removeClass('error-input').addClass('succes-input'); //удаляем клас ошибки накидаем клас ОК валидации
	        setTimeout(function() {
	            $this.removeClass('succes-input'); //ставим таймаут на секунду для отключения ОК класа валидации
	        }, 1000);
	        get_dom.view.global_domain_input_timer = setTimeout(function() { //присваиваем в глобальный таймер задержку в 2.5с перед поиском свободных доменов
	            $this.val(clean_domain); //вставляем исправленное значение в поле 
	            if ($this.attr('data-last-pushed') != clean_domain) { //если последний поиск был произведен не по этому домену
	                $list_wrap.html(''); //очищаем список выдачи
	                $this.addClass('wait-input'); //добавляем на поле клас ожидания(анимация пульсации)
	                //$list_wrap.html('<div class="domain_waiting">Обновляем список доступных доменов</div>');
	                $this.attr('data-last-pushed', clean_domain); //записываем в полу последнего поиска значение
	                get_dom.view.global_domain_input_transfering = true; //переводим флаг преедачи доменов в true
	                get_dom.view.global_finded_domain_zones = 0; //скидываем счетчик проверенных зон зон
	                get_dom.view.global_getted_domain_zones = 0; //скидываем счетчик проверенных зон зон
	                for (var i = 0; i < zones.length; i++) { //цикл по длине вектора доступных зон
	                    var domian_word; //переменна - полного названия домена
	                    if (zones[i].indexOf('рф') == -1) { //если зона не "рф"
	                        domian_word = get_dom.model.transliterate(clean_domain) + '.' + zones[i]; //транскрибируем все в латиницу и добавляем зону
	                    } else {
	                        domian_word = get_dom.model.transliterate(clean_domain, true) + '.' + zones[i]; //транскрибируем все в кирилицу и добавляем зону
	                    }

	                    get_dom.controller.check_domain_name(domian_word, function(data,domian_word) { //проверяем доменное имя
	                        //если полученное количество ответов меньше длинны вектора зон, и флаг поска доменов активет
	                        if (get_dom.view.global_getted_domain_zones < zones.length && get_dom.view.global_domain_input_transfering) {
	                            if (data.check_ok) { //если ответ с сервера ОК
	                                //добавляем позицию с доменов с писок
	                                var var_carcas = '<div class="variant_domain" data-price="' + numberWithSpaces(data.price) + '">' + domian_word + '</div>';
	                                $list_wrap.append(var_carcas);
	                                //$(var_carcas).insertBefore('#domain_list_to_buy .domain_waiting');
	                                get_dom.view.global_finded_domain_zones++; //добавляем +1 в список найденных доменов
	                            }
	                            get_dom.view.global_getted_domain_zones++; //увеличиваем на 1 счетчик полученных ответов
	                            if (get_dom.view.global_getted_domain_zones == zones.length) { //если все ответы получены
	                                get_dom.view.global_domain_input_transfering = false; //скидываем флаг поиска зоны

	                                $this.removeClass('wait-input'); //снимаем клас ожидания

	                                //var $waiting = $list_wrap.find('.domain_waiting');
	                                if (get_dom.view.global_finded_domain_zones > 0) { //если найден хоть один домен
	                                    //$waiting.hide();
	                                    //кидываем блур и накидываем евенты ховера и клика
	                                    $list_wrap.find('.variant_domain').addClass('unblur').unbind('click').unbind('mouseover');

	                                    $list_wrap.find('.variant_domain').bind('mouseover', get_dom.events.domain_list_variant_mouseover_handler);
	                                    $list_wrap.find('.variant_domain').bind('click', get_dom.events.domain_list_variant_click_handler);
	                                } else {
	                                    //если доменов не найдено выводим это сообщение в списке
	                                    $list_wrap.html('<div class="domain_waiting no-animate">Все доменны из доступных зон заняты</div>');
	                                    //$waiting.addClass('no-animate').html('Все доменны из доступных зон заняты');
	                                }
	                            }
	                        }
	                    });
	                }
	            }
	        }, 2500); //задержка перед окончанием ввода и началом поиска доменов - 2.5 секунды
	    } else {
	        $this.removeClass('succes-input').addClass('error-input'); //если длина ввода не валидна накинуть клас ошибки
	    }
	},
	/**
	 * [domain_list_variant_mouseover_handler хендлер входа мишки на область доступного домена в списке]
	 * @param  {event} e [event]
	 */
	domain_list_variant_mouseover_handler:function(e) {
	    e.preventDefault(); //блокируем обычную реакцию
	    var $pop_wrap = get_dom.view.pop_wrap; //попап выбора домена
	    $pop_wrap.find('.domain_name_var').html($(this).text()); //переносим значение имени с варианта на котором мышка в область выбора
	    $pop_wrap.find('.domain_price').find('span.price').html($(this).attr('data-price')); //переносим значение цены с варианта на котором мышка в область выбора
	    //
	    $pop_wrap.find('.can_be').hide(); //скрываем область списка домтупных зон
	    $pop_wrap.find('.pay_funct').show(); //отобраажем область выбора
	},


	/**
	 * [domain_list_variant_mouseleave_handler хендлер ухода мышки из области списка доступных доменов]
	 * @param  {event} e [event]
	 */
	domain_list_variant_mouseleave_handler:function(e) {
	    e.preventDefault(); //блокируем обычную реакцию
	    var $pop_wrap = get_dom.view.pop_wrap; //попап выбора домена
	    var $target = $pop_wrap.find('.variant_domain.active'); //выбранный домен
	    if ($target.length > 0) { //если домен выбран

	        $pop_wrap.find('.domain_name_var').html($target.text()); //переносим значение имени в область выбора
	        $pop_wrap.find('.domain_price').find('span.price').html($target.attr('data-price')); //переносим значение цены в область выбора

	        //
	        $pop_wrap.find('.can_be').hide(); //скрываем область списка домтупных зон
	        $pop_wrap.find('.pay_funct').show(); //отобраажем область выбора
	    } else {

	        $pop_wrap.find('.pay_funct').hide(); //отобраажем область списка домтупных зон
	        $pop_wrap.find('.can_be').show(); //скрываем область выбора
	    }
	},

	/**
	 * [domain_list_variant_click_handler хендлер клика по варианту предложенных доменов]
	 * @param  {event} e [event]
	 */
	domain_list_variant_click_handler:function(e) {
	    e.preventDefault(); //блокируем обычную реакцию
	    var $pop_wrap = get_dom.view.pop_wrap; //попап выбора домена
	    $pop_wrap.find('.variant_domain').removeClass('active'); //удаляем активный клас со всех вариантов доменов
	    $(this).addClass('active'); //добавляем активный клас на вариант по которому клик
	},

	/**
	 * [domain_buy_click_handler хендлер клика по кнопке "купить"]
	 * @param  {event} e [event]
	 */
	domain_buy_click_handler:function(e) {
	    e.preventDefault(); //блокируем обычную реакцию
	    //set_saved_user_personal(); //устанавливаем лчиные данные в поля
	    var $pop_wrap = get_dom.view.wrap.find('#atom_personal_data_pop'); //попап подтверждения данных
	    var claendomain = $(this).parent().find('.domain_name_var').text(); //доменное имя
	    $pop_wrap.find('.pop_up_title span').html(claendomain);
	    var price =$(this).closest('#domain_buy').find('.domain_price').find('.price').text();
	    $pop_wrap.find('.pop_up_title').attr('data-price',price); //вставляем в заголвоок попапа имя домена
	    
	    history.replaceState('',location.title, '/get_domain?d='+claendomain+'&p='+price);
	    $pop_wrap.arcticmodal(); //открываем попап
	    run_module('personal_data');
	},
	confirmation_button_click_handler:function() {

	    var checked = true; //флаг все ли чекбокси прощелканы

	    $(this).closest('.personal_data').find('.checkbox').find('.check').each(function() { //цикл по всем чекбоксах

	        if (!$(this).hasClass('active')) { //если нет активного класа
	            checked = false; //скинуть флаг
	        }

	    });

	    if (checked) { //если чекбоксы заполнены

	        ////alert('true');
	        get_dom.controller.create(function(data){

	            $('.body:visible input[data-input-type="domain"]').val($('#atom_personal_data_pop').find('.pop_up_title').find('span').text()).trigger('blur'); //заполняем инпут в теле редактора и делаем блур для автосейва

	            $.arcticmodal('close'); //закрываем все попапы

	            show_info_pop('Позравляем! Ваш домен успешно зарегистрирован и подключен к сервису. Для поривязки домена к сайту просто впишите его адрес в поле "домен" в редакторе сайта. Для доступности домена должны обновистя серевера DNS, в среднем это занимает 2-4 часа.<br><br>ВНИМАНИЕ! Для дальнейшего использования домена не нужно совершать каких-либо действий. Домен зарегистрирован, активирован и полностью готов к работе в сервисе.<br><br>Если вам на почту будут приходить письма о необходимости окончания регистрации домена или внесения дополнительных оплат, игнорируйте такие письма (их пишут мошенники).');
	            //Открываем попап "внимание" с сообщенеим о успешном завершении

	        });

	    } else { //если не выбран чекбокс

	        show_info_pop('Подтвердите достоверность введенных данных'); //вывести попап "Внимание" с сообщением

	    }

	},
    rebind: function() {
    	//get_dom.controller.get_domain_zones(); //получение доменных зон в бекграунде

	    var $domains_wrap = get_dom.view.pop_wrap; //попап выбора домена

	    $domains_wrap.find('.info').unbind('click');
	    $domains_wrap.find('.info').click(function() {
	    	open_from_url('/how_to?i=domains_rev1',true);//открыть инструкция для доменов
	    });

	    $domains_wrap.find('.can_be').find('p.link').unbind('click');
	    $domains_wrap.find('.can_be').find('p.link').click(function() {
	        open_from_url('/how_to?i=domen_lendinga',true); //открыть инструкция для доменов старую
	    });

		$domains_wrap.find('.domain_buy_input').unbind('input', get_dom.events.input_change_blur_domain_buy_handler); //накинуть на change евент обновления списка свободных
	    $domains_wrap.find('.domain_buy_input').bind('input', get_dom.events.input_change_blur_domain_buy_handler); //накинуть на change евент обновления списка свободных

	    $domains_wrap.find('.input_select_wrap').unbind('mouseleave',get_dom.events.domain_list_variant_mouseleave_handler); //накинуть уход с области мышкой на список вариантов доменов
	    $domains_wrap.find('.input_select_wrap').bind('mouseleave',get_dom.events.domain_list_variant_mouseleave_handler); //накинуть уход с области мышкой на список вариантов доменов

	    $domains_wrap.find('.buy_button').unbind('click');
	    $domains_wrap.find('.buy_button').click(get_dom.events.domain_buy_click_handler); //кнопка "купить" в попапе выбора домена



	    var $personal_data_pop_wrap = get_dom.view.wrap.find('#atom_personal_data_pop'); //попап подтверждения данных

	    $personal_data_pop_wrap.find('.checkbox').find('.check').unbind('click');
	    $personal_data_pop_wrap.find('.checkbox').find('.check').click(function(event) { //функция для работы чекбокса (тоггле класс)
	        event.preventDefault();
	        $(this).toggleClass('active');
	    });



	    //иницируем скролл в попапе
	    scroll_reinit($personal_data_pop_wrap.find('.scroll_in_middle').find('.scroll_wrap'), {
	        theme: "perDataPop"
	    }, function() {}, function() {}, function() {}, function() {}, function() {
	        $('.arcticmodal-container').trigger('scroll');
	    });

	    $personal_data_pop_wrap.find('.confirm_button').unbind('click'); 
	    $personal_data_pop_wrap.find('.confirm_button').click(get_dom.events.confirmation_button_click_handler); //накидываем клик хендлер для подтверждения данных

		window.removeEventListener('popstate', get_dom.events.popstate);
		window.addEventListener('popstate', get_dom.events.popstate);

    }

}
