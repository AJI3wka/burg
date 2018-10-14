;

'use strict';

console.log('partner.view start');


partner.view = {

	render_partner_info:function(response){
			var code = response.code; // сохраняем промокод
	        var ref_link = 'https://'+m_lbl_id+'/?promocode=' + code; // сохраняем реферальную ссылку


	        var $partner_statistic = partner.view.wrap; // сохр
	        var $reqesits = $('#partner_requesits'); // сохраняем поп-ап с реквизитами
	        try{
	        	var rq = JSON.parse(response.requisites);
				if(if_defined(rq)){

					var ps = rq.ps;
					var req = rq.requisites;
					$reqesits.find('.selectbox .value').html(ps); // вписуем в поп-ап с реквизитами полученные данные о платежной системе
					$reqesits.find('textarea').val(req); // вписуем в поп-ап с реквизитами полученные данные о платежной системе

				}
	        } catch(e) {
	        
				var req = response.requisites;
				$reqesits.find('textarea').val(req); // в

	        }
	        
	        $partner_statistic.find('.promo_code').attr('data-clipboard-text', code).find('p.text').html(code); // вписуем промокод
	        $partner_statistic.find('.ref_link').attr('data-clipboard-text', ref_link).find('p.text').html(ref_link); 

	        $partner_statistic.find('.income').html(Math.round(parseFloat(response.total.earned)*100)/100 + ' р'); // вписуем баланс партнерки в поле з балансом
	        $partner_statistic.find('.how_have p.text').html(Math.round(parseFloat(response.total.earned)*100)/100 + ' р'); // вписуем баланс партнерки в поп-ап вывода денег

	        $partner_statistic.find('.stat_box.percent').find('.total_users').html(response.total.count+' чел.'); // вписуем баланс партнерки в поле з балансом
	        $partner_statistic.find('.stat_box.percent').find('.percent').html(response.partnerPercent+' %'); // вписуем баланс партнерки в поп-ап вывода денег

	},
	open_balance_pop:function(response){
		console.log('get_balnce_history_data = ', response); // выводим в консоль ответ

        var pay_sum = 0; // переменная с суммой выплат

        var $wrap = partner.view.balance_tab.find('#balance_history_table'); // сохраняем враппер таблицы списка операцый

        $wrap.find('.table_row,.for_empty').remove(); // удаляем все строки таблицы кроме шапки таблицы
        $wrap.append('<tr class="for_empty"><td colspan="3" class="th">список пуст</td></tr>'); // вставляем строку с текстом "список пуст"

        if (if_defined(response)) { // если передан обьект со списком операцый

            $wrap.find('.table_row,.for_empty').remove(); // удаляем все строки таблицы кроме шапки таблицы

            if (response.length < 1) { // если в списке операцый нет ни одной записи

                $wrap.append('<tr class="for_empty"><td colspan="3" class="th">список пуст</td></tr>'); // вставляем строку с текстом "список пуст"
            
            } else { // если в списке операцый есть хоть одна запись

                var content = ''; // переменная для html который будет вставлен в таблицу

                for (var i = 0; i < response.length; i++) { // для каждой операции

                    var o = response[i]; // сохраняем обьект с данными про операции

                    var date = o.date.split(" "); // разбиваем дату на массив с частьями дати и времени
                    date = date[0]; // берем только часть с датой без указания времени

                    pay_sum += parseInt(o.sum); // добавляем выплату в переменную суммы

                    var status_text = 'В обработке'; // переменная со статусом операции

                    if (+o.status === 1) { // если статус 1
                        status_text = 'Оплачено'; // то статус 'Оплачено'
                    }
                    if (+o.status === 2) { // если статус 2
                        status_text = 'Отказано'; // то статус 'Отказано'
                        pay_sum -= parseInt(o.sum); // убираем выплату если ее не сделано
                    }

                    var one_row = '<tr class="table_row">'; // создаем строку таблицы
                    one_row += '<td>' + date + '</td>'; // создаем ячейку с датой
                    one_row += '<td title="Реквизиты оплаты: ' + o.ps + '  ' + o.requisites + '">' + o.sum + '</td>'; // создаем ячейку с суммой
                    one_row += '<td><b>' + status_text + '</b></td>'; // создаем ячейку с статусом операции
                    one_row += '</tr>'; // закрываем строку таблицы

                    content += one_row; // добавляем строку таблицы в переменную со всем добавляемым контентом

                }

                var last_row = '<tr class="table_row">'; // создаем строку таблицы
                last_row += '<td>Итого</td>'; // создаем ячейку с надписью
                last_row += '<td>' + pay_sum + '</td>'; // создаем ячейку с итоговой суммой выплат
                last_row += '<td> - </td>'; // создаем ячейку с надписью
                last_row += '</tr>'; // закрываем строку таблицы

                content += last_row; // добавляем строку таблицы в переменную со всем добавляемым контентом

                $wrap.append(content); // вставляем всю информацию в таблицу
            }
        }		


    	partner.view.balance_tab.arcticmodal(); 
	},
	render_partner_stat:function(response, start, end){
			


	        // var date = new Date(start*1000);

	        // date = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();	        
	        
	        
	        var full_count = (end-start)/60/60/24;

	        //console.log('get_partner_info_data = ', response, date,full_count); // выводим в консоль ответ

	        var $partner_statistic = partner.view.wrap; // сохраняем враппер страницы статистики партнерки// вписуем реферальную ссылку

	        var $wrap = $partner_statistic.find('.main_tabl'); // сохраняем враппер главной таблицы
	        $wrap.find('.table_row,.for_empty').remove(); // удаляем все строки таблицы кроме шапки таблицы

	        if (response.length < 1) { // если нет ни одной записи статистики, то

	            $wrap.append('<tr class="for_empty"><td colspan="6" class="th">список пуст</td></tr>'); // вставляем строку с текстом "список пуст"

	        } else { // если есть хоть одна запись статистики, то

	            var content = ''; // переменная для html который будет вставлен в таблицу

	            var used = 0;
	            var total ={
	            	earned:0,
	            	payForSubs:0,
	            	register:0,
	            }

	            for (var i = 0; i < full_count; i++) { // для каждой записи статистики
	            	

			        var date = new Date((start+i*60*60*24)*1000);
			        var day = date.getDate();
			        if(day<10){
			        	day = '0'+day.toString();
			        }
			        var month = date.getMonth()+1;
			        if(month<10){
			        	month = '0'+month.toString();
			        }
			        var for_table_date = day+'.'+month+'.'+date.getFullYear()
			        date = date.getFullYear()+'-'+month+'-'+day;

					var o = {
        				date:date,
        				earned:0,
        				payForSubs:0,
        				register:0
        			};
	            	if (used < response.length) {	
	            		for (var j = 0; j < response.length; j++) {
	            			if(response[j].date == date){

			            		o = response[used];
			            		used++;
	            			}

	            		}
	            	} // сохраняем обьект отдельной записи статистики

	            	console.log('LOC = ',o);
	                var one_row = '<tr class="table_row">'; // создаем строку таблицы

	                //var date_for_table = o.date; // записываем дату
	                //if (date_for_table.length > 10) date_for_table = date_for_table.slice(0, 10); // если в дате больше символов чем нада (указано время ЧЧ:ММ) то обрезаем лишнеее
	                one_row += '<td>' + for_table_date + '</td>'; // создаем ячейку с датой
	                one_row += '<td>' + o.register + ' чел.</td>'; // создаем ячейку с колл-вом регистраций
	                one_row += '<td>' + (+o.payForSubs).toFixed(2) + ' р.</td>'; // создаем ячейку с суммой пополнений баланса в лк
	                one_row += '<td>' + (+o.earned).toFixed(2) + ' р.</td>'; // создаем ячейку с суммой комиссии за использование сервиса
	                one_row += '</tr>'; // закрываем строку таблицы

	                content += one_row; // добавляем строку таблицы в переменную со всем добавляемым контентом
	                
	                total.earned +=o.earned;

	                total.payForSubs +=o.payForSubs;
	                
	                total.register += +(o.register);
	                
	            }

	            var last_row = '<tr class="table_row">'; // создаем строку таблицы

	            last_row += '<td>Итого</td>'; // создаем ячейку с подписью
	            last_row += '<td>' + total.register + ' чел.</td>'; // создаем ячейку с итоговым колл-вом регистраций
				last_row += '<td>' + (+total.payForSubs).toFixed(2) + ' р.</td>'; // создаем ячейку с итоговой суммой комиссии за использование сервиса
	           	last_row += '<td><b>' + (+total.earned ).toFixed(2) + ' р.</b></td>'; // создаем ячейку с итоговой суммой пополнений баланса в лк
	            last_row += '</tr>'; // закрываем строку таблицы

	            content += last_row; // добавляем строку таблицы в переменную со всем добавляемым контентом

	            $wrap.append(content); // вставляем всю информацию в таблицу
	        }
	},
	open_referals:function(response){
		var $wrap = $('#referals_table'); // сохраняем враппер таблицы списка привлеченных пользователей

        $wrap.find('.table_row,.for_empty').remove(); // удаляем все строки таблицы кроме шапки таблицы
        $wrap.append('<tr class="for_empty"><td colspan="3" class="th">список пуст</td></tr>'); // вставляем строку с текстом "список пуст"

        if (if_defined(response)) { // если передан обьект со списком привлеченных пользователей

            $wrap.find('.table_row,.for_empty').remove(); // удаляем все строки таблицы кроме шапки таблицы

            if (response.length < 1) { // если в списке привлеченных пользователей нет ни одного пользователя

                $wrap.append('<tr class="for_empty"><td colspan="3" class="th">список пуст</td></tr>'); // вставляем строку с текстом "список пуст"

            } else { // если в списке привлеченных пользователей есть хоть один пользователь

                var content = ''; // переменная для html который будет вставлен в таблицу

                var proffit_summ = 0; // переменная с сумарной прибылью

                for (var j = 0; j < response.length; j++) { // для каждого привлеченного пользователя с обьекта

                    var o = response[j]; // сохраняем обьект с данными про отдельного привлеченного пользователя

                    var date = o.moment.split(" "); // разбиваем дату на массив с частьями дати и времени
                    date = date[0]; // берем только часть с датой без указания времени
                    date = date.split("-");
                    date = date[2]+'.'+date[1]+'.'+date[0];
                    // var name_parts = o.name.split('@'); // разделяем имя (емейл) на части
                    // var name_holder = name_parts[0]; // берем только первую часть имени

                    // console.log(name_holder); // выводим в консоль имя

                    // var i; // для счетчика цыкла
                    // for (i = 0; i < name_holder.length; i = i + 3) { // для каждого третьево символа в имени пользователя
                    //     name_holder = setCharAt(name_holder, i, '*'); // заменяем определённый символ на "*"
                    // }

                    // var email_part = 'gmail.com'; // создаем переменную с хвостом пошты

                    // if (name_parts[1]) { // если был передан хвост пошты
                    //     email_part = name_parts[1]; // то сохраняем его в переменную
                    // }

                    // for (i = 0; i < email_part.length; i++) { // для каждого символа в хвосте пошты
                    //     email_part = setCharAt(email_part, i, '*'); // заменяем определённый символ на "*"
                    // }

                    proffit_summ += parseInt(o.earned); // сохраняем прибыль

                    var one_row = '<tr class="table_row">'; // создаем строку таблицы
                    one_row += '<td>' + o.email + '</td>'; // создаем ячейку с емейлом
                    one_row += '<td>' + date + '</td>'; // создаем ячейку с датой
                    one_row += '<td>' + o.earned + ' р</td>'; // создаем ячейку с прибылью
                    one_row += '</tr>'; // закрываем строку таблицы

                    content += one_row; // добавляем строку таблицы в переменную со всем добавляемым контентом

                }


                var last_row = '<tr class="table_row">'; // создаем строку таблицы
                last_row += '<td>Итого</td>'; // создаем ячейку с надписью
                last_row += '<td> - </td>'; // создаем ячейку с надписью
                last_row += '<td><b>' + proffit_summ + ' р</b></td>'; // создаем ячейку с итоговой прибылью
                last_row += '</tr>'; // закрываем строку таблицы

                content += last_row; // добавляем строку таблицы в переменную со всем добавляемым контентом

                $wrap.append(content); // вставляем всю информацию в таблицу

            }

        }

        $('#referals_list').arcticmodal(); // окрываем поп-ап с списком привлеченных пользователей		
	}
}
