;
'use strict';

//логируем включение скрипта
console.log('navigation start');

var $main_container = $(".app-wrap"); 
var $modal_container = $(".modal-wrap");

var lbl_title_part = 'DNK | ';
var m_lbl_id = $('body').attr('data-lbl');
if (m_lbl_id=='steps.one') {
    lbl_title_part = 'Steps.one | '
}
//var $modal_part_container = $("#part-modal").find('.modal-wrap');
//массив частей SPA, каждый елемент масива - отвечает оперделенной части SPA
var page_parts = [{
    part: 'login',// идентификтор части
    url: '/login',// url части для навигации
    name: 'Вход',// заголовок части
    type: 'modal',
    wrap: $(".auth-wrap"),
    source: "/html/modal/login.html",
    module: 'login',//модуль для запуска данной части
    opened: true
}, {
    part: 'main',
    url: '/',
    name: 'Головна',
    type: 'main',
    wrap: $main_container,
    source: "/html/main/main.html",
    module: 'main',
    opened: true    
}, {
    part: 'cartpage',
    url: '/cartpage',
    alt:[],
    name: 'Корзина',
    type: 'main',
    wrap: $main_container,
    source: "/html/main/cartpage.html",
    module: 'cartpage',
    opened: true
}, {
    part: 'category',
    url: '/burgers',
    name: 'Бургери',
    type: 'main',
    wrap: $main_container,
    alt:[{
        url:'/salads',
        name: 'Салати'
    },{
        url:'/drinks',
        name: 'Напої'
    },{
        url:'/souses',
        name: 'Соуси'
    }],
    source: "/html/main/list.html",
    module: 'tovar_list',
    opened: true
},{
    part: '404',
    url: '',
    name: 'Не найдено',
    type: 'main',
    wrap: $main_container,
    source: "/html/parts/404.html",
    module: null,
    opened: true
},{
    part: '508',
    url: '',
    name: 'Бесконечное перенаправление',
    type: 'main',
    wrap: $main_container,
    source: "/html/parts/508.html",
    module: null,
    opened: true
}];

/**
 * [global_current_open_part description]
 * @type {string|boolean}
 */
var global_current_open_part = false;//глобальная переменная текущей открытой части
var global_current_path = false
var global_default_open_part = 'tools';//часть SPA которая открывается по дефолту
var global_default_path = '/tools';//часть SPA которая открывается по дефолту

/**
 * [open_part функция открытия части SPA]
 * @param  {string} name         [идентификатор(имя) части которую нужно открыть]
 * @param  {boolean} [from_url]   [если true обрабатывает как переход по ссылке,
 *                                 с history.replaceState, иначе обычная обработка 
 *                                 с history.pushState]
 * @param  {boolean} [force_learning] [флаг форсиорованного открытия обучения 
 *                                    - позволяет открыть часть сразу з обучением]
 */
