;

'use strict';

console.log('a_edit.events start');

a_edit.events = {
    recoursive_autosave_timer:false,
    rebind_static:function(){

    },
    autosave_handler:function(){

        var $this = $(this);
        $this.removeClass('focused');


        if ($this.val() != $this.attr('data-last-pushed')) {


            a_edit.model.save($this,true)


        }

    },
    focus_handler:function(){
        var $this = $(this);

        $this.addClass('focused');

        a_edit.events.recoursive_autosave_timer = setTimeout(function() {
            var $focus = a_edit.view.wrap.find('input.focused,textarea.focused');

            if ($focus.val() != $focus.attr('data-last-pushed')) {

                a_edit.model.save($this,true);

            }
            

            $focus.trigger('focus');


        }, 10000)
    },
    input_valid_helper:function(){
        if ($(this).is('[name="ya_text_h1"]')) {


            if ($(this).val().length>33) {
                $(this).addClass('error-input');
            }else{
                $(this).removeClass('error-input');

            }
        }else
        if ($(this).is('[name="ya_text_text"]')) {

            if ($(this).val().length>75) {
                $(this).addClass('error-input');
            }else{
                $(this).removeClass('error-input');

            }
        }        
    },
    rebind_autosave:function(){
        var $inputs = a_edit.view.wrap.find('input,textarea');

        $inputs.unbind('blur',a_edit.events.autosave_handler);
        $inputs.on('blur',a_edit.events.autosave_handler);

        $inputs.unbind('focus',a_edit.events.focus_handler);
        $inputs.on('focus',a_edit.events.focus_handler);
    },
	rebind_zapros:function(){

		var $delete = a_edit.view.wrap.find('.row-33').find('.remove_zapros');

        $delete.unbind('click');
        $delete.click(function(e) {

            e.stopPropagation();

            var $this = $(this);

            show_confirm('Удалить запрос?', function() {

                var zapros_id = parseInt($this.closest('.row-33').attr('data-id'));

                a_edit.model.ad.content.zapros.splice(zapros_id, 1);

                a_edit.view.reload_zapros();

                a_edit.controller.save();

            });
        });

	    a_edit.events.rebind_autosave();

	},
	rebind_logics:function(){

		var $wrap = a_edit.view.wrap;

		var $logic_btn = $wrap.find('.logic-link');

		$logic_btn.unbind('click');
        $logic_btn.click(function() {
            var id = $(this).attr('data-id');
            $wrap.find('.logic-link').removeClass('active');
            $wrap.find('.logic').hide();
            $wrap.find('.logic-link[data-id="' + id + '"]').addClass('active');
            $wrap.find('.logic[data-id="' + id + '"]').show();
            $wrap.find('#logic-wrap').attr('data-cur-active', id);
        });

        $logic_btn.find('.remove_logic').unbind('click');
        $logic_btn.find('.remove_logic').click(function(e) {

            e.stopPropagation();

            var $this = $(this)

            show_confirm('Удалить логику?', function() {

                var logic_id = parseInt($this.closest('.logic-link').attr('data-id')) - 1;

                a_edit.model.ad.content.logics.splice(logic_id, 1);

                a_edit.view.reload_logics();

                a_edit.controller.save(true);
            });
        });

        
	    $wrap.find('textarea[name="logic_right"]').unbind('keypress input change blur');

	    $wrap.find('textarea[name="logic_right"]').keypress(function(e) {
	        if (e.which === 32)
	            return false
	    });
	    $wrap.find('textarea[name="logic_right"]').on('change input blur', function() {
	        $(this).val($(this).val().replace(/ /g, ''));
	    });

        $wrap.find('.logic-link[data-id="' + $wrap.find('#logics-list').attr('data-cur-active') + '"]').trigger('click');

	    a_edit.events.rebind_autosave();

	},
    rebind: function() {

        var $wrap = a_edit.view.wrap;

        $wrap.find('#ya_text_h1').unbind('input', a_edit.events.input_valid_helper)
        $wrap.find('#ya_text_h1').bind('input', a_edit.events.input_valid_helper)


        $wrap.find('#ya_text_text').unbind('input', a_edit.events.input_valid_helper)
        $wrap.find('#ya_text_text').bind('input', a_edit.events.input_valid_helper)

        $wrap.find('#ya_add_zapros').unbind('click');
        $wrap.find('#ya_add_zapros').click(function() {

            a_edit.model.ad.content.zapros[a_edit.model.ad.content.zapros.length] = [''];
            a_edit.view.reload_zapros();
            a_edit.controller.save(true);

        });
        

        $wrap.find('.trig').unbind('click')
        $wrap.find('.trig').click(function() {
            var $this = $(this);

            if ($this.hasClass('active')) {

                a_edit.model.ad.content.logics=[];

            }else{
            
                a_edit.model.ad.content.logics=[{
                    left: [' '],
                    right: [' ']
                }, {
                    left: [' '],
                    right: [' ']
                }, {
                    left: [' '],
                    right: [' ']
                }];

            }
            a_edit.view.reload_logics();
            a_edit.controller.save(true);
        });

        $wrap.find('#ya_add_logics').unbind('click');
        $wrap.find('#ya_add_logics').click(function() {


            a_edit.model.ad.content.logics[a_edit.model.ad.content.logics.length] = {
                left: [''],
                right: ['']
            };

            a_edit.view.reload_logics();
            a_edit.controller.save(true);

        });


        $wrap.find('#ya_try_to_send').unbind('click');
        $wrap.find('#ya_try_to_send').click(function() {

            if (a_edit.model.validate_ad()) {

                a_edit.model.save(false,false,function(data){

// $.ajax({
//     url:data.url,
//     type:'HEAD',
//     error: function()
//     {
//                            ////alert('fail');
//         //file not exists
//     },
//     success: function()
//     {                    
                            //window.open(data.url, "_blank")
                            //window.downloadFile(data.url);
//     }
// });
// 
if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
    var link = document.createElement('a');
    link.href = data.url;
    //link.target = "_blank";
    if (link.download !== undefined) {
        link.download = data.url.substring(data.url.lastIndexOf('/') + 1, data.url.length);
    }
    if (document.createEvent) {
        var e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        link.dispatchEvent(e);
        return true;
    }
}else{

    window.open(data.url, "_blank")
}


//     var object = document.createElement("object");
//     object.setAttribute("data", data.url);
//     object.setAttribute("data", data.url);
//     document.getElementsByTagName("head")[0].appendChild(link);
//     link.onerror = function(){ callback(false); };
//     link.onload  = function(){ callback(true); };
                    // $.get(data.url)
                    //     .done(function() { 
                    //         window.downloadFile(data.url);
                    //     }).fail(function() { 
                    //     });


                });

            }

        });
        $wrap.find('.i-info').unbind('click');
        $wrap.find('.i-info').click(function(e) {
            e.preventDefault();
            open_from_url($(this).attr('href'),true);
        });



    }

}
