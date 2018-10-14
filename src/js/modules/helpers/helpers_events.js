;

'use strict';

console.log('helpers.events start');

helpers.events = {

    bind_forms_events: function() {

        var $pop = helpers.view.wrap.find('.pop');
        var $inp_name = $pop.find('input[name="name"]');

        $inp_name.blur(function() {
            if ($(this).is(':visible') && $(this).val().length < 2) {
                $(this).addClass('error-input');
            }
        });
        $inp_name.focus(function() {
            $(this).removeClass('error-input');
        });





        var $inp_phone = $pop.find('input[name="phone"]');

        $inp_phone.blur(function() {
            if ($(this).is(':visible') && $(this).val().length < 9 || $(this).is(':visible') && $(this).val().length > 21) {
                $(this).addClass('error-input');
            }
        });
        $inp_phone.focus(function() {
            $(this).removeClass('error-input');
        });
        $pop.find('form').unbind('submit');
        $pop.find('form').submit(function(e) {
            e.preventDefault();
            var $this = $(this);
            var $form_inputs = $this.find('input[type="text"]');
            $form_inputs.trigger('blur');
            if (!$form_inputs.hasClass('error-input')) {

                helpers.controller.send_callback({
                    phone: $this.find('input[name="phone"]').val(),
                    name_v: $this.find('input[name="name"]').val(),
                    comment: $this.find('input[name="target"]').val(),
                    price: $this.find('input[name="price"]').val(),
                    //comment: $this.find('input[name="comment"]').val()
                }, function() {
                    $this.closest('.pop').arcticmodal('close');
                    show_info_pop('Ваше обращение принято. Мы скоро с Вами свяжемся');


                });


            } else {

                var eror_pop_text = '';
                if ($this.find('input[name="name"]').hasClass('error-input') && !$this.find('input[name="phone"]').hasClass('error-input')) {
                    eror_pop_text = 'Пожалуйста введите имя';
                } else
                if ($this.find('input[name="phone"]').hasClass('error-input') && !$this.find('input[name="name"]').hasClass('error-input')) {
                    eror_pop_text = 'Пожалуйста введите телефон';
                } else
                if ($this.find('input[name="phone"]').hasClass('error-input') && $this.find('input[name="name"]').hasClass('error-input')) {
                    eror_pop_text = 'Пожалуйста введите имя и телефон';
                }
                show_alert_mess(eror_pop_text);

                // if ($(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="email"]').hasClass('error-input') && !$(this).find('input[name="custom"]').hasClass('error-input')) {
                //     eror_pop_text = 'Пожалуйста введите имя';
                // } else
                // if ($(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="email"]').hasClass('error-input') && !$(this).find('input[name="custom"]').hasClass('error-input')) {
                //     eror_pop_text = 'Пожалуйста введите телефон';
                // } else
                // if ($(this).find('input[name="email"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="custom"]').hasClass('error-input')) {
                //     eror_pop_text = 'Пожалуйста введите email';
                // } else
                // if ($(this).find('input[name="custom"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="email"]').hasClass('error-input')) {
                //     eror_pop_text = 'Пожалуйста введите ' + $(this).find('input[name="custom_name"]').val().toLowerCase();
                // } else
                // if ($(this).find('input[name="phone"]').hasClass('error-input') && $(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="email"]').hasClass('error-input') && !$(this).find('input[name="custom"]').hasClass('error-input')) {
                //     eror_pop_text = 'Пожалуйста введите имя и телефон';
                // } else
                // if ($(this).find('input[name="phone"]').hasClass('error-input') && $(this).find('input[name="email"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="custom"]').hasClass('error-input')) {
                //     eror_pop_text = 'Пожалуйста введите телефон и email';
                // } else
                // if ($(this).find('input[name="email"]').hasClass('error-input') && $(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="custom"]').hasClass('error-input')) {
                //     eror_pop_text = 'Пожалуйста введите имя и email';
                // } else
                // if ($(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="email"]').hasClass('error-input') && $(this).find('input[name="custom"]').hasClass('error-input')) {
                //     eror_pop_text = 'Пожалуйста введите телефон и ' + $(this).find('input[name="custom_name"]').val().toLowerCase();
                // } else
                // if (!$(this).find('input[name="phone"]').hasClass('error-input') && $(this).find('input[name="email"]').hasClass('error-input') && !$(this).find('input[name="name"]').hasClass('error-input') && $(this).find('input[name="custom"]').hasClass('error-input')) {
                //     eror_pop_text = 'Пожалуйста введите email и ' + $(this).find('input[name="custom_name"]').val().toLowerCase();
                // } else
                // if (!$(this).find('input[name="email"]').hasClass('error-input') && $(this).find('input[name="name"]').hasClass('error-input') && !$(this).find('input[name="phone"]').hasClass('error-input') && $(this).find('input[name="custom"]').hasClass('error-input')) {
                //     eror_pop_text = 'Пожалуйста введите имя и ' + $(this).find('input[name="custom_name"]').val().toLowerCase();
                // } else
                // if ($(this).find('input[name="email"]').hasClass('error-input') && $(this).find('input[name="name"]').hasClass('error-input') && $(this).find('input[name="phone"]').hasClass('error-input') && !$(this).find('input[name="custom"]').hasClass('error-input')) {
                //     eror_pop_text = 'Пожалуйста введите имя, телефон и email';
                // }
                // if ($(this).find('input[name="custom"]').hasClass('error-input') && $(this).find('input[name="name"]').hasClass('error-input') && $(this).find('input[name="phone"]').hasClass('error-input') && $(this).find('input[name="custom"]').hasClass('error-input')) {
                //     eror_pop_text = 'Пожалуйста введите имя, телефон и ' + $(this).find('input[name="custom_name"]').val().toLowerCase();
                // }
                // if ($(this).find('input[name="name"]').hasClass('error-input') && $(this).find('input[name="email"]').hasClass('error-input') && $(this).find('input[name="custom"]').hasClass('error-input')) {
                //     eror_pop_text = 'Пожалуйста введите имя, email и ' + $(this).find('input[name="custom_name"]').val().toLowerCase();
                // }
                //$('#errors').find('.h3').html(eror_pop_text);
            }
        });
    },

    rebind: function() {

        helpers.events.bind_forms_events();

        helpers.view.wrap.find('a.button').unbind('click');
        helpers.view.wrap.find('a.button').click(function(e) {
            e.preventDefault();
            var target = $(this).attr('data-target');
            if (if_defined(target)) {
                var $pop = helpers.view.wrap.find('.pop');

                $pop.find('input[name="target"]').val(target);
                $pop.find('input[name="price"]').val(parseInt($(this).closest('.helper').find('.price').text().replace(' ','')));

                $pop.arcticmodal();
            } else {
                $('#experts_body').addClass('force_close').arcticmodal('close');

                open_from_url('/trafic/edit?i=new', true);

            }
        });

        helpers.view.wrap.find('a.alt').unbind('click');
        helpers.view.wrap.find('a.alt').click(function(e) {
            e.preventDefault();
            open_from_url('/tools', true);
        });
        helpers.view.wrap.find('.foot.more').find('span.ic').unbind('mouseover mouseleave');
        helpers.view.wrap.find('.foot.more').find('span.ic').hover(function() {
           var $wrp =  $(this).closest('.frame').find('.text');
           $wrp.children('ul').hide();
           $wrp.parent().children('.result').hide();
           $wrp.children('span').css({'display':'block'});
        }, function() {
           var $wrp =  $(this).closest('.frame').find('.text');
           $wrp.children('span').hide();
           $wrp.children('ul').show();
           $wrp.parent().children('.result').show();
        });


        var $pop = helpers.view.wrap.find('.pop');
        $pop.find('.close').unbind('click');
        $pop.find('.close').click(function(e) {
            $(this).closest('.pop').arcticmodal('close');
        });



    }

}