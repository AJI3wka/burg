;

'use strict';

console.log('ls_editors.init start');

ls_editors.init = function() {
    console.log('ls_editors.init!!!!');

    ls_editors.model.update();


    ls_editors.events.rebind();
};
ls_editors.init();
