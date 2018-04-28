$().ready(function(){
	
	var myChart = echarts.init(document.getElementById('revenue-chart'));
	// 显示标题，图例和空的坐标轴
	myChart.setOption({
	    title: {
//	    	left: 'center',
	        text: '票务销量'
	    },
	    tooltip: {},
	    legend: {
	        data:['销量']
	    },
	    xAxis: {
	        data: []
	    },
	    yAxis: {},
	    series: [{
	        name: '销量',
	        type: 'bar',
	        data: []
	    }]
	});

	// 异步加载数据
	$.get('data.json').done(function (data) {
		console.log("->data.json");
		console.log(data);
	    // 填入数据
	    myChart.setOption({
	        xAxis: {
	        	data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//	            data: data.categories
	        },
	        series: [{
	            // 根据名字对应到相应的系列
	            name: '销量',
	            data: [820, 932, 901, 934, 1290, 1330, 1320]
//	            data: data.data
	        }]
	    });
	});
	
	
	
	
	/* // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('revenue-chart'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);*/

})
       