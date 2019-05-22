import React, {
    Component
}
from 'react';

let echarts = require("../echarts.js");


var interval;
var min = Infinity;
var max = -Infinity;
var datas = [
    [9, 2],
    [11, 4],
    [13, 6],
    [15, 8],
    [17, 10],
    [19, 12],
    [21, 14]
];
var data2 = [
    [8, 10],
    [10, 12],
    [12, 14],
    [14, 16],
    [16, 18],
    [18, 20],
    [20, 22]
];

let commoncolor = (bl) => {
    return 'rgba(76,96,191,' + bl + ')';
};
var colorList = [commoncolor(.1), commoncolor(.15), commoncolor(.2), commoncolor(.25), commoncolor(.3), commoncolor(.35), commoncolor(.4)];

// var yData = ["3.22", "4.00", "3.82",  "4.22", "4.62", "4.70"];//y轴 利率数据
// var xData = ['30天', '60天', '90天', '120天', '150天', "200天"];//x轴 天数据
// var index = 2; //markPoint
// var today = "第80天";

var color = {
    titleColor: "#91939e", //标题颜色
    wanggxColor: "#f4f4f6", //网格线颜色
    zhouColor: "#c1c8e9", //轴颜色
    zhouTextColor: "#BFC1CC", //轴文字颜色
    shapeTextColor: "#4C60BF", //图像利率文字颜色
    shapeMarkLineColor: "#BFC1CC", //markLine线的颜色
    shapeMarkLineTextColor: "#4C60BF", //markLine线顶上文字的颜色
};



/**
 *
 * @param {*} datax x轴数据
 * @param {*} datay y轴数据
 * @param {*} icurIndex 持有多少天
 */

class Chart extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.id || Math.random();
    }


    componentDidMount() {
        let {
            markline, icurIndex = 0, xData, yData, saveDay
        } = this.props;
        let option = null;
        let self = this;

        console.log(xData, yData);
        //echarts.init(document.getElementById(self.id)).setOption(self.returnOption([...xData, "5年"], [0, ...yData], saveDay, icurIndex, markline, echarts));
        option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        };
          
        echarts.init(document.getElementById(self.id)).setOption(option)
    }

    returnOption = (datax, datay, saveDay, icurIndex, markline, echarts) => {
        var data = datas.slice(0, datax.length - 1).map((item, index)=>{
            var x0 = data2[index][0];
            var x1 = data2[index][1];
            interval = x1 - x0;
            min = Math.min(min, x0);
            max = Math.max(max, x1);
            return [x0, x1, item[1]];
        })
       

        let option = {
            // title:{
            //     z:7,
            //     top:0,
            //     left:-3,
            //     text:"利率(%)期限为左包含",
            //     textAlign:"left",
            //     textStyle:{
            //         fontWeight:"lighter",
            //         color: color["titleColor"],
            //         fontSize:14,
            //     }
            // },
            textStyle: {
                color: "#BFC1CC",
            },
            markLine: {
                z: 17
            },
            markPoint: {
                z: 16
            },
            grid: {
                left: "10%",
                top: "3%",
                bottom: "50px",
                right: "3%",
                z: 8,
                borderColor: '#E5E6EA'

            },
            xAxis: {
                //name: '天',
                axisLine: { //轴的设置
                    lineStyle: {
                        color: color["zhouColor"]
                    }
                },
                type: 'value',
                min: min,
                max: max,
                interval: interval,
                axisLabel: {
                    interval: 0, //强制显示所有标签刻度
                    formatter: function(value, index) {
                        return datax[index];
                    }
                },
                axisTick: { //轴刻度的设置
                    length: 3
                },
                splitLine: { //网格线设置
                    show: false,
                },
                z: 10,
            },
            yAxis: {
                axisLine: { //轴的设置
                    lineStyle: {
                        color: color["zhouColor"]
                    }
                },

                axisTick: { //轴刻度的设置
                    inside: true,
                    length: 3
                },
                splitLine: { //网格线设置
                    lineStyle: {
                        color: color["wanggxColor"],
                        type: "dashed",
                    }
                },
                splitNumber: datay.length - 1,
                type: 'value',
                axisLabel: {
                    interval: 0, //强制显示所有标签刻度
                    formatter: function(value, index) {
                        return Number(datay[index]).toFixed(2);
                    }
                },
                z: 9, //x在上 ， y在下
            },
            series: [{
                z: 9,
                data: data,
                type: 'custom',
                renderItem: this.renderItem,
                barCategoryGap: "0",
                animation: false,

                encode: {
                    x: [0, 1],
                    y: [2],
                },
                itemStyle: {
                    normal: { //柱状图表设置
                        color: function(params) {
                            return colorList[params.dataIndex];
                        },
                    },

                },
            }]
        };


        //持有天数
        if (markline) {
            let x = datas[icurIndex][0];
            let y = datas[icurIndex][1];

            option["series"][0] = {
                ...option["series"][0],
                    // markLine: {
                    //     lineStyle: {
                    //         normal: {
                    //             color: "#FFA21F",
                    //             type: 'dashed'
                    //         }
                    //     },
                    //     data: [
                    //         [{
                    //             xAxis: x,
                    //             yAxis: 0,
                    //             symbol: 'none'
                    //         }, {
                    //             xAxis: x,
                    //             yAxis: y,
                    //             symbol: 'circle'
                    //         }]
                    //     ]
                    // },
                    // markPoint: {
                    //     symbol: "image://" + require('./img/Rectangle.png'),
                    //     symbolSize: [98, 23],
                    //     symbolKeepAspect: true,
                    //     symbolOffset: icurIndex >= 0 && icurIndex <= 2 ?
                    //         [25, -20] : icurIndex >= 3 && icurIndex < datay.length - (1 + 2) ?
                    //         [0, -20] : [-30, -20],
                    //     itemStyle: {
                    //         normal: {
                    //             label: {
                    //                 color: "#fff",
                    //                 formatter: function(data) {
                    //                     return "已持有" + data.value + "天"; //利率"+data.data.rate;
                    //                 }
                    //             }
                    //         }
                    //     },
                    //     data: [{
                    //         rate: datay[icurIndex + 1] + "%", //y轴的第一位是0
                    //         value: saveDay,
                    //         xAxis: x,
                    //         yAxis: y
                    //     }]
                    // },

            };
        }
        return option;
    }

    renderItem = (params, api) => {
        var yValue = api.value(2);
        var start = api.coord([api.value(0), yValue]);
        var size = api.size([api.value(1) - api.value(0), yValue]);
        var style = api.style();

        return {
            type: 'rect',
            shape: {
                x: start[0],
                y: start[1],
                width: size[0],
                height: size[1]
            },
            style: style,
            styleEmphasis: style,
        };
    }

    render() {

        return (<div  className="chart_box">
                {
                    this.props.type == "home"
                    ?
                    <h3 className="title">存期档位利率表</h3>
                    :
                    ""
                }
                <p className="rate_title">利率% <span>(期限为左包含)</span></p>
                <div  id={ this.id } className="chart"></div>
      </div>);
    }
}

export default Chart;