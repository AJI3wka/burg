;

'use strict';

console.log('a_edit.model start');

var a_edit = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

a_edit.model = {
	ad:false,
	reset_ad:function(){
		a_edit.model.ad = {
			name:'Новая рекламная кампания',
			content:{
				name:'Новая рекламная кампания',
			    header: '',
			    text: '',
			    domain: '',
			    zapros: [
			        [''],
			        [''],
			        [''],
			    ],
			    logics: [
				    // {
				    //     left: [''],
				    //     right: ['']
				    // }, {
				    //     left: [''],
				    //     right: ['']
				    // }, {
				    //     left: [''],
				    //     right: ['']
				    // }
			    ]			
			}
		}
	},
	check_symbols_in_model:function(){

		var valid = true;

		function test_string(string){

			if(!string){
				return {valid:true,new_string:''};
			}

			var re1 = /([a-z]|[а-я]|ы|ъ|э|ь|ё|ї|ґ|є|і|ç|ğ|ö|ş|ü|á|ǵ|ń|ó|ú|ý|ў|[0-9]|\+| |!|-|")/i;
			
			var valid = true;

			var new_string = string;
			
			console.log('test_string = ',string);

			for (var i = 0; i <= string.length - 1; i++) {
				
				if(!re1.test(string[i])){
					valid = false;
					console.log(string[i]);
					new_string = new_string.replace(string[i],'');
				}
				
			}

			return {valid:valid,new_string:new_string};

		}

		var cheking = test_string(a_edit.model.ad.name);

		if (!cheking.valid) {
			valid = false;
			a_edit.model.ad.name = cheking.new_string;
		}

		cheking = test_string(a_edit.model.ad.content.name);

		if (!cheking.valid) {
			valid = false;
			a_edit.model.ad.content.name = cheking.new_string;
		}
		
		cheking = test_string(a_edit.model.ad.content.header);

		if (!cheking.valid) {
			valid = false;
			a_edit.model.ad.content.header = cheking.new_string;
		}

		cheking = test_string(a_edit.model.ad.content.text);

		if (!cheking.valid) {
			valid = false;
			a_edit.model.ad.content.text = cheking.new_string;
		}

		for (var i = a_edit.model.ad.content.zapros.length - 1; i >= 0; i--) {
			
			for (var j = a_edit.model.ad.content.zapros[i].length - 1; j >= 0; j--) {


				cheking = test_string(a_edit.model.ad.content.zapros[i][j]);

				if (!cheking.valid) {
					valid = false;
					a_edit.model.ad.content.zapros[i][j] = cheking.new_string;
				}
				
			}
		}
		if(if_defined(a_edit.model.ad.content.logics)){
			for (var i = a_edit.model.ad.content.logics.length - 1; i >= 0; i--) {
				
				for (var j = a_edit.model.ad.content.logics[i].left.length - 1; j >= 0; j--) {


					cheking = test_string(a_edit.model.ad.content.logics[i].left[j]);

					if (!cheking.valid) {
						valid = false;
						a_edit.model.ad.content.logics[i].left[j] = cheking.new_string;
					}
					
				}



				for (var j = a_edit.model.ad.content.logics[i].left.length - 1; j >= 0; j--) {


					cheking = test_string(a_edit.model.ad.content.logics[i].right[j]);

					if (!cheking.valid) {
						valid = false;
						a_edit.model.ad.content.logics[i].right[j] = cheking.new_string;
					}
					
				}			


			}

		}

		if (!valid) {
			show_info_pop('В контенте рекламной кампании допускаються только буквы английского, турецкого, казахского, русского, украинского или белорусского алфавита, кавычки, знаки "-", "+", "!", пробел. В текущей РК присутсвовали другие символы и были из нее удалены');
			a_edit.view.paste_ad_vals();
		}

	},
	save:function($elem,bg,callback){

		if ($elem) {
            if ($elem.is('input')) {
                a_edit.model.parse_static();
            }else{
                if ($elem.attr('name').length>0) {
                    a_edit.model.parse_logics();

                }else{
                    a_edit.model.parse_zapros();

                }
            }
            a_edit.view.start_autosave($elem);
		}else{

            a_edit.model.parse_zapros();
            a_edit.model.parse_logics();
            a_edit.model.parse_static();
		}

        a_edit.controller.save(bg,callback);

	},
	parse_logics:function(){
		var $wrap = a_edit.view.wrap.find('#logics-wrap');		
		a_edit.model.ad.content.logics = [];
	    $wrap.find('.logic').each(function() {
	        if ($(this).find('textarea[name="logic_left"]').val().length > 5 && $(this).find('textarea[name="logic_right"]').val().length > 5) {
	            	
	            var left_arr = $(this).find('textarea[name="logic_left"]').val().split(String.fromCharCode(10));
				var right_arr =  $(this).find('textarea[name="logic_right"]').val().split(String.fromCharCode(10));

				left_arr.clean("").clean(undefined);
				right_arr.clean("").clean(undefined);
				
	            a_edit.model.ad.content.logics[a_edit.model.ad.content.logics.length] = {
	                left: left_arr,
	                right: right_arr
	            }
	        }

	    });
	},
	parse_zapros:function(){

		var $wrap = a_edit.view.wrap.find('#ya_zapros_wrap');

		a_edit.model.ad.content.zapros = [];

	    $wrap.find('textarea').each(function() {
	        if ($(this).val().length > 0) {
	            var cached_array = $(this).val().split(String.fromCharCode(10));
	            //var regExp = new RegExp('^\s*$','gi');
	            for (var i = 0; i < cached_array.length; i++) {
	                if (!cached_array[i].replace(/\s/g, '').length) {
	                    cached_array[i] = "";
	                }
	            }
	            cached_array.clean("").clean(undefined);
	            a_edit.model.ad.content.zapros[a_edit.model.ad.content.zapros.length] = cached_array;
	        }
	    });
	},
	parse_static:function(){
		var $wrap = a_edit.view.wrap;
        a_edit.model.ad.content.header = $wrap.find('#ya_text_h1').val(),
        a_edit.model.ad.content.text = $wrap.find('#ya_text_text').val(),
        a_edit.model.ad.content.domain = $wrap.find('#domen_name').val(),
        a_edit.model.ad.name = $wrap.find('#advertis_name').val()
        a_edit.model.ad.content.name = a_edit.model.ad.name;
	},
	validate_ad:function(){
		var $wrap = a_edit.view.wrap;
		

	    var zapros_var = '';
	    $wrap.find('#ya_zapros_wrap').find('textarea').each(function(index, el) {
	        zapros_var += $(this).val();
	    });
	    if (zapros_var.length < 5) {
	        show_alert_mess('Хотя бы один запрос должен быть заполнен');
	        return false;
	    }
	    if ($wrap.find('#advertis_name').val().length < 5) {
	        show_alert_mess('Не заполнено название рекламной кампании');
	        return false;
	    }
	    $wrap.find('#logics-wrap').find('.logic').each(function() {
	        if ($(this).attr('data-id') == '1') {
	            if ($(this).find('textarea[name="logic_left"]').val().length < 5) {
	                show_alert_mess('Хотя бы первая логика должна быть заполнена');
	                return false;
	            } else
	            if ($(this).find('textarea[name="logic_right"]').val().length < 5) {
	                show_alert_mess('Хотя бы первая логика должна быть заполнена');
	                return false;
	            } else
	            if ($(this).find('textarea[name="logic_right"]').val().indexOf(' ') > -1) {
	                show_alert_mess('Правая колонка логики должна иметь не более одного слова в строке');
	                return false;
	            }
	        }
	        if ($(this).find('textarea[name="logic_left"]').val().length > 0 && $(this).find('textarea[name="logic_right"]').val().length == 0) {
	            show_alert_mess('Если заполнена левая колонка логики, то должна быть заполнена и правая');
	            return false;
	        }
	        if ($(this).find('textarea[name="logic_left"]').val().length == 0 && $(this).find('textarea[name="logic_right"]').val().length > 0) {
	            show_alert_mess('Если заполнена правая колонка логики, то должна быть заполнена и левая');
	            return false;
	        }
	    });

	    if ($wrap.find('input[name="ya_text_h1"]').val().length < 5) {
	        show_alert_mess('Заголовок объявления должен быть заполнен');
	        return false;
	    }

	    // if ($wrap.find('input[name="ya_text_h1"]').val().length > 33) {
	    //     show_alert_mess('Заголовок объявления превишает лимит символов (33)');
	    //     return false;
	    // }

	    if ($wrap.find('input[name="ya_text_h1"]').val().length > 33) {
	        show_alert_mess('Длинна заголовка объявления не должна превышать 33 символа');
	        return false;
	    }

	    if ($wrap.find('input[name="ya_text_text"]').val().length < 5) {
	        show_alert_mess('Текст объявления должен быть заполнен');
	        return false;
	    }

	    if ($wrap.find('input[name="ya_text_text"]').val().length > 75) {
	        show_alert_mess('Длинна текста объявления не должна превышать 75 символов');
	        return false;
	    }

		return true

	}
};
