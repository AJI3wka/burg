;

'use strict';

console.log('lp3_list.controller start');

lp3_list.controller = {

    api_url: api_config.default,
    crm_url: api_config.crm,
    get_list:function(callback){

	
	get_user_info(function(){},function(){},true);
	    var data_hash = {
	        userKey: global_user_token,
        	filter:'page3'
	    };
	    var url = lp3_list.controller.api_url + 'Pages?pageType=page3';

	    get_json('get', url, data_hash, function(data) {

	        if (callback) {//если есть колбек выполняем его
	            callback(data.data);

	        }

	    });
    },
  //   get_stat_data:function(id,callback){

	 //    var url = lp3_list.controller.crm_url + 'getAnalytics';

		// var data = {
	 //        siteID: id
	 //    };

	   
	 //    ajax_api('get',url,data,function(analytis_data){
	        
	 //        if (callback) {

	 //            callback(id,analytis_data);
	 //        } 

  //   	},function(){},false,true);
  //   },
    delete:function(site_id,callback){

	    var url = lp3_list.controller.api_url + 'Page/delete';

	    get_json('post', url, {siteID:site_id}, function() {
	        if (callback) {
	            callback();
	        } 
	    });
    }

}
