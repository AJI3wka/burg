;

'use strict';

console.log('quiz_list.events start');

quiz_list.events = {

	rebind_list:function(){
		//quiz_list.view.wrap = $('#user-campaign-list');

		console.log('quiz_list.events.rebind_list');
		var $wrap = quiz_list.view.wrap.find('.list');

		var $created = $wrap.find('.project');
		$wrap.uitooltip();

	    //ребинд функционала кнопки создания новой компании
	    $wrap.find('.project.last').find('.new').unbind('click');
	    $wrap.find('.project.last').find('.new').click(function(e) {

	        open_from_url('/quiz/edit_by_step?qi=new',true);
	    
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

	        var $ch = quiz_list.view.wrap.find('.chose_editor');
	        var href = $(this).attr('href');
	        $ch.find('.btn.mat.blue').unbind('click').click(function(){

	        	open_from_url(href,true);
	        });
	        $ch.find('.btn.mat.flat').unbind('click').click(function(){

	        	open_from_url(href.replace('edit_by_step','edit'),true);
	        });

	        $ch.find('.overlay').unbind('click').click(function(){

	        	$ch.hide()
	        });
	        $ch.show();


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
	        var qid = $(this).attr('data-delete-q');//получение ИД
	        
	        show_confirm('Вы точно хотите удалить этот квиз? После этого нужно будет изменить настройки всех сайтов к которым он прикреплен', function() {//вывод подтверждения пользователю

	        	quiz_list.controller.delete(id,qid,function(){

				    quiz_list.controller.get_list(function(data){

				    	quiz_list.view.refresh_list(data);
				    
				    });

	        	});

	        });

	    });

	},
    rebind: function() {}

}
