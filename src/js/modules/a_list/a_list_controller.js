;

'use strict';

console.log('a_list.controller start');

a_list.controller = {

    api_url: api_config.default,
    get_list:function(callback){

	    var url = a_list.controller.api_url + 'Amgs';

	    get_json('get', url, {}, function(data) {

	        if (callback) {//если есть колбек выполняем его
	            callback(data.data);

	        }

	    });
    },
    // get_ad_data:function(id,callback){

	   //  var url = a_list.controller.api_url + 'advertising/content/' + id;

	   //  var data = {
	   //      userKey: global_user_token
	   //  };

	   //  get_json('get', url, data, function(data) {


	   //      if (callback) {
	   //          callback(id, data.response);
	   //      } 

	   //  },false,function(){},true);
    // },
    delete_ad:function(campaign_id,callback){

	    var url = a_list.controller.api_url + 'Amg/delete';

	    get_json('post', url, {id:campaign_id}, function() {
	        if (callback) {
	            callback();
	        } 
	    });
    }

}
