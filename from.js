/**
 * 针对html的form表单提交，自动提取表单内要提交的数据、自动根据接口返回信息进行填充值
 * 作者：管雷鸣
 * 个人微信: xnx3com
 */
var from = {
	version:1.0,
	tags : 'input,select,textarea',
	//将 a_b1_c2 转化为驼峰命名方式 aB1C2
	lineToHump:function(name){
		return name.replace(/\_(\w)/g, function(all, letter){
			return letter.toUpperCase();
		});
	},
	//将 aBcDe 转化为下划线命名方式 a_bc_de
	humpToLine:function(text){
		return text.replace(/([A-Z])/g, (res) => {
		      return '_' + res.toLowerCase()
		    });
	},
	
	/**
	 * 获取id这个元素内的，所有包含 tags 标签（比如 input、select、 textarea）的数据
	 * id 要获取的 tags 标签的范围，在这个id范围内的tags标签才会搜索
	 * //tags 要搜索的标签，传入如 'input,select,textarea' 多个用 英文逗号分割
	 */
	getJsonData:function(id){
		/*
		if(typeof(tags) == 'undefined'){
			tags = 'input,select,textarea,radio';
		}
		*/
		// 获取表单元素
		var docuFrom = document.getElementById(id);
		var formElements = docuFrom.querySelectorAll(from.tags);
		
		// 创建一个空数组
		var o = [];
	
		// 遍历表单元素
		for (var i = 0; i < formElements.length; i++) {
		    var element = formElements[i];
		    // 获取元素的 name 和 value 属性
		    var name = element.getAttribute('name');
		    var value = element.value;
		    
		    if (o[name] !== undefined) {
	            if (!o[name].push) {
	                o[name] = [o[name]];
	            }
	            o[name].push(value || '');
	        } else {
	            o[name] = value || '';
	        }
	        
	        try{
	        	if(name != null && name.length > 0){
		        	if(name.indexOf('_') > -1){
		            	//出现了下划线，那可能是驼峰命名，增加驼峰传参
		        		 o[from.lineToHump(name)] = o[name];
		            }
		        }
	        }catch(e){
	        	console.log(e);
	        }
		}
		
		var json = {};
		for(var name in o){
			json[''+name] = o[name];
		}
		
		return json;
	},
	
	/**
	 * 自动填充form标签内的数据。 需要jquery支持。
	 * @param id 要获取的 tags 标签的范围，在这个id范围内的tags标签才会搜索
	 * @param data json对象的数据值，比如form中有个input，name是age， 而 data.age 也有正常的值，那么 这个input就会正常填充上data.age的值
	 */
	fill:function(id, data){
		for(var key in data){
			var line = from.humpToLine(key); //转为小写状态
			if(key != 'line'){
				//如果能转为小写，那就追加进小写key去
				data[line] = data[key];
			}
		}
		
		// 获取表单元素
		var docuFrom = document.getElementById(id);
		var formElements = docuFrom.querySelectorAll(from.tags);
		//console.log(formElements);
		
		//var a = obj.serializeArray();
		for(var i = 0; i<formElements.length; i++){
			var tag_name = formElements[i].name;
			//console.log(tag_name);
			var data_value = data[tag_name];
			if(data_value != null && typeof(data_value) != 'undefined'){
				//有值，那么赋予输入框值
				
				/***** 赋予值 ******/
				//获取当前输入框的形式，是input、text、select 的哪种
				var docum = document.getElementsByName(tag_name)[0];
				var tag = docum.nodeName.toLowerCase();
				if(tag == 'input' || tag == 'select' || tag == 'textarea'){
					if(document.getElementsByName(tag_name).length > 0){
						docum.value = data_value;
					}
					//在加一个适配数据库字段对应的，应对 writecode
					if(document.getElementsByName(from.humpToLine(tag_name)).length > 0){
						document.getElementsByName(from.humpToLine(tag_name))[0].value = data_value;
					}
				}else{
					console.log('非 input、select、text，需单独判断，当前是：'+tag);
				}
				
				
				/***** 赋予值结束 ******/
				
				//如果标签本身有 onchange ，那么触发
				if(typeof(docum.onchange) == 'function'){
					docum.onchange();
				}
				
			}
		}
		
	}
}