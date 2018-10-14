;

'use strict';

console.log('personal_data.controller start');

personal_data.controller = {

    api_url: api_config.personal_data,
    save_contacts:function(){
	    var url = personal_data.controller.api_url + 'User/setContacts'; //url метода для сохранения контактных данных пользователя

	    var data = { //сохраняем данные в обьект для отправки на сервер
	        content: JSON.stringify(personal_data.model.contacts)//записываем данные в соответствующую переменную
	    };

	    get_json('post',url,data,function(){
	            console.log('Saved new personal info'); //выводим в консоль уведомление, что данные сохранены
	    },false,function(){
	            console.log('Saved new personal info - ERROR'); //выводим в консоль уведомление, что данные сохранены
	    },true);
    },
    get_values:function(callback){

	    var url = personal_data.controller.api_url + 'User/getContacts'; //url метода для получения контактных данных пользователя

	    var data_hash = { //сохраняем данные в обьект для отправки на сервер
	        userKey: global_user_token //записываем юзеркей в соответствующую переменную
	    };

	    get_json('get', url, {}, function(data){
	    	if (if_defined(callback)) {

	    		callback(data);
	    	}

	    });;
    }

}
