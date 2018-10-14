;

'use strict';

console.log('a_edit.controller start');

a_edit.controller = {

    api_url: api_config.default,

    get_ad_data:function(id,callback){

	    var url = a_edit.controller.api_url + 'Amg';

	    var data = {
	        id: id
	    };


	    get_json('get', url, data, function(data) {

			a_edit.model.ad={};
			if (if_defined(data.data.data.yandex)) {
				a_edit.model.ad.content = data.data.data.yandex
			}else{
				a_edit.model.ad.content = data.data.data
			}
	    	//a_edit.model.ad.content = data.data.data;
	    	//a_edit.model.ad.content = data.data.yandex;

	    	a_edit.model.ad.content.id = data.data.id;
	    	a_edit.model.ad.content.name = data.data.name;
	    	a_edit.model.ad.content.domain = data.data.domain;
	    	
	    	a_edit.model.ad.name = data.data.name;
	    	a_edit.model.ad.id = data.data.id;
	    	a_edit.model.ad.domain = data.data.domain;
	    	// a_edit.controller.get_ad_name(function(data){

	    		// for (var i = data.length - 1; i >= 0; i--) {
	    		// 	console.log('get_ad_name = ',data[i].content[0].id,id)
	    		// 	if (data[i].content[0].id == id) {
	    		// 		a_edit.model.ad.content.name = data[i].name;
	    		// 		a_edit.model.ad.id = data[i].id;
	    		// 	}
	    		// }

		        if (callback) {
		            callback(a_edit.model.ad.content);
		        } 

	    	// });


	    });
    },
    get_ad_name:function(callback){

	    var data_hash = {
	        userKey: global_user_token
	    };
	    var url = a_edit.controller.api_url + 'advertising/list';

	    get_json('get', url, data_hash, function(data) {

	        if (callback) {//если есть колбек выполняем его
	            callback(data.response);

	        }

	    });

    },
    save:function(autosave,callback){

    	a_edit.model.check_symbols_in_model();
    	
    	var data = a_edit.model.ad;

    	var data = {};

    	data.name = a_edit.model.ad.name

    	if (if_defined(a_edit.model.ad.id)) {
    		data.id = a_edit.model.ad.id
    	}

    	if (if_defined(a_edit.model.ad.content.domain)) {
    		data.domain = a_edit.model.ad.content.domain
    	}else{
    		data.domain = "null";
    	}


    	data['content[yandex][header]'] = a_edit.model.ad.content.header
    	data['content[yandex][text]'] = a_edit.model.ad.content.text





	    for (var i = 0; i < a_edit.model.ad.content.zapros.length; i++) {

	        var zapros = a_edit.model.ad.content.zapros[i];



            

            for (var h = 0 ; h <= zapros.length - 1; h++) {
            	var keytext = 'content[yandex][zapros][' + i + '][' + h + ']';
            	data[keytext] = zapros[h];
            }

	    }

	    if (if_defined(a_edit.model.ad.content.logics) && a_edit.model.ad.content.logics.length > 0) {
		    for (var i = 0; i < a_edit.model.ad.content.logics.length; i++) {

		        var logic = a_edit.model.ad.content.logics[i];




	            for (var h = 0 ; h <= logic.left.length - 1; h++) {
	            	var keytext = 'content[yandex][logics][' + i + '][left][' + h + ']';
	            	data[keytext] = logic.left[h];
	            }

	            for (var h = 0 ; h <= logic.right.length - 1; h++) {
	            	var keytext = 'content[yandex][logics][' + i + '][right][' + h + ']';
	            	data[keytext] = logic.right[h];
	            }

		    }

	    }else{

        	var keytext = 'content[yandex][logics][0][left][0]';
        	data[keytext] = '';
        	var keytext = 'content[yandex][logics][0][right][0]';
        	data[keytext]  = '';
	    }

    	// data.content = {
    	// 	yandex:a_edit.model.ad.content
    	// };

    	console.log(data);



	    // console.log('lp3_make_blocks_object(', data, ')');

	    // var new_data = {
	    //     block2H2: data.block2H2,
	    //     backgroundImageDesktop: data.backgroundImageDesktop,
	    //     backgroundImageMobile: data.backgroundImageMobile
	    // };

	    // for (var i = 0; i < data.blocks.length; i++) {

	    //     var block = data.blocks[i];

	    //     if (if_defined(block.name)) {


	    //         var keytext = 'blocks[' + i + '][name]';
	    //         new_data[keytext] = block.name;
	    //         keytext = 'blocks[' + i + '][backgroundImageDesktop]';
	    //         new_data[keytext] = block.backgroundImageDesktop;
	    //         keytext = 'blocks[' + i + '][backgroundImageMobile]';
	    //         new_data[keytext] = block.backgroundImageMobile;

	    //         for (var j = 0; j < block.slides.length; j++) {
	    //             var slide = block.slides[j];
	    //             if (if_defined(slide.file)) {

	    //                 keytext = 'blocks[' + i + '][slides][' + j + '][file]';
	    //                 new_data[keytext] = slide.file;
	    //                 keytext = 'blocks[' + i + '][slides][' + j + '][description]';
	    //                 new_data[keytext] = slide.description;

	    //             }


	    //         }


	    //     }


	    // }




	    var url = a_edit.controller.api_url + 'Amg/save';


	    get_json('post', url, data, function(data) {

	    	if (autosave) {

	    		a_edit.view.end_autosave();

	    	}


        	if (if_defined(data.data) && if_defined(data.data.addedID)) {
	        	a_edit.model.ad.id = data.data.addedID;
	        	a_edit.model.ad.content.id = data.data.addedID;

		        	
				var cur_id = getURLParameter('i');
		        if(cur_id != data.data.addedID){

		        	updateQueryStringParam('i',data.data.addedID);

		        	if(cur_id == 'new'){

		        		dnk_atom_events({type:'event',category:'create',action:'rk',link:data.data.addedID});


		        	}

		        }			        	
 
        	}else{
	        	a_edit.model.ad.id = getURLParameter('i');
	        	a_edit.model.ad.content.id = getURLParameter('i');
        	}

    		run_module('ls_editors');          	

	        console.log('bg save advertisment data = ', data);
	        
	        if (callback) {
	        	callback(data.data);
	        }

	    }, false, function() {}, autosave);
    }

}
