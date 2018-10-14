;

'use strict';

console.log('domains.model start');

var domains = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {} 
}

domains.model = {
	domains:[],
	check_prolong:function(){
 		if (getURLParameter('pl')) {
			
			domains.controller.prolong(getURLParameter('pl'),function(){


				show_info_pop('Домен успешно продлен');
				history.replaceState('',location.title,'/domains');

    			domains.model.get_domains();

			});
 		}

	},
	get_domains:function(){
		domains.controller.get_domains(function(data){
			
			domains.model.domains = data.data
			domains.view.render_domains();

			domains.model.check_prolong();
			

		});
	}
};
