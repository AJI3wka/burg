;
'use strict';

//логируем включение скрипта
console.log('basic start');

//$.arcticmodal('setDefault' - стандартные опции для библиотеки попапов
// $.arcticmodal('setDefault', {
//     closeOnOverlayClick: true, // закрывать по клику на оверлей
//     closeOnEsc: false, //не закрывать при нажимании ексекйп
//     openEffect: { //мгновенное открытие без анимации
//         type: 'none',
//         speed: 0
//     },
//     overlay: {
//         css: {
//             backgroundColor: 'rgb(0,0,0)',
//             opacity: 0.7
//         }
//     },
//     closeEffect: { //мгновенное закрытие без анимации
//         type: 'none',
//         speed: 0
//     },
//     beforeOpen: function(data, el) {
//         var $close = $(el).find('.close,.i-close-a');
//         $close.unbind('click');
//         $close.click(function() {
//             close_modal_from($(this));
//         });
//         $('body').addClass('scrollpad'); //накинуть клас который выкоючает скролинг в body
//     },
//     afterOpen: function() { //функция выпоняемая после открытия
//         //if ($(el).outerHeight() > $(window).height()) { //если высота попапа больше высоты вьувпорта


//         //}
//     },
//     beforeClose: function() { //функция выпоняемая после закрытия
//         //if ($('body').find('.arcticmodal-container').length == 0) {
//         $('body').removeClass('scrollpad'); //сбросить клас который выкоючает скролинг в body

//     }
// });
// // var global_tarif_data = [
// //     {
// //         lv:1,
// //         id:6,
// //         base_val:990,
// //                 time:1,
// //                 price:990,
// //                 disc:0
// //     },
// //     {
// //         lv:1,
// //         id:7,
// //         base_val:990,
// //                 time:3,
// //                 price:900,
// //                 disc:10
// //     },
// //     {
// //         lv:1,
// //         id:8,
// //         base_val:990,
// //                 time:6,
// //                 price:740,
// //                 disc:25
// //     },
// //     {
// //         lv:1,
// //         id:9,
// //         base_val:990,
// //         first_day:'disabled',
// //                 time:12,
// //                 price:590,
// //                 disc:40
// //     },
// //     {
// //         lv:1,
// //         id:10,
// //         base_val:990,
// //         first_day:'abled',
// //                 time:12,
// //                 price:495,
// //                 disc:50
// //     },
// //     {
// //         lv:2,
// //         id:1,
// //         base_val:1490,
// //                 time:1,
// //                 price:1490,
// //                 disc:0
// //     },
// //     {
// //         lv:2,
// //         id:2,
// //         base_val:1490,
// //                 time:3,
// //                 price:1340,
// //                 disc:10
// //     },
// //     {
// //         lv:2,
// //         id:3,
// //         base_val:1490,
// //                 time:6,
// //                 price:1110,
// //                 disc:25
// //     },
// //     {
// //         lv:2,
// //         id:4,
// //         base_val:1490,
// //         first_day:'disabled',
// //                 time:12,
// //                 price:890,
// //                 disc:40
// //     },
// //     {
// //         lv:2,
// //         id:5,
// //         base_val:1490,
// //         first_day:'abled',
// //                 time:12,
// //                 price:745,
// //                 disc:50
// //     },
// //     {
// //         lv:3,
// //         id:11,
// //         base_val:2490,
// //                 time:1,
// //                 price:2490,
// //                 disc:0
// //     },
// //     {
// //         lv:3,
// //         id:12,
// //         base_val:2490,
// //                 time:3,
// //                 price:2240,
// //                 disc:10
// //     },
// //     {
// //         lv:3,
// //         id:13,
// //         base_val:2490,
// //         time:6,
// //         price:1860,
// //         disc:25
// //     },
// //     {
// //         lv:3,
// //         id:14,
// //         base_val:2490,
// //         first_day:'disabled',
// //                 time:12,
// //                 price:1490,
// //                 disc:40
// //     },
// //     {
// //         lv:3,
// //         id:15,
// //         base_val:2490,
// //         first_day:'abled',
// //                 time:12,
// //                 price:1245,
// //                 disc:50
// //     },
// //     {
// //         lv:4,
// //         id:16,
// //         base_val:3790,
// //                 time:1,
// //                 price:3790,
// //                 disc:0
// //     },
// //     {
// //         lv:4,
// //         id:17,
// //         base_val:3790,
// //                 time:3,
// //                 price:3410,
// //                 disc:10
// //     },
// //     {
// //         lv:4,
// //         id:18,
// //         base_val:3790,
// //                 time:6,
// //                 price:2840,
// //                 disc:25
// //     },
// //     {
// //         lv:4,
// //         id:19,
// //         base_val:3790,
// //         first_day:'disabled',
// //                 time:12,
// //                 price:2270,
// //                 disc:40
// //     },
// //     {
// //         lv:4,
// //         id:20,
// //         base_val:3790,
// //         first_day:'abled',
// //                 time:12,
// //                 price:1895,
// //                 disc:50
// //     },
// // ];
// jQuery.fn.getPath = function () {
//     if (this.length != 1) throw 'Requires one element.';

//     var path, node = this;
//     while (node.length) {
//         var realNode = node[0], name = realNode.localName;
//         if (!name) break;
//         name = name.toLowerCase();

//         var parent = node.parent();

//         var siblings = parent.children(name);
//         if (siblings.length > 1) { 
//             name += ':eq(' + siblings.index(realNode) + ')';
//         }

//         path = name + (path ? '>' + path : '');
//         node = parent;
//     }

