;

'use strict';

console.log('analytics_list.init start');

analytics_list.init = function() {
    console.log('analytics_list.init!!!!');
    analytics_list.view.wrap = $('.anlytics_list');
    analytics_list.view.wrap.html('');
    analytics_list.view.wrap.html('<div class="part" data-type="lp1"></div><div class="part" data-type="lp3"></div><div class="part" data-type="preland"></div>');        
    analytics_list.model.load_lists();
    //analytics_list.events.rebind();
};
analytics_list.init();
