;

'use strict';

console.log('validation start');

//jq функция которая разрешает в поле только ввод только циферных значений
jQuery.fn.ForceNumericOnly =
    function() {
        return this.each(function() {
            $(this).keydown(function(e) {
                var key = e.charCode || e.keyCode || 0;
                return (
                    key === 8 ||
                    key === 9 ||
                    key === 13 ||
                    key === 46 ||
                    key === 110 ||
                    key === 190 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105));
            });
        });
    };

//jq функция которая разрешает в поле только ввод только значений для написания телефона
jQuery.fn.ForcePhoneOnly =
    function() {
        return this.each(function() {
            $(this).keydown(function(e) {
                var key = e.charCode || e.keyCode || 0;
                return (
                    key === 8 ||
                    key === 9 ||
                    key === 13 ||
                    key === 32 ||
                    key === 107 ||

                    key === 95 ||
                    key === 45 ||
                    key === 173 ||
                    key === 189 ||
                    key === 109 ||

                    key === 46 ||
                    key === 110 ||
                    key === 109 ||
                    key === 190 ||
                    key === 187 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105));
            });
        });
    };

/**
 * [validateEmail функция валидации строки email'а]
 * @param  {string} email [строка которую проверяем]
 * @return {boolean}       [возвращает true если емейл валиден и false если не валиден]
 */
