;

'use strict';

console.log('step_ed_q.view start');


step_ed_q.view = {
	prep_list:function(){

    	var $list = step_ed_q.view.wrap.find('.step-list').find('.list');
    	step_ed_q.model.sort_steps();

    	var html = '';
    	html+='<ul class="collapsible">';
    	for (var i = 0; i < step_ed_q.model.sec_titles.length; i++) {
    		
    		html+='<li>';
    		html+='<div class="collapsible-header"><span>'+step_ed_q.model.sec_titles[i]+'</span></div>';

    		html+='<div class="collapsible-body">';

    		for (var j = 0; j < step_ed_q.model.s_model.length; j++) {
    		
    			if (step_ed_q.model.s_model[j].section == i) {

	    			html+='<a href="#!" data-section='+i+' data-step='+step_ed_q.model.s_model[j].num+'><span>'+step_ed_q.model.s_model[j].section_t+'</span></a>';
    			}
	    	}
    		
    		html+='</div>';
    		html+='</li>';
    		
    	}
    	html+='</ul>';
    	$list.html(html);
    	$list.find('.collapsible').collapsible();
    	$list.find('a').unbind('click');
    	$list.find('a').click(function(e) {
    		e.preventDefault();

  			step_ed_q.model.run_step(parseInt($(this).attr('data-step')));
    		/* Act on the event */
    	});
    	function false_handler(){
    		if($(this).closest('li').hasClass('active')){
    				
    		}
    	}
    	$list.find('li').find('.collapsible-header').unbind('click', false_handler)
    	$list.find('li').find('.collapsible-header').bind('click', false_handler)

	},
	prep_inputs:function(){

		step_ed_q.view.wrap.find('.m_m_wrap').find('input,textarea').each(function(index, el) {
			var type = $(this).attr('data-input-type');
			if(if_defined(type)){

				$(this).attr('data-length',validate.get_parameters(type).max_length).addClass('m_valid');
				var $field = $(this).parent();
				if($field.find('.valid-info').length == 0){
					$field.append('<div class="valid-info"></div>');
				}
				
				if($field.find('.sync_l').length == 0){
					
					$field.append('<div class="sync_l"></div>');	
				}
			}
			
		});

	},
	actual_list:function(step){
		var $list = step_ed_q.view.wrap.find('.step-list').find('.list');
		if (step_ed_q.model.s_model[step].type == 'step'||step_ed_q.model.s_model[step].type == 'quiz') {

			var $tar_a = $list.find('a[data-step="'+step+'"]');

			$tar_a.closest('li').addClass('targeted');

			$tar_a.addClass('targeted');

			var opened = true;

			$list.find('li').each(function(index, el) {

				if (opened) {
					$(this).removeAttr('style');
					if(!$(this).hasClass('targeted')){
						$(this).find('a').show();
					}else{

						$(this).find('a').each(function(index, el) {

							if (opened) {
								$(this).show();

								if($(this).hasClass('targeted')){
									$(this).removeClass('targeted');
									opened = false;
								}
							}else{
								$(this).hide();
							}
							
						});
						$(this).removeClass('targeted');
					}

				}else{
					$(this).hide();
				}

				
			});

		}else{

			$list.find('li').hide();
		}

	},
	prepare_editor:function(){

    	$('#main_header').find('h1').addClass('mt_h').html('Создание КВИЗа > Новый квиз');
    	step_ed_q.view.prep_inputs();
    	step_ed_q.view.prep_list();


	},
	init_prewiev:function(){
		var $preview_link = step_ed_q.view.wrap.find('#preview-site');
		if(if_defined(step_ed_q.model.p_data.id)){
			$preview_link.attr('href', 'https://client.dnk.bz/'+step_ed_q.model.p_data.id).show()
		}else{
			$preview_link.hide();
		}

	},
	init_title:function(){
		$('#main_header').find('h1').addClass('mt_h').html('Создание КВИЗа > Новый квиз');
    	if(if_defined(step_ed_q.model.p_data)&&if_defined(step_ed_q.model.p_data.name)){
    		if(step_ed_q.model.p_data.name !='Новый квиз'){

				$('#main_header').find('h1').addClass('mt_h').html(step_ed_q.model.p_data.name);

    		}
    	}	
	},
	make_progress_bar:function(step){

		var cur_progress = 0;
		var full_count = 0; 

		if(!step){
			step = step_ed_q.model.cur_loaded_step;
		}

		for (var i = 0; i < step_ed_q.model.s_model.length; i++) {
			if (i<step) {
				cur_progress += step_ed_q.model.s_model[i].weight;
			}else if(i== step){
				if(step_ed_q.model.s_model[i].instruction == "quiz_quest_text"){

					var equal_quest_count = 5;
					var equal_step_weight = 1;
					var base_weight = step_ed_q.model.s_model[i].weight;

					var quest_weight = base_weight/(equal_quest_count + equal_step_weight);

					if(quiz_editor.model.q_data.content.questions.length<5){

						cur_progress += quiz_editor.model.q_data.content.questions.length*quest_weight;
					}else{

						cur_progress += equal_quest_count*quest_weight;
					}

				}else{
				}

			}
			
			full_count += step_ed_q.model.s_model[i].weight;

		}
		console.log('cur_progress = ',cur_progress,full_count)
		var progress = Math.round(cur_progress/full_count*100);

		step_ed_q.view.wrap.find('.progress-bar').children('.current').css('width',progress+'%');

		step_ed_q.view.wrap.find('.progress-bar').find('.helper').attr('title',progress+'%');		

		step_ed_q.view.wrap.find('.progress-bar').find('.helper').uitooltip();




		step_ed_q.view.wrap.find('.progress-bar').unbind('mousemove');		
		step_ed_q.view.wrap.find('.progress-bar').mousemove(function(e){
			$(this).find('.helper').css('left',e.pageX + 'px');
		})


	},

	show_step:function(step){
		console.log('show_step = ',step);

		step_ed_q.view.wrap.find('.hard_request').hide();
		step_ed_q.view.make_progress_bar(step);

		var $back_btn = step_ed_q.view.wrap.find('.navigation').find('.prew');
		if (step<2) {
			$back_btn.hide();
		}else{
			$back_btn.show();
		}
		
		var $next_btn = step_ed_q.view.wrap.find('.navigation').find('.next');
		if (step == 0) {
			$next_btn.html('Начать<i class="material-icons right">arrow_forward</i>');
		}else if(step == 18){
			$next_btn.html('К форме<i class="material-icons right">arrow_forward</i>');
		}else if(step == 39){
			$next_btn.html('Настроить РК<i class="material-icons right">arrow_forward</i>');
		}else{
			$next_btn.html('Далее<i class="material-icons right">arrow_forward</i>');
		}		

		var $head = step_ed_q.view.wrap.find('.navigation').find('.m_content').find('h5');


		var st = step_ed_q.model.s_model[step];

		$head.html(st.section_h);

		if (st.type == 'full_window') {
			step_ed_q.view.wrap.find('.m_m_wrap').hide();
			step_ed_q.view.wrap.find('.m_quiz_page').find('.wrp').hide();	
			step_ed_q.view.wrap.find('.m_quiz_page').hide();
			step_ed_q.view.wrap.find('.m_full_page').find(st.selector).show();	
			step_ed_q.view.wrap.find('.m_full_page').show();
			var $videos = step_ed_q.view.wrap.find('.m_full_page').find(st.selector).find('.video');

			$videos.each(function(index, el) {
				if ($(this).find('iframe').length == 0) {

					$(this).html('<iframe class="ytb_video" src="https://www.youtube.com/embed/' + $(this).attr('data-video-id') + '?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');

				}
			});

		}else if(st.type == 'quiz'){

			step_ed_q.view.wrap.find('.m_m_wrap').hide();
			step_ed_q.view.wrap.find('.m_full_page').find('.wrp').hide();
			step_ed_q.view.wrap.find('.m_full_page').hide();
			if(st.inner == 'list'){
				removeURLparameter('form');
				try{

					quiz_editor.view.view_ed_bd.find('.editor_close').trigger('click');
				}catch(e){}

				var $wrp = step_ed_q.view.wrap.find('.m_quiz_page').find(st.selector);
				$wrp.find('h2').hide();
				$wrp.find('.part.froms_part').hide();
				$wrp.find('.part.quest_part').show();

				quiz_editor.view.render_questions();
			}else{
				removeURLparameter('quest');
				try{

					quiz_editor.view.view_ed_bd.find('.editor_close').trigger('click');
				}catch(e){}


				var $wrp = step_ed_q.view.wrap.find('.m_quiz_page').find(st.selector);
				$wrp.find('h2').hide();
				var $frm = $wrp.find('.part.froms_part');
				$frm.hide();
				$wrp.find('.part.quest_part').hide();

				$frm.find('.button.edit').trigger('click');

			}
			step_ed_q.view.wrap.find('.m_quiz_page').find(st.selector).show();
			step_ed_q.view.wrap.find('.m_quiz_page').show();
			step_ed_q.view.wrap.find('.instruction').addClass('overlayed');


		}else{

			step_ed_q.view.wrap.find('.m_quiz_page').find('.wrp').hide();	
			step_ed_q.view.wrap.find('.m_quiz_page').hide();		
			step_ed_q.view.wrap.find('.m_full_page').find('.wrp').hide();
			step_ed_q.view.wrap.find('.m_full_page').hide();
			step_ed_q.view.wrap.find('.m_full_page').find('.ytb_video').remove();
			step_ed_q.view.wrap.find('.m_m_wrap').show();
			step_ed_q.view.wrap.find('.instruction').removeClass('overlayed');

			if (st.type=='step') {
				step_ed_q.view.wrap.find('.m_m_wrap').find('.wrp').hide();
				step_ed_q.view.wrap.find('.m_m_wrap').find(st.selector).show();
				step_ed_q.view.wrap.find('.m_m_wrap').find(st.selector).find('input:visible,textarea:visible').first().focus();
				step_ed_q.view.wrap.find('.lbl').html('.'+m_lbl_id)

			    if (if_defined(global_user_data)&&if_defined(global_user_data.trial)) {
			    	if(step_ed_q.view.wrap.find('.m_m_wrap').find(st.selector).find('#metrics_visor').length>0){
			    		step_ed_q.view.wrap.find('.m_m_wrap').find(st.selector).find('#metrics_visor').closest('.input-field').addClass('locked');

			    	}
			    	if(step_ed_q.view.wrap.find('.m_m_wrap').find(st.selector).find('#n_head_codes').length>0){
			    		step_ed_q.view.wrap.find('.m_m_wrap').find(st.selector).find('#n_head_codes').closest('.input-field').addClass('locked');
			    		
			    	}
			    	if(step_ed_q.view.wrap.find('.m_m_wrap').find(st.selector).find('#n_body_codes').length>0){
			    		step_ed_q.view.wrap.find('.m_m_wrap').find(st.selector).find('#n_body_codes').closest('.input-field').addClass('locked');
			    		
			    	}
			    	if(step_ed_q.view.wrap.find('.m_m_wrap').find(st.selector).find('#event_submited').length>0){
			    		step_ed_q.view.wrap.find('.m_m_wrap').find(st.selector).find('#event_submited').closest('.input-field').addClass('locked');
			    		
			    	}

			    	// lp1_edit.view.wrap.find('.trig_btn[data-target="metrics_visor"],.trig_btn[data-target="n_head_codes"],.trig_btn[data-target="n_body_codes"],.trig_btn[data-target="event_submited"]').addClass('disabled');
			    	// lp1_edit.view.wrap.find('textarea[data-input-type="n_head_codes"],textarea[data-input-type="n_body_codes"],textarea[data-input-type="event_submited"]').attr('readonly', 'readonly').addClass('disabled');

			    }
			}

		}




	},
	step_animation_timer:false,
	animate_step:function(step){
		var st = step_ed_q.model.s_model[step];

		var $list = step_ed_q.view.wrap.find('.step-list');
		
		var $instruction = step_ed_q.view.wrap.find('.instruction');

		$list.addClass('force_open');

		$instruction.addClass('closed');

		if (step_ed_q.view.step_animation_timer) {
			clearTimeout(step_ed_q.view.step_animation_timer);
		}
		step_ed_q.view.step_animation_timer = setTimeout(function(){

			$list.find('a').removeClass('active');
			var $tar_a = $list.find('a[data-step="'+st.num+'"]');
			$tar_a.addClass('active');
			var $tar_li = $tar_a.closest('li')
			if (!$tar_li.hasClass('active')) {
				$tar_li.find('.collapsible-header').trigger('click');
			}
			


			step_ed_q.view.step_animation_timer = setTimeout(function(){

					$list.removeClass('force_open');

					$instruction.removeClass('closed');



			},500);


		},200);




	},
	toggle_tar_inst:function(target){
            var $inst = step_ed_q.view.wrap.find('.instruction');
            var was_closed = false;
            var double = false;
            if ($inst.hasClass('closed')) {
              $inst.removeClass('closed');
              was_closed = true;
            } 
            if ($inst.find('.wrp').children().hasClass('collapsible-double')) {
              double = true;
            }
            

            var $f_head = $inst.find('.wrp').children('.collapsible').find('.collapsible-header').first();
            var $s_head = $f_head.parent().find('.collapsible').find('.collapsible-header').first()
            
            if (target != 'main') {

              $s_head = $inst.find('.wrp').find('li[data-target="'+target+'"]').first().children('.collapsible-header');
              $f_head = $s_head.closest('ul').closest('li').children('.collapsible-header');

            }

              if ($f_head.parent().hasClass('active')) {
                if (!double) {
                  if (!was_closed) {
                    $f_head.trigger('click');
                  }  
                }else{
                  if ($s_head.parent().hasClass('active')) {
                    if (!was_closed) {
                      $s_head.trigger('click');
                    }  
                  }else{
                      $s_head.trigger('click');
                  }
                }
              }else{
                  $f_head.trigger('click');
                  if (double) {
                    if (!$s_head.parent().hasClass('active')) {
                        $s_head.trigger('click');
                    }
                  }
              }   
              // $inst.find('.i_wrap').scrollTop($s_head.offset().top-$inst.find('.i_wrap').offset().top);

	},
	load_publish_stage:function(){
		var $lastpage = step_ed_q.view.wrap.find('.wrp[data-step-id="publish"]');
		var no_links = true;

		if(if_defined(step_ed_q.model.p_data.domain)){
			no_links = false;
			$lastpage.find('.domain').show().find('.link').html('http://'+step_ed_q.model.p_data.domain).attr('href', 'http://'+step_ed_q.model.p_data.domain);
		}else{
			$lastpage.find('.domain').hide()

		}

		if(if_defined(step_ed_q.model.p_data.dnk_domain)){
			no_links = false;
			var inn = step_ed_q.model.p_data.dnk_domain.replace('.atom.dnk.bz','').replace('.steps.one','');
			$lastpage.find('.inner_domain').show().find('.link').html('https://'+inn+'.'+m_lbl_id).attr('href', 'https://'+inn+'.'+m_lbl_id);
		}else{
			
			$lastpage.find('.inner_domain').hide()
		}		
		if(no_links){

			$lastpage.find('.inner').show().find('.link').html('https://client.dnk.bz/'+step_ed_q.model.p_data.id).attr('https://client.dnk.bz/'+step_ed_q.model.p_data.id);
		
		}else{

			$lastpage.find('.inner').hide()			

		}

        step_ed_q.view.wrap.find('.btn.glvrd').unbind('click');
        step_ed_q.view.wrap.find('.btn.glvrd').click(function(e) {
            e.preventDefault();
            if (window.glvrd) {

                step_ed_q.model.glvrd.clean_test();                
                step_ed_q.view.glvrd.wrap.addClass('opened');
            }
        });
	},

	glvrd:{
		wrap:false,
		show_desc:function(ind){
			var $o_wrp = this.wrap.find('.g_wrp');
			var frag = step_ed_q.model.glvrd.cur_res.fragments;
			$o_wrp.find('.g_name').html(frag[ind].hint.name);
			$o_wrp.find('.g_text').html(frag[ind].hint.description);
			$o_wrp.find('.g_status').hide();
			$o_wrp.find('.g_desc').show();

		},
		hide_desc:function(){
			var $o_wrp = this.wrap.find('.g_wrp');
			$o_wrp.find('.g_desc').hide();
			$o_wrp.find('.g_status').show();

		}
	}
}
