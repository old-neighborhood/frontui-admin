/**
 * 
 */
//这个teacher是登陆并负责维护某一课程的登录名
var teacher="XX";
var coursename="operating";
//设置课程名
$("#teacher").href="adminsubject-course.html?teacher=" + teacher;
$("#course").html(coursename);

var http = 'localhost:8080';
var httpurl = http +"/login/";
//获取详细信息
$.ajax({
	url: httpurl,
	type: 'post',
	data:{
		'course':coursename
	},
	success: function (data) {   //成功后回调
		alert("登陆成功！");
		alert(data);
		//data进行json数据解析
		var courseteacher = null;
		var coursegrade = null;
		var courseintro = null;
		var examlist = null;
		//课程信息展示
		$("#coursename").html(coursename);
		$("#courseteacher").html(courseteacher);
		$("#coursegrage").html(coursegrade);
		$("#courseintro").html(courseintro);
		//课程的考试信息展示
		var examcontent = '';
		while (examList.next()) {
			var examname = exam.getName;
			var examID = exam.getID;
			var examtime = exam.getTime;
			var resulturl = "adminsubject-statistics.html?exam=" + examID;
			examcontent += ' <div><a href= '
				+ resulturl +'class="btn btn-default" type="button">'
				+ examname +'</a><br/><span class="card-text small">'
				+ examtime +'</span></div>' ;
			
		}
		$("#examinfo").html(examcontent);
	},
	error: function(e){    //失败后回调
		alert("出错了");
	},
	beforeSend: function(){  //发送请求前调用，可以放一些"正在加载"之类额话
		alert("正在加载......");
	},
	datatype: "json"
})

//导入题库的上传button
$("#inputfile").click(function(){
	
})

//发布考试的button
$("#newexam").href= "adminsubject-release.html?course="+coursename;

