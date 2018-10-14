;

'use strict';

console.log('preland_list.controller start');

preland_list.controller = {

    api_url: api_config.default,
    crm_url: api_config.crm,
    get_list:function(callback){

	
	get_user_info(function(){},function(){},true);
	    var url = preland_list.controller.api_url + 'Pages?pageType=preland';

	    get_json('get', url, {}, function(data) {

	        if (callback) {//если есть колбек выполняем его
	            callback(data.data);

	        }

	    });
    },
  //   get_stat_data:function(id,callback){

	 //    var url = preland_list.controller.crm_url + 'getAnalytics';

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

	    var url = preland_list.controller.api_url + 'Page/delete';

	    get_json('post', url, {siteID:site_id}, function() {
	        if (callback) {
	            callback();
	        } 
	    });
    }

}
