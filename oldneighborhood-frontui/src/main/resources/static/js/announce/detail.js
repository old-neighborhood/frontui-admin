$().ready(function() {
	
	var announcement_ID = $("#announce_id");
	var stickHTML = $("[name='stick']");
	var titleHTML = $(".mailbox-read-info");
	var contentHTML = $(".mailbox-read-message");
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
	    			stickHTML.html('<i class="fa fa-print"></i> 取消置顶');
	    		}else{
	    			stickHTML.html('<i class="fa fa-print"></i> 置顶');
	    		}
	    		var title = '<h5><span class="fa fa-user">&nbsp; '+ data.a_author +' &nbsp;&nbsp;</span> '+  
                  	'<span class="fa fa-calendar-o">&nbsp; '+ data.a_date +' &nbsp;&nbsp;</span> '+
                  	'<span class="fa fa-eye">&nbsp; '+ data.a_view +' &nbsp;&nbsp;</span></h5>';
	    		titleHTML.html(title);
	    		contentHTML.html(data.a_content);
	    	}else {
	    		toastr.warning("没有此公告！")
	    	}
	    	board += "</div></div></div>";
	    },error:function(e){
	    	toastr.error("请求失败！");
	    }
	})
	
	
	
	$(document).on('click','[name="stick"]',function(e){
		var isSticky = data.isSticky;
		console.log(isSticky);
		if (isSticky == true) {
			$.ajax({
				async: false,
			    type: "POST",
			    contentType:'application/json',
			    dataType: 'json',
			    //获取单个公告
			    url: "unstick",
			    timeout: 5000,
			    success:function(msg){
			    	var result = msg.result;
			    	if (result=="success"){
			    		stickHTML.html('<i class="fa fa-print"></i> 置顶');
			    	}else {
			    		toastr.error("取消置顶失败！")
			    	}
			    },error:function(e){
			    	toastr.error("请求失败！");
			    }
			});
		} else {
			$.ajax({
				async: false,
			    type: "POST",
			    contentType:'application/json',
			    dataType: 'json',
			    //获取单个公告
			    url: "stick",
			    timeout: 5000,
			    success:function(msg){
			    	var result = msg.result;
			    	if (result=="success"){
			    		stickHTML.html('<i class="fa fa-print"></i> 取消置顶');
			    	}else {
			    		toastr.error("取消置顶失败！")
			    	}
			    },error:function(e){
			    	toastr.error("请求失败！");
			    }
			});
		}
	});
	
	
	$(document).on('click','[name="delete"]',function(e){
		$.ajax({
			async: false,
			type: "POST",
			contentType:'application/json',
			dataType: 'json',
			//删除公告
			url: "delete",
			data:JSON.stringify({
		    	  "a_ID":announcement_ID
	            }), 
			timeout: 5000,
			success:function(msg){
			    var result = msg.result;
			    if (result=="success"){
			    	//删除成功，跳转到下一篇？/返回列表
			    	window.location="announce/announcement";
			    }else {
			    	toastr.error("删除失败！")
			    }
			},error:function(e){
			    toastr.error("请求失败！");
			}
		});
	});
	
	
	$(document).on('click','[name="prev"]',function(e){
		console.log("上一篇下一篇还未实现");
		//上下篇的id存入session？
	});
	
	
	
})