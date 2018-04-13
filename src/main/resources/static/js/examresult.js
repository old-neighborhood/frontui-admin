/**
 * 
 */
var teacher="name";
var examID="00xx";
var coursename="operating";

$("#teacher").html(teacher);
$("#teacher").href="adminsubject-course.html?teacher=" + teacher;
$("#course").html(coursename);
$("#course").href="coursedetail.html?course=" + coursename;
$("#exam").html(examID);

var http = 'localhost:8080';
var httpurl = http +"/login/";
//获取详细信息
$.ajax({
	url: httpurl,
	type: 'post',
	data:{
		'examID':examID
	},
	success: function (data) {   //成功后回调
		alert("登陆成功！");
		alert(data);
		//data进行json数据解析
		var examName = null;
		var examAverage = null;
		var resultList = null;
		//考试头信息展示
		$("#examname").html("<label >" + examName + "</label>");
		$("#examAverage").html("<label>平均分："+ examAverage +"</label>");
		//结果信息展示
		var examcontent = '<thead><tr><th>ID</th><th>姓名</th><th>得分</th></tr></thead><tbody>';
		while (resultList.next()) {
			//数据处理
			var ID = result.getID();
			var name = result.getName();
			var score = result.getScore();
			resultcontent += ' <tr><td> '
				+ ID + ' </td><td> '
				+ name + ' </td><td> '
				+ score + '</td></tr>';
			
		}
		$("#dataTable").html(resultcontent+"</tbody>");
	},
	error: function(e){    //失败后回调
		alert("出错了");
	},
	beforeSend: function(){  //发送请求前调用，可以放一些"正在加载"之类额话
		alert("正在加载......");
	},
	datatype: "json"
})