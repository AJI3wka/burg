;

'use strict';

console.log('promo.init start');

promo.init = function() {
    console.log('promo.init!!!!');
	promo.view.wrap = $('#promo_wrap');
    promo.model.frame = $('#app-frame').contents();
    promo.model.check_get_parameters();
    promo.events.rebind();
	promo.view.append_sec_video();

};
promo.init();
