$().ready(function() {
	var spotsHTML = $("#spots");
	$.ajax({
		//
        url: "/admin/getSiteList",
        type: 'post',
        contentType:'application/json',
        dataType:"json",
		timeout:5000,
        success: function (data) {
        	console.log(data);
        	if (data!=null) {
        		var spots = "";
        		for (var i = 0; i < data.length; i++) {
        			var one = '<div class="col-md-3">'+
        				'<div class="small-box bg-black">';
        			if (data[i].site_image=="") {
						one += '<div><img style="width:100%;height:75%;" src="/admin/default.png"/></div></div>';
					}else{
						one += '<div><img style="width:100%;height:75%;" src="' + data[i].site_image + '"/></div></div>';
					}
        			one += '<div><strong>' + data[i].site_name + '</strong>' +
        				'<p>' + data[i].site_address + '</p></div>'+
        				'<input hidden="hidden" value="' + data[i].site_ID + '"/>' +
        				'<a name="detail" class="small-box-footer">查看更多 <i class="fa fa-arrow-right"></i></a><hr/></div>';
        			spots += one;
        		}
        		spotsHTML.html(spots);
        		
        	}
        },error:function(e){ //请求失败时被调用的函数。3个参数：XMLHttpRequest对象、错误信息、捕获的错误对象
	    	console.log(e);
	    	toastr.error("请求失败");
	    }
	});
	
	$(document).on('click',"[name='detail']",function(e){ 
		var spotid = $(this).prev().val();
		$.ajax({
			async: false,
		    type: "GET",
		    cache:false, 
		    dataType: 'json',
		    url: "/admin/setSiteID",
		    data: {"site_ID":spotid},
		    timeout: 3000,
		    contentType: "application/json;utf-8",
		    success:function(data){
		    	console.log("setID");
		    	window.location = "/admin/spotdetail";
		    },error:function(e){
		    	console.log("setfail");
		    }
		});
	 });
	
	
})