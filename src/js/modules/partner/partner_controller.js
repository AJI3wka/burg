;

'use strict';

console.log('partner.controller start');

partner.controller = {

    api_url: api_config.default,
    get_partner_info:function(callback){

	    var url = partner.controller.api_url+'Partnership'; // url метода получения данных статистики

	   
	    get_json('get', url, {}, function(data) {

	        if (callback) {//если есть колбек выполняем его
	            callback(data.data);

	        }

	    });
    },
    get_balance_operations:function(callback){

	    var url = partner.controller.api_url+'Partnership/getPayRequests'; // url метода получения данных статистики


	    get_json('get', url, {}, function(data) {

	        if (callback) {//если есть колбек выполняем его
	            callback(data.data);

	        }

	    });

    },
    save_reqesits:function(data,callback){


	    var url = partner.controller.api_url+'Partnership/setRequisites'; // url метода получения данных статистики

	    var send_data = {content:JSON.stringify(data)};
	    get_json('post', url, send_data, function(data) {

	        if (callback) {//если есть колбек выполняем его
	            callback(data.data);

	        }

	    });
    },
    pay_request:function(data,callback){
    	var url = partner.controller.api_url+'Partnership/payRequest'; // url запроса
    	var send_data = {
    		content:JSON.stringify({ps:data.ps,requisites:data.requisites}),
    		sum:data.get,
    		name:data.ps
    	}
	    get_json('post', url, send_data, function(data) {

	        if (callback) {//если есть колбек выполняем его
	            callback(data.data);

	        }

	    });
    },
    get_partner_stat:function(start,end,callback){


	    var url = partner.controller.api_url+'Partnership/getAnalytics'; // url метода получения данных статистики

	    var data = { // параметры запроса
	        time_unit: 'days', // дата в (секундах) начала периода времени выборки данных статистики
	        from: start, // номер з какого начинаем выборку
	        to: end,
	        //isTest: 1 // количество данных для получения
	        // , isTest: true
	    };

	    get_json('get', url, data, function(data) {

	        if (callback) {//если есть колбек выполняем его
	            callback(data.data);

	        }

	    });
    },
    get_users:function(callback){

	    var url = partner.controller.api_url+'Partnership/getAnalyticsByUsers'; // url метода получения данных статистики

	    var data = { // параметры запроса
	        limit: 100, // дата в (секундах) начала периода времени выборки данных статистики
	        start: 0, // номер з какого начинаем выборку
	        //to: end,
	        //isTest: 1 // количество данных для получения
	        // , isTest: true
	    };

	    get_json('get', url, data, function(data) {

	        if (callback) {//если есть колбек выполняем его
	            callback(data.data);

	        }

	    });

    }

}
