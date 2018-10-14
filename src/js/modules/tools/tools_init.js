;

'use strict';

console.log('tools.init start');

tools.init = function() {
    console.log('tools.init!!!!');
    tools.view.wrap = $('#lk_dnk');
	if(global_user_data){
		!function init_limits(){
			var limits = global_user_data.limits;

			if (limits['3Page'].used>0) {
				tools.view.wrap.find('.item-wrap.limited[data-type="lp3"]').removeClass('limited');
			}
			if (limits['Preland'].used>0) {
				tools.view.wrap.find('.item-wrap.limited[data-type="preland"]').removeClass('limited');
			}
		}();
	}
	if(typeof user_tools !='undefined' && if_defined(user_tools)){

        user_tools.model.first_use.init();
	}
	
    tools.model.check_url();
	tools.model.check_trial();

    tools.events.rebind();
};
tools.init();
