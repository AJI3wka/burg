;

'use strict';

console.log('step_faq.init start');

step_faq.init = function() {
    console.log('step_faq.init!!!!');

    step_faq.events.rebind();

	    $('#faq_wrp').load(source_url+"/html/modal/faq.html", function() {
	    	step_faq.view.wrap = $('#faq_wrp');

	    	step_faq.view.preform_html();
	    	step_faq.model.staritng();

	    });
};
step_faq.init();
