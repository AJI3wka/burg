;

'use strict';

console.log('user_tools.controller start');

user_tools.controller = {

    api_url: api_config.default,
    change_pass:function(data,callback_true,callback_false){

        var url = user_tools.controller.api_url + 'User/changePassword';
        
        get_json('post', url, data, callback_true, false, callback_false);

    }

}
