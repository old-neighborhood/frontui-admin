/**
 * Created by st0001 on 2017/12/15.
 */

var studentid = "who";
var studentinfo = null;
var examList = null;

$().ready(function() {

	var examTable = $('#examTable');
	var infoTable = $('#infoTable');

	var studentid = studentinfo.get();
	var studentname = studentinfo.get();
	var studentemail = studentinfo.get();

	var examHTML = ' <thead><tr><th>考试</th><th>课程</th><th>开始日期</th><th>结束日期</th><th>开始考试</th></tr></thead>';
	var examname = null;
	var coursename = null;
	var timeOn = null;
	var timeOff = null;

	var now = new Date();
	var state = null;
	var datatarget = "#";
	var state = "";

	while(examList.next()){
		examname = examList.get("examname");
		coursename = examList.get("");
		timeOn = examList.get("");
		timeOff = examList.get("");

		if (timeOn <= now && now <= timeOff) {
			datatarget = "#codeModal";
			state = "进入考试";
		}else if(timeOn > now){
			state = "等待开始";
		}else if(timeOff < now){
			state = "考试结束";
		}

		examHTML += '<tr><td>' 
			+ coursename + '</td><td>'
			+ examname + '</td><td>'
			+ timeOn + '</td><td>'
			+ timeOff + '</td><td>'
			+ state + '</td>'
			+ '<td><input class="btn btn-primary" type="button" data-toggle="modal"'
			+ 'data-target="' + datatarget + ' value= '+ state +'></td></tr>';
	}

	examTable.html(examHTML);
	
	infoTable.html('<thead><tr><th>用户ID</th><th>姓名</th><th>邮箱</th></tr></thead>'
			+ '<tbody><tr><td>'
			+ studentid + '</td><td>'
			+ studentname + '</td><td>'
			+ studentemail + '</td></tr></tbody>');
});