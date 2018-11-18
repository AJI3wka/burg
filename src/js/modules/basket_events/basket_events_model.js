;

'use strict';

console.log('basket_events.model start');

var basket_events = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}
basket_events.model = {
	start_from_url:function(){
		var l = basket_events.view.wrap.attr('data-loaded');

		if (l == 'card') {

			basket_events.events.rebind_card();
			basket_events.events.rebind_card_souses();
			basket_events.events.rebind_card_drinks();

		}else if(l == 'category') {
			basket_events.events.rebind_list();
			
		}else if(l == 'delivery') {

		}else if(l == 'main') {

		}else if(l == 'cart'){
			basket_events.events.rebind_cart();
		}else if(l == 'checkout'){
			basket_events.events.rebind_checkout();
		}
		

	},
	add_item:function(category,id){


		var local = ls.model.to_pay[category];

		var has = false;
		for (var i = 0; i < local.length; i++) {
			if(local[i].id == id){
				has = true;
				if (if_defined(ls.model.to_pay[category][i].count)) {
					ls.model.to_pay[category][i].count++;
				}else{

					ls.model.to_pay[category][i].count = 1;
				}
			}
		}

		//console.log(has+' '+category+' '+id+' '+ls.model.to_pay[category].length,obj,ls.model.to_pay[category])
		if(!has){
			var list = global_price_data[category];
			var obj ={};
			for (var i = 0; i < list.length; i++) {
				if(list[i].id == id){
					obj.id = id;
					obj.img = list[i].img
					obj.name = list[i].name
					obj.weight = list[i].weight
					obj.price = list[i].price
					obj.count = 1;
				}
			}
			ls.model.to_pay[category][ls.model.to_pay[category].length] = obj;
		}
		ls.model.to_pay.last_update = new Date().getTime();
		ls.model.save_storage();
	},
	remove_item:function(category,id,all){

		var local = ls.model.to_pay[category];

		var has = false;
		for (var i = 0; i < local.length; i++) {
			if(local[i].id == id){
				has = true;
				if (all) {

					ls.model.to_pay[category][i].count = 0;
				}else{
					
					if (if_defined(ls.model.to_pay[category][i].count) && ls.model.to_pay[category][i].count > 0) {
						ls.model.to_pay[category][i].count--;
					}else{

						ls.model.to_pay[category][i].count = 0;
					}
				}
			}
		}

		//console.log(has+' '+category+' '+id+' '+ls.model.to_pay[category].length,obj,ls.model.to_pay[category])
		
		ls.model.to_pay.last_update = new Date().getTime();
		ls.model.save_storage();
	}
};
