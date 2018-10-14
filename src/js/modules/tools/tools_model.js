;

'use strict';

console.log('tools.model start');

var tools = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

tools.model = {
    check_url: function() {
        var path = document.location.pathname;
        //path = path.replace('/tools', '');
        if (path == '/sites') {
            console.log('check_url /tools path = ', path)
            tools.view.show_sites_panel();
        } else if(path == '/partnership') {

            tools.view.show_partner_panel();
        } else if(path == '/partnership/conditions') {

            tools.view.show_partner_cond_panel();
        } else {
            tools.view.show_main_panel();
        }

        if (if_defined(getURLParameter('confirmEmailHash')) || if_defined(getURLParameter('promocode'))  ) {

            history.replaceState('', document.title, document.location.pathname);

        }
        
    },
    check_trial: function() {
        if (if_defined(global_user_data)) {

            if (if_defined(global_user_data)&&if_defined(global_user_data.trial)) {

                tools.view.wrap.find('#trial_warning').show();


            } else {
                if (if_defined(global_user_data)&&global_user_data.trial == false) {

                    var has_days = global_user_data.leftSubscribeTime / 60 / 60 / 24;

                    if (has_days <= 7 && has_days > 0) {

                        var day_part = ' дней';

                        if (has_days == 1) {
                            day_part = ' день';
                        }

                        if (has_days == 2 || has_days == 3 || has_days == 4) {
                            day_part = ' дня';
                        }

                        tools.view.wrap.find('#time_to_ban').html(has_days + day_part);

                        tools.view.wrap.find('#activation_ending').show();

                    } else if (has_days <= 0) {

                        tools.view.wrap.find('#activation_ended').show();

                    }

                }
            }

            if (global_user_data.firstDaysDiscount == true) {

                tools.view.wrap.find('#action_message').show();
            }

        }

    }
};