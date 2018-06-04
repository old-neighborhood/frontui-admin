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
var data = null;
var id;
	 $.ajax({
		    async: false,
		    type: "GET",
		    cache:true, 
		    dataType: 'json',
		    url: "/admin/getAllMarkets",
		    timeout: 5000,
		    contentType: "application/json",
		    success: function(msg) {
//		    	console.log(msg);
		    	data=msg;	
		    },
		    error:function(XMLHttpRequest, textStatus, errorThrown){ //请求失败时被调用的函数。3个参数：XMLHttpRequest对象、错误信息、捕获的错误对象
		    	console.log(textStatus+":"+errorThrown);
		    	toastr.error("请求未成功");
		    }
		  });
	 
	 if(data!=null){
		 var tab1 = $("#tab_1");
		 var tab2 = $("#tab_2");
		 var tab3 = $("#tab_3");
		 var tab4 = $("#tab_4");
		 var content1='<div class="row">';
		 var content2='<div class="row">';
		 var content3='<div class="row">';
		 var content4='<div class="row">';
		 for(var i=0;i<data.length;i++){
			 var date = (new Date(parseFloat(data[i].m_date))).format("yyyy-MM-dd hh:mm:ss");
			 var content='<div class="col-md-3"><div class="box box-default"><div class="box-header" style="padding:0;cursor: pointer;">'+
			 '<img name="showMarket" title="'+data[i].m_name+'" src="/admin'+data[i].m_image+'" width=100% height=200 alt="Generic placeholder image"/></div>';
			 content+='<div class="box-body"><input type="hidden" value="'+data[i].m_ID+'"/>'+
			 '<strong><a name="showMarket" title="'+data[i].m_name+'" style="margin-top:0px;cursor: pointer;"><p style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">'+data[i].m_name+'</p></a></strong>';
			 if(data[i].m_state=="zhuxiao"){
				 content1+=content+'<div class="row"><div class="pull-left" style="margin-left:10px;"><i class="fa fa-circle text-danger"></i> 正在注销</div><div class="pull-right" style="margin-right:10px;">';
				 content4+=content+'<div class="row"><div class="pull-left" style="margin-left:10px;"><i class="fa fa-circle text-danger"></i> 正在注销</div><div class="pull-right" style="margin-right:10px;">';
			 }else if(data[i].m_state=="shenqing"){
				 content1+=content+'<div class="row"><div class="pull-left" style="margin-left:10px;"><i class="fa fa-circle text-primary"></i> 正在申请</div><div class="pull-right" style="margin-right:10px;">';
				 content3+=content+'<div class="row"><div class="pull-left" style="margin-left:10px;"><i class="fa fa-circle text-primary"></i> 正在申请</div><div class="pull-right" style="margin-right:10px;">';
			 }else{
				 content1+=content+'<div class="row"><div class="pull-left" style="margin-left:10px;"><i class="fa fa-circle text-success"></i> 正常运行</div><div class="pull-right" style="margin-right:10px;">';
				 content2+=content+'<div class="row"><div class="pull-left" style="margin-left:10px;"><i class="fa fa-circle text-success"></i> 正常运行</div><div class="pull-right" style="margin-right:10px;">';
			 }
			 content='';
			 var type;
			 if(data[i].m_type=="food")
				 type="美食";
			 else if(data[i].m_type=="hotel")
				 type="酒店";
			 else if(data[i].m_type=="shop")
				 type="商店";
			 content+='</div></div><div class="row" style="color:grey;"><div class="pull-left" style="margin-left:10px;">'+type+''
			 +'</div></div>'; 

			 if(data[i].m_state=="zhuxiao"){
				 content1+=content+'</div></div></div>';
				 content4+=content+'</div></div></div>';
			 }else if(data[i].m_state=="shenqing"){
				 content1+=content+'</div></div></div>';
				 content3+=content+'</div></div></div>';
			 }else{
				 content1+=content+'</div></div></div>';
				 content2+=content+'</div></div></div>';
			 }
		 }
		 tab1.html(content1+'</div>');
		 tab2.html(content2+'</div>');
		 tab3.html(content3+'</div>');
		 tab4.html(content4+'</div>');
	 }
	
	 var msg = null;
	 
	 $(document).on('click',"[name='showMarket']",function(e){ 
		id = $(this).parents(".box-default").find("input").val();
		$.ajax({
			async: false,
		    type: "GET",
		    cache:false, 
		    dataType: 'json',
		    url: "/admin/setM_ID",
		    data: {"m_ID":id},
		    timeout: 3000,
		    contentType: "application/json;utf-8",
		    success:function(data){
//			window.location.href = "/MarketInfo";
		    	console.log("setID");
		    	$.ajax({
		    		async: false,
		    		type: "GET",
		    		cache:false, 
		    		dataType: 'json',
		    		url: "/admin/getMarket",
		    		timeout: 3000,
		    		contentType: "application/json;utf-8",
		    		success: function(data) {
//		    			console.log(data);
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
		    					 			'<p id="m_date"><label>创建时间：</label>' + (new Date(msg.m_date)).format("yyyy-MM-dd hh:mm:ss") + '</p></div></div></div>' +
		    					 			'<div class="col-md-4 pull-right">' + 
		    					 			'</div>';
		    					 
		    					 
		    					 
		    					 /*<div class="col-md-3 pull-right" style="margin-right:20px;">
									<img id="head" name="image" data-toggle="modal" data-target="#myModal" class="img-responsive pull-right" style="height:150px;width:300px;margin-top:20px;" src="/market/de77175e8b8642549cc71e0e6dfbd3f8.jpg">
										<div id="container" style="margin-top: 200px; position: relative; background-color: rgb(229, 227, 223); overflow: hidden; transform: translateZ(0px);">
										<a class="search-plus" data-toggle="modal" data-target="#mapModal">
										<i class="icon fa fa-search-plus" style="font-size:18px;"></i></a>
								</div>*/
		    					 $('#marketdetail').html(detail);
		    					 //地图显示
		    					 
		    				}
		    		}});
		    },error:function(e){
		    	console.log("setfail");
		    }
		});
	 });
	 
	
});