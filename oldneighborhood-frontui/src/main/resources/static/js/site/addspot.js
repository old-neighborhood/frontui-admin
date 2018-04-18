/**
 *
 */

$().ready(function() {
      $("#add").click(function(){
  		var site_name = $("#site_name").val();
  		var site_type = $("#site_type").val();
  		
  		var site_address = $("#site_address").val();
  		var spot_ticket = $("#spot_ticket").val();
  		var spot_image = $("#spot_image").val();
  		
  		$.ajax({
              url: "http://localhost:8087/oldneighborhood/admin/new",
              type: 'post',
              contentType:'application/json',
              data:JSON.stringify({
              	"site_name":site_name,
      			"site_type":site_type,
      			"site_address":site_address,
      			"site_ticket":spot_ticket,
      			"site_image":spot_image
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
  					setTimeout(function(){
  						window.location = "spot";
  					},1000);
  				}
              },error:function() {
            	  toastr.error("调用失败");
              }
  		});
  	});
      
      
});