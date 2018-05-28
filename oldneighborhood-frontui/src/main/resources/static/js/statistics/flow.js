$().ready(function(){
	
	var myChart = echarts.init(document.getElementById('revenue-chart'));
	var base = +new Date(2017, 1, 1);
	var oneDay = 24 * 3600 * 1000;
	var date = [];

	var data = [Math.random() * 3000];
	var data_online = [];
	var data_offline = [];
	var data_ticket = [];

	for (var i = 1; i < 400; i++) {
	    var now = new Date(base += oneDay);
	    date.push([now.getFullYear(), now.getMonth(), now.getDate()].join('/'));
	    data.push(Math.round((Math.random() - 0.5) * 200 + data[i - 1]));
	    data_ticket.push(data[i] - 2);
	    data_online.push(Math.round(data[i] * 0.4));
	    data_offline.push(Math.round(data[i] * 0.6));
	}

	var option = {
	    tooltip: {
	        trigger: 'axis',
	        position: function (pt) {
	            return [pt[0], '10%'];
	        }
	    },
	    title: {
	        left: 'center',
	        text: '景区人流量',
	    },
	    toolbox: {
	        feature: {
	            dataZoom: {
	                yAxisIndex: 'none'
	            },
	            restore: {},
	            saveAsImage: {}
	        }
	    },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: date
	    },
	    yAxis: {
	        type: 'value',
	        boundaryGap: [0, '100%']
	    },
	    dataZoom: [{
	        type: 'inside',
	        start: 0,
	        end: 10
	    }, {
	        start: 0,
	        end: 10,
	        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
	        handleSize: '80%',
	        handleStyle: {
	            color: '#fff',
	            shadowBlur: 3,
	            shadowColor: 'rgba(0, 0, 0, 0.6)',
	            shadowOffsetX: 2,
	            shadowOffsetY: 2
	        }
	    }],
	    series: [
	        {
	            name:'模拟数据',
	            type:'line',
	            smooth:true,
	            symbol: 'none',
	            sampling: 'average',
	            itemStyle: {
	                normal: {
	                    color: 'rgb(75, 70, 131)'
	                }
	            },
	            areaStyle: {
	                normal: {
	                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                        offset: 0,
	                        color: 'rgb(75, 158, 68)'
	                    }, {
	                        offset: 1,
	                        color: 'rgb(75, 70, 131)'
	                    }])
	                }
	            },
	            data: data
	        }
	    ]
	};
	myChart.setOption(option);
	
	
	
	var myChart2 = echarts.init(document.getElementById('sales-chart'));
	var option2 = {
		    tooltip: {
		        trigger: 'axis',
		        position: function (pt) {
		            return [pt[0], '10%'];
		        }
		    },
		    title: {
		        left: 'center',
		        text: '景区票务量',
		    },
		    toolbox: {
		        feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: date
		    },
		    yAxis: {
		        type: 'value',
		        boundaryGap: [0, '100%']
		    },
		    dataZoom: [{
		        type: 'inside',
		        start: 0,
		        end: 10
		    }, {
		        start: 0,
		        end: 10,
		        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
		        handleSize: '80%',
		        handleStyle: {
		            color: '#fff',
		            shadowBlur: 3,
		            shadowColor: 'rgba(0, 0, 0, 0.6)',
		            shadowOffsetX: 2,
		            shadowOffsetY: 2
		        }
		    }],
		    series: [
		        {
		            name:'票务总量',
		            type:'line',
		            smooth:true,
		            symbol: 'none',
		            sampling: 'average',
		            itemStyle: {
		                normal: {
		                    color: 'rgb(75, 70, 131)'
		                }
		            },
		            data: data
		        },
		        {
		            name:'线上票务',
		            type:'line',
		            smooth:true,
		            symbol: 'none',
		            sampling: 'average',
		            itemStyle: {
		                normal: {
		                    color: 'rgb(75, 70, 131)'
		                }
		            },
		            data: data_online
		        },
		        {
		            name:'线下票务',
		            type:'line',
		            smooth:true,
		            symbol: 'none',
		            sampling: 'average',
		            itemStyle: {
		                normal: {
		                    color: 'rgb(75, 70, 131)'
		                }
		            },
		            data: data_offline
		        }
		    ]
		};
	myChart2.setOption(option2);
	
	var myChart3 = echarts.init(document.getElementById('parkinglot'));
	var option3 = {
//		    backgroundColor: '#2c343c',

		    title: {
		        text: '实时停车位',
		        left: 'center',
		        top: 20,
		        textStyle: {
		            color: '#2c343c'
		        }
		    },

		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },

		    visualMap: {
		        show: false,
		        min: 80,
		        max: 600,
		        inRange: {
		            colorLightness: [0, 1]
		        }
		    },
		    series : [
		        {
		            name:'访问来源',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '50%'],
		            data:[
		                {value:132, name:'可用停车位'},
		                {value:80, name:'已占用'}
		            ].sort(function (a, b) { return a.value - b.value; }),
		            roseType: 'radius',
		            label: {
		                normal: {
		                    textStyle: {
		                        color: 'rgba(0, 0, 0, 0.9)'
		                    }
		                }
		            },
		            labelLine: {
		                normal: {
		                    lineStyle: {
		                        color: 'rgba(0, 0, 0, 0.9)'
		                    },
		                    smooth: 0.2,
		                    length: 10,
		                    length2: 20
		                }
		            },
//		            itemStyle: {
//		                normal: {
//		                    color: '#c23531',
//		                    shadowBlur: 200,
//		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
//		                }
//		            },

		            animationType: 'scale',
		            animationEasing: 'elasticOut',
		            animationDelay: function (idx) {
		                return Math.random() * 200;
		            }
		        }
		    ]
		};
	myChart3.setOption(option3);
//	var myChart = echarts.init(document.getElementById('revenue-chart'));
//	// 显示标题，图例和空的坐标轴
//	myChart.setOption({
//	    title: {
////	    	left: 'center',
//	        text: '票务销量'
//	    },
//	    tooltip: {},
//	    legend: {
//	        data:['销量']
//	    },
//	    xAxis: {
//	        data: []
//	    },
//	    yAxis: {},
//	    series: [{
//	        name: '销量',
//	        type: 'bar',
//	        data: []
//	    }]
//	});
//
//	// 异步加载数据
//	$.get('data.json').done(function (data) {
//		console.log("->data.json");
//		console.log(data);
//	    // 填入数据
//	    myChart.setOption({
//	    	
//	    	
//	    	
//	    	
//	    	
//	        xAxis: {
//	        	data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
////	            data: data.categories
//	        },
//	        series: [{
//	            // 根据名字对应到相应的系列
//	            name: '销量',
//	            data: [820, 932, 901, 934, 1290, 1330, 1320]
////	            data: data.data
//	        }]
//	    });
//	});
	
	
	
	
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
       