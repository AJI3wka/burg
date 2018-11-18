;

'use strict';

console.log('card.events start');

card.events = {
	rebind_slider:function(){

		card.view.card.find('.pager').find('a').unbind('click').click(function(e) {
			e.preventDefault();
			var id = $(this).attr("href").split('=')[1];
			card.view.run_slide_by_id(id,true);
		});

		if (card.view.card.find('.bx-controls').find('.next').length == 0) {
			card.view.card.find('.bx-controls').append('<div class="prew"></div><div class="next"></div>');

		}
    	card.view.card.find('.bx-controls').find('.prew').unbind('.click').click(function(){
    		card.view.card_slider.goToPrevSlide();
    	});
		card.view.card.find('.bx-controls').find('.next').unbind('.click').click(function(){
    		card.view.card_slider.goToNextSlide();
    	});    	
    	card.view.card.find('.bx-viewport').find('.free-delivery').unbind('click').click(function(e){
    		e.preventDefault();
    		open_from_url($(this).attr('href'),true);
    	});

    	card.view.card.find('.navigation').find('a').unbind('click').click(function(e){
    		e.preventDefault();
    		if (!$(this).is('.name')) {

    			open_from_url($(this).attr('href'),true);    	
    		}	
    	});
    	
		card.view.card.find('.korz').unbind('click').click(function(){
			$('header').find('.korzina').trigger('click');
		});

	},


    rebind: function() {
    	
    }

}
