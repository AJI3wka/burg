;

'use strict';

console.log('card.model start');

var card = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

card.model = {
	def_data:{
		burgers:[{
			img:'/img/burg/burger1.png',
			name:'Класичний з гострим перцем',
			desc:'Булка, салат айсберг, помыдор, котлета, фуагра, верння смородини, сир камамбер, сир моцарела, сир моцарела, соус чилі, огірок, соус',
			price:69,
			weight:150,
			id:1
		},{
			img:'/img/burg/burger1.png',
			name:'Класичний',
			desc:'Булка, помідор, салат айсберг, сир моцарела, соус чилі, огірок, котлета з яловични, огріок, циболя',
			price:69,
			weight:150,
			id:2
		},{
			img:'/img/burg/burger1.png',
			name:'Класичний',
			desc:'Булка, салат айсберг, помыдор, котлета, фуагра, верння смородини, сир камамбер, сир моцарела, сир моцарела, соус чилі, огірок, соус',
			price:69,
			weight:150,
			id:3
		},{
			img:'/img/burg/burger1.png',
			name:'Класичний',
			desc:'Булка, салат айсберг, помыдор, котлета, фуагра, верння смородини, сир камамбер, сир моцарела, сир моцарела, соус чилі, огірок, соус',
			price:69,
			weight:150,
			id:4
		},{
			img:'/img/burg/burger1.png',
			name:'Класичний',
			desc:'Булка, помідор, салат айсберг, сир моцарела, соус чилі, огірок, котлета з яловични, огріок, циболя',
			price:69,
			weight:150,
			id:5
		}],
		salads:[{
			img:'/img/salad/salad1.png',
			name:'Салат Грецький',
			desc:'Булка, салат айсберг, помыдор, котлета, фуагра, верння смородини, сир камамбер, сир моцарела, сир моцарела, соус чилі, огірок, соус',
			price:69,
			weight:150,
			id:6
		},{
			img:'/img/salad/salad1.png',
			name:'Салат Грецький',
			desc:'Булка, помідор, салат айсберг, сир моцарела, соус чилі, огірок, котлета з яловични, огріок, циболя',
			price:69,
			weight:150,
			id:7
		},{
			img:'/img/salad/salad1.png',
			name:'Салат Грецький',
			desc:'Булка, салат айсберг, помыдор, котлета, фуагра, верння смородини, сир камамбер, сир моцарела, соус',
			price:69,
			weight:150,
			id:8
		},{
			img:'/img/salad/salad1.png',
			name:'Салат Грецький',
			desc:'Булка, салат айсберг, помыдор, котлета, фуагра, верння смородини, сир камамбер, сир моцарела, сир моцарела, соус чилі, огірок, соус',
			price:69,
			weight:150,
			id:9
		},{
			img:'/img/salad/salad1.png',
			name:'Салат Грецький',
			desc:'Булка, помідор, салат айсберг, сир моцарела, соус чилі, огірок, котлета з яловични, огріок, циболя',
			price:69,
			weight:150,
			id:10
		}],
		drinks:[{
			img:'/img/drink/drink1.jpg',
			name:'Салат Грецький',
			price:69,
			weight:150,
			id:11
		},{
			img:'/img/drink/drink1.jpg',
			name:'Салат Грецький',
			price:69,
			weight:150,
			id:12
		},{
			img:'/img/drink/drink1.jpg',
			name:'Салат Грецький',
			price:69,
			weight:150,
			id:13
		},{
			img:'/img/drink/drink1.jpg',
			name:'Салат Грецький',
			price:69,
			weight:150,
			id:14
		},{
			img:'/img/drink/drink1.jpg',
			name:'Салат Грецький',
			desc:'Булка, помідор, салат айсберг, сир моцарела, соус чилі, огірок, котлета з яловични, огріок, циболя',
			price:69,
			weight:150,
			id:15
		}],
		souses:[{
			img:'/img/souse/souse1.jpg',
			name:'Соус',
			price:69,
			weight:150,
			id:16
		},{
			img:'/img/souse/souse1.jpg',
			name:'Соус Грецький',
			price:69,
			weight:150,
			id:17
		},{
			img:'/img/souse/souse1.jpg',
			name:'Соус Африканьский',
			price:69,
			weight:150,
			id:18
		},{
			img:'/img/souse/souse1.jpg',
			name:'Соус',
			price:69,
			weight:150,
			id:19
		},{
			img:'/img/souse/souse1.jpg',
			name:'Соус',
			desc:'Булка, помідор, салат айсберг, сир моцарела, соус чилі, огірок, котлета з яловични, огріок, циболя',
			price:69,
			weight:150,
			id:20
		}],
	},
	run_from_url:function(){
		var path = document.location.pathname;
		card.controller.get_items_list(function(){

			if (path == '/burgers/card') {
				card.view.render('burgers');
			}else 
			if (path == '/salads/card') {
				card.view.render('salads');
			}else 
			if (path == '/drinks/card') {
				card.view.render('drinks');
			}else 
			if (path == '/souses/card') {
				card.view.render('souses');
			}
		});
	}

};
