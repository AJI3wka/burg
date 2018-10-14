;

'use strict';

console.log('personal_data.model start');

var personal_data = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

personal_data.model = {
	contacts:false,
	check_saved_user_all_personal:function($wrap, skip_classes) {
		var $personal_data; // переменная с враппером персональных данных

		if ($wrap) { // если передан селектор враппера
			$personal_data = $wrap.find('.personal_data'); // ищем в враппере блок с личными данными
		} else { // если селектор не передан
			$personal_data = $('.personal_data'); // ищем по всез блоках с личными данными
		}

		var inputs = $personal_data.find('input[class^=fr]'); // переменнач с массивом инпутов, которые будут найдены в нужном блоке

	    var i, j;
		for (i=0; i<inputs.length; i++) { // проходимся по все инпутах
			if (skip_classes) { // если переданы классы инпутов, которые не учитываються при проверке
				for (j=0; j<skip_classes.length; j++) { // проходимся по все переданных классах
					if ($(inputs[i]).val().length < 1 && !($(inputs[i]).hasClass(skip_classes[j]))) return false; // если инпут пустой, и не пренадлежит к игнорированному классу то проверка не пройдена, возвращаем false
				}
			} else { // если не переданы классы инпутов, которые не учитываються при проверке
				if ($(inputs[i]).val().length < 1) return false; // если инпут пустой то проверка не пройдена, возвращаем false
			}
		}

		var textareas = $personal_data.find('textarea[class^=fr]'); // переменная с массивом textarea, которые будут найдены в нужном блоке

		for (i=0; i<textareas.length; i++) { // проходимся по все textarea
			if (skip_classes) { // если переданы классы textarea, которые не учитываються при проверке
				for (j=0; j<skip_classes.length; j++) { // проходимся по все переданных классах
					if ($(textareas[i]).val().length < 1 && !($(textareas[i]).hasClass(skip_classes[j]))) return false; // если textarea пустой, и не пренадлежит к игнорированному классу то проверка не пройдена, возвращаем false
				}
			} else { // если не переданы классы textarea, которые не учитываються при проверке
				if ($(textareas[i]).val().length < 1) return false; // если textarea пустой то проверка не пройдена, возвращаем false
			}
		}

		return true; // если все что нужно заполнено то проверка пройдена, возвращаем true
	},
	paste_values:function(callback) {

		console.log('personal_data.model.paste_values');
		if(personal_data.model.contacts == false){	
		
			personal_data.controller.get_values(function(data){
				console.log('DATА personal_data.controller.get_values = ', data)

		        if(if_defined(data.data)){
		        	personal_data.model.contacts = $.parseJSON(data.data);
		        }

				personal_data.view.paste_values();

				if(if_defined(callback)){
					callback();
				}
		
			});
		
		}else{
		
			personal_data.view.paste_values();
			if(if_defined(callback)){
				callback();
			}
		}

	}
};
