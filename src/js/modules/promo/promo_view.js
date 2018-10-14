;

'use strict';

console.log('promo.view start');


promo.view = {

	append_sec_video:function(){
		var $wrap = $('#video_wrap');
		var iframe_html = '<iframe src="https://www.youtube.com/embed/'+$wrap.attr('data-id')+'?showinfo=0&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
		$wrap.append(iframe_html)
	},
	show_tariffs_by_time:function(time) {

		var $wrp = $('.sn5').find('.ib-wrap');

		var dis = 0;

		for (var i = 0; i < global_tarif_data.length; i++) {
			var tar = global_tarif_data[i];
			if (!if_defined(tar.first_day) || tar.first_day == 'disabled') {
				if(tar.time == time){
					var $tar = $wrp.find('.tarrif[data-lv="'+tar.lv+'"]');
					$tar.find('.count').html(promo.model.numberWithSpaces(tar.price));
					dis = tar.disc;
				}
			}
		}

		var $h = $wrp.parent().find('h3');
		if(dis>0){
			$h.html('Скидка - '+dis+'%').css('opacity',1)
		}else{

			$h.css('opacity',0)
		}
		var $list = $wrp.parent().find('.btn-list');
		$list.find('.item').removeClass('active');
		$list.find('.item[data-time="'+time+'"]').addClass('active');

	}
}
