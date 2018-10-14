;

'use strict';

console.log('a_list.view start');


a_list.view = {
	wrap:false,
	apend_stat:function(id,data){
		var act = '<span class="act">Без домена</span>';//дефолтное значение описания домена
        if (if_defined(data.domain)) {//если есть переменная домен, заменяем какркас описания домена
            act = '<a href="http://' + data.domain + '" class="act" target="_blank">' + data.domain + '</a>';
        }

        //записываем каркас на область этой компании
        var $wrap = a_list.view.wrap.find('.list').find('.project[data-id="' + id + '"]');
        var $act_wrap = $wrap.find('span.act').parent();
        
        $act_wrap.html(act);
        




        /*------ подсчет ключей старт ------*/
        var key = 0;

        var zapros = data.zapros.length;

        for (var i = 0; i < data.zapros.length; i++) {
            key += data.zapros[i].length
        }

        var logics = data.logics.length;

        for (var i = 0; i < data.logics.length; i++) {
            key += data.logics[i].left.length * data.logics[i].right.length;
        }
        /*------ подсчет ключей конец ------*/
		var $stat_wrap = $wrap.find('.like_gr');
        //каркас показателей
        var stat_carcas = '<div class="like"><p>' + zapros + '</p><span>Запросы</span></div><div class="like"><p>' + logics + '</p><span>Логики</span></div><div class="like"><p>' + key + '</p><span>Ключи</span></div>';

        //замена конктента в области на каркас
        $stat_wrap.html(stat_carcas)
	},
	refresh_list:function(data){

		var $wrap = a_list.view.wrap.find('.list');

	    /*------- заполнение списка кампаний старт -------- */
	    var list_html = a_list.model.build_list_html(data);
	    
	    $wrap.html(list_html);

	    //for (var i = data.length - 1; i >= 0; i--) {
	    	
	    //	a_list.controller.get_ad_data(data[i].content[0].id,function(id,data){

	    //		a_list.view.apend_stat(id,data);

	    //	});
	    //}

	    a_list.events.rebind_list();

	}
}
