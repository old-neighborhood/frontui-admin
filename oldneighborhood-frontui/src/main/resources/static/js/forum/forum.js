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
	
	var timelineHTML = $("#forum_timeline");
//	var reverseHTML = $("#forum_reverse");
	var viewHTML= $("#forum_view");
//	viewHTML.html("hsdhfhds");
	var page_size = 10;
	var current_page = 1;
	var total_page;
	var sort = "date";
	
	$.ajax({
		async: false,
	    type: "GET",
	    cache:true, 
	    dataType: 'json',
	    url: "/admin/totalrows",
	    timeout: 3000,
	    contentType: "application/json;utf-8",
	    success: function(msg) {
	    	total_page = Math.ceil(msg/page_size);
	    	var html = '<li id="pre"><a href="#">&laquo;</a></li>';
	    	for(var i=0;i<total_page;i++)
	    		html += '<li id="page_'+(i+1)+'"><a href="#">'+(i+1)+'</a></li>';
	    	html += '<li id="next"><a href="#">&raquo;</a></li>';
	    	$(".pagination").html(html);
	    	$(".pagination").find("#page_" + current_page).addClass("active");
	    }
	});
	
	
	function getForumList(){
		$.ajax({
			//转发论坛列表请求
	        url: "/admin/forumlist",
	        type: 'post',
	        contentType:'application/json',
	        dataType:"json",
			timeout:5000,
			data:JSON.stringify({
			    	"current_page":current_page,
			    	"page_size":page_size,
			    	"sort_term":sort
			}),
	        success: function (data) {
//	        	console.log(data);
	        	var forum = '<thead><tr>'+
	        		'<th hidden="hidden" id="forum_id"></th>'+
	        		'<th style="width:30%">日期</th>'+
	        		'<th style="width:40%">帖子</th>'+
	                '<th style="width:15%">作者</th>'+
	                '<th style="width:15%">收藏/浏览</th></tr></thead>';
        		forum += '<tbody>';
        		for (var i = 0; i < data.length; i++) {
        			
        			//得到用户信息 - name
        			var userInfo;
        			$.ajax({
        				async: false,
        			    type: "POST",
        			    cache:false, 
        			    dataType: 'json',
        			    url: "/admin/getInfo",
        			    timeout: 3000,
        			    data:JSON.stringify({
        			    	"ID":data[i].user_ID,
        			    	"type":data[i].user_type
        			    }),
        			    contentType: "application/json;utf-8",
        			    success: function(msg) {
        			    	userInfo = msg;
//        			    	console.log(userInfo);
//        			    	userInfo = eval('(' + msg + ')');
        			    }
        			});
        			var name;
        			if(data[i].user_type == "saler")
        				name = userInfo.s_name;
        			else if(data[i].user_type == "user")
        				name = userInfo.u_name;
        			else if(data[i].user_type == "admin")
        				name = userInfo.ad_name;

        			//获取 - collect
        			var totalCollect;
        			$.ajax({
        				async: false,
        			    type: "POST",
        			    cache:false, 
        			    url: "/admin/totalCollect",
        			    timeout: 3000,
        			    data:JSON.stringify({"f_ID":data[i].f_ID}),
        			    contentType: "application/json;utf-8",
        			    success: function(msg) {
        			    	totalCollect = msg;
        			    }
        			});
        			
        			var one = '<tr><td name="id" hidden="hidden">'+ data[i].f_ID +'</td>' +
        				'<td>' + (new Date(data[i].f_date.time)).format("yyyy-MM-dd hh:mm:ss") + '</td>';
        			if (data[i].isSticky) {
        				one += '<td><a href="#" name="forumTitle">[置顶]'+ data[i].f_title.substring(0,20) + '</a></td>';
        			} else{
        				one += '<td><a href="#" name="forumTitle">'+ data[i].f_title + '</a></td>';
        			}
        			
        			one += '<td>' + name + '</td><td>' + totalCollect + '/' +data[i].f_view + '</td></tr>';
        			forum += one;
        		} 
        		forum += '</tbody>';
        		timelineHTML.html(forum);
	        },error:function(e){ 
		    	toastr.error("请求失败");
		    }
		});
	}
	
	getForumList();
	if(current_page==1){
		$("#pre").addClass("disabled");
		$("#pre>a").attr('disabled',true);
	}
	else{
		$("#pre").removeClass("disabled");
		$("#pre>a").attr('disabled',false);
	}
	
	if(current_page==total_page){
		$("#next").addClass("disabled");
		$("#next>a").attr('disabled',true);
	}
	else{
		$("#next").removeClass("disabled");
		$("#next>a").attr('disabled',false);
	}
	
	$(document).on('click',".pagination>li",function(e){ 
		//console.log("id:"+$(this).attr("id"));
		if($(this).attr("id")=="pre"&&current_page!=1){
			$("#page_"+current_page).removeClass("active");
			current_page--;
			$("#page_"+current_page).addClass("active");
			//console.log('a');
		}else if($(this).attr("id")=="next"&&current_page!=total_page){
			$("#page_"+current_page).removeClass("active");
			current_page++;
			$("#page_"+current_page).addClass("active");
			//console.log('b');
		}else if($(this).attr("id")!="pre"&&$(this).attr("id")!="next"){
			$("#page_"+current_page).removeClass("active");
			$(this).addClass("active");
			current_page = $(this).text();
			//console.log('c');
		}
		
		getForumList();
		
		//console.log(currentPage);
		if(current_page==1){
			$("#pre").addClass("disabled");
		}
		else{
			$("#pre").removeClass("disabled");
		}
		
		if(current_page==total_page){
			$("#next").addClass("disabled");
		}
		else{
			$("#next").removeClass("disabled");
		}
	});
	
	$(document).on('click',"a[name='forumTitle']",function(e){
		var f_ID = $(this).parent().parent().find('td:first').text();
		$.ajax({
			async: false,
		    type: "GET",
		    cache:false, 
		    url: "/admin/setF_ID",
		    timeout: 3000,
		    data:{"f_ID":f_ID},
		    contentType: "application/json;utf-8",
		    success: function(msg) {
		    	console.log(f_ID);
		    	window.location="posts";
		    }
		});
	});
	
	
	$(document).on('click',".dropdown-menu>li",function(e){ 
		var txt = $(this).text()+'<span class="caret"></span>';
		var chooseSort = $(this).parent().parent().find(".dropdown-toggle");
		chooseSort.html(txt);
		if($(this).text()=="时间倒序")
			sort = "date";
		else if($(this).text()=="热度排序")
			sort = "hot";
		getForumList();
	});
	
})