;

'use strict';

console.log('how_to.init start');

how_to.init = function() {
    console.log('how_to.init!!!!');
	
	how_to.view.wrap = $('.modal-wrap');

    if (m_lbl_id == 'steps.one') {

    	how_to.view.wrap.find('.lbl-id').html('Steps.one');

    }else{

    	how_to.view.wrap.find('.lbl-id').html('DNK Atom');
    }

	var $opened = $('.arcticmodal-container_i2').find('.faq');
	
	if ($opened.length>0) {
		$opened.addClass('force');
		$opened.arcticmodal('close');
	}

    var id = getURLParameter('i');
	if (!id) {

    	how_to.view.open('all_faq');

	}else{

    	how_to.view.open(id);

	}

    how_to.events.rebind();
};
how_to.init();
