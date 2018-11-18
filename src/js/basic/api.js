;
'use strict';

//логируем включение скрипта
console.log('api start');

/**
 * [get_json - универсальная функция общения с ATOM API]
 * @param  {[string]} type            [тип запроса get,post,delete]
 * @param  {[string]} url             [url запроса]
 * @param  {[object]} data               [тело запроса(json который запушивается
 *                                    rawом если пост, если гет доступен json
 *                                    только первого уровня)]
 * @param  {[function]} funct         [callback(data) - каллбак функция 
 *                                    при удачном выполнении, data - response
 *                                    с сервера {[obj]}]
 * @param  {[boolean]} is_file      [true/false, true испльзуется для загрузки
 *                                    файлов, для остальных запросов false]
 *                                    [может быть undefined]
 * @param  {[function]} status_ER     [status_ER(data)- каллбак функция 
 *                                    при НЕ удачном выполнении,
 *                                    data - response с сервера {[obj]}]
 *                                    [может быть undefined]
 * @param  {[boolean]} background        [true/false, true испльзуется запросов в
 *                                    фоне: без лоадера, без отображения
 *                                    критической ошибки, по дефолту false]
 *                                    [может быть undefined]
 * @param  {[function]} cookie_function [cookie_function(xhr) запроса, 
 *                                      выполняется только при удачной отправке
 *                                      запроса]
 *                                      [может быть undefined]
 * @param  {[boolean]} own_status_code [true/false - флаг игнорирования обработки
 *                                  ошибки 401(ошибка авторизации)каллбек
 *                                  функция при неудачной отправке]
 *                                  [может быть undefined]
 * @param  {[boolean]} formdata         [true/false - флаг который переключает тип
 *                                   пересылаемых данных formdata/raw соответсвенно
 *                                   Если true входящие данные должны быть объектом 
 *                                   1вого уровня]
 */
