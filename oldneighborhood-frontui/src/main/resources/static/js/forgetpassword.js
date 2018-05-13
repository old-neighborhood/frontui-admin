/**
 * Created by st0001 on 2017/12/13.
 */
$().ready(function() {
	var validate = null;
	
    $("#validate_form").validate({
        rules: {
            useremail:{
            	required: true,
            	email:true
            },
            userpassword: {
                required: true,
                minlength: 5,
            	maxlength: 32
            },
            confirmpassword: {
                required: true,
                equalTo: "#userpassword"
            },
            usercode: "required"
        },
        messages: {
            useremail:{
            	required: "请输入邮箱",
            	email: "请检查邮箱是否有效"
            },
            userpassword: {
                required: "请输入密码",
                minlength: "密码不能小于{0}个字符",
                maxlength: "密码不能超过{0}个字符"
            },
            confirmpassword: {
                required: "请再次输入密码",
                equalTo: "两次密码不一样"
            },
            usercode: "请输入验证码"
        }
    });
    
    //包含hash值等
    $("#getCode").click(function(){
		var useremail = $("#useremail").val();
		console.log(useremail);
		$.ajax({
			type : "POST",
			contentType : "application/json",
			// 获取验证码的url
			url : "/admin/getCode",
			data : JSON.stringify({
				// 手机验证码发送
				"email" : useremail
			}),
			timeout: 5000,
			dataType : "json",
			success : function(data) {
//				validate = JSON.parse(data);
				validate = data;
				console.log(validate);
				toastr.info("请查看邮箱验证码");
				//发送成功后禁用验证按钮
				$("#getCode").attr("disabled",true);
			},error: function(error){
				msg = error.responseJSON.message;
//				console.log(msg);
				if (msg.indexOf("554 DT:SPM") != -1) {
					toastr.error("邮件可能被拦截或识别为垃圾邮件");
				} else if(msg.indexOf("Read timed out") != -1) {
					toastr.error("发送邮件响应超时，请重试");
				} else {
					toastr.error("发送邮件错误：可能被拦截或超时\n" + error.responseJSON.message);
				}
			}
		});
	});
    
    $("#confirmcode").click(function(){
    	var usercode = $("#usercode").val();
    	$.ajax({
    		type:"POST",
    		contentType:'application/json',
    		//验证url
    		url: "/admin/validatecode",
    		data:JSON.stringify({
    			//验证码验证模块
    			"hash":validate.hash,
    			"time":validate.time,
    			"code":usercode
    		}),
    		dataType:"json",
    		timeout:5000,
    		success: function(data){
    			console.log(data);
                var status = data.result;
                if (status == "error") {
    				toastr.error("验证失败！");
                }else if (status == "overdue") {
                	toastr.error("验证码已过期");
    			}else if (status == "success") {
    				$("#reset").removeAttr("disabled");
    			}
    		},
    		error:function(){
				console.log("回调失败！");
			}
    	});
    });
    	
    $("#reset").click(function(){
    	var userpassword = $("#userpassword").val();
    	var useremail = $("#useremail").val();
    	var type=$(':radio:checked').val();
    	//重置密码
    	$.ajax({
			type:"POST",
			contentType:'application/json',
			url: "/admin/resetpassword",
			data:JSON.stringify({
				"email":useremail,
				"password":userpassword,
				"type":type
			}),
			dataType:"json",
			timeout:5000,
			success: function(data){
//				var data = JSON.parse(msg);
				console.log(data);
	            var status = data.result;
	            if (status == "error") {
					toastr.error("重置失败，请重试！");
				}else if (status == "success") {
					toastr.success("重置成功！");
					setTimeout(function(){
						window.location = "/admin/login";
					},2000);
				}
			},
			error:function(){
				console.log("回调失败！");
			}
		});
    	
    });
    
    
});


