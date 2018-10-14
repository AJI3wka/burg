;

'use strict';

console.log('lp3_edit.controller start');

lp3_edit.controller = {

    api_url: api_config.default,
    upload_file:function(elem, type, callback) {

    	var $elem = $(elem);

	    console.log('lp3_upload_file(',elem, type,')');
	    var data = new FormData($elem.closest('form')[0]);//формирование form-data c формы(у которой толко 1н инпкт)
	   	
	    data.append('siteID', lp3_edit.model.cur_data.id);
	    
	    var quest_id,block_id,slide_id;

	    if ($elem.val() != '') {//если значение поля не пусто

	        var ValidImageTypes;

	        var gentime = new Date().getTime();
	        /*-------проверка файла на фронте перед выгрузкой старт -------*/
	        if (type === 'bg'|| type==='quest_bg' ||type==='block_bg' || type==='slide') {//и тип bg
	            ValidImageTypes = ["image/jpeg","image/pjpeg"];//то валидные типы изоббражений
	            
	            if (type === 'quest_bg') {//quest_bg - используется и для фонов экранов
	                	                
	                var $question_row = $elem.closest('.row-25');
	                
	                if ($question_row.length>0) {//если елемент находится внутри .row-25(это вопрос)
	                    quest_id = $elem.closest('.row-25').attr('data-id');//то идентификатор  = идентификтор вопроса
	                }else{
	                    quest_id = $elem.attr('id');//если нет то идентификатор  = идентификтор елемента
	                }
	                
	                quest_id+='_'+gentime;//домавление строки gentime для решение проблемы с кешем
	            
	            }else 
	            if(type == 'block_bg'||type == 'slide'){ //для этих обеих типов есть атрибут в запросе block_id

	                if(type == 'slide'){

	                    slide_id=gentime;//идентификатор слайда -  строка времени для сброса кеша(что бы урл сорсов картинко не дублировались)
						block_id=$elem.closest('.block_row').find('input[data-upload-type="block_bg"]').attr('id').split('_')[2];//блок ИД - вторая часть иднентификатора с разделителем "_"

	                }else{
						block_id=$elem.closest('.block_row').find('input[data-upload-type="block_bg"]').attr('id').split('_')[2];//блок ИД - вторая часть иднентификатора с разделителем "_"
						block_id+='_'+gentime;//домавление строки gentime для решение проблемы с кешем
	                    
	                }

	            }else {
	                quest_id = parseInt($elem.attr('data-bg-id'));
	            }
	        } else if (type == 'logo'||type == 'social') {//если тип лого или картикна для соц сетей
	            ValidImageTypes = ["image/png", "image/jpeg","image/pjpeg"];//то валидные типы изоббражений

	        } else if (type == 'favicon') {//если тип фавикон
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
	            var upload_url = lp3_edit.controller.api_url + 'Page/imageUpload?type=' + type;
	            
	         // if (type == 'quest_bg') {
	         //       upload_url = lp3_edit.controller.api_url + 'page3/' + lp3_edit.model.cur_data.id + '/image/upload?userKey=' + global_user_token + '&type=' + type + '&quest_id=' + quest_id; 
	         //    }else if (type == 'slide') {
	         //       upload_url = lp3_edit.controller.api_url + 'page3/' + lp3_edit.model.cur_data.id + '/image/upload?userKey=' + global_user_token + '&type=' + type + '&block_id=' + block_id+ '&slide_id=' + slide_id; 
	         //    }else if (type == 'block_bg') {
	         //       upload_url = lp3_edit.controller.api_url + 'page3/' + lp3_edit.model.cur_data.id + '/image/upload?userKey=' + global_user_token + '&type=' + type + '&block_id=' + block_id; 
	         //    }
	         //    
	         
	         	if(type == 'download'){
	         		upload_url = lp3_edit.controller.api_url + 'Page/fileUpload';
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
	    }
	},
	save_page_part:function(part,callback,param){

        if (part == 'blocks_2') {//если часть == blocks_2 - сохранять 2 часть
            part = '2';
        }

        console.log('lp3_save_page_part(',part,' , callback , ',param,')');
        
		//var send_data = {};
        var url;//урл запроса сохраненя
        
        lp3_edit.model.cur_data['main'].gentime = new Date().getTime();//gentime - окончание всех ресурсов для обновление кеша, идентифицирует "версию" лендинга, при этом не ересоздает сайт

        //var send_data = lp3_edit.model.cur_data[part];//данные для отправки - часть кеша
        
	    var new_data = Object.assign({}, lp3_edit.model.cur_data);
        
	    var send_data = {};

	    var content = {};

	    content.screens = {};

	    content.site = new_data.main;
	    content.form = new_data.form;

	    content.screens[1] = new_data[1];
	    content.screens[2] = new_data[2];
	    content.screens[3] = new_data[3];

	    send_data.content = JSON.stringify(content);


        url = lp3_edit.controller.api_url + 'Page3/save';

        //выбор урл и другие манипуляци в зависимости от части в зависимости от части
        // if (part == 'main') {

        //     url = lp3_edit.controller.api_url + 'page3/save?userKey=' + global_user_token;
            

        // }else if(part == '1'){

        //     url = lp3_edit.controller.api_url + 'page3/save/screen/1?userKey=' + global_user_token;

        // }else if(part == '2'){

        //     send_data = lp3_edit.model.make_blocks_object(send_data);//переработка объекта 2 блока в сенд-дата объект первого уровня

        //     url = lp3_edit.controller.api_url + 'page3/save/screen/2?userKey=' + global_user_token;

        // }else if(part == '3'){

        //     send_data = lp3_edit.model.make_questions_object(send_data);//переработка объекта 3 блока в сенд-дата объект первого уровня

        //     url = lp3_edit.controller.api_url + 'page3/save/screen/3?userKey=' + global_user_token;

        // }else if(part == 'form'){

        //     url = lp3_edit.controller.api_url + 'page3/save/form?userKey=' + global_user_token;

        // }

        if(if_defined(new_data.domain)){
        	send_data.domain = new_data.domain;
        }else if(if_defined(new_data.main.domain)){
        	new_data.domain = new_data.main.domain;
        	send_data.domain = new_data.main.domain;
        }else{
        	send_data.domain = "null";
        }

        if(if_defined(new_data.main.name)){
        	send_data.name = new_data.main.name;
        }else{
        	send_data.name = "Новый сайт";
        }

        var page_id = '';
        if (if_defined(lp3_edit.model.cur_data.id)) {
        	page_id = lp3_edit.model.cur_data.id;
        }

        send_data.template = 'page3/wov';//дефолтный шаблон для lp3
        send_data.publish = 0;//по дефолту при сохранении сайт не перегенерируется

        console.log('send_data = ',send_data);

        if (if_defined(page_id)&&page_id!='new') {
            send_data.siteID = page_id;//если есть pageId передаем pageId
        }

        var background = true;
        if(param){//если с входящим параметром
            background = false;//флаг фонового запроса снимаем

            if(param == 'publicate'){//если доп параметр равный publiate это публикация

                send_data.publish = 1;//то меняем входной парамет публикация
            }

        }
        console.log('lp3_save_page_part ',page_id)

        if(if_defined(page_id) || part=='main'){//если существует page_id или часть == main

        	console.log('lp3_save_page_part 2',page_id)
            get_json('post', url, send_data, function(data) {//автосохранение

            //     if(param != 'publicate'){
            //         if(if_defined(data.data.id)){
                        
            //             lp3_edit.model.cur_data.id = data.response.id;//записать в поел page_id

        				// updateQueryStringParam('i',data.response.id)
            //             //$('#editorType').val(ed_type);
            //             //setCookie('dnk_lp3page_id', data.response.id, 0);//записать в куку последнюю редактируемую страницу
            //         }

            //     }


	        	if (if_defined(data.data) && if_defined(data.data.addedID)) {
		        	
		        	lp3_edit.model.cur_data.id = data.data.addedID;
		        	
					var cur_id = getURLParameter('i');
			        if(cur_id != data.data.addedID){

			        	updateQueryStringParam('i',data.data.addedID);

			        	if(cur_id == 'new'){

			        		dnk_atom_events({type:'event',category:'create',action:'lp3',link:data.data.addedID});


			        	}

			        }		        	


	        	}else{
		        	lp3_edit.model.cur_data.id = getURLParameter('i');

	        	}	

	        	lp3_edit.view.wrap.find('.preview').attr('href', 'http://client.dnk.bz/'+lp3_edit.model.cur_data.id+'/');	 

                if (callback) {
                    callback(data);
                }

                }, false,function(data) {

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
        });//параметры запроса
        }
    },
    get_page_by_id:function(page_id, callback) {
	    ////alert('lp3_get_page_by_id');

	    var url = lp3_edit.controller.api_url + 'Page';//url запроса получения контента

	    get_json('get', url, {siteID: page_id}, function(data) {//удачное выполнение гет запроса

	    	var new_data = Object.assign({}, data.data);

	    	new_data.main = new_data.content.site;
	    	new_data[1] = new_data.content.screens[1];
	    	new_data[2] = new_data.content.screens[2];
	    	new_data[3] = new_data.content.screens[3];
	    	new_data.form = new_data.content.form;
	    	new_data.main.name = new_data.name;
	    	if(!if_defined(new_data.domain)){
	    		new_data.domain = null;
	    	}

	        if (callback) {
	            callback(new_data);
	        }

            lp3_edit.model.cur_data.id = page_id;
            lp3_edit.model.cur_data.quiz = data.data.quiz;
	  
	     });

	}
}
