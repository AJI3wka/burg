;

'use strict';

console.log('card.init start');

card.init = function() {
    console.log('card.init!!!!');
    run_module('menu');

    card.view.card = $('section.card');
    card.view.souses = $('section.souses');
    card.view.drinks = $('section.drinks');


    card.events.rebind();
    card.model.run_from_url();
};
card.init();
