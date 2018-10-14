<!DOCTYPE html>
<html lang="ru">
    <head>
        <!-- livereload с grunt, не удалять. Автоматически удаляется при упаковке -->
        <script src="http://localhost:3358/livereload.js"></script>
        
        <!-- блок метаданных -->
        <meta charset="UTF-8">
        <title>DNK</title>
        <meta name="viewport" content="width=1280">
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
        

    </head>
    <body data-revision="000" data-lbl="">
        <!-- на body есть атрибут data-revision который используется в test/dist-->



        <?php include('html/parts/header.html'); ?>
        

        <div class="app-wrap">            

        </div>
        <?php include('html/parts/footer.html'); ?>
        <!-- асинхронная иницализация -->    
        <script src="<?php echo $url; ?>/js/init.js" type="text/javascript" async></script>
    </body>
</html>