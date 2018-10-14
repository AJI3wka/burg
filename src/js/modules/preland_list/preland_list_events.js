;

'use strict';

console.log('preland_list.events start');

preland_list.events = {

	rebind_list:function(){
		//preland_list.view.wrap = $('#user-campaign-list');

		console.log('preland_list.events.rebind_list');
		var $wrap = preland_list.view.wrap.find('.list');

		var $created = $wrap.find('.project');


	   	    //ребинд функционала кнопки создания новой компании
	    $wrap.find('.project.last').find('.new').unbind('click');
	    $wrap.find('.project.last').find('.new').click(function(e) {

	        open_from_url('/preland/edit?i=new',true);
	    
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
	    $created.find('.look.disactive').unbind('click');
	    $created.find('.look.disactive').click(function(e) {
	        e.preventDefault();
	        show_alert_mess('Необходимые для предпросмотра поля не заполнены');
	    });

	    //ребинд функционала кнопки удаления
	    $created.find('.delete-link').unbind('click');
	    $created.find('.delete-link').click(function(e) {
	        e.preventDefault();

	        var id = $(this).attr('data-delete');//получение ИД
	        
	        show_confirm('Вы точно хотите удалить эту страницу?', function() {//вывод подтверждения пользователю

	        	preland_list.controller.delete(id,function(){

				    preland_list.controller.get_list(function(data){

				    	preland_list.view.refresh_list(data);
				    
				    });

	        	});

	        });

	    });

	},
    rebind: function() {}

}
