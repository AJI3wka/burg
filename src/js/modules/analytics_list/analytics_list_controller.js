;

'use strict';

console.log('analytics_list.controller start');

analytics_list.controller = {

    api_url: api_config.default,
    get_list:function(type,callback){

    	var url = analytics_list.controller.api_url+'Pages';
    	get_json('get',url,{pageType:type},function(data){
    		if(callback){
    			callback(type,data);
    		}
    	});

    }

}
