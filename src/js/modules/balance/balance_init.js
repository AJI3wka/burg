;

'use strict';

console.log('balance.init start');

balance.init = function() {
    console.log('balance.init!!!!');
    balance.view.wrap = $('#balance_body');

    run_module('personal_data');
    balance.events.rebind_poplnit();
    balance.model.check_url();

    //balance.controller.get_user_balance();
    balance.model.get_user_history(0,15);
    balance.model.check_activation();
    balance.events.rebind();

    if(if_defined(user_tools)){

        user_tools.model.first_use.init();
    }
        
};
balance.init();
