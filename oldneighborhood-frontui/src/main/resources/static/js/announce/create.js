$().ready(function() {
	$('.textarea').wysihtml5();
	
	
	var imageurl = null;
	console.log("ready");
	$("#upload").click(function(){
		var form = $("#upload_image");
		var formdata = new FormData(form[0]);
		var btn = $("#upload");
		$.ajax({
            url: 'http://192.168.48.136:8085/common/file/fileupload',
//            url: 'http://111.231.107.63:8085/common/fileupload',
            type: 'POST',
            data: formdata,                    // 上传formdata封装的数据
            dataType: 'JSON',
            cache: false,                      // 不缓存
            processData: false,                // 告诉jQuery不要去处理发送的数据
            contentType: false,                // 告诉jQuery不要去设置Content-Type请求头
            success:function (msg) {           //成功回调
                console.log(msg);
            	var flag = msg.result;
            	if(flag=="success"){
//            		btn.attr("disabled","disabled");
            		btn.html("重新上传");
            		imageurl = msg.filename;
            		var imgHTML = '<img alt="题图" src="' + imageurl + '" width="400px">';
            		console.log("上传成功！");
            		$("#uploadedimage").html(imgHTML);
            	}else if(flag=="error"){
            		toastr.error("上传失败！");
            		btn.html("重试");
            		console.log("上传失败！");
            	}
            },error:function (err){
            	console.log("上传调用错误");
            }
        });
	})
	
	$("#modify").click(function(){
		var a_name = $("#announce_name").val();
		var a_author = $("#announce_author").val();
		var a_content = $("#announce_text").val();
		var a_image = "";
		if (imageurl!=null){
			a_image = imageurl;
		}
		
		$.ajax({
			//在controller中拼贴上其他数据后传输
            url: "newAnnouncement",
            type: 'post',
            contentType:'application/json',
            data:{
            	"a_name":a_name,
    			"a_author":a_author,
    			"a_content":a_content,
    			"a_image":a_image
            }, 
            dataType:"json",
			timeout:5000,
            success: function (data) {
            	console.log(data);
            	var status = data.result;
            	if (status == "error") {
            		toastr.warning("发布失败！");
				}else if(status == "success") {
					toastr.success("发布成功！");
					setTimeout(function(){
						window.location = "/oldneighborhood/announce";
					},1000);
				}
            },error:function() {
            	toastr.warning("调用失败");
            }
		});
	});
	
	
	$("#cancel").click(function(){
		window.location = "/oldneighborhood/announce";
	})
		
	
})