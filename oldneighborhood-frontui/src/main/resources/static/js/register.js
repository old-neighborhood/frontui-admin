/**
 * Created by st0001 on 2017/12/13.
 */
$().ready(function() {
    $("#register_form").validate({
        rules: {
        	username: {
                required: true,
                minlength: 5,
            	maxlength: 32
            },
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
        	username: {
                required: "请输入用户名",
                minlength: "不少于{0}个字符",
                maxlength: "不大于{0}个字符"
            },
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
    
    
    $("#getCode").click(function(){
		var useremail = $("#useremail").val();
		console.log(useremail);
		$.ajax({
			type : "POST",
			contentType : "application/json",
			// 获取验证码的url
			url : "/oldneighborhood/getCode",
			data : JSON.stringify({
				// 手机验证码发送
				"email" : useremail
			}),
			timeout: 5000,
//			dataType : "json",
			success : function(data) {
				console.log(data);
				validate = data;
				toastr.info("请查看邮箱验证码");
//				禁用按钮
			},error: function(error){
				msg = error.responseJSON.message;
//				console.log(msg);
				if (msg.indexOf("554 DT:SPM") != -1) {
					toastr.error("邮件可能被拦截或识别为垃圾邮件");
				} else if(msg.indexOf("Read timed out") != -1) {
					toastr.error("发送邮件响应超时");
				} else {
					toastr.error("发送邮件错误：可能被拦截或超时\n" + error.responseJSON.message);
				}
			}
		});
		//禁用获取验证码
		$('#getCode').attr("disabled",true); 
	});
    
    
// var validate = null;
// var sleep = 30, interval = null;
// window.onload = function () {
// $("#getCode").click(function(){
//    		var useremail = $("#useremail").val();
////            var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
////            if(userphone.length==0)
////                toastr.warning("请输入手机号码");
////            else if(!reg.test(userphone))
////                toastr.warning("请输入有效手机号码");
////    		if (!interval && userphone.length!=0 && reg.test(userphone)){
//    		
//            if (!interval){
//            	console.log(useremail);
//                $.ajax({
//                	type:"POST",
//                	contentType:'application/json',
//                	//获取验证码的url
//                	url:"/oldneighborhood/getCode",
//                	data:JSON.stringify({
//                		//手机验证码发送
//                		"email":useremail
//                	}),
//                	dataType:"json",
//                	success:function(data){
//                		console.log(data);
//                		validate = data;
//                		toastr.info("请查看邮箱验证码");
//    					
//                	}
//                });
//                this.style.backgroundColor = 'rgb(243, 182, 182)';
//                this.disabled = "disabled";
//                this.style.cursor = "wait";
//                this.value = "重新发送 (" + sleep-- + ")";
//                interval = setInterval (function ()
//                {
//                    if (sleep == 0)
//                    {
//                        if (!!interval)
//                        {
//                            clearInterval (interval);
//                            interval = null;
//                            sleep = 30;
//                            btn.style.cursor = "pointer";
//                            btn.removeAttribute ('disabled');
//                            btn.value = "获取验证码";
//                            btn.style.backgroundColor = '';
//                        }
//                        return false;
//                    }
//                    btn.value = "重新发送 (" + sleep-- + ")";
//                }, 300000);            
//            }
//    	});
//    }
    
    
    $("#register").click(function(){
    	var valid = $("#register_form").valid();
    	var agree = $("#agree").prop("checked");
    	
//    	console.log(valid+" "+agree);
    	if(!valid){
    		toastr.warning("检查输入！");
    	}else if(!agree){
    		toastr.warning("请查看并同意协议！");
    	}else{
    		var username = $("#username").val();
        	var userpassword = $("#userpassword").val();
        	var useremail = $("#useremail").val();
        	var usercode = $("#usercode").val();
        	var type=$(':radio:checked').val();
//        	console.log(username + "/" + userpassword + "/" + usertele + "/" + type);
        	//验证码验证
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
        			}else if (status == "success") {
        				//验证成功后
        				if (type=="user") {
        					//普通用户的注册
        					$.ajax({
        						type:"POST",
        						contentType:'application/json',
        						url: "/usersignup",
        						data:JSON.stringify({
        							"username":username,
        							"password":userpassword,
        							"email":useremail
        						}),
        						dataType:"json",
        						timeout:15000,
        						success: function(data){
        							console.log(data);
        				            var status = data.result;
        				            if (status == "error") {
        								toastr.error("注册失败！");
        							}else if (status == "success") {
        								toastr.success("注册成功！");
        								setTimeout(function(){
        									window.location = "/login";
        								},2000);
        							}
        						},
        						error:function(){
        							console.log("回调失败！");
        						}
        					});
        				}else {
        					//商业用户的注册
        					$.ajax({
        						type:"POST",
        						contentType:'application/json',
        						//
        						url: "/salersignup",
        						data:JSON.stringify({
        							"username":username,
        							"password":userpassword,
        							"email":useremail
        						}),
        						dataType:"json",
        						timeout:15000,
        						success: function(data){
        							console.log(data);
        				            var status = data.result;
        				            if (status == "error") {
        								toastr.error("注册失败！");
        							}else if (status == "success") {
        								toastr.success("注册成功！");
        								setTimeout(function(){
        									window.location = "/login";
        								},2000);
        							}
        						},
        						error:function(){
        							console.log("回调失败！");
        						}
        					})
        				}
        				
        			}
        		} 
        	})
    		
    	}
    	
    });
    
    
});