//     return path;
// };
// /**
//  * [scroll_reinit функция реинциализации скролла на js]
//  * @param  {object}   elem               [this $(this) jquery елемента]
//  * @param  {object}   options            [{} обьект со свойствами для плагина скролла]
//  * @param  {Function} callback_bot       [callback при "упирании" в низ]
//  * @param  {Function} callback_top       [callback при "упирании" в верх]
//  * @param  {Function} callback_from_bot  [callback при "отталкивании" снизу]
//  * @param  {Function} callback_from_top  [callback при "отталкивании" сверху]
//  * @param  {Function} callback_while     [callback при скрилинге]
//  */
// function scroll_reinit($wrap, options, callback_bot, callback_top, callback_from_bot, callback_from_top, callback_while) {

//     var dafault_options = { // дефолтние свойства для плагина скролла
//         theme: "dnk", // тема стилей скролла
//         scrollInertia: 0, // плавность скроллинга
//         scrollbarPosition: 'outside', // позиция скролла относительно блока
//     };
//     var reinit_flag = false; // флаг, который показывает, была ли реинициализация скролла

//     if (options) { // если передан аргумент со свойствами для плагина скролла, то

//         for (var i in options) { // перебираем свойства в обьекте
//             if (options.hasOwnProperty(i)) { // если передано свойство то
//                 dafault_options[i] = options[i]; // передаем его в обьект з дефолтнымы свойствами с заменой дефолтного свойства
//             }
//         }
//     }

//     //save and destroy

//     if ($wrap.hasClass('mCustomScrollbar')) { // если скролл уже был инициализирован
//         reinit_flag = true; // вказываем в флаге что скролл уже был инициализирован
//         //stuff
//         $wrap.mCustomScrollbar('destroy'); // удаляем (разрушаем) плагин скролла
//     }

//     //make new

//     if (reinit_flag === false) { // если скролл небыл реинициализирован, то
//         $wrap.addClass('scrolled_to_top'); // накидуем класс, который показывает, что сейчас заскроллино " в упор" вверх
//     }

//     dafault_options.callbacks = {}; // создаем обьект с коллбеками

//     dafault_options.callbacks.whileScrolling = function() { // коллбек во время скроллинга

//         var scroll_top = this.mcs.top; // скроллтоп в пикселях
//         // var scroll_percante = this.mcs.topPct; // скроллтоп в процентах = (-скроллтоп)/(высота контента - вьювпорт)*100;
//         var scroll_bot = $(this).find('.mCSB_container')[0].scrollHeight - $(this).find('.mCustomScrollBox').outerHeight() + scroll_top; // скроллботтом в пикселях

//         if (callback_while) {
//             callback_while();
//         }


//         if (callback_bot || callback_top || callback_from_bot || callback_from_top) { // если есть хотя бы один коллбек

//             // внутренная функция, выполняет коллбеки при "отталкивании" и снимает класс с враппера
//             var on_scrolled_from_handler = function(_this, position_class, position_callback) {
//                 if (position_callback) { // если есть коллбек "отталкивания", то
//                     position_callback(_this); // выполняем коллбек "отталкивания"
//                 }
//                 console.log('from_' + position_class.slice(12));
//                 $(_this).removeClass(position_class); // убераем класс про "упор" скролла
//             };

//             if (scroll_top >= -1) { // если скроллтоп меньше 10 пикселей, тоесть "упор" скролла вверх

//                 if ($(this).hasClass('scrolled_to_bot')) { // если был "упор" скролла вниз, то
//                     on_scrolled_from_handler(this, 'scrolled_to_bot', callback_from_bot); // выполняем коллбек "отталкивания" снизу и снимаем класс с враппера
//                 }

//                 if ($(this).hasClass('scrolled_to_top')) return; // если уже был "упор" скролла вверх, то ничего не делаем
//                 $(this).addClass('scrolled_to_top'); // накидываем класс про "упор" скролла вверх
//                 console.log('to_top');

//                 if (callback_top) { // если есть коллбек "упора" скролла вверх, то
//                     callback_top(this); // выполняем коллбек "упора" скролла вверх
//                 }

//             } else if (scroll_bot <= 1) { // если скроллботтом меньше 10 пикселей, тоесть "упор" скролла вниз

//                 if ($(this).hasClass('scrolled_to_top')) { // если был "упор" скролла вверх, то
//                     on_scrolled_from_handler(this, 'scrolled_to_top', callback_from_top); // выполняем коллбек "отталкивания" сверху и снимаем класс с враппера
//                 }

//                 if ($(this).hasClass('scrolled_to_bot')) return; // если уже был "упор" скролла вниз, то ничего не делаем
//                 $(this).addClass('scrolled_to_bot'); // накидываем класс про "упор" скролла вниз
//                 console.log('to_bot');

//                 if (callback_bot) { // если есть коллбек "упора" скролла вниз, то
//                     callback_bot(this); // выполняем коллбек "упора" скролла вниз
//                 }

//             } else { // если скроллтоп и скроллботтом больше 10 пикселей

//                 if ($(this).hasClass('scrolled_to_top')) { // если был "упор" скролла вверх, то
//                     on_scrolled_from_handler(this, 'scrolled_to_top', callback_from_top); // выполняем коллбек "отталкивания" сверху и снимаем класс с враппера
//                 }

//                 if ($(this).hasClass('scrolled_to_bot')) { // если был "упор" скролла вниз, то
//                     on_scrolled_from_handler(this, 'scrolled_to_bot', callback_from_bot); // выполняем коллбек "отталкивания" снизу и снимаем класс с враппера
//                 }

//             }

//         }
//     };

//     $wrap.mCustomScrollbar(dafault_options); // инициируем плагин скролла на враппере з нужными свойствами
// }



