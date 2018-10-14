;

'use strict';

console.log('partner.events start');

partner.events = {
	clipboard:function() {

	    var $partner_statistic = partner.view.wrap; // сохраняем враппер страницы статистики партнерки

	    var clipboard_promo_code = new Clipboard('#partner_statistic .promo_code'); // создаем клипбоард для промокода

	    clipboard_promo_code.on('success', function() { // при удачном копировании промокода

	        $partner_statistic.find('.promo_code').addClass('now_copied'); // показываем сообщение что текст скопирован в буфер обмена

	        setTimeout(function() { // через 3 сек
	            $partner_statistic.find('.promo_code').removeClass('now_copied'); // прячем сообщение что текст скопирован в буфер обмена
	        }, 3000);

	    });


	    var clipboard_ref_link = new Clipboard('#partner_statistic .ref_link'); // создаем клипбоард для реферальной ссылки

	    clipboard_ref_link.on('success', function() { // при удачном копировании реферальной ссылки

	        $partner_statistic.find('.ref_link').addClass('now_copied'); // показываем сообщение что текст скопирован в буфер обмена

	        setTimeout(function() { // через 3 сек
	            $partner_statistic.find('.ref_link').removeClass('now_copied'); // прячем сообщение что текст скопирован в буфер обмена
	        }, 3000);

	    });

	},
	selectboxes:function(){

	    var $selectbox = partner.view.wrap.find('.selectbox'); // сохраняем враппер селектбокса платежной системы
	    var $sel_li = $selectbox.find('li'); // сохраняем елементи (опции) селектбокса

	    $selectbox.unbind('click'); // отвязываем все существующие обработчики кликов с селектбокса
	    $sel_li.unbind('click'); // отвязываем все существующие обработчики кликов с опций селектбокса

	    $selectbox.click(function() { // привязываем обработчик кликов к врапперу селектбокса

	        var ul = $(this).find('ul'); // сохраняем список опций селектбокса

	        if (ul.is(':visible')) { // если список опций открыт, то при клике
	            ul.hide(); // прячем эго
	        } else { // если список опций закрыт, то при клике
	            ul.show(); // показываем эго
	        }

	    });

	    $sel_li.click(function() { // привязываем обработчик кликов к опциям (елементам) селектбокса
	        $(this).closest('.selectbox').find('.value').html($(this).html()); // записываем значение опции в враппер
	    });
	},
	datepicker:function($elem) {

	    var options = { // опции датапикера
	        "locale": {
	            "format": "DD.MM.YYYY", // формат времени
	            "separator": "|",
	            "applyLabel": "Выбрать", // кнопка вибора
	            "cancelLabel": "Отмена", // кнопка отмены
	            "fromLabel": "From",
	            "toLabel": "To",
	            "customRangeLabel": "Другой период",
	            "weekLabel": "W",
	            "daysOfWeek": [
	                "Вс",
	                "Пн",
	                "Вт",
	                "Ср",
	                "Чт",
	                "Пт",
	                "Сб"
	            ],
	            "monthNames": [
	                "Январь",
	                "Февраль",
	                "Март",
	                "Апрель",
	                "Май",
	                "Июнь",
	                "Июль",
	                "Август",
	                "Снетябрь",
	                "Октярь",
	                "Ноябрь",
	                "Декарь"
	            ],
	            "firstDay": 1
	        }
	    };

	    options.ranges = { // готовые диапазоны
	        'Последение 7 дней': [moment().subtract(6, 'days'), moment()],
	        'Последение 30 дней': [moment().subtract(29, 'days'), moment()],
	        'Этот месяц': [moment().startOf('month'), moment().endOf('month')],
	        'Прошлый месяц': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	    };

	    $elem.daterangepicker(options, function(start, end) { // при выборе диапазона


	        var d = new Date();
	        var time = d.getTime();
	        var loc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());
	        console.log('LOC = ', loc / 1000, '|', new Date().getTime() / 1000, '|', d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), '|', new Date());
	        var delta = time;// - loc;// берем дату на момент получения данных
	        start +=delta;; // берем дату на 7 дней раньше за момент получения данных
	        end+=delta;

	        partner.model.get_partner_stat(Math.round(start / 1000), Math.round(end / 1000)); // меняем данные в таблицы статистики на вибранный период времени
	    });
	},
    rebind: function() {
    		partner.view.wrap.uitooltip();
    	    this.clipboard(); 
    	    this.selectboxes(); // реинициализации селектбокса платежной системы

		    this.datepicker(partner.view.wrap.find('#partner_datepicker')); // инициализации инструмента вибора временного периода для отображения статистики партнерской программы за етот период времени


		    partner.view.wrap.find('.daterangepicker.dropdown-menu').hide(); // прячем меню инструмента вибора временного периода

		    // // инициируем горизонтальный скролл плагин для таблицы на мобилах
		    // if ($(window).width() < 768) {
		    //     scroll_horizontal_reinit('#partner_statistic .tabl_scroll_wrap');
		    // }

		    partner.view.wrap.find('.daterangepicker .ranges li').click(function() { // при выборе определенного временного периода
		        var val = $(this).attr('data-range-key'); // берем значение етого временного периода
		        partner.view.wrap.find('#partner_datepicker').text(val); // и вставляем его в враппер для отображения
		    });

		    partner.view.wrap.find('.btn_stat_list').click(function() { // при клике на кнопку "Список привлеченных пользователей"
		        partner.model.open_referals(); // открываем поп-ап список привлеченных пользователей с записью данных о них
		    });

		    partner.view.wrap.find('.income').click(function() { // при клике на кнопку с балансом
		        partner.model.open_balance_pop(); // окрываем поп-ап баланса с данными про операции
		    });

		    partner.view.balance_tab.find('.out_inp').ForceNumericOnly(); // ограничение ввода только цифр в поле суммы выплаты

		    partner.view.balance_tab.find('.button_requesits').click(function() { // при клике на кнопку "Реквизиты" в поп-апе баланса
		        partner.view.wrap.find('#partner_requesits').arcticmodal(); // открываем поп-ап с реквизитами
		    });

		    partner.view.wrap.find('#partner_requesits').find('.save').click(function() { // при клике на кнопку "Сохранить" в поп-апе с реквизитами
		        partner.model.save_requsits(); // проверяем данные реквизитов и сохраняем
		    });

		    partner.view.balance_tab.find('.get_out').click(function() { // при клике на кнопку "Запросить выплату" в поп-апе баланса
		        partner.model.try_to_out(); // проверяем данные и инициируем вывод денег
		    });
    }

}
