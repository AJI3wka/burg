;

'use strict';

console.log('preland_edit.init start');

preland_edit.init = function() {
    console.log('preland_edit.init!!!!');
    preland_edit.view.wrap = $('#preland-edit-body');

 	if (if_defined(global_user_data)&&if_defined(global_user_data.trial)) {

        preland_edit.view.wrap.find('.trig_btn[data-target="metrics_visor"],.trig_btn[data-target="n_head_codes"],.trig_btn[data-target="n_body_codes"],.trig_btn[data-target="event_submited"]').addClass('disabled');
        preland_edit.view.wrap.find('textarea[data-input-type="n_head_codes"],textarea[data-input-type="n_body_codes"],textarea[data-input-type="event_submited"]').attr('readonly', 'readonly').addClass('disabled');

    }else if(global_user_data.blockUser){

        show_info_pop('Эта функция станет доступна сразу после активации аккаунта по одному из <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тарифов</a>.','Активируйте аккаунт');
        open_from_url('/lp1',true);
    
    }else{
        
        preland_edit.view.wrap.find('.trig_btn[data-target="metrics_visor"],.trig_btn[data-target="n_head_codes"],.trig_btn[data-target="n_body_codes"],.trig_btn[data-target="event_submited"]').removeClass('disabled');
        preland_edit.view.wrap.find('textarea[data-input-type="n_head_codes"],textarea[data-input-type="n_body_codes"],textarea[data-input-type="event_submited"]').removeClass('disabled').removeAttr('readonly');
    
    }

    if(parseInt(global_user_data.limits['Preland'].used)>parseInt(global_user_data.limits['Preland'].limit)){


        show_info_pop('Вы превысили лимит созданных прелендов для вашего тарифного плана. Пожалуйста удалите лишние или оплатите <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тариф</a> с подходящими вам лимитами.','Лимит тарифного плана');
        open_from_url('/preland',true);
        return false;
    }



    var id = getURLParameter('i');

    if (!id) {
    	open_part('404',true);
    }else{
    	if (id == 'new') {

            if(parseInt(global_user_data.limits['Preland'].used)==parseInt(global_user_data.limits['Preland'].limit)){


                show_info_pop('Вы заполнили лимит созданных прелендов для вашего тарифного плана. Пожалуйста удалите лишние или оплатите <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тариф</a> с подходящими вам лимитами.','Лимит тарифного плана');
                open_from_url('/preland',true);
                return false;
            }


            preland_edit.model.cur_data = {
	            name: '',
	            content: {
	                form_name: "1",
	                form_phone: "1",
	                form_custom: "0",
	                form_email: "0",
	                form_custom_name: "0",
	                form_custom_plac: "0",
	                mirror_protocol:'http://'
	            },
	            domain:'null'
	        };
	        
			preland_edit.view.insert_edit_frame(function(){

		        preland_edit.view.paste_values();//вставить полученные данные в редактор указанного типа

		        preland_edit.view.init_steps_slider();

			});

    	}else{
			preland_edit.view.wrap.find('.reqired_inp').removeClass('reqired_inp');
            if (if_defined(preland_edit.model.cur_data) && if_defined(preland_edit.model.cur_data.id) && preland_edit.model.cur_data.id == id) {

				preland_edit.view.insert_edit_frame(function(){

			        preland_edit.view.paste_values();//вставить полученные данные в редактор указанного типа

			        preland_edit.view.init_steps_slider();

				});

            }else{

            	preland_edit.model.init_edit_by_id(id)

            }
    	}
    }

    preland_edit.events.rebind();
};
preland_edit.init();
