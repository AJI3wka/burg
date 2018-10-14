;

'use strict';

console.log('promo.events start');

promo.events = {


    rebind: function() {



        var $wrap = promo.view.wrap;
        $wrap.find('#promo_wrap').uitooltip();

        var lbl = $('body').attr('data-lbl');
        if (lbl!='atom.dnk.bz') {

            if (lbl == 'steps.one') {

                $wrap.find('img[data-src="img/logo.png"]').attr('data-src','img/steps_logo.png');


                $('.lbl-id').html('Steps.one')
            }


        }else{
            $('.lbl-id').html('DNK Atom')
        }


        $wrap.find('img[data-src]').each(function(index, el) {
            $(this).attr('src',source_url+ '/'+ $(this).attr('data-src'));
        });

        var $list_it = $wrap.find('.sn5').find('.btn-list').find('.item');
        $list_it.unbind('click');
        $list_it.click(function(){
            promo.view.show_tariffs_by_time(parseInt($(this).attr('data-time')));
        }).first().trigger('click');

        $wrap.find('#promo_wrap').find('a.a').click(function (e) {
            e.preventDefault();
            open_from_url($(this).attr('href'),true);
        })
        //$('#promo_wrap .show-eye').unbind('mouseenter mouseleave');
        // $('#promo_wrap .show-eye').on('mouseenter',function(){
        //     $(this).parent().children('input').attr('type','text');
        // });
        //  $('#promo_wrap .show-eye').on('mouseleave',function(){
        //     $(this).parent().children('input').attr('type','password');

        //  });
        //  
        
        $wrap.find('#promo_wrap .show-eye').unbind('click');
        $wrap.find('#promo_wrap .show-eye').on('click',function(){
            var $inp = $(this).parent().children('input')
            var type = $inp.attr('type');
            if (type == 'password') {
                $inp.attr('type','text');
                $(this).addClass('active');
            }else{

                $inp.attr('type','password');
                $(this).removeClass('active');
            }
        });
        
        $wrap.find('#promo_wrap .show-eye').each(function(index, el) {
            if ($(this).closest('.p-inp-wrap').find('.strong').length == 0 && $(this).closest('.p-inp-wrap').hasClass('w-strong')) {
                $(this).closest('.p-inp-wrap').append('<span class="strong"></span>');
                $(this).closest('.p-inp-wrap').find('input').keyup(function(event) {
                    /* Act on the event */
                    var password = $(this).val();
                    var $res = $(this).closest('.p-inp-wrap').find('.strong');
                    //$res.removeClass();
                      var strength = 0

                      if (password.length < 6) { 
                        $res.removeClass('normal hard').addClass('easy').html('Короткий');
                        return;
                       }

                      if (password.length > 7) strength += 1

                      if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1

                      if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  strength += 1 

                      if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1

                      if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1


                    if (strength < 2 ) {
                        
                        $res.removeClass('normal hard').addClass('easy').html('Слабый');       
                    } else if (strength == 2 ) {
                        $res.removeClass('easy hard').addClass('normal').html('Нормальный'); 
                    } else {
                        $res.removeClass('normal easy').addClass('hard').html('Сильный'); 
                    }
                });
            }
        });     


var isMobile = false;
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;
console.log('isMobile = ' + isMobile);

function init_promo() {

    var promo = findGetParameter('promo');
    if (promo.length > 1) {
        setCookie('dnk_promo_register', promo, 24*31);
        history.pushState('', document.title, './');

    }
 
    var promo_code = getCookie('dnk_promo_register');
    if (promo_code.length > 1) {
        $wrap.find('input[name="promo_code"]').val(promo_code).attr('readonly', 'readonly');
    }

}

function make_register_promo(data, callback) {

    

    var register_url_promo = api_config.default + 'User/register';

    //data.partner = 'dnk_atom';

    get_json('post', register_url_promo, data, callback, false, function(bad_response) {
        //console.log(bad_response);
        if (bad_response.statusCode === 401) {

            show_alert_mess('Вы ввели неверный промокод');
            $wrap.find('input[name="promo_code"]').val('').removeAttr('readonly');

        } else
        if (bad_response.alreadyRegister === true) {

            // $('#login').arcticmodal();
            // $('#user-init').attr('data-step', 0);
            show_alert_mess('Адрес уже зарегистрирован в системе. Вы можете восстановить пароль');
        } else {

            show_alert_mess(bad_response.msg);
            // $('#user-init').attr('data-step', 0);

        }

    },false,function(){},true);
}
//promo end

// функция отображения активного элемента навигации для активной секции
function scrollControl() {
    var currentScroll, currentScreen = $wrap.find('section #s1');
    currentScroll = $(document).scrollTop();
    $wrap.find('.navigation li').removeClass('active'); // для навигационной панели слева убрать клас
    $wrap.find('.head-nav li').removeClass('active'); // для навигационной панели в шапке убрать клас
    $wrap.find('section').each(function () {
        var screen = $(this),
            screenOffset = $(this).offset().top,
            screenHeight = $(this).outerHeight();
        if (currentScroll > screenOffset - screenHeight * 0.51) currentScreen = screen;
    });
    var panelLink = $wrap.find('.navigation li a[href="#' + currentScreen.attr('id') + '"]'); // для навигационной панели слева найти активный елемент
    var menuLink = $wrap.find('.head-nav li a[href="#' + currentScreen.attr('id') + '"]'); // для навигационной панели в шапке найти активный елемент
    if (panelLink.length > 0) panelLink.parents('li').addClass('active').siblings().removeClass('active'); // для навигационной панели слева накинуть клас на активный елемент 
    if (menuLink.length > 0) menuLink.parents('li').addClass('active').siblings().removeClass('active'); // для навигационной панели в шапке накинуть клас на активный елемент 
}

// функция стабилизации высоты экрана при фуллпейдж
function stabilize() {
    $wrap.find('section:not(:hidden)').each(function() {
        var eTop = $(this).offset().top;
        var posTop = eTop - $(window).scrollTop();
        if ($(this).attr('id') === 's8' && posTop > 0 / 2 && posTop < $(window).height() / 2) { // отменить стабилизации для последней секции, чтобы не блокировало отображения футера
            $("html, body").animate({
                scrollTop: $(this).offset().top
            }, 250);
        } else if ($(this).attr('id') !== 's8' && posTop > -$(window).height() / 2 && posTop < $(window).height() / 2) {
            $("html, body").animate({
                scrollTop: $(this).offset().top
            }, 250);
        }
    });
}

// плавный скроллинг к нужной секции 
function animateScrollTo(e, el) {
    e.preventDefault();
    // при выполнении условия скролить с учетом высоты верхней фиксированной панели навигации (шапки)
    if ($(window).height() < 600) {
        if ($(el).attr("href") !== "#") $("html, body").animate({
            scrollTop: ($($(el).attr('href')).offset().top - $('header').height() + 10)
        }, 500);
    } else {
        if ($(el).attr("href") !== "#") $("html, body").animate({
            scrollTop: $($(el).attr('href')).offset().top
        }, 500);
    }
}

// функция изменения стиля верхней панели навигации при скроллинге
function hfixed() {
    var $header = $wrap.find('header');
    if ($(window).scrollTop() > $header.height()) {
        $header.addClass('h-fixed');
    } else {
        $header.removeClass('h-fixed');
    }
}

// открыть подсказку для чата carrotquest с нужним текстом
function carrotQuestInit() {
    var $carrotquestMessengerCollapsedDiv = $wrap.find('#carrotquest-messenger-collapsed').find('>div');
    var $carrotquestCollapsedText = $wrap.find('#carrotquest-collapsed-text');
    $wrap.find('#carrotquest-collapsed-text-text-cont').text('Онлайн чат');
    $carrotquestMessengerCollapsedDiv.mouseover(function() {
        $carrotquestCollapsedText.addClass('hover');
    });
    $carrotquestMessengerCollapsedDiv.mouseout(function() {
        $carrotquestCollapsedText.removeClass('hover');
    });
}

// вставка iframe сайта в первый слайд слайдера второго блока
function insertSlliderIframe() {

    var lbl = $('body').attr('data-lbl');
    var $div = $wrap.find('#s2').find('.with-iframe'); // находим нужный слайд
    var iframeSrc = '//quiz.dnk.bz'; // берём адрес сайта для iframe

    if (lbl == 'steps.one') {
        iframeSrc = '//quiz.steps.one';
    }
    
    var divW = $div.width(); // ширина блока в котором будет iframe
    var divH = $div.height(); // висота блока в котором будет iframe
    var iframeW = 1024; // ширина iframe для отображения сайта в айфрейме при данном разшерении
    var iframeH = (iframeW / divW) * divH; // сделать висоту iframe пропорционально к блоку в котором будет iframe
    var iframe = '<iframe width="' + iframeW + '" height="' + iframeH + '" src="' + iframeSrc + '"></iframe>'; // создать iframe
    $div.append(iframe); // втавить iframe куда надо
    resizeIframe(); // змаштабировать iframe
}
// маштабирование iframe 
function resizeIframe() {
    var $s2 = $wrap.find('#s2');
    var $div = $s2.find('.with-iframe'); // находим нужный слайд
    var $iframe = $s2.find('.with-iframe iframe'); // находим iframe
    var divW = $div.width(); // ширина блока з iframe
    var iframeW = 1024; // ширина iframe для отображения сайта в айфрейме при данном разшерении
    var scale = divW / iframeW; // вичислить нужный масштаб
    $iframe.css({ // змаштабировать iframe
        transform: 'scale(' + scale + ')',
        transformOrigin: '0 0',
        msZoom: scale,
        mozTransform: 'scale(' + scale + ')',
        mozTransformOrigin: '0 0',
        oTransform: 'scale(' + scale + ')',
        oTransformOrigin: '0 0',
        webkitTransform: 'scale(' + scale + ')',
        webkitTransformOrigin: '0 0'
    });
}


function init_promocode(){

    var promc = getURLParameter('promocode');


    if(promc && if_defined(promc) && promc.length>2){

        setCookie('dnk_promocode',promc,24);

        history.replaceState('',document.title, '/');

    }

    var promocode = getCookie('dnk_promocode');
    if(promocode && if_defined(promocode) && promocode.length>2){
        var $form = $('#main-form');

        $form.addClass('has-promocode');

        $form.find('input[name="promocode"]').val(promocode);

        $form.find('input[name="promo_check"]').attr('checked','checked');
        

    }

}

// jQuery
(function($) {

    // ============================ DOCUMENT.READY ================================================================================

    $(document).ready(function() {
        var $wrap = promo.view.wrap;
        var $s2 = $wrap.find('#s2');
        var $s6 = $wrap.find('#s6');
        var $s7 = $wrap.find('#s7');


        $wrap.find('#promocode_label').click(function(event) {
            
            if($(this).find('input').is(':checked')){
                $(this).closest('form').addClass('has-promocode');
            }else{
                $(this).closest('form').removeClass('has-promocode');
            }
        });

        $s6.find('.text-pager').mCustomScrollbar({
            theme: "dnk",
            scrollInertia: 0
        });
        $s6.find('.bxslider li').mCustomScrollbar({
            theme: "dnk",
            scrollInertia: 0
        });

        // создание слайдера для блока 
        // 
        var sec2HeaderSlider
        if ($s2.find('.header-bxslider').closest('.bx-viewport').length == 0) {
            sec2HeaderSlider = $s2.find('.header-bxslider').bxSlider({// слайдер заголовков
            responsive: true,
            infiniteLoop: false,
            controls: false,
            nextSelector: '',
            prevSelector: '',
            pager: false,
            speed: 500,
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 1,
            slideMargin: 50,
            touchEnabled: false
        });

        }
        var sec2Slider
        if ($s2.find('.bxslider').closest('.bx-viewport').length == 0) {
        sec2Slider = $s2.find('.bxslider').bxSlider({// слайдер в macbook
            mode: 'fade',
            responsive: true,
            infiniteLoop: true,
            controls: false,
            nextSelector: '',
            prevSelector: '',
            pager: true,
            pagerCustom: '#s2 .pager',
            auto: true,
            pause: 3000,
            speed: 500,
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 1,
            slideMargin: 50,
            touchEnabled: false,
            onSliderLoad: function() {
                //if (!if_defined(isMobile)) {
                    setTimeout(insertSlliderIframe, 200); // вставка Iframe в слайд
                //}
        $s2.find('.with-iframe').unbind('hover');
        $s2.find('.with-iframe').hover(function() { // приостоновка/запуск слайдера при наведении/уходе мышы из Iframe
            sec2Slider.stopAuto();
        }, function() {
            sec2Slider.startAuto();
        });
            }, 
            onSlideBefore: function($slideElement, oldIndex, newIndex) {
                $s2.find('.pager li').removeClass('active');
                $s2.find('.pager li[data-sld="' + newIndex + '"]').addClass('active');
                $s2.find('.bxslider img').lazyload();
                sec2HeaderSlider.goToSlide(newIndex); // переключение слайдера заголовков одновременно со слайдером в macbook
            }
        });
        }


        // создание слайдера для блока 4
        // $('#s4 .bxslider').bxSlider({
        //     responsive: false,
        //     infiniteLoop: false,
        //     controls: false,
        //     nextSelector:'',
        //     prevSelector:'',
        //     pager: true,
        //     pagerCustom: '#s4 .pager',
        //     auto: false,
        //     speed: 500,
        //     minSlides: 1,
        //     maxSlides: 1,
        //     moveSlides: 1,
        //     slideMargin: 50,
        //     onSlideBefore:function($slideElement, oldIndex, newIndex){
        //         $('#s4 .pager li').removeClass('active');
        //         $('#s4 .pager li[data-sld="'+newIndex+'"]').addClass('active');
        //     }
        // });

        
        if ($s6.find('.bxslider').closest('.bx-viewport').length == 0) {
            

           
            // создание слайдера для блока 6
            $s6.find('.bxslider').bxSlider({
                responsive: true,
                infiniteLoop: false,
                controls: false,
                nextSelector: '',
                prevSelector: '',
                pager: true,
                pagerCustom: '#s6 .text-pager',
                auto: false,
                speed: 500,
                minSlides: 1,
                maxSlides: 1,
                moveSlides: 1,
                slideMargin: 50,
                touchEnabled: false,
                onSlideBefore: function($slideElement, oldIndex, newIndex) {
                    $s6.find('.text-pager li').removeClass('active');
                    $s6.find('.text-pager li[data-sld="' + newIndex + '"]').addClass('active');
                }
            });
        }
        // установка плагина скролла в блоге
        $s6.find('.text-pager').mCustomScrollbar({
            theme: "dnk",
            scrollInertia: 0
        });
        $s6.find('.bxslider li').mCustomScrollbar({
            theme: "dnk",
            scrollInertia: 0
        });

        // создание слайдера для блока 7
        
        if ($s7.find('.bxslider').closest('.bx-viewport').length == 0) {


            $s7.find('.bxslider').bxSlider({
                responsive: true,
                infiniteLoop: false,
                controls: false,
                nextSelector: '',
                prevSelector: '',
                pager: true,
                pagerCustom: '#s7 .bx-pager',
                auto: false,
                speed: 500,
                minSlides: 1,
                maxSlides: 1,
                moveSlides: 1,
                slideMargin: 50,
                touchEnabled: false,
                onSlideBefore: function($slideElement, oldIndex, newIndex) {
                    $s7.find('.pager li').removeClass('active'); // переключение основного пагинатора
                    $s7.find('.pager li[data-sld="' + newIndex + '"]').addClass('active'); // переключение основеого пагинатора
                    $s7.find('.photo-pager li').removeClass('active item-1 item-2 item-3 item-4'); // переключение пагинатора з фото
                    $s7.find('.photo-pager li[data-sld="' + newIndex + '"]').addClass('active item-1'); // накидка класа на фото активного слайда
                    for (i = 2; i <= 4; i++) { // накидка нужных классов на фото остальных слайдов
                        newIndex++;
                        if (newIndex === 4) newIndex = 0;
                        $s7.find('.photo-pager li[data-sld="' + newIndex + '"]').addClass('item-' + i);
                    }
                }
            });
        }


        // стабилизации высоты экрана при фуллпейдж
        $("html, body").unbind("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
        $("html, body").on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function() {
            $("html, body").stop();
        });
        $(window).unbind('scroll', function() {
                if ($(window).height() < 600 || $(window).width() < 1005) return;
                clearTimeout($.data(this, 'scrollTimer'));
                $.data(this, 'scrollTimer', setTimeout(stabilize, 1500));
            })
        if (!isMobile) {
            $(window).scroll(function() {
                if ($(window).height() < 600 || $(window).width() < 1005) return;
                clearTimeout($.data(this, 'scrollTimer'));
                $.data(this, 'scrollTimer', setTimeout(stabilize, 1500));
            });
        }

        // изменение (масштабирование) размеров Iframe при изменении размеров окна браузера
        $(window).unbind('resize', function() {
            if (!isMobile) {
                resizeIframe();
            }
        });
        $(window).on('resize', function() {
            if (!isMobile) {
                resizeIframe();
            }
        });

        // изменения стиля верхней панели навигации при скроллинге
        $(window).unbind('scroll',function() {
            hfixed();
        });        
        $(window).scroll(function() {
            hfixed();
        });

        // отображения активного элемента навигации для активной секции
        $(window).unbind('scroll', scrollControl);
        $(window).on('scroll', scrollControl);

        // предотвратить действие по умолчанию для всех ссылок с атрибутом [href="#"]
        $wrap.find('a[href="#"]').unbind('click');
        $wrap.find('a[href="#"]').click(function(e) {
            e.preventDefault();
        });

        // переход по клику на заголовок ститьи курса з атрибутом  data-course="..." на страницу етого курса
        $wrap.find('.bxslider h3').unbind('click');
        $wrap.find('.bxslider h3').click(function() {
            document.location.href = $(this).attr('data-course');
        });

        // плавный скроллинг к нужной секции
        $wrap.find('.navigation a').unbind('click');
        $wrap.find('.navigation a').click(function(e) { // плавный скроллинг к нужной секции при клике на боковой навигации
            animateScrollTo(e, this);
        });
        $wrap.find('.head-nav a').unbind('click');
        $wrap.find('.head-nav a').click(function(e) { // плавный скроллинг к нужной секции при клике на навигацию в шапке
            animateScrollTo(e, this);
            if (!$(this).hasClass('menu-btn')) $wrap.find('.head-nav').removeClass('opened');
        });
        $wrap.find('a.try-free-btn,.scrl-btn').unbind('click');
        $wrap.find('a.try-free-btn,.scrl-btn').click(function(e) { // плавный скроллинг к форме в последней секции при клике на кнопку "регестрируйся сейчас"
            animateScrollTo(e, this);
        });


        $wrap.find('.menu-btn').unbind('click');
        // открыть/закрыть меню на мобильной версии
        $wrap.find('.menu-btn').click(function(e) {
            e.preventDefault();
            $wrap.find('.head-nav').toggleClass('opened');
        });

        // открыть поп-ап "политика конфиденциальности" arcticmodal 
        
        $wrap.find('a.confi-btn').unbind('click');
        $wrap.find('a.confi-btn').click(function() {
            $wrap.find('#confi-pop').arcticmodal();
        });

        function validateEmail(email) {
            
                var regexp = /^(?!\.)((?!.*\.{2})[a-zA-Z0-9\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFFu20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF\.!#$%&'*+-/=?^_`{|}~\-\d]+)@(?!\.)([a-zA-Z0-9\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF\-\.\d]+)((\.([a-zA-Z\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF]){2,63})+)$/i;
                return regexp.test(email);
        }
        // валидация поля email
        var $inputEmail = $wrap.find('input[name="email"]');
        $inputEmail.unbind('blur');
        $inputEmail.blur(function() {
            if (!validateEmail($(this).val())) {
                $(this).addClass('error-input');
            }
        });
        $inputEmail.unbind('focus');
        $inputEmail.focus(function() {
            $(this).removeClass('error-input');
        });
        var $inputpass = $wrap.find('input[type="password"]');
        $inputpass.unbind('blur');
        $inputpass.blur(function() {
            var $elem = $(this);
            var inp_value = $elem.val();

            var patt4 = new RegExp(/^[a-zA-Z0-9_-]*$/);

            if (inp_value.length < 4) {

                $elem.addClass('error-input').addClass('error-input');

            } else if (inp_value.length > 50) {

                $elem.addClass('error-input').addClass('error-input');

            // } else if (inp_value.length > 0 && !patt4.test(inp_value)) {

            //     $elem.addClass('error-input').addClass('error-input');

            } else {
                $elem.removeClass('error-input').removeClass('error-input');
            }   
        });
        $inputpass.unbind('focus');
        $inputpass.focus(function() {
            $(this).removeClass('error-input');
        });

        // функция отправки форм ajaxsubmit
        $wrap.find('form').unbind('submit');
        $wrap.find('form').submit(function(e) {
            var _this = this;
            e.preventDefault();
            // забрать фокус из всех инпутов
            $(this).find('input[type="password"]').trigger('blur');
            $(this).find('input[name="email"]').trigger('blur');


            var $errors = $('#errors');
            // проверка валидности полей
            if (!$(this).find('input[type="password"]').hasClass('error-input') &&
                !$(this).find('input[name="email"]').hasClass('error-input')) {


                if ($(this).find('input[name="privacy"]:checked').length==1) {


                    if ($(this).find('input[name="terms"]:checked').length==1) {



                        var cur_val = $(_this).find('input[name="email"]').val();
                        var n_val = punycode.ToASCII(cur_val.split('@')[0]) + '@' + punycode.ToASCII(cur_val.split('@')[1])
                        

                        if ($wrap.find('#promo_check:checked').length>0) {

                            ////alert($('#promo_check:checked').length>0);
                            ////alert($('#promocode').val());
                            var promo_code_str = $wrap.find('#promocode').val();

                            if(promo_code_str.length > 2){ 

                                make_register_promo({
                                    email:n_val,
                                    password:$(_this).find('input[name="password"]').val(),
                                    password_confirm:$(_this).find('input[name="password"]').val(),
                                    partner:promo_code_str
                                }, function() {
                                    setCookie('dnk_promocode','',-1);
                                    $.arcticmodal('close');
                                    show_info_pop('Для продолжения, перейдите по ссылке, отправленной на указанный email');
                                    
                                });

                            }else{
                        
                                $errors.find('p').text('Введите промокод');
                                $errors.arcticmodal();

                            }

                        }else{

                            //console.log('          send_confirm() - ', data);

                            make_register_promo({
                                email:n_val,
                                password:$(_this).find('input[name="password"]').val(),
                                password_confirm:$(_this).find('input[name="password"]').val(),
                                partner:'dnk_atom'
                            }, function() {
                                setCookie('dnk_promocode','',-1);
                                $.arcticmodal('close');
                                show_info_pop('Для продолжения, перейдите по ссылке, отправленной на указанный email');
                                    
                            });

                        }

                    }else{
                        
                        $errors.find('p').text('Вы должны принять пользовательское соглашение');
                        $errors.arcticmodal();
                    }

                }else{
                        
                    $errors.find('p').text('Вы должны дать согласие на обработку персональных данных');
                    $errors.arcticmodal();
                
                }

            } else {
                // // запись и вивод поп-апа ошыбки
                // $errors.find('p').text('Пожалуйста введите email');
                // $errors.arcticmodal();
            }
        });

    $wrap.find('.terms_checkbox').unbind('click');
    $wrap.find('.terms_checkbox').click(function(e){
        e.stopPropagation();
        e.preventDefault();
            open_from_url($(this).attr('href'),true);
    });
    $wrap.find('.login-btn').unbind('click');
    $wrap.find('.login-btn').click(function(e) {
        e.preventDefault();
        open_from_url($(this).attr('href'),true);

        /* Act on the event */
    });

    init_promocode();

    });



})(jQuery);



    	// var $login_btn = promo.model.frame.find('.login-btn')
    	// $login_btn.attr('onclick', 'return false;').unbind('click');
    	// $login_btn.unbind('click');
    	// $login_btn.bind('click',function(){
    	// 	open_part('login');
    	// });


    	// var $terms = promo.model.frame.find('.terms_checkbox');
    	// $terms.attr('onclick', 'return false;').unbind('click');
    	// $terms.unbind('click');
    	// $terms.bind('click',function(){
    	// 	open_from_url($(this).attr('href').replace('//atom.dnk.bz',''),true);
    	// });
    	
    }

}
