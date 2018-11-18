;

'use strict';

console.log('ls.events start');

ls.events = {


	storage:function(){
		// if(if_defined(ls_editors)){
			
		// 	ls_editors.model.check_last_update();
		// }
		ls.model.start_ls();
	},
    rebind: function() {
    	window.removeEventListener("storage", ls.events.storage, false)
    	window.addEventListener("storage", ls.events.storage, false);

    }

}
