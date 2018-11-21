;

'use strict';

console.log('checkout.events start');

checkout.events = {


    rebind_cart: function() {
        checkout.view.wrap.find('.more').unbind('click').click(function() {
            $('header').find('.korzina').trigger('click');
        });

    },
    rebind_checkout: function() {
        checkout.view.checkout_wrap = checkout.view.wrap.find('.infm');

        var $w = checkout.view.checkout_wrap;
        $w.find('textarea').unbind('keydown').keydown(function(event) {
            /* Act on the event */
            if (this.clientHeight < this.scrollHeight) {
                this.style.height = this.scrollHeight + 'px';
            }
        });;
        $w.find('input[name="phone"]').mask('+38 999 999 99 99');
        $w.find('input[name="phone"]').unbind('focus blur').focus(function() {
            $(this).trigger('keydown keyup keypress');
            $(this).closest('.inp-wrap').removeClass('error-input');

        }).blur(function() {
            var $this = $(this);

            if ($this.val().length != 17 || $this.val().indexOf('_') > -1) {

                $this.closest('.inp-wrap').addClass('error-input').addClass('drag-input');


                setTimeout(function() {
                    $this.closest('.inp-wrap').removeClass('drag-input');

                }, 1000)

            }


        });

        $w.find('button.ready').unbind('click').click(function(e) {
            e.preventDefault();
            checkout.view.checkout_wrap.find('input').trigger('blur');

            var $err = checkout.view.checkout_wrap.find('.error-input');

            if ($err.length == 0) {

                checkout.model.send_cart();

            } else {
                $("html, body").animate({
                    scrollTop: $err.first().offset().top - 120
                }, 300);
            }
        });

        $w.find('#pay_s').unbind('blur').blur(function(e) {
            e.preventDefault();

            var $this = $(this);

            if ($this.val() == 'none') {

                $this.closest('.inp-wrap').addClass('error-input').addClass('drag-input');


                setTimeout(function() {
                    $this.closest('.inp-wrap').removeClass('drag-input');

                }, 1000)

            }

        });

        $w.find('.tog').unbind('click').click(function(e) {
            e.preventDefault();

            var $t = $(this);
            var $p = $t.parent()
            if (!$t.hasClass('disactive')) {


                $p.find('.tog').removeClass('active');
                $t.addClass('active');
                $p.find('#pay_s').val($t.attr('data-val'))//.trigger('blur');
                $p.closest('.inp-wrap').removeClass('error-input');
            } else {
                var $a = $p.closest('.infm').find('.add_info');
                $a.fadeOut(200, function() {
                    $a.fadeIn(200, function() {
                        $a.fadeOut(200, function() {
                            $a.fadeIn(200);
                        });
                    });
                });
            }

        });

    },

    rebind: function() {


        checkout.view.wrap.find('.slide_1').find('a').unbind('click').click(function(e) {
            e.preventDefault();
            if (!$(this).is('.burgers')) {

                open_from_url($(this).attr('href'), true);
            }

        });
    }

}