function get_json(type, url, data, funct, is_file, status_ER, background, cookie_function, own_status_code,formdata) {
    //універсальна функція роботи з jsonами
    var $loading = $('<div class="loading"><div></div></div>');
    var d = new Date();
    var requestId = d.getTime();

    console.log('   ');
    console.log('>>>>>>>>>>>>>>>>>>request_start');
    console.log('>>> requestId=   ', requestId); //реквест ИД - параметр для упрощения поиска ответа на данный запрос в консоли
    console.log('>>> method=   ', type, '  ', url);
    console.log('>>> target=   ', url);
    console.log('>>> data=   ', data);
    console.log('>>>>>>>>>>>>>>>>>>request_end');
    console.log('   ');

    if (type == 'get') {
        //переработка объекта в строку get если тип зпроса get
        var str = "";
        for (var key in data) {
            if (str != "") {
                str += "&";
            }
            str += key + "=" + data[key];
        }
        data = str;
        dis = true;


    }

    ////alert('before_send_data');
    var dis;
    if (is_file) { //обработка входящего параметра, если параметр существует то это отправка файла
        dis = false; //флаг для парметорв ajax cache и processData
    } else {
        dis = true; //флаг для парметорв ajax cache и processData

        if (type === 'post' && formdata) { //переработка входящего объекта в строку json
            data = JSON.stringify(data);
        }

    }

    if (!background) { //если это не передача в фоне то включаем лоадер

        var loading_data = new Date();
        var time = loading_data.getTime(); //уникальный идентификатор лоадера

        //Вставляем каркас в #loading_wrap и даем ему уникальный идетификатор
        $loading.appendTo('#loading_wrap').attr('data-time', time);
    }

    var send_data = data; //перепозначаем отправляемые данные

    var headers ={};

    if (!formdata && type !== 'get' && !is_file) {

        //send_data = encode_obj_uri(send_data);
        console.log(send_data);
        console.log(JSON.stringify(send_data));
        send_data = JSON_to_URLEncoded(send_data);
        


        //console.log('formdata_pre',send_data);
        //send_data = reparse_object_to_formdata(send_data);
        //console.log('formdata_fin',send_data);
        


        dis = false;

  //dataType: "xml/html/script/json", // expected format for response
        

        content_type: "application/x-www-form-urlencoded", // send as JSON
        headers  = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }



        // var form_data = new FormData();

        // for ( var key in send_data ) {
        //     form_data.append(key, send_data[key]);
        // }
        
        // send_data = form_data;
        console.log('formdata_fin',send_data);
        // dis = false;
    }
    var process_data = dis;
    var content_type = dis;
    if (type == 'get') {
        content_type = "text/plain"
    }
    if (type == 'post') {
        process_data = true;
    }


    $.ajax({
        type: type,
        url: url,
        data: send_data,
        cache: dis,
        headers:headers,
        processData: dis,
        contentType : content_type,
        xhrFields: { withCredentials: true },
        response: 'json',
        success: function(data, status, xhr) {


            //data = decodeURI(data);


            //data = decode_obj_uri(data);
            //
            //
            

            if (data.FRONT_VERSION > global_front_version) {

                updateQueryStringParam('refresh','new_revision');

                document.location.reload();

            }


            if (!background) { //если не фоновый запрос то удаляем лоадер этого запроса с DOM

                $('#loading_wrap').children('.loading[data-time="' + time + '"]').remove();

            }

            //логирование ответа
            console.log('   ');
            console.log('<<<<<<<<<<<<<<<<<response_start');
            console.log('<<< responseId=   ', requestId); //реквест ИД - параметр для упращения поиска твета на данный запрос в консоли
            console.log('<<< method=   ', type, '  ', url);
            console.log('<<< target=   ', url);
            console.log('<<<', data);
            console.log('<<<<<<<<<<<<<<<<<response_end');
            console.log('   ');

            if (data.status === "OK") { // если статус success == true

                if (if_defined(data.warningList)) { //если в ответе пришел ворнинг лист

                    // создание и наполнение пременной сообщений с warningList
                    var message_text = '';

                    for (var i = data.warningList.length - 1; i >= 0; i--) {
                        message_text += data.warningList[i].message + '<br>'
                    }

                    show_alert_mess(message_text); //вывод ворнинг листа в виде ошибки

                }


                //xhr.getResponseHeader('Set-Cookie');

                if(if_defined(funct)){

                    funct(data); //выполнение колбека успешного выполнения запроса
                }

                if (cookie_function) { //если существует параметр cookie_function, выполнение его в виде колбека

                    cookie_function(xhr);

                }

            } else { // если статус success != true

                if (if_defined(status_ER)) { //если есть входящий параметр колбека неудачной отправик выполняем его

                    status_ER(data);

                }else{
                    show_alert_mess(data.msg)
                }

            }

        },
        error: function(xhr, textStatus, errorThrown) {

            //если ошибка передачи
            global_last_err_xhr = xhr;
            console.log('XHR = ',xhr);
            console.log('XHR = ',xhr.status);

            if (!background) { //если не фоновый запрос то удаляем лоадер этого запроса с DOM

                $('#loading_wrap').children('.loading[data-time="' + time + '"]').remove();

            }

            //логирование ответа
            var text = xhr.responseText;
            if(if_defined(xhr.responseText)){
                try
                {
                    text = $.parseJSON(xhr.responseText)
                }
                catch(e)
                {
                  // handle error 
                }
            }

            console.log('   ');
            console.log('<<<<<<<<<<<<<<<<<response_start');
            console.log('<<< method=   ', type, '  ', url);
            console.log('<<< target=   ', url);
            console.log('<<< responseId=   ', requestId); //реквест ИД - параметр для упращения поиска твета на данный запрос в консоли
            console.log('<<< ', text);
            console.log('<<<<<<<<<<<<<<<<<response_end');
            console.log('   ');

            //удаление всех лоадеров
            $('#loading_wrap').children('.loading').remove();

            //присваивание статус кода
            var statusCode = 'Неизвестная ошибка';
            if (text) {

                try
                {
                    statusCode = $.parseJSON(xhr.responseText).statusCode;
                }
                catch(e)
                {
                  // handle error 
                }
              
 
            }
            if(xhr.status == 403 && !own_status_code){

                updateQueryStringParam('refresh','new_session');

                document.location.reload();

            }else
            if (statusCode == 401 && !own_status_code||statusCode == 403 && !own_status_code) {

                //если 401 (ошибка авторизации и нет входящего параметра own_status_code)
                //открыть логин форму для релогина

                //$('#login').attr('data-act', 'relogin'); // в параметр формы data-act вписать relogin, этот парметр влияет на кобек после логина
                //$('#login').arcticmodal();
                open_part('login');
            } else {

                if (typeof status_ER != 'undefined' && xhr.status!=0) {
                    //если есть входящий параметр колбека ошибки выполняем его
                    
                    if (if_defined(xhr.responseJSON)) {

                        status_ER(xhr.responseJSON);
                        
                    }else{

                        status_ER(xhr);
                    }

                } else {

                    // //если нет входящего прааметра ошибки, вписываем текст в какркас критической ошибки и показываем его
                    // var $crit = $('#critical');
                    // $crit.children('p').html($.parseJSON(xhr.responseText).errorMsg);
                    // $crit.show();
                    $('#preload').hide();



                    var err_text = '';
                    
                    if(if_defined(text)){

                        if(if_defined(text.errorMsg)){
                            err_text = text.errorMsg

                        }else{
                            if(if_defined(xhr.status)){
                                err_text = 'Что-то пошло не так<br>Ошибка '+xhr.status+' на '+ url + '<br> Настоятельно рекомендуем перезагрузить страницу';
                            }else{
                                err_text = 'Что-то пошло не так<br>Ошибка на '+ url + '<br>Настоятельно рекомендуем перезагрузить страницу';
                            }
                        }//прячем прелоадер


                        /*костиль всіх костилів початок*/
                        text = text.replace('bool(true)\n','').replace('bool(true)\n','')

                        var data = JSON.parse(text);
                        funct(data);
                        /*костиль всіх костилів кінець*/

                        //show_alert_mess(err_text);                        
                    }else{

                        critical_error();

                    }
                    

                }
            }
        }
    });

}
var global_last_err_xhr = false;


