;

'use strict';

console.log('service_pops.view start');


service_pops.view = {

	wrap:false,
	show_terms:function(){
		service_pops.view.wrap.find('#terms').arcticmodal({afterClose:service_pops.events.after_close});
	},
	show_privacy:function(){

		service_pops.view.wrap.find('#privacy').arcticmodal({afterClose:service_pops.events.after_close});
	},
	show_version:function(){

		service_pops.view.wrap.find('#version').arcticmodal({afterClose:service_pops.events.after_close});
	},
	show_tariffs:function(){
		service_pops.events.init_tariffs();

		service_pops.view.wrap.find('#tariffs').arcticmodal({afterClose:service_pops.events.after_close});
	},
	close_other:function(){
		$('.arcticmodal-container_i2').children('.terms').addClass('force').arcticmodal('close');
	},
	show_tariffs_by_time:function(time){

		console.log('show_tariffs_by_time',time);
		var $wrp = $('#tariffs').find('.ib-wrap');

		var dis = 0;

		var discounted = false;

		if(if_defined(global_user_data)&&parseInt(global_user_data.discount)>0){
			discounted = true;
		}

		var refund = false;

		if(if_defined(global_user_data)&&parseInt(global_user_data.refund)>0){
			refund = true;
		}

		for (var i = 0; i < global_tarif_data.length; i++) {
			var tar = global_tarif_data[i];
			console.log(!if_defined(tar.first_day)
				|| tar.first_day == 'disabled' && !if_defined(global_user_data)
				|| tar.first_day == 'disabled' && if_defined(global_user_data) && global_user_data.firstDaysDiscount == false
				|| tar.first_day == 'abled' && if_defined(global_user_data) && global_user_data.firstDaysDiscount == true)
			if (!if_defined(tar.first_day)
				|| tar.first_day == 'disabled' && !if_defined(global_user_data)
				|| tar.first_day == 'disabled' && if_defined(global_user_data) && global_user_data.firstDaysDiscount == false
				|| tar.first_day == 'abled' && if_defined(global_user_data) && global_user_data.firstDaysDiscount == true) {

				var avaliable = true;

				if(if_defined(global_user_data)){
					avaliable = false;
					var aval = global_user_data.availableServices;
					for (var j = 0; j < aval.length; j++) {
						if(aval[j].id == tar.id && aval[j].lv >= global_user_data.lv){
							avaliable = true;
							
						}
					}
				}


				// if(if_defined(global_user_data.availableServices)){
				// 	for(var key in global_user_data.availableServices){
				// 		if(global_user_data.availableServices.hasOwnProperty(key)){
				// 			var $tariff = $wrp.find('.tarrif[data-id="'+global_user_data.availableServices[key].id+'"]');
				// 			if(discounted){
				// 				$tariff.find('span.discount').html(service_pops.model.numberWithSpaces(parseInt(global_user_data.discount)));
				// 				$tariff.find('span.price').html(service_pops.model.numberWithSpaces(parseInt(global_user_data.availableServices[key].price)));
				// 			}else{
				// 				$tariff.find('span.actual').html(service_pops.model.numberWithSpaces(parseInt(global_user_data.availableServices[key].price)));
				// 			}
				// 		}
				// 	}
				// }

				if(tar.time == time){
					var $tar = $wrp.find('.tarrif[data-lv="'+tar.lv+'"]');
						$tar.find('.count').html(service_pops.model.numberWithSpaces(tar.price));
						dis = tar.disc;
						$tar.attr('data-id', tar.id);
						
						if(dis>0){

							$tar.find('.old').html(service_pops.model.numberWithSpaces(tar.base_val*time))
						}else{
							$tar.find('.old').html('')
						}

						$tar.find('.actual').html(service_pops.model.numberWithSpaces(tar.price*time))

					if(avaliable){

						if(discounted){
							$tar.find('span.discount').html(service_pops.model.numberWithSpaces(global_user_data.discount));
							$tar.find('span.price').html(service_pops.model.numberWithSpaces(tar.price*time-global_user_data.discount));
							$tar.find('.promocode').find('.text').html('скидка по промокоду');
						}

						if(refund && tar.lv > global_user_data.lv){
							$tar.find('span.discount').html(service_pops.model.numberWithSpaces(global_user_data.refund));
							$tar.find('span.price').html(service_pops.model.numberWithSpaces(tar.price*time-global_user_data.refund));
							$tar.find('.promocode').find('.text').html('возврат средств за неиспользованое время текущего тарифа');
						

							
							// if(tar.price*time-global_user_data.refund <=0 && tar.lv >= global_user_data.lv ||  tar.price*time-global_user_data.discount<=0 && tar.lv >= global_user_data.lv ){


							// 	$tar.addClass('frozen-tar');

							// }else{

							// 	$tar.removeClass('frozen-tar');

							// }
						}


					}else{

						$tar.addClass('frozen-tar');
					}	



					if(discounted || refund && tar.lv > global_user_data.lv){
						$tar.addClass('has-discount');
					}else{
						$tar.removeClass('has-discount');
					}				
				}



			}
		}



		var $h = $wrp.parent().find('h3');

		var $skd = $wrp.parent().find('.btn-list-i').find('.item-i[data-time="'+time+'"]').find('span')
		

		if(dis>0){
			
			$h.html('Скидка - '+dis+'%').css('opacity',1);
			$skd.html('(-'+dis+'%)');

		}else{

			$h.css('opacity',0);
		}
		var $list = $wrp.parent().find('.btn-list-i');
		$list.find('.item-i').removeClass('active');
		$list.find('.item-i[data-time="'+time+'"]').addClass('active');

		console.log($list.find('.item-i'));
		console.log($list.find('.item-i[data-time="'+time+'"]'));

	}


}
