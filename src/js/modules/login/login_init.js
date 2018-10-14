;

'use strict';

console.log('login.init start');

login.init = function() {
    console.log('login.init!!!!');
    login.view.wrap = $('#user-wrap');
    login.events.rebind();
    login.view.open_login();
    login.model.check_restore_or_reg();
};
login.init();
