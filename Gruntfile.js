module.exports = function(grunt) {

    /* Создание массивов-списков js на удаление
    а также объектов соответсвия для склейки модулей с 5ти в 1н файл и базовых скриптов
    СТАРТ*/

    var spa_config = grunt.file.readJSON('src/config.json.dist');
    //ВАЖНО! В конфиге должны быть преечислены все используемые модули и базовые функции

    var spa_modules = spa_config.js.js_modules;
    var spa_basic = spa_config.js.basic;

    var spa_modules_concat_test = [];
    var spa_modules_concat_prod = [];
    var spa_basic_concat_prod = [];
    var spa_basic_concat_test = [];

    var clean_prod_js_files = ['prod/js/libs/','prod/js/basic/'];
    var clean_test_js_files = ['test/js/libs/','test/js/basic/'];

    for(var i = 0; i < spa_basic.length; i++){

        //clean_test_js_files[clean_test_js_files.length] =  'test/js/basic/'+spa_basic[i]+'.js';
        //clean_prod_js_files[clean_prod_js_files.length] =  'prod/js/basic/'+spa_basic[i]+'.js';

        spa_basic_concat_test[spa_basic_concat_test.length] = 'test/js/basic/'+spa_basic[i]+'.js';
        spa_basic_concat_prod[spa_basic_concat_prod.length] = 'prod/js/basic/'+spa_basic[i]+'.js';
    }

    for (var i = spa_modules.length - 1; i >= 0; i--) {

        spa_modules_concat_test[i] = {};
        spa_modules_concat_test[i]['test/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '.js'] = [
            'test/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_model.js',
            'test/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_view.js',
            'test/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_controller.js',
            'test/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_events.js',
            'test/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_init.js'
        ];

        spa_modules_concat_prod[i] = {};
        spa_modules_concat_prod[i]['prod/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '.js'] = [
            'prod/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_model.js',
            'prod/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_view.js',
            'prod/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_controller.js',
            'prod/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_events.js',
            'prod/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_init.js'
        ];

        clean_test_js_files[clean_test_js_files.length] = 'test/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_model.js';
        clean_test_js_files[clean_test_js_files.length] = 'test/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_view.js';
        clean_test_js_files[clean_test_js_files.length] = 'test/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_controller.js';
        clean_test_js_files[clean_test_js_files.length] = 'test/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_events.js';
        clean_test_js_files[clean_test_js_files.length] = 'test/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_init.js'

        clean_prod_js_files[clean_prod_js_files.length] = 'prod/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_model.js';
        clean_prod_js_files[clean_prod_js_files.length] = 'prod/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_view.js';
        clean_prod_js_files[clean_prod_js_files.length] = 'prod/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_controller.js';
        clean_prod_js_files[clean_prod_js_files.length] = 'prod/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_events.js';
        clean_prod_js_files[clean_prod_js_files.length] = 'prod/js/modules/' + spa_modules[i] + '/' + spa_modules[i] + '_init.js'

    }

    //console.log('spa_basic_concat_prod = ',spa_basic_concat_prod);
    //console.log('spa_basic_concat_test = ',spa_basic_concat_test);
    //console.log('spa_modules_concat_prod = ',spa_modules_concat_prod);
    //console.log('spa_modules_concat_test = ',spa_modules_concat_test);

    /* Создание массивов-списков js на удаление
    а также объектов соответсвия для склейки модулей с 5ти в 1н файл
    КОНЕЦ*/

    //получаем строку времени, используется в борьбе с кешем для идентфиикации версии
    var time = new Date().getTime();

    grunt.option("force", true); //включаем форсирование выполнения


    //иницализация конфига - набора команд
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: { //компиляция sass
            def: {
                options: {
                    sourceMap: true
                },
                files: {
                    'src/css/main.css': 'src/sass/main.scss'
                }
            }
        },

        prettysass: { //beutify sass
            options: {
                indent: 4 //размер таба
            },
            def: {
                src: ['src/sass/global/**/*.scss']
            },
        },

        jsbeautifier: { //бютифай сорсов JS
            def: {
                src: ["src/js/**/*.js"]
            }
        },


        htmlcomb: { //бютифай html 1
            options: {
                removeEmptyValue: false //не удалять пустые значения(атрибутов)
            },
            //для src/
            php: { //бютифай index.php
                src: 'src/index.php',
                dest: 'src/index.php'
            },
            html: { //бютифай всех html файлов
                expand: true,
                cwd: 'src/html/',
                ext: '.html',
                src: ['**/*.html'],
                dest: 'src/html/'
            }
        },


        prettify: { //бютифай html 2
            options: {
                "indent": 4,
                "indent_char": " ",
                "indent_scripts": "normal",
                "wrap_line_length": 0,
                "brace_style": "collapse",
                "preserve_newlines": true,
                "max_preserve_newlines": 2,
                "unformatted": [
                    "code",
                    "pre",
                    "br"
                ]
            },
            //для src/
            php: { //бютифай index.php
                src: 'src/index.php',
                dest: 'src/index.php'

            },
            html: { //бютифай всех html файлов
                expand: true,
                cwd: 'src/html/',
                ext: '.html',
                src: ['**/*.html'],
                dest: 'src/html/'
            }
        },




        concat: { //cклеивание файлов

            //для src/
            js_libs: { //склейка js библиотек
                src: ['src/js/libs/*.js'],
                dest: 'src/js/libs.js'
            },
            css_libs: { //склейка css библиотек
                src: ['src/css/libs/*.css'],
                dest: 'src/css/libs.css'
            },

            //для test/
            test_full_css: { //склейка полного css
                src: ['test/css/libs.css', 'test/css/main.css'],
                dest: 'test/css/full.css'
            },
            test_crit_css: { //скейка выделенного критического css
                src: ['test/css/c/critical.css', 'test/css/c/critical_t.css', 'test/css/c/critical_m.css'],
                dest: 'test/css/c/crit.css'
            },
            test_backup_crit_css: { //скейка выделенного критического css
                src: ['test/css/c/crit.css'],
                dest: 'src/css/critical.cache'
            },
            test_js_modules_concat: { //склейка модулей с 5ти в йн файл для каждого
                files: spa_modules_concat_test
            },
            test_crit_cache: {
                src: ['src/css/critical.cache'],
                dest: 'test/css/c/crit.css'
            },
            test_js_basic_concat:{
                src:spa_basic_concat_test,
                dest:'test/js/basic.js'
            },

            //для prod/
            prod_full_css: { //склейка полного css
                src: ['prod/css/libs.css', 'prod/css/main.css'],
                dest: 'prod/css/full.css'
            },
            prod_crit_css: { //скейка выделенного критического css
                src: ['prod/css/c/critical.css', 'prod/css/c/critical_t.css', 'prod/css/c/critical_m.css'],
                dest: 'prod/css/c/crit.css'
            },
            prod_backup_crit_css: { //скейка выделенного критического css в кеш файл
                src: ['prod/css/c/crit.css'],
                dest: 'src/css/critical.cache'
            },
            prod_js_modules_concat: { //склейка модулей с 5ти в йн файл для каждого
                files: spa_modules_concat_prod
            },
            prod_crit_cache: {
                src: ['src/css/critical.cache'],
                dest: 'prod/css/c/crit.css'
            },
            prod_js_basic_concat:{
                src:spa_basic_concat_prod,
                dest:'prod/js/basic.js'
            }

        },

        'string-replace': { //замение текстовых совпадений


            //для src/
            change_livereload_port_grunt: { //cмена порта livereload в Gruntfile.js
                files: {
                    './': ['Gruntfile.js']
                },
                options: {
                    replacements: [{
                        pattern: /port: \d\d\d\d\, \/\/LIVERELOAD_PORT/ig,
                        replacement: 'port: ' + time.toString().slice(-4).replace(/^0/gi, '1') + ', //LIVERELOAD_PORT'
                    }]
                }

            },
            change_livereload_port_index: { //cмена порта livereload в index.php
                files: {
                    './': ['src/index.php']
                },
                options: {
                    replacements: [{
                        pattern: /localhost:\d\d\d\d\/livereload.js/ig,
                        replacement: 'localhost:' + time.toString().slice(-4).replace(/^0/gi, '1') + '/livereload.js'
                    }]
                }

            },

            //для test/
            test_revision: { //внесение данных для сборки
                files: {
                    './': ['test/index.html','test/html/parts/personal_data.html',  'test/js/init.js', 'test/js/main.js', 'test/.htaccess']
                        /*изменения вносятся в index.html, init.js, main.js
                        .htaccess просто изменяется файл выдачи index.php => index.html*/
                },
                options: {
                    replacements: [{ //cмена глобального фалага(отвечает а загрузку модуля 5/1 файл)
                        pattern: 'var global_build = false',
                        replacement: "var global_build = 't'"
                    }, { //откоминтируем подключение полного css
                        pattern: '//loadCSS(source_url+"/css/full.css");',
                        replacement: 'loadCSS(source_url+"/css/full.css");'
                    }, { //закоментируем подключение libs.css
                        pattern: 'loadCSS(source_url+"/css/libs.css");',
                        replacement: '//loadCSS(source_url+"/css/libs.css");'
                    }, { //закоментируем подключение main.css
                        pattern: 'loadCSS(source_url+"/css/main.css");',
                        replacement: '//loadCSS(source_url+"/css/main.css");'
                    }, { //добавляем строку ревизии загрузке js файлов(скидывание кеша)
                        pattern: /\.js"/ig,
                        replacement: '.js?v=' + time + '"'
                    }, { //добавляем строку ревизии загрузке js файлов(скидывание кеша)
                        pattern: /\.js'/ig,
                        replacement: ".js?v=" + time + "'"
                    }, { //добавляем строку ревизии загрузке css файлов(скидывание кеша)
                        pattern: /\.css"/ig,
                        replacement: '.css?v=' + time + '"'
                    }, { //добавляем строку ревизии загрузке css файлов(скидывание кеша)
                        pattern: /\.css'/ig,
                        replacement: '.css?v=' + time+ "'"
                    }, { //добавляем строку ревизии в тег body 
                        //(используется далее при загрузке модулей - скидывание кеша)
                        pattern: /data-revision=\"\d*\"/ig,
                        replacement: 'data-revision="' + time + '"'
                    }, { //изменяем index.php => index.html в конфиге (.htaccess)
                        pattern: /<div class=\"inp-box/ig,
                        replacement: ' <div class="inp-box'
                    }]
                }
            },
            test_comment_livereload: { //закоментировать livereload в index.html
                files: {
                    './': ['test/index.html']
                },
                options: {
                    replacements: [{
                        pattern: /<script src="http:\/\/localhost:\d\d\d\d\/livereload\.js"><\/script>/ig,
                        replacement: '<!-- <script src="http://localhost:0000/livereload.js"></script> -->'
                    }]
                }

            },
            test_remove_img_from_crit: { //удалить изображения с выделенного критического css
                files: {
                    './': 'test/css/c/crit.css'
                },
                options: {
                    replacements: [{
                        pattern: /(?:background-image)[ ]*:[ ]*url[ ]*\((.*?)\)[ ]*;/ig,
                        replacement: ' '
                    }]
                }
            },
            test_remove_comments_from_json: { //удалить коментарии с json.dist файлов
                files: {
                    './': ['test/config.json.dist']
                },
                options: {
                    replacements: [{
                        pattern: /"__comment__"[ ]*:[ ]*"((\\"|[^"])*)",/ig,
                        replacement: ' '
                    }]
                }
            },


            //для prod/
            prod_images:{

                files: {
                    './': ['prod/html/modal/faq.html']
                        /*изменения вносятся в index.html и init.js,
                        .htaccess просто изменяется файл выдачи index.php => index.html*/
                },
                    options: {
                    replacements: [ { //добавляем строку ревизии загрузке js файлов(скидывание кеша)
                        pattern: /\/img\//ig,
                        replacement: '//atom.dnk.bz/template/Atom/img/'
                    }, ]
                }                
            },
            prod_manifest: { //внесение данных для сборки
                files: {
                    './': ['prod/manifest.php']
                        /*изменения вносятся в index.html и init.js,
                        .htaccess просто изменяется файл выдачи index.php => index.html*/
                },
                options: {
                    replacements: [{ //cмена глобального флага(отвечает за загрузку модуля 5/1 файл)
                        pattern: "('FRONT_VERSION', 1)",
                        replacement: "('FRONT_VERSION', "+time+")"
                    }]
                }
            },
            prod_revision: { //внесение данных для сборки
                files: {
                    './': ['prod/index.html','prod/html/parts/personal_data.html', 'prod/js/init.js', 'prod/js/main.js', 'prod/.htaccess']
                        /*изменения вносятся в index.html и init.js,
                        .htaccess просто изменяется файл выдачи index.php => index.html*/
                },
                options: {
                    replacements: [{ //cмена глобального флага(отвечает за загрузку модуля 5/1 файл)
                        pattern: 'var global_build = false',
                        replacement: "var global_build = 'p'"
                    }, { //откоминтируем подключение полного css
                        pattern: '//loadCSS(source_url+"/css/full.css");',
                        replacement: 'loadCSS(source_url+"/css/full.css");'
                    }, { //закоментируем подключение libs.css
                        pattern: 'loadCSS(source_url+"/css/libs.css");',
                        replacement: '//loadCSS(source_url+"/css/libs.css");'
                    }, { //закоментируем подключение main.css
                        pattern: 'loadCSS(source_url+"/css/main.css");',
                        replacement: '//loadCSS(source_url+"/css/main.css");'
                    }, { //добавляем строку ревизии загрузке js файлов(скидывание кеша)
                        pattern: /\.js"/ig,
                        replacement: '.js?v=' + time + '"'
                    }, { //добавляем строку ревизии загрузке css файлов(скидывание кеша)
                        pattern: /\.css"/ig,
                        replacement: '.css?v=' + time + '"'
                    }, { //добавляем строку ревизии загрузке css файлов(скидывание кеша)
                        pattern: /\.css'/ig,
                        replacement: '.css?v=' + time+ "'"
                    }, { //добавляем строку ревизии в тег body 
                        //(используется далее при загрузке модулей - скидывание кеша)
                        pattern: /data-revision=\"\d*\"/ig,
                        replacement: 'data-revision="' + time + '"'
                    }, { //изменяем index.php => index.html в конфиге (.htaccess)
                        pattern: /<div class=\"inp-box/ig,
                        replacement: ' <div class="inp-box'
                    }]
                }
            },
            prod_comment_livereload: { //закоментировать livereload в index.html
                files: {
                    './': ['prod/index.html']
                },
                options: {
                    replacements: [{
                        pattern: /<script src="http:\/\/localhost:\d\d\d\d\/livereload\.js"><\/script>/ig,
                        replacement: '<!-- <script src="http://localhost:0000/livereload.js"></script> -->'
                    }]
                }

            },

            prod_remove_img_from_crit: { //удалить изображения с выделенного критического css
                files: {
                    './': 'prod/css/c/crit.css'
                },
                options: {
                    replacements: [{
                        pattern: /(?:background-image)[ ]*:[ ]*url[ ]*\((.*?)\)[ ]*;/ig,
                        replacement: ' '
                    }]
                }
            },
            prod_remove_comments_from_json: { //удалить коментарии с json.dist файлов
                files: {
                    './': ['prod/config.json.dist']
                },
                options: {
                    replacements: [{
                        pattern: /"__comment__"[ ]*:[ ]*"((\\"|[^"])*)",/ig,
                        replacement: ' '
                    }]
                }
            },
            test_source_url:{
                files: {
                    './': ['test/index.php']
                },
                options: {
                    replacements: [{
                        pattern:'source_url=""',
                        replacement: 'source_url="<?php echo URL.\'/template/burger\';?>"'
                    },
                    {
                        pattern:'/js/init.js',
                        replacement: "<?php echo URL.'/template/burger';?>/js/init.js"
                    }/*,{
                        pattern:'data-lbl="atom.dnk.bz"',
                        replacement: 'data-lbl="<?php echo DOMAIN;?>"'
                    },{
                        pattern:'//atom.dnk.bz/',
                        replacement: '//<?php echo DOMAIN;?>/'
                    },{
                        pattern:'<title>DNK</title>',
                        replacement: '<title><?php if(DOMAIN == "steps.one"){echo "Steps.one";}else{echo "DNK";}?></title>'
                    },{
                        pattern:/DNK Atom/ig,
                        replacement: '<?php if(DOMAIN == "steps.one"){echo "Steps.one";}else{echo "DNK Atom";}?>'
                    },{
                        pattern:"template/Atom/favicon.ico",
                        replacement: '<?php if(DOMAIN == "steps.one"){echo "template/Atom/favicon_s.ico";}else{echo "template/Atom/favicon.ico";}?>'
                    },{
                        pattern:"</head>",
                        replacement: '<?php if(DOMAIN == "steps.one"){include("html/lbl/head_steps.html");}else{include("html/lbl/head_atom.html");}?></head>'
                    },{
                        pattern:"</body>",
                        replacement: '<?php if(DOMAIN == "steps.one"){include("html/lbl/foot_steps.html");}else{include("html/lbl/foot_atom.html");}?></body>'
                    }*/]
                }

            },
            prod_source_url:{
                files: {
                    './': ['prod/index.php']
                },
                options: {
                    replacements: [{
                        pattern:'source_url=""',
                        replacement: 'source_url="<?php echo URL.\'/template/burger\';?>"'
                    },
                    {
                        pattern:'/js/init.js',
                        replacement: "<?php echo URL.'/template/burger';?>/js/init.js"
                    }/*,{
                        pattern:'data-lbl="atom.dnk.bz"',
                        replacement: 'data-lbl="<?php echo DOMAIN;?>"'
                    },{
                        pattern:'//atom.dnk.bz/',
                        replacement: '//<?php echo DOMAIN;?>/'
                    },{
                        pattern:'<title>DNK</title>',
                        replacement: '<title><?php if(DOMAIN == "steps.one"){echo "Steps.one";}else{echo "DNK";}?></title>'
                    },{
                        pattern:/DNK Atom/ig,
                        replacement: '<?php if(DOMAIN == "steps.one"){echo "Steps.one";}else{echo "DNK Atom";}?>'
                    },{
                        pattern:"template/Atom/favicon.ico",
                        replacement: '<?php if(DOMAIN == "steps.one"){echo "template/Atom/favicon_s.ico";}else{echo "template/Atom/favicon.ico";}?>'
                    },{
                        pattern:"</head>",
                        replacement: '<?php if(DOMAIN == "steps.one"){include("html/lbl/head_steps.html");}else{include("html/lbl/head_atom.html");}?></head>'
                    },{
                        pattern:"</body>",
                        replacement: '<?php if(DOMAIN == "steps.one"){include("html/lbl/foot_steps.html");}else{include("html/lbl/foot_atom.html");}?></body>'
                    }*/]
                }

            }
        },


        clean: { //удаление файлов
            options: {
                force: true //форсируем задание
            },


            //для test/
            test_build: ['test/'], //удаление папки билда test/
            //удаление лишних файлов сорсов(после перевода php => html)
            test: ['test/sass/', 'test/json/', 'test/index.php'],
            //удаление неиспользуемых файлов в css
            test_css: ['test/css/libs/', 'test/css/c/', 'test/css/head.css', 'test/css/main.css', 'test/css/libs.css', 'test/css/main.css.map'],
            test_js: clean_test_js_files, //удаление неиспольземых файлов модулей
            test_index:['test/index.html'],


            //для prod/
            prod_build: ['prod/'], //удаление папки билда prod/
            //удаление лишних файлов сорсов(после перевода php => html)
            prod: ['prod/sass/', 'prod/json/', 'prod/index.php'],
            //удаление неиспользуемых файлов в css
            prod_css: ['prod/css/libs/', 'prod/css/c/', 'prod/css/head.css', 'prod/css/main.css', 'prod/css/libs.css', 'prod/css/main.css.map'],
            prod_js: clean_prod_js_files, //удаление неиспольземых файлов модулей
            prod_index:['prod/index.html'],

        },

        copy: { //копирование файлов

            //для test/
            test_htta: { //файла настроек сервера(он без имени по этому отдельно) для test/ 
                expand: true,
                flatten: true,
                src: 'src/.htaccess',
                dest: 'test/'

            },
            test: { //копия папки сорсов в test/
                expand: true,
                flatten: false,
                cwd: 'src/',
                src: '**',
                dest: 'test/'
            },
            test_index: { //конастроек сервера(он без имени по этому отдельно) для test/ 
                expand: true,
                flatten: true,
                src: 'src/index.php',
                dest: 'test/'
            },

            //для prod/
            prod_htta: { //файла настроек сервера(он без имени по этому отдельно) для prod/ 
                expand: true,
                flatten: true,
                src: 'src/.htaccess',
                dest: 'prod/'

            },
            prod_manifest: { //файла настроек сервера(он без имени по этому отдельно) для prod/ 
                expand: true,
                flatten: true,
                src: 'src/manifest.php',
                dest: 'prod/'

            },
            prod_index: { //файла настроек сервера(он без имени по этому отдельно) для prod/ 
                expand: true,
                flatten: true,
                src: 'src/index.php',
                dest: 'prod/'

            },
            prod: { //копия папки сорсов в prod/
                expand: true,
                flatten: false,
                cwd: 'src/',
                src: '**',
                dest: 'prod/'
            },
            rename_index_test:{
                files: [{
                  expand: true,
                  dot: true,
                  cwd: 'test/',
                  dest: 'test/',
                  src: [
                    'index.html'
                  ],
                  rename: function(dest, src) {
                    return dest + src.replace('.html','.php');
                  }
                }]
            },
            rename_index_prod:{
                files: [{
                  expand: true,
                  dot: true,
                  cwd: 'prod/',
                  dest: 'prod/',
                  src: [
                    'index.html'
                  ],
                  rename: function(dest, src) {
                    return dest + src.replace('.html','.php');
                  }
                }]
            }

        },


        criticalcss: { //выделение критического css


            //для test/
            test_desktop: { //test для экранов
                options: {
                    url: 'http://localhost/', //урл съема 
                    //ВАЖНО!(Локалхост должен быть запущен и настроен на src)
                    width: 1200, //ширина вьювпорта съема
                    height: 900, //высота вьювпорта съема
                    outputfile: "test/css/c/critical_d.css", //файл для записи критического
                    filename: "test/css/full.css", //файл "съема", откуда берется css
                    buffer: 1920 * 1200, //буфер(добавлять css вплоть до такого размера)
                    ignoreConsole: true
                }
            },
            test_tab: { //test для планшетов
                options: {
                    url: 'http://localhost/',
                    width: 768,
                    height: 1024,
                    outputfile: "test/css/c/critical_t.css",
                    filename: "test/css/full.css",
                    buffer: 1024 * 1024,
                    ignoreConsole: true
                }
            },
            test_mob: { //test для мобилок
                options: {
                    url: 'http://localhost/',
                    width: 320,
                    height: 568,
                    outputfile: "test/css/c/critical_m.css",
                    filename: "test/css/full.css",
                    buffer: 800 * 800,
                    ignoreConsole: true
                }
            },

            //для prod/
            prod_desktop: { //prod для экранов
                options: {
                    url: 'http://localhost/',
                    width: 1200,
                    height: 900,
                    outputfile: "prod/css/c/critical_d.css",
                    filename: "prod/css/full.css",
                    buffer: 1920 * 1200,
                    ignoreConsole: true
                }
            },
            prod_tab: { //prod для планшетов
                options: {
                    url: 'http://localhost/',
                    width: 768,
                    height: 1024,
                    outputfile: "prod/css/c/critical_t.css",
                    filename: "prod/css/full.css",
                    buffer: 1024 * 1024,
                    ignoreConsole: true
                }
            },
            prod_mob: { //prod для мобилок
                options: {
                    url: 'http://localhost/',
                    width: 320,
                    height: 568,
                    outputfile: "prod/css/c/critical_m.css",
                    filename: "prod/css/full.css",
                    buffer: 800 * 800,
                    ignoreConsole: true
                }
            }
        },

        css_longhand: {
            /*перевод css в long-hand формат(для последующего удаление тегов,
            тут используеться для удаление картинок с кртического css)*/
            test_crit: { //критический css test
                expand: true,
                src: ['test/css/c/crit.css'],
                dest: '',
            },
            prod_crit: { //критический css prod
                expand: true,
                src: ['prod/css/c/crit.css'],
                dest: '',
            },
        },

        php2html: { //перевод php->html
            options: {
                htmlhint: {
                    'attr-lowercase': false,
                    'tagname-lowercase': false,
                }
            },
            test: { //перевод index.php->index.html в test/
                files: [{
                    expand: true,
                    cwd: 'test/',
                    src: ['*.php'],
                    dest: 'test/',
                    ext: '.html'
                }]
            },
            prod: { //перевод index.php->index.html в prod/
                files: [{
                    expand: true,
                    cwd: 'prod/',
                    src: ['*.php'],
                    dest: 'prod/',
                    ext: '.html'
                }]
            }
        },

        insert: { //вставка файла в другой файл
            options: {},
            test_crit_css: { //вставка критического css для test/
                src: "test/css/c/crit.css",
                dest: "test/index.html",
                match: "/*critical.css*/"
            },
            prod_crit_css: { //вставка критического css для prod/
                src: "prod/css/c/crit.css",
                dest: "prod/index.html",
                match: "/*critical.css*/"
            },
        },

        autoprefixer: { //autoprefix 
            options: {
                browsers: ['ie >= 8', 'last 10 versions', '> 0.1%', 'ff >= 20', 'Android > 1']
                    /*Набор опций на максимальный автопрефикс*/
            },
            test: { //автопрефикс css в test/
                expand: true,
                cwd: 'test/css/',
                ext: '.css',
                src: ['*.css'],
                dest: 'test/css/'
            },
            prod: { //автопрефикс css в prod/
                expand: true,
                cwd: 'prod/css/',
                ext: '.css',
                src: ['*.css'],
                dest: 'prod/css/'
            }
        },


        htmlmin: { //минификация html
            options: {
                removeComments: true, //удалять коментарии
                collapseWhitespace: true, //удалять лишние пробелы
                minifyJS: true, //сжимать js
                removeAttributeQuotes: false //не удалять кавычки с атрибутов(ВАЖНО!)
            },

            //для test/
            test: { //все внутренние html в test/
                expand: true,
                cwd: 'test/html/',
                ext: '.html',
                src: ['**/*.html'],
                dest: 'test/html/'
            },
            test_index: { //index.html в test/
                src: 'test/index.html',
                dest: 'test/index.html'
            },

            //для prod/
            prod: { //все внутренние html в prod/
                expand: true,
                cwd: 'prod/html/',
                ext: '.html',
                src: ['**/*.html'],
                dest: 'prod/html/'
            },
            prod_index: { //index.html в prod/
                src: 'prod/index.html',
                dest: 'prod/index.html'
            }
        },


        cssmin: { //сжатие css

            //для test/
            head_test: { //минификация статического head.css
                files: [{
                    src: 'test/css/head.css',
                    dest: 'test/css/head.css'
                }]
            },
            test: { //минификация остального css test/
                files: [{
                    src: 'test/css/c/crit.css',
                    dest: 'test/css/c/crit.css',
                }, {
                    src: 'test/css/full.css',
                    dest: 'test/css/full.css',
                }]
            },

            //для prod/
            head_prod: { //минификация статического head.css
                files: [{
                    src: 'prod/css/head.css',
                    dest: 'prod/css/head.css'
                }]
            },
            prod: { //минификация остального css prod/
                files: [{
                    src: 'prod/css/c/crit.css',
                    dest: 'prod/css/c/crit.css',
                }, {
                    src: 'prod/css/full.css',
                    dest: 'prod/css/full.css',
                }]
            }
        },


        uglify: { //сжатие js
            prod: { //сжатие js продакшена
                options: {
                    compress: {
                        drop_console: true //удалять consle.log() строчки
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'prod/js/',
                    src: '**/*.js',
                    dest: 'prod/js/'
                }]
            }
        },

        jsonmin: {
            test: {
                files: {
                    "test/config.json.dist": "test/config.json.dist"
                }
            },

            prod: {
                files: {
                    "prod/config.json.dist": "prod/config.json.dist"
                }
            }
        },


        watch: { //"слежка" за изменеиями в файлах

            sass: {
                files: ['src/sass/**/*.scss'], //при изменениях в scss
                tasks: ['sass:def'] //скомпилировать sass
            },

            js_libs: {
                files: ['src/js/libs/*.js'], //при изменениях в библиотелках js
                tasks: ['concat:js_libs'] //склеить js библиотека
            },

            css_libs: {
                files: ['src/css/libs/*.css'], //при изменениях в библиотеках css
                tasks: ['concat:css_libs'] //склеить css библиотеки

            },

            livereload: { //перезагрузка страницы в браузере
                options: {
                    spawn: true,
                    livereload: {
                        host: 'localhost',
                        port: 7622, //LIVERELOAD_PORT
                    }
                },
                //при изменеии любых сорс файлов
                files: ['src/**/*.php', 'src/**/*.js', 'src/**/*.css', 'src/**/*.html'],
                tasks: []
            }
        }
    });

    //загрузка модулей grunt
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-criticalcss');
    grunt.loadNpmTasks('grunt-htmlcomb');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-prettysass');
    grunt.loadNpmTasks('grunt-insert');
    grunt.loadNpmTasks('grunt-php2html');
    grunt.loadNpmTasks('grunt-css-longhand');
    grunt.loadNpmTasks('grunt-jsonmin');



    grunt.registerTask('res_lr', [ //команда для скидывания порта livereload
        'string-replace:change_livereload_port_grunt', //сменить порт в грунтфайле
        'string-replace:change_livereload_port_index' //сменить порт в индексе
    ]);

    grunt.registerTask('pre_init', [ //склейка библиотек, копилация sass
        'concat:css_libs', // склейка css библиотек
        'concat:js_libs', // склейка js библиотек
        'sass:def' // компиляция sass
    ]);

    grunt.registerTask('init', [ //стартовая обработка сорса
        'pre_init',
        'res_lr'
    ]);

    grunt.registerTask('beautify', [
        'htmlcomb:php', //бютифай html часть1
        'htmlcomb:html', //бютифай html часть2
        'prettify:php', //бютифай html часть3
        'prettify:html', //бютифай html часть4
        'jsbeautifier:def', //бютифай js
        'prettysass:def', //бютифай sass
    ]);



    grunt.registerTask('change_source_url_test', [
        'copy:rename_index_test',
        'string-replace:test_source_url',
        'clean:test_index'
    ]);


    grunt.registerTask('change_source_url_prod', [
        'copy:rename_index_prod',
        'string-replace:prod_source_url',
        'clean:prod_index'
    ]);


    grunt.registerTask('pack_test_pre_crit_css', [
        'clean:test_build', //удаление папки
        'copy:test', //копирование сорса
        'copy:test_index', //копирование файла настроек сервера
        'copy:test_htta', //копирование файла настроек сервера
        'htmlmin:test', //минификация внутренних html
        'autoprefixer:test', //автопрефикс css
        'cssmin:head_test', //минификация статического head.css
        'php2html:test', //перевод index.php в index.html
        'clean:test', //удаление sass/ json/ index.php
        'string-replace:test_comment_livereload', //коментирование livereload в index.html
        'concat:test_full_css', //склейка всего css
    ]);


    grunt.registerTask('pack_test_crit_css_localhost', [
        'criticalcss:test_desktop', //выделение критического css для экранов
        'criticalcss:test_tab', //выделение критического css для планшетов
        //'criticalcss:test_mob', //выделение критического css для мобилок
        'concat:test_crit_css', //склейка выделенного критического css в 1 файл
        'css_longhand:test_crit', //перевод критического css в long-hand
        'string-replace:test_remove_img_from_crit', //удаление изображений с критического css
        'cssmin:test', //минификация критического css
        'concat:test_backup_crit_css', //склейка выделенного критического css в кеш файл сорса (используется при сборке с выключеным локалхостом)
        'insert:test_crit_css', //вставка критического css в index.html
    ]);

    grunt.registerTask('pack_test_crit_css_cache', [
        'concat:test_crit_cache', //копирование закешшированного снятого критического css
        'insert:test_crit_css', //вставка критического css в index.html
    ]);

    grunt.registerTask('pack_test_after_crit_css', [
        'clean:test_css', //удаление лишних файлов css
        'htmlmin:test_index', //минификация index.html
        'string-replace:test_remove_comments_from_json',//удаляем __comment__ 'ы c jsonov
        'jsonmin:test',//минифицируем json
        'concat:test_js_modules_concat', //склейка модулей js 5->1 файл
        'concat:test_js_basic_concat', //склейка базовых скриптов в 1 файл
        'string-replace:test_revision', //внесение данных для ревизии и скидывание кеша
        'clean:test_js', //удаление неиспользуемых js,
        'change_source_url_test'
    ]);

    grunt.registerTask('pack_test', [ //упаковка теста с критическим (снятие с локалхоста)
        'pack_test_pre_crit_css',
        'pack_test_crit_css_localhost',
        'pack_test_after_crit_css'
    ]);

    grunt.registerTask('pack_test_cache', [ //упаковка теста с критическим с кеш файла
        'pack_test_pre_crit_css',
        'pack_test_crit_css_cache',
        'pack_test_after_crit_css'
    ]);

    grunt.registerTask('pack_test_no_crit', [ //упаковка теста без критического css
        'pack_test_pre_crit_css',
        'pack_test_after_crit_css'
    ]);


    grunt.registerTask('pack_prod_pre_crit_css', [
        'clean:prod_build', //удаление папки
        'copy:prod', //копирование сорса
        'copy:prod_index', //копирование файла настроек сервера
        'copy:prod_htta', //копирование файла настроек сервера
        'copy:prod_manifest',
        'htmlmin:prod', //минификация внутренних html
        'autoprefixer:prod', //автопрефикс css
        'cssmin:head_prod', //минификация статического head.css
        'php2html:prod', //перевод index.php в index.html
        'clean:prod', //удаление sass/ json/ index.php
        'string-replace:prod_comment_livereload', //коментирование livereload в index.html
        'concat:prod_full_css', //склейка всего css
    ]);

    grunt.registerTask('pack_prod_crit_css_localhost', [
        'criticalcss:prod_desktop', //выделение критического css для экранов
        'criticalcss:prod_tab', //выделение критического css для планшетов
        //'criticalcss:prod_mob', //выделение критического css для мобилок
        'concat:prod_crit_css', //склейка выделенного критического css в 1 файл
        'css_longhand:prod_crit', //перевод критического css в long-hand
        'string-replace:prod_remove_img_from_crit', //удаление изображений с критического css
        'cssmin:prod', //минификация критического css
        'concat:prod_backup_crit_css', //склейка выделенного критического css в кеш файл сорса (используется при сборке с выключеным локалхостом)
        'insert:prod_crit_css', //вставка критического css в index.html

    ]);

    grunt.registerTask('pack_prod_crit_css_cache', [
        'concat:prod_crit_cache', //копирование закешшированного снятого критического css
        'insert:prod_crit_css', //вставка критического css в index.html
    ]);

    grunt.registerTask('pack_prod_after_crit_css', [
        'clean:prod_css', //удаление лишних файлов css
        'htmlmin:prod_index', //минификация index.html
        'string-replace:prod_remove_comments_from_json',//удаляем __comment__ 'ы c jsonov
        'jsonmin:prod',//минифицируем json
        'concat:prod_js_modules_concat', //склейка модулей js 5->1 файл
        'concat:prod_js_basic_concat', //склейка базовых скриптов в 1 файл
        'string-replace:prod_revision', //внесение данных для ревизии и скидывание кеша
        'string-replace:prod_manifest', //внесение данных для ревизии и скидывание кеша
        'string-replace:prod_images', //внесение данных для ревизии и скидывание кеша
        'clean:prod_js', //удаление неиспользуемых js
        'uglify:prod', //сжатие js
        'change_source_url_prod'
    ]);

    grunt.registerTask('pack_prod_js', [
        'pack_prod_pre_crit_css',
        'pack_prod_crit_css_localhost',
        'clean:prod_css', //удаление лишних файлов css
        'htmlmin:prod_index', //минификация index.html
        'string-replace:prod_remove_comments_from_json',//удаляем __comment__ 'ы c jsonov
        'jsonmin:prod',//минифицируем json
        'concat:prod_js_modules_concat', //склейка модулей js 5->1 файл
        'concat:prod_js_basic_concat', //склейка базовых скриптов в 1 файл
        'string-replace:test_revision'
    ]);

    grunt.registerTask('pack_prod', [ //упаковка продакшена
        'pack_prod_pre_crit_css',
        'pack_prod_crit_css_localhost',
        'pack_prod_after_crit_css'

    ]);
    grunt.registerTask('pack_prod_cache', [ //упаковка продакшена с критическим с кеш файла
        'pack_prod_pre_crit_css',
        'pack_prod_crit_css_cache',
        'pack_prod_after_crit_css'
    ]);

    grunt.registerTask('pack_prod_no_crit', [ //упаковка продакшена без критического css
        'pack_prod_pre_crit_css',
        'pack_prod_after_crit_css'
    ]);

    grunt.registerTask('fin', [ //упаковка всего с критическим css cнятым с локалхоста
        'init', //стартовая обработка сорса
        'pack_test', //упаковка test
        'pack_prod' //упаковка prod
    ]);

    grunt.registerTask('fin_cache', [ //упаковка всего с критическим css c кеш файлв
        'init', //стартовая обработка сорса
        'pack_test_cache', //упаковка test
        'pack_prod_cache' //упаковка prod
    ]);

    grunt.registerTask('fin_no_crit', [ //упаковка всего ез критического css
        'init', //стартовая обработка сорса
        'pack_test_no_crit', //упаковка test
        'pack_prod_no_crit' //упаковка prod
    ]);

    grunt.registerTask('default', ['pre_init', 'watch']);


};