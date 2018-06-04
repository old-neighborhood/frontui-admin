/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/

$(function () {

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
		mapStyle : 'amap://styles/7f7ee6ce65f4469462d2b870daf581b2',//样式URL
		resizeEnable : true,
		zoom : 100,
		center : [ 118.787681,32.011576 ],
  });
  AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'], function(){
		map.addControl(new AMap.ToolBar());
		map.addControl(new AMap.Scale());
		map.addControl(new AMap.OverView({isOpen:true}));
  });
  

});
