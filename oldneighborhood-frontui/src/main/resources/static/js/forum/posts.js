Date.prototype.format = function (fmt) { //author: meizz 
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
	
	var page_size = 10;
	var currentPage=1;
	var totalpage;
	var sort = "date";
	var forum;
	//获取分页
	$.ajax({
		async: false,
	    type: "GET",
	    cache:false, 
	    dataType: 'json',
	    url: "/admin/totalposts",
	    timeout: 3000,
	    contentType: "application/json;utf-8",
	    success: function(msg) {
	    	console.log(msg);
	    	totalpage = Math.ceil(msg/page_size);
	    	var html = '<li class="pre"><a href="#">&laquo;</a></li>';
	    	for(var i=0;i<totalpage;i++)
	    		html+='<li class="page_'+(i+1)+'"><a href="#">'+(i+1)+'</a></li>';
	    	html += '<li class="next"><a href="#">&raquo;</a></li>';
	    	$(".pagination").html(html);
	    	$(".pagination").find(".page_"+currentPage).addClass("active");
	    	if(msg=="0")
	    		$(".pagination").hide();
	    },error:function(e){
	    	console.log("error");
	    }
	});
	
	$.ajax({
		async: false,
	    type: "GET",
	    cache:false, 
	    url: "/admin/forumdetail",
	    timeout: 3000,
	    contentType: "application/json;utf-8",
	    success: function(msg) {
	    	forum = eval('(' + msg + ')');
	    	console.log(forum);
	    }
	});
	//楼主信息
	var firstInfo;
	if(forum!=null){
		$.ajax({
			async: false,
		    type: "POST",
		    cache:false, 
		    dataType: 'json',
		    url: "/admin/getInfo",
		    timeout: 3000,
		    data:JSON.stringify({
		    	"ID":forum.user_ID,
		    	"type":forum.user_type
		    }),
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	console.log(msg);
		    	firstInfo = msg;
		    }
		});
	}
	//楼主帖
	var firstusername;
	var firstuserimage;
	if (forum.user_type=="saler") {
		firstusername = firstInfo.s_name;
		firstuserimage = firstInfo.s_image;
	}else if (forum.user_type=="user") {
		firstusername = firstInfo.u_name;
		firstuserimage = firstInfo.u_image;
	}
	var forum_owner = '<img class="img-circle img-bordered-sm" src="/admin'+ firstuserimage +'" alt="user image" />' +
						'<span class="username">'+ firstusername +'</span>' +
						'<span class="description">'+ (new Date(forum.f_date.time)).format("yyyy-MM-dd hh:mm") +'</span>';
	var forum_title = '<h4><strong>' + forum.f_title + '</strong></h4><br/>';
	var forum_content = forum.f_content;
	
	$("#forum_title").html(forum_owner);
	$("#forum_content").html(forum_title + forum_content);
	var forum_addition = "";
	if (forum.isSticky==true) {
		forum_addition += '<li><a name="stick" href="" ><i class="fa fa-bookmark margin-r-5"></i>取消置顶</a></li>'
	}else {
		forum_addition += '<li><a name="stick" href="" ><i class="fa fa-bookmark margin-r-5"></i>置顶</a></li>';
	}
	forum_addition += '<li><a name="delete" style="color:red"><i class="fa fa-close margin-r-5"></i> 删除主题帖</a></li>';
	
	$("#forum_addition").html(forum_addition);
	
	function getPostList(){
		var postList;
		$.ajax({
			async: false,
		    type: "POST",
		    cache:false, 
		    dataType: 'json',
		    url: "/admin/postlist",
		    timeout: 3000,
		    data:JSON.stringify({
		    	"current_page":currentPage,
		    	"page_size":page_size,
		    	"sort_term":sort
		    }),
		    contentType: "application/json;utf-8",
		    success: function(msg) {
//		    	postList = eval('(' + msg + ')');
		    	postList = msg;
		    	console.log(postList);
		    },error:function(e){
		    	console.log("postlist error");
		    }
		});
	
		var html = '';
		for(var i=0; i < postList.length; i++){
			$.ajax({
				async: false,
			    type: "POST",
			    cache:false, 
			    dataType: 'json',
			    url: "/admin/getInfo",
			    timeout: 3000,
			    data:JSON.stringify({
			    	"ID":postList[i].user_ID,
			    	"type":postList[i].user_type
			    }),
			    contentType: "application/json;utf-8",
			    success: function(msg) {
//			    	var obj = eval('(' + msg + ')');
			    	var obj = msg;
		    		html += '<div class="post"><div class="user-block">';
		    		if (postList[i].user_type == "saler") {
						html += '<img class="img-circle img-bordered-sm" src="/admin'+ obj.s_image +'" alt="user image" />' + 
						'<span class="username">'+ obj.s_name +'</span>';
					}else if (postList[i].user_type == "user") {
						html += '<img class="img-circle img-bordered-sm" src="/admin'+ obj.u_image +'" alt="user image" />' +
						'<span class="username">'+ obj.u_name +'</span>';
					}
		    		html += '<span class="description">'+ (new Date(postList[i].p_date.time)).format("yyyy-MM-dd hh:mm") +'</span></div>' +
		    			'<p>'+ postList[i].p_content +'</p>'+
		    			'<input type="hidden" value="'+ postList[i].p_ID +'"/>' + 
		    			'<li><a href="" name="deletepost" style="color:red"> 删除回帖</a></li></div>';
			    }
			});
		}
		$("#tab_1").html(html);
	}
	getPostList();
	
	$(document).on('click',".pagination>li",function(e){ 
		//console.log("id:"+$(this).attr("id"));
		if($(this).attr("class")=="pre"&&currentPage!=1){
			$(".page_"+currentPage).removeClass("active");
			currentPage--;
			$(".page_"+currentPage).addClass("active");
			//console.log('a');
		}else if($(this).attr("class")=="next"&&currentPage!=totalpage){
			$(".page_"+currentPage).removeClass("active");
			currentPage++;
			$(".page_"+currentPage).addClass("active");
			//console.log('b');
		}else if($(this).attr("class")!="pre"&&$(this).attr("class")!="next"){
			$(".page_"+currentPage).removeClass("active");
			var cla ="."+ $(this).attr("class");
			$(cla).addClass("active");
			currentPage = $(this).text();
			//console.log('c');
		}
		
		getPostList();
		
		//console.log(currentPage);
		if(currentPage==1){
			$(".pre").addClass("disabled");
		}
		else{
			$(".pre").removeClass("disabled");
		}
		
		if(currentPage==totalpage){
			$(".next").addClass("disabled");
		}
		else{
			$(".next").removeClass("disabled");
		}
	});
	
	
	$(document).on('click',"a[name='delete']",function(e){ 
		console.log("DELETE");
		$.ajax({
//			async: false,
		    type: "GET",
		    cache:false, 
		    dataType: 'json',
		    url: "/admin/deleteforum",
		    timeout: 3000,
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	console.log("deleteOK");
		    }
		});
		window.location="forum";
	});
	
	$(document).on('click',"a[name='stick']",function(e){
		if (forum.isSticky==true) {
			$.ajax({
				async: false,
			    type: "GET",
			    cache:false, 
			    dataType: 'json',
			    url: "/admin/unstrickform",
			    timeout: 3000,
			    contentType: "application/json;utf-8",
			    success: function(msg) {
			    	console.log("取消置顶");
	             	setTimeout(getPostList(),1000);
			    }
			});
		} else{
			$.ajax({
				async: false,
			    type: "GET",
			    cache:false, 
			    dataType: 'json',
			    url: "/admin/strickform",
			    timeout: 3000,
			    contentType: "application/json;utf-8",
			    success: function(msg) {
			    	console.log("置顶OK");
	             	setTimeout(getPostList(),1000);
			    }
			});
		}
	});
	
	//成功
	$(document).on('click',"a[name='deletepost']",function(e){ 
		var p_ID = $(this).parent().parent().find("input").val();
		$.ajax({
			async: false,
		    type: "GET",
		    cache:false, 
		    url: "/admin/setP_ID",
		    timeout: 3000,
		    data:{"p_ID":p_ID},
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	toastr.info("SET成功！");
//		    	window.location.href = "/Post";
		    }
		});
		
		$.ajax({
			async: false,
		    type: "GET",
		    cache:false, 
		    dataType: 'json',
		    url: "/admin/deletepost",
		    timeout: 3000,
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	console.log("删除成功");
             	setTimeout(getPostList(),1000);
		    }
		});
	});
	
	
	
})