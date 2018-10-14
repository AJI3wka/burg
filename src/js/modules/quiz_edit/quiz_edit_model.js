;

'use strict';

console.log('quiz_edit.model start');

var quiz_edit = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

quiz_edit.model = {
	cur_data:false,
	inputs:[{
	    selector: '.metrics_visor',
	    default: '0',
	    key: 'content.metrics_visor'

	},{
	    selector: '.m_color',
	    default: 'light-blue',
	    key: 'content.m_color'
	},{
	    selector: '.color_theme',
	    default: 'dark',
	    key: 'content.theme'

	},{
	    selector: '.favicon_img',
	    default: '0',
	    key: 'content.favicon_img'
	}, {	
	    selector: '.og_title',
	    default: '0',
	    key: 'content.og_title'
	}, {	
	    selector: '.og_descriptor',
	    default: '0',
	    key: 'content.og_descriptor'
	}, {	
	    selector: '.og_img',
	    default: '0',
	    key: 'content.og_img'
	}, {
	    selector: '.vcard_category',
	    default: '0',
	    key: 'content.vcard_category'
	}, {
	    selector: '.vcard_company',
	    default: '0',
	    key: 'content.vcard_company'
	}, {	
	    selector: '.vcard_works',
	    default: '0',
	    key: 'content.vcard_works'
	}, {	
	    selector: '.meta_keywords',
	    default: '0',
	    key: 'content.meta_keywords'
	}, {	
	    selector: '.meta_description',
	    default: '0',
	    key: 'content.meta_description'
	}, {	
	    selector: '.aftersend_file',
	    default: '0',
	    key: 'content.aftersend_file'
	}, {		
	    selector: '.aftersend_text',
	    default: 'Спасибо за заявку, наш менеджер свяжется с Вами в ближайшее время',
	    key: 'content.aftersend_text'
	}, {	
	    selector: '.view_video',
	    default: 'Посмотреть видео',
	    key: 'content.view_video'
	}, {

	    selector: '.template',
	    default: 'wov',
	    key: 'template'
	}, {
	    selector: '.bg_shadow',
	    default: '0.8',
	    key: 'content.bg_shadow'
	}, {
	    selector: '.input_count',
	    default: '2'
	}, {
	    selector: '.form_name',
	    default: '1',
	    key: 'content.form_name'
	}, {
	    selector: '.form_phone',
	    default: '1',
	    key: 'content.form_phone'
	}, {
	    selector: '.form_email',
	    default: '0',
	    key: 'content.form_email'
	}, {
	    selector: '.form_custom',
	    default: '0',
	    key: 'content.form_custom'
	}, {
	    selector: '.form_custom_name',
	    default: '0',
	    key: 'content.form_custom_name'
	}, {
	    selector: '.form_custom_plac',
	    default: '0',
	    key: 'content.form_custom_plac'
	}, {
	    selector: '.bg_img_m',
	    default: '0',
	    key: 'content.bg_img_m'
	}, {
	    selector: '.bg_img_d',
	    default: '0',
	    key: 'content.bg_img_d'
	}, {
	    selector: '.logo_img',
	    default: '0',
	    key: 'content.logo_img'
	}, {
	//     selector: '.phone_p1',
	//     default: '',
	//     key: 'content.phone_p1_old'
	// }, {
	    selector: '.phone_p2',
	    default: '',
	    key: 'content.phone_p2'
	}, {
	    selector: '.phone_p3',
	    default: '',
	    key: 'content.phone_p3'
	}, {
	    selector: '.phone_p4',
	    default: '',
	    key: 'content.phone_p4'
	}, {
	    selector: '.phone_p1',
	    default: '',
	    key: 'content.phone_p1'
	}, {
	    selector: '.page_addr',
	    default: '',
	    key: 'content.page_addr'
	}, {
	    selector: '.act_email',
	    default: '',
	    key: 'content.act_email'
	}, {
	    selector: '.page_email',
	    default: '',
	    key: 'content.page_email'
	}, {
	    selector: '.form_head',
	    default: '',
	    key: 'content.form_head'
	}, {
	    selector: '.form_button',
	    default: '',
	    key: 'content.form_button'
	}, {
	    selector: '.content_video',
	    default: '0',
	    key: 'content.content_video'
	}, {
	    selector: '.content_autoplay',
	    default: '1',
	    key: 'content.content_autoplay'
	}, {
	    selector: '.bg_video',
	    default: '0',
	    key: 'content.bg_video'
	}, {
	    selector: '.offer_h2',
	    default: '',
	    key: 'content.offer_h2'
	}, {
	    selector: '.offer_h1',
	    default: '',
	    key: 'content.offer_h1'
	}, {
	    selector: '.descriptor',
	    default: '',
	    key: 'content.descriptor'
	}, {
	    selector: '.page_title',
	    default: '',
	    key: 'content.page_title'
	}, {
	    selector: '.quiz_name',
	    default: '',
	    key: 'name'
	}, {
	    selector: '.domain',
	    default: '',
	    key: 'domain'
	}, {
	    selector: '.metrics',
	    default: '',
	    key: 'content.metrics'
	}, {
	    selector: '.event_submited',
	    default: '',
	    key: 'content.event_submited'
	},  {
	    selector: '.n_head_codes',
	    default: '',
	    key: 'content.n_head_codes'
	},  {
	    selector: '.n_body_codes',
	    default: '',
	    key: 'content.n_body_codes'
	}, {
	    selector: '.head_codes',
	    default: '',
	    key: 'content.head_codes'
	}, {
	    selector: '.content_pre_form',
	    default: '1',
	    key: 'content.content_pre_form'
	}, {
	    selector: '.content_pre_form_offer',
	    default: '0',
	    key: 'content.content_pre_form_offer'
	}, {
	    selector: '.pre_form_button',
	    default: '',
	    key: 'content.pre_form_button'
	}, {
	    selector: '.pre_form_offer',
	    default: '',
	    key: 'content.pre_form_offer'
	}],
	get_input_selectors:function(){

	    var selectors = '';//строка селекторов

	    for (var i = quiz_edit.model.inputs.length - 1; i >= 0; i--) {//по всему вектору занчений

	        var inp = quiz_edit.model.inputs[i];

	        if (inp.hasOwnProperty('key')) {//если еелмент имеет  key - добавляем запятую и селектор

	            selectors += ',' + inp.selector;

	        }

	    }

	    selectors = selectors.substring(1);//удаляем первый символ(это запятая)
	    return selectors;
	},
	update_cur_from_elem:function($this){
		
		var cur_val = $this.val();
        /*-------- наполнение объекта current_user_page актуальным контентом, старт ---------*/

        for (var i = quiz_edit.model.inputs.length - 1; i >= 0; i--) {//по всей длинне вектора полей

            var inp = quiz_edit.model.inputs[i];//элемент вектора

            if (inp.hasOwnProperty('key')) {//если у елемента вектора есть параметр key

                if ($this.is(inp.selector)) {//если этот элемент это селектор с элемента вектора


                    if (inp.key.indexOf('content') > -1) {//если ключ в елементе вектора имеет content(это значение ввнутри content)

                        var content_key = inp.key.replace('content.', '');//переопределение ключа на уровне content

                        if (quiz_edit.model.cur_data.content == null || quiz_edit.model.cur_data.content == 0) {//если в глобальной переменной нету контента создаем его
                            quiz_edit.model.cur_data.content = {};
                        }

                        if(content_key == 'act_email'){
                        	
                        	// var n_val = '';
                        	// var cyrillicPattern = /[\u0400-\u04FF]/;
                        	// var parts = cur_val.split('@');

                        	// if(cyrillicPattern.test(parts[0])){
                        	// 	n_val += punycode.ToASCII(parts[0]);
                        	// }else{
                        	// 	n_val += parts[0];

                        	// }
                        	// n_val += '@';
                        	var n_val = punycode.ToASCII(cur_val.split('@')[0]) + '@' + punycode.ToASCII(cur_val.split('@')[1])
                        	
                        	quiz_edit.model.cur_data.content[content_key] = n_val;


                        }else{

                        	quiz_edit.model.cur_data.content[content_key] = cur_val;
                        }
							//писваивем глобальному обьекту этой сранице в контент с ключем для контент занчение с поля

                        if (content_key == 'offer_h1' || content_key == 'form_head' || content_key == 'descriptor') {
                            //если это одна из textarea заменяем пеернос строки на <br>
                            var enter_char = new RegExp(String.fromCharCode(10), 'g');
                            quiz_edit.model.cur_data.content[content_key] = cur_val.replace(/^\s+|\s+$/g, ' ')
                        }

                        if (content_key == 'page_email' && cur_val.length == 0) {
                            //если не указан page_email, то присваем ему значение act_email
                            quiz_edit.model.cur_data.content[content_key] = quiz_edit.model.cur_data.content.act_email
                        }

                        if (content_key == 'bg_video' && cur_val != '0') {
                            //если это bg_video используем ютуб парсер на значении(возвращает ИД виедо ютуб)
                            quiz_edit.model.cur_data.content[content_key] = youtube_parser(cur_val);
                        }

                        if (content_key == 'content_video' && cur_val != '0') {
                            //если это content_video используем ютуб парсер на значении(возвращает ИД виедо ютуб)
                            quiz_edit.model.cur_data.content[content_key] = youtube_parser(cur_val);
                        }

                        if(content_key == 'pre_form_offer'){
	    					var enter_char = new RegExp(String.fromCharCode(10), 'g');//символ новой строки
                        	quiz_edit.model.cur_data.content[content_key] = cur_val.replace(enter_char,'<br>')
                        }


                    } else {//если key без content'а
                        //то простоприсваиваем значение по ключу
                        quiz_edit.model.cur_data[inp.key] = cur_val;


                    }


                }

            }

        }
		quiz_edit.model.cur_data.content.gentime = new Date().getTime();

        /*-------- наполнение объекта quiz_edit.model.cur_data актуальным контентом, конец ---------*/
	},
	parse_full_data:function(){

	    var $wrap = quiz_edit.view.wrap;

	    var enter_char = new RegExp(String.fromCharCode(10), 'g');//символ новой строки

	    //блок получение значений с полей ввода

	    var land_name = $wrap.find('.quiz_name').val();
	    var page_title = $wrap.find('.page_title').val();

	    var descriptor = $wrap.find('.descriptor').val().replace(/^\s+|\s+$/g, ' ').replace(enter_char,' ');//убираем пробелы в начале и конце строки, перенос на вторую строку заменяем на пробел

	    var offer_h1 = $wrap.find('.offer_h1').val().replace(/^\s+|\s+$/g, ' ').replace(enter_char,' ');//убираем пробелы в начале и конце строки, перенос на вторую строку заменяем на пробел
	    var offer_h2 = $wrap.find('.offer_h2').val().replace(/^\s+|\s+$/g, ' ').replace(enter_char,' ');
	    var bg_video = $wrap.find('.bg_video').val();
	    //var content_video = $wrap.find('.content_video').val();
	    var form_custom_name = '';//$wrap.find('.form_custom_name').val();
	    var form_custom_plac = '';//$wrap.find('.form_custom_plac').val();
	    var form_head = '';// $wrap.find('.form_head').val().replace(/^\s+|\s+$/g, ' ').replace(enter_char,' ');//убираем пробелы в начале и конце строки, перенос на вторую строку заменяем на <br>
	    var form_button = '';//$wrap.find('.form_button').val();
	    var page_email = $wrap.find('.page_email').val();
	    var page_addr = $wrap.find('.page_addr').val();
	    var act_email = $wrap.find('.act_email').val();
	    var phone_p1 = $wrap.find('.phone_p1').val();
	    // var phone_p2 = $wrap.find('.phone_p2').val();
	    // var phone_p3 = $wrap.find('.phone_p3').val();
	    var phone_p4 = $wrap.find('.phone_p4').val();
	    // var phone_g = $wrap.find('.phone_g').val();
	    var domain = $wrap.find('.domain').val();
	    //var content_autoplay = $wrap.find('.content_autoplay').val();
	    var metrics = $wrap.find('.metrics').val();
	    var head_codes = $wrap.find('.head_codes').val();


	    var logo_img = $wrap.find('.logo_img').val();
	    var bg_img_d = $wrap.find('.bg_img_d').val();
	    var bg_img_m = $wrap.find('.bg_img_m').val();
	    var theme = $wrap.find('.color_theme').val();
	    var m_color = $wrap.find('.m_color').val();




	    var form_name = '0';//$wrap.find('.form_name').val();
	    var form_phone ='0';// $wrap.find('.form_phone').val();
	    var form_email = '0';//$wrap.find('.form_email').val();
	    var form_custom = '0';//$wrap.find('.form_custom').val();

	    var content_pre_form = 1;// $wrap.find('.content_pre_form').val();
	    var content_pre_form_offer = 1;
	    var pre_form_button = $wrap.find('.pre_form_button').val();
	    var pre_form_offer = $wrap.find('.pre_form_offer').val().replace(enter_char,'<br>');;

	    var bg_shadow = $wrap.find('.bg_shadow').val();

	    var n_body_codes = $wrap.find('.n_body_codes').val();
	    var n_head_codes = $wrap.find('.n_head_codes').val();

	    var event_submited = $wrap.find('.event_submited').val();

	    var favicon_img = $wrap.find('.favicon_img').val();
	    var og_title = $wrap.find('.og_title').val();
	    var og_descriptor = $wrap.find('.og_descriptor').val();
	    var og_img = $wrap.find('.og_img').val();
	    var vcard_category = $wrap.find('.vcard_category').val();
	    var vcard_company = $wrap.find('.vcard_company').val();
	    var vcard_works = $wrap.find('.vcard_works').val();
	    var meta_keywords = $wrap.find('.meta_keywords').val();
	    var meta_description = $wrap.find('.meta_description').val();
	    var aftersend_file ='';// $wrap.find('.aftersend_file').val();
	    var aftersend_text ='';// $wrap.find('.aftersend_text').val();
	    var view_video = $wrap.find('.view_video').val();
	    var metrics_visor = $wrap.find('.metrics_visor').val();


	    if (page_email.length == 0) {//если page_email пуст - присвоить емейл отправки
	        page_email = act_email;
	    }

	    if (bg_video != '0') {//если есть видео на фон (не 0) используем парсер(возвращает ИД видео ютуб)
	        bg_video = youtube_parser(bg_video);
	    }

	    //if (content_video != '0') {//если есть продающее видео (не 0) используем парсер(возвращает ИД видео ютуб)
	    //    content_video = youtube_parser(content_video);
	    //}

	    // if (pre_form_offer != '0' && pre_form_offer != '') {//если дополнительный оофер не 0 и не пуст то его флаг равен 1

	    //     content_pre_form_offer = '1';

	    // } else {//если нет, то нолю

	    //     content_pre_form_offer = '0';

	    // }

	    //ниже формирование отправляемого объекта и само сохранение
	    var content = {
	        page_title: page_title,
	        descriptor: descriptor,
	        offer_h1: offer_h1,
	        offer_h2: offer_h2,
	        phone_p1: phone_p1,
	        phone_p4: phone_p4,
	        act_email: act_email,
	        page_email: page_email,
	        page_addr: page_addr,
	        //content_video: content_video,
	        //content_autoplay: content_autoplay,
	        logo_img: logo_img,
	        bg_img_d: bg_img_d,
	        bg_img_m: bg_img_m,
	        bg_video: bg_video,
	        form_head: form_head,
	        form_button: form_button,
	        form_name: form_name,
	        form_phone: form_phone,
	        form_email: form_email,
	        form_custom: form_custom,
	        form_custom_name: form_custom_name,
	        form_custom_plac: form_custom_plac,
	        content_pre_form: content_pre_form,
	        content_pre_form_offer: content_pre_form_offer,
	        pre_form_button: pre_form_button,
	        pre_form_offer: pre_form_offer,
	        bg_shadow: bg_shadow,
	        metrics: metrics,
	        metrics_visor: metrics_visor,
	        head_codes: head_codes,
	        event_submited: event_submited,
	        n_head_codes:n_head_codes,
	        n_body_codes:n_body_codes,
	        favicon_img:favicon_img,
	        og_title:og_title,
	        og_descriptor:og_descriptor,
	        og_img:og_img,
	        vcard_category:vcard_category,
	        vcard_company:vcard_company,
	        vcard_works:vcard_works,
	        meta_keywords:meta_keywords,
	        meta_description:meta_description,
	        aftersend_file:aftersend_file,
	        aftersend_text:aftersend_text,
	        view_video:view_video,
	        theme:theme,
	        m_color:m_color,
	        gentime: new Date().getTime()
	    }

	    quiz_edit.model.cur_data.content = content;

	    quiz_edit.model.cur_data.template = 'wov';

	    quiz_edit.model.cur_data.name = land_name;

	    quiz_edit.model.cur_data.domain = domain;

	},
	send_full_data:function(callback){

	    console.log('          send_full_data() - DOMAIN = ', domain);
	    //получаем значение домена бывшего сохранения
	    var $wrap = quiz_edit.view.wrap;;
	    var domain = $wrap.find('.domain').val();
	    var pas_domain = $wrap.find('.domain').attr('data-pasted-value');
	    console.log('          send_full_data() - pasted_domain = ', pas_domain);


	    var show_cname = false;
	    if (domain != pas_domain) {//если изменился домен, то переключаем флаг показа попапа наполенния сменить ИП
	        show_cname = true;
	    }
	    
	    quiz_edit.model.parse_full_data();

	    quiz_edit.controller.save(false,function(){

	        if (show_cname == true) {//если флфг смены домена активен показать попап
	           	show_info_pop('Если Вы подключили сторонний домен, настройте NS записи вашего домена так, чтобы они указывали на:<br>ns1.dnk.bz<br>ns2.dnk.bz<br>Если домен куплен на платформе, то пропустите этот шаг.');
	        }

	        if (callback) {//если есть колбек, выполнить колбек
	            callback();
	        }

	    },function(){
                        
            quiz_edit.view.end_autosave($this,true);

        });

	},
	validate_step:function(step_num){
		var $wrap = quiz_edit.view.wrap;
		var $this_step = $wrap.find('.step[data-step="'+step_num+'"]');
		$wrap.find('.error-input,.error-button').removeClass('error-input error-button');
		$this_step.removeClass('valid_step');

		validate.wrap($this_step,function(){

			$this_step.addClass('valid_step');
		});
		
		if ($this_step.find('.error-input,.error-button').length > 0) {

			
			return false;

		} else {

			
			return true;
		}
		// $this_step.find('input,textarea').trigger('blur');

		

		// return true;
	},
	init_edit_by_id:function(qid,page_id){
		quiz_edit.events.unbind_input_listening();


    	function site_ready(){
    		if(if_defined(quiz_edit)){

	   			quiz_edit.model.site_ready = true;
	   			if(if_defined(quiz_edit.model.quiz_ready) && quiz_edit.model.quiz_ready!='false'){
	   				quiz_edit.model.editor_ready = true;
	   				quiz_edit.view.wrap.find('.hard_request').fadeOut(350);;
	   			}
    		}
    	}

		console.log('init_edit_by_id(',qid,page_id,')');
		//quiz_edit.view.insert_edit_frame(function(){
			if (if_defined(qid)&& qid!='new') {

				if (!if_defined(page_id)) {


					quiz_edit.controller.get_quiz_by_id(qid,function(data){
						var q_data;
						if(typeof data.data.data !== 'object'){

							q_data = JSON.parse(data.data.data);
						}else{
							q_data = data.data.data;
						}

						
						var p_id = q_data.default_page;

						console.log('p_id = ',q_data,p_id);

						if (if_defined(p_id)) {
					        quiz_edit.controller.get(p_id,function(data){
					            

						        quiz_edit.view.paste_values(data.data);//вставить полученные данные в редактор указанного типа

						        quiz_edit.view.init_steps_slider();
						        site_ready();

					        });

						}else{

				            quiz_edit.model.cur_data = {
					            name: data.data.name,
					            content: {
					                form_name: "1",
					                form_phone: "1",
					                form_custom: "0",
					                form_email: "0",
					                form_custom_name: "0",
					                form_custom_plac: "0",
					                quiz:true,
					                content_pre_form:"1"
					            },
					            domain:'null'
					        };
					        
							quiz_edit.model.refresh_data();
						        site_ready();
						}


					});
				}else{

			        quiz_edit.controller.get(page_id,function(data){
			            

				        quiz_edit.view.paste_values(data.data);//вставить полученные данные в редактор указанного типа

				        quiz_edit.view.init_steps_slider();
						        site_ready();

			        });
				}
			}else{

				if (if_defined(page_id)) {
			        quiz_edit.controller.get(page_id,function(data){
			            

				        quiz_edit.view.paste_values(data.data);//вставить полученные данные в редактор указанного типа

				        quiz_edit.view.init_steps_slider();
						        site_ready();

			        });

				}
			}
			
		//});
	},

	init_helpers:function(){
		var $wrap = quiz_edit.view.wrap.find('.helpers');
		if ($wrap.children().length==0) {

    		run_module('helpers');
		}
	},
	refresh_data:function(){
			console.log('refresh_data');
			//quiz_edit.view.insert_edit_frame(function(){

		        quiz_edit.view.paste_values();//вставить полученные данные в редактор указанного типа

		        quiz_edit.view.init_steps_slider();

			//});		
	},
	load_quiz:function(data){

		// if(if_defined(quiz_edit.view.edit_frame) && if_defined(quiz_edit.view.edit_frame.atom_quiz)){
		// 	quiz_edit.view.edit_frame.atom_quiz.qiuz_data = Object.assign({},data);
		// 	//quiz_edit.view.edit_frame.atom_quiz.quiz_data = data;
		// 	quiz_edit.view.edit_frame.atom_quiz.load();
		// }
		
	},
	glvrd:{
		inited:false,
		init:function(){
			quiz_edit.view.glvrd.wrap = $('#glvrd_body');
			this.full_data = {
				descriptor:{
					text:'',
					num:0,
					label:'Дескриптор'	
				},
				offer_h2:{
					text:'',
					num:1	,
					label:'Строчка над оффером'
				},
				offer_h1:{
					text:'',
					num:2	,
					label:'Оффер основа'
				},
				pre_form_offer:{
					text:'',
					num:3	,
					label:'Строчка под оффером'
				},
			}
			quiz_edit.view.glvrd.wrap.find('.g_i-wrap').html('');
			if (!if_defined(window.glvrd)) {

				$('head').append('<link rel="stylesheet" href="https://api.glvrd.ru/v1/glvrd.css">');

				$.getScript("https://api.glvrd.ru/v1/glvrd.js", function(data, textStatus, jqxhr) {
				
					quiz_edit.events.glvrd.rebind();

					quiz_edit.model.glvrd.inited = true;
					quiz_edit.model.glvrd.clean_test();
				});

			}else{

				quiz_edit.events.glvrd.rebind();
				quiz_edit.model.glvrd.inited = true;
				quiz_edit.model.glvrd.clean_test();
			
			}
		},
        full_data:{

        },
        clean_test:function(){

            quiz_edit.view.glvrd.wrap.find('.g_i-wrap').html('');
        	quiz_edit.view.wrap.find('input.valid,textarea.valid').each(function(index, el) {
        		quiz_edit.model.glvrd.update_from_el($(this));
        	});
        	this.test();

        },
        cur_res:{

        },
        test:function(){
			var enter_char = String.fromCharCode(10);
        	var test_string = '';
        	test_string+=this.full_data.descriptor.text+enter_char+'|'+enter_char;
        	test_string+=this.full_data.offer_h2.text+enter_char+'|'+enter_char;
        	test_string+=this.full_data.offer_h1.text+enter_char+'|'+enter_char;
        	test_string+=this.full_data.pre_form_offer.text;
        	var ta = quiz_edit.view.glvrd.wrap.find('.g_textarea');
            glvrd.proofread(test_string, function(result){
        		ta.html(test_string);
        		if (result.status="ok") {	



					var score_f = parseFloat(score);
					var color ="red"
					if (score_f>=7.5) {
						color = "green"
					}else if(score_f > 5){
						color = "orange"

					}
					quiz_edit.view.wrap.find('#glvrd_all').html(score);
					quiz_edit.view.glvrd.wrap.find('.g_result').html(score).css('color',color);

					
                    var text = 'Замечаний нет';
                    if (result.fragments.length == 1) {
                        text = 'Есть 1 замечание';

                    }else if(result.fragments.length > 1 && result.fragments.length <5){
                        text = 'Есть '+result.fragments.length+' замечания';
                    }else if(result.fragments.length >=5){
                        text = 'Есть '+result.fragments.length+' замечаний';
                    }
					quiz_edit.view.glvrd.wrap.find('.g_status').html(text);

        			var quiz_cuts = [];
	        		quiz_edit.model.glvrd.cur_res = result;


	        		var html = test_string;
	        		if (result.fragments.length>0) {
	        			quiz_cuts[quiz_cuts.length] = 0;
	        			html = test_string.slice(0,result.fragments[0].start);

	        			for (var i = 0; i < result.fragments.length; i++) {

	        				html+= '<span class="fragment" data-ind="'+i+'">'+test_string.slice(result.fragments[i].start,result.fragments[i].end)+'</span>';
	        				
	        				if (i+1==result.fragments.length) {

	        					html+= test_string.slice(result.fragments[i].end);

	        				}else{

	        					html+= test_string.slice(result.fragments[i].end,result.fragments[i+1].start);
	        				}

	        				quiz_cuts[quiz_cuts.length] = result.fragments[i].start;
	        				quiz_cuts[quiz_cuts.length] = result.fragments[i].end;
	        			}
	        		
	        		}
						var inps = html.split(enter_char+'|'+enter_char);
						var $i_wrp = quiz_edit.view.glvrd.wrap.find('.g_i-wrap');
						for (var i = 0; i < inps.length; i++) {
							 for(var key in quiz_edit.model.glvrd.full_data){
							 	if (quiz_edit.model.glvrd.full_data.hasOwnProperty(key)) {

							 		if (quiz_edit.model.glvrd.full_data[key].num == i) {

							 			var $t_inp = $i_wrp.find('.g_input[data-key="'+key+'"],.g_textarea[data-key="'+key+'"]');

							 			if ($t_inp.length>0) {

							 				$t_inp.html(inps[i]);

							 			}else{
							 				var cls = 'g_textarea';
							 				if (key == 'descriptor') {
						 						cls = 'g_input';
							 				}
							 				//if (inps[i].length>5) {

								 				$i_wrp.append('<p class="g_label">'+quiz_edit.model.glvrd.full_data[key].label+'</p>');
								 				$i_wrp.append('<pre class="'+cls+'" data-key="'+key+'" contenteditable="true">'+inps[i]+'</pre>');
								 			
							 				//}
							 			}
							 			
							 			//inps[i]
							 		}
							 	}
							 }
						}
						var $focused = $i_wrp.find('.g_focused');
						if ($focused.length>0) {
							var pos = parseInt($focused.attr('data-selection'))
							var inp = $focused[0];
							
							function createRange(node, chars, range) {
							    if (!range) {
							        range = document.createRange()
							        range.selectNode(node);
							        range.setStart(node, 0);
							    }

							    if (chars.count === 0) {
							        range.setEnd(node, chars.count);
							    } else if (node && chars.count >0) {
							        if (node.nodeType === Node.TEXT_NODE) {
							            if (node.textContent.length < chars.count) {
							                chars.count -= node.textContent.length;
							            } else {
							                range.setEnd(node, chars.count);
							                chars.count = 0;
							            }
							        } else {
							           for (var lp = 0; lp < node.childNodes.length; lp++) {
							                range = createRange(node.childNodes[lp], chars, range);

							                if (chars.count === 0) {
							                    break;
							                }
							            }
							        }
							    } 

							    return range;
							};
							function setCurrentCursorPosition(chars) {
							    if (chars >= 0) {
							        var selection = window.getSelection();

							        range = createRange(document.getElementById("c_edit_f"), { count: chars });

							        if (range) {
							            range.collapse(false);
							            selection.removeAllRanges();
							            selection.addRange(range);
							        }
							    }
							};
							setCurrentCursorPosition(pos);
							$focused.removeAttr('id').removeClass('g_focused')
						}	        		
	        		quiz_edit.events.glvrd.rebind_inputs();
        		}

                console.log('GLVRD result = ',result);
            });


        },
        update_real_val:function($elem){

        	var key = $elem.attr('data-key');
        	var enter = String.fromCharCode(10);

        	var pre_text = $elem.html();
        	pre_text = pre_text.replace(new RegExp('</div>','g'),'');
        	pre_text = pre_text.replace(new RegExp('<div>','g'),enter);
        	$elem.html(pre_text);

        	var text = $elem.text();
        	// if (key != 'pre_form_offer') {
        	// 	text = text.replace(new RegExp(String.fromCharCode(10), 'g'),' ');
        	// }else{
        	// 	if (document.location.pathname.indexOf('quiz')==-1) {

        	// 		text = text.replace(new RegExp(String.fromCharCode(10), 'g'),' ');
        	// 	}
        	// }
        	
        	console.log('update_real_val');

        	quiz_edit.view.wrap.find('input.valid[name="'+key+'"],textarea.valid[name="'+key+'"]').val(text).trigger('blur');

        },
        update_from_el:function($elem,parse){

            var val = $elem.val();
            var name = $elem.attr('name');
            if (name == 'descriptor' ||
                name == 'offer_h2' ||
                name == 'offer_h1' ||
                name == 'pre_form_offer'
                ) {
                if (val.length>5) {

        			this.full_data[name].text = val;  
        			if (!parse) {
                    	this.test();
        			}      	
                    // glvrd.proofread(val, function(result){
                    //     console.log('GLVRD result = ',result)
                    // });

                }
            }
        }
	}

};
