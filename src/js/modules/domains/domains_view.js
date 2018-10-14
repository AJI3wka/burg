;

'use strict';

console.log('domains.view start');


domains.view = {
	wrap:false,
	render_domains:function(){
			var data = domains.model.domains;
			var carcas = '';
			if (data.length>0) {

				for (var i = data.length - 1; i >= 0; i--) {

					var status_class,status = '';
					if (!data[i].available_pay && !data[i].expire) {

						status= '<div class="status tooltiped status_ok" title="Домен работает и срок его регистрации истечет не скоро"></div>';
						status_class = "s_ok";
						// if (i == 2) {
						// 	status_class = "warn";
						// 	status= '<div class="status tooltiped status_ap" title="Домен работает и но скоро истечет срок его регистрации"></div>';
						// }else if(i == 1) {
						// 	status_class = "expir";

						// 	status= '<div class="status tooltiped status_expire" title="Домен не работает. Истек срок его регистрации"></div>';
						// }

					}else if (data[i].available_pay  && !data[i].expire){

						status_class = "warn";
						status= '<div class="status tooltiped status_ap" title="Домен работает и но скоро истечет срок его регистрации"></div>';
					}else if (data[i].available_pay  && data[i].expire){
						status_class = "expir";

						status= '<div class="status tooltiped status_expire" title="Домен не работает. Истек срок его регистрации"></div>';
					}

					carcas+= '<div class="domain '+status_class+'" data-id="'+data[i].id+'" data-can-pay="'+data[i].available_pay+'">';
					carcas+= '<div class="name"><a href="http://'+data[i].name+'" target="_blank">'+data[i].name+'</a></div>';
					carcas+= status;
					carcas+= '<div class="settings tooltiped" title="Настройки NS"></div>';

					carcas+= '<div class="button">Продлить регистрацию</div>';
					carcas+= '<div class="price"><p>Цена продления <span>'+data[i].prolong_price+'руб.</span></div>';
					var date = data[i].toDate.split(' ')[0].split('-')[2] +'.'+data[i].toDate.split(' ')[0].split('-')[1] +'.'+data[i].toDate.split(' ')[0].split('-')[0]
					carcas+= '<div class="to_date"><p>Действителен до <span>'+date+'</span></p></div>';
										

					carcas+= '</div>';
				}	
			}else{
				carcas+='<div class="empty">У вас нет зарегистрированных в сервисе доменов</div>'
			}	

			domains.view.wrap.find('.dom-wrap').html(carcas);
			domains.events.rebind_domains_list();
	}

}
