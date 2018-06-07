$().ready(function() {
	var editor;
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
        	
        	siteHTML += '<div id="normalHTML" style="font-size:15px;">' +
        		'<h3>' + siteInfo.site_name + '</h3>' +
        		'<i class="fa fa-map-marker"></i> 地址：' + siteInfo.site_address + '<br/>' +
        		'<input hidden="hidden" value="' + siteInfo.site_ID + '"/>' +
        		'<i class="fa fa-cny"></i> 票价：' + siteInfo.site_ticket + '<br/>' +
        		'<i class="fa fa-clock-o"></i> 开放时间：' + siteInfo.site_time + '<br/>'+
        		'<i class="fa fa-phone"></i> 电话：' + siteInfo.site_tele + '<br/>'+
//        		'<i class="fa fa-envelope-o"></i> 邮箱：' + siteInfo.site_email + '<br/>'+
//        		'<i class="fa fa-tv"></i> 网站：' + siteInfo.site_web + '<br/><hr/>'+
        		'<br/><div><button id="normal" type="button" class="btn btn-sm btn-primary"> 修改信息</button> ' +
        		' <button id="delete" type="button" class="btn btn-sm btn-danger"> 删除景点</button><hr/></div></div></div>';
        	
        	siteHTML += '<div class="col-md-12"><div id="introHTML">' + siteInfo.site_intro + '</div><br>' +
        		'<div id="buttonpart"><button id="editintro" type="button" class="btn btn-sm btn-primary"> 编辑介绍</button></div></div>';
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
	
	$(document).on('click',"#normal",function(e){
		var edit = '<div id="normalHTML" style="font-size:15px;">' +
			'名称：<input id="site_name" value="'+ siteInfo.site_name +'"/><br><br>' +
			'地址：<input id="site_address" value="' + siteInfo.site_address + '"/><br><br>' +
			'<input id="site_ID" hidden="hidden" value="' + siteInfo.site_ID +'"/>' +
			'票价：<input id="site_ticket" value="' + siteInfo.site_ticket + '"/><br><br>' +
			'时间：<input id="site_time" value="' + siteInfo.site_time + '"/><br><br>' +
			'电话：<input id="site_tele" value="' + siteInfo.site_tele + '"/><br>' + 
			'<br/><div><button id="confirm" type="button" class="btn btn-sm btn-primary"> 确认</button>' +
			' <button id="cancel" type="button" class="btn btn-sm btn-default"> 取消</button></div></div>';
		$("#normalHTML").html(edit);
	});
	
	$(document).on('click',"#cancel",function(e){
		window.location="/admin/spotdetail";
	});
	
	$(document).on('click',"#confirm",function(e){
		var id = siteInfo.site_ID;
		var name = $("#site_name").val();
		var address = $("#site_address").val();
		var ticket = $("#site_ticket").val();
		var time = $("#site_time").val();
		var tele = $("#site_tele").val();
		console.log(id + name);
		$.ajax({
	        url: "/admin/updateup",
	        type: 'post',
	        contentType:'application/json',
	        dataType:"json",
	        data:JSON.stringify({
	        	"site_ID":id,
            	"site_name":name,
    			"site_address":address,
    			"site_ticket":ticket,
    			"site_time":time,
    			"site_tele":tele
            }), 
			timeout:5000,
	        success: function (data) {
	        	console.log("更新成功！");
	        	window.location = "/admin/spotdetail";
	        },error: function(e){
	        	console.log("update fail");
	        }
		});
	});
	
	$(document).on('click',"#editintro",function(e){
		var E = window.wangEditor
	    editor = new E('#introHTML')
	    editor.customConfig.menus = [
	    	'head',  // 标题
	        'bold',  // 粗体
	        'fontSize',  // 字号
	        'fontName',  // 字体
	        'italic',  // 斜体
	        'underline',  // 下划线
	        'strikeThrough',  // 删除线
	        'foreColor',  // 文字颜色
	        'backColor',  // 背景颜色
	        'link',  // 插入链接
	        'list',  // 列表
	        'justify',  // 对齐方式
	        'quote',  // 引用
	        'image',  // 插入图片
	        'video',  // 插入视频
	        'undo',  // 撤销
	        'redo'  // 重复
	    ]
	    editor.customConfig.uploadImgShowBase64 = true
	    editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024
//	    editor.customConfig.uploadImgServer = 'http://111.231.107.63:8085/common/file/fileupload'
	    editor.create()
	    
	    var buttonchange = '<button id="confirmintro" type="button" class="btn btn-sm btn-primary"> 确认</button>' +
			' <button id="cancelintro" type="button" class="btn btn-sm btn-default"> 取消</button>';
	    $("#buttonpart").html(buttonchange);
		
	});
	
	$(document).on('click',"#cancelintro",function(e){
		window.location="/admin/spotdetail";
	});
	
	$(document).on('click',"#confirmintro",function(e){
		var site_intro = editor.txt.html();
		var id = siteInfo.site_ID;
		var image = siteInfo.site_image;
		console.log(site_intro);
		$.ajax({
	        url: "/admin/updatepart",
	        type: 'post',
	        contentType:'application/json',
	        dataType:"json",
	        data:JSON.stringify({
              	"site_ID":id,
              	"site_image":image,
              	"site_intro":site_intro,
              }),
			timeout:5000,
	        success: function (data) {
	        	console.log("更新成功！");
	        	window.location = "/admin/spotdetail";
	        },error: function(e){
	        	console.log("update fail");
	        }
		});
	});
	
	
});