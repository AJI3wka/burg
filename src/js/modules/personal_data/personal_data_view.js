;

'use strict';

console.log('personal_data.view start');


personal_data.view = {
	wraps:$('.personal_data'),
	insert_value:function($inp,val){

	    $inp.val(val); //записываем новое значения во все соответсвующие инпути
	    $inp.attr('data-last-change', val); //записываем новое значения во все соответсвующие атрибуты
	},
	change_textarea_height:function(_this) {
	    var scroll_height = $(_this)[0].scrollHeight; // измеряем высоту содержымого з учетом скроллинга
	    $(_this).css('height', scroll_height+2); // изменяем высоту блока под высоту содержымого
	},
	country_select_init:function() {
	    if ($('.fr_country.selectized').length == 0) { //если не сущестуют .fr_country.selectized (еще не иницировались)
	        var $country_inputs = $('.fr_country'); //поля вобра стран
	        var full = $country_inputs.length; //счетчик всех
	        var count = 0; //счетчик инициорованных
	        $country_inputs.each(function() { //цикл по всем елементам
	            $(this).selectize({ //инициируем селектайз
	                create: false, //запрещаем создание новых вариантов
	                onInitialize: function() { //функция инцииализации
	                    count++; //добавляем +1 к счетчику иницированных
	                    // console.log('LOAD_SELECTIZE', count, full, count == full);
	                    if (count == full) { //если иницированны все
	
	                        var $pop = $('#atom_personal_data_pop');
							
							if($pop.length>0){
		                        personal_data.view.tooltip_selectize_helper(); //запускаем хелпер для поля выбора 
		                        personal_data.view.init_tooltip('#atom_personal_data_pop input,#atom_personal_data_pop textarea'); //иницируем тултипы на поле подтверждения данных
		                    }

		                  	personal_data.view.wraps.find('.selectize-input').find('input').attr('placeholder', "Российская Федерация (RU)").trigger('blur');
	
							
	                    }
	                }
	            });


	        });

	    }
	},
	init_tooltip:function(elem) {

	    //скидываем бинды фокуса и блура для отображения/скрытия тултипов
	    $(elem).unbind('blur', personal_data.view.hide_tooltip);
	    $(elem).unbind('focus', personal_data.view.render_toolip);

	    //нкидываем бинды фокуса и блура для отображения/скрытия тултипов
	    $(elem).bind('blur', personal_data.view.hide_tooltip);
	    $(elem).bind('focus', personal_data.view.render_toolip);

	    scroll_reinit($('.wd-tooltip').find('.container'), { // иницируем свкролл на контейнере тултипа
	        theme: "tooltip"
	    }, function() {}, function() {}, function() {}, function() {});
	},
	tooltip_selectize_helper:function() {

			var $target = $('#atom_personal_data_pop').find('.selectize-input').find('input'); //конкретная мишень -инпут где происходит ввод пользвоателем
		    $target.attr({
		        'data-wd-wiev-selector': ".pop",
		        'data-wd-tooltip': "<p>Двухбуквенный ISO-код страны, гражданином которой является частное лицо.</p><span>RU</span>",
		        'data-wd-force': 'top'
		    }); //накидываем параметры для тултипа
	    

	    //на все поля ввода selectize добавляем плейсхолдер и тделаем имимтацию выхода с поля(вызываем событие блур)
	},
	/*----------- tooltip start ---------*/
	/**
	 * [render_toolip хендлер рендера тултипа для инпута]
	 * @param  {event} e [event]
	 */
	render_toolip:function(e) {
	    e.preventDefault(); //блокируем обычную реакцию
	    var $elem = $(this); //елемент

	    $('.sd-tooltip-focused').removeClass('sd-tooltip-focused'); //скидываем класс фокусирования на инпуте

	    $elem.addClass('sd-tooltip-focused'); //добавляем класс фокусирования на текущем инпуте

	    var carcas = $elem.attr('data-wd-tooltip'); //получаем каркас содержиомго тултипа с елемента

	    var $tooltip = $('.wd-tooltip'); //тултип

	    $tooltip.find('.container').find('.content').html(carcas); //вставляем в тултип каркас содержимого

	    personal_data.view.rebuild_tooltip(false, $elem); //перестраиваем тултип

	    //скидываем евенеты с ресайза вьювпорта и скрола в попапе для перестройки тултипа
	    $(window).unbind('resize', get_dom.view.rebuild_tooltip);
	    var $arctic_container = $('.arcticmodal-container');
	    $arctic_container.unbind('scroll', get_dom.view.rebuild_tooltip);

	    //добавляем евенты на ресайз и скролл для перестройки тултипа
	    $(window).bind('resize', get_dom.view.rebuild_tooltip);
	    $arctic_container.bind('scroll', get_dom.view.rebuild_tooltip);

	},

	/**
	 * [rebuild_tooltip евент/функция перестройки тултипа]
	 * @param  {event,boolean} e [event/false отправляется евент если хендлер или false если функция]
	 * @param  {Object} $elem 	[елемент фокусировки может быть не указан]
	 */
	rebuild_tooltip:function(e, $elem) {

	    if (e && e != false) {
	        //e.preventDefault();
	    }

	    if (!$elem) { //если елемент не указан
	        $elem = $('.sd-tooltip-focused'); //то ерем елемент с класом фокусировки
	    }

	    if ($elem.length > 0) { //если елемент фокусровки существет

	        var $tooltip = $('.wd-tooltip'); //тултип
	        var $containter = $tooltip.find('.container'); //контейнер тултипа

	        $tooltip.height('initial'); //сикдываем высоту тултпа
	        $containter.addClass('no-scroll'); //снимаем клас скролинга

	        var left_right_or_top_bot_tooltip_padding = 60; //паддинг тултипа лево+право(используется для построения позици тултипа

	        var the_nose_height = 16; //высота "носика" указывающего на поле

	        var view_selector = $elem.attr('data-wd-wiev-selector'); //селектор области просмотра для определния ширины

	        var $view_wrap = $elem.closest(view_selector); //область просмотра

	        var viewport_width = $view_wrap.width() - left_right_or_top_bot_tooltip_padding; //ширина области просмотра
	        var to_top = $elem.offset().top - $(window).scrollTop(); //растояние от елемента до верхней границы вьювпорта
	        var to_left = $view_wrap.offset().left + parseInt($view_wrap.css('padding-left')); //растояние до левой граници вьювпорта

	        var wh = $(window).outerHeight(); //высота окна
	        var eh = $elem.outerHeight(); //высота елемента
	        console.log('eh = ', eh);
	        var ew = $elem.outerWidth(); //ширина елемента
	        var th = $tooltip.outerHeight(); //высота тултипа
	        var to_bot = wh - to_top - eh; //растояния до нижней границы окна

	        var force = $elem.attr('data-wd-force'); //атрибут форсирующий сторону отображения тултипа

	        var top_bot_flab = 'bot'; //дефолтное отображение снизу
	        var height = th; //дефолтаня высота равна обычной высоте тултипа с контентом

	        var top = to_top + eh + the_nose_height; //координата top для отображения тултипы
	        var elem_o_l = $elem.offset().left; //офсет елемента от елвого края окна

	        var nose_left = 32; //стандартное значение css left для "носа"

	        if (ew < 64) { //если ширина елемента меньше 64
	            nose_left = ew / 2; //делаем отображение носа по центру
	        }

	        if (elem_o_l > to_left) { //если елемент не находится на левом крае отображения
	            nose_left = nose_left + (elem_o_l - to_left); //высчитываем нужное отображение
	        }

	        if (to_top > to_bot) { //есл сверху больше свободного пространстка

	            top_bot_flab = 'top'; //флаг отображение переводим в значение "топ"

	        } else {

	            top_bot_flab = 'bot'; //флаг отображение переводим в значение "топ"

	        }

	        if (force == 'top') { //если значение форсирования "топ"

	            top_bot_flab = 'top'; //флаг отображение переводим в значение "топ"

	        } else if (force == 'bot') { //если значение форсирования "топ"

	            top_bot_flab = 'bot'; //флаг отображение переводим в значение "топ"

	        }


	        if (top_bot_flab == 'top') { //если флаг отображение сверху

	            top = to_top - th - the_nose_height; //координата top

	            if (top < 0) {
	                top = 0;
	            }

	            $tooltip.addClass('invert'); //добавляем клас invert для перекидывания носа вниз

	            if (to_top < (th + the_nose_height)) { //если пространстка нехватает для полного отображения
	                height = to_top - the_nose_height; //меняем высоту что бы поменистоль
	                $containter.removeClass('no-scroll'); //удаляем класс "без скрола"
	            } else {
	                height = th; //если пространтсва хватает то высота равна дефолтной высоте
	            }

	        } else if (top_bot_flab == 'bot') { //если флаг отображения снизу

	            top = to_top + eh + the_nose_height; //координата от верха

	            $tooltip.removeClass('invert'); //удаляем invert для перевода носа в дефолт положение

	            if (to_bot < (th + the_nose_height)) { //если пространстка нехватает для полного отображения
	                height = to_bot - the_nose_height; //меняем высоту что бы поменистоль
	                $containter.removeClass('no-scroll'); //удаляем класс "без скрола"
	            } else {
	                height = th; //если пространтсва хватает то высота равна дефолтной высоте
	            }

	        }


	        // var top = to_top + eh+the_nose_height;

	        $tooltip.find('.triangle').css({
	            'left': nose_left + 'px'
	        }); //cтавим нос в нужное положение


	        $tooltip.width(viewport_width); //задаем ширину тултипу
	        $tooltip.css({ //устанавливаем стили на тултип для пререисовки
	            'left': to_left + 'px',
	            'top': top + 'px',
	            'z-index': 1000,
	            'opacity': 1,
	            'height': height + 'px'
	        });

	    }

	},

	/**
	 * [hide_tooltip евент/функция для скрытия тултипа при уходе с фкуса поля]
	 * @param  {event} e [event]
	 */
	hide_tooltip:function(e) {
	    if (e) {
	        e.preventDefault(); //блокируем обычную реакцию если это хендлер
	    }
	    // if (isMobile) {

	    // } else { //елси не моибила
	        $('.sd-tooltip-focused').removeClass('sd-tooltip-focused'); //удаляем класс фокусировки
	    // /}
	    $('.wd-tooltip').removeAttr('style'); //удаляем атрибут стиль с елемента тултип таким образом пряча его

	},
	paste_values:function(){
		console.log('personal_data.view.paste_values');
		var $wraps = personal_data.view.wraps;

        if(if_defined(personal_data.model.contacts)){



            if(if_defined(personal_data.model.contacts.person_r)){

                if(personal_data.model.contacts.person_r) personal_data.view.insert_value($wraps.find('.fr_person_r'), personal_data.model.contacts.person_r); //если получено соответствующие данные, то записываем полученные данные в нужные инпуты
            
            }


            if(if_defined(personal_data.model.contacts.person)){

                if(personal_data.model.contacts.person) personal_data.view.insert_value($wraps.find('.fr_person'), personal_data.model.contacts.person); //если получено соответствующие данные, то записываем полученные данные в нужные инпуты

            }

            if(if_defined(personal_data.model.contacts.birth_date)){
                if(personal_data.model.contacts.birth_date) { //если получено соответствующие данные, то
                    var birth_date_arr = personal_data.model.contacts.birth_date.split('.'); //розбиваем полученную строку на нужные части
                    personal_data.view.insert_value($wraps.find('.fr_day'), birth_date_arr[0]); //записываем соотвутствующую часть данных в нужные инпуты
                    personal_data.view.insert_value($wraps.find('.fr_mounth'), birth_date_arr[1]); //записываем соотвутствующую часть данных в нужные инпуты
                    personal_data.view.insert_value($wraps.find('.fr_year'), birth_date_arr[2]); //записываем соотвутствующую часть данных в нужные инпуты
                }
            }

            if(if_defined(personal_data.model.contacts.country)){
                if(personal_data.model.contacts.country){
                    personal_data.view.insert_value($wraps.find('.fr_country'), personal_data.model.contacts.country);
                }  //если получено соответствующие данные, то записываем полученные данные в нужные инпуты
            }

            if(if_defined(personal_data.model.contacts.p_addr)){
                if(personal_data.model.contacts.p_addr) personal_data.view.insert_value($wraps.find('.fr_addres'), personal_data.model.contacts.p_addr); //если получено соответствующие данные, то записываем полученные данные в нужные инпуты

            }

            if(if_defined(personal_data.model.contacts.code)){
                if(personal_data.model.contacts.code) personal_data.view.insert_value($wraps.find('.fr_inn'), personal_data.model.contacts.code); //если получено соответствующие данные, то записываем полученные данные в нужные инпуты

            }

            if(if_defined(personal_data.model.contacts.phone)){
                if(personal_data.model.contacts.phone) personal_data.view.insert_value($wraps.find('.fr_phone_nomber'), personal_data.model.contacts.phone); //если получено соответствующие данные, то записываем полученные данные в нужные инпуты

            }

            if(if_defined(personal_data.model.contacts.e_mail)){
                if(personal_data.model.contacts.e_mail)  personal_data.view.insert_value($wraps.find('.fr_email'), personal_data.model.contacts.e_mail); //если получено соответствующие данные, то записываем полученные данные в нужные инпуты

            }

            if(if_defined(personal_data.model.contacts.passport)){
                if(personal_data.model.contacts.passport) { //если получено соответствующие данные, то
                    var passport_arr = personal_data.model.contacts.passport.split(' '); //розбиваем полученную строку на нужные части в массив

                    var string = ''; //содаем строку з данными про "кем выдан паспорт"
                    for(var i=3; i<passport_arr.length; i++) { //записываем в строку все оставшыеся елементы массива
                        if(i !== passport_arr.length-1) { //если ето не последний елемент, то 
                            string += passport_arr[i] + ' '; //добавляем в строку пробел после елемента
                        } else { //если ето последний елемент, то 
                            string += passport_arr[i]; //добавляем его в строку без пробела в конце
                        }
                    }

                    personal_data.view.insert_value($wraps.find('.fr_one_nomber'), passport_arr[0]); //записываем соотвутствующую часть данных в нужные инпуты
                    personal_data.view.insert_value($wraps.find('.fr_two_nomber'), passport_arr[1]); //записываем соотвутствующую часть данных в нужные инпуты
                    personal_data.view.insert_value($wraps.find('.fr_six_nomber'), passport_arr[2]); //записываем соотвутствующую часть данных в нужные инпуты
                    personal_data.view.insert_value($wraps.find('.fr_date_of_issue'), string); //записываем соотвутствующую часть данных в нужные инпуты
                }

            }
    
        }
	}

}
