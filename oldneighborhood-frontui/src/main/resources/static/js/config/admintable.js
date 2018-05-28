/**
 *
 */

$().ready(function() {
	
	var data = null;
	$.ajax({
		//
        url: "/admin/admin/all",
        type: 'post',
        contentType:'application/json',
        dataType:"json",
		timeout:5000,
        success: function (msg) {
        	data = msg;
//        	console.log(data);
        	if (data!=null) {
        		var admins = $("#admintable");
//        		console.log(admins);
        		var admin = "";
        		
        		for (var i = 0; i < data.length; i++) {
        			var one = '<tr><td hidden="hidden">' + data[i].ad_ID + '</td>' +
        			'<td>' + data[i].ad_name + '</td>' +
//        			'<td>' + data[i].ad_password + '</td>';
        			'<td>******</td>';
        			var permission = data[i].ad_permission;
        			for (var j = 0; j < permission.length; j++) {
        				var each = permission.charAt(j);
        				if(each=="W") {
        					one += '<td>读/写</td>';
        				} else {
        					one += '<td>读</td>';
        				}
        			}
        			one += '<td><a name="edit" href="#">修改</a><span> | </span><a name="delete" href="#">删除</a></td></tr>';
        			admin += one;
        		}
        		
        		admins.html(admin);
        	}
        },error:function(e){ //请求失败时被调用的函数。3个参数：XMLHttpRequest对象、错误信息、捕获的错误对象
//	    	console.log(e);
	    	toastr.error("请求失败");
	    }
	});
	
	
	
	$(document).on('click','[name="delete"]',function(e){
//		console.log($(this));
		var id = $(this).parent().parent().find('td:first').text();
		console.log(id);
		$.ajax({
			async: false,
		    type: "POST",
		    contentType:'application/json',
		    dataType: 'json',
		    url: "/admin/admin/delete",
		    data:JSON.stringify({
            	"ad_ID":id
            }), 
		    timeout: 3000,
		    success:function(data){
		    	var result = data.result;
		    	if (result == "success") {
					toastr.success("删除成功!");
					setTimeout(function(){
						window.location = "admin";
					},1000);
				}else {
					toastr.error("删除失败！");
				}
		    },error:function(e){
		    	toastr.error("请求失败！");
		    }
		})
	})
	
	
	$(document).on('click','[name="edit"]',function(e){
//		var id = $(this).parent().parent().find('td:first').text();
		var thisHTML = $(this).parent().parent().children();//td
		console.log(thisHTML);
		var id = thisHTML[0].innerText;
//		thisHTML[0].innerHTML='<tr><td hidden="hidden">' + thisHTML[0].innerText + '</td>'';
		thisHTML[1].innerHTML="<input type='text' class='form-control' value='" + thisHTML[1].innerText + "'/>";
		thisHTML[2].innerHTML="<input type='text' class='form-control' value='" + thisHTML[2].innerText + "'/>";
		thisHTML[3].innerHTML='<select id="config-permission" class="form-control"><option value="R" selected="selected">读</option><option value="W">读/写</option></select>';
		thisHTML[4].innerHTML='<select id="site-permission" class="form-control"><option value="R" selected="selected">读</option><option value="W">读/写</option></select>';
		thisHTML[5].innerHTML='<select id="announce-permission" class="form-control"><option value="R" selected="selected">读</option><option value="W">读/写</option></select>';
		thisHTML[6].innerHTML='<select id="forum-permission" class="form-control"><option value="R" selected="selected">读</option><option value="W">读/写</option></select>';
		thisHTML[7].innerHTML='<select id="data-permission" class="form-control"><option value="R" selected="selected">读</option><option value="W">读/写</option></select>';
		thisHTML[8].innerHTML='<a name="confirm" href="#">确认</a><span> | </span><a name="cancel" href="#">取消</a>';
	})
	//确认修改
	$(document).on('click','[name="confirm"]',function(e){
		var thisvalue = $(this).parent().siblings();
		var ad_ID = thisvalue[0].innerText;
		var ad_name = thisvalue[1].children[0].value;
		var ad_password = thisvalue[2].children[0].value;
		var ad_permission = thisvalue[3].children[0].value + thisvalue[4].children[0].value + thisvalue[5].children[0].value + thisvalue[6].children[0].value + thisvalue[7].children[0].value;
		console.log(ad_permission);
		
		$.ajax({
		      url:"/admin/admin/modify",
		      type:"POST",
		      contentType:'application/json',
		      data:JSON.stringify({
		    	  "ad_ID":ad_ID,
			      "ad_name":ad_name,
			      "ad_password":ad_password,
			      "ad_permission":ad_permission,
			      "ad_image":"http://111.231.107.63:8085/common/554c8d43389748f4a73bae0cad5cb4d7.png"
	            }), 
		      dataType:"json",
		      success:function (data) {
//		    	  console.log(data.result);
//		    	  var data = JSON.parse(msg);
		    	  if (data.result=="success") {
		    		  window.location="admin";
		    	  }else {
		    		  toastr.error("失败请重试");
		    	  }
		      },error:function (){
		    	  toastr.error("调用失败");
		      }
		 });
		
	})
	//取消修改
	$(document).on('click','[name="cancel"]',function(e){
		window.location="admin";
	})
	
})