// /**
//  * [scroll_horizontal_reinit функция реинциализации горизонтального скролла на js]
//  * @param  {object}   elem                 [this $(this) jquery елемента]
//  * @param  {object}   options              [{} обьект со свойствами для плагина скролла]
//  * @param  {Function} callback_left        [callback при "упирании" влево]
//  * @param  {Function} callback_right       [callback при "упирании" вправо]
//  * @param  {Function} callback_from_left   [callback при "отталкивании" слева]
//  * @param  {Function} callback_from_right  [callback при "отталкивании" справа]
//  */
// function scroll_horizontal_reinit(elem, options, callback_left, callback_right, callback_from_left, callback_from_right) {

//     var $wrap = $(elem); // сохраняем враппер блока со скроллом
//     var dafault_options = { // дефолтние свойства для плагина скролла
//         theme: "dnk", // тема стилей скролла
//         axis: "x", // горизонтальний скролл
//         scrollInertia: 0, // плавность скроллинга
//         scrollbarPosition: 'outside' // позиция скролла относительно блока
//     };
//     var reinit_flag = false; // флаг, который показывает, была ли реинициализация скролла

//     if (options) { // если передан аргумент со свойствами для плагина скролла, то
//         for (var i in options) { // перебираем свойства в обьекте
//             if (options.hasOwnProperty(i)) { // если передано свойство то
//                 dafault_options[i] = options[i]; // передаем его в обьект з дефолтнымы свойствами с заменой дефолтного свойства
//             }
//         }
//     }

//     //save and destroy

//     if ($wrap.hasClass('mCustomScrollbar')) { // если скролл уже был инициализирован
//         reinit_flag = true; // вказываем в флаге что скролл уже был инициализирован
//         //stuff
//         $wrap.mCustomScrollbar('destroy'); // удаляем (разрушаем) плагин скролла
//     }

//     //make new

//     if (reinit_flag === false) { // если скролл небыл реинициализирован, то
//         $wrap.addClass('scrolled_to_left'); // накидуем класс, который показывает, что сейчас заскроллино " в упор" влево
//     }

//     dafault_options.callbacks = {}; // создаем обьект с коллбеками

//     dafault_options.callbacks.whileScrolling = function() { // коллбек во время скроллинга

//         var scroll_left = this.mcs.left; // скролл слева в пикселях
//         // var scroll_percante = this.mcs.leftPct; // скролл слева в процентах
//         var scroll_right = $(this).find('.mCSB_container')[0].scrollWidth - $(this).find('.mCustomScrollBox').outerWidth() + scroll_left; // скролл справа в пикселях

//         if (callback_left || callback_right || callback_from_left || callback_from_right) { // если есть хотя бы один коллбек

//             // внутренная функция, выполняет коллбеки при "отталкивании" и снимает класс с враппера
//             var on_scrolled_from_handler = function(_this, position_class, position_callback) {
//                 if (position_callback) { // если есть коллбек "отталкивания", то
//                     position_callback(_this); // выполняем коллбек "отталкивания"
//                 }
//                 console.log('from_' + position_class.slice(12));
//                 $(_this).removeClass(position_class); // убераем класс про "упор" скролла
//             };

//             if (scroll_left >= -10) { // если скролл слева меньше 10 пикселей, тоесть "упор" скролла влево

//                 if ($(this).hasClass('scrolled_to_right')) { // если был "упор" скролла вправо, то
//                     on_scrolled_from_handler(this, 'scrolled_to_right', callback_from_right); // выполняем коллбек "отталкивания" справа и снимаем класс с враппера
//                 }

//                 if ($(this).hasClass('scrolled_to_left')) return; // если уже был "упор" скролла влево, то ничего не делаем
//                 $(this).addClass('scrolled_to_left'); // накидываем класс про "упор" скролла влево
//                 console.log('to_left');

//                 if (callback_left) { // если есть коллбек "упора" скролла влево, то
//                     callback_left(this); // выполняем коллбек "упора" скролла влево
//                 }

//             } else if (scroll_right <= 10) { // если скроллтоп меньше 10 пикселей, тоесть "упор" скролла вправо

//                 if ($(this).hasClass('scrolled_to_left')) { // если был "упор" скролла влево, то
//                     on_scrolled_from_handler(this, 'scrolled_to_left', callback_from_left); // выполняем коллбек "отталкивания" слева и снимаем класс с враппера
//                 }

//                 if ($(this).hasClass('scrolled_to_right')) return; // если уже был "упор" скролла вправо, то ничего не делаем
//                 $(this).addClass('scrolled_to_right'); // накидываем класс про "упор" скролла вправо
//                 console.log('to_right');

//                 if (callback_right) { // если есть коллбек "упора" скролла вправо, то
//                     callback_right(this); // выполняем коллбек "упора" скролла вправо
//                 }

//             } else { // если скролл слева и скролл справа больше 10 пикселей

//                 if ($(this).hasClass('scrolled_to_right')) { // если был "упор" скролла вправо, то
//                     on_scrolled_from_handler(this, 'scrolled_to_right', callback_from_right); // выполняем коллбек "отталкивания" справа и снимаем класс с враппера
//                 }

//                 if ($(this).hasClass('scrolled_to_left')) { // если был "упор" скролла влево, то
//                     on_scrolled_from_handler(this, 'scrolled_to_left', callback_from_left); // выполняем коллбек "отталкивания" слева и снимаем класс с враппера
//                 }

//             }

//         }
//     };

//     $wrap.mCustomScrollbar(dafault_options); // инициируем плагин скролла на враппере з нужными свойствами
// }


//фуникция для загрузки файлов -- start */
window.downloadFile = function(sUrl, pdf) {
    //surl - string,url скачки файла
    //pdf - bool - (undefined)false,true - загрузка файлов
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
        var link = document.createElement('a');
        link.href = sUrl;
        if (link.download !== undefined) {
            link.download = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
        }
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }
    var query = '?download';
    if (pdf) {
        query = ''; //если ПДФ, то без параметра '?download'
    }
    window.open(sUrl + query, '_self');
};
window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
//фуникция для загрузки файлов -- end */


