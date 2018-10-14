;

'use strict';

console.log('balance.events start');

balance.events = {
	inser_video_handler:function() { // вставка видео инструкции
	    var $tar = $(this).closest('.vidio_instruction'); // берем враппер
	    if ($tar.children('iframe').length === 0) { // если в враппере нет видео айфрейма
	        $tar.append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + $tar.data('video-id') + '?autoplay=1&amp;rel=0&amp;showinfo=0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'); // вставляем видео
	    	
		                	    	$(this).hide();
	    }
	},
	history_scroll_reinit:function(){
	    // инициируем скролл плагин для блока с историей транзакций
	    
	    var $history_table = balance.view.wrap.find('.history_table');
	    var $vert_hist = $history_table.find('.history_scroll_content');

	    scroll_reinit($vert_hist,{},function(){ // callback при "упирании" скролла вниз
	    	 // все таблицы истории транзакций
	        $history_table.find('.hide_content_bottom').height(15); // уменьшаем висоту блока, который прячет контент снизу
				if ($history_table.attr('data-end-transaction-list') === "false") { // если получено еще не все транзакции, то
					    var last_transaction = +$history_table.attr('data-last-end') || 0; // берем номер последней полученной
	        	        balance.model.get_user_history(last_transaction, 10); // делаем запрос на получение следуюшей порции транзакций
				}
	    }, function(){ // callback при "упирании" скролла вверх
	        $history_table.find('.hide_content_top').height(0); // уменьшаем висоту блока, который прячет контент снизу
	    }, function(){ // callback при "отталкивании" скролла снизу
	        $history_table.find('.hide_content_bottom').height(50); // увеличить висоту блока, который прячет контент снизу
	    }, function(){ // callback при "отталкивании" скролла сверху
	        $history_table.find('.hide_content_top').height(50); // увеличить висоту блока, который прячет контент сверху
	    });
	    $vert_hist.find('.mCSB_outside + .mCS-dnk.mCSB_scrollTools_vertical').css('right', '-3px'); // выставляем скролл на нужную позицию относительно блока

	    // инициируем соризонтальный скролл плагин для блока с историей транзакций
	    scroll_horizontal_reinit('#balance_body .history_table .table_right_scrol',{},function(){ // callback при "упирании" скролла влево
	    		// тут делать ничего не надо для етого блока
	    }, function(){ // callback при "упирании" скролла вправо
	    		var $history_table = balance.view.wrap.find('.history_table');
					if ($history_table.attr('data-end-transaction-list') === "false") {
						var last_transaction = +$history_table.attr('data-last-end') || 0;
	        			balance.model.get_user_history(last_transaction, 10);
					}
	    });
	},
	rebind_poplnit:function(){


	    var $wrap = balance.view.wrap;
	    var $popolnit = $wrap.find('#popolnit');
	    var $popolnit_input = $popolnit.find('input[name="value"]');
	    $wrap.find('.but_replenish_balance').unbind('click');
	    $wrap.find('.but_replenish_balance').click(function(e) { // при клике по кнопке "пополнить" в блоке баланса
	        e.preventDefault(); // отменяем действие по умолчанию
	        $popolnit_input.attr('data-need',0);
	        $popolnit.find('.pop_up_title').show();
            $popolnit.find('#popolnit_btn').attr('data-target','none');
	        $popolnit.find('.fr_appointment').val('Пополнение счета');
	        $popolnit.find('.pop_up_title').html('Введите сумму пополнения'); // вписываем надпись в заголовок поп-апа пополнения
	        // $('#popolnit input[name="value"]').val(100);
	        $popolnit.arcticmodal(); // открываем поп-ап пополнения
	    });

	    $popolnit_input.ForceNumericOnly(); // ограничываем введение только цифр в инпут суммы

	    $popolnit_input.unbind('blur');
	    $popolnit_input.blur(function() { 
	        if (parseInt($(this).val()) < parseInt($(this).attr('data-need')) || $(this).val().length < 1) { // если не введена сумма
	            $(this).addClass('error-input'); // накидываем класс ошыбки на инпут
	        }
	    });


	    $popolnit_input.unbind('focus');
	    $popolnit_input.focus(function() { // при фокусе в инпуте суммы в поп-апе пополнения
	        $(this).removeClass('error-input'); // убераем класс ошыбки на инпут
	    });

	    $popolnit.find('.button').unbind('click');
	    $popolnit.find('.button').click(function() { // при клике по кнопке "создать счет" в поп-апе пополнения
	        $popolnit.find('input').trigger('blur'); // убераем фокус с инпута суммы в поп-апе
	        if ($popolnit.find('input.error-input').length === 0) { 
	        	var target = $(this).attr('data-target');// если на инпуте нету класса ошыбки (введена сумма)
	        	if ($(this).attr('data-target')!='none') {
	        		setCookie('atom_pay_target',target,1);
	        	}
	            balance.controller.make_robokassa_redirect($popolnit); // откриваем робокассу
	        }
	    });
	},
    rebind: function() {
	    
	    var $wrap = balance.view.wrap;
	    var $play_video = $wrap.find('.play_instruction');

    	$play_video.unbind('click',balance.events.inser_video_handler);
    	$play_video.click(balance.events.inser_video_handler);


	    var $history_table = $wrap.find('.history_table'); //сохраняем враппер страницы баланса
	    $history_table.find('.triangle').unbind('click');
	    $history_table.find('.triangle').click(function() { // при клике на кнопку раскрытия блока (триугольник)
	        $history_table.toggleClass('active'); // накидываем/убераем клас который открывает блок
	        $history_table.find('.hide_content_top').height(0); // уменьшаем висоту блока, который прячет контент снизу
	        $history_table.find('.history_scroll_content').addClass('scrolled_to_top'); // накидуем класс, который показывает, что сейчас заскроллино "в упор" вверх
	    });
	    
	    var $personal_data_table = $wrap.find('.personal_data_block');
	    $personal_data_table.find('.triangle').unbind('click');
	    $personal_data_table.find('.triangle').click(function() { // при клике на кнопку раскрытия блока (триугольник)
	        $personal_data_table.toggleClass('active'); // накидываем/убераем клас который открывает блок
	    });

	    $tarrifs_links = $wrap.find('.balance_tariffs_link');
	    $tarrifs_links.unbind('click');
	    $tarrifs_links.click(function(e) {
	    	
    		e.preventDefault();

	        open_from_url($(this).attr('href'),true);
	    });

	    var $h_logo = $wrap.find('.header').find('.logo');
	    $h_logo.unbind('click');
	    $h_logo.click(function(){
	    	open_part('tools');
	    });



    }
}
