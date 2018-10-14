;

'use strict';

console.log('quiz_editor.init start');

quiz_editor.init = function() {
    console.log('quiz_editor.init!!!!');

    quiz_editor.view.helper = $('#qiuz_helper');
    quiz_editor.view.editor = $('#quiz_editor');
    quiz_editor.view.list = $('#qiuz_list_wrap');

    if (document.location.pathname.indexOf('edit_by_step')>-1) {
        $('#steps_quiz_list').load(source_url+'/html/parts/quiz/edit.html',function(){
            quiz_editor.view.editor = $('#steps_quiz_list');
            start();

        });
    }else{
         start();
    }

    function start(){


        if (quiz_editor.view.list.length>0) {

            quiz_editor.model.load_quiz_list();

        }else{

            quiz_editor.model.defaul_init();

            
        }
    }
};
quiz_editor.init();
