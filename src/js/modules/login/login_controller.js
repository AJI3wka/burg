;

'use strict';

console.log('login.controller start');

login.controller = {
    api_url: api_config.default,
    // api_crm: api_config.crm,
    // validate_email:function(data,callback_true,callback_false){
    	
    // 	var validate_url = login.controller.api_url + 'user/email/validate';

	   //  get_json('get', validate_url, data, callback_true, false, callback_false);

    // },
    login:function(send_data,callback_true,callback_false){

    	var login_url = login.controller.api_url + 'Auth/login';
        get_json('post', login_url, send_data, callback_true, false, callback_false, false, function(){}, true);


        //асинхронно авторизируемся в ЦРМ
        //var url_2 = login.controller.api_crm+'login';

        //ajax_api('post',url_2,send_data);
    },
	remember_me: function(email,callback){

            var url = login.controller.api_url + 'User/restorePasswordRequest';
            var data = {
                email: email
            }

            get_json('post', url, data, callback);
    },
    restore: function(data,callback){

			var url = login.controller.api_url + 'User/restorePasswordConfirm';

	        get_json('post', url, data,callback);
    }

}
