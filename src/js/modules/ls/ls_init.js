;

'use strict';

console.log('ls.init start');

ls.init = function() {
    console.log('ls.init!!!!');

    ls.view.wrap = $('.app-wrap');

    ls.model.start_ls();
    ls.events.rebind();
};
ls.init();
