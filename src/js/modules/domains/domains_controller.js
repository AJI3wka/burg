;

'use strict';

console.log('domains.controller start');

domains.controller = {

    api_url: api_config.default,

    get_domains:function(callback){

    	var url = domains.controller.api_url + 'Domains';//url запроса получения контента


	    get_json('get', url, {}, function(data) {//удачное выполнение гет запроса

        	if (callback) {
        		callback(data)
        	}

	    });

    },
    prolong:function(id,callback){
	    var url = domains.controller.api_url + 'Domains/prolong';

    		var price = 0;
    		for (var i = domains.model.domains.length - 1; i >= 0; i--) {
    			if(domains.model.domains[i].id == id){
    				price = domains.model.domains[i].prolong_price
    			}
    		}

		    get_json('post', url, {id:id}, function(data){

	            dnk_atom_events({type:'event',category:'pay',action:'domain_prolong',link:'id_'+id+' / '+price});

		    	if (callback) {
		    		callback(data);
		    	}
		    	
		    },false,function(data){
		    	console.log('subscribe_tarif data = ',data);
		    	if(data.msg == "No balance"){

		    		var cur_balance = parseInt(global_user_data.balance.balance.split('.')[0]);
		    		var need = price - cur_balance;
					open_from_url('/balance/pay?target=domainprolong_'+id+'&need='+need,true);
		    		//show_alert_mess('На Вашем счету недостаточно средств для оплаты тарифа. Пополните счет, либо выберите другой тариф.');
		    	}else{
		    		show_alert_mess(data.msg);
		    	}
		    });

	},
	get_ns:function(id,callback){
	    var url = domains.controller.api_url + 'Domains/getNS';



	    get_json('get', url, {id:id}, function(data) {//удачное выполнение гет запроса

        	if (callback) {
        		callback(data.data);
        	}

	    });
	},
	update_ns:function(data,callback){
	    var url = domains.controller.api_url + 'Domains/updateNS';



	    get_json('post', url, data, function(data) {//удачное выполнение гет запроса

        	if (callback) {
        		callback(data);
        	}

	    });
	}

}
