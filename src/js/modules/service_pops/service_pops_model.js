;

'use strict';

console.log('service_pops.model start');

var service_pops = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

service_pops.model = {
	check_url:function(){
		var path = document.location.pathname;
			if (path == '/terms') {
				service_pops.view.show_terms();
			}else if(path == '/privacy'){
				service_pops.view.show_privacy();				
			}else if(path == '/tariffs'){
				service_pops.view.show_tariffs();
			}else{

				service_pops.view.show_version();
			}
	},
	numberWithSpaces:function(x){
	  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}

};
