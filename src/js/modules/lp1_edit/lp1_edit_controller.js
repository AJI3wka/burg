;

'use strict';

console.log('lp1_edit.controller start');

lp1_edit.controller = {

    api_url: api_config.default,
    get:function(page_id,callback){

    	var url = lp1_edit.controller.api_url + 'Page';//url запроса получения контента


	    get_json('get', url, {siteID:page_id}, function(data) {//удачное выполнение гет запроса

        	if (callback) {
        		callback(data)
        	}

	    });

    },
    save:function(bg,callback,callback_false){

        var url = lp1_edit.controller.api_url + 'Page/save';

        //gentime - окончание всех ресурсов для обновление кеша, идентифицирует "версию" лендинга, при этом не ересоздает сайт
       
        var send_data = Object.assign({}, lp1_edit.model.cur_data);

        if (!bg) {
        	send_data.publish = 1;
        }

        send_data.template = 'wiv';
        send_data.content = JSON.stringify(send_data.content);

        if(if_defined(send_data.id)){
        	send_data.siteID = send_data.id;
        }

        if(!if_defined(send_data.name)){
        	send_data.name = "Новый сайт"
        }

        if(!if_defined(send_data.domain)){
        	send_data.domain = 'null'
        }

        get_json('post', url, send_data, function(data) {

			var cur_id = getURLParameter('i');

        	if (if_defined(data.data) && if_defined(data.data.addedID)) {
				
				if (!if_defined(lp1_edit.model.cur_data.id) || lp1_edit.model.cur_data.id !=data.data.addedID) {

					lp1_edit.model.cur_data.id = data.data.addedID;
					$('#preview-site').attr('href', '//client.dnk.bz/'+data.data.addedID+'/').show();
					$('#preview-site_s').attr('href', 'https://client.dnk.bz/'+data.data.addedID).html('https://client.dnk.bz/'+data.data.addedID).addClass('active');
					$('#preview-site_s').closest('.w_prewiev').addClass('ready');






					if (if_defined(global_user_data.params.site_type)) {
						if(global_user_data.params.site_type == 'lp1'){
							if(!if_defined(global_user_data.params.started_id)){

								user_tools.model.first_use.set_param({name:'started_id',value:lp1_edit.model.cur_data.id});
								
							}
							
						}
					}
				
				}
	        		
		        if(cur_id != data.data.addedID){

	        		updateQueryStringParam('i',data.data.addedID);

		        	if(cur_id == 'new'){

		        		dnk_atom_events({type:'event',category:'create',action:'lp1',link:data.data.addedID});


		        	}

		        }      

        	}else{

	        	lp1_edit.model.cur_data.id = cur_id;

        	}  	
        	
   			run_module('ls_editors');        	

        	if (if_defined(data)){


				if (if_defined(global_user_data.params.site_type)) {
					if(global_user_data.params.site_type == 'quiz' || global_user_data.params.not_show_s == 'none' || global_user_data.params.not_show_s == 'site_deleted'){

						if(!if_defined(global_user_data.params.started_id)||global_user_data.params.started_id=='false'){

							user_tools.model.first_use.set_param({name:'started_id',value:lp1_edit.model.cur_data.id});

							if (global_user_data.params.not_show_s == 'site_deleted' || global_user_data.params.site_type !='none') {
								user_tools.model.first_use.set_param({name:'site_type',value:'quiz'},function(){

									if (global_user_data.params.not_show_s == 'site_deleted'){

										user_tools.model.first_use.set_param({name:'not_show_s',value:'false'});

									}
								});
							}
							
						}
						
					}
				}	    

        	}			   	


        	if (if_defined(data) && if_defined(data.domain)) {
        		
				$('#domain_prev').attr('href', 'http://'+data.domain).show();
        		$('#domain_prev_s').attr('href', 'http://'+data.domain).html('http://'+data.domain).addClass('active');


				if (if_defined(global_user_data.params.site_type)) {
					if(global_user_data.params.site_type == 'lp1'){
						if(if_defined(global_user_data.params.started_id) && global_user_data.params.started_id == lp1_edit.model.cur_data.id){

							user_tools.model.first_use.set_param({name:'site_ended',value:'true'});
							
						}
						
					}
				}

        	}else{

				$('#domain_prev_s').removeClass('active');
				$('#domain_prev').hide();        		
        	
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
			show_alert_mess(text);

        	if (callback_false) {
        		callback_false()
        	}
        }, bg);
    },
    convert_to_jpg_then_upload:function(img,callback) {

    	var canvas = document.createElement("canvas");
		canvas.width = 1920;
		canvas.height = canvas.width/img.width*img.height;
		// img.width = canvas.width;
		// img.height = canvas.height;
		canvas.getContext("2d").drawImage(img, 0, 0,canvas.width,canvas.height);

		//canvas.width = 980;
		//canvas.height = canvas.width/img.width*img.height;
		//document.body.appendChild(canvas);

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


		var dataURL = canvas.toDataURL("image/jpeg");

		var blob = dataURLtoBlob(dataURL);


        var data = new FormData();


        console.log('blob',blob);
        data.append('file', blob,'blob.jpg');


	    data.append('siteID', lp1_edit.model.cur_data.id);        

        var upload_url = lp1_edit.controller.api_url + 'Page/imageUpload?type=jpg';

        get_json('post', upload_url, data, callback, true);//выполняем выгрузку с колбеком
        

    	// body...
    },
    upload_img:function(elem, type, callback){
    	function upload() {

	    	var $elem = $(elem);

		    var data = new FormData($elem.closest('form')[0]);//формирование form-data c формы(у которой толко 1н инпкт)
		    // var data = new FormData();
		    // var file = elem.files[0];
		    // console.log('FILE = ',file);
		    //var data = new FormData();
		    
		    data.append('siteID', lp1_edit.model.cur_data.id);

		    if ($elem.val() != '') {//если значение поля не пусто

		        /*-------проверка файла на фронте перед выгрузкой старт -------*/
	            var ValidImageTypes = ["image/png", "image/jpeg","image/pjpeg"];//то валидные типы изоббражений
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

		        if (file.size > 100e+6) { //если размер файла больше чем 10 000 000 байт
		            //вывести ошибку пользователю и очистить значение поля
		            show_alert_mess('Максимальный размер файла 100МБ');
		            $elem.val('');
		        } else {


		        	
		            var upload_url = lp1_edit.controller.api_url + 'Page/imageUpload?type=' + type;
		            
		         // if (type == 'quest_bg') {
		         //       upload_url = lp3_edit.controller.api_url + 'page3/' + lp3_edit.model.cur_data.id + '/image/upload?userKey=' + global_user_token + '&type=' + type + '&quest_id=' + quest_id; 
		         //    }else if (type == 'slide') {
		         //       upload_url = lp3_edit.controller.api_url + 'page3/' + lp3_edit.model.cur_data.id + '/image/upload?userKey=' + global_user_token + '&type=' + type + '&block_id=' + block_id+ '&slide_id=' + slide_id; 
		         //    }else if (type == 'block_bg') {
		         //       upload_url = lp3_edit.controller.api_url + 'page3/' + lp3_edit.model.cur_data.id + '/image/upload?userKey=' + global_user_token + '&type=' + type + '&block_id=' + block_id; 
		         //    }
		         //    
		         
		         	if(type == 'download'){
		         		upload_url = lp1_edit.controller.api_url + 'Page/fileUpload';
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

		                   // if (width < 7000 && height < 5000) {//если в пределах границ размеров

		            /*-------проверка файла на фронте перед выгрузкой конец -------*/

		                        console.log('          upload_img() - отправка фотографии');

		                        
		            			if(type=="bg"){
		            				if(width>=1800&&height>=900){

		            					lp1_edit.controller.convert_to_jpg_then_upload(img,callback)

				                        //get_json('post', upload_url, data, callback, true);//выполняем выгрузку с колбеком

		            				}else{

	   									show_confirm('Файл имеет слишком маленькое разрешение<br>мин. ширина изображения - 1800px<br>мин. высота изображения - 900px<br><br>Это ограничение сделано для того, чтобы вы не загружали фото плохого качества. Плохое фото будет убивать конверсию.<br>А мы ведь хотим все, чтобы конверсия была высокой.<br><br>Все равно использовать это изображение?',function(){

		            						lp1_edit.controller.convert_to_jpg_then_upload(img,callback);


	   									});

		            				}
		            			}else{
		            				//lp1_edit.controller.convert_to_jpg_then_upload(img,callback)

		                        	get_json('post', upload_url, data, callback, true);//выполняем выгрузку с колбеком

		            			}
		                    // } else {//если слишком большое разрешение вывести ошибку

		                    //     show_alert_mess('Файл имеет слишком большое разрешение');

		                    // }
		                };

		                img.src = window.URL.createObjectURL(file);//указание картинке src

		            }
		        }
		    }
		}


        if(if_defined(lp1_edit.model.cur_data.id) && lp1_edit.model.cur_data.id != '' && lp1_edit.model.cur_data.id != 'null'){
        


            upload();
        }else{

            lp1_edit.controller.save(false,function(){

                upload();

            },function(){
                        
                lp1_edit.view.end_autosave($this,true);

            });
        }
    },
    check_atom_domain:function(name,callback,callback_false){


    	var url = lp1_edit.controller.api_url+'Page/checkAtomDomain';

	    get_json('post', url, {domain:name+'.'+m_lbl_id}, function(data) {//удачное выполнение гет запроса

        	 if (callback) {
        	 	callback(data);
        	 }

	    },false,function (data) {


			$('#in_domain_prev').hide();  
	        		$('#in_domain_prev_s').removeClass('active');
        	if (callback_false) {
        		callback_false(data)
        	}
			// body...
		});
    },
    attach_atom_domain:function(name,callback,callback_false){


    	var attach = function(){

	    	var url = lp1_edit.controller.api_url+'Page/attachAtomDomain';

	    	var s_data = {siteID:lp1_edit.model.cur_data.id,domain:name+'.'+m_lbl_id};
	    	if(!name){
	    		s_data = {siteID:lp1_edit.model.cur_data.id};
	    	}

		    get_json('post', url, s_data, function(data) {//удачное выполнение гет запроса


	        	if (if_defined(data.checkAtomDomain)) {
	        		
					$('#in_domain_prev').attr('href', 'https://'+data.subdomain+'.'+m_lbl_id).show();
					$('#in_domain_prev_s').attr('href', 'https://'+data.subdomain+'.'+m_lbl_id).html('https://'+data.subdomain+'.'+m_lbl_id).addClass('active');     	

	        		
					if (if_defined(global_user_data.params.site_type)) {
						if(global_user_data.params.site_type == 'lp1'){
							if(if_defined(global_user_data.params.started_id) && global_user_data.params.started_id == lp1_edit.model.cur_data.id){

								user_tools.model.first_use.set_param({name:'site_ended',value:'true'});
								
							}
							
						}
					}

	        	}else{
	        		$('#in_domain_prev_s').removeClass('active');
					$('#in_domain_prev').hide();        		
	        	}     

        	 if (callback) {
        	 	callback(data);
        	 } 

		    },false,function (data) {

				$('#in_domain_prev').hide();       
	        		$('#in_domain_prev_s').removeClass('active');
	        	if (callback_false) {
	        		callback_false(data)
	        	}
				// body...
			});
		}

    	if(if_defined(lp1_edit.model.cur_data.id) && lp1_edit.model.cur_data.id != '' && lp1_edit.model.cur_data.id != 'null'){
    	
    		attach();

    	}else{

	    	lp1_edit.controller.save(false,function(){

    			attach();

	    	},function(){
                        
                lp1_edit.view.end_autosave($this,true);

            });
    	}
    }

}
