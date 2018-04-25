$().ready(function() {
	
	var announcement_ID = $("#announce_id");
	var stick = $("[name='stick']");
	var title = $(".mailbox-read-info");
	var detail = $(".mailbox-read-message");
	var data = null;
	
	
	$.ajax({
		async: false,
	    type: "POST",
	    contentType:'application/json',
	    dataType: 'json',
	    //获取单个公告
	    url: "announceDetail",
	    timeout: 5000,
	    success:function(msg){
//	    	var data = JSON.parse(msg);
	    	date = msg;
	    	console.log(data);
	    	if (data!=null){
	    		announcement_ID.html(data.a_ID);
	    		if (data.isSticky==true){
	    			stick.html('<i class="fa fa-print"></i> 取消置顶');
	    		}else{
	    			stick.html('<i class="fa fa-print"></i> 置顶');
	    		}
	    		
	    	
	    	}else {
	    		toastr.warning("没有此公告！")
	    	}
	    	board += "</div></div></div>";
	    },error:function(e){
	    	toastr.error("请求失败！");
	    }
	})
	
})