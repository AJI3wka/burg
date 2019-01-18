;

'use strict';

console.log('lot_list.view start');


lot_list.view = {
	nav:function(category){
		var $wrap = lot_list.view.wrap.find('.main_burg');

		var $link = $wrap.find('.burgers');
		var $title = $wrap.find('.brgs');

		if (category == 'burgers') {
			$link.html('Бургери').attr('href', '/'+category);
			$title.html('Бургери');
		}else 
		if (category == 'garnish') {
			$link.html('Гарніри').attr('href', '/'+category);
			$title.html('Гарніри');
		}else 
		if (category == 'drinks') {
			$link.html('Напої').attr('href', '/'+category);
			$title.html('Напої');
		}else 
		if (category == 'souses') {
			$link.html('Соуси').attr('href', '/'+category);
			$title.html('Соуси');
		}
		//alert(category +'   '+ lot_list);
	},
	render:function(category){

		this.nav(category);


		var list = lot_list.model.c_data[category];
		var html = '<div class="item-wrap">';
		for (var i = 0; i < list.length; i++) {
			html+='<div class="item" data-id="'+list[i].id+'">';
			html+='<div class="active"></div>';
			html+='<p class="h2">'+list[i].name+'</p>';
			html+='<div class="img_b"><img src="'+list[i].img+'"></div>';
			if (category == 'burgers'||category == 'garnish') {

				html+='<p class="ingredient">'+list[i].desc+'</p>';
				
			}
			html+='<div class="prc">';
			html+='<div class="price">Ціна: <span class="c">'+list[i].price+' грн</span></div>';
			html+='<div class="weight">';
			if (category!='drinks') {

				html+='Вага: ';
			}else{

				html+="Об'єм: ";
			}
			html+='<span class="g"> '+list[i].weight;
			if (category!='drinks') {

				html+=' г';
			}else{

				html+=' л';
			}
			html+='</span></div>';
			html+='</div>';



			html+='<div class="button_wrap">';
			html+='<button class="add">Додати до корзини</button>';
			html+='<div class="added"><button class="korz"></button><div class="num"><div class="minus button">-</div><p class="howmuch">1</p><div class="plus button">+</div></div></div></div>';
			html+='</div>';



            
		}
		html += '</div>';

		lot_list.view.wrap.find('.burgs').html(html);
		
		lot_list.view.mansory_var = false;
		lot_list.view.mansory()
		lot_list.events.list_rebind();
		
        run_module('ls');

	},
	mansory_var:false,
	mansory_resize_timer:false,
	mansory_resize:function(){
		if (lot_list.view.mansory_resize_timer) {
			clearTimeout(lot_list.view.mansory_resize_timer);
		}
		lot_list.view.mansory_resize_timer = setTimeout(function(){
			//lot_list.view.mansory();
			if (lot_list.view.mansory_var) {
				try{
					lot_list.view.wrap.find('.item-wrap').masonry('layout');
				}catch(e){

				}
			}
		},200);
	},
	mansory:function(){
		if (this.mansory_var) {
			try{
				lot_list.view.wrap.find('.item-wrap').masonry('destroy');
			}catch(e){


			}
			this.mansory_var = false;
		}
		//lot_list.view.wrap.find('.item-wrap').width(lot_list.view.wrap.find('.item-wrap').width())
		lot_list.view.wrap.find('.item-wrap').masonry({
		//   // options
		//   //itemSelector: '.item',
		//   //columnWidth: parseInt(lot_list.view.wrap.find('.item-wrap').find('.item').css('width'))
			fitWidth: true,
			gutter: 16,
			resize: false
		});

		this.mansory_var = true;
	}
}
