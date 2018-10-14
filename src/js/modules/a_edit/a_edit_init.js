;

'use strict';

console.log('a_edit.init start');

a_edit.init = function() {
    console.log('a_edit.init!!!!');

    a_edit.view.wrap = $('#fast-reklama');

    var id = getURLParameter('i');

    if (!id) {
    	open_part('404',true);
    }else{
    	if (id == 'new') {
            a_edit.model.reset_ad();
            a_edit.view.paste_ad_vals();
    	}else{
            if (if_defined(a_edit.model.ad) && if_defined(a_edit.model.ad.content) && if_defined(a_edit.model.ad.content.id) && a_edit.model.ad.content.id == id) {

                    a_edit.view.paste_ad_vals();
            }else{

                a_edit.controller.get_ad_data(id,function(){
                    a_edit.view.paste_ad_vals();
                });
            }
    	}
    }

    if(if_defined(user_tools)){

        user_tools.model.first_use.init();
    }

    run_module('ls_editors');          

    a_edit.events.rebind();
};
a_edit.init();
