;

'use strict';

console.log('checkout.controller start');

checkout.controller = {

    api_url: api_config.default,
    send_cart:function (data,callback) {
		var url = 'https://miasorubka-burger.com.ua/api/Aps/add';
        get_json('post', url, data, function(data) {

			if(callback){
				callback(data);
			}

        });    	
    }

}
