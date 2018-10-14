;

'use strict';

console.log('domains.events start');

domains.events = {

	rebind_domains_list:function(){
		domains.view.wrap.uitooltip();
		domains.view.wrap.find('.domain').find('.button').unbind('click');
		domains.view.wrap.find('.domain').find('.button').click(function(){
			domains.controller.prolong($(this).closest('.domain').attr('data-id'),function(){


				show_info_pop('Домен успешно продлен');

    			domains.model.get_domains();

			});
		});
		
		domains.view.wrap.find('.domain').find('.settings').click(function(){
			var dom_id = $(this).closest('.domain').attr('data-id');
			domains.controller.get_ns(dom_id,function(data){

				var $pop = $('#ns_pop');

				$pop.find('input[name="ns0"]').val(data.ns0);
				$pop.find('input[name="ns1"]').val(data.ns1);
				$pop.attr('data-id',dom_id);
				$pop.arcticmodal();

			});
		});
	},
    rebind: function() {
    	domains.view.wrap.find('.button.get_domain').unbind('click');
    	domains.view.wrap.find('.button.get_domain').click(function(e){
			e.preventDefault();
			open_from_url($(this).attr('href'));
		});

    	$('#ns_pop').find('.button.save_ns').unbind('click');
    	$('#ns_pop').find('.button.save_ns').click(function(e){
			e.preventDefault();
			var $pop = $(this).closest('#ns_pop');
			
			var data = {
				id:$pop.attr('data-id'),
				ns0:$pop.find('input[name="ns0"]').val(),
				ns1:$pop.find('input[name="ns1"]').val()
			}

			domains.controller.update_ns(data,function(){
				$pop.arcticmodal('close');
				show_info_pop('NS записи домена обновлены, для того что бы увидеть изменения, должны обновится записи о домене на DNS серверах интернета. Это занимает в среднем 2-4 часа.')
			});

		});
    }

}
