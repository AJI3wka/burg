;

'use strict';

console.log('step_ed_q.init start');

step_ed_q.init = function() {
    console.log('step_ed_q.init!!!!');


    if(global_user_data.blockUser){

        show_info_pop('Эта функция станет доступна сразу после активации аккаунта по одному из <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тарифов</a>.','Активируйте аккаунт');
        open_from_url('/quiz');
        return false;
    
    }
    if(parseInt(global_user_data.limits['QUIZ'].used)>parseInt(global_user_data.limits['QUIZ'].limit)){


        show_info_pop('Вы превысили лимит созданных квизов для вашего тарифного плана. Пожалуйста удалите лишние или оплатите <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тариф</a> с подходящими вам лимитами.','Лимит тарифного плана превышен');
        open_from_url('/quiz');
        return false;
    }


    if ($('#mi_font').length == 0) {

    	$('body').append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" id="mi_font">');
    
    }

    step_ed_q.view.wrap = $('.app-wrap');
  	
    step_ed_q.view.prepare_editor();
    step_ed_q.events.rebind();


    var id = getURLParameter('qi');

    if (!id) {
    	open_part('404',true);
    }else{
    	if (id=='new') {
    		step_ed_q.model.create_quiz(function(){

                run_module('quiz_editor');

                run_module('ls_editors');
			    
    		});

    	}else{
            function get_quiz(id,p_id){                

                step_ed_q.model.try_get_quiz(id,p_id,function(){

                    run_module('quiz_editor');      
                    run_module('ls_editors');

                });
            }

            var p_id = getURLParameter('i');

            if (!p_id) {


                step_ed_q.controller.usages(id,function(data){
                    console.log('usage_data = ',data);

                    for (var i = 0; i < data.data.length; i++) {
                        if(data.data[i].template =='quiz'){
                            p_id = data.data[i].id;
                            updateQueryStringParam('i',p_id);
                            get_quiz(id,p_id);
                        }
                    }

                });
            
            }else{
                get_quiz(id,p_id);

            }
    	}
    
    }
                //run_module('step_faq');             


};
step_ed_q.init();
