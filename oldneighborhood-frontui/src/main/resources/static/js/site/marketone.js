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
	$.ajax({
		async: false,
		type: "GET",
		cache:false, 
		dataType: 'json',
		url: "/admin/getMarket",
		timeout: 3000,
		contentType: "application/json;utf-8",
		success: function(data) {
//			console.log(data);
			msg=data;
			if (msg!=null) {
					var type;
				    if(msg.m_type=="food"){
				    	type="美食";
				    }else if(msg.m_type=="hotel"){
				    	type="酒店";
				    }else if(msg.m_type=="shop"){
				    	type="商店";
				    }
				    
				    var state;
				    if (msg.m_state=="zhuxiao") {
						state = "正在注销";
					}else if(msg.m_state=="shenqing"){
						state = "正在申请";
					}else if(msg.m_state=="zhengchang"){
						state = "正常运行";
					}
					 var detail = '<div class="col-md-4"><div class="row">' +
					 			'<div class="pull-left" style="margin-left: 10px;">'+
					 			'<h3 id="m_name">' + msg.m_name + '</h3></div>' + 
					 			'<div class="pull-right" id="hasBtn"></div></div><input type="hidden" value="' + msg.m_ID + '">' +
					 			'<img id="head" alt="Market Img" name="image" class="img-responsive" style="height:100%;width:100%;margin-top:10px;" src="/admin'+ msg.m_image +'">' +
					 			'<div class="mx-1" style="color:#666;">' + 
					 			'<p id="m_address"><br><label>地址：</label>' + msg.m_address.split(",")[0] + '</p>' + 
					 			'<p id="m_tele"><label>电话：</label>' + msg.m_tele + '</p>'+
					 			'<p id="m_email"><label>邮箱：</label>' + msg.m_email + '</p>'+
					 			'<p id="m_type"><label>类型：</label>' + type + '</p>' +
					 			'<p id="m_intro"><label>介绍：</label>' + msg.m_intro + '</p>'+
					 			'<p id="m_state"><label>状态：</label>' + state + '</p>'+
					 			'<p id="m_date"><label>创建时间：</label>' + (new Date(msg.m_date)).format("yyyy-MM-dd hh:mm:ss") + '</p>';
					 if (msg.m_state=="shenqing") {
						 detail += '<button name="pass" class="btn btn-primary">审核通过</button>';
					 }
					 detail += '</div></div></div>';
					 $('#marketone').html(detail);
					 //地图显示
					 
				}
		}
	});
	
	
	$(document).on('click',"[name='pass']",function(e){ 
		console.log("pass");
		$.ajax({
			async: false,
			type: "GET",
			cache:false, 
//			data:JSON.stringify({
//		    	"a_ID":id,
//		    	"prev_ID":prev_id,
//	        	"next_ID":next_id
//	            }), 
			dataType: 'json',
			url: "/admin/recoverMarket",
			timeout: 3000,
			contentType: "application/json;utf-8",
			success: function(data) {
				window.location="/admin/marketone";
			},error: function(e){
				console.log("pass fail");
			}
		});
		
		//重置本页
//		window.location = "/admin/marketone";
	});
});