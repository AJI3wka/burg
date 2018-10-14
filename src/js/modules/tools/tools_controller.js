;

'use strict';

console.log('tools.controller start');

tools.controller = {

    api_url: api_config.default,
   
    ql:function(){

            var url = api_config.default+'QUIZ';

            get_json('get', url, {},function(data){

                console.log('GETTED_QUIZ_LIST = ',data)

            });
    },
    tt2:function(){

            var url = 'https://atom.dnk.bz/tt2.php';

            get_json('get', url, {},function(){

            });
    } ,
    tt2:function(){

            var url = 'https://atom.dnk.bz/tt2.php';

            get_json('get', url, {},function(){

            });
    } 

}
