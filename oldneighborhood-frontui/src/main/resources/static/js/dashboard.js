/**
 * 
 * @returns
 */

//公告列表(页面)	论坛消息		店铺审核(页面)		数据视图		地图		日历
var annouce-table = $("#announce-table");
var announceHTML = '<ul class="todo-list">'; //</ul>
var announce-page = $("#annouce-page");
var forum-message = $("#chat-box");
var market-check = $("#market-check");
var market-page = $("#market-page");
var chart-flow = $("#revenue-chart");
var chart-ticket = $("#sales-chart");

var map = $("#world-map");


$().ready(function() {
	var current_page = "";
	var page_size = "";
	var desc_sort = "";
	
	$.ajax({
    	type:"POST",
    	contentType:'application/json',
    	//获取公告列表的list
    	url:"/oldneighborhood/announcement/list",
    	data:JSON.stringify({
    		"current_page":current_page,
    		"page_size":page_size,
    		"desc_sort":desc_sort
    	}),
    	dataType:"json",
    	success:function(data){
    		console.log(data);
    		for (var i in data) {
				var anounce_id = data[i].
			}
    		
    		toastr.info("获取公告成功");
    	},error:function(){
    		console.log("调用失败！");
    	}
    })
	
})