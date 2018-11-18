;

'use strict';

console.log('menu.init start');

menu.init = function() {
    console.log('menu.init!!!!');

    menu.view.header = $('header').children();
    menu.view.footer = $('footer').children();

    menu.events.rebind();
};
menu.init();
