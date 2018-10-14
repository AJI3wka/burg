;

'use strict';

console.log('preland_edit.model start');

var preland_edit = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

preland_edit.model = {
	cur_data:false,
	inputs:[
	{
	    selector: '.close_preland',
	    default: '',
	    key: 'content.close_preland'
	}, 

	{
	    selector: '.open_preland',
	    default: '',
	    key: 'content.open_preland'
	}, 
	{
	    selector: '.mirror_iframe_trig',
	    default: '0',
	    key: 'content.mirror_iframe_trig'
	}, 
	{
	    selector: '.protocol',
	    default: 'http://',
	    key: 'content.mirror_protocol'
	}, 
	{
	    selector: '.mirror_domain',
	    default: '',
	    key: 'content.mirror_domain'
	},  
	{
	    selector: '.mirror_page',
	    default: '',
	    key: 'content.mirror_page'
	},{
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
	    default: 'preland',
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
	    default: '',
	    key: 'content.bg_img_m'
	}, {
	    selector: '.bg_img_d',
	    default: '',
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
	    default: 'Заголовок вкладки',
	    key: 'content.page_title'
	}, {
	    selector: '.land_name',
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
	},  {
	    selector: '.head_codes',
	    default: '',
	    key: 'content.head_codes'
	}, {
	    selector: '.content_pre_form',
	    default: '0',
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
	}, {
	    selector: '.metrics_visor',
	    default: '',
	    key: 'content.metrics_visor'
	}],
	get_input_selectors:function(){

	    var selectors = '';//строка селекторов

	    for (var i = preland_edit.model.inputs.length - 1; i >= 0; i--) {//по всему вектору занчений

	        var inp = preland_edit.model.inputs[i];

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

        for (var i = preland_edit.model.inputs.length - 1; i >= 0; i--) {//по всей длинне вектора полей

            var inp = preland_edit.model.inputs[i];//элемент вектора

            if (inp.hasOwnProperty('key')) {//если у елемента вектора есть параметр key

                if ($this.is(inp.selector)) {//если этот элемент это селектор с элемента вектора


                    if (inp.key.indexOf('content') > -1) {//если ключ в елементе вектора имеет content(это значение ввнутри content)

                        var content_key = inp.key.replace('content.', '');//переопределение ключа на уровне content

                        if (preland_edit.model.cur_data.content == null || preland_edit.model.cur_data.content == 0) {//если в глобальной переменной нету контента создаем его
                            preland_edit.model.cur_data.content = {};
                        }

                        preland_edit.model.cur_data.content[content_key] = cur_val;//писваивем глобальному обьекту этой сранице в контент с ключем для контент занчение с поля

                        if (content_key == 'offer_h1' || content_key == 'form_head' || content_key == 'descriptor') {
                            //если это одна из textarea заменяем пеернос строки на <br>
                            var enter_char = new RegExp(String.fromCharCode(10), 'g');
                            preland_edit.model.cur_data.content[content_key] = cur_val.replace(/^\s+|\s+$/g, ' ')
                        }

                        if (content_key == 'page_email' && cur_val.length == 0) {
                            //если не указан page_email, то присваем ему значение act_email
                            preland_edit.model.cur_data.content[content_key] = preland_edit.model.cur_data.content.act_email
                        }

                        if (content_key == 'bg_video' && cur_val != '0') {
                            //если это bg_video используем ютуб парсер на значении(возвращает ИД виедо ютуб)
                            preland_edit.model.cur_data.content[content_key] = youtube_parser(cur_val);
                        }

                        if (content_key == 'content_video' && cur_val != '0') {
                            //если это content_video используем ютуб парсер на значении(возвращает ИД виедо ютуб)
                            preland_edit.model.cur_data.content[content_key] = youtube_parser(cur_val);
                        }


                    } else {//если key без content'а
                        //то простоприсваиваем значение по ключу
                        preland_edit.model.cur_data[inp.key] = cur_val;


                    }


                }

            }

        }
		preland_edit.model.cur_data.content.gentime = new Date().getTime();

        /*-------- наполнение объекта preland_edit.model.cur_data актуальным контентом, конец ---------*/
	},
	parse_full_data:function(){

	    var $wrap = preland_edit.view.wrap;

	    var enter_char = new RegExp(String.fromCharCode(10), 'g');//символ новой строки

	    //блок получение значений с полей ввода

	    var land_name = $wrap.find('.land_name').val();
	    var page_title = $wrap.find('.page_title').val();

	    var descriptor = $wrap.find('.descriptor').val().replace(/^\s+|\s+$/g, ' ');//убираем пробелы в начале и конце строки, перенос на вторую строку заменяем на пробел

	    var offer_h1 = $wrap.find('.offer_h1').val().replace(/^\s+|\s+$/g, ' ');//убираем пробелы в начале и конце строки, перенос на вторую строку заменяем на пробел
	    var offer_h2 = $wrap.find('.offer_h2').val();
	    var bg_video = $wrap.find('.bg_video').val();
	    var content_video = $wrap.find('.content_video').val();
	    var form_custom_name = $wrap.find('.form_custom_name').val();
	    var form_custom_plac = $wrap.find('.form_custom_plac').val();
	    //var form_head = $wrap.find('.form_head').val().replace(/^\s+|\s+$/g, ' ');//убираем пробелы в начале и конце строки, перенос на вторую строку заменяем на <br>
	    var form_button = $wrap.find('.form_button').val();
	    var page_email = $wrap.find('.page_email').val();
	    var page_addr = $wrap.find('.page_addr').val();
	    var act_email = $wrap.find('.act_email').val();
	    var phone_p1 = $wrap.find('.phone_p1').val();
	    // var phone_p2 = $wrap.find('.phone_p2').val();
	    // var phone_p3 = $wrap.find('.phone_p3').val();
	    var phone_p4 = $wrap.find('.phone_p4').val();
	    // var phone_g = $wrap.find('.phone_g').val();
	    var domain = $wrap.find('.domain').val();
	    var content_autoplay = $wrap.find('.content_autoplay').val();
	    var metrics = $wrap.find('.metrics').val();
	    var head_codes = $wrap.find('.head_codes').val();
	    var event_submited = $wrap.find('.event_submited').val();

	    var logo_img = $wrap.find('.logo_img').val();
	    var bg_img_d = $wrap.find('.bg_img_d').val();
	    var bg_img_m = $wrap.find('.bg_img_m').val();

	    var form_name = $wrap.find('.form_name').val();
	    var form_phone = $wrap.find('.form_phone').val();
	    var form_email = $wrap.find('.form_email').val();
	    var form_custom = $wrap.find('.form_custom').val();

	    var content_pre_form = $wrap.find('.content_pre_form').val();
	    var content_pre_form_offer = $wrap.find('.content_pre_form_offer').val();
	    var pre_form_button = $wrap.find('.pre_form_button').val();
	    var pre_form_offer = $wrap.find('.pre_form_offer').val();
	    var mirror_domain = $wrap.find('.mirror_domain').val();
	    var mirror_protocol = $wrap.find('.protocol').val();
	    var mirror_page = $wrap.find('.mirror_page').val();
		var mirror_iframe_trig = $wrap.find('.mirror_iframe_trig').val();

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
	    var aftersend_file = $wrap.find('.aftersend_file').val();
	    var aftersend_text = $wrap.find('.aftersend_text').val();
	    var view_video = $wrap.find('.view_video').val();
	    var metrics_visor = $wrap.find('.metrics_visor').val();

	    if (page_email.length == 0) {//если page_email пуст - присвоить емейл отправки
	        page_email = act_email;
	    }

	    if (bg_video != '0') {//если есть видео на фон (не 0) используем парсер(возвращает ИД видео ютуб)
	        bg_video = youtube_parser(bg_video);
	    }

	    if (content_video != '0') {//если есть продающее видео (не 0) используем парсер(возвращает ИД видео ютуб)
	        content_video = youtube_parser(content_video);
	    }

	    if (pre_form_offer != '0' && pre_form_offer != '') {//если дополнительный оофер не 0 и не пуст то его флаг равен 1

	        content_pre_form_offer = '1';

	    } else {//если нет, то нолю

	        content_pre_form_offer = '0';

	    }

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
	        content_video: content_video,
	        content_autoplay: content_autoplay,
	        logo_img: logo_img,
	        bg_img_d: bg_img_d,
	        bg_img_m: bg_img_m,
	        bg_video: bg_video,
	        mirror_domain:mirror_domain,
	        mirror_protocol:mirror_protocol,
	        mirror_page:mirror_page,
	        mirror_iframe_trig:mirror_iframe_trig,
	        metrics_visor:metrics_visor,
	        //form_head: form_head,
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
	        gentime: new Date().getTime()
	    }

	    preland_edit.model.cur_data.content = content;

	    preland_edit.model.cur_data.template = 'wov';

	    preland_edit.model.cur_data.name = land_name;

	    preland_edit.model.cur_data.domain = domain;

	},
	send_full_data:function(callback){

	    console.log('          send_full_data() - DOMAIN = ', domain);
	    //получаем значение домена бывшего сохранения
	    var $wrap = preland_edit.view.wrap;;
	    var domain = $wrap.find('.domain').val();
	    var pas_domain = $wrap.find('.domain').attr('data-pasted-value');
	    console.log('          send_full_data() - pasted_domain = ', pas_domain);


	    var show_cname = false;
	    if (domain != pas_domain) {//если изменился домен, то переключаем флаг показа попапа наполенния сменить ИП
	        show_cname = true;
	    }
	    
	    preland_edit.model.parse_full_data();

	    preland_edit.controller.save(false,function(){

	        
	        if (show_cname == true) {//если флфг смены домена активен показать попап
	           	show_info_pop('Если Вы подключили сторонний домен, настройте NS записи вашего домена так, чтобы они указывали на:<br>ns1.dnk.bz<br>ns2.dnk.bz<br>Если домен куплен на платформе, то пропустите этот шаг.');
	        }

	        if (callback) {//если есть колбек, выполнить колбек
	            callback();
	        }

	    });

	},
	validate_step:function(step_num){
		var $wrap = preland_edit.view.wrap;
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
	init_edit_by_id:function(id){

		preland_edit.view.insert_edit_frame(function(){

	        preland_edit.controller.get(id,function(data){
	            

		        preland_edit.view.paste_values(data.data);//вставить полученные данные в редактор указанного типа

		        preland_edit.view.init_steps_slider();

	        });
			
		});
	},


	init_helpers:function(){
		var $wrap = preland_edit.view.wrap.find('.helpers');
		if ($wrap.children().length==0) {

    		run_module('helpers');
		}
	},
	load_quiz_list:function(){

	    $("#quiz_panel").load(source_url+"/html/parts/quiz/panel.html", function() {
		  //quiz_edit.view.panel = $("#quiz_panel");
		  	//var r_w = $('#qiuz_helper').width()-$("#quiz_panel").closest('.scroll_content').outerWidth() - 20;
			//$('#quiz_editor').css({width:r_w+'px'});
			$('#quiz_editor').load(source_url+"/html/parts/quiz/edit.html", function() {

				run_module('quiz_editor');

			});
		});

		//run_module('quiz_editor');

	},
	remove_quiz_from_page:function(){

		if (if_defined(quiz_editor)) {
			quiz_editor.controller.attach_quiz_to_page(null,preland_edit.model.cur_data.id);
		}

	},
	load_quiz:function(data){

		if(if_defined(preland_edit.view.edit_frame) && if_defined(preland_edit.view.edit_frame.atom_quiz)){
			preland_edit.view.edit_frame.atom_quiz.qiuz_data = Object.assign({},data);
			//quiz_edit.view.edit_frame.atom_quiz.quiz_data = data;
			preland_edit.view.edit_frame.atom_quiz.load();
		}
		
	}

};
