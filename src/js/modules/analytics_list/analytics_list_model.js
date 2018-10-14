;

'use strict';

console.log('analytics_list.model start');

var analytics_list = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

analytics_list.model = {
	lists:{
		lp1:{
			header:'Одноэкранники',
			loaded:false,
			data:[]
		},
		lp3:{
			header:'Трехэкранники',
			loaded:false,
			data:[]
		},
		preland:{
			header:'Преленды',
			loaded:false,
			data:[]
		},
	},
	check_lists_load:function(){

			if (analytics_list.model.lists.lp1.loaded &&
				analytics_list.model.lists.lp3.loaded &&
				analytics_list.model.lists.preland.loaded) {

				if (analytics_list.model.lists.lp1.data.length == 0 &&
					analytics_list.model.lists.lp3.data.length == 0 && 
					analytics_list.model.lists.preland.data.length == 0) {

					analytics_list.view.wrap.html('<p class="empty"><span>У Вас еще нет созданных сайтов.<br>Аналитика доступна только для созданных сайтов на сервисе</span></p>');

				}

			}

	},
	load_lists:function(){

		function after_get(type,data){
			analytics_list.model.paste_data(type,data);
			analytics_list.model.check_lists_load();
		}
		
		analytics_list.controller.get_list('page1',after_get);
		analytics_list.controller.get_list('page3',after_get);
		analytics_list.controller.get_list('preland',after_get);

	},
	paste_data:function(type,data){
		var model_type;
		if (type == 'page1') {
			model_type = 'lp1';
		}else if(type == 'page3') {
			model_type = 'lp3';
		}else if(type == 'preland') {
			model_type = 'preland';
		}

		analytics_list.model.lists[model_type].loaded = true;
		analytics_list.model.lists[model_type].data = data.data;

		analytics_list.view.render_list(model_type);

	}


};
