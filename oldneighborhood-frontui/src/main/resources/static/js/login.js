/**
 * Created by st0001 on 2017/12/14.
 */
$().ready(function() {
    $("#login_form").validate({
        rules: {
        	username:{
        		required: true,
        		minlength: 5
        	},
        	userpassword: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            username: {
            	required: "请输入用户名",
            	minlength: "请检查用户名"
            },
            userpassword: {
                required: "请输入密码",
                minlength: "密码不能小于{0}个字符"
            }
        }
    });
    
    $("#login").click(function(){
    	var valid = $("#login_form").valid();
    	if(!valid){
    		toastr.warning("检查输入！");
    	}else{
        	var name=$("#username").val();
        	var passwd=$("#userpassword").val();
        	var usertype=$(':radio:checked').val();
        	
//        	console.log(name+passwd+usertype);
        	$.ajax({
        		//登录验证的应用
                url: "/admin/loginValidation",
                type: 'post',
                contentType:'application/json',
                data:JSON.stringify({
                	"username":name,
        			"password":passwd,
        			"type":usertype
                }), 
                dataType:"json",
    			timeout:5000,
                success: function (data) {
                	// 成功后回调，已经是json格式无须转换
//                	var data = JSON.parse(msg);
                	console.log(data);
                    var status = data.result;
                    if (status == "error") {
                    	toastr.warning("用户名或密码不正确！");
    				}else if (status == "success") {
    					if (usertype=="user") {
    						window.location = "http://111.231.107.63:8080/";
    					} else if (usertype == "saler") {
    						window.location = "http://192.168.48.134:8080/SalerIndex";
//    						window.location = "/oldneighborhood/saler";
    					}else if (usertype=="admin"){
    						window.location="/admin/index";
    					}
    				}
                },
                error: function(e){    // 失败后回调
                	msg = e.responseJSON.message;
                	console.log(msg);
                    toastr.error("出错了");
                }
        	});
    	}
    
    });
    
});