/**
 * [ajax_api аналогичная функция для общаения с CRM_API]
 * @param  {[string]} type      [тип запроса post get]
 * @param  {[string]} url       [url запроса]
 * @param  {[obj]} data         [data запроса(form-data), json объект 1вого уровня]
 * @param  {[function]} funct   [funct(data) - колбек status=OK]
 * @param  {[function]} status_ER [status_ER(data) -  колбек status=ERROR]
 * @param  {[boolean]} ignore    [игнорировать неудачное выполнение]
 * @param  {[boolean]} background    [выполнение в фоне]
 */
function ajax_api(type, url, data, funct, status_ER, ignore,background) {
    //універсальна функція роботи з jsonами
    var $loading = $('<div class="loading"><div></div></div>');
    var send_obj = data;
    if (type == 'get') {
        var string_data = '';
        for (var key in data) {
            string_data += key + '=' + data[key] + '&';
        }
        data = string_data.slice(0, -1);
    }
    if (!ignore) {
        console.log('method=   ' + type);
        console.log('target=   ' + url);
        //console.log('data=   ' + data);
    }
    ////alert('before_send_data');
    //
    //
    

    var loading_data = new Date();
    var time = loading_data.getTime(); //уникальный идентификатор лоадера

    //Вставляем каркас в #loading_wrap и даем ему уникальный идетификатор
    if (!background) {
        $loading.appendTo('#loading_wrap').attr('data-time', time);
    }


    $.ajax({
        type: type,
        url: url,
        data: data,
        xhrFields: {
            withCredentials: true
        },
        response: 'json',
        success: function(data) {

            // for(var key in data){
            //     if(data.hasOwnProperty(key)){
            //         data[ke]
            //     }
            // }


            console.log('NOT_JSON_DATA  = ',data);
            if(typeof data !== 'object'){
                data = JSON.parse(data);

            }
            

            if (!background) {
                //$loading.appendTo('#loading_wrap').attr('data-time', time);
                $('#loading_wrap').children('.loading[data-time="' + time + '"]').remove();
            }

            
            data.send_data = send_obj;

            // if (window.location.hostname == 'localhost') {
            //   data = JSON.parse(data);
            // }
            if (!ignore) {
                console.log('response_start');
                console.log(data);
                console.log('response_end');
            }

            if (data.status == "OK") {

                if (!ignore) {
                    console.log('status=   OK')
                }

                if(if_defined(funct)){
                    funct(data);
                }
            } else {

                if (!data.status) {

                    console.log('status=   undefined');
                    funct(data);
                }

                if (!ignore) {
                    console.log('status=   ' + data.status);
                }
                //message = 'status=   ' + data.status + '<br>';
                if (typeof status_ER != 'undefined') {

                    status_ER(data);
                } else {


                }
                for (var key in data.exp) {
                    if (data.exp.hasOwnProperty(key)) {

                        if (!ignore) {
                            ////alert('json_status_error - ' + key + ':' + data.exp[key]+'on url'+url);
                            console.error('json_status_error - ' + key + ':' + data.exp[key] + 'on url' + url);
                        }
                    }
                }
            }

            if (!ignore) {
                console.log('-------------------------------');
            }
        },
        error: function(xhr) {
            $('#loading_wrap').children('.loading').remove();
            if (!ignore) {
                $('.critical').addClass('active');
            }

            if (!ignore) {
                ////alert('server_error_status=' + xhr.status + ' ' + this.url);
                console.log(xhr.responseText);
                console.log('-------------------------------');
            }
        }
    });


}