function open_part(name, from_url, force_learning) {
    //логируем выполнение функции
    console.log('open_part(', name, from_url, force_learning,')');

    /**
     * [show_part внутрення функция отвечающая за отображение части]
     * @param  {string} name              [часть которуюю надо открыть]
     * @param  {string} current_open_part [текущая открытая часть SPA]
     * @param  {Object}    part_obj          [объект части которую надо открыть]
     */
    function show_part(name, current_open_part,part_obj) {
        //логирование выполнения функции
        console.log('show_part(', name, current_open_part, part_obj,')');

        //основные фреймы отображения окторые мы скрываем/отображаем

        // function close_popups(){
        //     console.log('close_popups');
        //     if($('.arcticmodal-container:visible').length>0){
        //         $.arcticmodal('close');
        //     }
        // }


        // if (name == 'crm') {
        //     //если открываем login прячем все другие фреймы отображжем фрейм логина
        //     //close_popups();

        // } else {
            
            var $body = $('body');
            if (part_obj.type == 'modal'){

                console.log('global_current_open_part = ',global_current_open_part);
                if (global_current_path == false) {//если основной контейнер пуст
                    //ставим в атрибут предыдущей части стандартную для открытия чась
                    if(if_defined(part_obj.opened)&&part_obj.opened){
                        $body.attr('data-prew', '/');
                    }else{
                        $body.attr('data-prew', global_default_path);
                    }
                } else {
                    if (global_current_path.indexOf('/edit')>-1 && !$body.attr('data-editor')) {

                        $body.attr('data-editor', global_current_path);//иначе ставим текущую открытую чась
                    }
                    if (global_current_path.indexOf('/edit')>-1 ||
                        global_current_path == '/how_to' ||
                        global_current_path.indexOf('/lp1')>-1 ||
                        global_current_path.indexOf('/lp3')>-1 ||
                        global_current_path.indexOf('/preland')>-1 ||
                        global_current_path.indexOf('/quiz')>-1
                        ){
                        $body.attr('data-prew', global_current_path);//иначе с
                        
                    }else{
                        $body.attr('data-prew', global_default_path);//иначе ставим текущую открытую чась

                    }
                }

            }else{
                //close_popups();
            }

        // }
        // if (name != 'crm') {
        //     //если открываем login прячем все другие фреймы отображжем фрейм логина
        //     $('#user-tools-logo').find('.logo').hide();

        // }

        global_current_open_part = name; //присваиваем новое значение глобальной переменной текущей открытой части
        global_current_path = document.location.pathname+document.location.search
    }


    var search_query = document.location.search;//строка параметров с браузера
    var cur_pathname = document.location.pathname;//текущий pathname


    if (name == 'login' && global_user_auth == true || name == 'promo' && global_user_auth == true) {//если это открытие loginа но пользователь авторизирован

        name = global_default_open_part;//заменяем имя на дефолтное для открытия

    }

    // if (name != 'login' && name != 'promo' && global_user_auth == false) {//если это не логин и пользователь не авторизирова

    //     name = 'login'; //направялем на логин

    // }

    var part_obj;//объект части SPA

    for (var i = page_parts.length - 1; i >= 0; i--) {
        if (page_parts[i].part == name) {//поиск совпадения по масиву частей по идентификатору части
            /**
             * [part_obj обьект части SPA]
             * @type     {Object}
             * @property {string} part          [идентификтор части]
             * @property {string} [url]         [url части для навигации(не обязательно)]
             * @property {string} [name]        [заголовок части - document.title (не обязательно)]
             * @property {string} [nav_part]    [навигационная часть (для подсветки активного пункта навигации),
             *                                  (не обязательно)]
             * @property {Object} wrap          [jq елемент, фрейм для загрузки каркаса]
             * @property {string} source        [url html файла с каркасом части]
             * @property {string} module        [название модуля для загрузки после вставки каркаса]             *                                  
             */
            part_obj = page_parts[i];//присваивем part_obj найденый объект части
        }
    }


    function show_and_run(){


            dnk_atom_events({type:'page'});



            //отображаем часть
            show_part(name, global_current_open_part,part_obj);

            //если данная часть имеет свой модуль 
            if (if_defined(part_obj.module)) {
                //запускаем модуль
                run_module(part_obj.module);

            }


    }


    var needed_src = source_url+ part_obj.source

    if (global_build != false) {//если это test/prod версия 
        var rev = $('body').attr('data-revision');//получаем значение ревизии
        //то для закгрузки модуля нужен только 1н скрипт, с хвостом ревизии(скидывание кеша) 
        if(needed_src.indexOf('?')>-1){

            needed_src +='&v='+ rev;

        }else{

            needed_src +='?v='+ rev;
        }
    }

    if(part_obj.type == 'frame'){

        //part_obj.wrap.attr('src', 'frame/clear.html');
        var $frame = part_obj.wrap.find('iframe')
        needed_src = needed_src.replace(source_url,'');
        //if($frame.length>0 && $frame.attr('src') == needed_src){

          //      show_and_run();

        //}else{

            part_obj.wrap.html('<iframe id="app-frame"></iframe>').attr('data-loaded',part_obj.part);
            $frame = part_obj.wrap.find('iframe');
            $frame.unbind('load');

            $frame.bind('load',function(){
                show_and_run();
            });
            if($frame.attr('src') != needed_src){
                
                $frame.attr('src', needed_src);

            }else{
                show_and_run();
            }

        //}


    }else{
        //очищаем область части, загржаем в него html каркас
        


        if (part_obj.type == 'main') {
            $('body').attr('data-loaded',part_obj.part);
        }

        if(part_obj.part == part_obj.wrap.attr('data-loaded')){

                show_and_run();

        }else{

            part_obj.wrap.attr('data-loaded',part_obj.part).load(needed_src, function() {//по загрузке каркаса

                show_and_run();

            });
        }

    }

    // //если нужная часть это обучение
    // if (name == 'learning') {

    //     if (search_query.length > 2) {//и строка параметров имеет дилнну больше 2
    //         if (!getURLParameter('learning')) {//и не сущществет параметра learning
    //             search_query += '&learning=true';//то добавляем learning=true
    //         }
    //     } else {//если строка параметров пуста
    //         search_query = '?learning=true';//создаем ее с параметром learning=true
    //     }

    //     //заменяем state в истории с текущим заголовоком, текущим положение и новой строкой параметров
    //     history.replaceState('', document.location.title, cur_pathname + search_query);

    // } else {

        //если это любая другая часть, не обучение

        var new_page_title = lbl_title_part + part_obj.name; //новый заголовок вкладки
        var new_page_addr = part_obj.url;//новый url адрес страницы

        if(name == '404'){
            new_page_addr = cur_pathname;
        }

        if (!from_url && cur_pathname != new_page_addr) {

            //если это открытие части не c url, текущий pathname длинне 2ух символов, и не равен новому

            //добавляем в историю новый state
            history.pushState('', new_page_title, new_page_addr + search_query);
            
        } else {

            //заменяем в истории pathname
        
            if(from_url){
                if(if_defined(part_obj.alt)){
                    for (var i = part_obj.alt.length - 1; i >= 0; i--) {
                        if(part_obj.alt[i].url == cur_pathname){
                            new_page_addr = part_obj.alt[i].url;
                            new_page_title = lbl_title_part + part_obj.alt[i].name;
                        }
                    }
                }
            }

            history.replaceState('', new_page_title, new_page_addr + search_query);

        }

        //устанавливаем новый заголовок документа
        document.title = new_page_title;


        var $header = $('#main_header');
        if($header.length>0){
            $header.find('h1').html(new_page_title.replace(lbl_title_part,''));
        }

        // if (name != 'login' && name != 'learning' && getURLParameter('learning') || force_learning) {

        //     //если это не открытие логина, не открытые обучения, но есть урл параметр learning
        //     //или force_learning == true (форсировать открытие обучения)

        //     setTimeout(function() {

        //         open_part('learning');//открываем обучение с задержкой в 200мс

        //     }, 200);
        // }

    // }


    $('#preload').hide();//скрываем прелоадер по открытию части

}

