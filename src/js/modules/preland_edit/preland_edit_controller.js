;

'use strict';

console.log('preland_edit.controller start');

preland_edit.controller = {

    api_url: api_config.default,
    get:function(page_id,callback){

    	var url = preland_edit.controller.api_url + 'Page';//url запроса получения контента


	    get_json('get', url, {siteID:page_id}, function(data) {//удачное выполнение гет запроса

        	if (callback) {
        		callback(data)
        	}

	    });

    },
    save:function(bg,callback){

        var url = preland_edit.controller.api_url + 'PagePL/save';

        //gentime - окончание всех ресурсов для обновление кеша, идентифицирует "версию" лендинга, при этом не ересоздает сайт
       
        var send_data = {};
        send_data.content = preland_edit.model.cur_data.content;

        console.log('send_data = ',send_data);

        if (!bg) {
        	send_data.publish = 1;
        }
        if(if_defined(preland_edit.model.cur_data.content.mirror_iframe_trig)){
        	if(preland_edit.model.cur_data.content.mirror_iframe_trig == '1'){

        		send_data.no_mirror = '1';
        	}

        }
        //else{
        	send_data.template = 'preland';
        //}


        if(if_defined(preland_edit.model.cur_data.id)){
        	send_data.siteID = preland_edit.model.cur_data.id;
        }else if(if_defined(preland_edit.model.cur_data.siteID)){
        	send_data.siteID = preland_edit.model.cur_data.siteID;

        }
        if(if_defined(preland_edit.model.cur_data.name)){
        	send_data.name = preland_edit.model.cur_data.name;
        }else{
        	send_data.name = "Новый сайт"
        }

        if(if_defined(preland_edit.model.cur_data.domain)){
        	send_data.domain = preland_edit.model.cur_data.domain;
        }else{
        	send_data.domain = 'null'
        }

        if(if_defined(send_data.content.mirror_domain) && if_defined(send_data.content.mirror_protocol)){
        	send_data.mirror_url = send_data.content.mirror_protocol+send_data.content.mirror_domain;
        	 if(if_defined(send_data.content.mirror_page)){
        	 	send_data.mirror_url+=send_data.content.mirror_page;
        	 }
        }

        if(!if_defined(send_data.mirror_url)){
        	send_data.mirror_url = '';
        }

        send_data.content = JSON.stringify(send_data.content);
        get_json('post', url, send_data, function(data) {
            var cur_id = getURLParameter('i');

            preland_edit.view.wrap.find('.preview').attr('href', 'http://'+send_data.domain+'/');

        	if (if_defined(data.data) && if_defined(data.data.addedID)) {


                if (!if_defined(preland_edit.model.cur_data.id) || preland_edit.model.cur_data.id !=data.data.addedID) {

                    preland_edit.model.cur_data.id = data.data.addedID;
                }
                    
                if(cur_id != data.data.addedID){

                    updateQueryStringParam('i',data.data.addedID);

                    if(cur_id == 'new'){

                        dnk_atom_events({type:'event',category:'create',action:'preland',link:data.data.addedID});


                    }

                }                      

        	}else{
	        	preland_edit.model.cur_data.id = getURLParameter('i');

        	}



                
        	if (callback) {
        		callback(data)
        	}

        }, false, function(data) {

            var text = '';

            if(if_defined(data.exp.domain)){

                        for (var i = 0; i < data.exp.domain.length; i++) {
                            
                            if(text.length!=0){
                                text+='<br>'
                            }
                            if(data.exp.domain[i].indexOf('valid')>-1){

                                text+='Не валидный домен. Введите правильный домен'
                            }else{
                                text+=data.exp.domain[i]
                            }
                        }
            }else{
                if(if_defined(data.msg)){
                    if(data.msg.indexOf('using')>-1||data.domainAlreadyUsing==true){
                        text+='Введенный домен уже подключен к одному из других ваших сайтов'
                    }else{
                        text+=data.msg;
                    }
                }
                if(if_defined(data.exp)&&data.exp.length>0){

                    for(var key in data.exp){
                        if(data.exp.hasOwnPropeprty(key)){
                            for (var i = 0; i < data.exp[key].length; i++) {
                                
                                if(text.length!=0){
                                    text+='<br>'
                                }
                                text+=data.exp[key][i]
                            }
                        }
                    }
                }
            }
            show_alert_mess(text)
        }, bg);
    },
    upload_img:function(elem, type, callback){

        function upload() {
       

        	var $elem = $(elem);

            var data = new FormData($elem.closest('form')[0]);//формирование form-data c формы(у которой толко 1н инпкт)
            // var data = new FormData();
            // var file = elem.files[0];
            // console.log('FILE = ',file);
            //var data = new FormData();
            

            data.append('siteID', preland_edit.model.cur_data.id);

            if ($elem.val() != '') {//если значение поля не пусто

                /*-------проверка файла на фронте перед выгрузкой старт -------*/
                var ValidImageTypes = ["image/jpeg","image/pjpeg"];//то валидные типы изоббражений
                if (type == 'logo' || type == 'social') {//если тип лого
                    ValidImageTypes = ["image/png", "image/jpeg","image/pjpeg"];//то валидные типы изоббражений
                }else if (type == 'favicon') {//если тип фавикон
                    ValidImageTypes = ["image/png", "image/jpeg","image/pjpeg", "image/x-icon", "image/vnd.microsoft.icon"];//то валидные типы изоббражений
                    //ValidImageTypes = ["image/png", "image/jpeg","image/pjpeg"];//то валидные типы изоббражений
                    
                }else if (type == 'download') {//если тип фавикон
                    ValidImageTypes = ["image/png", "image/jpeg","image/pjpeg", "application/pdf", "application/zip", "application/x-tar", "application/vnd.oasis.opendocument.text", "application/vnd.oasis.opendocument.spreadsheet", "application/vnd.oasis.opendocument.presentation", "application/vnd.oasis.opendocument.graphics", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];//то валидные типы изоббражений
                    //ValidImageTypes = ["image/png", "image/jpeg","image/pjpeg"];//то валидные типы изоббражений
                    
                }
                var file = elem.files[0];//получчение файла
                var fileType = file["type"];//получение типа файлооа

               if ($.inArray(fileType, ValidImageTypes) < 0) {//если нет свопадений по типам файлов
                        //вывести ошибку пользователю и очистить значение поля
                        if (type == 'bg'|| type=='quest_bg' ||type=='block_bg' || type=='slide') {
                            show_alert_mess('Файл не является изображением jpeg формата');
                        }else
                        if (type == 'logo'||type == 'social'){
                            show_alert_mess('Файл не является изображением jpeg или png формата');                
                        }else
                        if (type == 'favicon'){
                            show_alert_mess('Файл не является изображением jpeg/png/ico формата');  
                            //show_alert_mess('Файл не является изображением jpeg или png формата');                
                        }else
                        if (type == 'download'){
                            show_alert_mess('Файл не является jpeg/png/pdf/zip/tar/xml/xmlx/doc/docs/ppt/pptx формата');  
                            //show_alert_mess('Файл не является изображением jpeg или png формата');                
                        }

                        $elem.val('');
                   
                }else

                if (file.size > 10e+6) { //если размер файла больше чем 10 000 000 байт
                    //вывести ошибку пользователю и очистить значение поля
                    show_alert_mess('Максимальный размер файла 10МБ');
                    $elem.val('');
                } else {


                    
                    var upload_url = preland_edit.controller.api_url + 'Page/imageUpload?type=' + type;
                    
                 // if (type == 'quest_bg') {
                 //       upload_url = lp3_edit.controller.api_url + 'page3/' + lp3_edit.model.cur_data.id + '/image/upload?userKey=' + global_user_token + '&type=' + type + '&quest_id=' + quest_id; 
                 //    }else if (type == 'slide') {
                 //       upload_url = lp3_edit.controller.api_url + 'page3/' + lp3_edit.model.cur_data.id + '/image/upload?userKey=' + global_user_token + '&type=' + type + '&block_id=' + block_id+ '&slide_id=' + slide_id; 
                 //    }else if (type == 'block_bg') {
                 //       upload_url = lp3_edit.controller.api_url + 'page3/' + lp3_edit.model.cur_data.id + '/image/upload?userKey=' + global_user_token + '&type=' + type + '&block_id=' + block_id; 
                 //    }
                 //    
                 
                    if(type == 'download'){
                        upload_url = preland_edit.controller.api_url + 'Page/fileUpload';
                    }


                    if(type=="download"){

                        console.log('          upload_img() - отправка файла');

                        get_json('post', upload_url, data, callback, true);//выполняем выгрузку с колбеком

                    }else{

                        console.log('pure_js_load');
                        //создание изображения на pure_js
                        var img = new Image();

                        img.onload = function() {//привязка евента по загрузке на него

                            var width = img.naturalWidth,
                                height = img.naturalHeight;
                            // получение ширины и высоты изображения и удаление созданого изобращения
                            window.URL.revokeObjectURL(img.src);

                            if (width < 7000 && height < 5000) {//если в пределах границ размеров

                    /*-------проверка файла на фронте перед выгрузкой конец -------*/

                                console.log('          upload_img() - отправка фотографии');

                            
                                if(type=="bg"){
                                    if(width>=1800&&height>=900){

                                        get_json('post', upload_url, data, callback, true);//выполняем выгрузку с колбеком

                                    }else{

                                        show_alert_mess('Файл имеет слишком маленькое разрешение<br>мин. ширина изображения - 1800px<br>мин. высота изображения - 900px');

                                    }
                                }else{

                                    get_json('post', upload_url, data, callback, true);//выполняем выгрузку с колбеком

                                }
                            } else {//если слишком большое разрешение вывести ошибку

                                show_alert_mess('Файл имеет слишком большое разрешение');

                            }
                        };

                        img.src = window.URL.createObjectURL(file);//указание картинке src

                    }
                }
            }     // body...
        }


        if(if_defined(preland_edit.model.cur_data.id) && preland_edit.model.cur_data.id != '' && preland_edit.model.cur_data.id != 'null'){
        


            upload();
        }else{

            preland_edit.controller.save(false,function(){




                upload();


            });
        }


    }

}
