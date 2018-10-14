;

'use strict';

console.log('quiz_edit.controller start');

quiz_edit.controller = {

    api_url: api_config.default,
    get:function(page_id,callback){

    	var url = quiz_edit.controller.api_url + 'Page';//url запроса получения контента


	    get_json('get', url, {siteID:page_id}, function(data) {//удачное выполнение гет запроса

        	if (callback) {
        		callback(data)
        	}

	    });

    },
    attach_quiz:function(qid,pageid,callback,callback_false){

    	var url = quiz_edit.controller.api_url+'QUIZ/attachQUIZtoPage';



	    get_json('post', url, {qid:qid,siteID:pageid}, function(data) {//удачное выполнение гет запроса

        	 if (callback) {
        	 	callback(data);
        	 }

	    },false,function () {

        	if (callback_false) {
        		callback_false()
        	}
			// body...
		});

    },
    get_quiz_by_id:function(quiz_id,callback){
    	if (if_defined(quiz_id)&&quiz_id!='new') {

	    	console.log('get_quiz_by_id(',quiz_id,')');
	    	var url = quiz_edit.controller.api_url+'QUIZ/get';

		    get_json('get', url, {qid:quiz_id}, function(data) {//удачное выполнение гет запроса

	        	if (callback) {
	        		callback(data)
	        	}

		    });
    	}else{

	        	if (callback) {
	        		callback();
	        	}
    	}

    },
    save:function(bg,callback,callback_false){

    	console.log('quiz_edit.quiz_edit_controller SAVE')

        var url = quiz_edit.controller.api_url + 'PageQUIZ/save';

        var connect_new = false;

        if (quiz_editor.model.connect_flag == false && !if_defined(quiz_edit.model.cur_data.id)) {

        	if(if_defined(quiz_editor)){
        		quiz_editor.model.save(function(){

        			////alert('save_con');

		        	if (callback) {
		        		callback()
		        	}

        		});
        	}
        	// quiz_editor.model.save();

        	return false;
        }else if(quiz_editor.model.connect_flag == true){
       		quiz_editor.model.connect_flag = false;
        	connect_new = true;

        }

					


        //gentime - окончание всех ресурсов для обновление кеша, идентифицирует "версию" лендинга, при этом не ересоздает сайт
       
        var send_data = Object.assign({}, quiz_edit.model.cur_data);

        if (!bg) {
        	send_data.publish = 1;
        }

        send_data.template = 'quiz';
        send_data.content = JSON.stringify(send_data.content);

        if(if_defined(send_data.id)){
        	send_data.siteID = send_data.id;
        }

        if(!if_defined(send_data.name)){
        	send_data.name = "Новый квиз"
        }

        if(!if_defined(send_data.domain)){
        	send_data.domain = 'null'
        }

        get_json('post', url, send_data, function(data) {

        	console.log('QUIZ PAGE SAVE',data);

			var cur_id = quiz_edit.model.cur_data.id;
        	console.log('QUIZ PAGE SAVE',cur_id);

        	if (if_defined(data.data) && if_defined(data.data.addedID)) {
				
        	console.log('QUIZ PAGE SAVE',if_defined(data.data) && if_defined(data.data.addedID));
				if (!if_defined(quiz_edit.model.cur_data.id) || quiz_edit.model.cur_data.id !=data.data.addedID) {

        	console.log('QUIZ PAGE SAVE',!if_defined(quiz_edit.model.cur_data.id) || quiz_edit.model.cur_data.id !=data.data.addedID);
					quiz_edit.model.cur_data.id = data.data.addedID;
					$('#preview-site').attr('href', '//client.dnk.bz/'+data.data.addedID).show();
					$('#preview-site_s').attr('href', 'https://client.dnk.bz/'+data.data.addedID).html('https://client.dnk.bz/'+data.data.addedID).addClass('active');
					$('#preview-site_s').closest('.w_prewiev').addClass('ready');
									

				}


	        		
		        if(cur_id != data.data.addedID){

        	console.log('QUIZ PAGE SAVE',cur_id != data.data.addedID)
	        		updateQueryStringParam('i',data.data.addedID);

		        	if(cur_id == 'new'){

		        		dnk_atom_events({type:'event',category:'create',action:'lp1',link:data.data.addedID});


		        	}

		        }     

        	}else{
	        	quiz_edit.model.cur_data.id = cur_id;

        	}  	       	
   			quiz_edit.model.site_ready = true;
   			if(if_defined(quiz_edit.model.quiz_ready) && quiz_edit.model.quiz_ready!='false'){
   				quiz_edit.model.editor_ready = true;
   				quiz_edit.view.wrap.find('.hard_request').fadeOut(350);;
   			}
   			run_module('ls_editors');

        	if (if_defined(data) && if_defined(data.domain)) {
        		

				$('#domain_prev').attr('href', 'http://'+data.domain).show();
				$('#domain_prev_s').attr('href', 'http://'+data.domain).html('http://'+data.domain).addClass('active');

				if (if_defined(global_user_data.params.site_type)) {
					if(global_user_data.params.site_type == 'quiz'){
						if(if_defined(global_user_data.params.started_id) && global_user_data.params.started_id == quiz_editor.model.q_data.qid){

							user_tools.model.first_use.set_param({name:'site_ended',value:'true'});
							
						}
						
					}
				} 
					

        	}else{


				$('#domain_prev_s').removeClass('active');
				$('#domain_prev').hide();        		
        	}

        	//alert('connect_new = '+connect_new +'undefined def_page ='+ !if_defined(quiz_editor.model.q_data.content.default_page));
 
	        if(connect_new && !if_defined(quiz_editor.model.q_data.content.default_page)){

				var id = '';
				if(if_defined(data.data.addedID)){
					id = data.data.addedID;
				}else{
					id = quiz_edit.model.cur_data.id;
				}

	        	quiz_edit.controller.attach_quiz(quiz_editor.model.q_data.qid,id,function() {
	        		// body...
		        	if (callback) {
		        		callback(data)
		        	}
	        	},function () {

		        	if (callback_false) {
		        		callback_false()
		        	}
        			// body...
        		});
	        }else if(connect_new && if_defined(quiz_editor.model.q_data.content.default_page)&&!if_defined(data.data)){
				quiz_edit.controller.attach_quiz(quiz_editor.model.q_data.qid,quiz_editor.model.q_data.content.default_page,function() {
	        		// body...
		        	if (callback) {
		        		callback(data)
		        	}
	        	},function () {

		        	if (callback_false) {
		        		callback_false()
		        	}
        			// body...
        		});

	        }else{

	        	if (callback) {
	        		callback(data)
	        	}
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


	    data.append('siteID', quiz_edit.model.cur_data.id);        

        var upload_url = quiz_edit.controller.api_url + 'Page/imageUpload?type=jpg';

        get_json('post', upload_url, data, callback, true);//выполняем выгрузку с колбеком
        

    	// body...
    },
    upload_img:function(elem, type, callback){

    	
    	var upload = function() {


	    	var $elem = $(elem);
		    var data = new FormData($elem.closest('form')[0]);//формирование form-data c формы(у которой толко 1н инпкт)
		    // var data = new FormData();
		    // var file = elem.files[0];
		    // console.log('FILE = ',file);
		    //var data = new FormData();
		    
		    //data.append('siteID', quiz_edit.model.cur_data.id);
		    console.log('SAVE PLEASE',getURLParameter('i'), quiz_edit.model.cur_data.id)
		    data.append('siteID', quiz_edit.model.cur_data.id);

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

		        if (file.size > 10e+6) { //если размер файла больше чем 10 000 000 байт
		            //вывести ошибку пользователю и очистить значение поля
		            show_alert_mess('Максимальный размер файла 10МБ');
		            $elem.val('');
		        } else {


		        	
		            var upload_url = quiz_edit.controller.api_url + 'Page/imageUpload?type=' + type;
		            
		         // if (type == 'quest_bg') {
		         //       upload_url = lp3_edit.controller.api_url + 'page3/' + lp3_edit.model.cur_data.id + '/image/upload?userKey=' + global_user_token + '&type=' + type + '&quest_id=' + quest_id; 
		         //    }else if (type == 'slide') {
		         //       upload_url = lp3_edit.controller.api_url + 'page3/' + lp3_edit.model.cur_data.id + '/image/upload?userKey=' + global_user_token + '&type=' + type + '&block_id=' + block_id+ '&slide_id=' + slide_id; 
		         //    }else if (type == 'block_bg') {
		         //       upload_url = lp3_edit.controller.api_url + 'page3/' + lp3_edit.model.cur_data.id + '/image/upload?userKey=' + global_user_token + '&type=' + type + '&block_id=' + block_id; 
		         //    }
		         //    
		         
		         	if(type == 'download'){
		         		upload_url = quiz_edit.controller.api_url + 'Page/fileUpload';
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

		                    //if (width < 7000 && height < 5000) {//если в пределах границ размеров

		            /*-------проверка файла на фронте перед выгрузкой конец -------*/

		                        console.log('          upload_img() - отправка фотографии');
		            			if(type=="bg"){
		            				if(width>=1800&&height>=900){

		            					quiz_edit.controller.convert_to_jpg_then_upload(img,callback);
		            					//get_json('post', upload_url, data, callback, true);//выполняем выгрузку с колбеком

		            				}else{

	   									//show_alert_mess('Файл имеет слишком маленькое разрешение<br>мин. ширина изображения - 1800px<br>мин. высота изображения - 900px<br>Это ограничение сделано для того, чтобы вы не загружали фото плохого качества. Плохое фото будет убивать конверсию. А мы ведь хотим все, чтобы конверсия была высокой');

	                        			show_confirm('Файл имеет слишком маленькое разрешение<br><br>мин. ширина изображения - 1800px<br>мин. высота изображения - 900px<br><br>Это ограничение сделано для того, чтобы вы не загружали фото плохого качества. Плохое фото будет убивать конверсию.<br>А мы ведь хотим все, чтобы конверсия была высокой.<br><br>Все равно использовать это изображение?',function(){


		            						quiz_edit.controller.convert_to_jpg_then_upload(img,callback);
				                        	//get_json('post', upload_url, data, callback, true);//выпол
	                        			
	                        			});

		            				}
		            			}else{

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

    	if(if_defined(quiz_edit.model.cur_data.id) && quiz_edit.model.cur_data.id != '' && quiz_edit.model.cur_data.id != 'null'){
    	


    		upload();
    	}else{

    		////alert('cont_save')

	    	quiz_edit.controller.save(false,function(){




    			upload();


	    	},function(){
                        
                quiz_edit.view.end_autosave($this,true);

            });
    	}
    },
    check_atom_domain:function(name,callback,callback_false){

    	function attach(){

	    	var url = quiz_edit.controller.api_url+'Page/checkAtomDomain';

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
		
    	}
    	
		if(if_defined(quiz_edit.model.cur_data.id) && quiz_edit.model.cur_data.id != '' && quiz_edit.model.cur_data.id != 'null'){
    	


    		attach();
    	}else{

	    	quiz_edit.controller.save(false,function(){




    			attach();


	    	},function(){
                        
                quiz_edit.view.end_autosave($this,true);

            });
    	}		
    },
    attach_atom_domain:function(name,callback,callback_false){


    	var attach = function(){

	    	var url = quiz_edit.controller.api_url+'Page/attachAtomDomain';

	    	var s_data = {siteID:quiz_edit.model.cur_data.id,domain:name+'.'+m_lbl_id};
	    	if(!name){
	    		s_data = {siteID:quiz_edit.model.cur_data.id};
	    	}

		    get_json('post', url, s_data, function(data) {//удачное выполнение гет запроса


	        	if (if_defined(data.checkAtomDomain)) {
	        		
					$('#in_domain_prev').attr('href', 'https://'+data.subdomain+'.'+m_lbl_id).show();
					$('#in_domain_prev_s').attr('href', 'https://'+data.subdomain+'.'+m_lbl_id).html('https://'+data.subdomain+'.'+m_lbl_id).addClass('active');     	
	        		
					if (if_defined(global_user_data.params.site_type)) {
						if(global_user_data.params.site_type == 'quiz'){
							if(if_defined(global_user_data.params.started_id) && global_user_data.params.started_id == quiz_editor.model.q_data.qid){

								user_tools.model.first_use.set_param({name:'site_ended',value:'true'});
								
							}
							
						}
					}

	        	}else{

					$('#in_domain_prev').hide();   
					$('#in_domain_prev_s').removeClass('active');     		
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

    	if(if_defined(quiz_edit.model.cur_data.id) && quiz_edit.model.cur_data.id != '' && quiz_edit.model.cur_data.id != 'null'){
    	


    		attach();
    	}else{

	    	quiz_edit.controller.save(false,function(){




    			attach();


	    	},function(){
                        
                quiz_edit.view.end_autosave($this,true);

            });
    	}
    }

}
