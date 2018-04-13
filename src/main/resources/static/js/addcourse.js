/**
  *this collect the information of a new-added course
  *验证不能用不知为什么/////
  *
  */

$().ready(function() {
	$("#course_info").validate({
        rules: {
            coursename:"required",
            courseteacher: "required",
            coursegrade: "required"
        },
        
        messages: {
        	coursename: "请输入课程名",
        	courseteacher: "请输入课程老师",
        	coursegrade: "请输入年级"
        }
    });
	
	$("#addcourse").click(function(){
		
		var coursename=$('#coursename').val();
		var courseteacher=$('#courseteacher').val();
		var coursegrade=$('#coursegrade').val();
		var courseintro=$('#courseintro').val();
		console.log(coursename);
		
		
		var page = ("<div class='card-body'><h6 class='card-title mb-1' style='color:black'>" + coursename 
				+"</h6><hr/><p class='card-text small' id='#'>" + courseteacher 
				+"</p><hr/><p class='card-text small' id='#'>" + coursegrade 
				+"</p><hr/><p class='card-text small' id='#'>" + courseintro
				+"</p><hr/></div>");
		
		var http = 'localhost:8080';
		$.ajax({
			type:"POST",
			url:http+"/addcourse/",
			data:{
				'coursename':coursename,
				'courseteacher':courseteacher,
				'coursegrade':coursegrade,
				'courseintro':courseintro
			},
			dataType:"json",
			timeout:15000,
			success: function(data){
				alert("新增成功！");
				$("#courseINFO").html(page);
			}
		})
		
	})


})
