;

'use strict';

console.log('menu.events start');

menu.events = {

	menu_link_click:function(e){
		e.preventDefault();
		
		open_from_url($(this).attr('href'),true);
	},
    rebind: function() {
    	menu.view.header.find('.menu_link').unbind('click').click(menu.events.menu_link_click);
    	menu.view.footer.find('.menu_link').unbind('click').click(menu.events.menu_link_click);
    }

}