//функция для векторов удаляет елемент по значению
Array.prototype.clean = function(deleteValue) {
    //deleteValue - string значение от которого "чистим" вектор
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};


/**
 * [PopupCenter открытие попапа в новом окне браузера]
 * @param {[type]} url   [url]
 * @param {[type]} title [заголовок старницы]
 * @param {[type]} w     [ширина]
 * @param {[type]} h     [высота]
 */
function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}


/**
 * [show_alert_mess базовая функция вывода ошибки]
 * @param  {[string]} text [текст ошибибки]
 */
function show_alert_mess(text) {
    console.log('show_alert_mess(', text, ')');
    var $err = $('#errors');
    $err.find('p').html('<span>' + text + '</span>'); //заполняем каркас ошибки
    $err.arcticmodal(); //выводим ошибку попапом

    //ниже перенесенов  дефолт
    // var $close = $err.find('.close');
    // $close.unbind('click');
    // $close.click(function() {
    //     close_modal_from($(this));
    // });
}

/**
 * [show_confirm функция вывода окошка подтверждения действия]
 * @param  {[string]} text  [текст вопроса]
 * @param  {[function]} funct [funct() колбек при нажатии "да"]
 */
function show_confirm(text, funct) {
    var $conf = $('#confirm');
    $conf.find('.text').html(text); //заполняем текст вопроса
    $conf.addClass('active'); //открываем попап накидыванием класа
    $conf.find('.yes').unbind('click'); //скидываем евенты на click "да"
    $conf.find('.yes').click(function() { //присваивем евент на click "да"
        $(this).closest('#confirm').removeClass('active'); //закрываем попап удалением класа
        funct(); //выполнение колбека
    });
    $conf.find('.no,.close').unbind('click'); //скидываем евенты на click "нет"
    $conf.find('.no,.close').click(function() { //присваивем евент на click "нет"
        $(this).closest('#confirm').removeClass('active'); //закрываем попап удалением класа
    });
}

/**
 * [show_info_pop вывести сообщение пользователю]
 * @param  {[string]} text [текстовое сообщение сообщение]
 */
function show_info_pop(text, heading, zIndex) {

    console.log('          show_alert_mess(', text, ')');
    var $pop = $('#simple_info');
    $pop.find('.container').html(text);
    if (heading) {
        $pop.find('.head').html(heading);

    } else {

        $pop.find('.head').html('Внимание');
    }
    $pop.arcticmodal({afterOpen:function(){
        $pop.closest('.arcticmodal-container').css('zIndex',20);
    }});
    //ниже перенесенов  дефолт
    // var $close = $pop.find('.close');
    // $close.unbind('click');
    // $close.click(function() {
    //     close_modal_from($(this));
    // });

}

function close_modal_from($elem) {
    $elem.closest('.arcticmodal-container_i2').children().arcticmodal('close');
}

/**
 * [if_defined функция проверки преремнной на существование]
 * @param  {variable|string} data [переменная]
 * @return {boolean}      [true/false]
 */
function if_defined(data) {

    return typeof data != 'undefined' && data != '' && data != 'null' && data != null;

}


/**
 * [getURLParameter - получить гет параметр с строки браузера]]
 * @param  {string} name [имя параметра]
 * @return {string}      [занчение параметра]
 */
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

function removeURLparameter(name) {
    console.log('removeURLparameter(', name, ')');

    var path = document.location.search;
    //path.splice(0, 1);
    path = path.substr(1)
    path = path.split('&');

    console.log('path = ', path);

    var finded = false;
    for (var i = path.length - 1; i >= 0; i--) {
        if (path[i].split('=')[0] == name) {
            path.splice(i, 1);
            finded = true;
        }
    }

    if (finded) {

        var pathname = document.location.pathname;
        if (path.length > 0) {
            pathname += '?'
            for (var i = 0; i < path.length; i++) {
                pathname += path[i]
                if (i != path.length - 1) {
                    pathname += '&';
                }
            }

        }
        history.replaceState('', document.title, pathname);
    }
}
/**
 * [setCookie - функция установки куки на 4 часа+]
 * @param {string}  cname  имя куки
 * @param {string}  cvalue значение куки
 * @param {int}     exhour время жизни в часах
 */
function setCookie(cname, cvalue, exhour) {
    var d = new Date();
    d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * [getCookie - получение значения куки]
 * @param  {string} cname имя куки
 * @return {string|boolean}       значение куки
 */
function getCookie(cname) {
    //console.log('getCookie(',cname,')');

    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}

function encode_obj_uri(obj, form, namespace) {


    // var list = list || [];
    // // for(var key in obj){
    // //     if(obj.hasOwnProperty(key)){
    // //         if(typeof obj[key] == 'string'){
    // //             obj[key] = encodeURI(obj[key])
    // //         }else{
    // //             obj[key] = encode_obj_uri(obj[key])
    // //         }
    // //     }
    // // }

    // for (var formKey in obj) {
    //     if (obj.hasOwnProperty(formKey)) {
    //         var element = obj[property]
    //         if (typeof(element) == 'object') {
    //             for (var idx in element)
    //                 encode_obj_uri(element[idx], key ? key + '[' + idx + ']' : idx, list);
    //         } else {
    //             list.append(formKey, obj[property]);
    //             //list.push(key + '=' + encodeURIComponent(element));
    //         }
    //     }
    // }

    var fd = form || {};
    var formKey;

    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {

            // if (namespace) {
            //     formKey = '[' + namespace + '][' + property + ']';
            // } else {
            //     formKey = property;
            // }

            // if the property is an object, but not a File,
            // use recursivity.
            if (typeof obj[property] === 'object') {

                encode_obj_uri(obj[property], fd, property);

            } else {

                // if it's a string or a File object
                fd[property] = encodeURIComponent(obj[property]);
            }

        }
    }

    return fd;


    // return list;
}

