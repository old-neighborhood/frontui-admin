$().ready(function() {
	
    var a_ID = null;
    $.ajax({
		async: false,
	    type: "POST",
	    contentType:'application/json',
	    dataType: 'json',
	    //获取单个公告
	    url: "/admin/announceDetail",
	    timeout: 5000,
	    success:function(data){
	    	console.log(data);
	    	a_ID = data.a_ID;
	    	$('#announce_name').val(data.a_title);
	    	$('#announce_author').val(data.a_author);
	    	$('#editor').html(data.a_content);
	    },error:function(e){
	    	toastr.error("请求失败！");
	    }
	});
    
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
    editor.create();
	
	$("#modify").click(function(){
		var a_name = $("#announce_name").val();
		var a_author = $("#announce_author").val();
		var a_content = editor.txt.html();
		
		$.ajax({
			//在controller中拼贴上其他数据后传输
            url: "/admin/update",
            type: 'post',
            contentType:'application/json',
            data:JSON.stringify({
            	"a_title": a_name,
    			"a_author": a_author,
    			"a_content": a_content,
    			"a_ID": a_ID,
    			"a_image":""
            }), 
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
						window.location = "/admin/announce";
					},1000);
				}
            },error:function() {
            	toastr.warning("更新失败");
            }
		});
	});
	
	$("#cancel").click(function(){
		window.location = "/admin/announce";
	});
	
	$("#reset").click(function(){
		window.location = "/admin/announce";
	});
	
})