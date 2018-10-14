;

'use strict';

console.log('partner.model start');

var partner = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
};

partner.model = {
    init_partner_table: function() {
        var d = new Date();
        var loc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());
        
        console.log('LOC = ', loc / 1000, '|', new Date().getTime() / 1000, '|', d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), '|', new Date());
        var now = Math.round(loc / 1000); // берем дату на момент получения данных
        var start = Math.round((loc - 24 * 60 * 60 * 1000 * 7) / 1000); // берем дату на 7 дней раньше за момент получения данных

        this.get_partner_info();
        this.get_partner_stat(start, now); // получаем данные за последние 7 дней

    },
    get_partner_info: function() {


        partner.controller.get_partner_info(function(response) { // делаем запрос, и при удачном ответе
            global_user_data.partner_info = response;
            console.log('get_partner_info = ', response);
            partner.view.render_partner_info(response);

        });
    },
    open_balance_pop: function() {


        partner.controller.get_balance_operations(function(response) { // делаем з
            console.log('get_balance_operations = ', response);
            partner.view.open_balance_pop(response);

        });
    },
    try_to_out: function() {


        var $partner_balance_tab = $('#partner_balance_tab'); // сохраняем враппер поп-апа виплат
        var $partner_requesits = $('#partner_requesits'); // сохраняем враппер поп-апа реквизитов

        $partner_balance_tab.find('.out_inp').removeClass('error-input'); // убираем класс ошыбки из инпута суммы

        var want = parseInt($partner_balance_tab.find('.out_inp').val()); // сохраняем запрашываемую суммы
        var can = parseInt($partner_balance_tab.find('.how_have .text').text()); // сохраняем сумму, которая есть и которую возможно выплатить

        var system = $partner_requesits.find('.selectbox .value').text(); // берем с реквизитов значение платежной системы
        var pay_text = $partner_requesits.find('textarea').val(); // берем с реквизитов значение реквизитов счета

        if (want > 0 && pay_text.length > 4 && system !== 'Выберите из списка') { // если все нужные данные есть, то 

            if (want > can) { // если сумма желаемой выплаты больше чем сумма возможной выплаты, то

                show_alert_mess('Введенная вами сумма больше доступной'); // выводим уведомление

            } else { // если все как надо, то отправляем запрос на выплату



                var data = { // параметры запроса
                    get: want, // запрашываемая сумма выплаты
                    ps: system, // значение платежной системы
                    requisites: pay_text // значение реквизитов счета
                        // , isTest: true
                };

                partner.controller.pay_request(data, function() { // отправляем запрос и при удачной отправке

                    $partner_balance_tab.find('.out_inp').val(''); // удаляем значение суммы из инпута

                    $('#partner_balance_tab').arcticmodal('close');
                    partner.model.init_partner_table();

                    show_info_pop('Запрос на выплату отправлен администратору'); // выводим уведомление


                });

            }

        } else if (!(want > 0)) { // если не введена сумма или она ровна 0, то

            show_alert_mess('Введите сумму выплаты'); // выводим уведомление
            $partner_balance_tab.find('.out_inp').addClass('error-input'); // накидываем класс ошыбки на инпут суммы

        } else { // в ином случае не заполненны данные о реквизитах, тогда

            show_alert_mess('Введите реквезиты счета'); // выводим уведомление

        }
    },
    save_requsits: function() {;
        var $partner_requesits = $('#partner_requesits'); // сохраняем враппер поп-апа реквизитов
        var $selectbox = $partner_requesits.find('.selectbox'); // сохраняем враппер селектбокса платежной системы
        var $textarea = $partner_requesits.find('textarea'); // сохраняем textarea реквизитов счета

        $selectbox.removeClass('error-input'); // убираем класс ошыбки из селектбокса
        $textarea.removeClass('error-input'); // убираем класс ошыбки из textarea

        var system = $selectbox.find('.value').text(); // берем с реквизитов значение платежной системы
        var pay_text = $textarea.val(); // берем с реквизитов значение реквизитов счета

        if (pay_text.length > 4 && system !== 'Выберите из списка') { // если реквизиты заполненны

            partner.controller.save_reqesits({ // параметры запроса
                ps: system, // значение платежной системы
                requisites: pay_text // значение реквизитов счета
            }, function(response) {


                console.log('save_reqesits response = ', response); // выводим в консоль ответ
                $partner_requesits.arcticmodal('close'); // скрываем поп-ап

                show_info_pop('Реквезиты сохранены'); // выводим уведомление
            })



        } else { // если реквизиты не заполненны

            $partner_requesits.arcticmodal('close'); // скрываем поп-ап
            if (system === 'Выберите из списка') { // если не выбранная платежная система

                show_alert_mess('Выберите платежную систему'); // выводим уведомление
                $selectbox.addClass('error-input'); // накидываем класс ошыбки на враппер селектбокса платежной системы

            }

            if (pay_text.length <= 4) { // если не заполненно значение реквизитов счета

                show_alert_mess('Введите реквезиты счета'); // выводим уведомление
                $textarea.addClass('error-input'); // накидываем класс ошыбки на textarea

            }
        }
    },
    open_referals:function(){
    	partner.controller.get_users(function(data){
    		partner.view.open_referals(data);
    	})
    },
    get_partner_stat: function(start, end) {


        console.log(start, '|', end); // вывод в консоль периода времени

        partner.controller.get_partner_stat(start, end, function(response) { // делаем запрос, и при удачном ответе

            console.log('get_partner_stat = ', response);
            partner.view.render_partner_stat(response, start, end);

        });
    }
};