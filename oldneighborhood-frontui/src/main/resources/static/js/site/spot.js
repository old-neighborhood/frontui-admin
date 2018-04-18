$().ready(function() {
	
	$.ajax({
		//
        url: "http://localhost:8087/oldneighborhood/site/list",
        type: 'post',
        contentType:'application/json',
        dataType:"json",
		timeout:5000,
        success: function (data) {
        	console.log(data);
        	if (data!=null) {
        		var spotsHTML = $("#spots");
        		console.log(spotsHTML);
        		var spots = "";
        		
        		for (var i = 0; i < data.length; i++) {
        			var one = '<div class="col-lg-2 col-xs-6"><div class="small-box bg-green">' +
        				'<div class="inner"><h3>' + data[i].site_name + 
        				'</h3><p>' + data[i].site_address +
        				'</p></div><div class="icon"><i class="fa fa-camera-retro"></i></div>' +
        				'<a name="detail" href="#" class="small-box-footer">查看详细信息 <i class="fa fa-arrow-right"></i></a></div></div>';
        			spots += one;
        		}
        		
        		spotsHTML.html(spots);
        	}
        },error:function(e){ //请求失败时被调用的函数。3个参数：XMLHttpRequest对象、错误信息、捕获的错误对象
	    	console.log(e);
	    	toastr.error("请求失败");
	    }
	});
	
	
	
	
	
	
	
	
	
})