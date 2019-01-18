;

'use strict';

console.log('lot_list.events start');

lot_list.events = {
	list_rebind:function(){
		var category = document.location.pathname.replace('/','');
		if (category == 'burgers' || category == 'garnish') {
	    	lot_list.view.wrap.find('.item-wrap').find('.item').find('.img_b').unbind('click').click(function(){
	    		open_from_url(document.location.pathname+'/card?i='+$(this).closest('.item').attr('data-id'),true);
	    	});
		}

		lot_list.view.wrap.find('.item-wrap').find('.item').find('.korz').unbind('click').click(function(){
			$('header').find('.korzina').trigger('click');
		});		
	},

    rebind: function() {
    	lot_list.view.wrap.find('.main_burg').find('a').unbind('click').click(function(e){
    		e.preventDefault();
    		if (!$(this).is('.burgers')) {
    			open_from_url($(this).attr('href'),true);
    		}
    	});
    	
		$(window).unbind('resize',lot_list.view.mansory_resize).resize(lot_list.view.mansory_resize);
    }

}
