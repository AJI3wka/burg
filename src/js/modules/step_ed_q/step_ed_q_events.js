;

'use strict';

console.log('step_ed_q.events start');

step_ed_q.events = {


    rebind: function() {
		
		M.AutoInit();

  		step_ed_q.view.wrap.find('input,textarea').characterCounter();    	
  		step_ed_q.view.wrap.find('.instruction').find('.toggle').unbind('click');
		step_ed_q.view.wrap.find('.instruction').find('.toggle').on('click',function(){
			$(this).closest('.instruction').toggleClass('closed');
		});
      step_ed_q.view.wrap.find('.instruction_overlay').unbind('click');
    step_ed_q.view.wrap.find('.instruction_overlay').on('click',function(){
      step_ed_q.view.wrap.find('.instruction').toggleClass('closed');
    });


        step_ed_q.view.wrap.find('#preview-site').unbind('click').click(function(e){
            e.preventDefault();
            var href = $(this).attr('href');
            if(if_defined(href)){
                step_ed_q.view.wrap.find('#preview-site-frame').show();
                step_ed_q.view.wrap.find('#preview-site-frame').find('.iframe-wrap').append('<iframe src="'+href+'"></iframe>');
            }




        });
        step_ed_q.view.wrap.find('#exit-site-prewiew').unbind('click').click(function(e){
            e.preventDefault();
            var $wrap = $('#preview-site-frame');
                $wrap.hide();
                $wrap.find('.iframe-wrap').find('iframe').remove();




        });

    },

    rebind_step:function(step){

      var st = step_ed_q.model.s_model[step];
      var $step_wrap = step_ed_q.view.wrap.find('.m_m_wrap').find(st.selector);

  		step_ed_q.view.wrap.find('.navigation').find('.next').unbind('click');
  		step_ed_q.view.wrap.find('.navigation').find('.next').bind('click',function(){
  			var st = step_ed_q.model.s_model[step];
  			if (st.type=='step') {
          if (st.num==39) {
            open_from_url('/experts?f=e',true);
            return false;
          }
          $step_wrap.find('.m_valid').removeClass('error-input error-empty');
  				validate.wrap($step_wrap,function(){

					step_ed_q.view.actual_list(step+1);
		  			step_ed_q.model.run_step(step+1);
  				});

  			}else{
					
				step_ed_q.view.actual_list(step+1);
	  			step_ed_q.model.run_step(step+1);

  			}

  		});

  		step_ed_q.view.wrap.find('.navigation').find('.prew').unbind('click');
  		step_ed_q.view.wrap.find('.navigation').find('.prew').bind('click',function(){
  			step_ed_q.model.run_step(step-1);
  		});


  		if (st.type=="full_window") {

  		}else{

  			var valid_h = function(){
  				validate.input($(this));
  			}
  			$inputs = $step_wrap.find('.m_valid');
  			
  			$inputs.unbind('keydown',valid_h);
  			$inputs.bind('keydown',valid_h);

  			$inputs.unbind('blur');
  			$inputs.on('blur',function(){
          validate.input($(this));
  				if (!$(this).hasClass('error-input')) {
  					if ($(this).val() != $(this).attr('data-last')) {
  						step_ed_q.model.update_from_input($(this));
  					}
  				}
  			});
        $step_wrap.find('.btn.get_domain').unbind('click');
        $step_wrap.find('.btn.get_domain').on('click',function(){
          open_from_url('/get_domain',true);
        })
        $step_wrap.find('.switch').find('label').unbind('click');
        $step_wrap.find('.switch').find('label').on('click',function(){

          if ($(this).closest('.input-field').is('.locked')) {

            show_info_pop('Эта функция станет доступна сразу после активации аккаунта по одному из <a href="/tariffs" onclick="open_from_url(\'/tariffs\');return false;">тарифов</a>.','Активируйте аккаунт');

            return false;
          }
          
          var $trg_wrp = $(this).closest('.switch').next('.trig-wrap');

          if ($(this).closest('.input-field').is('.color_theme_inp')) {

            if ($(this).find('input[type="checkbox"]').is(':checked')) {
              $(this).closest('.input-field').find('.m_valid').val('light').trigger('blur');
            }else{
              $(this).closest('.input-field').find('.m_valid').val('dark').trigger('blur');
            }


          }else{

            if ($(this).find('input[type="checkbox"]').is(':checked')) {
              if ($trg_wrp.is('.input-trig')) {

                $trg_wrp.css('display','block');
              }else{
                $trg_wrp.css('display','inline-block');
                
              }
              var $tar_inp = $trg_wrp.closest('.input-field').find('.m_valid').first();
              if ($(this).closest('.switch').next('input').is('#metrics_visor')) {

                $(this).closest('.switch').next('input').val('1').trigger('blur');

              }else if($tar_inp.is('#og_title')){
                $trg_wrp.find('.m_valid').val('').trigger('blur');
              }else if($tar_inp.is('#vcard_category')){
                $trg_wrp.find('.m_valid').val('').trigger('blur');
              }else if($tar_inp.is('#meta_description')){
                $trg_wrp.find('.m_valid').val('').trigger('blur');
              }else{
                $tar_inp.val('');
              }

            }else{

              var $tar_inp = $trg_wrp.closest('.input-field').find('.m_valid').first();
             if ($(this).closest('.switch').next('input').is('#metrics_visor')) {

                $(this).closest('.switch').next('input').val('0').trigger('blur');

              }else if($tar_inp.is('#domain')){
                $tar_inp.val('').trigger('blur');
              }else if($tar_inp.is('#og_title')){
                $trg_wrp.find('.m_valid').val('0').trigger('blur');
              }else if($tar_inp.is('#vcard_category')){
                $trg_wrp.find('.m_valid').val('0').trigger('blur');
              }else if($tar_inp.is('#meta_description')){
                $trg_wrp.find('.m_valid').val('0').trigger('blur');
              }else{

                $tar_inp.val('0').trigger('blur');
              }
              $trg_wrp.hide();
            }
          }
        });

        $step_wrap.find('.upload_input').unbind('change');

        $step_wrap.find('.upload_input').bind('change',function(e){
          console.log('FILE_INPUT_EVENT - start');
          e.preventDefault();
          var $label = $(this).closest('.trig-wrap').find('label');

          var type = $(this).attr('data-load-type');
          if (type == 'social'
           || type == 'quiz_form_g_img'
            || type == 'quiz_form_bg'
            || type == 'quiz_logo'
            || type == 'quiz_person_img'
            || type == 'bg') {
            $label = $(this).closest('.file_inp').find('label');
          }
          console.log('FILE_INPUT_EVENT - step_ed_q.controller.upload_img - request');
          
          step_ed_q.controller.upload_img(this, type, function(data) {
              console.log('FILE_INPUT_EVENT - step_ed_q.controller.upload_img - response',data);

              if (type=='logo') {

                var logo = data.data.img_url;

                $step_wrap.find('#q_logo').val(logo).trigger('blur');

              }else

              if (type=='bg') {

                var bg = data.data.img_url;
                var bg_m = data.data.img_min_url;

                if(!bg_m){
                    bg_m = bg;
                }
                $step_wrap.find('#q_s1bg_d').val(bg).trigger('blur');
                $step_wrap.find('#q_s1bg_m').val(bg_m).trigger('blur');

              }else

              if (type=='download') {


                $step_wrap.find('#aftersend_file').val(data.data.img_url).trigger('blur');

              }else

              if (type=='favicon') {


                $step_wrap.find('#favicon_img').val(data.data.img_url).trigger('blur');

              }else

              if (type=='social') {


                $step_wrap.find('#og_img').val(data.data.img_url).trigger('blur');

              }
              console.log('FILE_INPUT_EVENT - input set value & blur');


              var old_text = $label.html();

              $label.html('Файл загружен').addClass('green');

              console.log('FILE_INPUT_EVENT - change text on button');
              setTimeout(function() {

                  $label.html(old_text).removeClass('green');

                  console.log('FILE_INPUT_EVENT - reset text on button');

              }, 4000);

          })
        });

        $step_wrap.find('.c-item').unbind('click');
        $step_wrap.find('.c-item').bind('click',function(){
          var $list = $(this).closest('.color-list');
          $list.find('.c-item').removeClass('active');
          $(this).addClass('active');

          $list.find('input').val($(this).attr('data-val')).trigger('blur');



        });

        $step_wrap.find('.range_slider').slider({
            animate: "fast",
            value: $step_wrap.find('#q_bg_sh').val()*100,

            create: function( event, ui ) {

                $step_wrap.find('.range_slider').find('.range_line').css('width', $step_wrap.find('#q_bg_sh').val()*100 + '%');
            },
            slide: function(event, ui) {
                console.log(ui.value);
                $(ui.handle).parent('.range_slider').find('.range_line').css('width', ui.value + '%');
                $step_wrap.find('#q_bg_sh').val(ui.value / 100);
            },
            stop: function() {
                $step_wrap.find('#q_bg_sh').trigger('blur');
            }
        });

        $step_wrap.find('.info-help').unbind('click')
        $step_wrap.find('.info-help').click(function(){

            //step_faq.model.open_faq($(this).attr('data-helper'));
            var target = $(this).attr('data-target');
            step_ed_q.view.toggle_tar_inst(target);         
        });


        $step_wrap.find('input.cropper').unbind('change')
        $step_wrap.find('input.cropper').on('change',function () {
            
            var _this = this;

            var type = $(this).attr('data-load-type');

            $label = $(this).closest('.file_inp').find('label');
            var options = {

                    min:[400,100],
                    aspects:[],
                    free:true,
                    valid_types:["image/png", "image/jpeg","image/pjpeg"],
                    padding:true,
                    out:{
                        
                      width: 300,
                      height: 80,
                      minWidth: 300,
                      minHeight:80,
                      img_type:'png'
                    }
                }

            if (type == 'quiz_person_img') {
                options = {

                  min:[80,80],
                  aspects:[
                      [1,1]
                  ],
                  default:[1,1],
                  free:false,
                  valid_types:["image/png", "image/jpeg","image/pjpeg"],
                  out:{

                    width: 80,
                    height: 80,
                    minWidth: 80,
                    minHeight: 80,
                    img_type:'jpg'
                  }
              }
            }else if(type=="quiz_logo"){
              options = {

                    min:[400,100],
                    aspects:[],
                    free:true,
                    valid_types:["image/png", "image/jpeg","image/pjpeg"],
                    padding:true,
                    out:{
                        
                      width: 300,
                      height: 80,
                      minWidth: 300,
                      minHeight:80,
                      img_type:'png'
                    }
                }
            }else if(type=="quiz_form_bg"){
                options = {

                    min:[624,600],
                    aspects:[[52,50]],
                    default:[52,50],
                    free:false,
                    valid_types:["image/png", "image/jpeg","image/pjpeg"],
                    out:{
                        
                      width: 624,
                      height: 600,
                      minWidth: 624,
                      minHeight:600,
                      img_type:'jpg'
                    }
                }
            }else if(type == "quiz_form_g_img"){

                options = {

                    min:[144,120],
                    aspects:[[12,10]],
                    default:[12,10],
                    free:false,
                    padding:true,
                    valid_types:["image/png", "image/jpeg","image/pjpeg"],
                    out:{
                        
                      width: 120,
                      height: 100,
                      minWidth: 120,
                      minHeight:100,
                      img_type:'png'
                    }
                }

            }

            // var $node = $(_this).closest('.atomq_editable');
            // //var type = $(this).attr('data-upload-type');
            // var type = $node.attr('data-up-type');

            // if (type=='q_man') {
            //     options = {

            //         min:[120,120],
            //         aspects:[
            //             [1,1]
            //         ],
            //         default:[1,1],
            //         free:false,
            //         valid_types:["image/png", "image/jpeg","image/pjpeg"],
            //         out:{
                        
            //           width: 80,
            //           height: 80,
            //           minWidth: 80,
            //           minHeight: 80,
            //           img_type:'jpg'
            //         }
            //     }
            // }else if(type=='q_logo') {
            //     options = {

            //         min:[400,100],
            //         aspects:[],
            //         free:true,
            //         valid_types:["image/png", "image/jpeg","image/pjpeg"],
            //         padding:true,
            //         out:{
                        
            //           width: 300,
            //           height: 80,
            //           minWidth: 300,
            //           minHeight:80,
            //           img_type:'png'
            //         }
            //     }
            // }else if(type=='q_fbg') {
            //     options = {

            //         min:[624,600],
            //         aspects:[[52,50]],
            //         default:[52,50],
            //         free:false,
            //         valid_types:["image/png", "image/jpeg","image/pjpeg"],
            //         out:{
                        
            //           width: 624,
            //           height: 600,
            //           minWidth: 624,
            //           minHeight:600,
            //           img_type:'jpg'
            //         }
            //     }
            // }else if(type=='q_gift') {
            //     options = {

            //         min:[144,120],
            //         aspects:[[12,10]],
            //         default:[12,10],
            //         free:false,
            //         padding:true,
            //         valid_types:["image/png", "image/jpeg","image/pjpeg"],
            //         out:{
                        
            //           width: 120,
            //           height: 100,
            //           minWidth: 120,
            //           minHeight:100,
            //           img_type:'png'
            //         }
            //     }
            // }else if(type=='q_ans_2') {
            //     options = {

            //         min:[500,500],
            //         aspects:[[1,1],[32,12]],
            //         aspectsNames:['Квадратное','Горизонтальное'],
            //         default:[1,1],
            //         free:false,
            //         valid_types:["image/png", "image/jpeg","image/pjpeg"],
            //         out:{
                        
            //           width: 500,
            //           height: 200,
            //           minWidth: 500,
            //           minHeight: 200,
            //           img_type:'jpg'
            //         }
            //     }
            // }else if(type=='q_ans_3') {
            //     options = {

            //         min:[500,500],
            //         aspects:[[188,120],[1,1],[188,293]],
            //         aspectsNames:['Горизонтальное','Квадратное','Вертикальное'],
            //         default:[1,1],
            //         free:false,
            //         valid_types:["image/png", "image/jpeg","image/pjpeg"],
            //         out:{
                        
            //           width: 500,
            //           height: 200,
            //           minWidth: 500,
            //           minHeight: 200,
            //           img_type:'jpg'
            //         }
            //     }
            // }

            one_crope(_this,options,function(elem,options) {
                
                // var $label = $node.find('label');

                // var node_type;

                // for (var i = quiz_editor.model.qe_selectors.length - 1; i >= 0; i--) {
                //     if ($node.is(quiz_editor.model.qe_selectors[i].selector)) {
                //         node_type = quiz_editor.model.qe_selectors[i].type;
                //     }

                // }

                quiz_editor.controller.send_crop(options,elem,function(data){

                    // if (node_type == 'img_in') {

                    //     $node.find('img').attr('src', data.data.img_url);
                    // } else {
                    //     $node.css({
                    //         'background-image': 'url(' + data.data.img_url + ')'
                    //     });

                    // }

                    // quiz_editor.model.qe_update($node);



                    $('#one_cropper').removeClass('opened');
                    global_one_cropper.destroy();
                    removeURLparameter('cropper');

                    if (type == 'quiz_person_img') {
                      $step_wrap.find('#quiz_person_img').val(data.data.img_url).trigger('blur');
                    }else if(type=="quiz_logo"){

                      $step_wrap.find('#quiz_logo').val(data.data.img_url).trigger('blur');
                  
              
                    }else if(type=="quiz_form_bg"){
                      $step_wrap.find('#quiz_form_bg').val(data.data.img_url).trigger('blur');
                
                    }else if(type == "quiz_form_g_img"){
                      
                      $step_wrap.find('#quiz_form_g_img').val(data.data.img_url).trigger('blur');

                    }

                    var old_text = $label.html();

                    $label.html('Файл загружен').addClass('green');

                    console.log('FILE_INPUT_EVENT - change text on button');
                    setTimeout(function() {

                        $label.html(old_text).removeClass('green');

                        console.log('FILE_INPUT_EVENT - reset text on button');

                    }, 4000);

                    //$('#one_cropper').find('.close').trigger('click')

                })
                $(_this).val('');

            });

        });
  		

  		}




    },

    glvrd:{
        focus_h:function(){
            var val = $(this).val()
            if (val.length>5) {
                glvrd.proofread(val, function(result){
                    console.log('GLVRD result = ',result)
                });

            }

        },
        blur_h:function(e){
            step_ed_q.model.glvrd.update_from_el($(this));
            


        },
        i_focus_h:function(e){
            step_ed_q.events.glvrd.make_focused(this,true);
        },
        i_blur_h:function(e){
            //e.preventDefault();
            //e.stopPropagation();

            if (step_ed_q.events.glvrd.i_key_timeout) {
                 clearTimeout(step_ed_q.events.glvrd.i_key_timeout)
            }
            step_ed_q.view.glvrd.wrap.find('#c_edit_f').removeClass('g_focused').removeAttr('id');
            var $elem = $(this);
            // setTimeout(function(){

                step_ed_q.model.glvrd.update_real_val($elem);   
            // },2000);         
        },
        i_key_time:3000,
        i_key_timeout:false,
        make_focused:function(_this,focus){

            // if (focus) {

            //     $(_this).trigger('keydown');
            // }

            if (step_ed_q.events.glvrd.i_key_timeout) {
                clearTimeout(step_ed_q.events.glvrd.i_key_timeout)
            }
            step_ed_q.view.glvrd.wrap.find('#c_edit_f').removeClass('g_focused').removeAttr('id');

            function getCharacterOffsetWithin(range, node) {
                var treeWalker = document.createTreeWalker(
                    node,
                    NodeFilter.SHOW_TEXT,
                    function(node) {
                        var nodeRange = document.createRange();
                        nodeRange.selectNode(node);
                        return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
                            NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                    },
                    false
                );

                var charCount = 0;
                while (treeWalker.nextNode()) {
                    charCount += treeWalker.currentNode.length;
                }
                if (range.startContainer.nodeType == 3) {
                    charCount += range.startOffset;
                }
                return charCount;
            }


            var $inp = $(_this);

            function isChildOf(node, parentId) {
                while (node !== null) {
                    if (node.id === parentId) {
                        return true;
                    }
                    node = node.parentNode;
                }

                return false;
            };

            function getCurrentCursorPosition(parentId) {
                var selection = window.getSelection(),
                    charCount = -1,
                    node;

                if (selection.focusNode) {
                    if (isChildOf(selection.focusNode, parentId)) {
                        node = selection.focusNode; 
                        charCount = selection.focusOffset;

                        while (node) {
                            if (node.id === parentId) {
                                break;
                            }

                            if (node.previousSibling) {
                                node = node.previousSibling;
                                charCount += node.textContent.length;
                            } else {
                                 node = node.parentNode;
                                 if (node === null) {
                                     break
                                 }
                            }
                       }
                  }
               }

                return charCount;
            };

            // var el = $inp[0];
            // var range = window.getSelection().getRangeAt(0);
            // //console.log("Caret char pos: " + getCharacterOffsetWithin(range, el))
            // $inp.attr('data-selection',getCharacterOffsetWithin(range,el));
            // 
            $inp.attr('id','c_edit_f')
            $inp.addClass('g_focused')
            $inp.attr('data-selection',getCurrentCursorPosition('c_edit_f'));            
        },
        i_keydown_h:function(e){

            if (e.which == 13) {
            
                if ($(this).attr('data-key') == 'pre_form_offer' && document.location.pathname.indexOf('quiz')>=-1) {

                }else{

                    e.preventDefault();
                    e.stopPropagation();            
                
                }
            }
            
            step_ed_q.events.glvrd.make_focused(this);

            if (step_ed_q.events.glvrd.i_key_timeout) {
                clearTimeout(step_ed_q.events.glvrd.i_key_timeout)
            }
            var $inp = $(this);
            step_ed_q.events.glvrd.i_key_timeout = setTimeout(function(){
                step_ed_q.model.glvrd.update_real_val($inp);

            },3000);

        },
        rebind_inputs:function(){
            var $inps = step_ed_q.view.glvrd.wrap.find('.g_textarea,.g_input');
            var $frg = $inps.find('.fragment');

            $frg.unbind('mouseenter mouseleave');
            $frg.hover(function() {
                step_ed_q.view.glvrd.show_desc($(this).attr('data-ind'));
            }, function() {
                step_ed_q.view.glvrd.hide_desc();
            
            });
            
            $inps.unbind('blur');
            $inps.blur(this.i_blur_h);

            $inps.unbind('focus');
            $inps.focus(this.i_focus_h);            

            $inps.unbind('keydown');
            $inps.keydown(this.i_keydown_h);            

        },
        rebind:function(){
            // step_ed_q.model.glvrd.full_data = {
            //     descriptor:'',
            //     offer_h2:'',
            //     offer_h1:'',
            //     pre_form_offer:''
            // };
            // var $inps = step_ed_q.view.wrap.find('input.valid,textarea.valid');

            step_ed_q.view.glvrd.wrap.find('.close').unbind('click');
            step_ed_q.view.glvrd.wrap.find('.close').click(function(e){

                step_ed_q.view.glvrd.wrap.removeClass('opened');

            });

            // $inps.unbind('focus',this.focus_h);
            // $inps.on('focus',this.focus_h);

            // $inps.unbind('blur',this.blur_h);
            // $inps.on('blur',this.blur_h);
        }
    },

}
