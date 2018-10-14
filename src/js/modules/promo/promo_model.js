;

'use strict';

console.log('promo.model start');

var promo = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

promo.model = {
	frame:$('#app-frame').contents(),
	check_get_parameters:function(){
		if(document.location.pathname == '/'){

			if (if_defined(getURLParameter('restore'))&&if_defined(getURLParameter('code'))||if_defined(getURLParameter('email'))&&if_defined(getURLParameter('code'))) {
			    history.replaceState('', document.title, '//'+document.location.host +'/login'+ document.location.search);
				open_part('login',true);
			}
		}
	},
	numberWithSpaces:function(x){
	  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}
};
