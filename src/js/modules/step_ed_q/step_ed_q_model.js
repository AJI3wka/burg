;

'use strict';

console.log('step_ed_q.model start');

var step_ed_q = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

step_ed_q.model = {
	sec_titles:['Начало','Сайт','Квиз','Форма захвата','Теги страницы','Счетчики и коды','Публикация'],
	s_model:[
		{
			num:0,
			section:'none',
			type:'full_window',
			section_h:'Создай свой КВИЗ',
			selector:'#lets_start',
			weight:5
		},{
			num:1,
			section:0,
			section_h:'Напиши название своего КВИЗа',
			section_t:'Название КВИЗа',
			type:'step',
			selector:'.wrp[data-step-id="proj_name"]',
			weight:7,
			instruction:'nazvanie_quiza',
			inputs:[{
				selector:'#proj_name',
				type:'input',
				default:'',
				keys:[{
					k:'name',
					p:'p_data'
				},{
					k:'name',
					p:'q_data'
				}]
			}]

		},{
			num:2,
			weight:7,
			section:1,
			section_h:'В 3-5 словах опиши, чем ты занимаешься',
			section_t:'Дескриптор (ниша)',
			type:'step',
			selector:'.wrp[data-step-id="descriptor"]',
			instruction:'q_descriptor',
			inputs:[{
				selector:'#q_descriptor',
				type:'input',
				default:'',
				keys:[{
					k:'content.descriptor',
					p:'p_data'
				}]
			}]

		},{
			num:3,
			weight:7,
			section:1,
			section_h:'Напиши текст для главного оффера КВИЗа',
			section_t:'Главный оффер',
			type:'step',
			selector:'.wrp[data-step-id="offer_h1"]',
			instruction:'q_offer_h1',
			inputs:[{
				selector:'#q_m_offer',
				type:'input',
				default:'',
				keys:[{
					k:'content.offer_h1',
					p:'p_data'
				}]
			}]
		},{
			num:4,
			weight:6,
			section:1,
			section_h:'Напиши текст для строчки над главным оффером',
			section_t:'Строчка над оффером',
			type:'step',
			selector:'.wrp[data-step-id="offer_h2"]',
			instruction:'q_offer_h2',
			inputs:[{
				selector:'#q_o_offer',
				type:'input',
				default:'',
				keys:[{
					k:'content.offer_h2',
					p:'p_data'
				}]
			}]
		},{
			num:5,
			weight:6,
			section:1,
			section_h:'Напиши текст для строчки под главным оффером',
			section_t:'Строчка под оффером',
			type:'step',
			selector:'.wrp[data-step-id="pre_form_offer"]',
			instruction:'q_pre_form_offer',
			inputs:[{
				selector:'#q_b_offer',
				type:'input',
				default:'',
				keys:[{
					k:'content.pre_form_offer',
					p:'p_data'
				}]
			}]
		},{
			num:6,
			weight:6,
			section:1,
			section_h:'Напиши текст для кнопки вызова КВИЗа',
			section_t:'Текст на кнопке',
			type:'step',
			selector:'.wrp[data-step-id="pre_form_button"]',
			instruction:'q_pre_form_button',
			inputs:[{
				selector:'#q_pre_form_button',
				type:'input',
				default:'',
				keys:[{
					k:'content.pre_form_button',
					p:'p_data'
				}]
			}]
		},{
			num:7,
			weight:6,
			section:1,
			section_h:'Укажи контактный e-mail для твоих клиентов',
			section_t:'E-mail (контактный)',
			type:'step',
			selector:'.wrp[data-step-id="page_email"]',
			instruction:'q_email_na_stranice',
			inputs:[{
				selector:'#q_page_email',
				type:'input',
				default:'',
				keys:[{
					k:'content.page_email',
					p:'p_data'
				}]
			}]
		},{
			num:8,
			weight:6,
			section:1,
			section_h:'Укажи контактный телефон для твоих клиентов',
			section_t:'Телефон (контактный)',
			type:'step',
			selector:'.wrp[data-step-id="page_phone"]',
			instruction:'telefon_dlia_zajavok_steps',
			inputs:[{
				selector:'#q_page_phone',
				type:'input',
				default:'',
				keys:[{
					k:'content.phone_p1',
					p:'p_data'
				}]
			},{
				selector:'#q_page_phone_d',
				type:'input',
				not_need:true,
				default:'',
				keys:[{
					k:'content.phone_p4',
					p:'p_data'
				}]
			}]
		},{
			num:9,
			weight:5,
			section:1,
			section_h:'Напиши адрес своей компании',
			section_t:'Адрес компании',
			type:'step',
			selector:'.wrp[data-step-id="page_addr"]',
			instruction:'adres_na_stranice',
			inputs:[{
				selector:'#q_page_addr',
				type:'input',
				default:'',
				keys:[{
					k:'content.page_addr',
					p:'p_data'
				}]
			}]
		},{
			num:10,
			weight:5,
			section:1,
			section_h:'Выбери цветовое оформление КВИЗа',
			section_t:'Цветовое оформление',
			type:'step',
			selector:'.wrp[data-step-id="color_theme"]',
			instruction:'q_color_theme_steps',
			inputs:[{
				selector:'#q_color_theme',
				type:'input',
				default:'dark',
				not_need:true,
				keys:[{
					k:'content.theme',
					p:'p_data'
				}]
			},{
				selector:'#q_color_btn',
				type:'input',
				default:'light-blue',
				not_need:true,
				keys:[{
					k:'content.m_color',
					p:'p_data'
				}]
			}]
		},{
			num:11,
			weight:5,
			section:1,
			section_h:'Настрой фон главной страницы КВИЗа',
			section_t:'Фон страницы',
			type:'step',
			selector:'.wrp[data-step-id="p_bg"]',
			instruction:'q_fon_all',
			inputs:[{
				selector:'#q_s1bg_d',
				type:'input',
				default:'',
				keys:[{
					k:'content.bg_img_d',
					p:'p_data'
				}]
			},{
				selector:'#q_s1bg_m',
				type:'input',
				default:'',
				keys:[{
					k:'content.bg_img_m',
					p:'p_data'
				}]
			},{
				selector:'#q_bg_sh',
				type:'input',
				default:'0.8',
				not_need:true,
				keys:[{
					k:'content.bg_shadow',
					p:'p_data'
				}]
			},{
				selector:'#q_bg_video',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.bg_video',
					p:'p_data'
				}]
			}]
		},{
			num:12,
			weight:5,
			section:1,
			section_h:'Загрузи логотип своей компании',
			section_t:'Логотип',
			type:'step',
			selector:'.wrp[data-step-id="logo"]',
			instruction:'q_logo',
			inputs:[{
				selector:'#q_logo',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.logo_img',
					p:'p_data'
				}]
			}]
		},{
			num:13,
			weight:4,
			section:2,
			section_h:'Напиши текст для шапки вопроса',
			section_t:'Шапка вопроса',
			type:'step',
			selector:'.wrp[data-step-id="quiz_title"]',
			instruction:'quiz_title',
			inputs:[{
				selector:'#quiz_title',
				type:'input',
				default:'',
				keys:[{
					k:'content.title',
					p:'q_data'
				}]
			}]
		},{
			num:14,
			weight:4,
			section:2,
			section_h:'Загрузи фото менеджера',
			section_t:'Фото менеджера',
			type:'step',
			selector:'.wrp[data-step-id="quiz_person_img"]',
			instruction:'quiz_person_img',
			inputs:[{
				selector:'#quiz_person_img',
				type:'input',
				default:'',
				keys:[{
					k:'content.p_image',
					p:'q_data'
				}]
			}]
		},{
			num:15,
			weight:4,
			section:2,
			section_h:'Напиши имя менеджера',
			section_t:'Имя менеджера',
			type:'step',
			selector:'.wrp[data-step-id="quiz_person_name"]',
			instruction:'quiz_person_name',
			inputs:[{
				selector:'#quiz_person_name',
				type:'input',
				default:'',
				keys:[{
					k:'content.p_name',
					p:'q_data'
				}]
			}]
		},{
			num:16,
			weight:4,
			section:2,
			section_h:'Укажи должность менеджера',
			section_t:'Должность менеджера',
			type:'step',
			selector:'.wrp[data-step-id="quiz_person_stat"]',
			instruction:'quiz_person_stat',
			inputs:[{
				selector:'#quiz_person_stat',
				type:'input',
				default:'',
				keys:[{
					k:'content.p_status',
					p:'q_data'
				}]
			}]
		},{
			num:17,
			weight:4,
			section:2,
			section_h:'Загрузи логотип своей компании',
			section_t:'Логотип в вопросе',
			type:'step',
			selector:'.wrp[data-step-id="quiz_logo"]',
			instruction:'quiz_logo',
			inputs:[{
				selector:'#quiz_logo',
				type:'input',
				default:'',
				keys:[{
					k:'content.logo',
					p:'q_data'
				}]
			}]
		},{
			num:18,
			weight:24,
			section:2,
			section_h:'Составь вопросы для своего КВИЗа',
			section_t:'Список вопросов',
			type:'quiz',
			inner:'list',
			selector:'#steps_quiz_list',
			instruction:'quiz_quest_text'
		},{
			num:19,
			weight:4,
			section:3,
			section_h:'Загрузи фон для формы захвата',
			section_t:'Фон для формы захвата',
			type:'step',
			selector:'.wrp[data-step-id="quiz_form_bg"]',
			instruction:'quiz_form_bg',
			inputs:[{
				selector:'#quiz_form_bg',
				type:'input',
				default:'',
				keys:[{
					k:'content.forms[0].bg',
					p:'q_data'
				}]
			}]
		},{
			num:20,
			weight:4,
			section:3,
			section_h:'Загрузи изображение для подарка',
			section_t:'Изображение подарка',
			type:'step',
			selector:'.wrp[data-step-id="quiz_form_g_img"]',
			instruction:'quiz_present_img',
			inputs:[{
				selector:'#quiz_form_g_img',
				type:'input',
				default:'',
				keys:[{
					k:'content.forms[0].g_img',
					p:'q_data'
				}]
			}]
		},{
			num:21,
			weight:4,
			section:3,
			section_h:'Напиши текст для заголовка блока с подарком',
			section_t:'Заголовок подарка',
			type:'step',
			selector:'.wrp[data-step-id="quiz_form_g_head"]',
			instruction:'quiz_present_title',
			inputs:[{
				selector:'#quiz_form_g_head',
				type:'input',
				default:'',
				keys:[{
					k:'content.forms[0].g_head',
					p:'q_data'
				}]
			}]
		},{
			num:22,
			weight:4,
			section:3,
			section_h:'Напиши текст для описания блока с подарком',
			section_t:'Описание подарка',
			type:'step',
			selector:'.wrp[data-step-id="quiz_form_g_text"]',
			instruction:'quiz_present_text',
			inputs:[{
				selector:'#quiz_form_g_text',
				type:'input',
				default:'',
				keys:[{
					k:'content.forms[0].g_text',
					p:'q_data'
				}]
			}]
		},{
			num:23,
			weight:4,
			section:3,
			section_h:'Напиши текст для заголовка формы захвата',
			section_t:'Заголовок формы',
			type:'step',
			selector:'.wrp[data-step-id="quiz_form_h1"]',
			instruction:'quiz_form_h1',
			inputs:[{
				selector:'#quiz_form_h1',
				type:'input',
				default:'',
				keys:[{
					k:'content.forms[0].f_head',
					p:'q_data'
				}]
			}]
		},{
			num:24,
			weight:4,
			section:3,
			section_h:'Напиши текст для подзаголовка формы захвата',
			section_t:'Подзаголовок формы',
			type:'step',
			selector:'.wrp[data-step-id="quiz_form_h2"]',
			instruction:'quiz_form_h2',
			inputs:[{
				selector:'#quiz_form_h2',
				type:'input',
				default:'',
				keys:[{
					k:'content.forms[0].f_text',
					p:'q_data'
				}]
			}]
		},{
			num:25,
			weight:4,
			section:3,
			section_h:'Напиши текст для кнопки формы захвата',
			section_t:'Текст кнопки',
			type:'step',
			selector:'.wrp[data-step-id="quiz_form_btn"]',
			instruction:'quiz_form_btn',
			inputs:[{
				selector:'#quiz_form_btn',
				type:'input',
				default:'',
				keys:[{
					k:'content.forms[0].f_btn',
					p:'q_data'
				}]
			}]
		},{
			num:26,
			weight:4,
			section:3,
			section_h:'Настрой поля формы захвата',
			section_t:'Поля формы',
			type:'quiz',
			inner:'form',
			selector:'#steps_quiz_list',
			instruction:'quiz_form_inputs'
		},{
			num:27,
			weight:4,
			section:3,
			section_h:'Напиши текст для сообщения после отправки',
			section_t:'Сообщение после отправки',
			type:'step',
			selector:'.wrp[data-step-id="aftersend_text"]',
			instruction:'aftersend_text',
			inputs:[{
				selector:'#aftersend_text',
				type:'input',
				default:"Спасибо за заявку, наш менеджер свяжется с Вами в ближайшее время",
				not_need:true,
				keys:[{
					k:'content.forms[0].aftersend',
					p:'q_data'
				}]
			}]
		},{
			num:28,
			weight:4,
			section:3,
			section_h:'Настрой действия после отправки формы',
			section_t:'Действия после отправки',
			type:'step',
			selector:'.wrp[data-step-id="aftersend_file"]',
			instruction:'aftersend_file',
			inputs:[{
				selector:'#aftersend_file',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.forms[0].aftersend_file',
					p:'q_data'
				}]
			}]
		},{
			num:29,
			weight:3,
			section:4,
			section_h:'Напиши текст для заголовка вкладки браузера',
			section_t:'Заголовок вкладки браузера',
			type:'step',
			selector:'.wrp[data-step-id="page_title"]',
			instruction:'zagolovok_stranicu',
			inputs:[{
				selector:'#page_title',
				type:'input',
				default:'',
				keys:[{
					k:'content.page_title',
					p:'p_data'
				}]
			}]
		},{
			num:30,
			weight:3,
			section:4,
			section_h:'Загрузи фавикон для вкладки браузера',
			section_t:'Фавикон',
			type:'step',
			selector:'.wrp[data-step-id="favicon_img"]',
			instruction:'page_favicon',
			inputs:[{
				selector:'#favicon_img',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.favicon_img',
					p:'p_data'
				}]
			}]
		},{
			num:31,
			weight:3,
			section:4,
			section_h:'Настрой данные для соцсетей',
			section_t:'Данные для соцсетей',
			type:'step',
			selector:'.wrp[data-step-id="social_data"]',
			instruction:'step_social_data',
			inputs:[{
				selector:'#og_title',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.og_title',
					p:'p_data'
				}]
			},{
				selector:'#og_descriptor',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.og_descriptor',
					p:'p_data'
				}]
			},{
				selector:'#og_img',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.og_img',
					p:'p_data'
				}]
			}]
		},{
			num:32,
			weight:3,
			section:4,
			section_h:'Настрой данные vcard',
			section_t:'Данные vcard',
			type:'step',
			selector:'.wrp[data-step-id="vcard"]',
			instruction:'step_vcard',
			inputs:[{
				selector:'#vcard_category',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.vcard_category',
					p:'p_data'
				}]
			},{
				selector:'#vcard_company',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.vcard_company',
					p:'p_data'
				}]
			},{
				selector:'#vcard_works',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.vcard_works',
					p:'p_data'
				}]
			}]
		},{
			num:33,
			weight:3,
			section:4,
			section_h:'Настрой мета-данные для страницы',
			section_t:'Мета данные',
			type:'step',
			selector:'.wrp[data-step-id="meta"]',
			instruction:'step_meta',
			inputs:[{
				selector:'#meta_description',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.meta_description',
					p:'p_data'
				}]
			},{
				selector:'#meta_keywords',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.meta_keywords',
					p:'p_data'
				}]
			}]
		},{
			num:34,
			weight:2,
			section:5,
			section_h:'Настрой счётчик Яндекс.Метрики для сайта',
			section_t:'Яндекс.Метрика',
			type:'step',
			selector:'.wrp[data-step-id="ya_counter"]',
			instruction:'step_ya_counter',
			inputs:[{
				selector:'#metrics',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.metrics',
					p:'p_data'
				}]
			},{
				selector:'#metrics_visor',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.metrics_visor',
					p:'p_data'
				}]
			}]
		},{
			num:35,
			weight:2,
			section:5,
			section_h:'Настрой счётчик Google Analytics для сайта',
			section_t:'Google Analytycs',
			type:'step',
			selector:'.wrp[data-step-id="g_analytics"]',
			instruction:'step_g_analytics',
			inputs:[{
				selector:'#head_codes',
				type:'input',
				default:'0',
				not_need:true,
				keys:[{
					k:'content.head_codes',
					p:'p_data'
				}]
			}]
		},{
			num:36,
			weight:2,
			section:5,
			section_h:'Настрой интеграции для сайта',
			section_t:'Интеграции',
			type:'step',
			selector:'.wrp[data-step-id="n_codes"]',
			instruction:'step_codes',
			inputs:[{
				selector:'#n_head_codes',
				type:'input',
				default:'',
				not_need:true,
				keys:[{
					k:'content.n_head_codes',
					p:'p_data'
				}]
			},{
				selector:'#n_body_codes',
				type:'input',
				default:'',
				not_need:true,
				keys:[{
					k:'content.n_body_codes',
					p:'p_data'
				}]
			},{
				selector:'#event_submited',
				type:'input',
				default:'',
				not_need:true,
				keys:[{
					k:'content.event_submited',
					p:'p_data'
				}]
			}]
		},{
			num:37,
			weight:1,
			section:6,
			section_h:'Выбери ссылку для КВИЗа',
			section_t:'Ссылка на сайт',
			type:'step',
			selector:'.wrp[data-step-id="domains"]',
			instruction:'step_domains',
			inputs:[{
				selector:'#domain',
				type:'input',
				default:'',
				not_need:true,
				keys:[{
					k:'domain',
					p:'p_data'
				}]
			},{
				selector:'#inner_domain',
				type:'input',
				default:'',
				keys:[{
					k:'dnk_domain',
					p:'p_data'
				}]
			}]
		},{
			num:38,
			weight:1,
			section:6,
			section_h:'Укажи e-mail для сообщений о новых заявках',
			section_t:'E-mail для заявок',
			type:'step',
			selector:'.wrp[data-step-id="act_email"]',
			instruction:'email_dlia_zajavok',
			inputs:[{
				selector:'#act_email',
				type:'input',
				default:'',
				keys:[{
					k:'content.act_email',
					p:'p_data'
				}]
			}]
		},{
			num:39,
			weight:0,
			section:6,
			section_h:'Твой КВИЗ готов к использованию',
			section_t:'Опубликовать',
			type:'step',
			selector:'.wrp[data-step-id="publish"]',
			instruction:'publish',
			inputs:[{
				selector:'#noone',
				type:'input',
				default:'',
				keys:[{
					k:'content.laststep',
					p:'p_data'
				}]
			}]
		// },
		// {
		// 	num:40,
		// 	section:6,
		// 	type:'full_window',
		// 	section_h:'Твой КВИЗ готов к использованию',
		// 	section_t:'Опубликовать',
		// 	selector:'#lets_start',
		// 	weight:0
		}

	],
	editor_ready:function(){
	    step_ed_q.model.init_steps();
	    run_module('step_faq');
	},
	sort_steps:function(){

		var s_model =step_ed_q.model.s_model;

		s_model.sort(function(a,b) {
		  if (a.num < b.num)
		    return -1;
		  if (a.num > b.num)
		    return 1;
		  return 0;
		});		
	},
	init_steps:function(){


		step_ed_q.model.sort_steps();

		var started_index = step_ed_q.model.get_actual_step();

		step_ed_q.view.actual_list(started_index);

		if(getURLParameter('p')&&getURLParameter('p')!='0'){
			started_index = parseInt(getURLParameter('p'));
		}
		// step_ed_q.model.cur_loaded_step = started_index;

		step_ed_q.model.run_step(started_index);


	},
	run_step:function(step){

		if(step>0){
			//end_previous_step;
		}
		updateQueryStringParam('p',step);
		step_ed_q.model.load_step(step);
		step_ed_q.view.show_step(step);
		step_ed_q.events.rebind_step(step);
		step_ed_q.view.animate_step(step);



	},
	load_step:function(step){
		var st = step_ed_q.model.s_model[step];

		step_ed_q.model.cur_loaded_step = step;


		if(st.type == 'step'){
	
					var $step_wrap = step_ed_q.view.wrap.find('.m_m_wrap').find(st.selector);

					$step_wrap.find('.trig-wrap').hide();

			for (var i = 0; i < st.inputs.length; i++) {


				var part = st.inputs[i].keys[0].p;
				var key = st.inputs[i].keys[0].k;

				
				var target = step_ed_q.model.get_target_val(part,key);
				
				var last_updated = true;

				if(!if_defined(target)){
					step_ed_q.model.set_target_val(part,key,st.inputs[i].default);
					target = st.inputs[i].default;
					last_updated = false;
				}				

				if(if_defined(target)){

					
					if(key=='name' && target=='Новый квиз'){
						target = '';
					}
					if(key=='content.logo_img' && target!='0'){
						
						$step_wrap.find('.switch').find('input').attr('checked', 'true');
						$step_wrap.find('.trig-wrap').show();

					}
					if(key=='content.pre_form_offer'){

						var regex = /<br\s*[\/]?>/gi;
						target = target.replace(regex, "\n");

					}

					if(key=='content.theme' && target=='light'){
						
						$step_wrap.find('.switch').find('input').attr('checked', 'true');

					}
					if(key=='content.m_color'&& target!=''){

						$step_wrap.find('.c-item').removeClass('active');		
						$step_wrap.find('.c-item[data-val="'+target+'"]').addClass('active');					

					}
					if(key=='content.bg_video' && target!='0'){
						
						$step_wrap.find('.switch').find('input').attr('checked', 'true');
						$step_wrap.find('.trig-wrap').show();

					}

					if(key=='content.favicon_img' && target!='0'){
						
						$step_wrap.find('.switch').find('input').attr('checked', 'true');
						$step_wrap.find('.trig-wrap').show();

					}		

					if(key=='content.og_title' && target!='0'){
						
						$step_wrap.find('.switch').find('input').attr('checked', 'true');
						$step_wrap.find('.trig-wrap').show();

					}		
					if(key=='content.vcard_category' && target!='0'){
						
						$step_wrap.find('.switch').find('input').attr('checked', 'true');
						$step_wrap.find('.trig-wrap').show();

					}		
					if(key=='content.meta_description' && target!='0'){
						
						$step_wrap.find('.switch').find('input').attr('checked', 'true');
						$step_wrap.find('.trig-wrap').show();

					}		
					if(key=='content.head_codes' && target!='0'){
						
						$step_wrap.find('.switch').find('input').attr('checked', 'true');
						$step_wrap.find('.trig-wrap').show();

					}		
					if(key=='content.n_head_codes' && target!='0'){
						
						$step_wrap.find('#n_head_codes').closest('.trig-wrap').prev('.switch').find('input').attr('checked', 'true');
						$step_wrap.find('#n_head_codes').closest('.trig-wrap').show();

					}		
					if(key=='content.n_body_codes' && target!='0'){
						
						$step_wrap.find('#n_body_codes').closest('.trig-wrap').prev('.switch').find('input').attr('checked', 'true');
						$step_wrap.find('#n_body_codes').closest('.trig-wrap').show();

					}		
					if(key=='content.event_submited' && target!='0'){
						
						$step_wrap.find('#event_submited').closest('.trig-wrap').prev('.switch').find('input').attr('checked', 'true');
						$step_wrap.find('#event_submited').closest('.trig-wrap').show();

					}		
					if(key=='content.metrics' && target!='0'){
						
						$step_wrap.find('#metrics').closest('.trig-wrap').prev('.switch').find('input').attr('checked', 'true').attr('wtftag','asdasd');
						$step_wrap.find('#metrics').closest('.trig-wrap').show();

					}			
					if(key=='domain' && if_defined(target)){
						
						
						$step_wrap.find('.switch').find('input').attr('checked', 'true');
						$step_wrap.find('.trig-wrap').show();
						target = punycode.ToUnicode(target);
					}			
					if(key=='dnk_domain' && if_defined(target)){
						
					
						target = target.replace('.atom.dnk.bz','').replace('.steps.one','');
					}

					if(key=='content.act_email' && if_defined(target)){					
						target = punycode.ToUnicode(target.split('@')[0])+'@'+punycode.ToUnicode(target.split('@')[1]);	
					}



					var $inp = $step_wrap.find(st.inputs[i].selector);
					$inp.val(target)
					if(last_updated){
						$inp.attr('data-last',target);
					}else{
						$inp.attr('data-last','');

					}
					if(target.length>1 && $inp.is('textarea')){
						//alert('load'+target);
						//$inp.css('background','red');
						setTimeout(function(){

						 M.textareaAutoResize($inp);
						},5);
					}

				}
			}

			if(typeof step_faq !='undefined' && if_defined(step_faq)){
				step_faq.model.open_faq(st.instruction);
			}
			
			if(st.instruction == 'publish'){
				step_ed_q.view.load_publish_stage();
				step_ed_q.model.glvrd.init();
			}

		}else if(st.type=='quiz'){

			if(typeof step_faq !='undefined' && if_defined(step_faq)){
				step_faq.model.staritng();
			}
		}
	},
	set_target_val:function(part,key,value){
		//var target = ''

		if(part == 'p_data'){

			
			if(key.indexOf('.')>-1){

				var sc = key.split('.');

				if(if_defined(step_ed_q.model[part][sc[0]]) && if_defined(step_ed_q.model[part][sc[0]][sc[1]])){
					step_ed_q.model[part][sc[0]][sc[1]] = value;
				}
			}else
			if(if_defined(step_ed_q.model[part][key])){
				step_ed_q.model[part][key] = value;
			}
		}else{

			
			if(key.indexOf('.')>-1){

				var sc = key.split('.');
				if(key.indexOf('[0]')>-1){


					if(if_defined(quiz_editor.model[part][sc[0]]) && if_defined(quiz_editor.model[part][sc[0]]['forms'][0][sc[2]])){
						quiz_editor.model[part][sc[0]]['forms'][0][sc[2]] = value;
					}

				}else{

					if(if_defined(quiz_editor.model[part][sc[0]]) && if_defined(quiz_editor.model[part][sc[0]][sc[1]])){
						quiz_editor.model[part][sc[0]][sc[1]] = value;
					}

				}							
			}else

			if(if_defined(quiz_editor.model[part][key])){
				quiz_editor.model[part][key] = value;
			}
		}		

	},
	get_target_val:function(part,key){
		var target = ''

		if(part == 'p_data'){

			if(if_defined(step_ed_q.model[part][key])){
				target = step_ed_q.model[part][key]
			}
			
			if(key.indexOf('.')>-1){

				var sc = key.split('.');

				if(if_defined(step_ed_q.model[part][sc[0]]) && if_defined(step_ed_q.model[part][sc[0]][sc[1]])){
					target = step_ed_q.model[part][sc[0]][sc[1]];
				}
			}
		}else{

			if(if_defined(quiz_editor.model[part][key])){
				target = quiz_editor.model[part][key]
			}
			
			if(key.indexOf('.')>-1){

				var sc = key.split('.');
				if(key.indexOf('[0]')>-1){


					if(if_defined(quiz_editor.model[part][sc[0]]) && if_defined(quiz_editor.model[part][sc[0]]['forms'][0][sc[2]])){
						target = quiz_editor.model[part][sc[0]]['forms'][0][sc[2]];
					}

				}else{

					if(if_defined(quiz_editor.model[part][sc[0]]) && if_defined(quiz_editor.model[part][sc[0]][sc[1]])){
						target = quiz_editor.model[part][sc[0]][sc[1]];
					}

				}							
			}
		}		
		return target;
	},
	get_actual_step:function(){
			
		var s_model =step_ed_q.model.s_model;
		var actual_index = 0;
		for (var i = 0; i < s_model.length; i++) {
			
			if(s_model[i].type == 'step'){

				var empty = false;

				for (var j = 0; j < s_model[i].inputs.length; j++) {
					for (var k = 0; k < s_model[i].inputs[j].keys.length; k++) {
						

						var part = s_model[i].inputs[j].keys[k].p;
						var key = s_model[i].inputs[j].keys[k].k;

						var target = step_ed_q.model.get_target_val(part,key);

						
									//alert(target);

						if(!if_defined(target)&&!if_defined(s_model[i].inputs[j].not_need)){
							if(key == 'dnk_domain' && target != ''){
									//alert(target);

								//empty = true;
							}else{

								//alert(target+'  '+key);
								empty = true;
							}
						}else{
							if(key == 'name' && target == 'Новый квиз'){

								empty = true;
							}
							if(target == s_model[i].inputs[j].default && !if_defined(s_model[i].inputs[j].not_need)){

								if(key == 'dnk_domain' && target != ''){
									//alert(target);

									//empty = true;
								}else{
									//alert(target);

									empty = true;
								}
							}
						}


					}
					
				
				}
				if(empty){
					if(key == 'name'){

						actual_index = i-1;
					}else{
						actual_index = i;
					}

					i = s_model.length;
				}else{
					actual_index = i;
				}
			}else if(s_model[i].type == 'quiz'){


				if(quiz_editor.model.q_data.content.questions.length<5){

					actual_index = i;
					i = s_model.length;
				}



			}
		}
		return actual_index;	
	},
	create_quiz:function(callback){

		var page_id = '';

        step_ed_q.model.p_data = {
            name: 'Новый квиз',
            content: {
                quiz:true,
                content_pre_form:"1",
                form_name: "1",
                form_phone: "1",
                form_custom: "0",
                form_email: "0",
                form_custom_name: "0",
                form_custom_plac: "0"
            },
            domain:'null'
        };

        step_ed_q.controller.save(false,function(data){
        	if (if_defined(data.data)&&if_defined(data.data.addedID)) {
        		page_id = data.data.addedID;

        		step_ed_q.controller.create_quiz(page_id,function(added_id){

        			step_ed_q.controller.attach_quiz(added_id,page_id,function(){
				



				    	updateQueryStringParam('i',page_id);
				    	updateQueryStringParam('qi',added_id);

						if(callback){
							callback();
						}

        			});

        		});


        	}
        });

	},
	try_get_quiz:function(id,p_id,callback){
		step_ed_q.controller.get_page(p_id,function(data){
			step_ed_q.model.p_data = data.data;

			step_ed_q.controller.get_quiz(id,function(data){
				step_ed_q.model.q_data = data.data;
				step_ed_q.view.init_title();
            	step_ed_q.view.init_prewiev();
				if(callback){
					callback();
				}

			});


		});
	},
	update_from_input:function($elem){


		var $sync_ico = $elem.closest('.input-field').find('.sync_l');
		$sync_ico.fadeIn(250);

		var inp= '';

		for (var i = 0; i < step_ed_q.model.s_model.length; i++) {
			if(step_ed_q.model.s_model[i].type=='step'){
				
				for (var j = 0; j < step_ed_q.model.s_model[i].inputs.length; j++) {
					if($elem.is(step_ed_q.model.s_model[i].inputs[j].selector)){

						inp = step_ed_q.model.s_model[i].inputs[j];

					}
				}
			}
			
		}
		if(if_defined(inp)){

			var quiz_update = false;

			var page_update = false;

			var val = $elem.val();

			var real_string = val;
			
			for (var i = 0; i < inp.keys.length; i++) {
				var key = inp.keys[i].k;
				var part = inp.keys[i].p;

				if(part == 'p_data'){
					page_update = true;
					
					if(key=='content.pre_form_offer'){

                        var enter_char = new RegExp(String.fromCharCode(10), 'g');
                        real_string = real_string.replace(enter_char,'<br>');
					}
					
					if(key.indexOf('.')>-1){
						var sk = key.split('.');
						if(sk[1]=='act_email'){

                        	var n_val = '';
                        	var cyrillicPattern = /[\u0400-\u04FF]/;
                        	var parts = real_string.split('@');

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
                        	real_string = n_val;
						}
						step_ed_q.model[part][sk[0]][sk[1]] = real_string;
					}else{
						step_ed_q.model[part][key] = real_string;
					}
				
				}else{
					quiz_update = true;


					if(key.indexOf('.')>-1){
						var sk = key.split('.');

						if(key.indexOf('[0]')>-1){

							quiz_editor.model[part][sk[0]]['forms'][0][sk[2]] = real_string;
						}else{

							quiz_editor.model[part][sk[0]][sk[1]] = real_string;
						}
					}else{
						quiz_editor.model[part][key] = real_string;
					}					

				}

			}
			if($elem.attr('data-last')!=val && key!='dnk_domain'){

				if(page_update && !quiz_update){

					step_ed_q.controller.save(true,function(){


						$sync_ico.addClass('checked').fadeOut(700, function() {
				            //добавляем галочку на иконку снихронизации, скрываем за 700мс и уираем класс галочки с иконки синхронизации
				            $sync_ico.removeClass('checked')
				        });					

						$elem.attr('data-last',val);

					});

				}else if(page_update && quiz_update){

					step_ed_q.controller.save(true,function(){


						quiz_editor.model.save(function(){

							$sync_ico.addClass('checked').fadeOut(700, function() {
					            //добавляем галочку на иконку снихронизации, скрываем за 700мс и уираем класс галочки с иконки синхронизации
					            $sync_ico.removeClass('checked')
					        });					

							$elem.attr('data-last',val);

						});

					});
				}else if(!page_update && quiz_update){

					quiz_editor.model.save(function(){

						$sync_ico.addClass('checked').fadeOut(700, function() {
				            //добавляем галочку на иконку снихронизации, скрываем за 700мс и уираем класс галочки с иконки синхронизации
				            $sync_ico.removeClass('checked')
				        });					

						$elem.attr('data-last',val);

					});

				}
			}else if($elem.attr('data-last')!=val && key=='dnk_domain'){
				step_ed_q.controller.check_atom_domain(val,function(){
					step_ed_q.controller.attach_atom_domain(val,function(){
						
						step_ed_q.controller.save(true,function(){


							$sync_ico.addClass('checked').fadeOut(700, function() {
					            //добавляем галочку на иконку снихронизации, скрываем за 700мс и уираем класс галочки с иконки синхронизации
					            $sync_ico.removeClass('checked')
					        });					

							$elem.attr('data-last',val);

						});				
					})

				},function(){
					show_info_pop('Этот поддомен уже занят');
				});

			}

		}
		

	},
	glvrd:{
		inited:false,
		init:function(){
			step_ed_q.view.glvrd.wrap = $('#glvrd_body');
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
			step_ed_q.view.glvrd.wrap.find('.g_i-wrap').html('');
			if (!if_defined(window.glvrd)) {

				$('head').append('<link rel="stylesheet" href="https://api.glvrd.ru/v1/glvrd.css">');

				$.getScript("https://api.glvrd.ru/v1/glvrd.js", function(data, textStatus, jqxhr) {
				
					step_ed_q.events.glvrd.rebind();

					step_ed_q.model.glvrd.inited = true;
					step_ed_q.model.glvrd.clean_test();
				});

			}else{

				step_ed_q.events.glvrd.rebind();
				step_ed_q.model.glvrd.inited = true;
				step_ed_q.model.glvrd.clean_test();
			
			}
		},
        full_data:{

        },
        clean_test:function(){

            step_ed_q.view.glvrd.wrap.find('.g_i-wrap').html('');
        	//quiz_edit.view.wrap.find('input.valid,textarea.valid').each(function(index, el) {
        	//	quiz_edit.model.glvrd.update_from_el($(this));
        	//});
        	

			this.full_data.descriptor.text = step_ed_q.model.p_data.content.descriptor;       

			this.full_data.offer_h2.text = step_ed_q.model.p_data.content.offer_h2;       

			this.full_data.offer_h1.text = step_ed_q.model.p_data.content.offer_h1;       
			this.full_data.pre_form_offer.text = step_ed_q.model.p_data.content.pre_form_offer;        	
        	// name == 'descriptor' ||
         //        name == 'offer_h2' ||
         //        name == 'offer_h1' ||
         //        name == 'pre_form_offer'
        	
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
        	var ta = step_ed_q.view.glvrd.wrap.find('.g_textarea');
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
					step_ed_q.view.wrap.find('#glvrd_all').html(score);
					step_ed_q.view.glvrd.wrap.find('.g_result').html(score).css('color',color);

					
                    var text = 'Замечаний нет';
                    if (result.fragments.length == 1) {
                        text = 'Есть 1 замечание';

                    }else if(result.fragments.length > 1 && result.fragments.length <5){
                        text = 'Есть '+result.fragments.length+' замечания';
                    }else if(result.fragments.length >=5){
                        text = 'Есть '+result.fragments.length+' замечаний';
                    }
					step_ed_q.view.glvrd.wrap.find('.g_status').html(text);

        			var quiz_cuts = [];
	        		step_ed_q.model.glvrd.cur_res = result;


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
						var $i_wrp = step_ed_q.view.glvrd.wrap.find('.g_i-wrap');
						for (var i = 0; i < inps.length; i++) {
							 for(var key in step_ed_q.model.glvrd.full_data){
							 	if (step_ed_q.model.glvrd.full_data.hasOwnProperty(key)) {

							 		if (step_ed_q.model.glvrd.full_data[key].num == i) {

							 			var $t_inp = $i_wrp.find('.g_input[data-key="'+key+'"],.g_textarea[data-key="'+key+'"]');

							 			if ($t_inp.length>0) {

							 				$t_inp.html(inps[i]);

							 			}else{
							 				var cls = 'g_textarea';
							 				if (key == 'descriptor') {
						 						cls = 'g_input';
							 				}
							 				//if (inps[i].length>5) {

								 				$i_wrp.append('<p class="g_label">'+step_ed_q.model.glvrd.full_data[key].label+'</p>');
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
	        		step_ed_q.events.glvrd.rebind_inputs();
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
        	step_ed_q.model.p_data.content[key] = text;
        	step_ed_q.controller.save();

			this.full_data.descriptor.text = step_ed_q.model.p_data.content.descriptor;       

			this.full_data.offer_h2.text = step_ed_q.model.p_data.content.offer_h2;       

			this.full_data.offer_h1.text = step_ed_q.model.p_data.content.offer_h1;       
			this.full_data.pre_form_offer.text = step_ed_q.model.p_data.content.pre_form_offer;        	
        	// name == 'descriptor' ||
         //        name == 'offer_h2' ||
         //        name == 'offer_h1' ||
         //        name == 'pre_form_offer'
        	
        	this.test();
        	//quiz_edit.view.wrap.find('input.valid[name="'+key+'"],textarea.valid[name="'+key+'"]').val(text).trigger('blur');

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
