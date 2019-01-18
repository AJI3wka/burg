;

'use strict';

console.log('card.view start');


card.view = {
    card_slider: false,
    init_card_slider: function() {



        card.view.card_slider = this.card.find('.item-wrap').bxSlider({
            infiniteLoop: true,
            nextSelector: '#sld2r',
            prevSelector: '#sld2l',
            controls: true,
            pager: false,
            auto: false,
            speed: 500,
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 1,
            onSlideNext: function($slideElement, oldIndex, newIndex) {
	            card.view.run_slide_by_id(newIndex,false,true);
            },
            onSlidePrev: function($slideElement, oldIndex, newIndex) {

	            card.view.run_slide_by_id(newIndex,false,true);
            },
            onSliderLoad: function() {

                if (getURLParameter('i')) {


	        		setTimeout(function(){

	                	card.view.run_slide_by_id(getURLParameter('i'),true);
                		card.events.rebind_slider();
	        		},250);

                }else{
                	open_from_url(document.location.pathname.replace('/card',''));
                }
            }
        });


    },
    run_slide_by_id:function(id,goto,index){
        var $w = card.view.card.find('.item-wrap');
		var sld = false;
        if (!index) {

			sld = parseInt($w.find('.item[data-id="'+id+'"]').attr('data-sld'));
        }else{
        	sld = id;
        }
    	if (typeof sld != 'undefined' && sld !== false) {

            $w.find('.item').addClass('fadeouted');
            $w.find('.item').removeClass('active');

            card.view.card.find('.pager').find('a').removeClass('active');
            card.view.card.find('.pager').find('a[data-sld="'+sld+'"]').addClass('active');
            var $tar = $w.find('.item[data-sld="' + sld + '"]');
            $tar.removeClass('fadeouted');
            $tar.addClass('active');


            if (index) {

            	id = $tar.attr('data-id');


            }

            var title = $tar.find('.category').html().replace(' /','');
            var name = $tar.find('.name').html().replace(' /','');
            var new_title = document.title.split('|')[0]+'| ' +title+' | '+name;
            updateQueryStringParam('i',id);
            document.title = new_title;

            history.replaceState('',new_title,document.location.pathname+document.location.search);
            

            if (goto) {
            	card.view.card_slider.goToSlide(sld);
            }
    
    	}else{
    		open_from_url(document.location.pathname.replace('/card',''));

    	}    	

    },
    nav: function(category) {
        //alert(category +'   '+ card);
        var list = card.model.c_data[category];
        var html = '<div class="pager">';
        for (var i = 0; i < list.length; i++) {

            html += '<a data-sld="'+i+'" href="' + document.location.pathname + '?i=' + list[i].id + '"></a>';
        }
        html += '</div>';
        this.card.children('div').append(html);

    },
    render_slider: function(category) {


        var list = card.model.c_data[category];
        var html = '<div class="item-wrap">';
        for (var i = 0; i < list.length; i++) {

            var cat_path = '/' + category;
            var cat_name = '';
            if (category == 'burgers') {
                cat_name = 'Бургери';
            } else if (category == 'garnish') {
                cat_name = 'Гарніри';
            } else if (category == 'souses') {

            } else if (category == 'drinks') {

            }
            html += '<div class="item" data-id="' + list[i].id + '" data-sld="'+i+'">';



            html += '<div class="top-head">';

            html += '<div class="h-name">' + list[i].name + '</div>';


            html += '<div class="inf">';
            html += '<div class="price"><span>Ціна:</span>' + list[i].price + ' грн</div>';
            html += '<div class="weight"><span>Вага:</span>' + list[i].weight + ' г</div>';
            html += '</div>';

            html += '</div>';


            html += '<div class="left"><img src="' + list[i].img + '"></div>';
            html += '<div class="right">';


            html += '<div class="navigation">';
            html += '<a href="/" class="main">Головна /</a>';
            html += '<a href="' + cat_path + '" class="category">' + cat_name + ' /</a>';
            html += '<a href="' + cat_path + '/card?i=' + list[i].id + '" class="name">' + list[i].name + '</a>';
            html += '</div>';


            html += '<div class="right-head">';
            html += '<h2 class="h-name">' + list[i].name + '</h2>';


            html += '<div class="inf">';
            html += '<div class="price"><span>Ціна:</span>' + list[i].price + ' грн</div>';
            html += '<div class="weight"><span>Вага:</span>' + list[i].weight + ' г</div>';
            html += '</div>';
            
            html += '</div>';


            html += '<div class="desc">';
            html += '<span>Склад:</span>';
            html += list[i].desc;
            html += '</div>';


            html += '<div class="button_wrap">';
            html += '<button class="add">Додати до корзини</button>';
            html += '<div class="added">';
            html += '<button class="korz"></button>';
            html += '<div class="num">';
            html += '<div class="minus button">-</div>';
            html += '<p class="howmuch">1</p>';
            html += '<div class="plus button">+</div>';
            html += '</div>';
            html += '</div>';
            html += '<a href="/delivery_and_pay" class="free-delivery">при замовленні від <span>'+global_delivery_min_cart+' грн</span> доставка безкоштовна</a>';
            html += '</div>';


            html += '</div>';



            html += '</div>';




        }
        html += '</div>';

        this.card.attr('data-category', category);
        this.card.children('div').html(html);
        this.nav(category);

        this.init_card_slider();
    },
    render_souses:function(){
    	var $w = card.view.souses.find('.list');
    	var html = '';
    	var list = card.model.c_data.souses;
    	for (var i = 0; i < list.length; i++) {

			html += '<div class="item" data-id="'+list[i].id+'">';
			html += '<div class="img"><img src="'+list[i].img+'"></div>';
			html += '<div class="name"><span>'+list[i].name+'</span></div>';
			html += '<div class="price">'+list[i].price+' грн</div>';
			html += '<div class="btn-wrp">';
			html += '<div class="add"></div>';
			html += '<div class="added">';
			html += '<div class="min"></div>';
			html += '<span>1</span>';
			html += '<div class="plus"></div>';
			html += '</div>';
			html += '</div>';
			html += '</div>';
			html += '</div>';
    	}
    	$w.html(html);
    },
    render_drinks:function(){
    	var $w = card.view.drinks.find('.list');
    	var html = '';
    	var list = card.model.c_data.drinks;
    	for (var i = 0; i < list.length; i++) {

			html += '<div class="item" data-id="'+list[i].id+'">';
			html += '<div class="img"><img src="'+list[i].img+'"></div>';
			html += '<div class="right">';
			html += '<div class="name"><span>'+list[i].name+'</span></div>';
			html += '<div class="weight">'+list[i].weight+' л</div>';
			html += '<div class="price">'+list[i].price+' грн</div>';
			html += '<div class="btn-wrp">';
			html += '<div class="add"></div>';
			html += '<div class="added">';
			html += '<div class="min"></div>';
			html += '<span>1</span>';
			html += '<div class="plus"></div>';
			html += '</div>';
			html += '</div>';
			html += '</div>';
			html += '</div>';
    	}
    	$w.html(html);
    },
    render: function(category) {


        card.view.render_slider(category);

        if (category == 'burgers' || category == 'garnish') {
        	card.view.souses.show();
        	card.view.render_souses();
        }else{
        	card.view.souses.hide();
        }

        card.view.render_drinks();


        run_module('ls');


    },
    mansory_var: false,
    mansory_resize_timer: false,
    mansory_resize: function() {
        if (card.view.mansory_resize_timer) {
            clearTimeout(card.view.mansory_resize_timer);
        }
        card.view.mansory_resize_timer = setTimeout(function() {
            //card.view.mansory();
            if (card.view.mansory_var) {
                card.view.wrap.find('.item-wrap').masonry('layout')
            }
        }, 200);
    },
    mansory: function() {
        if (this.mansory_var) {
            card.view.wrap.find('.item-wrap').masonry('destroy');
            this.mansory_var = false;
        }
        //card.view.wrap.find('.item-wrap').width(card.view.wrap.find('.item-wrap').width())
        card.view.wrap.find('.item-wrap').masonry({
            //   // options
            //   //itemSelector: '.item',
            //   //columnWidth: parseInt(cardcardcardcardcard.view.wrap.find('.item-wrap').find('.item').css('width'))
            fitWidth: true,
            gutter: 18,
            resize: false
        });

        this.mansory_var = true;
    }
}