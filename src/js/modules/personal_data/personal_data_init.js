;

'use strict';

console.log('personal_data.init start');

personal_data.init = function() {
    console.log('personal_data.init!!!!');

    function after_load(){
    	
	    personal_data.view.wraps = $('.personal_data'); 
	    personal_data.model.paste_values(function(){

	    	personal_data.events.rebind();
	    });
    }

    var $wraps_to_load = $('.personal_data_wrap')
    if($wraps_to_load.length == $wraps_to_load.find('.personal_data').length){
    	after_load();

    }else{
    	
    	$wraps_to_load.load(source_url+'/html/parts/personal_data.html', function() {//по загрузке каркаса

			after_load();

        });
    }
};
personal_data.init();
