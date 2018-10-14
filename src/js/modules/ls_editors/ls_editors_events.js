;

'use strict';

console.log('ls_editors.events start');

ls_editors.events = {

	storage:function(){
		if(if_defined(ls_editors)){
			
			ls_editors.model.check_last_update();
		}
	},
    rebind: function() {
    	window.removeEventListener("storage", this.storage, false)
    	window.addEventListener("storage", this.storage, false);

    }

}
