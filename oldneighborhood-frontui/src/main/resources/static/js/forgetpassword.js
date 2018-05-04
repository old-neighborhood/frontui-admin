/**
 * Created by st0001 on 2017/12/13.
 */
$().ready(function() {
    $("#validate_form").validate({
        rules: {
            useremail:{
            	required: true,
            	email:true
            },
//            userpassword: {
//                required: true,
//                minlength: 5,
//            	maxlength: 32
//            },
//            confirmpassword: {
//                required: true,
//                equalTo: "#userpassword"
//            },
            usercode: "required"
        },
        messages: {
            useremail:{
            	required: "请输入邮箱",
            	email: "请检查邮箱是否有效"
            },
//            userpassword: {
//                required: "请输入密码",
//                minlength: "密码不能小于{0}个字符",
//                maxlength: "密码不能超过{0}个字符"
//            },
//            confirmpassword: {
//                required: "请再次输入密码",
//                equalTo: "两次密码不一样"
//            },
            usercode: "请输入验证码"
        }
    });
    
    //包含hash值等
    var validate = null;
    var sleep = 30, interval = null;
    window.onload = function () {
    	$("#getCode").click(function(){
    		var useremail = $("#useremail").val();
            if (!interval){
            	console.log(userphone);
                $.ajax({
                	type:"POST",
                	contentType:'application/json',
                	//获取验证码的url
                	url:"/getCode",
                	data:JSON.stringify({
                		//手机验证码发送
                		"email":useremail
                	}),
                	dataType:"json",
                	success:function(data){
                		console.log(data);
                		validate = data;
                		toastr.info("请查看邮箱验证码");
    					
                	}
                })
                this.style.backgroundColor = 'rgb(243, 182, 182)';
                this.disabled = "disabled";
                this.style.cursor = "wait";
                this.value = "重新发送 (" + sleep-- + ")";
                interval = setInterval (function ()
                {
                    if (sleep == 0)
                    {
                        if (!!interval)
                        {
                            clearInterval (interval);
                            interval = null;
                            sleep = 30;
                            btn.style.cursor = "pointer";
                            btn.removeAttribute ('disabled');
                            btn.value = "获取验证码";
                            btn.style.backgroundColor = '';
                        }
                        return false;
                    }
                    btn.value = "重新发送 (" + sleep-- + ")";
                }, 300000);            
            }
    	});
    }
    
    
    var inputpassword = $("#userpassword");
    var inputconfirmpassword = $("#confirmpassword");
    var resetbtn = $("reset");
    $("#confirmcode").click(function(){
    	var usercode = $("#usercode").val();
    	$.ajax({
    		type:"POST",
    		contentType:'application/json',
    		//验证url
    		url: "/validatecode",
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
    				inputpassword.removeAttribute ('disabled');
    				inputconfirmpassword.removeAttribute ('disabled');
    				resetbtn.removeAttribute ('disabled');
    			}
    		},
    		error:function(){
				console.log("回调失败！");
			}
    });
    	
    $("#reset").click(function(){
    	var userpassword = $("#userpassword").val();
    	var useremail = $("#useremail").val();
    	var type=$(':radio:checked').val();
    	//重置密码
    	$.ajax({
			type:"POST",
			contentType:'application/json',
			url: "/resetpassword",
			data:JSON.stringify({
				"email":useremail,
				"password":userpassword,
				"type":type
			}),
			dataType:"json",
			timeout:5000,
			success: function(data){
				console.log(data);
	            var status = data.result;
	            if (status == "error") {
					toastr.error("重置失败，请重试！");
				}else if (status == "success") {
					toastr.success("重置成功！");
					setTimeout(function(){
						window.location = "/login";
					},2000);
				}
			},
			error:function(){
				console.log("回调失败！");
			}
		});
    	
    });
    
    
});

