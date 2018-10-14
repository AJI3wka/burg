;

'use strict';

console.log('user_tools.init start');

user_tools.init = function() {
    console.log('user_tools.init!!!!');

    user_tools.view.wrap = $('.base-ui-wrap');
    user_tools.view.t_wrap = menu.view.wrap.find('.ui-wrap');
    
    if (user_tools.view.t_wrap.length>0) {
    	
    	user_tools.view.t_wrap.show();
        user_tools.model.tarif_data();
        user_tools.model.first_use.init();
		user_tools.events.rebind();

    }else{
    	user_tools.view.wrap.append('<div class="ui-wrap"></div>');
    	user_tools.view.t_wrap = user_tools.view.wrap.find('.ui-wrap');

        var needed_src = source_url+'/html/parts/user_ui.html';
        
        if (global_build != false) {//если это test/prod версия 
            var rev = $('body').attr('data-revision');//получаем значение ревизии
            //то для закгрузки модуля нужен только 1н скрипт, с хвостом ревизии(скидывание кеша) 
            needed_src +='?v='+ rev;
        }
        
    	user_tools.view.t_wrap.load(needed_src, function() {//по загрузке каркаса

            $('#main_header').find('h1').html(document.title.split(' | ')[1]);

            user_tools.model.tarif_data();
            user_tools.model.first_use.init();
			user_tools.events.rebind();

        });
    }
};
user_tools.init();
