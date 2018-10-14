;

'use strict';

console.log('step_faq.view start');


step_faq.view = {
	preform_html:function(){
		step_faq.model.faq = {};

		step_faq.view.wrap.find('.faq').each(function() {
			
			var id = $(this).attr('data-fid');
			if(if_defined(id)&& id !='test1'&& id !='all_faq'){

				step_faq.model.faq[id] = {
						video:'none',
						text:'none',
						ex:'none'
					};

				if($(this).hasClass('full-wrap-video')){
					$(this).find('.i-close-a').remove();
					
					step_faq.model.faq[id].video = $(this).html();
				}else if($(this).find('.vklad-wrap').length == 0){
					$(this).find('.i-close-a').remove();
					if($(this).find('.collapsible').length>0){


							step_faq.model.faq[id].double = true;
					}

					step_faq.model.faq[id].text = $(this).html();					



				}else{

					$(this).find('.vklad-wrap').find('.vklad').each(function(){

						var type = $(this).attr('data-vklad');
						if($(this).find('.collapsible').length>0){


								step_faq.model.faq[id].double = true;
						}
						if(if_defined(type)){

							if(type == 'video'){

								step_faq.model.faq[id].video =$(this).html();
							}else if(type == 'inst'){

								step_faq.model.faq[id].text =$(this).html();
							}else if(type == 'list'){

								step_faq.model.faq[id].ex =$(this).html();								
							}


						}

					});
				}

			}

		});
		step_faq.view.wrap.html('');
		
	}

}