function decode_obj_uri(obj) {


    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] == 'string') {
                if (typeof decodeURI(obj[key]) == 'string') {
                    obj[key] = decodeURI(obj[key]);
                }
            } else {
                obj[key] = decode_obj_uri(obj[key])
            }
        }
    }

    return obj;
}

function JSON_to_URLEncoded(element, key, list) {
    var list = list || [];
    if (typeof(element) == 'object') {
        for (var idx in element)
            JSON_to_URLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
    } else {
        //list.append(formKey, obj[property]);
        //element.replace('\\+','+').replace('+','\\+');
        list.push(key + '=' + encodeURIComponent(element));
    }
    //list.join('&');
    //return list.join('&');
    return list.join('&');
} 

function updateQueryStringParam(param, value) {
    baseUrl = [location.protocol, '//', location.host, location.pathname].join('');
    urlQueryString = document.location.search;
    var newParam = param + '=' + value,
        params = '?' + newParam;

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        keyRegex = new RegExp('([\?&])' + param + '[^&]*');
        // If param exists already, update it
        if (urlQueryString.match(keyRegex) !== null) {
            params = urlQueryString.replace(keyRegex, "$1" + newParam);
        } else { // Otherwise, add it to end of query string
            params = urlQueryString + '&' + newParam;
        }
    }
    window.history.replaceState({}, "", baseUrl + params);
    global_current_path = document.location.pathname + document.location.search;
}

function reparse_object_to_formdata(obj, form, namespace) {

    var fd = form || new FormData();
    var formKey;

    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {

            if (namespace) {
                formKey = '[' + namespace + '][' + property + ']';
            } else {
                formKey = property;
            }

            // if the property is an object, but not a File,
            // use recursivity.
            if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {

                reparse_object_to_formdata(obj[property], fd, property);

            } else {

                // if it's a string or a File object
                fd.append(formKey, obj[property]);
            }

        }
    }

    return fd;

};

function dnk_atom_events(event_obj) {

    if (typeof ga == 'function' && if_defined(ga)) {

        if (event_obj['type'] == 'page') {

            ga('set', 'page', document.location.pathname + document.location.search);
            ga('send', 'pageview');

        } else if (event_obj['type'] == 'event') {

            ga('send', 'event', event_obj['category'], event_obj['action'], event_obj['link']);

        }



    }
}

var global_one_cropper = false;

