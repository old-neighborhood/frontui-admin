/**
 * Created by st0001 on 2017/12/13.
 * added on 2017/12/16
 */

$().ready(function() {
    $("#register_form").validate({
        rules: {
            rUsername: "required",
            rPassword: {
                required: true,
                minlength: 5
            },
            rConfirmPassword: {
                required: true,
                equalTo: "#exampleInputPassword1"
            },
            rEmail: {
                required: true,
                email: true
            },
            rCode:"required"
        },
        messages: {
            rUsername: "请输入姓名",
            rPassword: {
                required: "请输入密码",
                minlength: "密码不能小于{0}个字符"
            },
            rConfirmPassword: {
                required: "请再次输入密码",
                equalTo: "两次密码不一样"
            },
            rEmail: {
                required: "请输入邮箱",
                email: "请输入有效邮箱"
            },
            rCode:{
                required: "请输入验证码"
            }
        }
    });
    
});








var sleep = 30, interval = null;
window.onload = function ()
{
    var btn = document.getElementById ('getCode');
    btn.onclick = function ()
    {
        var email = document.getElementById("exampleInputEmail1").value;
        console.log(email);
        if(email.length==0)
            alert("请输入邮箱地址");
        else if(email.indexOf("@") == -1)
            alert("请正确输入邮箱");
        
   
        
        if (!interval&&email.length!=0&&email.indexOf("@") != -1)
        {
            var http = 'http://192.168.137.247:8084';
            console.log("send something away~");
            var code = $.ajax({
            	type:"POST",//后台相关
            	url:http+"/getCode/",
            	data:{
            		email:email
            	},
            	dataType:"json",
            	success:function(data){
						alert("请查看邮箱验证码！");
					
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
                        btn.value = "免费获取验证码";
                        btn.style.backgroundColor = '';
                    }
                    return false;
                }
                btn.value = "重新发送 (" + sleep-- + ")";
            }, 1000);            
        }
        

        
    }
}

$("#register").click(function(){
	var username = $("#exampleInputName").val();
	var userpassword = $("#exampleInputPassword1").val();
	var useremail = $("#exampleInputEmail1").val();
	var usercode = $("#exampleCode").val();
	
	var http = '192.168.137.247:8081';
	$.ajax({
		type:"POST",
		url:http+"/register/",
		data:{
			'username':username,
			'password':userpassword,
			'role':"student",
			'email':useremail,
			'code':usercode
		},
		dataType:"json",
		timeout:15000,
		success: function(data){
			alert("注册成功！");
//			if (data.code == 200) {
//				window.location.href("login.html");
//			}
		}
	})
	
})