;

'use strict';

console.log('user_tools.events start');

user_tools.events = {

	change_pass_submit_handler: function(e) {
        e.preventDefault();
        var _this = this;
        validate.wrap($(this), function() {//валидация области формы
            
            var data = {
                password: $(_this).find('input[data-input-type="old_pass"]').val(),
                new_password: $(_this).find('input[data-input-type="pass_change"]').val(),
                new_password_confirm: $(_this).find('input[data-input-type="pass_confirm"]').val()
            }
            user_tools.controller.change_pass(data,function(){
            	close_modal_from($(_this));
            	show_info_pop('Ваш пароль успешно изменен');
            },function(){
            	$(_this).find('input').val('').addClass('error-input');//jxbcnbnm bygens b gjdtcbn yf yb[ rkfcc jib,rb]
            });

        })
    },
    rebind: function() {
    	var $wrap = user_tools.view.t_wrap;
    	$wrap.find('#user-tools').uitooltip();

    	$wrap.find('#btn_my_id').attr('data-clipboard-text',global_user_data.id);
    	$wrap.find('#btn_my_id').unbind('click');
    	var clipboard = new Clipboard('#btn_my_id');
    	$wrap.find('#btn_my_id').click(function(e) {
	        e.preventDefault();
	        var $this = $(this);
	        $this.html('Скопирован');


	        setTimeout(function(){
	        
	        	$this.html('Мой ID');
	        
	        },1500);

	    });

    	$wrap.find('#user-trig').unbind('click');
    	$wrap.find('#user-trig').click(function(e) {
	        e.preventDefault();

            if ($(this).closest('#user-tools').hasClass('opened')) {
            	user_tools.view.close_user_tools()
            } else {
                $(this).closest('#user-tools').addClass('opened');
            }

	    });


    	$wrap.find('#settings').unbind('click');
    	$wrap.find('#settings').click(function(e) {
	        e.preventDefault();
	        $(this).closest('#user-tools').toggleClass('settings');
	    });
    	$wrap.find('#help').unbind('click');
    	$wrap.find('#help').click(function(e) {
	        e.preventDefault();
    	// 	if (global_build != false) {
			support_chat.expand();
    	// 	}else{
    	// 		//alert('its_localhost');
    	// 	}
            //$('.chaport-launcher-operator-photo').click();
	    });
    	$wrap.find('#logout').unbind('click');
    	$wrap.find('#logout').click(function(e) {
	        e.preventDefault();
	        logout();
	    });
    	$wrap.find('.tarif-data').find('.bal').unbind('click');
    	$wrap.find('.tarif-data').find('.bal').click(function(e) {
	        e.preventDefault();
	        open_from_url('/balance',true);
	    });
    	$wrap.find('.tarif-data').find('.tarif,.to').unbind('click');
    	$wrap.find('.tarif-data').find('.tarif,.to').click(function(e) {
	        e.preventDefault();
	        open_from_url('/tariffs',true);
	    });
    	$('#main_header').find('.exit_editor').unbind('click');
    	$('#main_header').find('.exit_editor').click(function(e) {
	        e.preventDefault();
	        open_from_url('/'+document.location.pathname.split('/')[1],true);

	    });

	    $wrap.find('a.link').unbind('click');
	    $wrap.find('a.link').bind('click',function(e){
		    e.preventDefault();
		    console.log('menu.active_click');		    
		    user_tools.view.close_user_tools();
	    	var href = $(this).attr('href');
	        open_from_url(href,true);
	    });
	    
        // $wrap.find('.show-eye').unbind('mouseenter mouseleave');
        // $wrap.find('.show-eye').on('mouseenter',function(){
        //     $(this).parent().children('input').attr('type','text');
        // });
        // $wrap.find('.show-eye').on('mouseleave',function(){
        //     $(this).parent().children('input').attr('type','password');

        //  });


		
        
        $wrap.find('.show-eye').unbind('click');
        $wrap.find('.show-eye').on('click',function(){
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
	    $wrap.find('#btn_change_pass').unbind();
	    $wrap.find('#btn_change_pass').click(function(e) {
	        e.preventDefault();
	        user_tools.view.close_user_tools();
	        $wrap.find('#pop_change_pass').arcticmodal();
	    });

	    $wrap.find('#pass_new').unbind('keyup');
	    $wrap.find('#pass_new').on('keyup', function() {
	        $(this).attr('data-confirm', $(this).val());
	        $(this).closest('.form').find('#pass_confirm').attr('data-confirm', $(this).val());
	    });

	    $wrap.find('#pop_change_pass').unbind('submit',user_tools.events.change_pass_submit_handler);
	    $wrap.find('#pop_change_pass').submit(user_tools.events.change_pass_submit_handler);

	    validate.live($wrap.find('#pop_change_pass'));

	    user_tools.view.wrap.find('#main_header').find('.logo').unbind('click');
	    user_tools.view.wrap.find('#main_header').find('.logo').click(function(e) {
	    	e.preventDefault();
	    	open_from_url($(this).attr('href'),true);
	    });



        $wrap.find('.show-eye').each(function(index, el) {
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


	    $('.app-wrap').unbind('click',user_tools.view.close_user_tools);
	    $('.app-wrap').bind('click',user_tools.view.close_user_tools);

	    $('#balance').attr('title', 'Ваш баланс: ' + global_user_balance + ' руб.');
    }

}
