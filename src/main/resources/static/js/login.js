/**
 * Created by st0001 on 2017/12/14.
 * 进行表单内容的基本验证——不符合反馈
 * 进行表单内容的读取发送至~~
 * 注册跳转到另外的页面
 */
$().ready(function() {
    $("#login_form").validate({
        rules: {
            username:{
            	required:true,
            	minlength: 3
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            username: {
            	required:"请输入姓名",
                minlength: "账号过短"
            },
            password: {
                required: "请输入密码",
                minlength: "密码不能小于{0}个字符"
            },
        }
    });
    $("#login").click(function(){
    	var name=$("#exampleInputEmail1").val();
    	var passwd=$("#exampleInputPassword1").val();
    	var type=$(':radio:checked').val();
//    	alert(type);
    	var json = JSON.stringify({
        	'username':name,
			'password':passwd,
			'type':type
        });
    	$.ajax({
    		type: "post",
    		url: "/login",
    		contentType:"application/json",
    		data:JSON.stringify({
            	'username':name,
    			'password':passwd,
    			'type':type
            }),
    		beforeSend: function(XMLHttpRequest){
    			index = layer.msg('努力加载中...', {time:10*1000},{
					  icon: 16, 
					  shade: 0.08,
					  offset: '20px'
					});
    			},success: function(data, textStatus){
    				console.log(data);
    				var o=eval('('+data+')');
    		if (type=="user"&&o.result=="success") {
    			layer.msg("登录成功" , {anim: 6 });
           	 setTimeout('window.location.href="/UserIndex"',1000);
        		//window.location.href="userIndex.html";
    		}else if (type=="saler"&&o.result=="success"){
    			layer.msg("登录成功" , {anim: 6 });
              	 setTimeout('window.location.href="/SalerIndex"',1000);
    			//window.location.href="salerIndex.html";
    		}else if (type=="admin"&&o.result=="success"){
    			layer.msg("登录成功" , {anim: 6 });
              	 setTimeout('window.location.href="/AdminIndex"',1000);
    			//window.location.href="adminIndex.html";
    		}else if(o.result=="error"){
    			layer.msg("账号或密码错误！" , {anim: 6 });
    		}
    		},
    		complete: function(XMLHttpRequest, textStatus){
    		//HideLoading();
    			},error: function(){
    				alert("error");
    		//请求出错处理
    				}});
    
    	
    });
    
});