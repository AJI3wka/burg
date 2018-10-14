;

'use strict';

console.log('login.view start');


login.view = {
	wrap: $('#user-wrap'),
	show_remember:function(){
		login.view.wrap.find('#remember_me').arcticmodal();
	},
	open_restore:function(data) {

	    history.replaceState('', document.title, '/login'); //скидываем строку УРЛ в браузере

	    var $restore = login.view.wrap.find('#restore_pass');
	    $restore.arcticmodal({
			closeOnEsc:false,
			closeOnOverlayClick:false
		});//открываем форму востановления пароля

	    $restore.find('#restore_code').val(data.hash);//присваем инпутп значение кода подтверждения

	    //$restore.find('#restore_email').val(data.restore);//присваем инпуту значение емейла пользователя

	},
	open_login:function(){
		var prew_part = $('body').attr('data-prew');

		var $log_form = login.view.wrap.find('#login');
		console.log($log_form);
		var $close = $log_form.find('.i-close-a');
		var conf = {
			closeOnEsc:false,
			closeOnOverlayClick:false,
			afterClose:function(){
				console.log('after-close open_part');
				if(if_defined(prew_part)&&prew_part!='false'){

					if(global_user_auth){

						open_from_url(prew_part);
					}else{
						open_from_url('/');

					}
				}else{
					if(global_user_auth){

						open_from_url(global_default_path);
					}else{
						open_from_url('/');

					}

				}
			}
		};

		// if (prew_part == '/') {
			$close.unbind('click');
			$close.click(function(){
				$(this).closest('#login').arcticmodal('close');
			});
			$close.show();
			conf.closeOnEsc = true;
			conf.closeOnOverlayClick =true;
		// }else{
		// 	$close.hide();
		// }

	    if(if_defined(window['user_tools']) && if_defined(user_tools.view.t_wrap)){
	        user_tools.view.t_wrap.hide();
	    }
	    if(if_defined(window['menu']) && if_defined(menu.view.m_wrap)){
	        menu.view.m_wrap.hide();
	    }

		$log_form.arcticmodal(conf);
	}
}
