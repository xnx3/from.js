针对html的form表单提交，自动获取要提交的输入数据、自动根据接口返回信息进行填充输入项

## 快速体验
[http://res.zvo.cn/from.js/demo.html](http://res.zvo.cn/from.js/demo.html)  
(进入后查看源代码，即可看到它的demo实现)

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
<button onclick="fill();">自动填充表单</button>
<script>
function fill(){
	var data = {
			'storage':'2',
			'username':'管雷鸣',
			'password':'123',
			'info':'hello word'
	};
	from.fill('from_id',data);
}
</script>
````

## 更多使用
它可以配合其他三方框架来是开发做到更简单
#### 第三方ajax请求的 request.js
[https://gitee.com/mail_osc/request](https://gitee.com/mail_osc/request)  
原生js的轻量级ajax请求工具，它提供了post、get 等基本的ajax请求，使代码更简单

#### 第三方的消息提醒 msg.js
[https://gitee.com/mail_osc/msg](https://gitee.com/mail_osc/msg)  
原生js的轻量级消息提示，比如请求中、执行成功、执行失败、弹出文本输入框等