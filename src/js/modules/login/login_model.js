;

'use strict';

console.log('login.model start');

var login = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

login.model = {

    check_restore_or_reg: function() {
        if (document.location.pathname == '/login') {
            var data = {
                hash: getURLParameter('confirmRestoreHash'),
                restore: getURLParameter('confirmRestore')
            }
            if (if_defined(data.restore) && if_defined(data.hash)) {
                login.view.open_restore(data);
            }

            var cur_val = getURLParameter('confirmEmail');
            var n_val = '';
            try {
                n_val = punycode.ToASCII(cur_val.split('@')[0]) + '@' + punycode.ToASCII(cur_val.split('@')[1]);
            } catch (e) {
                n_val = cur_val;
            }


            data = {
                code: getURLParameter('confirmEmailHash'),
                email: n_val
            };


            if (if_defined(data.email) && if_defined(data.code)) {

                history.pushState('', document.title, '/login'); //сбросить строку урл в браузере

                if (data.email == 'true') {

                    get_user_info(function() {

                        dnk_atom_events({
                            type: 'event',
                            category: 'registration',
                            action: 'new',
                            link: global_user_data.email + ' / ' + global_user_data.discount + ' / ' + global_user_data.id
                        });

                    });

                } else {
                    show_alert_mess('Подтверждение не удалось. Попоробуйте зарегистрироватся еще раз');
                }

            }
        }
    },

    login: function($wrap, callback_false) {

        console.log('login() - start');

        validate.wrap($wrap, function() { //валидация области формы логина

            var cur_val = $wrap.find('input[name="email"]').val();

            var n_val = '';
            var cyrillicPattern = /[\u0400-\u04FF]/;
            var parts = cur_val.split('@');

            if (cyrillicPattern.test(parts[0])) {
                n_val += punycode.ToASCII(parts[0]);
            } else {
                n_val += parts[0];

            }
            n_val += '@';

            if (cyrillicPattern.test(parts[1])) {
                n_val += punycode.ToASCII(parts[1]);
            } else {
                n_val += parts[1];

            }

            //var n_val = punycode.ToASCII(cur_val.split('@')[0]) + '@' + punycode.ToASCII(cur_val.split('@')[1])


            var send_data = {
                email: n_val,
                password: $wrap.find('input[name="pass"]').val()
            };

            login.controller.login(send_data, function(data) { //запрос авторизации

                //set_user_token(data.response.userKey);

                get_user_info(function(data) {

                    close_modal_from($wrap);

                });

            }, callback_false);
        });

    }
};