;

'use strict';

console.log('get_dom.controller start');

get_dom.controller = {

    api_url: api_config.default,
    get_domain_zones:function(callback) {
    	var url = get_dom.controller.api_url + 'Domains/getZones';
	    //передача в фоне(без крутилки-лоадера)
	    get_json('get', url, {}, function(data) {
	        //global_zones = data.data; - закоментирован потому что сейчас достпупны только некоторые зоны
	        if (callback) { //если указан колбек делаем колбек от datu
	            callback(data);
	        }
	    }, false, function() {}, true);
	},
	check_domain_name: function(domian_word, callback) {

		/**
	 * [check_domain_name проверить имя домена]
	 * @param  {string}   domian_word     [имя домена]
	 * @param  {Function} callback        [callback(data) - колбек от удачной передачи ]
	 */
	    var send_data = { //объект данных для отправки
	        domain: domian_word
	    };
    	var url = get_dom.controller.api_url + 'Domains/check';

	    //передача в фоне   
	    get_json('get', url, send_data, function(data) {

	        if (callback) { //если указан колбек делаем колбек от datu
	            callback(data.data,domian_word);
	        }

	    }, false, function() {
            if (callback) { //если указан колбек делаем колбек от datu
                callback({check_ok:false},domian_word);
            }
	    },  true);

	},
	create:function(callback){

		var domain_name = $('#atom_personal_data_pop').find('.pop_up_title').find('span').text(); //имя домена с заголовка попапа
        var price = parseInt($('#atom_personal_data_pop').find('.pop_up_title').attr('data-price'));
        
        var data = personal_data.model.contacts; //данные = глобальный обьект контактов

        data.domain = domain_name; //вставляем имя домена в параметр данных
    	var url = get_dom.controller.api_url + 'Domains/create';

        get_json('post', url, data, function(data) { //передаем данные на сервер


            dnk_atom_events({type:'event',category:'pay',action:'domain_reg',link:domain_name+' / '+price});



        	if(callback){
        		callback(data);
        	}
        	
        }, false, function(data) { //при ошибке с сервера
            console.log('ERROR_DATA = = = ', data);

            var exp = data.exp;

            var error_text = '';

            var i_error = '';
            var exp_name = '';

            for (i in exp) { //цикл по ключам объекта ошибок
                if (exp.hasOwnProperty(i)) {

                    //console.log(answer,a[i],i,answer.indexOf(a[i]));
                    //поиск поля и его Имени
                    if (i == 'domain' && exp[i] != 'true') {
                        exp_name = 'Домен';
                        i_error = exp[i];
                    } else
                    if (i == 'e_mail') {
                        exp_name = 'E-mail';
                        i_error = exp[i];
                    } else
                    if (i == 'p_addr') {
                        exp_name = 'Адрес';
                        i_error = exp[i];
                    } else
                    if (i == 'passport') {
                        exp_name = 'Паспортные данные';
                        i_error = exp[i];
                    } else
                    if (i == 'person') {
                        exp_name = 'Ф.И.О в международном формате';
                        i_error = exp[i];
                    } else
                    if (i == 'person_r') {
                        exp_name = 'Ф.И.О';
                        i_error = exp[i];
                    } else
                    if (i == 'phone') {
                        exp_name = 'Телефон';
                        i_error = exp[i];
                    } else
                    if (i == 'country') {
                        exp_name = 'Страна';
                        i_error = exp[i];
                    } else
                    if (i == 'birth_date') {
                        exp_name = 'Дата рождения';
                        i_error = exp[i];
                    } else
                    if (i == 'code') {
                        exp_name = 'ИНН';
                        i_error = exp[i];
                    } else
                    if (i == 'owner_location_state') {
                        exp_name = 'Адрес';
                        i_error = exp[i].error_text;
                    }

                    if (error_text != '') { //строка не пуста то начинать с новывой строки (2 br)
                        exp_name = '<br><br>' + exp_name
                    }
                    if (exp_name != '') { //если поле найдено добавить в строку-каркас ошибок
                        error_text += exp_name + ' : ' + i_error;
                    }

                }
            }

            if (!if_defined(data.domain) && !if_defined(exp_name) && data.msg !="Reg service error" &&  data.msg != "No balance") {//если domain == null
                

                if(data.msg == "Contacts user data is invalid"){

                    exp_name = 'Контактные данные';

                    var warning = 'Данные заполнены не верно. Укажите данные в таком формате, как указано в подсказках к полю';

                    if (error_text != '') { //строка не пуста то начинать с новывой строки (2 br)
                        exp_name = '<br><br>' + exp_name;
                    }
                    
                    error_text += exp_name + ' : ' + warning;      

                }else{


                    exp_name = 'Доменне имя';

                    var warning = 'Доменое имя недоступно для регистрации';

                    if (error_text != '') { //строка не пуста то начинать с новывой строки (2 br)
                        exp_name = '<br><br>' + exp_name;
                    }
                    
                    error_text += exp_name + ' : ' + warning;      
                }        
            }

            if (data.msg == "Reg service error") {//если domain == null

                var warning = 'Ошибка регистратора доменов, пожалуйста сообщите о проблеме в службу поддержки и/или попробуйте позже.';

                if (error_text != '') { //строка не пуста то начинать с новывой строки (2 br)
                    exp_name = '<br><br>' + exp_name;
                }
                
                error_text += warning;
            }

            if (if_defined(data.noBalance) && data.noBalance == true || data.msg == "No balance") {

                exp_name = 'Баланс';

                var cur_balance = parseFloat(global_user_data.balance.balance);
                var $head = $('#atom_personal_data_pop').find('.pop_up_title');

                var need = price - cur_balance;

                open_from_url('/balance/pay?target=domainreg_'+$head.find('span').text()+'_'+price+'_from_'+$('body').attr('data-prew')+'&need='+need,true);

            }else{

                show_alert_mess(error_text); //вывод ошибок в попапе
            }


        });
	}

}
