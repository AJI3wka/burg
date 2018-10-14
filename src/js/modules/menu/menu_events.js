;

'use strict';

console.log('menu.events start');

menu.events = {
	menu_a_hover_timeout:false,
	menu_btn_timeout:false,

	parent_mover:function(event) {
        console.log('mouseover start')
        var _this = this;
        var $wrap = menu.view.m_wrap;
        menu.events.menu_a_hover_timeout = setTimeout(function() {
            console.log('mouseover fin',$(_this).attr('data-gid'))
            $wrap.find(".menu_a").removeClass('active');
            $(_this).addClass('active');
           	$wrap.find('.group').hide();
            $wrap.find('.group[data-gid="' + $(_this).attr('data-gid') + '"]').show();
        }, 100);

    },
    parent_click:function(event) {

        var _this = this;
        var $wrap = menu.view.m_wrap;
        $wrap.find('.menu_a').removeClass('active');
        $(_this).addClass('active');
        $wrap.find('.group').hide();
        $wrap.find('.group[data-gid="' + $(_this).attr('data-gid') + '"]').show();


    },
    parent_mleave:function(event) {
        clearTimeout(menu.events.menu_a_hover_timeout);
    },

	btn_mover:function() {

        menu.events.menu_btn_timeout = setTimeout(function() {

            menu.view.m_wrap.find('.menu_block.menu').removeClass('closed');
        }, 500);

    },
    btn_click:function() {

        menu.view.m_wrap.find('.menu_block.menu').removeClass('closed');


    },
    btn_mleave:function() {
        clearTimeout(menu.events.menu_btn_timeout);

    },
    menu_close_handler:function(e) {
	    e.stopPropagation()
	    menu.view.m_wrap.find('.menu_block.menu').addClass('closed');
	    //remove_current_step_video();
	},
	active_click:function(e){
	    e.preventDefault();
	    console.log('menu.active_click')
	    menu.events.menu_close_handler(e);
	    var href = $(this).attr('href');
        open_from_url(href,true);
	},
    rebind: function() {
    	var $wrap = menu.view.m_wrap;
    	$wrap.find(".menu_a,.menu_op").click(function(e) {
	        e.preventDefault();

	    });

        
        !function init_limits() {
            var limits = global_user_data.limits;

            if (limits['3Page'].used>0) {
                menu.view.m_wrap.find('a.menu_op[href="/lp3"]').removeClass('gray').removeClass('disactive').addClass('abled');
            }
            if (limits['Preland'].used>0) {
            
                menu.view.m_wrap.find('a.menu_op[href="/preland"]').removeClass('gray').removeClass('disactive').addClass('abled');
            }
        }();


    	
    	var $parent_items = $wrap.find(".menu_a");

	    $parent_items.unbind('mouseover',menu.events.parent_mover);
	    $parent_items.mouseover(menu.events.parent_mover);

	    $parent_items.unbind('click',menu.events.parent_mover);
	    $parent_items.click(menu.events.parent_click);

	    $parent_items.unbind('mouseleave',menu.events.parent_mover);
	    $parent_items.mouseleave(menu.events.parent_mleave);

    	var $btn = $wrap.find(".menu_btn");
	    //$('.menu_btn').uitooltip({disabled:true});
	    $btn.unbind('mouseover',menu.events.btn_mover);
	    $btn.mouseover(menu.events.btn_mover);

	    $btn.unbind('click',menu.events.btn_mover);
	    $btn.click(menu.events.btn_click);

	    $btn.unbind('mouseleave',menu.events.btn_mover);
	    $btn.mouseleave(menu.events.btn_mleave);
	    //$btn.uitooltip("destroy");
	    $btn.uitooltip();

        $wrap.find('.help_link').unbind('click');
        $wrap.find('.help_link').click(function(e) {

            e.preventDefault();
            // if (global_build != false) {
                
            support_chat.expand();
            // }else{
            //    ////alert('its_localhost')
            // }
            //$('.chaport-launcher-operator-photo').click();
        });

	    $wrap.find('.o,.close').unbind('click', menu.events.menu_close_handler);
	    $wrap.find('.o,.close').bind('click', menu.events.menu_close_handler);
		
		$wrap.find('.abled').unbind('click', menu.events.active_click);
		$wrap.find('.abled').bind('click', menu.events.active_click);


    }

}
