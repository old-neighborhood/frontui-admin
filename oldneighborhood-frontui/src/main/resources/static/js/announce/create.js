$().ready(function() {
//	$('.textarea').wysihtml5();
	var E = window.wangEditor
    var editor = new E('#editor')
    editor.customConfig.menus = [
    	'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'image',  // 插入图片
        'video',  // 插入视频
        'undo',  // 撤销
        'redo'  // 重复
    ]
    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024
//    editor.customConfig.uploadImgServer = 'http://111.231.107.63:8085/common/file/fileupload'
    editor.create()
	
	
	var imageurl = null;
	console.log("ready");
	$("#upload").click(function(){
		var form = $("#upload_image");
		var formdata = new FormData(form[0]);
		var btn = $("#upload");
		$.ajax({
            url: 'http://111.231.107.63:8085/common/file/fileupload',
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
            		var imgHTML = '<br><img alt="题图" src="' + imageurl + '" width="500px">';
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
	
	$("#create").click(function(){
		var a_name = $("#announce_name").val();
		var a_author = $("#announce_author").val();
		var a_content = editor.txt.html();
		console.log(a_content);
		console.log(a_name);
		var a_image = "";
		if (imageurl!=null){
			a_image = imageurl;
		}
		
		$.ajax({
			//一直走error
            url: "/admin/release",
            type: 'post',
            contentType:'application/json',
            data:JSON.stringify({
            	"a_title":a_name,
    			"a_author":a_author,
    			"a_content":a_content,
    			"a_image":a_image,
    			"ad_ID":"80d09f45cdd24b55926ba52b77204b05"
            }), 
            dataType:"json",
			timeout:20000,
            success: function (data) {
            	console.log(data);
            	var status = data.result;
            	if (status == "error") {
            		toastr.warning("发布失败！");
				}else if(status == "success") {
					toastr.success("发布成功！");
					setTimeout(function(){
						window.location = "/admin/announce";
					},1000);
				}
            },error:function(msg) {
            	toastr.info(msg);
            	toastr.warning("调用失败");
            }
		});
	});
	
	
	$("#cancel").click(function(){
		window.location = "/admin/announce";
	})
		
	
})