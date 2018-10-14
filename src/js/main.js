;
"use strict";

var global_build = false; //глобальная переменная используемая для определения билда
var global_config = {
  api:[{
    h:'',
    u:{}
  }],
  js:{
      basic:[],
      js_modules:[]
  }
};

    global_config = false; //глобальная переменная для хранения конфига с файла global_config_file
var global_config_file = source_url+'/config.json.dist'; //файл конфигурации

/**
 * [getJSON - функция получения джсона с адреса с колбеком, на чистом js. получает json по урл и возвращает либо ошибку либо данные с json]
 * @param  {string}   url                   [url получение json'а]
 * @param  {Function} callback(err,data)    [колбек при получении json'a.
 *                                              err - сообщение об ошибке, data - обоект c json]
 */
var getJSON = function(url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    
    xhr.onload = function() {
    
        var status = xhr.status;
        
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    
    xhr.send();
};



var basic_scripts = [source_url+'/js/basic.js?v='+document.body.getAttribute('data-revision')];//в test/prod версии все basic скрипты объеденены

if (global_build == false) {//если global_build == false - это dev версия

	getJSON(global_config_file,function(err,data){//получаем config_file

		global_config = data;//записываем конфигг в глобальную переменную
        //создаем массив basic сприптов для загрузки
        console.log('global_config = ',global_config);
		for (var i = 0; i < global_config.js.basic.length; i++) {
			
			basic_scripts[i] = source_url+'/js/basic/'+global_config.js.basic[i]+'.js';
		
		}


		async_load_js(basic_scripts);//загружаем массив скриптов
	});

}else{//если это test/prod загружаем 'js/basic.js'
	async_load_js(basic_scripts);
}

