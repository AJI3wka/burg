;

'use strict';

console.log('crm.init start');

crm.init = function() {
    console.log('crm.init!!!!');

    crm.events.rebind();

    if(if_defined(user_tools)){

        user_tools.model.first_use.init();
    }
        
};
crm.init();
