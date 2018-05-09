$().ready(function() {
	
	$.ajax({
		//
        url: "http://localhost:808X/oldneighborhood/announcement/list",
        type: 'post',
        contentType:'application/json',
        dataType:"json",
		timeout:5000,
        success: function (data) {
        	console.log(data);
        	var announceHTML = $("#annoucetable")
        	var announce = '<thead><tr>'+
        		'<th hidden="hidden" id="annoucement_id"></th>'+
        		'<th style="width:30%">标题</th>'+
        		'<th style="width:50%">内容</th>'+
                '<th style="width:10%">作者</th>'+
                '<th style="width:10%">日期</th></tr></thead>';
        	if (data!=null) {
        		announce += '<tbody>'
        		for (var i = 0; i < data.length; i++) {
        			var one = '<tr><td name="id" hidden="hidden">'+ data[i].a_ID +'</td>' +
//        				'<td><a href="/announcedetail?announce_id="'+ data[i].a_ID +' name="title">'+ data[i].a_title + '</a></td>' +
        				'<td><a href="#" name="title">'+ data[i].a_title + '</a></td>' +
        				'<td>' + data[i].a_content.sbustr(0,30) + '......</td>' + 
        				'<td>' + data[i].a_author + '</td>'+
        				'<td>' + data[i].a_date + '</td></tr>';
        			announce += one;
        		}
        		announce += '</tbody>';
        	}else {
        		announce += '<tfoot><tr><td colspan="5" style="font-size:10px"> 暂无公告信息 </td></tr></thead><tfoot>';
        	}
        	announceHTML.html(announce);
        },error:function(e){ 
	    	toastr.error("请求失败");
	    }
	});
	
	
	$(document).on('click','[name="title"]',function(e){
		var id = $(this).parent().parent().find('td:first').text();
		var prev_id = $(this).parent().parent().prev().find('td:first').text();
		var next_id = $(this).parent().parent().next().find('td:first').text();
		console.log(id);
//		console.log("<"+prev_id+">");
//		console.log(">"+next_id+"<");
		//上下篇为空
		if (prev_id=="") {
			prev_id="-1";
		}
		if (next_id=="") {
			next_id="-1";
		}
		
		$.ajax({
			async: false,
		    type: "POST",
		    contentType:'application/json',
		    dataType: 'json',
		    //获取单个公告
		    url: "setAnnouncementID",
		    data:{
	        	"a_ID":id,
//	        	"prev_ID":prev_ID,
//	        	"next_ID":next_ID
	        }, 
		    timeout: 5000,
		    success:function(data){
		    	console.log(data);
//		    	var result = data.result;
		    	window.location="announce/detail";
		    },error:function(e){
		    	toastr.error("请求失败！");
		    }
		});
	});
	
})