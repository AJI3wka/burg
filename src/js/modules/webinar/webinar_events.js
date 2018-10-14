;

'use strict';

console.log('webinar.events start');

webinar.events = {


    rebind: function() {
    	
    	$wrap = $('#webinar');

    	$wrap.find('.play').unbind('click');
		$wrap.find('.play').click(function(){
			$(this).parent().append('<p id="center_p">Трасляция начнётся в эту пятницу 13 апреля в 20:00</p>');
			$(this).remove();
		});

    }


}
