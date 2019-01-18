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
        //$('body').on('click',click_once);
    	click_once = function(){
    		menu.view.header.find('.menu').removeClass('opened');
    		$('body').unbind('click touchmove touch',click_once);
    	}

    	menu.view.header.find('.btn').unbind('click').click(function(e){
    		e.stopPropagation();

    		var $menu = menu.view.header.find('.menu');

    		if($menu.hasClass('opened')){
    			
				$menu.removeClass('opened');
    		}else{
    			$menu.addClass('opened');
    			$('body').unbind('click touchmove touch',click_once).on('click touchmove touch',click_once);

    		}
    	});
    	
    }

}
