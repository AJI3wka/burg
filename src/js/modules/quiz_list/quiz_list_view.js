;

'use strict';

console.log('quiz_list.view start');


quiz_list.view = {
	wrap:false,
	// apend_stat:function(id,data){

 //        var $wrap = quiz_list.view.wrap.find('.list').find('.project[data-id="' + id + '"]');

 //        var view = data.views;
 //        var lead = data.orders;
 //        var conv = Math.round(data.orders / data.views * 100 * 10) / 10;
 //        if (view == 0) {
 //            conv = 0;
 //        }
 //        conv = conv + '%';
 //        /*------ подсчет ключей конец ------*/
	// 	var $stat_wrap = $wrap.find('.like_gr');
 //        //каркас показателей
 //        var stat_carcas = '<div class="like"><p>' + view + '</p><span>Посещений</span></div><div class="like"><p>' + lead + '</p><span>заказов</span></div><div class="like"><p>' + conv + '</p><span>конверсия</span></div>';
        
 //        //замена конктента в области на каркас
 //        $stat_wrap.html(stat_carcas)
	// },
	refresh_list:function(data){

		var $wrap = quiz_list.view.wrap.find('.list');

	    /*------- заполнение списка кампаний старт -------- */
	    var list_html = quiz_list.model.build_list_html(data);
	    
	    $wrap.html(list_html);

	    // for (var i = data.length - 1; i >= 0; i--) {
	    	
	    // 	quiz_list.controller.get_stat_data(data[i].id,function(id,data){

	    // 		quiz_list.view.apend_stat(id,data);

	    // 	});
	    // }

	    quiz_list.events.rebind_list();

	}
}
