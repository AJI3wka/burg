;

'use strict';

console.log('checkout.model start');

var checkout = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

checkout.model = {
	send_cart:function(){
		var $w = checkout.view.wrap;

		var send_obj = {
			name:$w.find('input[name="name"]').val(),
			phone:$w.find('input[name="phone"]').val().replace(/ /gi,''),
			street:$w.find('input[name="street"]').val(),
			build:$w.find('input[name="house"]').val(),
			pid:$w.find('input[name="house_s"]').val(),
			apart:$w.find('input[name="flat"]').val(),
			custom:$w.find('textarea[name="comment"]').val()
		}

		var to_pay = JSON.parse(localStorage['to_pay']);
		console.log('to_pay = ',to_pay);

		var items = [];

		for(var key in to_pay){
			if(to_pay.hasOwnProperty(key)){
				if(Array.isArray(to_pay[key])){
					for (var i = 0; i < to_pay[key].length; i++) {
						if(to_pay[key][i].count>0){
							items[items.length] = {
								id:to_pay[key][i].id,
								count:to_pay[key][i].count
							}
						}
						
					}
				}
			}
		}
		send_obj.items = JSON.stringify(items);
		console.log('send_obj = ',send_obj);

		if ($w.find('#pay_s').val()=='1') {
			send_obj.pay = 1;
		}

		checkout.controller.send_cart(send_obj,function(data){
			console.log('data = ',data);

			if (send_obj.pay) {

				var $r = $w.find('.ready');

				$r.parent().append('<div class="pay-data">'+data.html+'</div>');
				$r.remove();

			}else{

				$('body').attr('data-last-checkout',data.addId);
				localStorage.removeItem('to_pay');
				open_from_url('/thanks',true);

			}

		})

	}
};
