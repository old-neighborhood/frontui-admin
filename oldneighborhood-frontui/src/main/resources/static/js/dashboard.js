//公告列表(页面)	论坛消息		店铺审核(页面)		数据视图		地图		日历


$().ready(function() {
	'use strict';

	  // Make the dashboard widgets sortable Using jquery UI
	  $('.connectedSortable').sortable({
	    placeholder         : 'sort-highlight',
	    connectWith         : '.connectedSortable',
	    handle              : '.box-header, .nav-tabs',
	    forcePlaceholderSize: true,
	    zIndex              : 999999
	  });
	  $('.connectedSortable .box-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move');


	  // jvectormap data
	  var map = new AMap.Map("world-map", {
//			mapStyle : 'amap://styles/7f7ee6ce65f4469462d2b870daf581b2',//样式URL
			resizeEnable : true,
			zoom : 100,
//			center : [119.050169,32.39401346],
			center : [ 118.787681,32.011576 ],
	  });
	  AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'], function(){
			map.addControl(new AMap.ToolBar());
			map.addControl(new AMap.Scale());
			map.addControl(new AMap.OverView({isOpen:true}));
	  });
	
	
	//获取公告列表
	$.ajax({
    	type:"POST",
    	contentType:'application/json',
    	//获取公告列表的list
    	url:"/admin/getAnnouncementPage",
    	data:JSON.stringify({
    		"current_page":1,
    		"page_size":5,
    		"desc_sort":true
    	}),
    	dataType:"json",
    	timeout:5000,
    	success:function(data){
    		console.log("获取公告成功");
//    		console.log(data);
    		var announcements = '<ul class="todo-list">';
    		for (var i = 0; i < data.length; i++) {
    			//判断是否置顶
    			var one = '<li><span class="handle"><i class="fa fa-ellipsis-v"></i>' +
    					'<i class="fa fa-ellipsis-v"></i></span>' + 
    					'<span name="announcementid" hidden="hidden">' + data[i].a_ID + '</span>';
    			if (data[i].isSticky==true){
    				one += '<span class="text" name="title">[置顶]' + data[i].a_title + '</span></li>';
    			}else{
    				one += '<span class="text" name="title">' + data[i].a_title + '</span></li>';
    			}
    			announcements += one;
    		}
    		announcements += '</ul>';
    		$('#announcetable').html(announcements);
    	},error:function(){
    		console.log("获取失败！");
    	}
    });
	
	//设置当前公告ID
	$(document).on('click','[name="title"]',function(e){
		var id = $(this).prev().text();
		console.log(id);
		$.ajax({
			async: false,
		    type: "POST",
		    contentType:'application/json',
		    dataType: 'json',
		    //获取单个公告
		    url: "/admin/setAnnouncementID",
		    data:JSON.stringify({
		    	"a_ID":id,
	            }), 
		    timeout: 5000,
		    success:function(data){
		    	console.log(data);
		    	window.location="announcedetail";
		    },error:function(e){
		    	toastr.error("请求失败！");
		    }
		});
	});
	
	
	//获取店铺审核信息
	$.ajax({
    	type:"POST",
    	contentType:'application/json',
    	//http://118.126.64.169:8003/Saler/getAllMarkets
    	url:"/admin/getAllMarkets",
    	dataType:"json",
    	timeout:5000,
    	success:function(data){
    		console.log("获取成功");
//    		console.log(data);
    		var markets = '<ul class="todo-list">';
    		for (var i = 0; i < data.length; i++) {
    			if (data[i].m_state=="shenqing") {
    				var one = '<li><input type="checkbox" value="" />' + 
    				'<input hidden="hidden" value="' + data[i].m_ID + '"/>';
    				one += '<span class="text" name="markettitle">[申请]' + data[i].m_name + '</span></li>';
    				markets += one;
				}
    		}
    		markets += '</ul>';
    		$('#marketcheck').html(markets);
    	},error:function(){
    		console.log("获取失败！");
    	}
    });
	$(document).on('click','#chooseall',function(e){
		$("input[type='checkbox']").attr("checked","true");
	});
	$(document).on('click','#choosenone',function(e){
		$("input[type='checkbox']").removeAttr("checked");
	});
	$(document).on('click','#pass',function(e){
		$("#pass").attr("disabled",true);
		var marketobjs = $('#marketcheck').find(":checked").next();
		console.log(marketobjs);
		for (var i = 0; i < marketobjs.length; i++) {
			console.log(marketobjs[i]);
			//js对象与jQuery对象。。。
			var id = $(marketobjs[i]).val();
			console.log(id);
			$.ajax({
				async: false,
				type: "POST",
				cache:false, 
				data:JSON.stringify({
			    	"m_ID":id
		        }), 
				dataType: 'json',
				url: "/admin/recoverAllMarket",
				timeout: 3000,
				contentType: "application/json;utf-8",
				success: function(data) {
//					toastr.info();
					console.log(data);
				},error: function(e){
					console.log("pass fail");
				}
			});
			window.location="/admin/index";
		}
	});
	//某个店铺信息
	$(document).on('click','[name="markettitle"]',function(e){
		var id = $(this).prev().val();
		console.log(id);
		$.ajax({
			async: false,
		    type: "GET",
		    contentType:'application/json',
		    dataType: 'json',
		    //获取单个公告
		    url: "/admin/setM_ID",
		    data: {"m_ID":id},
		    timeout: 5000,
		    success:function(data){
		    	console.log(data);
		    	window.location="/admin/marketone";
		    },error:function(e){
		    	console.log("请求失败！");
		    }
		});
	});
	
});