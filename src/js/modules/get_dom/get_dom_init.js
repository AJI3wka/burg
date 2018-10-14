;

'use strict';

console.log('get_dom.init start');

get_dom.init = function() {
    console.log('get_dom.init!!!!');
    get_dom.view.wrap = $('.modal-wrap');
    get_dom.view.pop_wrap = get_dom.view.wrap.find('#domain_buy');


    // get_dom.view.wrap.find('#domain_buy').arcticmodal();

    get_dom.events.rebind();


    get_dom.view.pop_wrap.find('.domain_buy_input').val('').removeAttr('data-last-pushed').removeClass('error-input'); //скинуть поле ввода
    
    if (!getURLParameter('d')) {

        get_dom.view.pop_wrap.arcticmodal({afterClose:function(data,el){    
            
            if ($(el).hasClass('force')) {
                

                $(el).removeClass('force');

            }else{
                var prew_part = $('body').attr('data-prew');

                if(if_defined(prew_part)&&prew_part!='false'){

                    open_from_url(prew_part,true);
                }else{
                    open_from_url(global_default_path,true);

                }
            }
        }}); //открыть попап выбора домена  
    }else{

        var $pop_wrap = get_dom.view.wrap.find('#atom_personal_data_pop'); //попап подтверждения данных
        var claendomain = getURLParameter('d'); //доменное имя
        $pop_wrap.find('.pop_up_title span').html(claendomain);
        $pop_wrap.find('.pop_up_title').attr('data-price',getURLParameter('pr')); //вставляем в заголвоок попапа имя домена
        $pop_wrap.arcticmodal({afterClose:function(data,el){    
            
            if ($(el).hasClass('force')) {
                

                $(el).removeClass('force');

            }else{
                var prew_part = $('body').attr('data-prew');

                if(if_defined(prew_part)&&prew_part!='false'){

                    open_from_url(prew_part,true);
                }else{
                    open_from_url(global_default_path,true);

                }
            }
        }}); //открываем попап
        run_module('personal_data');        
    }
};
get_dom.init();
