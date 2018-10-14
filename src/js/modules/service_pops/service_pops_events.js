;

'use strict';

console.log('service_pops.events start');

service_pops.events = {

	popstate:function(){

		$('.arcticmodal-container_i2').children('.terms').addClass('force').arcticmodal('close');

		setTimeout(function(){

			window.removeEventListener('popstate', service_pops.events.popstate);
			
		},100);
	},

	after_close:function(data, el) {//посоле закрытия

	    //если больше попапов не открыто, удаляем клас блокирующий скролл, проверяем скролл покажет лого если нужно
	   
	    if ($(el).hasClass('force')) {
	    	
	    	$(el).removeClass('force');

	    }else{

		    var data_prew = $('body').attr('data-prew');
			
			if (if_defined(data_prew)&& data_prew != 'false' && data_prew != '/terms' && data_prew != '/privacy' && data_prew != '/version') {

				open_from_url(data_prew,true);
			
			}else{
				open_from_url('/',true);
			}
			//user_init();

	    }


	},

	init_tariffs:function(){
	    var $activate = $('#tariffs');





	    $activate.find('.btn_activate').unbind('click');
	    $activate.find('.btn_activate').click(function(e){
	    	e.preventDefault();
	    	var $this = $(this)
	    	if(!$this.closest('.tarrif').hasClass('frozen-tar')){

		    	var id = $this.closest('.tarrif').attr('data-id');
		    	if (if_defined(id)){ 

		    		service_pops.controller.subscribe_tarif(id,function(){

	    			show_info_pop('Оплата тарифа прошла успешно');
		    			get_user_info(function(){

		    				service_pops.view.close_other();
							open_from_url($this.attr('href'),true);

		    			});
		    			

		    		});

		    	}

	    	}

	    });

	    $activate.find('.login_btn').unbind('click');
	    $activate.find('.login_btn').click(function(e){
	    	e.preventDefault();
						open_from_url($(this).attr('href'),true);
	    });

	    // $activate_links = $activate.find('.activate');
	    // $activate_links.unbind('click');
	    // $activate_links.click(function(e) {

	    //     e.preventDefault(); // отменяем действие по умолчанию
	    //     // $('#popolnit input[name="value"]').val(100);
	    //     $activate.arcticmodal(); // открываем поп-ап пополнения
	    //     if ($activate.find('.variant_tarif.active').length == 0) {

		   //      balance.controller.get_available(function(data){

		   //      	if (data.firstDaysDiscount) {
		   //      		$activate.find('.variant_tarif[data-id="5"]').show();
		   //      		$activate.find('.variant_tarif[data-id="4"]').hide();
		   //      	}


			  //       $activate.find('.variant_tarif').addClass('unblur');
			  //       $activate.find('.variant_tarif').parent().children(':visible').first().trigger('click');
		   //      });
	    //     }
	    // });
	    // 
	    // 
	    
	    var $list_i = $activate.find('.btn-list-i'); 

        var $list_it = $list_i.find('.item-i').removeClass('last').show();

		if(!if_defined(global_user_data)){

			$activate.find('.btn_activate').hide();
			$activate.find('.login_btn').show();

			// $activate.find('.tarrif[data-id="5"]').hide();

	        $list_it.unbind('click');
	        $list_it.click(function(){
	            service_pops.view.show_tariffs_by_time(parseInt($(this).attr('data-time')));
	        }).first().trigger('click');
		}else{

			$activate.find('.btn_activate').show();
			$activate.find('.login_btn').hide();

			service_pops.controller.get_available(function(data){

				$list_i = $('#tariffs').find('.btn-list-i');
				$list_it = $list_i.find('.item-i')
				global_user_data.refund = data.refund;
				global_user_data.discount = data.discount;
				global_user_data.lv = data.lv;

					
				// var time = [1,3,6];
				// var banned_time = [0,0,0];

				// for (var i = 0; i < global_tarif_data.length; i++) {
				// 	var tar = global_tarif_data[i];

				// 	for (var j = 0; j < time.length; j++) {
				// 		if(tar.time == time[j] && tar.time*tar.price <= global_user_data.refund){
				// 			banned_time[j]++;
				// 		}
				// 	}

				// }

				// for (var i = 0; i < banned_time.length; i++) {
				// 	if(banned_time[i] == 4){
				// 		$list_i.find('.item-i[data-time="'+time[i]+'"]').hide();
				// 	}
				// }
				// $list_i.find('.item-i:visible').last().addClass('last');

		        $list_it.unbind('click');
		        $list_it.click(function(){
		            service_pops.view.show_tariffs_by_time(parseInt($(this).attr('data-time')));
		        }).first().trigger('click');

			});
				
			// $activate.find('.tarrif').hide();

			// var discounted = false;

			// if(parseInt(global_user_data.discount)>0){
			// 	discounted = true;
			// }

			// if(if_defined(global_user_data.availableServices)){
			// 	for(var key in global_user_data.availableServices){
			// 		if(global_user_data.availableServices.hasOwnProperty(key)){
			// 			var $tariff = $activate.find('.tarrif[data-id="'+global_user_data.availableServices[key].id+'"]');
			// 			if(discounted){
			// 				$tariff.find('span.discount').html(service_pops.model.numberWithSpaces(parseInt(global_user_data.discount)));
			// 				$tariff.find('span.price').html(service_pops.model.numberWithSpaces(parseInt(global_user_data.availableServices[key].price)));
			// 			}else{
			// 				$tariff.find('span.actual').html(service_pops.model.numberWithSpaces(parseInt(global_user_data.availableServices[key].price)));
			// 			}
			// 			$tariff.show();
			// 		}
			// 	}
			// 	if(discounted){
			// 		$activate.find('.tarrif').parent().addClass('has-discount');
			// 	}else{
			// 		$activate.find('.tarrif').parent().removeClass('has-discount');
			// 	}
			// }
		}

	},
    rebind: function() {
    	var $wrap = service_pops.view.wrap;




    	$wrap.find('.same-link').unbind('click');
    	$wrap.find('.same-link').click(function(e){
    		e.preventDefault();
    		
    		open_from_url($(this).attr('href').replace('//'+m_lbl_id,''),true);
    	});
    	


			window.removeEventListener('popstate', service_pops.events.popstate);
			window.addEventListener('popstate', service_pops.events.popstate);

    }

}