function validateEmail(email) {
    
        var regexp = /^(?!\.)((?!.*\.{2})[a-zA-Z0-9\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFFu20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF\.!#$%&'*+-/=?^_`{|}~\-\d]+)@(?!\.)([a-zA-Z0-9\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF\-\.\d]+)((\.([a-zA-Z\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF]){2,63})+)$/i;
        return regexp.test(email);
}

/**
 * [numberWithSpaces функция которая перерабатывает число в строку с пробелами через каждых 3 розряда. Используется для вывода сумм в балансе]
 * @param  {integer} x [целочиеслоное число]
 * @return {string}   [строка с пробелами]
 */
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * [youtube_parser - получить ИД видео ютуб с ссылки]
 * @param  {[string]} url [ютуб ссылка]
 * @return {[string]}     [ид видео ютуб]
 */
function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}



var validate = {
    selectors:'input.m_valid,textarea.m_valid,textarea,input.valid[type="text"],input.valid[type="password"],input.valid[type="hidden"],input.valid[type="email"]',
    get_parameters:function(type_data){
        //type_data - входящий параметр, идентификатор поля
        console.log('validate.get_parameters(' + type_data + ')'); //логирование запуска функции


        /*------переменные для валидации, длинны полей старт-------*/
        var textarea_min_length = 5; //deafult для текстовых полей min_length
        var textarea_max_length = 9999; //deafult для текстовых полей max_length

        var email_min_length = 5; //email для заявок min_length
        var email_max_length = 40; //email общая max_length

        var pass_min_length = 4; //пароль  min_length
        var pass_max_length = 50; //пароль max_length

        var video_max_length = 150; //ссылка на видео ютуб max_length

        var input_par_min_length = 3; //Дополнительное поле формы  min_length
        var input_par_max_length = 35; //Дополнительное поле формы

        /*------переменные для валидации, длинны полей конец-------*/

        var input_obj = {}; //описание простого объекта

        switch (type_data) { //многократное сравнение и привсваивание параметров обьекту

            case 'quiz_form_btn': //заголовок объявления(возможно не актуально)
                input_obj.name_input = 'Текст для кнопки';
                input_obj.min_length = 5;
                input_obj.max_length = 100;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;
            case 'quiz_form_h1': //заголовок объявления(возможно не актуально)
                input_obj.name_input = 'Заголовок формы';
                input_obj.min_length = 5;
                input_obj.max_length = 100;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;
            case 'quiz_form_h2': //заголовок объявления(возможно не актуально)
                input_obj.name_input = 'Подзаголовок формы';
                input_obj.min_length = 5;
                input_obj.max_length = 150;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;
            case 'quiz_form_g_head': //заголовок объявления(возможно не актуально)
                input_obj.name_input = 'Заголовок подарка';
                input_obj.min_length = 5;
                input_obj.max_length = 100;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;

            case 'quiz_form_g_text': //заголовок объявления(возможно не актуально)
                input_obj.name_input = 'Описание подарка';
                input_obj.min_length = 5;
                input_obj.max_length = 200;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;

            case 'ya_text_h1': //заголовок объявления(возможно не актуально)
                input_obj.name_input = '';
                input_obj.min_length = 5;
                input_obj.max_length = 100;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;

            case 'quiz_title': //заголовок объявления(возможно не актуально)
                input_obj.name_input = 'Шапка вопроса';
                input_obj.min_length = 5;
                input_obj.max_length = 200;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;
            case 'quiz_person_name': //заголовок объявления(возможно не актуально)
                input_obj.name_input = 'Имя менеджера';
                input_obj.min_length = 2;
                input_obj.max_length = 18;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;
            case 'quiz_person_stat': //заголовок объявления(возможно не актуально)
                input_obj.name_input = 'Должность менеджера';
                input_obj.min_length = 2;
                input_obj.max_length = 20;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;


            case 'color_theme': //заголовок объявления(возможно не актуально)
                input_obj.name_input = '';
                input_obj.min_length = 0;
                input_obj.max_length = 100;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;

            case 'n_body_codes': //заголовок объявления(возможно не актуально)
                input_obj.name_input = 'Коды для установки в body';
                input_obj.min_length = 0;
                input_obj.max_length = 9999;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;

            case 'n_head_codes': //заголовок объявления(возможно не актуально)
                input_obj.name_input = 'Коды для установки в head';
                input_obj.min_length = 0;
                input_obj.max_length = 9999;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;
            case 'view_video': //заголовок объявления(возможно не актуально)
                input_obj.name_input = 'Кнопка для видео';
                input_obj.min_length = 3;
                input_obj.max_length = 50;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;

            case 'close_preland': //заголовок объявления(возможно не актуально)
                input_obj.name_input = 'Кнопка закрытия преленда';
                input_obj.min_length = 3;
                input_obj.max_length = 30;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;

            case 'open_preland': //заголовок объявления(возможно не актуально)
                input_obj.name_input = 'Кнопка возвращения на преленд';
                input_obj.min_length = 3;
                input_obj.max_length = 100;
                input_obj.type_of_input = 'textarea'; //этот параметр влияет на валидацию поля и вывод ошибок
                break;
            case 'ya_text_text': //текст объявления объявления(возможно не актуально)
                input_obj.name_input = '';
                input_obj.min_length = 5;
                input_obj.max_length = 75;
                input_obj.type_of_input = 'textarea';
                break;

            case 'land_name':
                input_obj.name_input = '"Название лендинга"';
                input_obj.min_length = 3; //название проекта min_length;
                input_obj.max_length = 30; //название проекта max_length;
                input_obj.type_of_input = 'textarea';
                break;

            case 'inner_domain':
                input_obj.name_input = '"Поддомен на сервисе"';
                input_obj.min_length = 3; //название проекта min_length;
                input_obj.max_length = 30; //название проекта max_length;
                input_obj.type_of_input = 'textarea';
                break;

            case 'quiz_name':
                input_obj.name_input = '"Название квиза"';
                input_obj.min_length = 3; //название проекта min_length;
                input_obj.max_length = 30; //название проекта max_length;
                input_obj.type_of_input = 'textarea';
                break;
            case 'domain':

                input_obj.name_input = '"Домен лендинга"';
                input_obj.min_length = 0;
                input_obj.max_length = 80; //Домен max_length;
                input_obj.type_of_input = 'domain';

                break;

            case 'mirror_domain':

                input_obj.name_input = '"Домен основного сайта"';
                input_obj.min_length = 0;
                input_obj.max_length = 80; //Домен max_length;
                input_obj.type_of_input = 'domain';

                break;
            case 'mirror_page':

                input_obj.name_input = '"Страница размещения преленда"';
                input_obj.min_length = 0;
                input_obj.max_length = 80; //Домен max_length;
                input_obj.type_of_input = 'domain';

                break;
            case 'mirror_iframe_trig':

                input_obj.name_input = '"Альтернтаивное отображение"';
                input_obj.min_length = 1;
                input_obj.max_length = 1; //Домен max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'descriptor':
                input_obj.name_input = '"Дескриптор"';
                input_obj.min_length = textarea_min_length;
                input_obj.max_length = 100; //Дескриптор max_length;
                input_obj.type_of_input = 'textarea';
                break;

            case 'page_title':
                input_obj.name_input = '"Заголовок страницы"';
                input_obj.min_length = textarea_min_length;
                input_obj.max_length = 120; //Заголовок страницы max_length;
                input_obj.type_of_input = 'textarea';
                break;

            case 'what_sell': //Это поле используется только в пошаговом сборщике, который не используется

                input_obj.name_input = '"Что Вы продаете?"';
                input_obj.min_length = textarea_min_length;
                input_obj.max_length = textarea_max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'what_buy': //Это поле используется только в пошаговом сборщике, который не используется

                input_obj.name_input = '"Что покупает клиент?"';
                input_obj.min_length = textarea_min_length;
                input_obj.max_length = textarea_max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'what_take': //Это поле используется только в пошаговом сборщике, который не используется

                input_obj.name_input = '"Что получает клиент?"';
                input_obj.min_length = textarea_min_length;
                input_obj.max_length = textarea_max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'offer_h1':

                input_obj.name_input = '"Оффер основа"';
                input_obj.min_length = textarea_min_length;
                input_obj.max_length = 130; //Оффер основа max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'offer_h2':

                input_obj.name_input = '"Оффер преимущество"';
                input_obj.min_length = textarea_min_length;
                input_obj.max_length = 130; //Оффер преимущество max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'q_offer_h1':

                input_obj.name_input = '"Главный оффер"';
                input_obj.min_length = textarea_min_length;
                input_obj.max_length = 130; //Оффер основа max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'q_offer_h2':

                input_obj.name_input = '"Строчка над оффером"';
                input_obj.min_length = textarea_min_length;
                input_obj.max_length = 130; //Оффер преимущество max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'head_codes':

                input_obj.name_input = '"Google Analytics"';
                input_obj.min_length = 0; //analytica min_length;
                input_obj.max_length = 15; //analytica max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'metrics':

                input_obj.name_input = '"Яндекс Метрика"';
                input_obj.min_length = 0; //metrica min_length;
                input_obj.max_length = 8; //metrica max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'event_submited':

                input_obj.name_input = '"Js код при отправке заявки"';
                input_obj.min_length = 0;
                input_obj.max_length = 500;
                input_obj.type_of_input = 'textarea';

                break;


            // case 'ph1':

            //     input_obj.name_input = '"Код страны(телефон)"';
            //     input_obj.min_length = ph1_min_length;
            //     input_obj.max_length = ph1_max_length;
            //     input_obj.type_of_input = 'phonepart';

            //     break;

            // case 'ph2':

            //     input_obj.name_input = '"Код города(телефон)"';
            //     input_obj.min_length = ph2_min_length;
            //     input_obj.max_length = ph2_max_length;
            //     input_obj.type_of_input = 'phonepart';

            //     break;

            // case 'ph3':

            //     input_obj.name_input = '"Номер телефона"';
            //     input_obj.min_length = ph3_min_length;
            //     input_obj.max_length = ph3_max_length;
            //     input_obj.type_of_input = 'phonepart';

            //     break;

            case 'ph4':

                input_obj.name_input = '"Номер телефона(доп. код)"';
                input_obj.min_length = 0;
                input_obj.max_length = 9;
                input_obj.type_of_input = 'phonepart';

                break;

            case 'ph1':

                input_obj.name_input = '"Номер телефона"';
                input_obj.min_length = 7; //телефон, номер min_length;
                input_obj.max_length = 25; //телефон, номер max_length;
                input_obj.type_of_input = 'phonepart';

                break;

            case 'act_email':

                input_obj.name_input = '"Емейл для заявок"';
                input_obj.min_length = email_min_length;
                input_obj.max_length = email_max_length;
                input_obj.type_of_input = 'email';

                break;

            case 'email':

                input_obj.name_input = '"Емейл"';
                input_obj.min_length = email_min_length;
                input_obj.max_length = email_max_length;
                input_obj.type_of_input = 'email';

                break;

            case 'page_email':

                input_obj.name_input = '"Емейл на странице"';
                input_obj.min_length = 0; //email на странице min_length;
                input_obj.max_length = email_max_length;
                input_obj.type_of_input = 'email';

                break;

            case 'page_addr':

                input_obj.name_input = '"Адрес на странице"';
                input_obj.min_length = textarea_min_length;
                input_obj.max_length = 100; //адрес на странице max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'login':

                input_obj.name_input = '"Логин"';
                input_obj.min_length = email_min_length;
                input_obj.max_length = email_max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'pass':

                input_obj.name_input = '"Пароль"';
                input_obj.min_length = pass_min_length;
                input_obj.max_length = pass_max_length;
                input_obj.type_of_input = 'pass';

                break;

            case 'old_pass':

                input_obj.name_input = '"Старый пароль"';
                input_obj.min_length = pass_min_length;
                input_obj.max_length = pass_max_length;
                input_obj.type_of_input = 'pass';

                break;

            case 'pass_change':

                input_obj.name_input = '"Новый пароль"';
                input_obj.min_length = pass_min_length;
                input_obj.max_length = pass_max_length;
                input_obj.type_of_input = 'pass_confirm';

                break;

            case 'pass_confirm':

                input_obj.name_input = '"Подтверждение"';
                input_obj.min_length = pass_min_length;
                input_obj.max_length = pass_max_length;
                input_obj.type_of_input = 'pass_confirm';

                break;

            case 'video':

                input_obj.name_input = '"Продающее видео"';
                input_obj.min_length = 25; //ссылка на видео ютуб min_length;
                input_obj.max_length = video_max_length;
                input_obj.type_of_input = 'video';

                break;

            case 'logo_img':

                input_obj.name_input = '"Логотип"';
                input_obj.min_length = 0;
                input_obj.max_length = 0;
                input_obj.type_of_input = 'img';

                break;

            case 'form_head':

                input_obj.name_input = '"Надпись на форме"';
                input_obj.min_length = 5; //надпись на форме min_length;
                input_obj.max_length = 120; //надпись на форме max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'form_button':

                input_obj.name_input = '"Надпись на кнопке"';
                input_obj.min_length = 5; //надпись на кнопке min_length;
                input_obj.max_length = 50; //надпись на кнопке max_length;
                input_obj.type_of_input = 'textarea';

                break;

            case 'bg_img_d':

                input_obj.name_input = '"Фон страницы"';
                input_obj.min_length = 0;
                input_obj.max_length = 0;
                input_obj.type_of_input = 'img';

                break;

            case 'form_bg_d':

                input_obj.name_input = '"Фон блока формы"';
                input_obj.min_length = 0;
                input_obj.max_length = 0;
                input_obj.type_of_input = 'img';

                break;

            case 'bg_video':

                input_obj.name_input = '"Видео на фон"';
                input_obj.min_length = 1; //ФОН ссылка на видео ютуб min_length;
                input_obj.max_length = video_max_length;
                input_obj.type_of_input = 'video';

                break;

            case 'input_par_name':

                input_obj.name_input = '"Название поля"';
                input_obj.min_length = input_par_min_length;
                input_obj.max_length = input_par_max_length;
                input_obj.type_of_input = 'input_par';

                break;

            case 'protocol':

                input_obj.name_input = '"Протокол основного сайта"';
                input_obj.min_length = 7;
                input_obj.max_length = 8;
                input_obj.type_of_input = 'protocol';

                break;

            case 'input_par_plac':

                input_obj.name_input = '"Надпись на поле"';
                input_obj.min_length = input_par_min_length;
                input_obj.max_length = input_par_max_length;
                input_obj.type_of_input = 'input_par';

                break;

            case 'input_count':

                input_obj.name_input = '';
                input_obj.min_length = 1;
                input_obj.max_length = 1;
                input_obj.type_of_input = 'input_count';

                break;

            case 'login_p1':

                input_obj.name_input = '"Логин"';
                input_obj.min_length = 1;
                input_obj.max_length = 20;
                input_obj.type_of_input = 'latin_only';

                break;

            case 'login_p2':

                input_obj.name_input = '"Компания"';
                input_obj.min_length = 3;
                input_obj.max_length = 20;
                input_obj.type_of_input = 'latin_only';

                break;

            case 'advertis_name':

                input_obj.name_input = '"Название рекламной кампании"';
                input_obj.min_length = 5;
                input_obj.max_length = 999;
                input_obj.type_of_input = 'textarea';

                break;

            case 'pre_form_offer':

                input_obj.name_input = '"Дополнительный оффер"';
                input_obj.min_length = 0;
                input_obj.max_length = 120;
                input_obj.type_of_input = 'pre_form_offer';

                break;

            case 'q_pre_form_offer':

                input_obj.name_input = '"Строчка под оффером"';
                input_obj.min_length = 10;
                input_obj.max_length = 200;
                input_obj.type_of_input = 'pre_form_offer';

                break;


            case 'lp3_pre_form_offer':

                input_obj.name_input = '"Дополнительный оффер"';
                input_obj.min_length = 0;
                input_obj.max_length = 120;
                input_obj.type_of_input = 'textarea';
                break;

            case 'pre_form_button':

                input_obj.name_input = '"Надпись на кнопке перед формой"';
                input_obj.min_length = 0;
                input_obj.max_length = 65;
                input_obj.type_of_input = 'pre_form_button';

                break;

            case 'q_pre_form_button':

                input_obj.name_input = '"Надпись на кнопке"';
                input_obj.min_length = 3;
                input_obj.max_length = 65;
                input_obj.type_of_input = 'pre_form_button';

                break;

            case 'favicon_img':

                input_obj.name_input = '"Свой фавикон"';
                input_obj.min_length = 0;
                input_obj.max_length = 0;
                input_obj.type_of_input = 'img';

                break;


            case 'og_descriptor':

                input_obj.name_input = '"Описание(description) в соц сетях"';
                input_obj.min_length = 1;
                input_obj.max_length = 120;
                input_obj.type_of_input = 'textarea';

                break;


            case 'og_title':

                input_obj.name_input = '"Заголовок в соц сетях"';
                input_obj.min_length = 1;
                input_obj.max_length = 120;
                input_obj.type_of_input = 'textarea';

                break;


            case 'og_img':

                input_obj.name_input = '"Изображение в соц сетях"';
                input_obj.min_length = 0;
                input_obj.max_length = 0;
                input_obj.type_of_input = 'img';

                break;


            case 'meta_description':
                input_obj.name_input = '"Описание(description)"';
                input_obj.min_length = 1;
                input_obj.max_length = 120;
                input_obj.type_of_input = 'textarea';

                break;


            case 'meta_keywords':
                input_obj.name_input = '"Ключевые слова (keywords)"';
                input_obj.min_length = 1;
                input_obj.max_length = 120;
                input_obj.type_of_input = 'textarea';

                break;

            

            case 'vcard_category':
                input_obj.name_input = '"Категория компании"';
                input_obj.min_length = 1;
                input_obj.max_length = 120;
                input_obj.type_of_input = 'textarea';

                break;

            

            case 'vcard_company':
                input_obj.name_input = '"Название компании"';
                input_obj.min_length = 1;
                input_obj.max_length = 120;
                input_obj.type_of_input = 'textarea';

                break;

            

            case 'vcard_works':
                input_obj.name_input = '"График работы"';
                input_obj.min_length = 1;
                input_obj.max_length = 120;
                input_obj.type_of_input = 'textarea';

                break;


            case 'bg_ekran_1_d':

                input_obj.name_input = '"Фон 1го экрана"';
                input_obj.min_length = 0;
                input_obj.max_length = 0;
                input_obj.type_of_input = 'img';

                break;


            case 'bg_ekran_2_d':

                input_obj.name_input = '"Фон 2го экрана"';
                input_obj.min_length = 0;
                input_obj.max_length = 0;
                input_obj.type_of_input = 'img';

                break;


            case 'block_bg_d':

                input_obj.name_input = '"Фон Блока"';
                input_obj.min_length = 0;
                input_obj.max_length = 0;
                input_obj.type_of_input = 'img';

                break;

            case 'h2_ekran_2':
                input_obj.name_input = '"Заголовок второго экрана"';
                input_obj.min_length = 5;
                input_obj.max_length = 130;
                input_obj.type_of_input = 'textarea';

                break;

            case 'h2_ekran_3':
                input_obj.name_input = '"Заголовок третьего экрана"';
                input_obj.min_length = 5;
                input_obj.max_length = 130;
                input_obj.type_of_input = 'textarea';

                break;

            case 'block_name':

                input_obj.name_input = '"Заголовок блока"';
                input_obj.min_length = 1;
                input_obj.max_length = 36;
                input_obj.type_of_input = 'textarea';

                break;


            case 'block_slide_content':
            
                input_obj.name_input = '"Фото/видео слайда блока"';
                input_obj.min_length = 1;
                input_obj.max_length = 210;
                input_obj.type_of_input = 'textarea';

                break;


            case 'block_slide_video':
            
                input_obj.name_input = '"Видео слайда блока"';
                input_obj.min_length = 0;
                input_obj.max_length = video_max_length;
                input_obj.type_of_input = 'video';

                break;


            case 'block_slide_title':

                input_obj.name_input = '"Подпись слайда"';
                input_obj.min_length = 0;
                input_obj.max_length = 150;
                input_obj.type_of_input = 'textarea';

                break;


            case 'qestion_bg_d':

                input_obj.name_input = '"Фон вопроса"';
                input_obj.min_length = 0;
                input_obj.max_length = 0;
                input_obj.type_of_input = 'img';

                break;


            case 'question_text':

                input_obj.name_input = '"Текст вопроса"';
                input_obj.min_length = 0;
                input_obj.max_length = 50;
                input_obj.type_of_input = 'textarea';

                break;


            case 'answer_text':

                input_obj.name_input = '"Текст ответа"';
                input_obj.min_length = 0;
                input_obj.max_length = 16;
                input_obj.type_of_input = 'textarea';

                break;

            case 'aftersend_text':

                input_obj.name_input = '"Сообщение после отправки формы"';
                input_obj.min_length = 1;
                input_obj.max_length = 150;
                input_obj.type_of_input = 'textarea';

                break;

            case 'requsites_text':

                input_obj.name_input = '"Строка реквизитов снизу сайта"';
                input_obj.min_length = 0;
                input_obj.max_length = 30;
                input_obj.type_of_input = 'textarea';

                break;

            case 'aftersend_file':

                input_obj.name_input = '"Файл просле отправки заявки"';
                input_obj.min_length = 0;
                input_obj.max_length = 0;
                input_obj.type_of_input = 'img';

                break;

            case 'metrics_visor':

                input_obj.name_input = '"Вебвизор метрики"';
                input_obj.min_length = 0;
                input_obj.max_length = 2;
                input_obj.type_of_input = 'textarea';

                break;

        }

        console.log('validate.get_parameters() - return', input_obj); //логирование ответа
        return input_obj;
    },
    live_input:function($elem) {
        //elem - this jqery обьекта, в данном случае поля ввода


        var type_data = $elem.data('input-type'); //получение type_data с тега на елементе
        var inp_value = $elem.val(); //получение значения поля

        var input_obj = validate.get_parameters(type_data); //получение параметров валидации объекта

        console.log('live_validate_input() val = ',inp_value);


        if (input_obj.type_of_input == 'pre_form_offer' ||
            input_obj.type_of_input == 'pre_form_button' ||
            input_obj.type_of_input == 'textarea' ||
            input_obj.type_of_input == 'phonepart' ||
            input_obj.type_of_input == 'email' ||
            input_obj.type_of_input == 'pass' ||
            input_obj.type_of_input == 'video' ||
            input_obj.type_of_input == 'input_par' ||
            input_obj.type_of_input == 'latin_only' ||
            input_obj.type_of_input == 'pass_confirm') {

            //если таких типов выполнить проверку на длинну

            if (inp_value.length > input_obj.max_length) { //если превышена максимальная длинна

                $elem.addClass('error-input error-over'); //накидываем клас ошибки error-input и класс error-over, который потом будем обрабатывать
                console.log('live_validation_input(elem) - ' + type_data + ' - live validation - error - over'); //логирование выполнение функции
                $elem.parent().find('span.how_many').addClass('error-over'); //накидываем класс ошибки на span где отображается статуст по символам

            } else {

                $elem.removeClass('error-input error-empty error-over'); //скидываем классы ошибок
                console.log('live_validation_input(elem) - ' + type_data + ' - live validation - good'); //логирование выполнение функции
                $elem.parent().find('span.how_many').removeClass('error-over'); //скидываем класс ошибки на span где отображается статуст по символам

            }
        }



        var how_many = input_obj.max_length - $elem.val().length; //число оставшихся символов

        var label = $elem.parent(); //элемент .label куда вставляется статус текст

        if ($elem.closest('#lp3_editor_body').length > 0 || $elem.closest('#body').length > 0 || $elem.closest('#preland-edit-body').length > 0 || $elem.closest('#qiuz_helper').length > 0) { //для нового дизайна редактора ЛП3 

            if (label.length > 0) { //и есть елемент .label

                label.addClass('with_how_many');
                $elem.removeClass('error-input');
                // label.siblings('.error_info').text('');

                var ent_length = $elem.val().length;
                var max_length = input_obj.max_length;

                label.find('.how_many').text(ent_length + ' из ' + max_length);

            }

            if (how_many < 0) { //превышено количество символов

                if (label.length > 0) { //есть елемент .label

                    $elem.addClass('error-input');
                    label.siblings('.error_info').text('*превышен лимит символов');

                }
            }

        } else {

            if (how_many > -1) { //если есть еще символы
                if (label.length > 0) { //и есть елемент .label
                    if (label.find('.how_many').length > 0) { //если уже есть статус-текст
                        //скидываем клас ошибки и изменяем контент
                        label.find('.how_many').removeClass('red').html('(осталось ' + how_many + ' симв.)');
                    } else {
                        //Втсавляем статус текст
                        label.append('<span class="how_many">(осталось ' + how_many + ' симв.)</span>');
                    }
                }

            } else { //превышено количество символов

                if (label.length > 0) { //есть елемент .label
                    if (label.children('.how_many').length > 0) { //если уже есть статус-текст
                        //накидываем клас ошибки и пишем сообщение о превышении
                        label.children('.how_many').addClass('red').html('(превышен лимит симв.)');
                    } else {
                        //Втсавляем статус текст
                        label.append('<span class="how_many red">(превышен лимит симв.)</span>');
                    }
                }
            }

        }

    },
    input:function($elem) {
        //elem - this jqery обьекта, в данном случае поля ввода

        var type_data = $elem.data('input-type');

        var inp_value = $elem.val();
        
        
        $elem.removeClass('reqired_inp')

        console.log('validate_input value = ',inp_value);
        
        if ($elem.closest('#lp3_editor_body').length > 0) { //для нового дизайна редактора ЛП3

            //$elem.parent().removeClass('with_how_many');
            //$elem.parent().find('.how_many').text('');

        } else {


            $elem.prev('.label').children('.how_many').remove();
        }

        var input_obj = validate.get_parameters(type_data);

        console.log('validate_input() - input type = ', type_data, '; input value = ', inp_value, '; input_obj = ', input_obj);

        function error_text($elem,text){

                $elem.closest('.field_inp').next('.error_info').text(text);
                $elem.closest('.field_textarea').next('.error_info').text(text);
               
                $elem.closest('.input-field').find('.valid-info').text(text);
        }

        if (input_obj.type_of_input == 'textarea') {

            

            if (inp_value.length < input_obj.min_length) {

                $elem.addClass('error-input error-empty');

                error_text($elem,'*поле не заполнено');
                console.log('validate_input() - ' + type_data + ' - error - empty');

                if (type_data == 'block_slide_content') {
                    $elem.closest('.slide_element').find('label.upload_file_btn').addClass('error-button');
                    $elem.closest('.slide_element').find('.youtube').addClass('error-input').removeClass('valid-input').parent('.video_inp').removeClass('valid-input');  
                }


            } else if (inp_value.length > input_obj.max_length) {

                $elem.addClass('error-input error-over');
                error_text($elem,'*превышен лимит символов');
                console.log('validate_input() - ' + type_data + ' - error - over');


                if (type_data == 'block_slide_content') {

                    $elem.closest('.slide_element').find('label.upload_file_btn').addClass('error-button');
                    $elem.closest('.slide_element').find('.youtube').addClass('error-input').removeClass('valid-input').parent('.video_inp').removeClass('valid-input');
                    
                }

            } else if(type_data == 'answer_text'){

                var $answer_parent = $elem.parent();

                if (!if_defined(inp_value)) {

                    var need_count = 2;

                    var $inputs = $answer_parent.parent().find('input[name="answer_text"]');

                    $inputs.each(function(){

                        if($(this).val().length>0 || $(this).hasClass('error-input')){
                            need_count--;
                        }

                    });

                    if(need_count>0){
                        $inputs.each(function(){

                            if($(this).val().length==0 && need_count>0){

                                $(this).addClass('error-input').addClass('error-answer-must');
                                need_count--;
                                
                            }

                        });

                    }

                }

            }else if(type_data == 'question_text'){

                if (!if_defined(inp_value)) {

                     $elem.addClass('error-input').addClass('error-answer-must');
                }

            } else if (type_data == 'block_slide_content') {

                    $elem.closest('.slide_element').find('label.upload_file_btn').removeClass('error-button');
                    $elem.closest('.slide_element').find('.youtube').removeClass('error-input error-empty error-over error-answer-must').addClass('valid-input').parent('.video_inp').addClass('valid-input');
                    
            } else {
                
                $elem.removeClass('error-input error-empty error-over error-answer-must');
                error_text($elem,'');
                console.log('validate_input() - ' + type_data + ' - good');

            }

        } else

        if (input_obj.type_of_input == 'phonepart') {

            var patt1 = new RegExp(/^\d*$/);

            var patt2 = new RegExp(/^\d\d\d\-\d\d\-\d\d$/);

            var patt_g = new RegExp(/^[\+\d\)\(\ \-\.]{7,25}$/); // проверка номера телефона
            error_text($elem,'');

            if (inp_value.length < input_obj.min_length) {

                $elem.addClass('error-input error-empty');
                error_text($elem,'*поле не заполнено');
                //$elem.closest('.input').addClass('error-input');
                console.log('validate_input() - ' + type_data + ' - error - empty');

            } else if (inp_value.length > input_obj.max_length) {

                $elem.addClass('error-input error-over');
                error_text($elem,'*превышен лимит символов');
                //$elem.closest('.input').addClass('error-input');
                console.log('validate_input() - ' + type_data + ' - error - over');

            } else if (!$elem.hasClass('iph3') && !$elem.hasClass('iph1')) {
                //console.log('validate_input() - '+inp_value);

                if (!patt1.test(inp_value)) {

                    $elem.addClass('error-input error-nonum');
                    //$(elem).closest('.input').addClass('error-input');
                    console.log('validate_input() - ' + type_data + ' - error - nonumber');

                }else{
                    $elem.removeClass('error-input error-empty error-over error-nonum');

                }

            } else if ($elem.hasClass('iph3') && !$elem.hasClass('iph1')) {
                //console.log('validate_input() - '+inp_value);
                if (!patt2.test(inp_value)) {

                    $elem.addClass('error-input error-nonum');
                    //$elem.closest('.input').addClass('error-input');
                    console.log('validate_input() - ' + type_data + ' - error - nonumber');

                }else{
                    $elem.removeClass('error-input error-empty error-over error-nonum');

                }

            } else if (!$elem.hasClass('iph3') && $elem.hasClass('iph1')) {
                //console.log('validate_input() - '+inp_value);
                if (!patt_g.test(inp_value)) {

                    $elem.addClass('error-input error-nonum');
                    //$elem.closest('.input').addClass('error-input');
                    console.log('validate_input() - ' + type_data + ' - error - nonumber');

                }else{
                    $elem.removeClass('error-input error-empty error-over error-nonum');

                }

            } else {
                $elem.removeClass('error-input error-empty error-over error-nonum');
                //$elem.closest('.input').removeClass('error-input');
                console.log('validate_input() - ' + type_data + ' - good');
            }

        } else

        if (input_obj.type_of_input == 'email') {

            if (inp_value.length < input_obj.min_length) {

                $elem.addClass('error-input error-empty');
                error_text($elem,'*поле не заполнено');
                console.log('validate_input() - ' + type_data + ' - error - empty');

            } else if (inp_value.length > input_obj.max_length) {

                $elem.addClass('error-input error-over');
                error_text($elem,'*превышен лимит символов');
                console.log('validate_input() - ' + type_data + ' - error - over');

            } else if (inp_value.length > 0 && !validateEmail(inp_value)) {

                $elem.addClass('error-input error-noemail');
                error_text($elem,'*значение в поле не является емейлом');
                console.log('validate_input() - ' + type_data + ' - error - noemail');

            } else {
                $elem.removeClass('error-input error-empty error-over error-noemail');
                $elem.closest('.field_inp').next('.error_info').text('');
                console.log('validate_input() - ' + type_data + ' - good');
            }

        } else

        if (input_obj.type_of_input == 'pass') {

            //var patt4 = new RegExp(/^[a-zA-Z0-9_-]*$/);

            if (inp_value.length < input_obj.min_length) {

                $elem.addClass('error-input').addClass('error-empty');
                console.log('validate_input() - ' + type_data + ' - error - empty');

            } else if (inp_value.length > input_obj.max_length) {

                $elem.addClass('error-input').addClass('error-over');
                console.log('validate_input() - ' + type_data + ' - error - over');

            // } else if (inp_value.length > 0 && !patt4.test(inp_value)) {

            //     $elem.addClass('error-input').addClass('error-nopass');
            //     console.log('validate_input() - ' + type_data + ' - error - nopass');

            } else {
                $elem.removeClass('error-input').removeClass('error-empty').removeClass('error-over').removeClass('error-nopass');
                console.log('validate_input() - ' + type_data + ' - good');
            }

        } else

        if (input_obj.type_of_input == 'pass_confirm') {

            var patt5 = new RegExp(/^[a-zA-Z0-9_-]*$/);

            if (inp_value.length < input_obj.min_length) {

                $elem.addClass('error-input').addClass('error-empty');
                console.log('validate_input() - ' + type_data + ' - error - empty');

            } else if (inp_value.length > input_obj.max_length) {

                $elem.addClass('error-input').addClass('error-over');
                console.log('validate_input() - ' + type_data + ' - error - over');

            } else if (inp_value.length > 0 && !patt5.test(inp_value)) {

                $elem.addClass('error-input').addClass('error-nopass');
                console.log('validate_input() - ' + type_data + ' - error - nopass');

            } else if (inp_value.length > 0 && $elem.attr('data-confirm') != inp_value) {

                $elem.addClass('error-input').addClass('error-noconfirm');
                console.log('validate_input() - ' + type_data + ' - error - nopass');

            } else {
                $elem.removeClass('error-input').removeClass('error-empty').removeClass('error-over').removeClass('error-noconfirm');
                console.log('validate_input() - ' + type_data + ' - good');
            }

        } else

        if (input_obj.type_of_input == 'video') {

            console.log('validate_input() - ' + 'youtube_video_id = ' + youtube_parser(inp_value));
            $elem.removeClass('valid-input error-input error-empty error-over error-novideo').parent('.video_inp').removeClass('valid-input');

            if (inp_value != '0' && inp_value.length < input_obj.min_length) {

                $elem.addClass('error-input error-empty');
                $elem.closest('.video_field_wrap').find('.error_info').text('*поле не заполнено');
                error_text($elem,'*поле не заполнено');
                console.log('validate_input() - ' + type_data + ' - error - empty');

            } else if (inp_value.length > input_obj.max_length) {

                $elem.addClass('error-input error-over');
                $elem.closest('.video_field_wrap').find('.error_info').text('*превышен лимит символов');
                error_text($elem,'*превышен лимит символов');
                console.log('validate_input() - ' + type_data + ' - error - over');

            } else if (inp_value != '0' && inp_value.length > 0 && !youtube_parser(inp_value)) {

                $elem.addClass('error-input error-novideo');
                $elem.closest('.video_field_wrap').find('.error_info').text('*значение в поле не является видео');
                error_text($elem,'*значение в поле не является видео');
                console.log('validate_input() - ' + type_data + ' - error - novideo');

            } else {

                $elem.closest('.video_field_wrap').find('.error_info').text('');
                error_text($elem,'');

                if (type_data == 'block_slide_video') {
                    if (youtube_parser(inp_value)) {
                        $elem.closest('.slide_element').find('input[name="block_slide_content"]').val(youtube_parser(inp_value)).trigger('blur');
                    }
                } else 
                if (inp_value != '0') {
                    $elem.addClass('valid-input').parent('.video_inp').addClass('valid-input');
                    console.log('validate_input() - ' + type_data + ' - good');
                }
            }

        } else

        if (input_obj.type_of_input == 'img') {

            if (inp_value == '') {

                $elem.addClass('error-input error-empty');

                $elem.closest('.field_inp').find('label.upload_file_btn').addClass('error-button');
                $elem.closest('.question_field').find('label.upload_file_btn').addClass('error-button');
               //$elem.closest('.field_inp').next('.error_info').text('*поле не заполнено');
                error_text($elem,'*поле не заполнено');
                console.log('validate_input() - ' + type_data + ' - error - empty');

            } else {
                $elem.closest('.field_inp').find('label.upload_file_btn').removeClass('error-button');
                $elem.closest('.question_field').find('label.upload_file_btn').removeClass('error-button');
                error_text($elem,'');
                $elem.removeClass('error-input error-empty');
                console.log('validate_input() - ' + type_data + ' - good');
            }

        } else

        if (input_obj.type_of_input == 'input_par') {

            console.log('INPUT_VALUE input_par', inp_value);
            if ($elem.closest('.body').find('input[name="form_custom"]').val() != '0') {

                if (inp_value.length < input_obj.min_length) {

                    $elem.addClass('error-input error-empty');
                    error_text($elem,'*поле не заполнено');
                    console.log('validate_input() - ' + type_data + ' - error - empty');
                } else
                if (inp_value.length > input_obj.max_length) {

                    $elem.addClass('error-input error-over');
                    error_text($elem,'*превышен лимит символов');
                    console.log('validate_input() - ' + type_data + ' - error - over');

                } else {
                    $elem.removeClass('error-input error-empty');
                    error_text($elem,'');
                    console.log('validate_input() - ' + type_data + ' - good');
                }

            }

        } else

        if (input_obj.type_of_input == 'input_count') {

            if (parseInt(inp_value) > 3) {

                $elem.addClass('error-input error-over');
                console.log('validate_input() - ' + type_data + ' - error - over');

            } else {
                $elem.removeClass('error-input error-empty');
                console.log('validate_input() - ' + type_data + ' - good');
            }

        } else

        if (input_obj.type_of_input == 'domain') {

            //var patt = new RegExp(/([a-zа-я0-9|-]+\.)*([a-zа-я0-9|-]+\.)*[a-z0-9|-]+\.[a-zа-я]+/)

            if (inp_value.length > input_obj.max_length) {

                $elem.addClass('error-input error-over');
                error_text($elem,'*превышен лимит символов');
                console.log('validate_input() - ' + type_data + ' - error - over');

                // } else
                //  if (inp_value.length > 0 && !patt.test(inp_value)) {

                //     $elem.addClass('error-input').addClass('error-nodomain');
                //     console.log('validate_input() - '+type_data + ' - error - nodomain');

            } else {
                $elem.removeClass('error-input error-empty error-over error-noemail');
                error_text($elem,'');
                console.log('validate_input() - ' + type_data + ' - good');
            }

        } else

        if (input_obj.type_of_input == 'latin_only') {

            var patt6 = new RegExp(/^[a-z0-9_-]{4,16}$/);

            if (inp_value.length < input_obj.min_length) {

                $elem.addClass('error-input').addClass('error-empty');
                console.log('validate_input() - ' + type_data + ' - error - empty');

            } else

            if (inp_value.length > input_obj.max_length) {

                $elem.addClass('error-input').addClass('error-over');
                console.log('validate_input() - ' + type_data + ' - error - over');

            } else

            if (inp_value.length > 0 && !patt6.test(inp_value)) {

                $elem.addClass('error-input').addClass('error-badchar');
                console.log('validate_input() - ' + type_data + ' - error - badchar');

            } else {
                $elem.removeClass('error-input').removeClass('error-empty').removeClass('error-over').removeClass('error-badchar');
                console.log('validate_input() - ' + type_data + ' - good');
            }

        } else

        if (input_obj.type_of_input == 'pre_form_offer') {

            //console.log('validate_input() - ' + 'youtube_video_id = ' + youtube_parser(inp_value));

            if (inp_value != '' && inp_value != '0' && inp_value.length < input_obj.min_length) {

                $elem.addClass('error-input error-empty');
                error_text($elem,'*поле не заполнено');
                console.log('validate_input() - ' + type_data + ' - error - empty');

            } else if (inp_value.length > input_obj.max_length) {

                $elem.addClass('error-input error-over');
                error_text($elem,'*превышен лимит символов');
                console.log('validate_input() - ' + type_data + ' - error - over');

            } else {
                $elem.removeClass('error-input error-empty error-over error-novideo');
                error_text($elem,'');
                console.log('validate_input() - ' + type_data + ' - good');
            }

        } else

        if (input_obj.type_of_input == 'pre_form_button') {

            //console.log('validate_input() - ' + 'youtube_video_id = ' + youtube_parser(inp_value));

            if (inp_value != '0' && inp_value.length < input_obj.min_length) {

                $elem.addClass('error-input error-empty');
                error_text($elem,'*поле не заполнено');
                console.log('validate_input() - ' + type_data + ' - error - empty');

            } else if (inp_value.length > input_obj.max_length) {

                $elem.addClass('error-input error-over');
                error_text($elem,'*превышен лимит символов');
                console.log('validate_input() - ' + type_data + ' - error - over');

            } else {
                $elem.removeClass('error-input error-empty error-over error-novideo');
                error_text($elem,'');
                console.log('validate_input() - ' + type_data + ' - good');
            }

        } else {

            if (inp_value != '0' && inp_value.length < input_obj.min_length) {

                $elem.addClass('error-input error-empty');
                error_text($elem,'*поле не заполнено');
                console.log('validate_input() - ' + type_data + ' - error - empty');

            } else if (inp_value.length > input_obj.max_length) {

                $elem.addClass('error-input error-over');
                error_text($elem,'*превышен лимит символов');
                console.log('validate_input() - ' + type_data + ' - error - over');

            } else {
                $elem.removeClass('error-input error-empty error-over error-novideo');
                error_text($elem,'');
                console.log('validate_input() - ' + type_data + ' - good');
            }

        }

    },
    wrap:function($wrap, if_good) {
        //$wrap - $(element) области валидации
        //if_good - function(){} удачной валидации

        console.log('          validate_wrap() - start');


        var questions_validation_flag = false;
        var $questions_block_wrap = $wrap.find('#questions_col');

        if ($questions_block_wrap.length>0 && page_object_in_cache[3].questions.length>0 && $questions_block_wrap.hasClass('active')) {
            questions_validation_flag = true;
            lp3_validate_qestions();
        }

        $wrap.find(validate.selectors).each(function(index, el) {

            var input_type = $(el).attr('data-input-type');

            if(input_type == 'answer_text' || input_type == 'question_text' || input_type == 'qestion_bg_d' || input_type == 'qestion_bg_m'){

                if(questions_validation_flag == true){
                   validate.input($(el));
                }

            }else{

                validate.input($(el)); //валидация каждого елемента
            
            }


        });


        if (!$wrap.find('.trig[data-target="step_form"]').hasClass('active')) {

            $questions_block_wrap.find(validate.selectors).removeClass('error-input')

        }

        $wrap.find('.trig_btn[data-target="block_bg"]').each(function(){
            if (!$(this).hasClass('active')) {
                $(this).closest('.field_wrap').find('.error-input,.error-button').removeClass('error-input error-button');
            }
        });

        var $errors_elements = $wrap.find('.error-input'); //полля ввода с ошибками

        if ($errors_elements.length == 0) { //если полей с обшибками нет

            // if (wrap.is('section')) {

            //     $('.' + active_step_class).addClass('passed');

            // }

            if_good(); //выполнене коллбека

            console.log('          validate_wrap() - ' + 'validation - true');
            console.log('          _______________');

        } else {

            console.log('          validate_wrap() - ' + 'validation - false');
            console.log('          _______________');

            /*------------Старт обработки ошибок заполнения и вывод пользователю-----------*/
            var $errors_w = $('#errors');
            var $errors_wrap = $errors_w.find('p');
            $errors_wrap.html('');
            
            var scroll_to = 'none';
                var err_caracas='';

            var step = 'none';                

            $errors_elements.each(function() {

                var type_data = $(this).data('input-type');
                var error_text;


                if(document.location.pathname.indexOf('edit_by_step')>-1){

                    var $this = $(this);
                    if($this.closest('.file_inp').length>0){
                        $this = $this.closest('.file_inp');
                    }
                    $this.addClass('drag_error');

                    setTimeout(function(){
                        $this.removeClass('drag_error');

                    },2000);


                }else{

                var top_offset;
                    if ($(this).closest('.slide-element').length>0) {
                        top_offset = $(this).closest('.slide-element').offset().top - 170 + $(this).closest('.step').scrollTop();
                    }else
                    if($(this).closest('.row-25').length>0){
                        top_offset = $(this).closest('.row-25').offset().top - 170 + $(this).closest('.step').scrollTop();

                    }else
                    if($(this).closest('.field_inp').length>0){
                        top_offset = $(this).closest('.field_inp').offset().top - 170 + $(this).closest('.step').scrollTop();

                    }else
                    if($(this).closest('.field_textarea').length>0){
                        top_offset = $(this).closest('.field_textarea').offset().top - 170 + $(this).closest('.step').scrollTop();

                    }else {
                            if($(this).closest('.inp-wrap').length>0)
                        top_offset = $(this).closest('.inp-wrap').offset().top - 170 + $(this).closest('.step').scrollTop();
                    }
                if (scroll_to == 'none') {
                    scroll_to = top_offset;
                    step = +$(this).closest('.step').attr('data-step');
                }

                var input_obj = validate.get_parameters(type_data);

                if (input_obj.type_of_input == 'textarea') {

                    if ($(this).hasClass('error-empty')) {
                        error_text = '<span>Поле ' + input_obj.name_input + ' не заполнено</span>';
                        
                        if (err_caracas.indexOf(error_text) == -1) {

                            err_caracas+=error_text;
                            
                        }
                    } else

                    if ($(this).hasClass('error-over')) {
                        error_text = '<span>Превышен лимит символов (' + input_obj.max_length + ') в поле ' + input_obj.name_input + '</span>';
                        
                        err_caracas+=error_text;
                    }

                    if($(this).hasClass('error-answer-must')){
                        error_text = '<span>Поле ' + input_obj.name_input + ' не заполнено</span>';
                        
                        if (err_caracas.indexOf(error_text) == -1) {
                            err_caracas+=error_text;
                        }
                    }
                } else

                if (input_obj.type_of_input == 'phonepart') {

                    if ($(this).hasClass('error-empty')) {
                        error_text = '<span>Поле ' + input_obj.name_input + ' не заполнено</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-over')) {
                        error_text = '<span>Превышен лимит символов (' + input_obj.max_length + ') в поле ' + input_obj.name_input + '</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-nonum')) {
                        error_text = '<span>Символы в поле ' + input_obj.name_input + ' должны быть цифрами</span>';
                        
                        err_caracas+=error_text;
                    }

                } else

                if (input_obj.type_of_input == 'email') {

                    if ($(this).hasClass('error-empty')) {
                        error_text = '<span>Поле ' + input_obj.name_input + ' не заполнено</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-over')) {
                        error_text = '<span>Превышен лимит символов (' + input_obj.max_length + ') в поле ' + input_obj.name_input + '</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-noemail')) {
                        error_text = '<span>Значение в поле ' + input_obj.name_input + ' не является емейлом</span>';
                        
                        err_caracas+=error_text;
                    }

                } else

                if (input_obj.type_of_input == 'pass') {

                    if ($(this).hasClass('error-empty')) {
                        error_text = '<span>Поле ' + input_obj.name_input + ' не заполнено</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-over')) {
                        error_text = '<span>Превышен лимит символов (' + input_obj.max_length + ') в поле ' + input_obj.name_input + '</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-nopass')) {
                        error_text = '<span>Значение в поле ' + input_obj.name_input + ' должно состоять из латинских букв и цифр</span>';
                        
                        err_caracas+=error_text;
                    }

                } else

                if (input_obj.type_of_input == 'pass_confirm') {

                    if ($(this).hasClass('error-empty')) {
                        error_text = '<span>Поле ' + input_obj.name_input + ' не заполнено</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-over')) {
                        error_text = '<span>Превышен лимит символов (' + input_obj.max_length + ') в поле ' + input_obj.name_input + '</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-nopass')) {
                        error_text = '<span>Значение в поле ' + input_obj.name_input + ' должно состоять из латинских букв и цифр</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-noconfirm')) {
                        error_text = '<span>Значение пароля в поле ' + input_obj.name_input + ' не совпадает с основным</span>';
                        
                        err_caracas+=error_text;
                    }

                } else

                if (input_obj.type_of_input == 'video') {

                    if ($(this).hasClass('error-empty')) {
                        error_text = '<span>Поле ' + input_obj.name_input + ' не заполнено</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-over')) {
                        error_text = '<span>Превышен лимит символов (' + input_obj.max_length + ') в поле ' + input_obj.name_input + '</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-novideo')) {
                        error_text = '<span>Значение в поле ' + input_obj.name_input + ' не ссылка на youtube</span>';
                        
                        err_caracas+=error_text;
                    }

                } else

                if (input_obj.type_of_input == 'img') {

                    if ($(this).val() == '') {
                        error_text = '<span>Поле ' + input_obj.name_input + ' не заполнено</span>';
                        
                        if (err_caracas.indexOf(error_text) == -1) {

                            
                            err_caracas+=error_text;

                        }

                    }

                } else

                if (input_obj.type_of_input == 'input_par') {

                    if ($(this).hasClass('error-empty')) {
                        error_text = '<span>Поле ' + input_obj.name_input + ' не заполнено</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-over')) {
                        error_text = '<span>Превышен лимит символов (' + input_obj.max_length + ') в поле ' + input_obj.name_input + '</span>';
                        
                        err_caracas+=error_text;
                    }
                } else

                if (input_obj.type_of_input == 'input_count') {

                    if ($(this).hasClass('error-over')) {
                        error_text = '<span>Максимальное количество полей для формы - 3</span>';
                        
                        err_caracas+=error_text;
                    }
                } else

                if (input_obj.type_of_input == 'domain') {


                    if ($(this).hasClass('error-over')) {
                        error_text = '<span>Превышен лимит символов (' + input_obj.max_length + ') в поле ' + input_obj.name_input + '</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-nodomain')) {
                        error_text = '<span>Значение в поле ' + input_obj.name_input + ' не является доменом</span>';
                        
                        err_caracas+=error_text;
                    }

                } else

                if (input_obj.type_of_input == 'latin_only') {

                    if ($(this).hasClass('error-empty')) {
                        error_text = '<span>Поле ' + input_obj.name_input + ' не заполнено</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-over')) {
                        error_text = '<span>Превышен лимит символов (' + input_obj.max_length + ') в поле ' + input_obj.name_input + '</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-badchar')) {
                        error_text = '<span>Значение в поле ' + input_obj.name_input + ' должо содержать только буквы латнского алфавита, цифры, дефисы и подчеркивания</span>';
                        
                        err_caracas+=error_text;
                    }

                } else

                if (input_obj.type_of_input == 'pre_form_button') {

                    if ($(this).hasClass('error-empty')) {
                        error_text = '<span>Поле ' + input_obj.name_input + ' не заполнено</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-over')) {
                        error_text = '<span>Превышен лимит символов (' + input_obj.max_length + ') в поле ' + input_obj.name_input + '</span>';
                        
                        err_caracas+=error_text;
                    }

                } else

                if (input_obj.type_of_input == 'pre_form_offer') {

                    if ($(this).hasClass('error-empty')) {
                        error_text = '<span>Поле ' + input_obj.name_input + ' не заполнено</span>';
                        
                        err_caracas+=error_text;
                    } else

                    if ($(this).hasClass('error-over')) {
                        error_text = '<span>Превышен лимит символов (' + input_obj.max_length + ') в поле ' + input_obj.name_input + '</span>';
                        
                        err_caracas+=error_text;
                    }

                }


                }

            });

            if(document.location.pathname.indexOf('edit_by_step')>-1){
            }else{

                $errors_wrap.append(err_caracas);
                console.log('scroll_to = ',scroll_to);
                if(scroll_to !='none'){
                    $('.steps_pager_item[data-step="'+step+'"]').trigger('click');  
                    $('.step[data-step="'+step+'"]').animate({scrollTop:scroll_to},
                        300);
                }
                //$("body").scrollTop(scroll_to);
                //$("html").scrollTop(scroll_to);
                $errors_w.arcticmodal();
                
            }

            /*------------Конец обработки ошибок заполнения и вывод пользователю-----------*/
        }

        console.log('          validate_wrap() - end');
    },
    live_handler:function(){
        validate.live_input($(this));
    },

    live:function($wrap){
        $wrap.find(validate.selectors).unbind('focus keyup',validate.live_handler);
        $wrap.find(validate.selectors).on('focus keyup',validate.live_handler);
    },

};


$(document).ready(function() {

    $('input[data-input-type="domain"]').on('keyup',function(){
        $(this).val($(this).val().replace(' ', ''));
    })
    
});

