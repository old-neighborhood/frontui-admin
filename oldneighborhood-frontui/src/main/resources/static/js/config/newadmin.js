
$().ready(function() {
	$("#createadmin_form").validate({
        rules: {
        	ad_name:{
        		required: true,
        		minlength: 5
        	},
        	ad_password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
        	ad_name: {
            	required: "请输入登录名",
            	minlength: "不少于{0}个字符"
            },
            ad_password: {
                required: "请输入密码",
                minlength: "密码不能小于{0}个字符"
            }
        }
    });
	
	/*console.log($("#createadmin_form").valid());
	if ( $("#createadmin_form").valid()) {
		$("#create").removeAttr("disabled");
	}*/
	
	$("#create").click(function(){
		var ad_name = $("#ad_name").val();
		var ad_password = $("#ad_password").val();
		
		var config = $("#config-permission").val();
		var site = $("#site-permission").val();
		var announce = $("#announce-permission").val();
		var forum = $("#forum-permission").val();
		var data = $("#data-permission").val();
		//形如"rrrrr"/"wwwww"/"rwrwr"
		var ad_permission = config + site + announce + forum + data;
		console.log(ad_name + ad_password + ad_permission);
		
		$.ajax({
    		//新建管理员的url，调整了ad_permission的内容，ad_image/ad_ID后台生成或默认
            url: "http://localhost:8087/oldneighborhood/admin/new",
            type: 'post',
            contentType:'application/json',
            data:JSON.stringify({
            	"ad_name":ad_name,
    			"ad_password":ad_password,
    			"ad_permission":ad_permission
            }), 
            dataType:"json",
			timeout:5000,
            success: function (data) {
            	console.log(data);
            	var status = data.result;
            	if (status == "error") {
            		toastr.warning("新建失败！");
				}else if(status == "full") {
					toastr.warning("管理员用户不超过10个！");
				}else if(status == "success") {
					toastr.success("新建成功！");
					setTimeout(function(){
						window.location = "admin";
					},1000);
				}
            },error:function() {
            }
		});
	});
	
})

