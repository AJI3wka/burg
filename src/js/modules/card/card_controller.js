;

'use strict';

console.log('card.controller start');

card.controller = {

    api_url: api_config.default,
    get_items_list:function(callback){

		

		if(global_price_data){

        	card.model.c_data = global_price_data;
			callback()
			return
		}

		
        var url = 'https://miasorubka-burger.com.ua/api/Items';
        get_json('get', url, {}, function(data) {

        	var arr = data.data;

        	var def_obj = {
        		burgers:[],
        		salads:[],
        		drinks:[],
        		souses:[]
        	};

        	for (var i = 0; i < arr.length; i++) {


        		arr[i].img = 'https://miasorubka-burger.com.ua'+arr[i].img;

        		arr[i].weight = arr[i].volume;

        		if(arr[i].parent == '1'){

        			def_obj.burgers[def_obj.burgers.length] = arr[i];

        		}else if(arr[i].parent == '2'){

        			def_obj.salads[def_obj.salads.length] = arr[i];

        		}else if(arr[i].parent == '3'){

        			//arr[i].weight = Math.round(arr[i].weight/100)*10;
        			def_obj.drinks[def_obj.drinks.length] = arr[i];

        		}else if(arr[i].parent == '4'){

        			def_obj.souses[def_obj.souses.length] = arr[i];
        			
        		}
        	}
        	global_price_data = def_obj;
        	card.model.c_data = def_obj;
			if(!if_defined(card.model.c_data)){
				if (!if_defined(global_price_data)) {
					global_price_data = card.model.def_data
					card.model.c_data = card.model.def_data;
				}else{
					card.model.c_data = global_price_data;
				}
			}
			if(callback){
				callback(data);
			}
		/*{
			img:'/img/burg/burger1.png',
			name:'Класичний з гострим перцем',
			desc:'Булка, салат айсберг, помыдор, котлета, фуагра, верння смородини, сир камамбер, сир моцарела, сир моцарела, соус чилі, огірок, соус',
			price:69,
			weight:150,
			id:1
		}*/;

        });
    }

}