function open_from_url(path,push){


        console.log('open_from_url(',path,push,if_defined(push),if_defined(push),')');
    //имя части 
    var name;
    var url = path;
    //урл части для поиска в обьекте
    if(!if_defined(path)){
        path = document.location.pathname;
        if(path.length>1&&path[path.length -1]=='/'){
            path = path.slice(0, -1);
        }
        url = path+document.location.search;
    }else{
        if(path.indexOf("?")>-1){

            // if (path.indexOf("?i=")>-1) {
                
            // }else{

                path = path.substring(0,path.indexOf("?"))
                var search = url.replace(path,'');
                if(path.length>1&&path[path.length -1]=='/'){
                    path = path.slice(0, -1);
                }
                url = path+search;
            // }
        }else{
            if(path.length>1&&path[path.length -1]=='/'){
                path = path.slice(0, -1);
            }
            url = path;            
        }
    }
    
    var cur = document.location.pathname+document.location.search;
    
    if(cur.indexOf("?")>-1){

            // if (path.indexOf("?i=")>-1) {
                
            // }else{
            var path_s = document.location.pathname;
            var search_s = document.location.search;
                if(path_s.length>1&&path_s[path_s.length -1]=='/'){
                    path_s = path_s.slice(0, -1);
                }
                cur = path_s+search_s;
            // }
        }else{
            var path_s = document.location.pathname;
            if(path_s.length>1&&path_s[path_s.length -1]=='/'){
                path_s = path_s.slice(0, -1);
            }
            cur = path_s;            
        }    
    console.log('OPEN_FROM_URL',cur);
    //$('body').attr('data-prew',cur);
global_current_path=cur;
    
    if(if_defined(push)){        
        history.pushState('', document.title, url);
    }else{
        history.replaceState('', document.title, url);        
    }


    //ищем в объекте частей SPA совпадение по урл нахождения пользоваетля
    for (var i = page_parts.length - 1; i >= 0; i--) {
        if (page_parts[i].url == path) {
            name = page_parts[i].part;//получаем имя части спа которую надо открыть
        }else{
            if(if_defined(page_parts[i].alt)){
                for (var j = page_parts[i].alt.length - 1; j >= 0; j--) {
                    if (page_parts[i].alt[j].url == path) {
                        name = page_parts[i].part;//получаем имя части спа которую надо открыть
                    }
                }
            }
        }
    }
        console.log('name = ',name,path);

    if (if_defined(name)) {//если имя заполнено(совпадение найдено)

        //открываем часть с параметром from_url
        open_part(name, true);

    }else{

        //открываем дефолтную часть
        open_part('404');

    }
}

/**
 * [run_module функция загрузки и запуска js модуля]
 * @param  {string} name [имя модуля который нужно запустить]
 */
function run_module(name) {
    //логируем выполнение функции

    console.log('run_module(',name,')');

    if (!window[name] || !window[name].init) {
        //если переменной с именем модуля не существует

        /**
         * @type {Array}
         */
        var scripts = [//дефолтный набор скриптов модуля для дев версии
            source_url+"/js/modules/" + name + "/" + name + "_model.js",
            source_url+"/js/modules/" + name + "/" + name + "_view.js",
            source_url+"/js/modules/" + name + "/" + name + "_events.js",
            source_url+"/js/modules/" + name + "/" + name + "_controller.js",
            source_url+"/js/modules/" + name + "/" + name + "_init.js"
        ];


        if (global_build != false) {//если это test/prod версия 
            var rev = $('body').attr('data-revision');//получаем значение ревизии
            //то для закгрузки модуля нужен только 1н скрипт, с хвостом ревизии(скидывание кеша) 
            scripts = [source_url+"/js/modules/" + name + "/" + name + ".js?v=" + rev];
        }
        //загружаем скрипты модуля
        async_load_js(scripts);

    } else {//если переменаня существует

        window[name].init();//выполняем инициацию модуля

    }
}

window.addEventListener('popstate', function() {//евентлистнер на навигацияю вперед-назад в браузере
    
    open_from_url();

});
