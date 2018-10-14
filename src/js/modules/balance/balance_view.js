;

'use strict';

console.log('balance.view start');


balance.view = {
	wrap:$('#balance_body'),
    clear_history:function(data){


        var $history_table = balance.view.wrap.find('.history_table');

        $history_table.find('.for_empty_list').remove(); // удяляем ету строку (ряд)

        $history_table.each(function(index, el) {
            
            var $this = $(this);
            var $r_csroll = $this.find('.table_right_scrol');
            if ($this.hasClass('mobile')) {
                $r_csroll.find('tbody').html('');
                $r_csroll.find('.tr_date').html('');
                $r_csroll.find('.tr_nomber').html('');
                $r_csroll.find('.tr_appointment').html('');
                $r_csroll.find('.tr_amount').html('');
            }else if($this.hasClass('desktop_mobile')||$this.hasClass('tablet')){
                $this.find('tbody').html('');;

            }
        });
    },
	render_user_history:function(data){   

        ////alert('render')

        var $fr_balance = balance.view.wrap.find('.fr_balance');
        var $balance = $('#balance');

        if (if_defined(data.data.balance)) { //если есть данные в ответе

            $balance.attr('title', 'Ваш баланс: ' + data.data.balance.balance + ' руб.'); //записываем баланс в tooltip для кнопки баланса
            $fr_balance.html(numberWithSpaces(parseInt(data.data.balance.balance))+ ' руб.'); //записываем баланс в поле отображения баланса на странице баланса
        } else { //если данных нет
            $balance.attr('title', 'Ваш баланс: 0 руб.'); //записываем нулёвой баланс
            $fr_balance.html('0 руб.'); //записываем нулёвой баланс
        }


        var transaction_arr =  data.data.transactions; //делаем массив со всеми транзакциями пользователя
        transaction_amount = transaction_arr.length; //вичисляем сколько транзакций было одержано

        if (transaction_amount < 1) {

			balance.events.history_scroll_reinit();
			return; //если нет ни одной транзакции то ничего не делаем далее
        }




		var $history_table = balance.view.wrap.find('.history_table')
        $history_table.find('.for_empty_list').remove(); // удяляем ету строку (ряд)

        var full_tr = ''; //создаем переменную для создания строки полученных данных (транзакций) в виде html, потом вставляеться в таблицу
        var full_td_date = ''; //создаем переменную для создания строки полученных данных (транзакций) в виде html, потом вставляеться в таблицу
        var full_td_nomber = ''; //создаем переменную для создания строки полученных данных (транзакций) в виде html, потом вставляеться в таблицу
        var full_mob_td_appointment = ''; //создаем переменную для создания строки полученных данных (транзакций) в виде html, потом вставляеться в таблицу
        var full_td_amount = ''; //создаем переменную для создания строки полученных данных (транзакций) в виде html, потом вставляеться в таблицу

        var new_mobile_tr = '<tr class="tr_date"></tr><tr class="tr_nomber"></tr><tr class="tr_appointment"></tr><tr class="tr_amount"></tr>'; //создаем нудние строки таблицы для мобилы,
        console.log('transaction_amount = ',transaction_amount);
        for(var i=0; i<transaction_amount; i++) { //проходимся по всех транзакциях

            var transaction = transaction_arr[i]; //записываем обьект текущей транзакции в переменную

            var transaction_summ = parseFloat(transaction.amount);//сумма транзакции для "костыля" назначения
            console.log('transaction_summ = ',transaction_summ);

            if (transaction_summ >= 1 && transaction.status == "process" || transaction_summ >= 1 && transaction.status == "success") { //не выводить транзакции сумма которых ниже 1р

            		var transaction_Date;
            		//if (transaction.invoice_date.length === 13) {
            		//		transaction_Date = new Date(1*transaction.invoice_date); //переводим дату со строки в нужный формат даты
            		//} else {
            				transaction_Date = new Date(transaction.moment); //переводим дату со строки в нужный формат даты
            		//}
                // console.log(transaction.invoice_date);
                // console.log(transaction_Date.toLocaleString());
                var month = transaction_Date.getMonth() + 1; //берём из даты месяц
                if(month < 10) month = '0' + month; //если месяц менше 10 добавляем спереди 0 чтоби привести к двузначному числу
                var day = transaction_Date.getDate(); //берём из даты число (день)
                if(day < 10) day = '0' + day; //если число (день) менше 10 добавляем спереди 0 чтоби привести к двузначному числу
                var year = transaction_Date.getFullYear(); //берём из даты год
                var td_date = '<td class="td_date">'+ day + '.' + month + '.' + year + '</td>'; //делаем ячейку с данными о дате транзакции

                var td_nomber = '<td class="td_nomber">' + transaction.id + '</td>'; //делаем ячейку с данными о дате транзакции

                var td_amount = numberWithSpaces(parseFloat(transaction.amount)) + ' руб.'; //более "красивая" запись суммы

                var td_appointment = ''; // переменная в которую будет записано назначение платежа
                var td_amount_class = 'plus'; // клас для ячейки с суммой платежа (plus - если пополнение денег(зеленый цвет суммы в ячейке), minus - если снятие денег(красный цвет суммы в ячейке))
                if(transaction.paymentType == "deposit") { // если тип операции 0 то ето пополнение, тогда
                    //td_appointment = 'Пополнение счета'; // назначение платежа ето 'Пополнение счета'
                } else { // если тип операции 1 или другой то ето снятие денег, тогда
                    td_amount_class = 'minus'; // клас для ячейки с суммой платежа (minus - если снятие денег(красный цвет суммы в ячейке))

                    // if(transaction.bill_id) { // если передано id транзакции

                    //     console.log(transaction.bill_id);
                    //     // console.log(appointment_arr);

                    //     if(transaction.name) { // если передано назначения транзакции
                    //         td_appointment = transaction.name; // сохраняем назначение транзакции
                    //     } else { // если не передано назначения транзакции
                    //         td_appointment = 'Назначение неизвестно'; // то назначение неизвестно
                    //     }

                    // } else { // если не передано id транзакции
                    //     if(transaction.name) { // если передано назначения транзакции
                    //         td_appointment = transaction.name; // сохраняем назначение транзакции
                    //     } else { // если не передано назначения транзакции
                    //         td_appointment = 'Назначение неизвестно'; // то назначение неизвестно
                    //     }
                    // }

                    //Костыль для вывода назначения платежа. Удалить код ниже после поправки
                
                    // if(transaction_summ === 1 || transaction_summ === 10 || transaction_summ === 15 || transaction_summ === 20){
                    //     td_appointment = 'Открытие заявки в CRM';
                    // }else
                    // if(transaction_summ === 179){
                    //     td_appointment = 'Обучение. Оплата 2-ой части курса';
                    // }else
                    // if(transaction_summ === 4790){
                    //     td_appointment = 'Обучение. Оплата 3-ей части курса';
                    // }else if(transaction_summ>=500){
                    //     td_appointment = 'Пополнение Яндекс.Директ';
                    // }else{
                    //     td_appointment = 'Назначение неизвестно';
                    // }

                }

                if (transaction.description) { // если передано назначение платежа, то
                    td_appointment = transaction.description; // присваеваем назначение платежа
                    if(td_appointment.indexOf('Steps One пользователя')>-1){
                        td_appointment = td_appointment.replace(/Steps One пользователя (.*) на /g,'на ')
                        
                    }else 
                    if(td_appointment.indexOf('Steps.one пользователя')>-1){
                        td_appointment = td_appointment.replace(/Steps\.one пользователя (.*) на /g,'на ')
                        
                    }else 
                    if(td_appointment.indexOf('ДНК пользователя')>-1){
                        td_appointment = td_appointment.replace(/ДНК пользователя (.*) на /g,'на ')
                        
                    }else if(td_appointment.indexOf(', пользователю')>-1){
                        td_appointment = td_appointment.replace(/\, пользователю (.*)/g,'')
                        
                    }
                }

                var mob_td_appointment = ''; // назначение платежа для мобильной версии должно быть короче, чтобы вмещалось в ячейку
                if (td_appointment.length > 30) { // если длина назначения слишком велика, то
                    mob_td_appointment = td_appointment.slice(0, 27) + '...'; // сохраняем обрезанное назначения с троеточеем в конце
                } else { // если длина назначения не слишком велика, то
                    mob_td_appointment = td_appointment; // сохраняем назначения как есть
                }

                mob_td_appointment = '<td class="td_appointment">'+ mob_td_appointment + '</td>'; //делаем ячейку с данными о назначение платежа
                td_appointment = '<td class="td_appointment">'+ td_appointment + '</td>'; //делаем ячейку с данными о назначение платежа

                var td_amount_sign = '+ '; //создаем переменную со знаком которий будет стоять перед суммой транзакции, по умолчанию "+"
                if(td_amount_class === 'minus') td_amount_sign = '- '; //если класс суммы 'minus', то ето снятие средств, соответственно знак будет "-"
                td_amount = '<td class="td_amount ' + td_amount_class + '">' + td_amount_sign + td_amount + '</td>'; //делаем ячейку с суммой платежа
                
                // для таблицы истории транзакций в десктоп и таблет
                full_tr += '<tr>' + td_date + td_nomber + td_appointment + td_amount + '</tr>'; //создаем строку (ряд) таблицы з данными о транзакции
                // добавляем в строку текущий платеж

                // для таблицы истории транзакций на мобилах
                full_td_date += td_date; // добавляем в строку дату текущего платежа
                full_td_nomber += td_nomber; // добавляем в строку номер текущего платежа
                full_mob_td_appointment += mob_td_appointment; // добавляем в строку назначение текущего платежа
                full_td_amount += td_amount; // добавляем в строку сумму текущего платежа
            }
        }


        console.log('new_mobile_tr = ',new_mobile_tr);

        $history_table.each(function(index, el) {
			
			var $this = $(this);
			var $r_csroll = $this.find('.table_right_scrol');
			if ($this.hasClass('mobile')) {
				$r_csroll.find('tbody').append(new_mobile_tr);
				$r_csroll.find('.tr_date').append(full_td_date);
				$r_csroll.find('.tr_nomber').append(full_td_nomber);
				$r_csroll.find('.tr_appointment').append(full_mob_td_appointment);
				$r_csroll.find('.tr_amount').append(full_td_amount);
			}else if($this.hasClass('desktop_mobile')||$this.hasClass('tablet')){
                console.log('full_tr = ',full_tr);
				$this.find('tbody').append(full_tr);

			}
        });

        // для таблицы истории транзакций в десктоп и таблет
        // $(full_tr).appendTo('#balance_body .history_table.desktop_mobile tbody'); // вставляем строку в конец таблицы десктопа
        // $(full_tr).appendTo('#balance_body .history_table.tablet tbody'); // вставляем строку в конец таблицы таблетки

        // // для таблицы истории транзакций на мобилах
        // $(full_td_date).appendTo('#balance_body .history_table.mobile .table_right_scrol .tr_date'); // вставляем ячейки с датой транзакции в конец строки (ряда) з датамы транзакций
        // $(full_td_nomber).appendTo('#balance_body .history_table.mobile .table_right_scrol .tr_nomber'); // вставляем ячейки с номером транзакции в конец строки (ряда) з номерамы транзакций
        // $(full_mob_td_appointment).appendTo('#balance_body .history_table.mobile .table_right_scrol .tr_appointment'); // вставляем ячейки с назначением транзакции в конец строки (ряда) з назначениями транзакций
        // $(full_td_amount).appendTo('#balance_body .history_table.mobile .table_right_scrol .tr_amount'); // вставляем ячейки с суммой транзакции в конец строки (ряда) з суммами транзакций


        //if (limit > transaction_amount) { // если получено менше данных чем было в запросе,
        		$history_table.attr('data-end-transaction-list', true); // значит ето конец истории транзакций и они все получены
  //       } else { // если получено нужное количество данных как было в запросе,
  //       	$history_table.attr('data-end-transaction-list', false); // значит ето еще не конец истории транзакций
  //       }
		// $history_table.attr('data-last-end', (last_transaction + transaction_amount)); // устанавливаем номер последней полученной транзакции

		balance.events.history_scroll_reinit();

	}

}
