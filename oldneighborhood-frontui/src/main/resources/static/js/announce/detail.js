Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

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
	    url: "/admin/announceDetail",
	    timeout: 5000,
	    success:function(msg){
//	    	var data = JSON.parse(msg);
	    	data = msg;
	    	console.log(data);
	    	if (data!=null){
	    		announcement_ID.html(data.a_ID);
	    		if (data.isSticky==false){
	    			stickHTML.html('<i class="fa fa-print"></i> 置顶');
	    		}else{
	    			stickHTML.html('<i class="fa fa-print"></i> 取消置顶');
	    		}
	    		var title = '<h3>'+ data.a_title +'</h3><br /><div class="mailbox-read-time"><h5><span class="fa fa-user">&nbsp;作者 '+ data.a_author +' &nbsp;&nbsp;</span> '+  
                  	'<span class="fa fa-calendar-o">&nbsp;日期 '+ (new Date(data.a_date.time)).Format("yyyy-MM-dd hh:mm:ss") +' &nbsp;&nbsp;</span> '+
                  	'<span class="fa fa-eye">&nbsp;浏览量 '+ data.a_view +' &nbsp;&nbsp;</span></h5></div>';
	    		titleHTML.html(title);
	    		contentHTML.html(data.a_content);
	    	}else {
	    		toastr.warning("没有此公告！")
	    	}
//	    	board += "</div></div></div>";
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
			    	console.log(msg);
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
			url: "/admin/delete",
			timeout: 5000,
			success:function(msg){
				console.log(msg);
			    var result = msg.result;
			    if (result=="success"){
			    	//删除成功，跳转到下一篇？/返回列表
			    	window.location="admin/announce";
			    }else {
			    	toastr.error("删除失败！")
			    }
			},error:function(e){
			    toastr.error("请求失败！");
			}
		});
	});
	
	
//	$(document).on('click','[name="prev"]',function(e){
//		console.log("上一篇下一篇还未实现");
//		//上下篇的id存入session？
//	});
//	
	
	
})