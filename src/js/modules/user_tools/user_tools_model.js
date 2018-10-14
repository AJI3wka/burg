;

'use strict';

console.log('user_tools.model start');

var user_tools = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

user_tools.model = {
    tarif_data: function() {
        var $wrp = user_tools.view.t_wrap.find('.tarif-data');
        $wrp.find('.bal').find('span').html(numberWithSpaces(global_user_data.balance.balance) + 'р');



        if (global_user_data.trial || global_user_data.blockUser) {
            $wrp.find('.to').hide();
        } else {

            var date = global_user_data.subscribeExpire.split(' ')[0].split('-');
            $wrp.find('.to').find('span').html(date[2] + '.' + date[1] + '.' + date[0]);
            $wrp.find('.to').show();
        }

        if (global_user_data.trial) {
            $wrp.find('.tarif').children('span').html('<span style="color:orange">Бесплатный</span>');
            $wrp.find('.tarif').find('.t-info').find('.test-i').show();
            $wrp.find('.tarif').find('.t-info').find('.blck-i').hide();
            $wrp.find('.tarif').find('.t-info').find('.lim-i').show();
        } else if (global_user_data.blockUser) {
            $wrp.find('.tarif').children('span').html('<span style="color:red">Приостановлен</span>');
            $wrp.find('.tarif').find('.t-info').find('.test-i').hide();
            $wrp.find('.tarif').find('.t-info').find('.blck-i').show();
            $wrp.find('.tarif').find('.t-info').find('.lim-i').hide();
        } else {

            $wrp.find('.tarif').find('.t-info').find('.test-i').hide();
            $wrp.find('.tarif').find('.t-info').find('.blck-i').hide();
            $wrp.find('.tarif').find('.t-info').find('.lim-i').show();
            var limit = global_user_data.limits['1Page'].limit;
            if (limit == 40) {
                $wrp.find('.tarif').children('span').html('<span>VIP</span>');

            } else if (limit == 20) {
                $wrp.find('.tarif').children('span').html('<span>Бизнес</span>');

            } else if (limit == 10) {
                $wrp.find('.tarif').children('span').html('<span>Профи</span>');

            } else if (limit == 3) {
                $wrp.find('.tarif').children('span').html('<span>Старт</span>');

            }



        }
        var limit_1 = global_user_data.limits['1Page']

        var limit_q = global_user_data.limits['QUIZ']
        var $tar_name = $wrp.find('.tarif').children('span').find('span');



        var $lim_q = $wrp.find('.tarif').find('.t-info').find('.type').first().find('span');
        var $lim_1 = $wrp.find('.tarif').find('.t-info').find('.type').last().find('span');

        $lim_1.html(limit_1.used + '/' + limit_1.limit);
        $lim_q.html(limit_q.used + '/' + limit_q.limit);
        if (limit_q.used >= limit_q.limit) {
            $tar_name.css('color', 'orange');
            $lim_q.css('color', 'orange');
        } else {
            $lim_q.css('color', 'green');

        }
        if (limit_1.used >= limit_1.limit) {
            $tar_name.css('color', 'orange');
            $lim_1.css('color', 'orange');
        } else {
            $lim_1.css('color', 'green');

        }


    },
    first_use: {
        arctic_def:{
            afterOpen:function(data, el){
                var $video = $(el).find('.video');
                $video.html('<iframe class="ytb_video" src="https://www.youtube.com/embed/' + $video.attr('data-id') + '?autoplay=1&amp;rel=0&amp;showinfo=0&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>')
            },

            afterClose:function(data, el){
                $(el).find('.video').children('iframe').remove();
                if ($(el).is('#i_p_site_not_ended')) {
                    setCookie('not_show_site_not_ended','true',0.25);
                }
            },
        },
        init: function() {

            /*
            
            params = {
                starting:true,
                need:site_ad|ad|site|instruments|marketing
                site_type:quiz,
                started_id:
                site_ended:false,
                not_show_s:false,
                f_quiz:'viewed',
                f_lp1:'viewed',
                f_rsy:'viewed',
                f_crm:'viewed',
                f_balance:'viewed',
                f_tools:'viewed',
            };
                
            */
            this.rebind();

            if (global_user_data) {

                var used_sites = 0;

                for (var key in global_user_data.limits) {
                    if (global_user_data.limits.hasOwnProperty(key)) {
                        used_sites += global_user_data.limits[key].used;
                    }
                }

                var has_to_show = false;


                if (used_sites == 0 || if_defined(global_user_data.params.starting)) {

                    if (!if_defined(global_user_data.params.starting) || global_user_data.params.starting == 'false') {

                        $('#i_p_start').arcticmodal(user_tools.model.first_use.arctic_def);

                        has_to_show = true;
                    }else{
                        if (!if_defined(global_user_data.params.site_type) || global_user_data.params.site_type == 'false') {

                            if (global_user_data.params.need == 'site_ad') {

                                $('#i_p_site_ad').arcticmodal(user_tools.model.first_use.arctic_def);

                        has_to_show = true;
                            }else if(global_user_data.params.need == 'ad'){
                                $('#i_p_ad').arcticmodal(user_tools.model.first_use.arctic_def);

                        has_to_show = true;
                            }else if(global_user_data.params.need == 'site'){
                                $('#i_p_site').arcticmodal(user_tools.model.first_use.arctic_def);
                                
                        has_to_show = true;
                            }else if(global_user_data.params.need == 'instruments'){
                                $('#i_p_instruments').arcticmodal(user_tools.model.first_use.arctic_def);
                                
                        has_to_show = true;
                            }else if(global_user_data.params.need == 'marketing'){
                                $('#i_p_marketing').arcticmodal(user_tools.model.first_use.arctic_def);
                                
                        has_to_show = true;
                            }
                        }else if (global_user_data.params.site_type!='none'){
                            if(!if_defined(global_user_data.params.site_ended) || global_user_data.params.site_ended == 'false'){
                                if(!if_defined(global_user_data.params.not_show_s)||global_user_data.params.not_show_s == 'false'){

                                    if (!if_defined(getCookie('not_show_site_not_ended'))) {

                                        var $pop = $('#i_p_site_not_ended');
                                        var str = '';
                                        if (global_user_data.params.site_type == 'quiz') {
                                            str = '/quiz/edit_by_step?qi=';
                                        }else if (global_user_data.params.site_type == 'lp1') {
                                            str = '/lp1/edit?i=';
                                        }

                                        if (if_defined(global_user_data.params.started_id) && global_user_data.params.started_id!='false') {
                                            str+=global_user_data.params.started_id;
                                        }else{
                                            str+='new';
                                        }

                                        $pop.find('#cont_editing').attr('data-target',str);
                                        var cur_url = document.location.pathname+document.location.search;
                                        if (cur_url.indexOf(str)==-1) {                                        
                                            $pop.arcticmodal(user_tools.model.first_use.arctic_def);
                                            has_to_show = true;
                                        }  
                                    }
                                }
                            }
                        }
                         

                    }

                }

                if ($('.arcticmodal-container_i2').children('.initial_pops').length>0) {
                    has_to_show = true;                    
                }
                if (!has_to_show) {
                    this.init_fw();
                }

                this.first_site();

            }

        
        },
        first_site:function(){
            var path = document.location.pathname;

            var puls = false;
            if (path == '/quiz/edit'){
                //if (if_defined(global_user_data.params.site_type) && global_user_data.params.site_type == 'quiz' || !if_defined(global_user_data.params.site_ended)) {
                    
                    if (!if_defined(global_user_data.params.site_ended)
                     ||  global_user_data.params.site_ended == 'false'){

                        // if (if_defined(global_user_data.params.started_id)&&global_user_data.params.started_id != 'false'){
                          
                        //     if (global_user_data.params.started_id == getURLParameter('qi')) {

                        //         puls = true;                                 
                        //     }
                        // }else{
                            //if (getURLParameter('qi') == 'new') {

                                puls = true;     
                            //}
                        // }
    

                    }
               // }
            }

            if (path == '/lp1/edit'){
                //if (if_defined(global_user_data.params.site_type) && global_user_data.params.site_type == 'lp1' || !if_defined(global_user_data.params.site_ended)) {
                    
                    if (!if_defined(global_user_data.params.site_ended)
                     ||  global_user_data.params.site_ended == 'false'){

                        // if (if_defined(global_user_data.params.started_id)&&global_user_data.params.started_id != 'false'){
                          
                        //     if (global_user_data.params.started_id == getURLParameter('i')) {

                        //         puls = true;                                 
                        //     }
                        // }else{
                            //if (getURLParameter('i') == 'new') {

                                puls = true;     
                            //}
                        // }
    

                    }
                //}
            }
            ////alert(puls);

            if (puls) {

                        $('.app-wrap').addClass('inst_puls');
            }
            else{
                        $('.app-wrap').removeClass('inst_puls');

            }
        },
        init_fw:function() {
            var path = document.location.pathname;

            if (path == '/quiz/edit' && !if_defined(global_user_data.params.f_quiz) ||
                path == '/quiz/edit' && global_user_data.params.f_quiz == 'false') {

                $('#i_p_f_quiz').arcticmodal(user_tools.model.first_use.arctic_def);


            }else
            if (path == '/lp1/edit' && !if_defined(global_user_data.params.f_lp1) ||
                path == '/lp1/edit' && global_user_data.params.f_lp1 == 'false') {


                $('#i_p_f_lp1').arcticmodal(user_tools.model.first_use.arctic_def);                
                
            }else
            if (path == '/trafic/edit' && !if_defined(global_user_data.params.f_rsy) ||
                path == '/trafic/edit' && global_user_data.params.f_rsy == 'false') {

                $('#i_p_f_rsy').arcticmodal(user_tools.model.first_use.arctic_def);  
                
            }else
            if (path == '/balance' && !if_defined(global_user_data.params.f_balance) ||
                path == '/balance' && global_user_data.params.f_balance == 'false') {

                $('#i_p_f_balance').arcticmodal(user_tools.model.first_use.arctic_def);                 
                
            }else
            if (path == '/crm' && !if_defined(global_user_data.params.f_crm) ||
                path == '/crm' && global_user_data.params.f_crm == 'false') {

                $('#i_p_f_crm').arcticmodal(user_tools.model.first_use.arctic_def); 
                
            }
            //else
            // if (path == '/tools' && !if_defined(global_user_data.params.f_tools) ||
            //     path == '/tools' && global_user_data.params.f_tools == 'false') {

            //     $('#i_p_f_tools').arcticmodal(user_tools.model.first_use.arctic_def);                 
                
            // }
        },
        rebind: function() {
            var $pops = $('.initial_pops');
            $pops.find('.not-to-show').unbind('click');
            $pops.find('.not-to-show').click(function(){
                $(this).closest('.initial_pops').arcticmodal('close');

                    user_tools.model.first_use.set_param({name:'not_show_s',value:'true'});
            });
            $pops.find('.btn').unbind('click');
            $pops.find('.btn').click(function(){
                var type=$(this).attr('data-type');
                var target=$(this).attr('data-target');
                $(this).closest('.initial_pops').arcticmodal('close');
                if (type == 'start') {

                    var data_s = {
                        name: 'starting',
                        value:true
                    }
                    user_tools.model.first_use.set_param(data_s,function(){

                        var data = {
                            name:'need',
                            value:target
                        };
                        user_tools.model.first_use.set_param(data);
                    });

                    if (target == 'site_ad') {
                        $('#i_p_site_ad').arcticmodal(user_tools.model.first_use.arctic_def);
                    }else if (target == 'ad') {
                        $('#i_p_ad').arcticmodal(user_tools.model.first_use.arctic_def);
                    }else if (target == 'site') {
                        $('#i_p_site').arcticmodal(user_tools.model.first_use.arctic_def);
                    }else if (target == 'instruments') {
                        $('#i_p_instruments').arcticmodal(user_tools.model.first_use.arctic_def);
                    }else if (target == 'marketing') {
                        $('#i_p_marketing').arcticmodal(user_tools.model.first_use.arctic_def);
                    }
                }else if (type == 'site') {

                    var data = {
                        name:'site_type',
                        value:target
                    };
                    user_tools.model.first_use.set_param(data);


                    if (target == 'quiz') {
                        open_from_url('/quiz/edit_by_step?qi=new',true);
                    }else if (target == 'lp1') {
                        open_from_url('/lp1/edit?i=new',true);
                    }

                }else if (type == 'go_to') {

                    var data = {
                        name:'site_type',
                        value:'none'
                    };
                    user_tools.model.first_use.set_param(data);

                    if (target == 'rsy') {
                        open_from_url('/trafic/edit?i=new',true);
                    }else if(target == 'partner') {

                        open_from_url('/partnership/conditions',true);
                    }

                }else if (type == 'viewed') {

                    var data = {
                        name:target,
                        value:type
                    };
                    user_tools.model.first_use.set_param(data);

                }else if (type == 'continue') {

                        open_from_url(target,true);

                }
            });
        },
        set_param:function(data,callback){

            var url = api_config.default + 'User/setParam';
            
            get_json('post', url, data, function(){

                global_user_data.params[data.name] = data.value;

                if (callback) {
                    callback();
                }

            }, false, function(){


            });
        }
    }
};