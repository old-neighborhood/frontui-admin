/**
 * 这个是Dashboard
 * @returns
 */
$().ready(function() {
	var teacher="XX";
	var date = new Date;
	var http = 'localhost:8080';
	var httpurl = http +"/login/";
	
	var now=new Date();
	
	function displayTime(){
		$('#time1').html(" 当前考试 " + now.toLocaleString() );
	}
	
	setInterval(displayTime,1000);
	
//    var min=now.getMinutes();
//    var sec=now.getSeconds();
//    var hur=now.getHours();
    var yea=now.getFullYear();
    var mon=now.getMonth();
    var day=now.getDate();
//
//    hur=hur>=10 ? hur : "0"+hur;
//    min=min>=10 ? min : "0"+min;
//    sec=sec>=10 ? sec : "0"+sec;
    var date = yea + "-" + mon +"-" +day;
	
  	$.ajax({
        url: httpurl,
        type: 'post',
        data:{
        	'teacher':teacher,
        	'date': date
        },
        success: function (data) {   //成功后回调
        	alert("加载成功！");
            alert(data);
//          处理信息，当前时间的考试；
            var currentexam = data.get();
            var currentinfo = "";
            
            if (currentexam.isEmpty()) {
				
            	$("#currentexam").html('<div> <button type="button" class="btn btn-default"><h5>当前无考试</h5></button>');
			}else{
				var coursename = null;
				var examname = null;
				var examtime = null;
				while(currentexam.next()){
					coursename = currentexam.getName();
					examname = currentexam.getExam();
					examtime = currentexam.getTime();
					currentinfo += '<div> <button type="button" class="btn btn-default"><h5>'
						+ coursename + '软件过程管理</h5></button><p class="card-text small">'
						+ examname + '<br/>'
						+ examtime + '</p></div>'
						+ '<div class="progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">60% Complete</span></div>'
						+ '</div><br/>';
				}
				$("#currentexam").html(currentinfo);
			}
            
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