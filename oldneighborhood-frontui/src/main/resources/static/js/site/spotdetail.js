$().ready(function() {
	var siteInfo = null;
	var siteHTML = "";
	$.ajax({
        url: "/admin/getSiteDetail",
        type: 'post',
        contentType:'application/json',
        dataType:"json",
		  timeout:5000,
        success: function (data) {
        	siteInfo = data;
        	
        	console.log(siteInfo);
        	siteHTML += '<div class="col-md-6"><div class="small-box bg-black">';
        	if (siteInfo.site_image=="") {
        		siteHTML += '<div><img style="width:100%;height:75%;" src="/admin/default.png"></div></div>'
        	}else{
        		siteHTML += '<div><img style="width:100%;height:75%;" src="' + siteInfo.site_image + '"></div></div>'
        	}
        	
        	siteHTML += '<div style="font-size:15px;">' +
        		'<h3>' + siteInfo.site_name + '</h3>' +
        		'<i class="fa fa-map-marker"></i> 地址：' + siteInfo.site_address + '<br/>' +
        		'<input hidden="hidden" value="' + siteInfo.site_ID + '"/>' +
        		'<i class="fa fa-cny"></i> 票价：' + siteInfo.site_ticket + '<br/>' +
        		'<i class="fa fa-clock-o"></i> 开放时间：' + siteInfo.site_time + '<br/>'+
        		'<i class="fa fa-phone"></i> 电话：' + siteInfo.site_tele + '<br/>'+
//        		'<i class="fa fa-envelope-o"></i> 邮箱：' + siteInfo.site_email + '<br/>'+
//        		'<i class="fa fa-tv"></i> 网站：' + siteInfo.site_web + '<br/><hr/>'+
        		'<hr/><div>' + siteInfo.site_intro + '</div></div>';
        	siteHTML += '<button id="delete" type="button" class="btn btn-danger pull-left"> 删除景点</button>' +
        		'<button type="button" class="btn btn-primary pull-left"> 编辑景点</button>'+
        		'<button type="button" class="btn btn-primary pull-left"> 编辑介绍</button>';
        	$("#siteinfo").html(siteHTML);
        	
        },error:function() {
      	  toastr.error("调用失败");
        }
	});
	
	$(document).on('click',"#delete",function(e){
		$.ajax({
	        url: "/admin/deletesite",
	        type: 'post',
	        contentType:'application/json',
	        dataType:"json",
			  timeout:5000,
	        success: function (data) {
	        	toastr.info("删除成功！");
	        	window.location = "/admin/spot";
	        },error: function(e){
	        	console.log("delete fail");
	        }
		});
	});
	
	
});