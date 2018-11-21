;

'use strict';

console.log('basket_events.events start');

basket_events.events = {

	rebind_card:function(){
		basket_events.view.wrap.find('.card').find('.button_wrap').find('.add').unbind('click').click(function(){
			var id = $(this).closest('.item').attr('data-id');
			var category = document.location.pathname.replace('/card','').replace('/','');
			
			basket_events.model.add_item(category,id);
		});

		basket_events.view.wrap.find('.card').find('.button_wrap').find('.plus').unbind('click').click(function(){
			var id = $(this).closest('.item').attr('data-id');
			var category = document.location.pathname.replace('/card','').replace('/','');
			
			basket_events.model.add_item(category,id);
		});

		basket_events.view.wrap.find('.card').find('.button_wrap').find('.minus').unbind('click').click(function(){
			var id = $(this).closest('.item').attr('data-id');
			var category = document.location.pathname.replace('/card','').replace('/','');
			

			if (parseInt($(this).parent().find('.howmuch').html())>1) {

				basket_events.model.remove_item(category,id);
			}			
		});
	},
	rebind_card_souses:function(){
		basket_events.view.wrap.find('.souses').find('.list').find('.add').unbind('click').click(function(){
			var id = $(this).closest('.item').attr('data-id');
			var category = 'souses';
			
			basket_events.model.add_item(category,id);
		});

		basket_events.view.wrap.find('.souses').find('.list').find('.plus').unbind('click').click(function(){
			var id = $(this).closest('.item').attr('data-id');
			var category = 'souses';
			
			basket_events.model.add_item(category,id);
		});

		basket_events.view.wrap.find('.souses').find('.list').find('.min').unbind('click').click(function(){
			var id = $(this).closest('.item').attr('data-id');
			var category = 'souses';
			

			if (parseInt($(this).parent().find('span').html())>1) {

				basket_events.model.remove_item(category,id);
			}			
		});


	},
	rebind_card_drinks:function(){
		basket_events.view.wrap.find('.drinks').find('.list').find('.add').unbind('click').click(function(){
			var id = $(this).closest('.item').attr('data-id');
			var category = 'drinks';
			
			basket_events.model.add_item(category,id);
		});

		basket_events.view.wrap.find('.drinks').find('.list').find('.plus').unbind('click').click(function(){
			var id = $(this).closest('.item').attr('data-id');
			var category = 'drinks';
			
			basket_events.model.add_item(category,id);
		});

		basket_events.view.wrap.find('.drinks').find('.list').find('.min').unbind('click').click(function(){
			var id = $(this).closest('.item').attr('data-id');
			var category = 'drinks';
			

			if (parseInt($(this).parent().find('span').html())>1) {

				basket_events.model.remove_item(category,id);
			}			
		});
	},
	rebind_list:function(){
		basket_events.view.wrap.find('.burgs').find('.item-wrap').find('.add').unbind('click').click(function(){
			var id = $(this).closest('.item').attr('data-id');
			var category = document.location.pathname.replace('/','');
			
			basket_events.model.add_item(category,id);
		});

		basket_events.view.wrap.find('.burgs').find('.item-wrap').find('.plus').unbind('click').click(function(){
			var id = $(this).closest('.item').attr('data-id');
			var category = document.location.pathname.replace('/','');
			
			basket_events.model.add_item(category,id);
		});

		basket_events.view.wrap.find('.burgs').find('.item-wrap').find('.minus').unbind('click').click(function(){
			var id = $(this).closest('.item').attr('data-id');
			var category = document.location.pathname.replace('/','');

			if (parseInt($(this).parent().find('.howmuch').html())>1) {

				basket_events.model.remove_item(category,id);
			}			
		});


	},
	rebind_cart:function(){
		basket_events.view.wrap.find('.list').find('.plus_w').unbind('click').click(function(){
			var $p = $(this).closest('.pos_basket');
			var id = $p.attr('data-id');
			var category = $p.attr('data-category');

			basket_events.model.add_item(category,id);
		});
		basket_events.view.wrap.find('.list').find('.minus_w').unbind('click').click(function(){
			var $p = $(this).closest('.pos_basket');
			var id = $p.attr('data-id');
			var category = $p.attr('data-category');

			if (parseInt($(this).parent().find('.howmuch').html())>1) {

				basket_events.model.remove_item(category,id);
			}
			
		});
		basket_events.view.wrap.find('.list').find('.close').unbind('click').click(function(){
			var $p = $(this).closest('.pos_basket');
			var id = $p.attr('data-id');
			var category = $p.attr('data-category');
			
			basket_events.model.remove_item(category,id,true);
		});

	},
	rebind_checkout:function(){
		basket_events.view.wrap.find('.list').find('.plus_w').unbind('click').click(function(){
			var $p = $(this).closest('.pos');
			var id = $p.attr('data-id');
			var category = $p.attr('data-category');

			basket_events.model.add_item(category,id);
		});
		basket_events.view.wrap.find('.list').find('.minus_w').unbind('click').click(function(){
			var $p = $(this).closest('.pos');
			var id = $p.attr('data-id');
			var category = $p.attr('data-category');
			
			if (parseInt($(this).parent().find('.howmuch').html())>1) {

				basket_events.model.remove_item(category,id);
			}
		});
		basket_events.view.wrap.find('.list').find('.close').unbind('click').click(function(){
			var $p = $(this).closest('.pos');
			var id = $p.attr('data-id');
			var category = $p.attr('data-category');
			
			basket_events.model.remove_item(category,id,true);
		});

	},

    rebind: function() {


    	$('header').find('.korzina').unbind('click').click(function(){

    		var path = document.location.pathname;
    		var $b = $('body');

    		if (path != '/cart' && path != '/checkout') {

    			$(this).addClass('opened');
    			$b.attr('data-last',document.location.pathname+document.location.search);
    			open_from_url('/cart',true);
    		}else{
    			$(this).removeClass('opened');
    			var tar_url = $b.attr('data-last');
    			if (tar_url) {
    				open_from_url(tar_url,true); 
    			}else{
    				open_from_url('/',true); 

    			}   			

    		}

    	});

    }

}
