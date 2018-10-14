;

'use strict';

console.log('quiz_edit.init start');

quiz_edit.init = function() {
    console.log('quiz_edit.init!!!!');


    quiz_edit.model.editor_ready = false;

	quiz_edit.view.wrap = $('#qiuz_helper');

    quiz_edit.view.wrap.find('.atom_addr').html('.'+m_lbl_id);

    if (if_defined(global_user_data)&&if_defined(global_user_data.trial)) {

    	quiz_edit.view.wrap.find('.trig_btn[data-target="metrics_visor"],.trig_btn[data-target="n_head_codes"],.trig_btn[data-target="n_body_codes"],.trig_btn[data-target="event_submited"]').addClass('disabled');
    	quiz_edit.view.wrap.find('textarea[data-input-type="n_head_codes"],textarea[data-input-type="n_body_codes"],textarea[data-input-type="event_submited"]').attr('readonly', 'readonly').addClass('disabled');

    }else if(global_user_data.blockUser){

    	show_info_pop('Эта функция станет доступна сразу после активации аккаунта по одному из <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тарифов</a>.','Активируйте аккаунт');
    	open_from_url('/quiz');
        return false;
    
    }else{
 		
 		quiz_edit.view.wrap.find('.trig_btn[data-target="metrics_visor"],.trig_btn[data-target="n_head_codes"],.trig_btn[data-target="n_body_codes"],.trig_btn[data-target="event_submited"]').removeClass('disabled');
		quiz_edit.view.wrap.find('textarea[data-input-type="n_head_codes"],textarea[data-input-type="n_body_codes"],textarea[data-input-type="event_submited"]').removeClass('disabled').removeAttr('readonly');
    
    }
    if(parseInt(global_user_data.limits['QUIZ'].used)>parseInt(global_user_data.limits['QUIZ'].limit)){


        show_info_pop('Вы превысили лимит созданных квизов для вашего тарифного плана. Пожалуйста удалите лишние или оплатите <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тариф</a> с подходящими вам лимитами.','Лимит тарифного плана превышен');
        open_from_url('/quiz');
        return false;
    }

    var id = getURLParameter('qi');

    if (!id) {
    	open_part('404',true);
    }else{
        var page_id = getURLParameter('i');
    	if (id == 'new' || id == 'null') {

            if (id == 'null') {
                //updateQueryStringParam('qi','new');
                if (if_defined(page_id)&&document.location.pathname.indexOf('quiz')>-1) {


                    quiz_edit.model.init_edit_by_id(id,page_id);
                }
            }else{

                if(parseInt(global_user_data.limits['QUIZ'].used)==parseInt(global_user_data.limits['QUIZ'].limit)){


                    show_info_pop('Вы заполнили лимит созданных квизов для вашего тарифного плана. Пожалуйста удалите лишние или оплатите <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тариф</a> с подходящими вам лимитами.','Лимит тарифного плана');
                    open_from_url('/quiz',true);
                    return false;
                }           

                quiz_edit.model.cur_data = {
                    name: 'Новый квиз',
                    content: {
                        quiz:true,
                        content_pre_form:"1",
                        form_name: "1",
                        form_phone: "1",
                        form_custom: "0",
                        form_email: "0",
                        form_custom_name: "0",
                        form_custom_plac: "0"
                    },
                    domain:'null'
                };
                
                quiz_edit.model.refresh_data();
            }


    	}else{
			//quiz_edit.view.wrap.find('.reqired_inp').removeClass('reqired_inp');

            if (if_defined(page_id)&&document.location.pathname.indexOf('quiz')>-1) {


                quiz_edit.model.init_edit_by_id(id,page_id);
            }else{

                quiz_edit.model.init_edit_by_id(id);
            }            


    	}
    } 

    // function after_render(){


	    $("#quiz_panel").load(source_url+"/html/parts/quiz/panel.html", function() {
		  quiz_edit.view.panel = $("#quiz_panel");
		  	//var r_w = $('#qiuz_helper').width()-$("#quiz_panel").closest('.scroll_content').outerWidth() - 20;
			//$('#quiz_editor').css({width:r_w+'px'});
			$('#quiz_editor').load(source_url+"/html/parts/quiz/edit.html", function() {

    			quiz_edit.events.rebind();
				run_module('quiz_editor');

                run_module('ls_editors');

			});
		});

    // }
    // 
    quiz_edit.model.glvrd.init();
    
    if(if_defined(user_tools)){

        user_tools.model.first_use.init();
    }
    


};
quiz_edit.init();
