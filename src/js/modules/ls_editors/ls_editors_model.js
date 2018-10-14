;

'use strict';

console.log('ls_editors.model start');

var ls_editors = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

ls_editors.model = {
	obj:{},
	clean_storage:function(){
		for(var k in this.obj){
			if (this.obj.hasOwnProperty(k)) {

				for(var id in this.obj[k]){
					if (this.obj[k].hasOwnProperty(id)) {
						
						if (if_defined(this.obj[k][id].last_update)) {


							var timestamp = new Date().getTime();

							if (timestamp-this.obj[k][id].last_update>24*60*60*1000) {

								delete this.obj[k][id]

							}



						}

					}
				}


			}
		}
	},
	get_path_data:function(){


		var path = document.location.pathname;
		var editor = false;
		var id_parameter = 'i';
		var back_path = '/';
		var edit_id = 'этого сайта';
		if (path == '/quiz/edit'|| path == '/quiz/edit_by_step') {
			editor = 'quiz';
			back_path = '/quiz';
			edit_id = 'этого квиза';
			id_parameter = 'qi'
		}else if (path == '/lp1/edit') {
			editor = 'lp1';
			back_path = '/lp1';
			edit_id = 'этого одноэкранника';
		}else if (path == '/trafic/edit') {
			editor = 'rsy';
			back_path = '/trafic';
			edit_id = 'этой рекламной компании';
		}
		return {
			editor:editor,
			id_parameter:id_parameter,
			back_path:back_path,
			edit_id:edit_id
		};
	},
	get_storage:function(){

		if (!if_defined(localStorage['editors'])) {

			this.obj = {
				lp1:{},
				quiz:{},
				rsy:{}
			}

		}else{

			this.obj = JSON.parse(localStorage['editors']);
		
			this.clean_storage();
		}
	},
	update:function(){

		var p = this.get_path_data();

		this.get_storage();

		if (p.editor) {

			
			var id = getURLParameter(p.id_parameter) 
			
			if (id != 'new') {

				var timestamp = new Date().getTime();

				if (if_defined(this.obj[p.editor][id])) {
					
					this.obj[p.editor][id]['last_update'] = timestamp;

				}else{

					this.obj[p.editor][id] = {
						last_update:timestamp
					}
				
				}

				$('.app-wrap').children('.body').attr('data-last-update',timestamp);
				if($('.app-wrap').children('.body').length==0){
					$('.app-wrap').children('.m_full_wrap').attr('data-last-update',timestamp)
					
				}
			}

			localStorage['editors'] = JSON.stringify(this.obj);

		}


	},
	check_last_update:function(){

		var p = this.get_path_data();

		this.get_storage();

		if (p.editor) {

			var id = getURLParameter(p.id_parameter) 
			
			if (id != 'new') {

				var last_update = parseInt($('.app-wrap').children('.body').attr('data-last-update'));
				if($('.app-wrap').children('.body').length==0){
					last_update = parseInt($('.app-wrap').children('.m_full_wrap').attr('data-last-update'))
					
				}


				if (if_defined(this.obj[p.editor][id])) {
					
					 if (if_defined(this.obj[p.editor][id]['last_update']) && this.obj[p.editor][id]['last_update'] > last_update) {

					 	ls_editors.view.lock_editor();

					 }

				}

			}			
		}

	}
};
