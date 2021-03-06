/**
 *
 */

$().ready(function() {
	var imageurl = "";
	var site_name = "";
	var site_address = "";
	var site_ticket  = "";
	var site_time = "";
	var site_ID = null;
	
	var E = window.wangEditor
    var editor = new E('#editor')
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
//    editor.customConfig.uploadImgServer = 'http://111.231.107.63:8085/common/file/fileupload'
    editor.create()
	
	//Timepicker
//    $('#endtime').timepicker({
//      showInputs: false
//    })
//    
//    $('#starttime').timepicker({
//      showInputs: true
//    })
//    
    
    
//    var map = new AMap.Map("container", {
//		mapStyle : 'amap://styles/b7df64526165ef157ce1d22816e373c1',//样式URL
//		resizeEnable : true,
//		zoom : 11,
//		center : [ 116.397428, 39.90923 ],
//	});
     /* AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
    		    function(){
    		        map.addControl(new AMap.ToolBar());

    		        map.addControl(new AMap.Scale());

    		        map.addControl(new AMap.OverView({isOpen:true}));
      });*/
    
    
	console.log("ready");
	$("#upload").click(function(){
		var form = $("#upload_image");
		var formdata = new FormData(form[0]);
		var btn = $("#upload");
		$.ajax({
            url: 'http://111.231.107.63:8085/common/file/fileupload',
            type: 'POST',
            data: formdata,                    // 上传formdata封装的数据
            dataType: 'JSON',
            cache: false,                      // 不缓存
            processData: false,                // 告诉jQuery不要去处理发送的数据
            contentType: false,                // 告诉jQuery不要去设置Content-Type请求头
            success:function (msg) {           //成功回调
                console.log(msg);
            	var flag = msg.result;
            	if(flag=="success"){
//            		btn.attr("disabled","disabled");
            		btn.html("重新上传");
            		imageurl = msg.filename;
            		var imgHTML = '<br><img alt="题图" src="' + imageurl + '" width="200px">';
            		console.log("上传成功！");
            		$("#uploadedimage").html(imgHTML);
            	}else if(flag=="error"){
            		toastr.error("上传失败！");
            		btn.html("重试");
            		console.log("上传失败！");
            	}
            },error:function (err){
            	console.log("上传调用错误");
            }
        });
	});
	
	
      $("#add").click(function(){
//    	  $("#simple").hide();
//    	  $("#detail").show();
    	  
  		site_name = $("#site_name").val();
//  		var site_type = $("#site_type").val();
  		site_address = $("#site_address").val();
  		site_ticket = $("#spot_ticket").val();
  		site_time = $("#site_time").val();
  		if (site_time=="") {
			site_time="8:00am~17:00pm";
		}
  		if (site_ticket=="") {
			site_ticket = "0";
		}
  		console.log(site_name + site_time + site_address + site_ticket);
  		$.ajax({
              url: "/admin/addSimpleSite",
              type: 'post',
              contentType:'application/json',
              data:JSON.stringify({
              	"site_name":site_name,
              	"site_address":site_address,
              	"site_ticket":site_ticket,
              	"site_time":site_time,
      			//"site_image":spot_image,
      			"ad_ID":"80d09f45cdd24b55926ba52b77204b05",
      			"site_type":"spot",
              }), 
              dataType:"json",
  			  timeout:5000,
              success: function (data) {
              	console.log(data);
              	var status = data.result;
              	if (status == "error") {
              		toastr.warning("新建失败！");
  				}else if(status == "success") {
  					toastr.success("新建成功！");
  					site_ID = data.site_ID;
  					 $("#simple").hide();
  					$("#detail").show();
  					$("#spotinfo").html(site_name);
//  					setTimeout(function(){
//  						window.location = "spotdetail";
//  					},1000);
  				}
              },error:function() {
            	  toastr.error("调用失败");
              }
  		});
  	});
      
      $("#intro").click(function(){
  		if (imageurl=="") {
  			imageurl = "/admin/default.png";
		}
  		var site_intro = editor.txt.html();
  		$.ajax({
              url: "/admin/updatepart",
              type: 'post',
              contentType:'application/json',
              data:JSON.stringify({
              	"site_ID":site_ID,
              	"site_image":imageurl,
              	"site_intro":site_intro,
              }), 
              dataType:"json",
  			  timeout:5000,
              success: function (data) {
              	console.log(data);
              	var status = data.result;
              	if (status == "error") {
              		toastr.warning("新建失败！");
  				}else if(status == "success") {
  					toastr.success("新建成功！");
  					var spotid = site_ID;
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
  				}
              },error:function() {
            	  toastr.error("调用失败");
              }
  		});
  	});  
      
      
});