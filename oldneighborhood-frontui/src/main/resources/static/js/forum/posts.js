$().ready(function() {
	
	var timelineHTML = $("#tab_1");
	var reverseHTML = $("#tab_2");
	
	$.ajax({
		//回帖请求-正序
        url: "",
        type: 'post',
        contentType:'application/json',
        dataType:"json",
		timeout:5000,
        success: function (data) {
        	console.log(data);
        	var forum = '<thead><tr>'+
        		'<th hidden="hidden" id="forum_id"></th>'+
        		'<th style="width:10%">日期</th>'+
        		'<th style="width:25%">主题帖</th>'+
                '<th style="width:45%">内容</th>'+
                '<th style="width:10%">作者</th>'+
                '<th style="width:10%">浏览量</th></tr></thead>';
        	if (data!=null) {
        		forum += '<tbody>'
        		for (var i = 0; i < data.length; i++) {
        			
        			var one = '<tr><td name="id" hidden="hidden">'+ data[i].f_ID +'</td>' +
        				'<td>' + data[i].f_date + '</td>'+
        				'<td><a href="#" name="title">'+ data[i].f_title + '</a></td>' +
        				'<td>' + data[i].f_content.sbustr(0,30) + '......</td>' + 
        				'<td>' + data[i].user_ID + '</td>' +
        				'<td>' + data[i].f_view + '</td></tr>';
        			forum += one;
        		}
        		forum += '</tbody>';
        	}else {
        		forum += '<tfoot><tr><td colspan="6" style="font-size:10px"> 暂无论坛信息 </td></tr></thead><tfoot>';
        	}
        	timelineHTML.html(forum);
        },error:function(e){ 
	    	toastr.error("请求失败");
	    }
	});
	
})