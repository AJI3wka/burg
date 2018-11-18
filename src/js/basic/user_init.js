;
'use strict';

//логируем включение скрипта
console.log('user_init start');

//глобальные переменные для хранения данных пользователя
var global_user_auth = false;
var global_user_token = false;
var global_front_version = false;
var global_price_data = false;
var global_delivery_price = false;//50;
var global_delivery_min_cart = false;//250;
var global_max_cache = false;//1000;
var global_user_data;
var global_list_getted = false;
//переменная конфигурации АПИ (хранение всех адресов апи для модулей)
var api_config;

//start load_config
function get_site_settings(callback){


    //url для проверки токена
    var url = 'https://miasorubka-burger.com.ua/api/Settings';

    //отправляемые данные
    // var data = {
    //     userKey: user_token
    // };
    get_json('get', url, {}, function(data) {
        global_delivery_price = parseInt(data.data.DELIVER_PRICE);

        global_delivery_min_cart = parseInt(data.data.DELIVER_FREE_LIMIT);//250;
        global_max_cache = parseInt(data.data.LIMIT_PAY_CARD);//1000;
        if(callback){
            callback();
        }
    });

}
/**
 * [api_config_init функция инициализации API конфигурации. Заполняет переменную api_config]
 * @param  {Function} callback [функция которая выполняется после заполнения api_config]
 */
function api_config_init(callback) {
    //логирование выполнения функции
    console.log('api_config_init()');

    /**
     * [make_api_config внурення функция заполненя api_config с global_config]
     * @param  {Function} callback [функция которая выполняется после заполнения api_config]
     */
    
        var refresh = getURLParameter('refresh');
        if (refresh) {
            if (refresh == 'new_revision') {
                show_info_pop('Сервис обновился. Вкладка интерфейса была перезагружена для внедрения обновления.','',20);
            }else
            if (refresh == 'new_session') {
                show_info_pop('Был выполнен вход в аккаун с другого браузера/устройства. Текущая сессия была закрыта.','',20);
            }
            removeURLparameter('refresh');
        }



        if (global_build != false) { //если это test/prod

            var rev = $('body').attr('data-revision');

            if (if_defined(rev)) {

                global_front_version = parseInt(rev);
            }else{

                global_front_version = new Date().getTime();
            }


        }else{


            global_front_version = new Date().getTime();

        }


    function make_api_config(callback) {
        //логирование выполнения функции
        console.log('make_api_config()');

        //дефолтный ключ набора адресов апи для девверсии ( l - localhost )
        var h_parameter = 'l';

        if (global_build != false) { //если это test/prod

            //меняем ключ на соотвествующий
            h_parameter = global_build; // t - test || p - prod, устанавливается при сборке
        }

        if (location.hostname.indexOf('steps')>-1) {
            h_parameter += '_s';
        }

        //ищем совпадение с ключем в параметре h набора апи        
        for (var i = global_config.api.length - 1; i >= 0; i--) {
            if (h_parameter == global_config.api[i].h) {

                //логгиируем полученный результат
                console.log('host = ', global_config.api[i].h);
                console.log('api_config =', global_config.api[i].u);

                //присваиваем api_config нужный набор адресов АПИ
                api_config = global_config.api[i].u;


                if (callback) { //если есть колбек - выполняем колбек
                    callback();
                }
            }
        }

    }

    //если global_config заполнен (не false)
    if (global_config) {
        //наполняем api_config
        make_api_config(callback);
    } else {
        //получаем global_config с файла global_config_file
        $.getJSON(global_config_file, function(data) {
            //присваиваем global_config полученные данные
            global_config = data;

            //наполняем api_config
            make_api_config(callback);
        });
    }
}

// /**
//  * [set_user_token функция установки юзер _токена]
//  * @param {string} token [токен пользователя]
//  */
// function set_user_token(token) {
//     //логирование выполнения функции
//     console.log('set_user_token(',token,')');
//     //устанавливаем куку user_token с токеном на 6 часов
//     setCookie("user_token", token, 6);
//     //утснавливаем глобальный флаг авторизации в true
//     global_user_auth = true;
//     //устанавливаем глобальньное значения токена
//     global_user_token = token;
// }


// /**
//  * [clear_user_token очищаем токен пользователя]
//  */
// function clear_user_token() {
//     //логирование выполнения функции
//     console.log('clear_user_token()');

//     //стираем куку user_token
//     setCookie("user_token", '', -1);

//     //утснавливаем глобальный флаг авторизации в false
//     global_user_auth = false;
//     //устанавливаем глобальньное значения токена в false
//     global_user_token = false;

//     //если это не страница авторизации
//     if (document.location.pathname != '/') {
//         open_part('promo');//открываем логин
//     } else {
//         open_part('promo', true);//иначе открываем логин с параметром from_url
//     }
// }

/**
 * [user_init функция инициализации пользователя]
 */
