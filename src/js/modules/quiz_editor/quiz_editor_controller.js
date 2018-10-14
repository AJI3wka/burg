;

'use strict';

console.log('quiz_editor.controller start');

quiz_editor.controller = {
	global_adding_flag:false,
    api_url: api_config.default,
    send_crop:function(options,elem,callback) {

    	console.log('crop_options = ',options);     
	    var data = new FormData($(elem).closest('form')[0]);
     //    console.log('blob',blob);
     //    data.append('file', blob,'blob.'+type);


			data.append('siteID', getURLParameter('i'));    
			data.append('x',options.x);           
			data.append('y',options.y);     
			data.append('width',options.width);     
			data.append('height',options.height);     
			data.append('scale',options.scale);    

        var upload_url = quiz_editor.controller.api_url + 'Page/imageUpload?type=crop';
        get_json('post', upload_url, data, callback, true);//выполняем выгрузку с колбеком
        

    },
    send_blob:function(type,blob,callback) {



        var data = new FormData();


        console.log('blob',blob);
        data.append('file', blob,'blob.'+type);


	    data.append('siteID', getURLParameter('i'));        

        var upload_url = quiz_editor.controller.api_url + 'Page/imageUpload?type=' + type;
        get_json('post', upload_url, data, callback, true);//выполняем выгрузку с колбеком
        

    },
    save:function(in_data,callback,no_bg){


    	function quiz_ready(){

    		if(if_defined(quiz_edit)){

	   			quiz_edit.model.quiz_ready = true;
	   			if(if_defined(quiz_edit.model.site_ready) && quiz_edit.model.site_ready!='false'){
	   				quiz_edit.model.editor_ready = true;
	   				quiz_edit.view.wrap.find('.hard_request').fadeOut(350);
	   			}
    		}
    	}

    	var add = false;


    	var can_be_ad = false;


    	var url = quiz_editor.controller.api_url+'QUIZ/update';

    	if (!if_defined(in_data.qid)) {

    		add = true;

			url = quiz_editor.controller.api_url+'QUIZ/add';

    	}else{
    		if (!if_defined(in_data.content.default_page)) {

    			add = true;
    		}
    	}

    	console.log('quiz_editor_controller in_data =',in_data.qid,in_data.content,in_data,in_data.content.default_page,add);
    	//alert('model_save = '+in_data.content.default_page);

    	in_data.content = JSON.stringify(in_data.content);

    	if (!add) {


		    get_json('post', url, in_data, function(data) {//удачное выполнение гет запроса


	        	if (callback) {
	        		callback(data)
	        	}

		    },false,function(){},!no_bg);
	    		
    	}else{

    		if(!quiz_editor.controller.global_adding_flag){

    			quiz_editor.controller.global_adding_flag = true;
			    get_json('post', url, in_data, function(data) {//удачное выполнение гет запроса

			    	var id = getURLParameter('qi');

			    	if (if_defined(data.data)) {
			    		id = data.data.id

				    	quiz_editor.model.q_data.qid = data.data.id;
				    	updateQueryStringParam('qi',data.data.id);
			    	}else{

			    	}

	    			quiz_editor.model.connect_flag = true;
	    			quiz_editor.controller.global_adding_flag = false;


						quiz_editor.controller.usages(id,function(data){
							//var no_attached = false;
							var f_quiz = 0;
							var last_finded = '';
							var fact_adding = true;
							if (data.data.length>0) {

								for (var i = data.data.length - 1; i >= 0; i--) {
									if(data.data[i].template == 'quiz'){
										f_quiz++;
										last_finded = data.data[i].id;
									}
								}
							}

			    			if(typeof quiz_edit != 'undefined'){


			    				////alert('f_quiz = '+f_quiz+' last_finded = '+last_finded);
			    				if (f_quiz == 1) {


									quiz_editor.model.q_data.content.default_page = last_finded;
									quiz_edit.model.cur_data.id = last_finded;
									f_quiz --;
									fact_adding = false;


			    				}

			    				if (f_quiz == 0) {


									quiz_edit.controller.save(false,function(data){

										if (fact_adding) {
											if (if_defined(data.data)) {
												quiz_editor.model.q_data.content.default_page = data.data.addedID;

											}else{
												quiz_editor.model.q_data.content.default_page = quiz_edit.model.cur_data.id;
											}
										}else{

											quiz_editor.model.q_data.content.default_page = last_finded;
										}

										// if (if_defined(global_user_data.params.site_type)) {
										// 	if(global_user_data.params.site_type == 'quiz'){
										// 		if(!if_defined(global_user_data.params.started_id)){

										// 			user_tools.model.first_use.set_param({name:'started_id',value:quiz_editor.model.q_data.qid});
													
										// 		}
												
										// 	}
										// }


										if (if_defined(global_user_data.params.site_type)) {
											if(global_user_data.params.site_type == 'quiz' || global_user_data.params.not_show_s == 'none' || global_user_data.params.not_show_s == 'site_deleted'){

												if(!if_defined(global_user_data.params.started_id)||global_user_data.params.started_id=='false'){

													user_tools.model.first_use.set_param({name:'started_id',value:quiz_editor.model.q_data.qid});

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


										if (fact_adding && if_defined(data.data)) {
											quiz_editor.model.save(function () {
												quiz_ready();
												if(callback){
													callback();
												}
												// body...
											});
										}
										// else{
										// 	if (!fact_adding && !if_defined(data.data)) {
										// 		quiz_editor.model.save();
										// 	}
										// }

									});
	
			    				}									
			    				
			    			}else{
			    				if(if_defined(lp1_edit)){

			    				}
			    			}

						});

			    	//quiz_editor.model.save();

			    },false,function(){},!no_bg);
    	
    		}else{
    			
				if(callback){
					callback();
				}
    		}
    	}

    	in_data.content = JSON.parse(in_data.content);//!important;
    },
    usages:function(id,callback){

    	if(if_defined(id)){

	    	var url = quiz_editor.controller.api_url+'QUIZ/findUsages'


		    get_json('get', url, {qid:id}, function(data) {//удачное выполнение гет запроса

	        	if (callback) {
	        		callback(data)
	        	}

		    });

    	}

    },
    get_quiz:function(id,callback){
    	if (if_defined(id)&&id!='new') {

	    	var url = quiz_editor.controller.api_url+'QUIZ/get'


		    get_json('get', url, {qid:id}, function(data) {//удачное выполнение гет запроса

	        	if (callback) {
	        		callback(data)
	        	}

		    });
    	}else{
    		
	        	if (callback) {
	        		callback()
	        	}
    	}
    },
    upload_file:function(elem, type, callback) {

    	var $elem = $(elem);

	    console.log('lp3_upload_file(',elem, type,')');
	    var data = new FormData($elem.closest('form')[0]);//формирование form-data c формы(у которой толко 1н инпкт)
	   	
	    data.append('siteID', quiz_edit.model.cur_data.id);
	    
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
	                //quest_id = parseInt($elem.attr('data-bg-id'));
	            }
	        } else if (type == 'logo'||type == 'social' || type==='q_logo' || type==='q_gift' || type==='q_fbg' || type==='q_ans_2' || type==='q_ans_3' || type==='q_man') {//если тип лого или картикна для соц сетей
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
	                if (type == 'bg'|| type=='quest_bg' ||type=='block_bg' || type=='slide' ||type==='block_bg' || type==='slide') {
	                    show_alert_mess('Файл не является изображением jpeg формата');
	                }else
	                if (type == 'logo'||type == 'social'|| type==='q_logo' || type==='q_gift' || type==='q_fbg' || type==='q_ans_2' || type==='q_ans_3' || type==='q_man'){
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
	            var upload_url = quiz_editor.controller.api_url + 'Page/imageUpload?type=' + type;
	            
	         	if(type == 'download'){
	         		upload_url = quiz_editor.controller.api_url + 'Page/fileUpload';
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

	                        get_json('post', upload_url, data, callback, true);//выполняем выгрузку с колбеком

	                    } else {//если слишком большое разрешение вывести ошибку

	                        show_alert_mess('Файл имеет слишком большое разрешение');

	                    }
	                };

	                img.src = window.URL.createObjectURL(file);//указание картинке src

	            }

	        }
	    }
	},
	load_quiz_list:function(callback) {

        // var url = quiz_editor.controller.api_url + 'QUIZ';

        // get_json('get', url, {}, function(data) {

        //     if (callback) { //если есть колбек выполняем его
        //         callback(data.data);

        //     }

        // });
		


        var data_hash = {
            userKey: global_user_token,
            filter: 'page'
        };
        var url = quiz_editor.controller.api_url + 'Pages?pageType=quiz';

        get_json('get', url, data_hash, function(data) {

            if (callback) { //если есть колбек выполняем его
                callback(data.data);

            }

        });


	},

    attach_quiz_to_page:function(id,page_id,callback){



        var data = {
            qid:id,
            siteID: page_id
        };

        if (page_id) {

        	if (!id) {
        		data = {
        			 siteID: page_id
        		}
        	}

	        var url = quiz_editor.controller.api_url + 'QUIZ/attachQUIZtoPage';

	        get_json('post', url, data, function(data) {

	            if (callback) { //если есть колбек выполняем его
	                callback(data.data);

	            }
	            if(id == null){
	            	removeURLparameter('qi');
	            }
	        });
        }
    }

}
