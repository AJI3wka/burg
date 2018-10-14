;

'use strict';

console.log('ls_editors.view start');


ls_editors.view = {
    lock_editor:function(){
        var $pop = $('#editor_is_using');
        var p = ls_editors.model.get_path_data();
        if (p.editor) {
            $pop.find('#edit_id').html(p.edit_id);
        }


        $pop.find('.continue-btn').unbind('click');

        $pop.find('.continue-btn').click(function(){
            document.location.reload();
        });


        $pop.find('.exit-btn').unbind('click');

        $pop.find('.exit-btn').click(function(){
            $pop.removeClass('opened');
            $('.view_edit_window').hide();
            $('#one_cropper,#glvrd_body').removeClass('opened');
            open_from_url(p.back_path,true);
        });


        $pop.addClass('opened');
    }
}
