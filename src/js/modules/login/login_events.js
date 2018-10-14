;

'use strict';

console.log('login.events start');

login.events = {

	remember_me_submit_handler:function(e) {
        e.preventDefault();
        var _this = this;
        validate.wrap($(this), function() {//валидация области формы

            var cur_val = $(_this).find('input[name="rem_email"]').val();
            //var n_val = punycode.ToASCII(cur_val.split('@')[0]) + '@' + punycode.ToASCII(cur_val.split('@')[1])
var n_val = '';
                            var cyrillicPattern = /[\u0400-\u04FF]/;
                            var parts = cur_val.split('@');

                            if(cyrillicPattern.test(parts[0])){
                                n_val += punycode.ToASCII(parts[0]);
                            }else{
                                n_val += parts[0];

                            }
                            n_val += '@';

                            if(cyrillicPattern.test(parts[1])){
                                n_val += punycode.ToASCII(parts[1]);
                            }else{
                                n_val += parts[1];

                            }
        	login.controller.remember_me(n_val,function() {//запрос
                //close_all_modals();//закрыть все попапы
                close_modal_from($(_this));
                show_info_pop('Данные для востановления пароля отправлены Вам на Email');//открыть окошко с сообщение о востановлении на емейл

            });

        });

    },
    restore_submit_handler:function(e) {
	    e.preventDefault();
	    var $this = $(this);
	    validate.wrap($this, function() {//валидация области формы
	        var data = {
	            hash: $this.find('#restore_code').val(),
	            new_password: $this.find('#restore_new').val(),
	            new_password_confirm: $this.find('#restore_confirm').val()
	        }
			login.controller.restore(data, function() {
	            close_modal_from($this);
	        });

	    });
	},
	change_pass_confirm_handler:function(){

        $(this).attr('data-confirm', $(this).val());
        $('#restore_confirm').attr('data-confirm', $(this).val());
	},
    rebind: function() {

	    validate.live(login.view.wrap);

	    login.view.wrap.find('.button.send_login').unbind('click');
	    login.view.wrap.find('.button.send_login').click(function(e) { 
	        e.preventDefault(); 
	        var _this = this; 
	        login.model.login($(this).closest('#login'), function() { 
	            $(_this).closest('#login').find('.valid').val('').addClass('error-input'); 
	        }); 

	    });


    	login.view.wrap.find('#remember_me').unbind('submit');
    	login.view.wrap.find('#remember_me').submit(login.events.remember_me_submit_handler);

    	login.view.wrap.find('#restore_pass').unbind('submit');
    	login.view.wrap.find('#restore_pass').submit(login.events.restore_submit_handler);
    	
    	login.view.wrap.find('#remember_link').unbind('click');
    	login.view.wrap.find('#remember_link').click(function(e) {
	        e.preventDefault();
	        login.view.show_remember();
	    });

        // login.view.wrap.find('.show-eye').unbind('mouseenter mouseleave');
        // login.view.wrap.find('.show-eye').on('mouseenter',function(){
        //     $(this).parent().children('input').attr('type','text');
        // });
        // login.view.wrap.find('.show-eye').on('mouseleave',function(){
        //     $(this).parent().children('input').attr('type','password');

        //  });
    	

        
        login.view.wrap.find('.show-eye').unbind('click');
        login.view.wrap.find('.show-eye').on('click',function(){
            var $inp = $(this).parent().children('input')
            var type = $inp.attr('type');
            if (type == 'password') {
                $inp.attr('type','text');
                $(this).addClass('active');
            }else{

                $inp.attr('type','password');
                $(this).removeClass('active');
            }
        });
        
        login.view.wrap.find('.show-eye').each(function(index, el) {
        	if ($(this).closest('.p-inp-wrap').find('.strong').length == 0 && $(this).closest('.p-inp-wrap').hasClass('w-strong')) {
        		$(this).closest('.p-inp-wrap').append('<span class="strong"></span>');
        		$(this).closest('.p-inp-wrap').find('input').keyup(function(event) {
        			/* Act on the event */
        			var password = $(this).val();
        			var $res = $(this).closest('.p-inp-wrap').find('.strong');
        			//$res.removeClass();
					  var strength = 0

					  if (password.length < 6) { 
					  	$res.removeClass('normal hard').addClass('easy').html('Короткий');
					  	return;
					   }

					  if (password.length > 7) strength += 1

					  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1

					  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  strength += 1 

					  if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1

					  if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1


					if (strength < 2 ) {
					    
					  	$res.removeClass('normal hard').addClass('easy').html('Слабый');       
					} else if (strength == 2 ) {
					  	$res.removeClass('easy hard').addClass('normal').html('Нормальный'); 
					} else {
					  	$res.removeClass('normal easy').addClass('hard').html('Сильный'); 
					}
        		});
        	}
        });		


	    login.view.wrap.find('#restore_new').unbind('keyup',login.events.change_pass_confirm_handler);
	    login.view.wrap.find('#restore_new').on('keyup',login.events.change_pass_confirm_handler);



    }

}
