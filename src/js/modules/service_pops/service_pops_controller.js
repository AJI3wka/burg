;

'use strict';

console.log('service_pops.controller start');

service_pops.controller = {

    api_url: api_config.default,

	subscribe_tarif:function(id,callback){
	    var url = service_pops.controller.api_url + 'Services/subscribe';
	    get_json('post', url, {id:id}, callback,false,function(data){
	    	console.log('subscribe_tarif data = ',data);
	    	if(data.msg == "No balance"){
	    		var price = 0;
	    		for(var key in global_user_data.availableServices){
	    			if(global_user_data.availableServices.hasOwnProperty(key)){

	    				if (global_user_data.availableServices[key].id == id) {
	    					price = parseInt(global_user_data.availableServices[key].price);
	    				}

	    			}

	    		}
	    		var cur_balance = parseInt(global_user_data.balance.balance.split('.')[0]);
	    		var need = price - cur_balance;
	    				service_pops.view.close_other();
				open_from_url('/balance/pay?target=tariff_'+id+'&need='+need,true);
	    		//show_alert_mess('На Вашем счету недостаточно средств для оплаты тарифа. Пополните счет, либо выберите другой тариф.');
	    	}else if(data.msg == "Unavailable service"){
	    		show_alert_mess('Этот тариф Вам недоступен.');


	    	}else{
	    		show_alert_mess(data.msg);
	    	}
	    });

	},

	get_available:function(callback){
	    var url = service_pops.controller.api_url + 'Services/getAvailable';
	    get_json('get', url, {}, callback,false,function(data){
	    	if (callback) {
	   			callback(data);	
	    	}
	    });

	},

}
