;

'use strict';

console.log('partner.init start');

partner.init = function() {
    console.log('partner.init!!!!');
   	partner.view.wrap = $('#partner_statistic');// сохраняем враппер страницы статистики партнерки
    partner.view.balance_tab = partner.view.wrap.find('#partner_balance_tab'); // сохраняем враппер поп-апа виплат
    partner.model.init_partner_table();
    partner.events.rebind();
};
partner.init();
