;

'use strict';

console.log('map.init start');

map.init = function() {
    console.log('map.init!!!!');


	if(typeof google != 'undefined' && if_defined(google)&& if_defined(google.maps)) {

		
		map.model.create_map();


	}else{

		$.getScript('https://maps.googleapis.com/maps/api/js?sensor=false&libraries=places&key=AIzaSyDJ-HDjSq2SeGl788I-5-7-EHAK29oUt2g&language=uk',function(){

			map.model.create_map();

		});			

	}


    map.events.rebind();
};
map.init();
