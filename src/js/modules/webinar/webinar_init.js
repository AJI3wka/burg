;

'use strict';

console.log('webinar.init start');

webinar.init = function() {
    console.log('webinar.init!!!!');

    console.log('WTF1')
    if (!if_defined(global_user_data)) {
$('#main_webinar_header').show();
    	
    }else{

$('#main_webinar_header').hide();
    }

    webinar.events.rebind();
};
webinar.init();
