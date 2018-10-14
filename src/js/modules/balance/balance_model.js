;

'use strict';

console.log('balance.model start');

var balance = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

balance.model = {
    pay_targets: [{
        target: "tariff_1",
        text: 'Тариф Профи на 1 месяц'
    },{
        target: "tariff_6",
        text: 'Тариф Старт на 1 месяц'
    },{
        target: "tariff_11",
        text: 'Тариф Бизнес на 1 месяц'
    },{
        target: "tariff_16",
        text: 'Тариф VIP на 1 месяц'
    },{
        target: "tariff_2",
        text: 'Тариф Профи на 3 месяца'
    },{
        target: "tariff_7",
        text: 'Тариф Старт на 3 месяца'
    },{
        target: "tariff_12",
        text: 'Тариф Бизнес на 3 месяца'
    },{
        target: "tariff_17",
        text: 'Тариф VIP на 3 месяца'
    },{
        target: "tariff_3",
        text: 'Тариф Профи на 6 месяцев'
    },{
        target: "tariff_8",
        text: 'Тариф Старт на 6 месяцев'
    },{
        target: "tariff_13",
        text: 'Тариф Бизнес на 6 месяцев'
    },{
        target: "tariff_18",
        text: 'Тариф VIP на 6 месяцев'
    },{
        target: "tariff_4",
        text: 'Тариф Профи на 1 год'
    },{
        target: "tariff_9",
        text: 'Тариф Старт на 1 год'
    },{
        target: "tariff_14",
        text: 'Тариф Бизнес на 1 год'
    },{
        target: "tariff_19",
        text: 'Тариф VIP на 1 год'
    },{
        target: "tariff_5",
        text: 'Тариф Профи на 1 год'
    },{
        target: "tariff_10",
        text: 'Тариф Старт на 1 год'
    },{
        target: "tariff_15",
        text: 'Тариф Бизнес на 1 год'
    },{
        target: "tariff_20",
        text: 'Тариф VIP на 1 год' 
    },










    {

        target: "domainreg",
        text: 'Регистрация домена'
    },{

        target: "domainprolong",
        text: 'Продолжение регистрации домена'
    },
    ],
    pay_for_target:function(target){
    	if(target.indexOf('tariff_')>-1){
    		target = target.replace('tariff_','');

    		balance.controller.subscribe_tarif(target,function(){

    			show_info_pop('Оплата тарифа прошла успешно')
	    			get_user_info(function(){
	    				balance.model.view.clear_history();

	    				balance.model.get_user_history(0,15);
	    				balance.model.check_activation();

	    			});

    			
    		});

    	}else if(target.indexOf('domainreg_')>-1){

            var target_arr = target.split('_');
            console.log('atom_pay_target = ',target_arr)
            var domain = target_arr[1];
            var price = target_arr[2];
            var from = target_arr[4];
            var query = from.split('?');
            var to_url = '/get_domain?d='+domain+'&pr='+price;
            if (if_defined(query[1])) {
                to_url+='&'+query[1];
            }
            open_from_url(from,true);
            open_from_url(to_url,true);


        }else if(target.indexOf('domainprolong_')>-1){

            var target_arr = target.split('_');
            var to_url = '/domains?pl='+target_arr[1];;
            
            open_from_url(to_url,true);


        }
    	setCookie('atom_pay_target',0,-1);
    },
    check_url: function() {


        var path = document.location.pathname;
        path = path.replace('/balance', '');

        var atom_pay_target = getCookie('atom_pay_target');


        if (path == '/suc') {

            show_info_pop('Оплата прошла успешно'); //выводим попап проу спешную оплату


            history.replaceState('', document.title, '/balance');

	        if(atom_pay_target){
	        	balance.model.pay_for_target(atom_pay_target);
	        	
	        }

        }else
        if (path == '/err') {

            show_alert_mess('Оплата не прошла'); //выводим попап об ошибке 

            history.replaceState('', document.title, '/balance');

	        if(atom_pay_target){
	        	balance.model.pay_for_target(atom_pay_target);
	        	
	        }
        }else
        if (path == '/pay') {

            var $popolnit = balance.view.wrap.find('#popolnit');
            var $popolnit_input = $popolnit.find('input[name="value"]');
            var need = getURLParameter('need');
            $popolnit.find('#popolnit_btn').attr('data-target', getURLParameter('target'));
            $popolnit_input.val(need).attr('data-need', need);
            $popolnit.find('.pop_up_title').hide();
            var can_be_target = '';
            var true_target = '';
            for (var i = balance.model.pay_targets.length - 1; i >= 0; i--) {
                if (getURLParameter('target').indexOf(balance.model.pay_targets[i].target)>-1) {

                    can_be_target = balance.model.pay_targets[i].text;
                    if (getURLParameter('target') == balance.model.pay_targets[i].target) {
                        true_target = balance.model.pay_targets[i].text;
                    }

                }

            }

            if (true_target.length == 0) {
                true_target = can_be_target
            }
            
            $popolnit.find('.fr_appointment').val(true_target);
            

            $popolnit.find('.pop_up_title').html('Введите сумму пополнения'); // вписываем надпись в заголовок поп-апа пополнения
            // $('#popolnit input[name="value"]').val(100);
            $popolnit.arcticmodal({afterClose:function(){

            	history.replaceState('', document.title, '/balance');
            }}); // открываем поп-ап пополнения
            //history.replaceState('', document.title, '/balance');
        }else{

	        if(atom_pay_target){
	        	balance.model.pay_for_target(atom_pay_target);
	        }
            history.replaceState('', document.title, '/balance');
        }

        if (if_defined(getURLParameter('confirmEmailHash'))) {

            history.replaceState('', document.title, document.location.pathname);

        }
    },
    check_activation: function() {
        var $wraps = balance.view.wrap.find('.block_premium');
        if (if_defined(global_user_data)&&if_defined(global_user_data.trial) && global_user_data.trial == true || global_user_data.blockUser == true || global_user_data.leftSubscribeTime < 7*60*60*24) {
            $wraps.find('.activate').show();
        } else {
            $wraps.find('.activate').hide();
        }
        if (if_defined(global_user_data)&&if_defined(global_user_data.trial) && global_user_data.trial == true) {
            $wraps.find('.test_active').show();
            $wraps.find('.premium_active').hide();
        } else {
            $wraps.find('.test_active').hide();
            $wraps.find('.premium_active').show();
            if(if_defined(global_user_data.subscribeExpire)){
            	
				var date = global_user_data.subscribeExpire.split(' ')[0].split('-');
				$wraps.find('.premium_stop_date').html(date[2] + '.' + date[1] + '.' + date[0]);
            }

        }
        $wraps.show();
    },
    get_user_history: function(startFrom, limitEmount) {

        var startPos = +startFrom || 0; //записываем стартовую позицию или 0 по дефолту если ёё нет
        var limit = +limitEmount || 30; //записываем количесво пизиций или 30 по дефолту если ёё нет
        var transaction_amount = 0; //количество полученных тразакций

        var $balance_body = balance.view.wrap; //сохраняем враппер страницы баланса
        var $history_table = $balance_body.find('.history_table'); //сохраняем врапперы таблиц истории баланса
        var last_transaction = +$history_table.attr('data-last-end') || 0; //сохраняем номер последней транзакции, которая дыла вставлена в таблицу

        if ($history_table.attr('data-last-start')) { //если уже было получено какието транзакции (был сохранен аттрибут)
            if (+$history_table.attr('data-last-start') === startPos && startPos !== 0) { //если инициируеться такой же запрос как был перед етим, при етом он не первый
                $history_table.attr('data-end-transaction-list', true); //значит ето конец списка истории транзакций, отмечаем ето в аттрыбуте чтобы далее не инициирувались новые запросы
                return false; //выходим с функции и не делаем запрос
            } else if (startPos < last_transaction) { //если начало нового запроса меньше последнего, тоесть хочет получить данные которые уже получено
                return false; //выходим с функции и не делаем запрос
            } else {
                $history_table.attr('data-last-start', startPos); //сохраняем в аттрибут начало етого запроса
            }
        } else { //если еще небыло получено ниодной транзакции (первый запрос)
            $history_table.attr('data-last-start', 0); //сохраняем аттрибут который показывает начало последнего запроса (первый запрос начинаетсь с нуля)
        }

        if(startFrom == 0 && $history_table.find('.for_empty_list').length==0){

            $history_table.find('tr:not(.table_header)').remove();

        }

        balance.controller.get_user_history(startPos, limit, function(data) {
            balance.view.render_user_history(data);
        });
    }
};