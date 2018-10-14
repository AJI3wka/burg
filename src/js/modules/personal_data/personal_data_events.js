;

'use strict';

console.log('personal_data.events start');

personal_data.events = {

	unfocus_handler:function(e) {

		$inp = $(this);

	    var newValue = $inp.val(); //сохраняем в переменную значение в инпуте на котором происходит событие onblur
	    var oldValue = $inp.attr('data-last-change') || ''; //сохраняем в переменную значение в атребуте 'data-last-change', где записано последнее сохранённое значение инпута

	    if (newValue === oldValue) return; //если при событии onblur значенее не изменилось то прекратить выполнение фукции

	    var $wrap = $inp.closest('.personal_data'); //поиск враппера
	    $inp.attr('data-last-change', newValue); //если изменилось, то сохраняем новое значение в атрибут
	    if (personal_data.model.contacts == false) {
	    	personal_data.model.contacts = {};
	    }
	    personal_data.model.contacts.person_r = $wrap.find('.fr_person_r').val(); //сохраняем в обьект данныие - Ф.И.О.

	    personal_data.model.contacts.person = $wrap.find('.fr_person').val();
	    personal_data.model.contacts.code = $wrap.find('.fr_inn').val(); 

	    if($inp.hasClass('fr_inn')) personal_data.view.insert_value($wrap.find('.fr_inn'), newValue); //из-за адаптива есть несколько инпутов одинакового назначения, по етому, если ето один из них, то подставляем новое значение во все такие же инпуты
	    
	    if($inp.hasClass('fr_day')) personal_data.view.insert_value($wrap.find('.fr_day'), newValue); //из-за адаптива есть несколько инпутов одинакового назначения, по етому, если ето один из них, то подставляем новое значение во все такие же инпуты
	    if($inp.hasClass('fr_mounth')) personal_data.view.insert_value($wrap.find('.fr_mounth'), newValue); //из-за адаптива есть несколько инпутов одинакового назначения, по етому, если ето один из них, то подставляем новое значение во все такие же инпуты
	    if($inp.hasClass('fr_year')) personal_data.view.insert_value($wrap.find('.fr_year'), newValue); //из-за адаптива есть несколько инпутов одинакового назначения, по етому, если ето один из них, то подставляем новое значение во все такие же инпуты
	    personal_data.model.contacts.birth_date = $wrap.find('.fr_day').val() + '.' + $wrap.find('.fr_mounth').val() + '.' + $wrap.find('.fr_year').val(); //сохраняем в обьект данныие - День рождения

	    if($inp.hasClass('fr_country')) personal_data.view.insert_value($wrap.find(' .fr_country'), newValue); //из-за адаптива есть несколько инпутов одинакового назначения, по етому, если ето один из них, то подставляем новое значение во все такие же инпуты
	    personal_data.model.contacts.country = $wrap.find('select.fr_country').attr('data-last-change'); //сохраняем в обьект данныие - Страна

	    personal_data.model.contacts.p_addr = $wrap.find('.fr_addres').val(); //сохраняем в обьект данныие - Адрес

	    if($inp.hasClass('fr_phone_nomber')) personal_data.view.insert_value($wrap.find('.fr_phone_nomber'), newValue); //из-за адаптива есть несколько инпутов одинакового назначения, по етому, если ето один из них, то подставляем новое значение во все такие же инпуты
	    personal_data.model.contacts.phone = $wrap.find('.fr_phone_nomber').val(); //сохраняем в обьект данныие - Телефон

	    if($inp.hasClass('fr_email')) personal_data.view.insert_value($wrap.find('.fr_email'), newValue); //из-за адаптива есть несколько инпутов одинакового назначения, по етому, если ето один из них, то подставляем новое значение во все такие же инпуты
	    personal_data.model.contacts.e_mail = $wrap.find('.fr_email').val(); //сохраняем в обьект данныие - E-mail

	    if($inp.hasClass('fr_one_nomber')) personal_data.view.insert_value($wrap.find('.fr_one_nomber'), newValue); //из-за адаптива есть несколько инпутов одинакового назначения, по етому, если ето один из них, то подставляем новое значение во все такие же инпуты
	    if($inp.hasClass('fr_two_nomber')) personal_data.view.insert_value($wrap.find('.fr_two_nomber'), newValue); //из-за адаптива есть несколько инпутов одинакового назначения, по етому, если ето один из них, то подставляем новое значение во все такие же инпуты
	    if($inp.hasClass('fr_six_nomber')) personal_data.view.insert_value($wrap.find('.fr_six_nomber'), newValue); //из-за адаптива есть несколько инпутов одинакового назначения, по етому, если ето один из них, то подставляем новое значение во все такие же инпуты
	    if($inp.hasClass('fr_date_of_issue')) personal_data.view.insert_value($wrap.find('.fr_date_of_issue'), newValue); //из-за адаптива есть несколько инпутов одинакового назначения, по етому, если ето один из них, то подставляем новое значение во все такие же инпуты
	    personal_data.model.contacts.passport = $wrap.find('.fr_one_nomber').val() + ' ' + $wrap.find('.fr_two_nomber').val() + ' ' + $wrap.find('.fr_six_nomber').val()+ ' ' + $wrap.find('.fr_date_of_issue').val(); //сохраняем в обьект данныие - Номер паспорта и Паспорт выдан

	    personal_data.controller.save_contacts();

	},
    rebind: function() {

    	var $wraps = personal_data.view.wraps;

        var $textareas = $wraps.find('textarea');

        $textareas.each(function() { // для каждого поля
            $(this).css('height', 44); // изменяем высоту блока под стандартную высоту
            var _this = this; // сохраняем this в переменную для передачи как аргумента
            ////alert('ads');
            setTimeout(function() { // делаем задержу чтобы изменилась висота перед тем как высчитать висоту контента
                personal_data.view.change_textarea_height(_this); // изменяем высоту блока textarea под высоту содержымого
            }, 1);
        });

        personal_data.view.country_select_init();

        var $body_wrap = $('#balance_body').find('.personal_data');
        if (personal_data.model.check_saved_user_all_personal($body_wrap, ['fr_inn'])) { // проверяет заполнены ли все инпуты личных данных внутри селектора, кроме инпутов с классами, указаными в массиве второго аргумента
            $body_wrap.closest('.personal_data_block').removeClass('active'); // если все что нужно заполнено, то скрываем блок с личными данными на планшетах и мобилах
        }

        $wraps.find('input').unbind('blur',personal_data.events.unfocus_handler);
        $wraps.find('input').blur(personal_data.events.unfocus_handler);

        $textareas.unbind('blur',personal_data.events.unfocus_handler);
        $textareas.blur(personal_data.events.unfocus_handler)

        $textareas.unbind('keyup');
	    $textareas.keyup(function() { // при нажимании клавиш клавиатуры (изминении значения) в поле
	        personal_data.view.change_textarea_height(this); // изменяем высоту блока textarea под высоту содержымого
	    });

        $textareas.unbind('mouseup');
	    $textareas.mouseup(function() { // при нажимании клавиш мышы (изминении значения) в поле
	        personal_data.view.change_textarea_height(this); // изменяем высоту блока textarea под высоту содержымого
	    });

	    $wraps.find('select').unbind('change',personal_data.events.unfocus_handler);
	    $wraps.find('select').change(personal_data.events.unfocus_handler);


	    $wraps.each(function(index, el) {
	    	var $this = $(this);
	    	if ($this.hasClass('scrol')) {
	    		var $hide_cont_bot = $this.closest('.personal_data_block').find('.hide_content_bottom');
	    		scroll_reinit($this,{},function(){ // callback при "упирании" скролла вниз
			        $hide_cont_bot.height(15); // уменьшаем висоту блока, который прячет контент снизу
			    }, function(){ // callback при "упирании" скролла вверх
			         // тут делать ничего не надо для етого блока
			    }, function(){ // callback при "отталкивании" скролла снизу
			        $hide_cont_bot.height(80); // увеличить висоту блока, который прячет контент снизу
			    });
			    $this.find('.mCSB_outside + .mCS-dnk.mCSB_scrollTools_vertical').css('right', '-3px'); // выставляем скролл на нужную позицию относительно блока

	    	}
	    	
	    });

    }

}
