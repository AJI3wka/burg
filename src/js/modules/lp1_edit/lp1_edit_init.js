;

'use strict';

console.log('lp1_edit.init start');

lp1_edit.init = function() {
    console.log('lp1_edit.init!!!!');
    lp1_edit.view.wrap = $('#body');

    lp1_edit.view.wrap.find('.atom_addr').html('.'+m_lbl_id);    

    if (if_defined(global_user_data)&&if_defined(global_user_data.trial)) {

    	lp1_edit.view.wrap.find('.trig_btn[data-target="metrics_visor"],.trig_btn[data-target="n_head_codes"],.trig_btn[data-target="n_body_codes"],.trig_btn[data-target="event_submited"]').addClass('disabled');
    	lp1_edit.view.wrap.find('textarea[data-input-type="n_head_codes"],textarea[data-input-type="n_body_codes"],textarea[data-input-type="event_submited"]').attr('readonly', 'readonly').addClass('disabled');

    }else if(global_user_data.blockUser){

    	show_info_pop('Эта функция станет доступна сразу после активации аккаунта по одному из <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тарифов</a>.','Активируйте аккаунт');
    	open_from_url('/lp1',true);
        return false;
    }else{
 		
 		lp1_edit.view.wrap.find('.trig_btn[data-target="metrics_visor"],.trig_btn[data-target="n_head_codes"],.trig_btn[data-target="n_body_codes"],.trig_btn[data-target="event_submited"]').removeClass('disabled');
		lp1_edit.view.wrap.find('textarea[data-input-type="n_head_codes"],textarea[data-input-type="n_body_codes"],textarea[data-input-type="event_submited"]').removeClass('disabled').removeAttr('readonly');
    
    }

    if(parseInt(global_user_data.limits['1Page'].used)>parseInt(global_user_data.limits['1Page'].limit)){


        show_info_pop('Вы превысили лимит созданных одноэкранников для вашего тарифного плана. Пожалуйста удалите лишние или оплатите <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тариф</a> с подходящими вам лимитами.','Лимит тарифного плана');
        open_from_url('/lp1',true);
        return false;
    }

    var id = getURLParameter('i');

    if (!id) {
    	open_part('404',true);
    }else{
    	if (id == 'new') {


            if(parseInt(global_user_data.limits['1Page'].used)==parseInt(global_user_data.limits['1Page'].limit)){


                show_info_pop('Вы заполнили лимит созданных одноэкранников для вашего тарифного плана. Пожалуйста удалите лишние или оплатите <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тариф</a> с подходящими вам лимитами.','Лимит тарифного плана');
                open_from_url('/lp1',true);
                return false;
            }

            lp1_edit.model.cur_data = {
	            name: 'Новый Одноэкранник',
	            content: {
	                form_name: "1",
	                form_phone: "1",
	                form_custom: "0",
	                form_email: "0",
	                form_custom_name: "0",
	                form_custom_plac: "0"
	            },
	            domain:'null'
	        };
	        lp1_edit.controller.save(false);
			//lp1_edit.view.insert_edit_frame(function(){

		        lp1_edit.view.paste_values();//вставить полученные данные в редактор указанного типа

		        lp1_edit.view.init_steps_slider();

			//});

    	}else{
			//lp1_edit.view.wrap.find('.reqired_inp').removeClass('reqired_inp');
            if (if_defined(lp1_edit.model.cur_data) && if_defined(lp1_edit.model.cur_data.id) && lp1_edit.model.cur_data.id == id) {

				//lp1_edit.view.insert_edit_frame(function(){

			        lp1_edit.view.paste_values();//вставить полученные данные в редактор указанного типа

			        lp1_edit.view.init_steps_slider();

				//});

            }else{

            	lp1_edit.model.init_edit_by_id(id)

            }
    	}
    }
    
    if(if_defined(user_tools)){

        user_tools.model.first_use.init();
    }
    
            
    run_module('ls_editors');        

    lp1_edit.events.rebind();
    lp1_edit.model.glvrd.init();
};
lp1_edit.init();
