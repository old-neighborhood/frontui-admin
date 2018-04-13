
//这个teacher是登陆并负责维护某一课程的登录名
$().ready(function() {
	
	var teacher="XX";
	var coursename="Devops";
//	设置课程名
	$("#teacher").href="adminsubject-course.html?teacher=" + teacher;
	$("#course").html("<label style='color:grey; font-size:20px'>课程：" + coursename +"</label>");



	var examName = $("#examname").val();
	var examTimeOn = $("#timestart").val();
	var examTimeOff = $("#timeend").val();
	var studentlist = null;
	var type = null;
	var test = null;

	//处理上传的名单Excel文件
	$("#uploadlist").click(function(){

	})
 
 /**
  * test的json格式——
  * { 'type': type,
  *   'data': [file|
  *   		  { 'singlennum' : num1,
  *   			'singlepoint' : point1,
  *   			'doublenum' : num2,
  *   			'doublepoint' : point2 }
  *   		  ]
  * }
  */
	$(".radio").click(function(){
		type = $(':radio:checked').val();
		if (type=="examfile") {
			$("#import").html('<label for="inputfile"></label>'
					+ '<input class="btn btn-default" style="font-size:15px" type="file" id="inputfile">'
					+ '<button id="uploadtest" class="btn btn-default" style="font-size:15px" type="botton">上传试题</button>'
					+ '<button type="button" class="btn btn-default" style="font-size:15px" '
					+ 'onclick="window.open(&quot;./file/model.xlsx&quot;)">下载试题模板</button>');
			
			//处理上传的试题文件
			$("#uploadtest").click(function(){
				alert("upload");
				var file = null;
				test = "{ 'type':"+type+", 'data':"+file+"}";
			})
			
		}else if(type=="examlib"){
			$("#import").html('<label>选择试题</label> <div style="size: 120 color:red">'
					+ '单选 : <input type="text" id="singlenum" value="20" placeholder="题数"> X '
					+ '<input type="text" id="singlepoint" value="2" placeholder="分值"><br/>'
					+ '多选 : <input type="text" id="doublenum" value="15" placeholder="题数"> X '
					+ '<input type="text" id="doublepoint" value="4" placeholder="分值">'
					+ '总分 ：<button id="score" type="button">确认</button></div>');
			
			$("#score").click(function(){
				var singlenum = $("#singlenum").val();
				var singlepoint = $("#singlepoint").val();
				var doublenum = $("#doublenum").val();
				var doublepoint = $("#doublepoint").val();
				var score = singlenum * singlepoint + doublenum * doublepoint;
				$("#score").html(score);
				
				test = "{ 'type': " + type +", 'data':"+
							"{ 'singlenum': " + singlenum + ", 'singlepoint' :" + singlepoint +"," +
							"'doublenum': " + doublenum + ", 'doublepoint' :" + doublepoint +
							"}"
						+"}";
			})
			
			
			
			
		}
		console.log(type);
	})
	
	
	$("#release").click(function(){
		
    	var http = 'localhost:8080';
    	var httpurl = http +"/login/";
		
		if ((type!="examfile") && (type!="examlib")) {
			alert("请选择试题！");
		}
		
	  	$.ajax({
            url: httpurl,
            type: 'post',
            data:{
            	'examName':examName,
    			'examTimeOn':examTimeOn,
    			'examTimeOff':examTimeOff,
    			'studentlist':studentlist,
    			'test':test
            },
            success: function (data) {   //成功后回调
            	alert("发布成功！");
                alert(data);
//                process(data);
              	//测试跳转
        		window.location.href("adminindex.html");
            },
            error: function(e){    //失败后回调
            	
                alert("出错了");
            },
            beforeSend: function(){  //发送请求前调用，可以放一些"正在加载"之类额话
                alert("正在加载......");
            },
            datatype: "json"
    	})
		
	})


});