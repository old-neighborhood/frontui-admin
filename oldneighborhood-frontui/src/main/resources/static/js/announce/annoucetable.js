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
//	$('#annoucetable').DataTable();
	$.ajax({
		//
        url: "/admin/getAnnouncementList",
        type: 'post',
        contentType:'application/json',
        dataType:"json",
		timeout:5000,
        success: function (data) {
//        	console.log(data);
        	var announceHTML = $("#annoucetable");
        	var announce = '<thead><tr>'+
        		'<th hidden="hidden" id="annoucement_id"></th>'+
        		'<th style="width:35%">标题</th>'+
        		//'<th style="width:35%">内容</th>'+
                '<th style="width:15%">作者</th>'+
                '<th style="width:15%">日期</th></tr></thead>';
        	if (data!=null) {
        		announce += '<tbody>'
        		for (var i = 0; i < data.length; i++) {
//        			console.log(data[i]);
        			console.log(data[i].a_date.time);
        			var date = (new Date(data[i].a_date.time)).Format("yyyy-MM-dd hh:mm:ss");
        			var one = '<tr><td name="id" hidden="hidden">' + data[i].a_ID +'</td>';
        			if (data[i].isSticky==true){
        				one += '<td><a href="#" name="title">[置顶]'+ data[i].a_title + '</a></td>';
        			}else{
        				one += '<td><a href="#" name="title">'+ data[i].a_title + '</a></td>';
        			}
    				one += 
    				//'<td>' + data[i].a_content.substring(0,30) + '</td>' + 
    				'<td>' + data[i].a_author + '</td>'+
    				'<td>' + date + '</td></tr>';
        			announce += one;
        		}
        		announce += '</tbody>';
        	}else {
        		announce += '<tfoot><tr><td colspan="5" style="font-size:10px"> 暂无公告信息 </td></tr></thead><tfoot>';
        	}
        	announceHTML.html(announce);
        	$('#annoucetable').DataTable({
        		"order": [[ 3, "desc" ]]
        	});
        },error:function(e){ 
	    	toastr.error("请求失败");
	    }
	});
	
	$.ajax({
		//
        url: "/admin/getStickyList",
        type: 'post',
        contentType:'application/json',
        dataType:"json",
		timeout:5000,
        success: function (data) {
//        	console.log(data);
        	var announceHTML = $("#annoucetable_mark")
        	var announce = '<thead><tr>'+
        		'<th hidden="hidden" id="annoucement_id"></th>'+
        		'<th style="width:35%">标题</th>'+
        		//'<th style="width:35%">内容</th>'+
                '<th style="width:15%">作者</th>'+
                '<th style="width:15%">日期</th></tr></thead>';
        	if (data!=null) {
        		announce += '<tbody>'
        		for (var i = 0; i < data.length; i++) {
//        			console.log(data[i]);
        			console.log(data[i].a_date.time);
        			var date = (new Date(data[i].a_date.time)).Format("yyyy-MM-dd hh:mm:ss");
        			var one = '<tr><td name="id" hidden="hidden">' + data[i].a_ID +'</td>';
        			if (data[i].isSticky==true){
        				one += '<td><a href="#" name="title">[置顶]'+ data[i].a_title + '</a></td>';
        			}else{
        				one += '<td><a href="#" name="title">'+ data[i].a_title + '</a></td>';
        			}
    				one += 
    				//'<td>' + data[i].a_content.substring(0,30) + '</td>' + 
    				'<td>' + data[i].a_author + '</td>'+
    				'<td>' + date + '</td></tr>';
        			announce += one;
        		}
        		announce += '</tbody>';
        	}else {
        		announce += '<tfoot><tr><td colspan="5" style="font-size:10px"> 暂无公告信息 </td></tr></thead><tfoot>';
        	}
        	announceHTML.html(announce);
//        	$('#annoucetable_mark').DataTable({
//        		"order": [[ 3, "desc" ]]
//        	});
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
		    url: "/admin/setAnnouncementID",
		    data:JSON.stringify({
		    	"a_ID":id,
		    	"prev_ID":prev_id,
	        	"next_ID":next_id
	            }), 
		    timeout: 5000,
		    success:function(data){
		    	console.log(data);
//		    	var result = data.result;
		    	window.location="announcedetail";
		    },error:function(e){
		    	toastr.error("请求失败！");
		    }
		});
	});
	
})