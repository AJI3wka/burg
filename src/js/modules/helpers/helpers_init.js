;

'use strict';

console.log('helpers.init start');

helpers.init = function() {
    console.log('helpers.init!!!!');



	helpers.view.wrap = $('#experts_frame');

    var needed_src = source_url+'/html/parts/helper.html';
    
    if (global_build != false) {//если это test/prod версия 
        var rev = $('body').attr('data-revision');//получаем значение ревизии
        //то для закгрузки модуля нужен только 1н скрипт, с хвостом ревизии(скидывание кеша) 
        needed_src +='?v='+ rev;
    }
    
	helpers.view.wrap.load(needed_src, function() {//по загрузке каркаса

    	helpers.events.rebind();

        if (getURLParameter('f')=='e') {
            helpers.view.wrap.find('.h-wrap').attr('data-type','site_editor');
        }

        if ($('.modal-wrap').find('#experts_body').length>0) {
            $('#experts_body').arcticmodal({afterClose:function(){

                    if (!$('#experts_body').hasClass('force_close')) {

                        open_from_url($('body').attr('data-prew'),true);
                        $('#experts_body').removeClass('force_close');
                        ////alert('open');
                    }
                
            }});
        }else{
            if (document.location.pathname.indexOf('quiz/edit')>-1||document.location.pathname.indexOf('lp1/edit')>-1) {
                helpers.view.wrap.find('.h-wrap').attr('data-type','site_editor');
            }
        }
        
        dnk_atom_events({type:'event',category:'view',action:'expert',link: document.location.pathname});

    });

};
helpers.init();
