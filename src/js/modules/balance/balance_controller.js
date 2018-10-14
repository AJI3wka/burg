;

'use strict';

console.log('balance.controller start');

balance.controller = {

    api_url: api_config.default,
    alt_api_url: api_config.crm,
	make_robokassa_redirect:function($wrapOrValue) {
		var value;
		if (! $.isNumeric($wrapOrValue)) {
			value = parseInt($wrapOrValue.find('input[name="value"]').val());
		} else {
			value = $wrapOrValue;
		}

	    var url = balance.controller.api_url + 'Payment/add';

	    var data = {
	        sum: value
	        //what_pay: target
	    };

	    get_json('post', url, data, function(data) {

	        if (if_defined(data.data.url)) {
	            document.location.href = data.data.url;
	        }

	    });

	},
	subscribe_tarif:function(id,callback){
	    var url = balance.controller.api_url + 'Services/subscribe';


		var price = 0;
		for(var key in global_user_data.availableServices){
			if(global_user_data.availableServices.hasOwnProperty(key)){

				if (global_user_data.availableServices[key].id == id) {
					price = parseInt(global_user_data.availableServices[key].price);
				}

			}

		}

	    get_json('post', url, {id:id}, function(data){

	    	dnk_atom_events({type:'event',category:'pay',action:'tariff',link:price});


	    	if (callback) {
	    		callback(data);
	    	}


	    },false,function(data){
	    	console.log('subscribe_tarif data = ',data);
	    	if(data.msg == "No balance"){
	    		var cur_balance = parseInt(global_user_data.balance.balance.split('.')[0]);
	    		var need = price - cur_balance;
				open_from_url('/balance/pay?target=tariff_'+id+'&need='+need,true);
	    		//show_alert_mess('На Вашем счету недостаточно средств для оплаты тарифа. Пополните счет, либо выберите другой тариф.');
	    	}else if(data.msg == "Unavailable service"){
	    		show_alert_mess('Этот тариф Вам недоступен.');


	    	}else{
	    		show_alert_mess(data.msg);
	    	}
	    });

	},
	get_available:function(callback) {

	    var url = balance.controller.api_url + 'Services/getAvailable';

	    get_json('get', url, {}, callback);

	},
 //    get_user_balance:function(bg) {

	//     var background = false; //по умолчанию делаем обновление не в фоне

	//     if (bg) { //если передан аргумент
	//         background = true; //и если выполнить обновление в фоне
	//     }

	//     var url = balance.controller.api_url + 'balance'; //url метода для получения данных о балансе

	//     var data = {
	//         userKey: global_user_token //записываем юзеркей в соответствующую переменную
	//     };

	//     get_json('get', url, data, function(data) { //отправляем запрос на получение данных о балансе

	//         var $fr_balance = balance.view.wrap.find('.fr_balance');
	//         var $balance = $('#balance');

	//         if (if_defined(data.response)) { //если есть данные в ответе

	//             $balance.attr('title', 'Ваш баланс: ' + data.response + ' руб.'); //записываем баланс в tooltip для кнопки баланса
	//             $fr_balance.html(numberWithSpaces(parseInt(data.response))+ ' руб.'); //записываем баланс в поле отображения баланса на странице баланса
	//         } else { //если данных нет
	//             $balance.attr('title', 'Ваш баланс: 0 руб.'); //записываем нулёвой баланс
	//             $fr_balance.html('0 руб.'); //записываем нулёвой баланс
	//         }

	//     }, false, function() {}, background);
	// },
	get_user_history:function(startPos,limit,callback){

	    var url = balance.controller.api_url + 'User/getTransactions'; //url метода для получения истории транзакций пользователя

	    var data_hash = {
	        startPos: startPos, //записываем стартовую позицию
	        limit: limit //записываем количесво пизиций
	    };

	    ajax_api('get', url, data_hash, function(data) { 

		    if(if_defined(callback)){
		    	callback(data);
		    }

		});

	}

}
