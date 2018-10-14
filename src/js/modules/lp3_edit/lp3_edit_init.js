;

'use strict';

console.log('lp3_edit.init start');

lp3_edit.init = function() {
    console.log('lp3_edit.init!!!!');
    lp3_edit.view.wrap = $('#lp3_editor_body');


    if (if_defined(global_user_data)&&if_defined(global_user_data.trial)) {

        lp3_edit.view.wrap.find('.trig_btn[data-target="metrics_visor"],.trig_btn[data-target="n_head_codes"],.trig_btn[data-target="n_body_codes"],.trig_btn[data-target="event_submited"]').addClass('disabled');
        lp3_edit.view.wrap.find('textarea[data-input-type="n_head_codes"],textarea[data-input-type="n_body_codes"],textarea[data-input-type="event_submited"]').attr('readonly', 'readonly').addClass('disabled');

    }else if(global_user_data.blockUser){

        show_info_pop('Эта функция станет доступна сразу после активации аккаунта по одному из <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тарифов</a>.','Активируйте аккаунт');
        open_from_url('/lp1',true);
    
    }else{
        
        lp3_edit.view.wrap.find('.trig_btn[data-target="metrics_visor"],.trig_btn[data-target="n_head_codes"],.trig_btn[data-target="n_body_codes"],.trig_btn[data-target="event_submited"]').removeClass('disabled');
        lp3_edit.view.wrap.find('textarea[data-input-type="n_head_codes"],textarea[data-input-type="n_body_codes"],textarea[data-input-type="event_submited"]').removeClass('disabled').removeAttr('readonly');
    
    }

    if(parseInt(global_user_data.limits['3Page'].used)>parseInt(global_user_data.limits['3Page'].limit)){


        show_info_pop('Вы превысили лимит созданных трехэкранников для вашего тарифного плана. Пожалуйста удалите лишние или оплатите <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тариф</a> с подходящими вам лимитами.','Лимит тарифного плана');
        open_from_url('/lp3',true);
        return false;
    }

    var id = getURLParameter('i');

    if (!id) {
    	open_part('404',true);
    }else{
    	if (id == 'new') {


            if(parseInt(global_user_data.limits['3Page'].used)==parseInt(global_user_data.limits['3Page'].limit)){


                show_info_pop('Вы заполнили лимит созданных трехэкранников для вашего тарифного плана. Пожалуйста удалите лишние или оплатите <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тариф</a> с подходящими вам лимитами.','Лимит тарифного плана');
                open_from_url('/lp3',true);
                return false;
            }

                lp3_edit.model.init_iframe_edit(function(){


                    lp3_edit.model.load_page_by_id('new', function() {//загрузка страницы в редактор по ИД, скрытие списка, открытие редактора

                        lp3_edit.model.paste_data_in_editor();                        
                        lp3_edit.view.init_steps_slider();
                        lp3_edit.view.resize_edit_frame();
                    
                    });   
                });

            

    	}else{

            lp3_edit.view.wrap.find('.reqired_inp').removeClass('reqired_inp');
            if (if_defined(lp3_edit.model.cur_data) && if_defined(lp3_edit.model.cur_data.id) && lp3_edit.model.cur_data.id == id) {

                lp3_edit.model.init_iframe_edit(function(){

                    lp3_edit.model.paste_data_in_editor();
                    lp3_edit.view.init_steps_slider();
                    lp3_edit.view.resize_edit_frame();				

                });   

            }else{

                lp3_edit.model.init_iframe_edit(function(){


                    lp3_edit.model.load_page_by_id(id, function() {//загрузка страницы в редактор по ИД, скрытие списка, открытие редактора

                        lp3_edit.model.paste_data_in_editor();                        
                        lp3_edit.view.init_steps_slider();
                        lp3_edit.view.resize_edit_frame();
                    
                    });   
                });
         	

            }
    	}
    }

    lp3_edit.events.rebind();
};
lp3_edit.init();
