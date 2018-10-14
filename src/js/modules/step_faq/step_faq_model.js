;

'use strict';

console.log('step_faq.model start');

var step_faq = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

step_faq.model = {
    faq: {},
    staritng: function() {
        var val = 'nazvanie_quiza';
        var bg = false;

        if (if_defined(step_ed_q)) {
            val = step_ed_q.model.s_model[step_ed_q.model.cur_loaded_step].instruction;
            
            if(val == 'quiz_quest_text'){
            
                if(typeof quiz_editor != 'undefined'){

                    if(getURLParameter('types')=='show'){
                        val = 'quest_type_steps';

                        $('.navigation').find('.m_content').find('h5').html('Выберите формат вопроса');

                        if(quiz_editor.model.q_data.content.questions.length > 0){
                            bg = true;
                        }
                    }else
                    if(getURLParameter('quest')){

                        $('.navigation').find('.m_content').find('h5').html('Заполни содержание вопроса');
                        
                        //alert('starting');
                        for (var i = 0; i < quiz_editor.model.q_data.content.questions.length; i++) {
                            if(quiz_editor.model.q_data.content.questions[i].id== getURLParameter('quest')){
                                var type = quiz_editor.model.q_data.content.questions[i].type;
                                //alert(type);
                                if(type == 'img_2'){
                                    val = 'step_q_2_img';
                                }else 
                                if(type == 'img_3'){
                                    val = 'step_q_3_img';
                                }else 
                                if(type == 'text'){
                                    val = 'step_q_text';
                                }else 
                                if(type == 'check'){
                                    val = 'step_q_check';
                                }else 
                                if(type == 'textarea'){
                                    val = 'step_q_textarea';
                                }else 
                                if(type == 'inputs'){
                                    val = 'step_q_inputs';
                                }else 
                                if(type == 'dates'){
                                    val = 'step_q_dates';
                                }else 
                                if(type == 'range'){
                                    val = 'step_q_range';
                                }                
                            }
                        }

                        if(quiz_editor.model.q_data.content.questions.length > 1){
                            bg = true;
                        }
                    }else{

                        $('.navigation').find('.m_content').find('h5').html('Составь вопросы для своего КВИЗа');


                        if(quiz_editor.model.q_data.content.questions.length > 0){
                            bg = true;
                        }
                    }


                }

            };
        }

        step_faq.model.open_faq(val,bg);
    },
    open_faq: function(id, bg) {
        if (if_defined(step_faq.model.faq[id])) {

            var inst = step_faq.model.faq[id];

            var html = '<ul class="collapsible">';

            if (if_defined(inst.double)) {
                html = '<ul class="collapsible collapsible-double">';
            }

            var all = 0;
            for (var key in inst) {
                if (inst.hasOwnProperty(key)) {
                    if (inst[key] != 'none') {
                        if (all == 0) {

                            html += '<li class="active">';
                        } else {

                            html += '<li>';
                        }
                        if (key == 'video') {
                            html += '<div class="collapsible-header">Видеоинструкция</div>';
                        } else if (key == 'text') {
                            html += '<div class="collapsible-header">Текстовая инструкция</div>';

                        } else if (key == 'ex') {
                            html += '<div class="collapsible-header">Примеры</div>';

                        }

                        html += '<div class="collapsible-body">'

                        if (!if_defined(inst.double)) {
                            html += '<div class="in_wrp">' + inst[key] + '</div>';
                        } else {
                            html += inst[key];

                        }

                        html += '</div>';

                        html += '</li>';

                        all++;
                    }
                }

            }

            html += '</ul>';

            step_faq.view.wrap.html(html);
            if (all > 1) {
                step_faq.view.wrap.find('.collapsible').collapsible({
                    onOpenEnd: function(el) {
                    	//setTimeout(function(){

	                        if($(el).closest('.collapsible').is('.collapsible-double')){
	                        	//alert('in');
	                        }else{
	                        	//alert('out');
		                        var $h = $(el).find('.collapsible-header');
		                        var $i_wrap = $h.closest('.in_wrap');

  								$i_wrap.animate({scrollTop:$h.offset().top - $i_wrap.offset().top +$i_wrap.scrollTop()}, '200');
		                       //$i_wrap.scrollTop();
	                        }
                    	//},350);


                    }
                });
            } else {
                step_faq.view.wrap.find('.collapsible-body').show();

            }

            var $videos = step_ed_q.view.wrap.find('.fvideo');
            $videos.each(function(index, el) {
                if ($(this).find('iframe').length == 0) {

                    $(this).html('<iframe class="ytb_video" src="https://www.youtube.com/embed/' + $(this).attr('data-video-id') + '?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');

                }
            });
            if (!bg) {

                step_faq.view.wrap.closest('.instruction').removeClass('closed');
            }


        }
    }
};