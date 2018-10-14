;

'use strict';

console.log('a_edit.view start');


a_edit.view = {
	wrap:false,

	paste_ad_vals:function(){

		var ad = a_edit.model.ad.content;

	    console.log('  paste_campaign_values(', ad , ')');

	    var domain = '';

	    if (if_defined(ad.domain)) {
	        domain = ad.domain;
	    }

	    var $wrap = a_edit.view.wrap;

	    $wrap.find('#domen_name').val(domain).attr('data-last-pushed', domain);
	    $wrap.find('#advertis_name').val(ad.name).attr('data-last-pushed', ad.name);
	   	$wrap.find('#ya_text_h1').val(ad.header).attr('data-last-pushed', ad.header);
	    $wrap.find('#ya_text_text').val(ad.text).attr('data-last-pushed', ad.text);
	    a_edit.events.rebind_static();

	    a_edit.view.reload_zapros();
	    a_edit.view.reload_logics();

	},
	reload_zapros:function(){

		var ad = a_edit.model.ad.content;
	    var $wrap = a_edit.view.wrap.find('#ya_zapros_wrap');

	    var zapros_scelet =''
	    for (var i = 0; i < ad.zapros.length; i++) {
	        var zapros_text = ad.zapros[i][0];
	        for (var j = 1; j < ad.zapros[i].length; j++) {
	            zapros_text = zapros_text + String.fromCharCode(10) + ad.zapros[i][j];
	        }
	        //ad.zapros[i]

	        zapros_scelet+= '<div class="row-33" data-id="' + i + '"><p class="label">Запрос №' + (i + 1) + '<span title="Удалить запрос" class="remove_zapros"></span></p><textarea data-last-pushed="' + zapros_text + '" name="">' + zapros_text + '</textarea></div>';

	    }
	    $wrap.html(zapros_scelet);
	    a_edit.events.rebind_zapros();

	},
	reload_logics:function(){
		var ad = a_edit.model.ad.content;
	    var $wrap_link = a_edit.view.wrap.find('#logics-list');
	    var $wrap_text = a_edit.view.wrap.find('#logics-wrap');


        var text_scelet = '';
        var link_scelet = '';

        if(if_defined(ad.logics) && ad.logics.length>0 && if_defined(ad.logics[0].left[0])){

		    for (var i = 0; i < ad.logics.length; i++) {

		        var logic_left_text = ad.logics[i].left[0];

		        for (var j = 1; j < ad.logics[i].left.length; j++) {
		            logic_left_text = logic_left_text + String.fromCharCode(10) + ad.logics[i].left[j];
		        }

		        var logic_right_text = ad.logics[i].right[0];

		        for (var j = 1; j < ad.logics[i].right.length; j++) {
		            logic_right_text = logic_right_text + String.fromCharCode(10) + ad.logics[i].right[j];
		        }

		        text_scelet += '<div class="logic" data-id="' + (i + 1) + '"><div class="row-5"><textarea data-last-pushed="' + logic_left_text + '" name="logic_left" >' + logic_left_text + '</textarea></div><div class="row-5"><textarea data-last-pushed="' + logic_right_text + '" name="logic_right">' + logic_right_text + '</textarea></div></div>';
		        link_scelet += '<div class="logic-link" data-id="' + (i + 1) + '">Логика №' + (i + 1) + '<span class="remove_logic" title="Удалить логику"></span></div>'


		    }
        	
        	a_edit.view.wrap.find('.trig[data-target="logics"]').addClass('active');
        }else{
        	a_edit.view.wrap.find('.trig[data-target="logics"]').removeClass('active');
        }

	    $wrap_link.html(link_scelet);
	    $wrap_text.html(text_scelet);
	    	


	    a_edit.events.rebind_logics();
	},
	start_autosave:function($elem){

		console.log('start_autosave');

        if ($elem.prev('.label').length > 0) {

            $elem.prev('.label').find('span.i-sync').fadeIn(300);
        }

        if ($elem.closest('#ya_zapros_wrap').length > 0) {
            $elem.closest('#ya_zapros_wrap').prev().find('.label').find('span.i-sync').fadeIn(300);
        }

        if ($elem.closest('#logics-wrap').length > 0) {
            $elem.closest('.logic_trig').find('.label').find('span.i-sync').fadeIn(300);
        }
	},
	end_autosave:function(){
		var $wrap = a_edit.view.wrap

        $wrap.find('[data-last-pushed]').each(function(index, el) {

            $(this).attr('data-last-pushed', $(this).val());

        });

        $wrap.find('span.i-sync:visible').addClass('checked').fadeOut(700, function() {
            $wrap.find('span.i-sync').removeClass('checked')
        });
	}

}