//function user_init() {
    //логирование выполнения функции
    //console.log('user_init()');
    //получаем токен пользователя с куки
    // var user_token = getCookie('user_token');

    // if (if_defined(getURLParameter('LY_INV_H'))) { //если это ссылка возврата с робокассы
    //     if (if_defined(getURLParameter('LMI_SYS_PAYMENT_ID'))) { //и есть параметр crc

    //         if(getURLParameter('payment') == 'suc'){
    //             show_info_pop('Оплата прошла успешно'); //выводим попап проу спешную оплату
    //             history.replaceState('', document.title, '//'+document.location.host + document.location.pathname);

    //         }else{

    //             show_alert_mess('Оплата не прошла'); //выводим попап об ошибке 
    //         }

    //     } else { //если нету crc
    //     }

    // }


    // get_user_info(function() {}, function() {

    //     var path = document.location.pathname;

    //     var opened = false;
    //     var part_name = false;
    //     for (var i = page_parts.length - 1; i >= 0; i--) {
    //         if (page_parts[i].url == path) {
    //             part_name = page_parts[i].part;
    //             if (if_defined(page_parts[i].opened) && page_parts[i].opened == true) {
    //                 opened = true;
    //             }
    //         } else {
    //             if (if_defined(page_parts[i].alt)) {
    //                 for (var j = page_parts[i].alt.length - 1; j >= 0; j--) {
    //                     if (page_parts[i].alt[j].url == path) {
    //                         part_name = page_parts[i].part;
    //                         if (if_defined(page_parts[i].opened) && page_parts[i].opened == true) {
    //                             opened = true;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     if (!opened) {
    //         //если положение не в авторизации открываем логин

    //         // open_from_url();
    //         // open_from_url('/login');
            
    //         global_current_path = document.location.pathname + document.location.search;
    //         $('body').attr('data-prew',global_current_path);
    //         open_part('login');

    //         //open_part('login');

    //     } else {
    //         // open_part('promo', true);
    //         // open_from_url();
    //         // open_part(part_name,true);

    //         if (path == '/login') {
    //             //иначе открываем с параметром from_url
    //             open_part('promo', true);
    //             global_current_open_part = 'promo';
    //             global_current_path = '/';
    //             open_part('login');

    //         } else {

    //             //иначе открываем с параметром from_url
    //             console.log('open_from_url();');


                //open_from_url();

    //         }
    //     }
    // });


    // if (!user_token) {
    // //если нет токена пользователя в куках


    // } else {
    //     get_user_info();
    // }
//}
// var global_user_balance = false;

// function get_user_info(callback_true, callback_false,bg) {
//     //если есть сохраненный юзер токен

//     //var user_token = getCookie('user_token');
//     //url для проверки токена
//     var url = api_config.default+'User/info';

//     //отправляемые данные
//     // var data = {
//     //     userKey: user_token
//     // };
//     get_json('get', url, {}, function(data) {
//         //set_user_token(user_token);
//         global_user_data = data.data;
//         global_user_auth = true;

//         run_module('menu');
//         run_module('user_tools');
//         global_user_balance = data.data.balance.balance;
//         if (if_defined(callback_true)) {
//             callback_true();
//         }
//         // else{


//         var cur_pathname = document.location.pathname;

//         if (cur_pathname == '/login' || cur_pathname == '/') {

//             //открываем дефолтную часть
//             open_part(global_default_open_part);

//         } else {
//             //если не логин и есть пазнейм (длинна больше 1)
//             if(!bg && !$('body').attr('data-prew')){
//                 open_from_url();    
//             }

//         }
//         // }


//     }, false, function() { //при не удачном выполнеии - сбрасиваем юзер токен(стираем куку)

//         global_user_auth = false;
//         if (if_defined(callback_false)) {
//             callback_false();
//         } else {
//             open_part('login');
//         }
//         //clear_user_token();

//     }, false, function() {}, true);

// }

// /**
//  * [logout функция логаута пользователя]
//  */
// function logout() {
//     //логируем выполненяе функции

//     var url = api_config.default+'Auth/logout';

//     get_json('post', url, {}, function(data) {
//         global_user_auth = false;
//         global_user_data = false;

//         if (if_defined(window['user_tools']) && if_defined(user_tools.view.t_wrap)) {
//             user_tools.view.t_wrap.hide();
//         }
//         if (if_defined(window['menu']) && if_defined(menu.view.m_wrap)) {
//             menu.view.m_wrap.hide();
//         }

//         if (document.location.pathname != '/') {
//             open_part('promo'); //открываем логин
//         } else {
//             open_part('promo', true); //иначе открываем логин с параметром from_url
//         }

//     });


//     //clear_user_token();
// }
// var support_chat
// function init_chat_vk() {
//     //if (global_build != false) {

//         $.getScript('//vk.com/js/api/openapi.js?151', function() {
            
//             support_chat = VK.Widgets.CommunityMessages("vk_community_messages", 159023729, {
//                 disableExpandChatSound: "1",
//                 disableNewMessagesSound: "1",
//                 disableButtonTooltip: "1",
//                 buttonType: "no_button",
//                 expanded:"1"
//             });

//         });
//     //}
    
    
// }
$(document).ready(function() {
    //по загрузке данного скрипта и выполнении реди
    //init_chat_vk();
    //иницируем заполнение api_config

    // $('.chat-trig').unbind('click');    
    // $('.chat-trig').click(function(e){
    //     e.preventDefault();
    //     $(this).closest('.chat-wrap').toggleClass('active');
    // });
    api_config_init(function() { //c кольбеком
        //иницирование пользователя
        open_from_url();
    });


});