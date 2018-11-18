<!DOCTYPE html>
<html lang="ru">
    <head>
        <!-- livereload с grunt, не удалять. Автоматически удаляется при упаковке -->
        <script src="http://localhost:2201/livereload.js"></script>
        
        <!-- блок метаданных -->
        <meta charset="UTF-8">
        <title>Мясорубка</title>
        <meta name="viewport" content="width=device-width">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <?php include('html/parts/meta_tags.html'); ?>
        
        <!-- блок статического и динамического критического css не удалять -->
        <style>
            <?php include('css/head.css'); ?>
        </style>
        <style>
            /*critical.css*/
        </style>
        <!-- <script>if(location.protocol!='https:'){location.href='https:'+window.location.href.substring(window.location.protocol.length);}</script> -->
        <?php $url = ''; ?>
        <script>var source_url = '';</script>
        

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-128205780-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-128205780-1');
        </script>


    </head>
    <body data-revision="000" data-lbl="">
        <!-- на body есть атрибут data-revision который используется в test/dist-->

        <div id="loading_wrap">

        </div>

        
        <div class="app-wrap">
            <?php include('html/parts/header.html'); ?>
            <div id="main_cont"></div>            

            <div class="cart-wrap">
                <div class="c-wrp" id="cart_wrp"></div>
                <div class="c-wrp" id="checkout_wrp"></div>
            </div>
            <?php include('html/parts/footer.html'); ?>
        </div>
        <!-- асинхронная иницализация -->    
        <script src="<?php echo $url; ?>/js/init.js" type="text/javascript" async></script>
    </body>
</html>