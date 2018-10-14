;

'use strict';

console.log('helpers.controller start');

helpers.controller = {

    api_url: api_config.default,
    send_callback:function(data,callback){


    	var url = helpers.controller.api_url + 'Services/createAtomMarketingOrder';
        get_json('post', url, data, callback);

		dnk_atom_events({type:'event',category:'need',action:'expert',link: data.type+' / '+data.price});        


    },
    event:function(){
		

    }

}
