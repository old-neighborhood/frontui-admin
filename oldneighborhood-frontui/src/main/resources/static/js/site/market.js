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
		    	console.log("setID");
		    	window.location = "/admin/marketone";
		    },error:function(e){
		    	console.log("setfail");
		    }
		});
	 });
	 
	
});