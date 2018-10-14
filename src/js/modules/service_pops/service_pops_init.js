;

'use strict';

console.log('service_pops.init start');

service_pops.init = function() {
    console.log('service_pops.init!!!!');

    service_pops.view.wrap = $('.modal-wrap');
    if (m_lbl_id == 'steps.one') {

    	service_pops.view.wrap.find('.lbl-id').html('Steps.one');
    	service_pops.view.wrap.find('.lbl-url').html('steps.one');
    	service_pops.view.wrap.find('.lbl-sup-e').html('support@steps.one');

    }else{

    	service_pops.view.wrap.find('.lbl-id').html('DNK.bz');
    	service_pops.view.wrap.find('.lbl-url').html('atom.dnk.bz');
    	service_pops.view.wrap.find('.lbl-sup-e').html('support@bnk.bz');
    }


	service_pops.view.wrap.find('a').each(function(){
		$(this).attr('href',$(this).attr('href').replace('///','//'+m_lbl_id+'/'));
		$(this).html($(this).html().replace('///','//'+m_lbl_id+'/'));
	});    

	if(!global_user_data){
		$('body').attr('data-prew', '/');
	}

    service_pops.events.rebind();
    service_pops.view.close_other();
    service_pops.model.check_url();
};
service_pops.init();
