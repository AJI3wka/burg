;

'use strict';

console.log('menu.init start');

menu.init = function() {
    console.log('menu.init!!!!');
    menu.view.wrap = $('.base-ui-wrap');
    menu.view.m_wrap = menu.view.wrap.find('.menu-wrap');
    
    if (menu.view.m_wrap.length>0) {
    	
    	menu.view.m_wrap.show();
		menu.events.rebind();

    }else{

    	menu.view.wrap.append('<div class="menu-wrap"></div>');
    	menu.view.m_wrap = menu.view.wrap.find('.menu-wrap');
        var needed_src = source_url+'/html/parts/menu.html';
        
        if (global_build != false) {//если это test/prod версия 
            var rev = $('body').attr('data-revision');//получаем значение ревизии
            //то для закгрузки модуля нужен только 1н скрипт, с хвостом ревизии(скидывание кеша) 
            needed_src +='?v='+ rev;
        }
    	menu.view.m_wrap.load(needed_src, function() {//по загрузке каркаса

			menu.events.rebind();

        });
    }
};
menu.init();
