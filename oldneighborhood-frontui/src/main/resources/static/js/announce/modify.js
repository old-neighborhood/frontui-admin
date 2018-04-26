$().ready(function() {
	
	$("#create").click(function(){
		var a_name = $("#announce_name").val();
		var a_author = $("#announce_author").val();
		var a_content = $("#announce_text").val();
		
		$.ajax({
			//在controller中拼贴上其他数据后传输
            url: "newAnnouncement",
            type: 'post',
            contentType:'application/json',
            data:{
            	"a_name":a_name,
    			"a_author":a_author,
    			"a_content":a_content
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
						window.location = "announce/announcement";
					},1000);
				}
            },error:function() {
            	toastr.warning("调用失败");
            }
		});
	});
	
	$("#cancel").click(function(){
		window.location = "announce/announcement";
	})
	
	
})