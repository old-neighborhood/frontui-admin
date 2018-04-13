/**
 * Created by st0001 on 2017/12/15.
 */
$().ready(function() {

	var name="teachername";	    	
	var http = 'localhost:8080';
	var httpurl = http +"/login/";
	
	$.ajax({
		url: httpurl,
		type: 'post',
		data:{
			'id':name
		},
		success: function (data) {   //成功后回调
			alert("登陆成功！");
			alert(data);
//			process(data);
			var courseList = $("#courseList");
			var courseHTML = '';
			//json数据解析
			while (data.next()) {
				//?
				var course = data.name();
				courseHTML += ' <div class="col-xl-3 col-sm-6 mb-3"><div class="card text-white bg-primary o-hidden h-100">'
					+ '<div class="card-body" id= '
					+ course + '><div class="card-body-icon"><i class="fa fa-fw fa-book"></i></div>'
					+ '<div class="card mb-3"><div class="card-header"><i class="fa fa-area-chart"></i><a href="courseInfo.html?course='
					+ course +'>'+ course + '</a></div></div>';
			}
			courseList.html(courseHTML);
		},
		error: function(e){    //失败后回调
			alert("出错了");
		},
		beforeSend: function(){  //发送请求前调用，可以放一些"正在加载"之类额话
			alert("正在加载......");
		},
		datatype: "json"
	})
});

