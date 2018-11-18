;

'use strict';

console.log('main.events start');

main.events = {


    rebind: function() {
    	main.view.wrap.find('a').unbind('click').click(function(event) {
    		event.preventDefault();
    		open_from_url($(this).attr('href'),true);

    	});
    }

}
