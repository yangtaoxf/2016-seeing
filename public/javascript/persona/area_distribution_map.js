//views/single_film/persona.html 地区分布图

$(function(){
	var myChart = echarts.init(document.getElementById('area_distribution_map'));

var geoCoordMap = {
    "北京": [116.46, 39.92],
    "南京": [118.78, 32.04],
    "吉林": [126.57, 43.87],
    "上海": [121.48, 31.22],
    "成都": [104.06, 30.67],
    "哈尔滨": [126.63, 45.75],
    "沈阳": [123.38, 41.8],
    // "合肥":[117.27,31.86],
    "武汉": [114.31, 30.52],
    "石家庄": [114.48, 38.03],
    "天津": [117.2, 39.13],
    "太原": [112.53, 37.87],
    "西安": [108.95, 34.27],
    "南宁": [108.33, 22.84],
    "南昌": [115.89, 28.68],
    "济南": [117, 36.65],
};

var data = [{
    name: "北京",
    value: 38
}, {
    name: "南京",
    value: 147
}, {
    name: "吉林",
    value: 74
}, {
    name: "上海",
    value: 33
}, {
    name: "成都",
    value: 192
}, {
    name: "哈尔滨",
    value: 35
}, {
    name: "沈阳",
    value: 0
}, {
    name: "武汉",
    value: 36
}, {
    name: "石家庄",
    value: 32
}, {
    name: "天津",
    value: 7
}, {
    name: "太原",
    value: 1
}, {
    name: "西安",
    value: 63
}, {
    name: "南宁",
    value: 29
}, {
    name: "南昌",
    value: 48
}, {
    name: "济南",
    value: 61
}];
var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

var convertedData = [
    convertData(data),
    convertData(data.sort(function(a, b) {
        return b.value - a.value;
    }).slice(0, 6))
];
data.sort(function(a,b){
 return    a.value-b.value;
})

var selectedItems = [];
    var categoryData = [];
    var barData = [];
 //   var maxBar = 30;
    var sum = 0;
    var count = data.length;
    for(var i=0;i<data.length;i++){
    categoryData.push(data[i].name);
    barData.push(data[i].value);
    sum+=data[i].value;
    }
	console.log(categoryData);
	console.log(sum+"   "+count)
	var option = {
	    animation: true,
	    animationDuration: 1000,
	    animationEasing: 'cubicInOut',
	    animationDurationUpdate: 1000,
	    animationEasingUpdate: 'cubicInOut',
	    title: [{
	        left: 'center',
	        textStyle: {
	            color: '#fff',
	            fontSize:20
	        }
	    }, {
	        id: 'statistic',
	        // text: count ? '平均: ' +parseInt((sum / count).toFixed(4)) : '',
	        text: 'TOP20',
	        right: 120,
	        top: 40,
	        width: 100,
	        textStyle: {
	            color: '#fff',
	            fontSize: 20
	        }
	    }],
	    geo: {
	        map: 'china',
	        center: [130, 38],
	        zoom: 1,
	        label: {
	            emphasis: {
	                show: false
	            },
	            textStyle:{
	            	fontSize:16,
	            	color:"#fff"
	            }
	        },
	        roam: true,
	        itemStyle: {
	            normal: {
	                areaColor: '#45a7a7',
	                borderColor: '#fff'
	            },
	            emphasis: {
	                areaColor: '#45a7a7'
	            }
	        }
	    },
	    tooltip: {
	        trigger: 'item',
	        textStyle:{
	        	fontSize:20
	        }
	    },
	    grid: {
	        right: 40,
	        top: 100,
	        bottom: 40,
	        width: '30%'
	    },
	    xAxis: {
	        type: 'value',
	        scale: true,
	        position: 'top',
	        boundaryGap: false,
	        splitLine: {
	            show: false
	        },
	        axisLine: {
	            show: false
	        },
	        axisTick: {
	            show: false
	        },
	        axisLabel: {
	            margin: 2,
	            textStyle: {
	                color: '#fff',
	                fontSize:18
	            }
	        },
	    },
	    yAxis: {
	        type: 'category',
	        //  name: 'TOP 20',
	        nameGap: 16,
	        axisLine: {
	            show: true,
	            lineStyle: {
	                color: '#ddd'
	            }
	        },
	        axisTick: {
	            show: false,
	            lineStyle: {
	                color: '#ddd'
	            }
	        },
	        axisLabel: {
	            interval: 0,
	            textStyle: {
	                color: '#fff',
	                fontSize:18
	            }
	        },
	        data: categoryData
	    },
	    series: [{
	        // name: 'pm2.5',
	        type: 'scatter',
	        coordinateSystem: 'geo',
	        data: convertedData[0],
	        symbolSize: function(val) {
	            return Math.max(val[2] / 10, 8);
	        },
	        label: {
	            normal: {
	                formatter: '{b}',
	                position: 'right',
	                show: false
	            },
	            emphasis: {
	                show: true
	            }
	        },
	        itemStyle: {
	            normal: {
	                color: '#aabbcc',
	                position: 'right',
	                show: true
	            }
	        }
	    }, {
	        //  name: 'Top 5',
	        type: 'effectScatter',
	        coordinateSystem: 'geo',
	        data: convertedData[0],
	        symbolSize: function(val) {
	            return Math.max(val[2] / 10, 8);
	        },
	        showEffectOn: 'emphasis',
	        rippleEffect: {
	            brushType: 'stroke'
	        },
	        hoverAnimation: true,
	        label: {
	            normal: {
	                formatter: '{b}',
	                position: 'right',
	                show: true,
	                textStyle:{
	                	color:"#fff",
	                	fontSize:16
	                }
	            }
	        },
	        itemStyle: {
	            normal: {
	                color: '#fff',
	                shadowBlur: 10,
	                shadowColor: '#fff'
	            },
	             emphasis: {
	                color: '#f4e925'
	            }
	        },
	        zlevel: 1
	    }, {
	        id: 'bar',
	        zlevel: 2,
	        type: 'bar',
	        symbol: 'none',
	        itemStyle: {
	            normal: {
	                color: '#3dffff'
	            }
	        },

	        data: data
	    }]
	};
myChart.setOption(option);
});