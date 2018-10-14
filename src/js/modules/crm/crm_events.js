;

'use strict';

console.log('crm.events start');

crm.events = {


    rebind: function() {

    	var $frame_logo = $('#user-tools-logo').find('.logo');
    	$frame_logo.unbind('click');
    	$frame_logo.click(function(){
    		open_from_url('/tools',true);
    	});
    	$frame_logo.show();
    }

}
