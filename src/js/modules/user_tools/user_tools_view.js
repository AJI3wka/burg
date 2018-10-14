;

'use strict';

console.log('user_tools.view start');


user_tools.view = {
	wrap:false,
	t_wrap:false,
	close_user_tools:function(){
		user_tools.view.t_wrap.find('#user-tools').removeClass('opened').removeClass('settings');
	}

}
