;

'use strict';

console.log('quiz_list.init start');

quiz_list.init = function() {
    console.log('quiz_list.init!!!!');
    quiz_list.view.wrap = $('#quiz-list');
    // quiz_list.events.rebind();
    quiz_list.controller.get_list(function(data){
    	quiz_list.view.refresh_list(data);
    });
};
quiz_list.init();
