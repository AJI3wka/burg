;

'use strict';

console.log('analytics_list.view start');


analytics_list.view = {
	render_list:function(type){

		var data = analytics_list.model.lists[type].data;

		var insert_html = '<div class="head">'+ analytics_list.model.lists[type].header+'</div>';

		insert_html += '<div class="wrap">';

		for (var i = 0; i <= data.length - 1; i++) {
			

			insert_html += '<div class="item" data-id="'+data[i].id+'">';

			insert_html += '<div class="name"><span>'+data[i].name+'</span></div>';

			if (if_defined(data[i].domain)) {

				insert_html += '<div class="domain">'+data[i].domain+'</div>';	
			}else{
				insert_html += '<div class="domain">не опубликован</div>';	
			}

			insert_html += '<div class="full-count">';
			var conversion = 0;
			if (data[i].orders>0 && data[i].views>0) {
				conversion = data[i].orders/data[i].views*100;
				conversion = conversion.toFixed(2);

			}
			insert_html += '<div class="td">заявок: <span>'+data[i].orders+'</span></div>';
			insert_html += '<div class="td">просмотров: <span>'+data[i].views+'</span></div>';
			insert_html += '<div class="td">конверсия: <span>'+conversion+'%</span></div>';

			insert_html += '</div>';
			insert_html += '</div>';
		}



		insert_html += '</div>';

		analytics_list.view.wrap.find('.part[data-type="'+type+'"]').html(insert_html);

	}

}
