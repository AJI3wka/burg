;

'use strict';

console.log('a_list.events start');

a_list.events = {

	rebind_list:function(){
		//a_list.view.wrap = $('#user-campaign-list');

		console.log('a_list.events.rebind_list');
		var $wrap = a_list.view.wrap.find('.list');

		var $created = $wrap.find('.project');

	   	    //ребинд функционала кнопки создания новой компании
	    $wrap.find('.project.last').find('.new').unbind('click');
	    $wrap.find('.project.last').find('.new').click(function(e) {

	        open_from_url('/trafic/edit?i=new',true);
	    
	    });
		$wrap.find('.project.last').find('a.expert').unbind('click');
	    $wrap.find('.project.last').find('a.expert').click(function(e) {
	    	e.preventDefault();
	        open_from_url($(this).attr('href'),true);
	    
	    });

	    //ребинд функционала на клик по редактированию
	    $created.find('.edit.page_edit').unbind('click');
	    $created.find('.edit.page_edit').click(function(e) {

	        e.preventDefault();

	        open_from_url($(this).attr('href'),true);

	    });

	    //ребинд функционала на кнопку скачивания неактивную
	    $created.find('.download.disactive').unbind('click');
	    $created.find('.download.disactive').click(function(e) {
	        e.preventDefault();
	        show_alert_mess('Необходимые для генерации рекламной кампании поля не заполнены');
	    });

	    //ребинд функционала кнопки удаления
	    $created.find('.delete-link').unbind('click');
	    $created.find('.delete-link').click(function(e) {
	        e.preventDefault();

	        var campaign_id = $(this).attr('data-delete');//получение ИД
	        
	        show_confirm('Вы точно хотите удалить эту кампанию?', function() {//вывод подтверждения пользователю

	        	a_list.controller.delete_ad(campaign_id,function(){

				    a_list.controller.get_list(function(data){

				    	a_list.view.refresh_list(data);
				    
				    });

	        	});

	        });

	    });

	},
    rebind: function() {}

}
