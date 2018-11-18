;

'use strict';

console.log('thanks.init start');

thanks.init = function() {
    console.log('thanks.init!!!!');

    run_module('menu');
    
    run_module('ls');

    thanks.view.wrap = $('.sec1');
    var num = $('body').attr('data-last-checkout');
    var $n = thanks.view.wrap.find('.nbr');
    var $nb = thanks.view.wrap.find('.numbr');
    if (!num) {
    	$nb.html('Ваше замовлення успішно оформлено');
    	num = 0;
    	$n.hide();


    }else{
    	$nb.html('Номер вашого замовлення :');
	    num = num.toString();
	    var cycle_length = 7-num.length
	    for (var i = 0; i < cycle_length; i++) {
	    	num = '0'+num;
	    }

    	$n.show();

    	$n.find('span').html(num);
    }


    thanks.events.rebind();
    
};
thanks.init();