function one_crope(elem, opt, callback) {
    var $pop = $('#one_cropper');

    var $list = $pop.find('.crop-ratio-list');


    var file_type_c = 'image/png';

    if(opt.out.img_type == 'jpg'){

        file_type_c = 'image/jpeg';
    }

    $list.empty();
    $list.attr('data-m-w', opt.min[0]).attr('data-m-h', opt.min[1])
    var html = '';

    for (var i = 0; i < opt.aspects.length; i++) {
        var text = opt.aspects[i][0] + ' : ' + opt.aspects[i][1];
        if (i == 0 && opt.aspects.length==1) {
            text = 'Стандартное'
        }else{
            text = opt.aspectsNames[i];
        }
        var act = '';
        if(i==0){
            act= ' active';
        }
        html += '<div class="btn'+act+'" data-w="' + opt.aspects[i][0] + '" data-h="' + opt.aspects[i][1] + '">' + text + '</div>';
    }

    if (opt.free) {

        html += '<div class="btn" data-w="free" data-h="free">Свободное</div>';

    }
    $list.html(html);

    if($list.children().length>1){
        $list.parent().show();
    }else{

        $list.parent().hide();
    }


    var $elem = $(elem);

    var data = new FormData($elem.closest('form')[0]); //формирование form-data c формы(у которой толко 1н инпкт)


    function start_cropper(){
 /*-------проверка файла на фронте перед выгрузкой конец -------*/

        console.log('          upload_img() - отправка фотографии');

        var m_coef = 1;
        //$pop.arcticmodal({afterOpen:function(){
        var reader = new FileReader();
        var canvas = null;
        var image;
        reader.onload = function(e) {
            image = new Image();
            image.onload = validateImage;
            image.src = e.target.result;
        }
        reader.readAsDataURL(file);

        function validateImage() {
            if (canvas != null) {
                image = new Image();
                image.onload = restartJcrop;
                image.src = canvas.toDataURL(file_type_c);
            } else restartJcrop();
        }

        function dataURLtoBlob(dataURL) {
            var BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) == -1) {
                var parts = dataURL.split(',');
                var contentType = parts[0].split(':')[1];
                var raw = decodeURIComponent(parts[1]);

                return new Blob([raw], {
                    type: contentType
                });
            }
            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;
            var uInt8Array = new Uint8Array(rawLength);
            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            return new Blob([uInt8Array], {
                type: contentType
            });
        }


        function reinit_cropper(_new_ratio) {
            console.log('reinit_cropper(', _new_ratio, ')');

            var $first = $list.children().first();

            var f_ar_w = parseInt($first.attr('data-w'));
            var f_ar_h = parseInt($first.attr('data-h'));

            if (_new_ratio) {
                f_ar_w = _new_ratio.w;
                f_ar_h = _new_ratio.h;

            } else {
                f_ar_w = parseInt($first.attr('data-w'));
                f_ar_h = parseInt($first.attr('data-h'));

            }

            var m_w = parseInt($list.attr('data-m-w'));

            var m_h = parseInt($list.attr('data-m-h'));

            var opt = {
                movable: false,
                rotatable: false,
                scalable: false,
                zoomable: false,
                ready:function(){
                    //global_one_cropper.scale(0.5);
                }
            };

            if (f_ar_w && f_ar_h) {
                opt.aspectRatio = f_ar_w / f_ar_h;
            }

            if (m_w && m_h) {
                opt.minCropBoxWidth = m_w*m_coef;
                opt.minCropBoxHeight = m_h*m_coef;
                // opt.minCropBoxWidth = m_w;
                // opt.minCropBoxHeight = m_h;
            }
            ////alert('init_crop');
            console.log('crop options = ', opt);
            if (global_one_cropper) {
                global_one_cropper.destroy();
            }
            global_one_cropper = new Cropper($("#one_cropper").find('canvas')[0], opt);

        }

        function restartJcrop() {

            $pop.find('.canvas-wrp').empty();
            $pop.find('.canvas-wrp').append("<canvas id=\"canvas\">");
            canvas = $("#one_cropper").find("#canvas")[0];
            context = canvas.getContext("2d");


            if (image.width>980) {
                var w = image.width;
                m_coef = 980/w;
                console.log('m_coef = ',m_coef);
                image.width = 980;
                image.height = m_coef*image.height
                $("#one_cropper").attr('data-scale', m_coef);

            }else{

                $("#one_cropper").attr('data-scale', 1);
            }

            // if (opt.padding == true) {

            //     canvas.width = image.width + 100;
            //     canvas.height = image.height + 100;
            //     context.drawImage(image, 50, 50,image.width,image.height);

            // } else {

                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0,image.width,image.height);
            //}

            reinit_cropper()

        }
        $list.find('.btn').unbind('click');
        $list.find('.btn').click(function() {
            ////alert('click');
            reinit_cropper({
                w: parseInt($(this).attr('data-w')),
                h: parseInt($(this).attr('data-h'))
            });
            $(this).parent().children().removeClass('active');
            $(this).addClass('active');
        })
        $pop.find('.confirm-btn').unbind('click');
        $pop.find('.confirm-btn').click(function() {
            ////alert('click');
            // reinit_cropper({
            //     w:parseInt($(this).attr('data-w')),
            //     h:parseInt($(this).attr('data-h'))
            // });
            // global_one_cropper.crop();
            // var f_color =  'transparent';
            // if(opt.out.img_type == 'jpg'){
            //     f_color = '#FFFFFF';
            // }
            // console.log('get_data = ', global_one_cropper.getData());
            // var new_canvas = global_one_cropper.getCroppedCanvas({
            //     width: opt.out.width,
            //     height: opt.out.height,
            //     minWidth: opt.out.minWidth,
            //     minHeight: opt.out.minWidth,
            //     maxWidth: opt.out.minWidth,
            //     maxHeight: 4096,
            //     fillColor: f_color,
            //     imageSmoothingEnabled: true,
            //     imageSmoothingQuality: 'normal',
            // });
            // 
            
            var crop_data = global_one_cropper.getData();


            var scale_before = parseFloat($("#one_cropper").attr('data-scale'));

            var options = {

            }
            options.x = Math.round(crop_data.x/scale_before);
            options.y = Math.round(crop_data.y/scale_before);
            options.width = Math.round(crop_data.width/scale_before);
            options.height = Math.round(crop_data.height/scale_before);
            options.scale = opt.out.minWidth/options.width*100;

            console.log('crop_data',crop_data,scale_before,options)
            
            if(callback){
                callback(elem,options)
            }


            //$pop.find('.canvas-wrp').empty();
            //$pop.find('.canvas-wrp').append(new_canvas);
            // new_canvas.toBlob(function(blob) {
            //     // var formData = new FormData();

            //     // formData.append('croppedImage', blob);
            //     //console.log('blob = ',blob);
            //     //console.log('form_data = ',formData);

            //     if (callback) {
            //         callback(blob);
            //     }
            // }, file_type_c);
        })

        //}});


        updateQueryStringParam('cropper','opened');
        $pop.addClass('opened');
        $pop.find('.close').unbind('click');
        $pop.find('.close').click(function() {
            // body...
            $('#one_cropper').removeClass('opened');
            global_one_cropper.destroy();
            removeURLparameter('cropper');

            // 
        });        
        $pop.find('.faq-pop').unbind('click');
        $pop.find('.faq-pop').click(function(e) {
            e.preventDefault();
            open_from_url($(this).attr('href'),true);
            //$('#one_cropper').removeClass('opened');
            //global_one_cropper.destroy();

            // 
        });        
    }



    if ($elem.val() != '') { //если значение поля не пусто

        var ValidImageTypes = opt.valid_types;

        var file = elem.files[0]; //получчение файла
        var fileType = file["type"]; //получение типа файлооа

        if ($.inArray(fileType, ValidImageTypes) < 0) { //если нет свопадений по типам файлов
            //вывести ошибку пользователю и очистить значение поля
            show_alert_mess('Файл не правильного формата');
            //show_alert_mess('Файл не является изображением jpeg или png формата');                

            $elem.val('');

        } else

        if (file.size > 20e+6) { //если размер файла больше чем 10 000 000 байт
            //вывести ошибку пользователю и очистить значение поля
            show_alert_mess('Максимальный размер файла 20МБ');
            $elem.val('');
        } else {

            console.log('pure_js_load');
            //создание изображения на pure_js
            var img = new Image();

            img.onload = function() { //привязка евента по загрузке на него

                var width = img.naturalWidth,
                    height = img.naturalHeight;
                // получение ширины и высоты изображения и удаление созданого изобращения
                window.URL.revokeObjectURL(img.src);

                if (width < 7000 && height < 5000 && width >= opt.min[0] && height >= opt.min[1]) { //если в пределах границ размеров

                     start_cropper();


                } else { //если слишком большое разрешение вывести ошибку

                    if (width >= 7000 || height >= 5000) {
                        show_alert_mess('Файл имеет слишком большое разрешение');


                    } else {
                        //show_alert_mess('Файл имеет слишком маленькое разрешение<br>мин. ширина изображения - ' + opt.min[0] + 'px<br>мин. высота изображения - ' + opt.min[1] + 'px<br>Это ограничение сделано для того, чтобы вы не загружали фото плохого качества. Плохое фото будет убивать конверсию.<br>А мы ведь хотим все, чтобы конверсия была высокой');

                        show_confirm('Файл имеет слишком маленькое разрешение<br><br>мин. ширина изображения - ' + opt.min[0] + 'px<br>мин. высота изображения - ' + opt.min[1] + 'px<br><br>Это ограничение сделано для того, чтобы вы не загружали фото плохого качества. Плохое фото будет убивать конверсию.<br>А мы ведь хотим все, чтобы конверсия была высокой.<br><br>Все равно использовать это изображение?',start_cropper);

                    }
                }
            };

            img.src = window.URL.createObjectURL(file); //указание картинке src
        }

    }



}
function critical_error(){
    var $pop = $('#critical_error');
    // $pop.find();
    // 
    $pop.find('.continue-btn').unbind('click');

    $pop.find('.continue-btn').click(function(){
        document.location.reload();
    });


    $pop.find('.exit-btn').unbind('click');

    $pop.find('.exit-btn').click(function(){

        show_confirm('Это может призвести к непредвиденным результатам вплоть до потери данных. Продолжить?',function(){

            $pop.removeClass('opened');
        });

    });

    $pop.addClass('opened');
}

