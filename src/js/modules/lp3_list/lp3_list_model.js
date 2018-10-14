;

'use strict';

console.log('lp3_list.model start');

var lp3_list = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

lp3_list.model = {
	build_list_html:function(data){

		console.log('build_list_html(',data,')');

		var carcas = ''
		if (if_defined(data)) {

		for (var i = data.length - 1; i >= 0; i--) {
			
			var name = '<span class="name">' + data[i].name + '</span>';//имя проекта
		    var server_url = '';//серверный урл
		    //var crm_link = '<a href="javascript:void(0)" class="crm-link">CRM</a>';//ссылка на ЦРМ (не используется)
		    var yar_link = '<a href="#" class="reklama-link">Трафик</a>';//ссылка на трафик (не используется)
		    var delete_link = '<a href="#" data-delete="' + data[i].id + '" class="delete-link">Удалить</a>';//кнопка удаления
		    var domiain_url = '<span class="act">Не опубликован</span>';

		    if (if_defined(data[i].url)) {//если есть параметр url

		        //переделаем ссылку просмотра на ссылку серверную
		        server_url = '<a href="' + data[i].url + '" class="look" target="_blank">Посмотреть</a>';



                    if (if_defined(data[i].domain)) { //если есть параметр domain
                        if (data[i].domain.length > 0) {
                            //переделаем ссылку просмотра на ссылку серверную
                            server_url = '<a href="http://' + data[i].domain + '" class="look" target="_blank">Посмотреть</a>';
                        }
                    }
                    
		        if (if_defined(data[i].domain)) {//если есть параметр domain
		            if (data[i].domain.length > 0) {
		                //переделаем ссылку просмотра на ссылку домен
		                  domiain_url = '<a href="http://' + data[i].domain + '" class="act" target="_blank">' +  punycode.ToUnicode(data[i].domain) + '</a>';
		            }
		        }
		    } else {//если urlа нету = сайт никогда не публиковался - статус не уопубликован
		        server_url = '<span class="look disactive">Посмотреть</span>';
		    }


			var view = data[i].views;
	        var lead = data[i].orders;
	        var conv = Math.round(lead / view * 100 * 10) / 10;
	        if (view == 0) {
	            conv = 0;
	        }
	        conv = conv + '%';
	        //каркас показателей
	        var stat_carcas = '<div class="like"><p>' + view + '</p><span>Посещений</span></div><div class="like"><p>' + lead + '</p><span>заказов</span></div><div class="like"><p>' + conv + '</p><span>конверсия</span></div>';



               var over_limit = '';

               if(data.length - i > parseInt(global_user_data.limits['3Page'].limit)){

               		over_limit = ' over'

               }

		    //создание строки киркаса
		    carcas += '<div class="project'+over_limit+'" data-id="' + data[i].id + '"><div class="block">' + name + '</div><div class="block">' + domiain_url + '</div><div class="like_gr">'+stat_carcas+'</div><div class="block">' + delete_link + '<a class="edit page_edit" href="/lp3/edit?i=' + data[i].id + '">Редактировать</a>' + yar_link + '</div><div class="block">' + server_url + '</div></div>';

		}
	}
		carcas+='<div class="project last">';
		carcas+='<div class="new"><img src="'+source_url+'/img/plus.png" alt height="66" width="67"><p>Cоздать сайт самостоятельно</p></div>';
		carcas+='<a class="expert" href="/experts">Привлечь эксперта</act>'
		carcas+='</div>';


        //добавление каркаса в область
        return carcas;

	}
};
