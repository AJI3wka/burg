;

'use strict';

console.log('a_list.model start');

var a_list = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

a_list.model = {
	build_list_html:function(data){

		var carcas = ''

		if (if_defined(data)) {
		for (var i = data.length - 1; i >= 0; i--) {
			

	        var name = '<span class="name">' + data[i].name + '</span>';//имя кампании
		
			var act = '<span class="act">Без домена</span>';//дефолтное значение описания домена
	        if (if_defined(data[i].domain)) {//если есть переменная домен, заменяем какркас описания домена
	            //act = '<a href="http://' + data[i].domain + '" class="act" target="_blank">' + data[i].domain + '</a>';
   				act = '<a href="http://' + data[i].domain + '" class="act" target="_blank">' +  punycode.ToUnicode(data[i].domain) + '</a>';
		            	        	
	        }
	        
	        var domain = act;//каркас для домена(домен получается отдельным запросом)

	        var delete_link = '<a href="#" data-delete="' + data[i].id + '" class="delete-link">Удалить</a>';//карткас кнопки удаления

	        var like_gr_carcas = '<div class="like_gr"><div class="like"><p>' + data[i].zapros + '</p><span>Запросы</span></div><div class="like"><p>' + data[i].logics + '</p><span>Логики</span></div><div class="like"><p>' + data[i].querys + '</p><span>Ключи</span></div></div>';//область с показателями
	        
	        var server_url = '<span class="download disable">Cкачать</span>';//ссылка недоступного скачивания

	        if (if_defined(data[i].url)) {//если внутри есть параметр УРЛ

	            server_url = '<a href="' + data[i].url + '" class="download" target="_blank">Скачать</a>';//кнопка скачивания

	        }


	        //каркас для одной компании
	        carcas += '<div class="project" data-id="' + data[i].id + '"><div class="block">' + name + '</div><div class="block">' + domain + '</div>' + like_gr_carcas + '<div class="block">'+ delete_link + '<a class="edit page_edit" data-cid="' + data[i].id + '" href="/trafic/edit?i=' + data[i].id + '">Редактировать</a></div><div class="block">' + server_url  + '</div></div>';

		}
}

		carcas+='<div class="project last">';
		carcas+='<div class="new a_list"><img src="'+source_url+'/img/plus.png" alt height="66" width="67"><p>создать рекламную кампанию самостоятельно</p></div>';
		carcas+='<a class="expert" href="/experts">Привлечь эксперта</act>'
		carcas+='</div>';

        //добавление каркаса в область
        return carcas;

	}
};
