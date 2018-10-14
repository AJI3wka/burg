;

'use strict';

console.log('domains.init start');

domains.init = function() {
    console.log('domains.init!!!!');

    domains.view.wrap = $('#domains_body').find('.wrap');

    domains.model.get_domains();

    domains.events.rebind();
};
domains.init();