//Javascript Punycode converter derived from example in RFC3492.
//This implementation is created by some@domain.name and released into public domain
var punycode = new function Punycode() {
    // This object converts to and from puny-code used in IDN
    //
    // punycode.ToASCII ( domain )
    // 
    // Returns a puny coded representation of "domain".
    // It only converts the part of the domain name that
    // has non ASCII characters. I.e. it dosent matter if
    // you call it with a domain that already is in ASCII.
    //
    // punycode.ToUnicode (domain)
    //
    // Converts a puny-coded domain name to unicode.
    // It only converts the puny-coded parts of the domain name.
    // I.e. it dosent matter if you call it on a string
    // that already has been converted to unicode.
    //
    //
    this.utf16 = {
        // The utf16-class is necessary to convert from javascripts internal character representation to unicode and back.
        decode:function(input){
            var output = [], i=0, len=input.length,value,extra;
            while (i < len) {
                value = input.charCodeAt(i++);
                if ((value & 0xF800) === 0xD800) {
                    extra = input.charCodeAt(i++);
                    if ( ((value & 0xFC00) !== 0xD800) || ((extra & 0xFC00) !== 0xDC00) ) {
                        throw new RangeError("UTF-16(decode): Illegal UTF-16 sequence");
                    }
                    value = ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
                }
                output.push(value);
            }
            return output;
        },
        encode:function(input){
            var output = [], i=0, len=input.length,value;
            while (i < len) {
                value = input[i++];
                if ( (value & 0xF800) === 0xD800 ) {
                    throw new RangeError("UTF-16(encode): Illegal UTF-16 value");
                }
                if (value > 0xFFFF) {
                    value -= 0x10000;
                    output.push(String.fromCharCode(((value >>>10) & 0x3FF) | 0xD800));
                    value = 0xDC00 | (value & 0x3FF);
                }
                output.push(String.fromCharCode(value));
            }
            return output.join("");
        }
    }

    //Default parameters
    var initial_n = 0x80;
    var initial_bias = 72;
    var delimiter = "\x2D";
    var base = 36;
    var damp = 700;
    var tmin=1;
    var tmax=26;
    var skew=38;
    var maxint = 0x7FFFFFFF;

    // decode_digit(cp) returns the numeric value of a basic code 
    // point (for use in representing integers) in the range 0 to
    // base-1, or base if cp is does not represent a value.

    function decode_digit(cp) {
        return cp - 48 < 10 ? cp - 22 : cp - 65 < 26 ? cp - 65 : cp - 97 < 26 ? cp - 97 : base;
    }

    // encode_digit(d,flag) returns the basic code point whose value
    // (when used for representing integers) is d, which needs to be in
    // the range 0 to base-1. The lowercase form is used unless flag is
    // nonzero, in which case the uppercase form is used. The behavior
    // is undefined if flag is nonzero and digit d has no uppercase form. 

    function encode_digit(d, flag) {
        return d + 22 + 75 * (d < 26) - ((flag != 0) << 5);
        //  0..25 map to ASCII a..z or A..Z 
        // 26..35 map to ASCII 0..9
    }
    //** Bias adaptation function **
    function adapt(delta, numpoints, firsttime ) {
        var k;
        delta = firsttime ? Math.floor(delta / damp) : (delta >> 1);
        delta += Math.floor(delta / numpoints);

        for (k = 0; delta > (((base - tmin) * tmax) >> 1); k += base) {
                delta = Math.floor(delta / ( base - tmin ));
        }
        return Math.floor(k + (base - tmin + 1) * delta / (delta + skew));
    }

    // encode_basic(bcp,flag) forces a basic code point to lowercase if flag is zero,
    // uppercase if flag is nonzero, and returns the resulting code point.
    // The code point is unchanged if it is caseless.
    // The behavior is undefined if bcp is not a basic code point.

    function encode_basic(bcp, flag) {
        bcp -= (bcp - 97 < 26) << 5;
        return bcp + ((!flag && (bcp - 65 < 26)) << 5);
    }

    // Main decode
    this.decode=function(input,preserveCase) {
        // Dont use utf16
        var output=[];
        var case_flags=[];
        var input_length = input.length;

        var n, out, i, bias, basic, j, ic, oldi, w, k, digit, t, len;

        // Initialize the state: 

        n = initial_n;
        i = 0;
        bias = initial_bias;

        // Handle the basic code points: Let basic be the number of input code 
        // points before the last delimiter, or 0 if there is none, then
        // copy the first basic code points to the output.

        basic = input.lastIndexOf(delimiter);
        if (basic < 0) basic = 0;

        for (j = 0; j < basic; ++j) {
            if(preserveCase) case_flags[output.length] = ( input.charCodeAt(j) -65 < 26);
            if ( input.charCodeAt(j) >= 0x80) {
                throw new RangeError("Illegal input >= 0x80");
            }
            output.push( input.charCodeAt(j) );
        }

        // Main decoding loop: Start just after the last delimiter if any
        // basic code points were copied; start at the beginning otherwise. 

        for (ic = basic > 0 ? basic + 1 : 0; ic < input_length; ) {

            // ic is the index of the next character to be consumed,

            // Decode a generalized variable-length integer into delta,
            // which gets added to i. The overflow checking is easier
            // if we increase i as we go, then subtract off its starting 
            // value at the end to obtain delta.
            for (oldi = i, w = 1, k = base; ; k += base) {
                    if (ic >= input_length) {
                        throw RangeError ("punycode_bad_input(1)");
                    }
                    digit = decode_digit(input.charCodeAt(ic++));

                    if (digit >= base) {
                        throw RangeError("punycode_bad_input(2)");
                    }
                    if (digit > Math.floor((maxint - i) / w)) {
                        throw RangeError ("punycode_overflow(1)");
                    }
                    i += digit * w;
                    t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
                    if (digit < t) { break; }
                    if (w > Math.floor(maxint / (base - t))) {
                        throw RangeError("punycode_overflow(2)");
                    }
                    w *= (base - t);
            }

            out = output.length + 1;
            bias = adapt(i - oldi, out, oldi === 0);

            // i was supposed to wrap around from out to 0,
            // incrementing n each time, so we'll fix that now: 
            if ( Math.floor(i / out) > maxint - n) {
                throw RangeError("punycode_overflow(3)");
            }
            n += Math.floor( i / out ) ;
            i %= out;

            // Insert n at position i of the output: 
            // Case of last character determines uppercase flag: 
            if (preserveCase) { case_flags.splice(i, 0, input.charCodeAt(ic -1) -65 < 26);}

            output.splice(i, 0, n);
            i++;
        }
        if (preserveCase) {
            for (i = 0, len = output.length; i < len; i++) {
                if (case_flags[i]) {
                    output[i] = (String.fromCharCode(output[i]).toUpperCase()).charCodeAt(0);
                }
            }
        }
        return this.utf16.encode(output);
    };

    //** Main encode function **

    this.encode = function (input,preserveCase) {
        //** Bias adaptation function **

        var n, delta, h, b, bias, j, m, q, k, t, ijv, case_flags;

        if (preserveCase) {
            // Preserve case, step1 of 2: Get a list of the unaltered string
            case_flags = this.utf16.decode(input);
        }
        // Converts the input in UTF-16 to Unicode
        input = this.utf16.decode(input.toLowerCase());

        var input_length = input.length; // Cache the length

        if (preserveCase) {
            // Preserve case, step2 of 2: Modify the list to true/false
            for (j=0; j < input_length; j++) {
                case_flags[j] = input[j] != case_flags[j];
            }
        }

        var output=[];


        // Initialize the state: 
        n = initial_n;
        delta = 0;
        bias = initial_bias;

        // Handle the basic code points: 
        for (j = 0; j < input_length; ++j) {
            if ( input[j] < 0x80) {
                output.push(
                    String.fromCharCode(
                        case_flags ? encode_basic(input[j], case_flags[j]) : input[j]
                    )
                );
            }
        }

        h = b = output.length;

        // h is the number of code points that have been handled, b is the
        // number of basic code points 

        if (b > 0) output.push(delimiter);

        // Main encoding loop: 
        //
        while (h < input_length) {
            // All non-basic code points < n have been
            // handled already. Find the next larger one: 

            for (m = maxint, j = 0; j < input_length; ++j) {
                ijv = input[j];
                if (ijv >= n && ijv < m) m = ijv;
            }

            // Increase delta enough to advance the decoder's
            // <n,i> state to <m,0>, but guard against overflow: 

            if (m - n > Math.floor((maxint - delta) / (h + 1))) {
                throw RangeError("punycode_overflow (1)");
            }
            delta += (m - n) * (h + 1);
            n = m;

            for (j = 0; j < input_length; ++j) {
                ijv = input[j];

                if (ijv < n ) {
                    if (++delta > maxint) return Error("punycode_overflow(2)");
                }

                if (ijv == n) {
                    // Represent delta as a generalized variable-length integer: 
                    for (q = delta, k = base; ; k += base) {
                        t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias;
                        if (q < t) break;
                        output.push( String.fromCharCode(encode_digit(t + (q - t) % (base - t), 0)) );
                        q = Math.floor( (q - t) / (base - t) );
                    }
                    output.push( String.fromCharCode(encode_digit(q, preserveCase && case_flags[j] ? 1:0 )));
                    bias = adapt(delta, h + 1, h == b);
                    delta = 0;
                    ++h;
                }
            }

            ++delta, ++n;
        }
        return output.join("");
    }

    this.ToASCII = function ( domain ) {
        var domain_array = domain.split(".");
        var out = [];
        for (var i=0; i < domain_array.length; ++i) {
            var s = domain_array[i];
            out.push(
                s.match(/[^A-Za-z0-9-]/) ?
                "xn--" + punycode.encode(s) :
                s
            );
        }
        return out.join(".");
    }
    this.ToUnicode = function ( domain ) {
        var domain_array = domain.split(".");
        var out = [];
        for (var i=0; i < domain_array.length; ++i) {
            var s = domain_array[i];
            out.push(
                s.match(/^xn--/) ?
                punycode.decode(s.slice(4)) :
                s
            );
        }
        return out.join(".");
    }
}();