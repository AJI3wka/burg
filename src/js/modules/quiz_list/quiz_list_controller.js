;

'use strict';

console.log('quiz_list.controller start');

quiz_list.controller = {

    api_url: api_config.default,
    crm_url: api_config.crm,
    get_list: function(callback) {

    
    get_user_info(function(){},function(){},true);
        var data_hash = {
            userKey: global_user_token,
            filter: 'page'
        };
        var url = quiz_list.controller.api_url + 'Pages?pageType=quiz';

        get_json('get', url, data_hash, function(data) {

            if (callback) { //если есть колбек выполняем его
                callback(data.data);

            }

        });
    },
    //   get_stat_data:function(id,callback){

    //    var url = quiz_list.controller.crm_url + 'getAnalytics';

    // var data = {
    //        siteID: id
    //    };


    //    ajax_api('get',url,data,function(analytis_data){

    //        if (callback) {

    //            callback(id,analytis_data);
    //        } 

    //   	},function(){},false,true);
    //   },
    get_quiz:function(qid,callback){
        var url = quiz_list.controller.api_url+'QUIZ/get'
        get_json('get', url, {qid:qid}, function(data) {

            if(callback){
                callback(data);
            }

        });//удачное выполнение гет запроса

    },
    set_def_page:function(qid,site_id){

        quiz_list.controller.get_quiz(qid,function(data) {//удачное выполнение гет запроса

            var content = data.data.data;
            content.default_page = site_id;
            var send = {
                name:data.data.name,
                qid:data.data.id,
                content:JSON.stringify(content)
            }
            var url = quiz_list.controller.api_url + 'QUIZ/update';


            get_json('post', url, send, function(data) {

                // if(callback){
                //     callback(data);
                // }

            });

        });

    },
    find_usages:function(qid,callback){
            var url = quiz_list.controller.api_url + 'QUIZ/findUsages';




            get_json('get', url, {
                qid: qid
            }, function(data) {

                if(callback){
                    callback(data);
                }

            });//удачное выполнение гет запроса

    },
    page_delete:function(site_id,callback){


            var url = quiz_list.controller.api_url + 'Page/delete';

            get_json('post', url, {
                siteID: site_id
            }, function() {


                if (callback) {
                    callback();
                }
            });

    },
    delete: function(site_id, qid, callback) {



        if (qid == 'null') {

            quiz_list.controller.page_delete(site_id, function(){

                if (callback) {
                    callback();
                }
            })

        } else {
                quiz_list.controller.find_usages(qid,function(data){

                if (data.data.length > 0) {
                    var arr_finded_quiz_pages = [];
                    var finded_quiz_pages = 0
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].template == 'quiz') {
                            finded_quiz_pages++;
                            arr_finded_quiz_pages[arr_finded_quiz_pages.length] = data.data[i];
                        }
                    }

                    if (finded_quiz_pages == 1) {

                        var remove = 'none';

                        for (var i = 0; i < data.data.length; i++) {
                            if (data.data[i].id == site_id) {

                                remove = i;
                            }
                        }
                        if(remove != 'none'){

                            data.data.splice(remove, 1);
                        }

                        if (data.data.length > 0) {

                            var text = 'Перед удалением квиза нужно его открепить на этих сайтах:<br>';

                            for (var i = 0; i < data.data.length; i++) {
                                text += '<p>' + data.data[i].name + ' ';
                                text += '<a target="_blank" href="'
                                if (if_defined(data.data[i].domain)) {
                                    text += 'http://' + data.data[i].domain + '/">' + data.data[i].domain + '</a>';
                                } else {
                                    text += data.data[i].url + '">Просмотр</a>';
                                }
                            }

                            show_alert_mess(text);

                        } else {


                            quiz_list.controller.page_delete(site_id, function(){
                

                                var url = quiz_list.controller.api_url + 'QUIZ/delete';
                                get_json('post', url, {
                                    qid: qid
                                }, function() {

                                    if (if_defined(global_user_data.params.site_type)) {
                                        if(global_user_data.params.site_type == 'quiz'){
                                            if(if_defined(global_user_data.params.started_id) && global_user_data.params.started_id == qid){

                                                user_tools.model.first_use.set_param({name:'not_show_s',value:'site_deleted'},function(){

                                                    user_tools.model.first_use.set_param({name:'started_id',value:'false'});
                                                });
                                                
                                            }
                                            
                                        }
                                    }                                


                                    if (callback) {
                                        callback();
                                    }
                                });
                            });

                        }


                    }else{


                        quiz_list.controller.get_quiz(qid,function(data) {//удачное выполнение гет запроса

                            var def_page = data.data.data.default_page;

                            var remove = 'none';

                            for (var i = 0; i < arr_finded_quiz_pages.length; i++) {
                                if (arr_finded_quiz_pages[i].id == def_page) {

                                   remove = i;

                                }
                            }
                            if(remove != 'none'){
                                arr_finded_quiz_pages.splice(remove, 1);

                            }

                            var deleted_dubles = 0;

                            console.log('arr_finded_quiz_pages = ',arr_finded_quiz_pages,def_page);

                            for (var i = 0; i < arr_finded_quiz_pages.length; i++) {

                                quiz_list.controller.page_delete(arr_finded_quiz_pages[i].id, function(){

                                   deleted_dubles++;
                                   
                                   if (deleted_dubles == arr_finded_quiz_pages.length) {

                                        if (callback) {
                                            callback();
                                        }

                                   } 

                                });
                            }


                        });

                    }


                } else {
                    var url = quiz_list.controller.api_url + 'QUIZ/delete';
                    get_json('post', url, {
                        qid: qid
                    }, function() {


                        if (callback) {
                            callback();
                        }
                    });

                }
            });
        }

    }

}