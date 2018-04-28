$().ready(function() {
	//主题帖内容
	var forum_titleHTML = $("#forum_title");
	var forum_contentHTML = $("#forum_content");
	var forum_additionHTML = $("#forum_addtion");
	//回帖正序倒序
	var timelineHTML = $("#tab_1");
	var reverseHTML = $("#tab_2");
	
	//主题帖内容
	$.ajax({
        url: "getForumDetail",
        type: 'post',
        contentType:'application/json',
        dataType:"json",
		timeout:5000,
        success: function (data) {
        	console.log(data);
        	//[author - image][author - name]
        	var forum_title = '<img class="img-circle img-bordered-sm" src="dist/img/user1-128x128.jpg" alt="user image" />' +
        					'<span class="username"><a href="#">呵呵</a></span>' +
        					'<span class="description">'+ data.f_date +'</span>';
        	var forum_content = data.f_content;
        	
        	var sticky = "";
        	if(data.isSticky==true){
        		sticky = "取消置顶";
        	}else {
        		sticky = "置顶该帖";
        	}
        	
        	var forum_addition = '<li><i class="fa fa-share margin-r-5"></i> 浏览('+ data.f_view +')</li>' +
        					'<li><i class="fa fa-thumbs-o-up margin-r-5"></i> 喜欢('+ data.f_like +')</li>' +
        					'<li><a name="stick"><i class="fa fa-bookmark margin-r-5"></i> '+ sticky +'</a></li>'+
        					'<li><a name="delete" style="color:red"><i class="fa fa-close margin-r-5"></i> 删除该帖</a></li>'
        	
        	forum_titleHTML.html(forum_title);
        	forum_contentHTML.html(forum_content);
        	forum_additionHTML.html(forum_addition);
        },error:function(e){ 
	    	toastr.error("请求失败");
	    }
	});
	
	$.ajax({
		//回帖请求-正序
        url: "getPostsList",
        type: 'post',
        contentType:'application/json',
        dataType:"json",
		timeout:5000,
        success: function (data) {
        	console.log(data);
        	var timeline = "";
    		for (var i = 0; i < data.length; i++) {
    			var one = '<div class="post"><div class="user-block">' +
    				//用户头像
    				'<img class="img-circle img-bordered-sm" src="dist/img/user1-128x128.jpg" alt="user image" />' +
    				//用户名 - data[i].user_ID - > username
    				'<span class="username"><a href="#">呵呵</a></span>' +
    				'<span class="description">'+ data[i].p_date +'</span>' +
    				//回帖文字
    				'<p>'+ data[i].p_content +'</p>' +
    				'<ul class="list-inline">' +
//        			'<li><i class="fa fa-share margin-r-5"></i> 浏览('+ data[i].p_view +')</li>' + 
//        			'<li><i class="fa fa-thumbs-o-up margin-r-5"></i> 喜欢('+ data[i].p_like +')</li>' +
    				'<li><a href="#"><i class="fa fa-comments-o margin-r-5"></i> 展开评论</a></li>' + 
    				'</ul></div>';
    			timeline += one;
    		}
        	timelineHTML.html(timeline);
        },error:function(e){ 
	    	toastr.error("请求失败");
	    }
	});
	
	
	$(document).on('click','[name="delete"]',function(e){
		$.ajax({
			async: false,
			type: "POST",
			contentType:'application/json',
			dataType: 'json',
			//删除公告
			url: "deleteForum",
			timeout: 5000,
			success:function(msg){
			    var result = msg.result;
			    if (result=="success"){
			    	//删除成功，跳转到下一篇？/返回列表
			    	window.location="/forum/forum";
			    }else {
			    	toastr.error("删除失败！")
			    }
			},error:function(e){
			    toastr.error("请求失败！");
			}
		});
	});
	
	$(document).on('click','[name="stick"]',function(e){
		$.ajax({
			async: false,
			type: "POST",
			contentType:'application/json',
			dataType: 'json',
			//删除公告
			url: "stickForum",
			timeout: 5000,
			success:function(msg){
			    var result = msg.result;
			    if (result=="success"){
			    	//删除成功，跳转到下一篇？/返回列表
			    	window.location="/forum/posts";
			    }else {
			    	toastr.error("置顶操作失败！")
			    }
			},error:function(e){
			    toastr.error("请求失败！");
			}
		});
	});
	
	
	
})