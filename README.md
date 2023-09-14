针对html的form表单提交，自动获取要提交的输入数据、自动根据接口返回信息进行填充输入项

## 快速体验
[http://res.zvo.cn/from.js/demo.html](http://res.zvo.cn/from.js/demo.html)

## 使用说明

首先，网页中要引入一个js  

````
<script src="http://res.zvo.cn/from.js/from.js"></script>
````

比如这个html代码

````
<script src="http://res.zvo.cn/from.js/from.js"></script>

<div id="from_id">
	选择：
	<select name="storage">
		<option value="1">本地存储</option>
		<option value="2">SFTP存储</option>
	</select>
	<br/>
	username:<input type="text" name="username" value="222" /><br/>
	password:<input type="text" name="password" value="333" /><br/>
	info:<textarea name="info"></textarea>
</div>
	
````

#### 自动获取要提交的输入数据

根据指定的id，搜索这个id范围内，出现的 input、textarea、select 等标签，并取出其内容，变为可以进行ajax提交的格式。  
代码示例：
````
<button onclick="getJsonData();">获取表单数据</button>
<script>
function getJsonData(){
	var data = from.getJsonData('from_id');
	console.log('自动获得的输入数据：');
	console.log(data);
	
	//弹出窗口看下数据
	alert(JSON.stringify(data, null, 4));
}
</script>
````



#### 自动根据接口返回信息进行填充输入项

根据指定的id，搜索这个id范围内，出现的 input、textarea、select 等标签，并取出其内容，变为可以进行ajax提交的格式。  
代码示例：
````
<button onclick="getJsonData();">获取表单数据</button>
<script>
function getJsonData(){
	var data = from.getJsonData('from_id');
	console.log('自动获得的输入数据：');
	console.log(data);
	
	//弹出窗口看下数据
	alert(JSON.stringify(data, null, 4));
}
</script>
````