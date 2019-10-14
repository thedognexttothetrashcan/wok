// var myChart_new_index = echarts.init(document.getElementById('new_pow_index'));
var myChart_old_index = echarts.init(document.getElementById('old_pow_index'));

function new_old_index(data) {
    // 基于准备好的dom，初始化echarts实例


    // var option_new = {
    //     //backgroundColor: '#12cf96',
    //     // grid: {
    //     //     left: '7%',
    //     //     right: '7%',
    //     //     bottom: '3%',
    //     //     containLabel: true
    //     // },
    //     title: {
    //         text: '新动能行业用电量指数',
    //         textStyle: {
    //             color: 'black',
    //             fontSize: 14
    //         }
    //     },
    //     grid: {
    //         top: '20%',//距上边距
    //
    //         left: '25%',//距离左边距
    //
    //         right: '10%',//距离右边距
    //
    //         bottom: '10%',//距离下边距
    //
    //         //containLabel: true,
    //
    //     },
    //
    //     // tooltip: {
    //     //
    //     //     trigger: 'axis',
    //     //     axisPointer: {
    //     //         type: 'cross'
    //     //     },
    //     //
    //     // },
    //     name: "seriesName",
    //     xAxis: {
    //         name: '日期',
    //         show: false,
    //         type: 'category',
    //         // axisLabel: {
    //         //     interval: 0,
    //         //     rotate: 295
    //         // },
    //         // splitLine: {
    //         //     show: false
    //         // },
    //         data: data.date
    //     },
    //     yAxis: {
    //         // name: '数量',
    //
    //         type: 'value',
    //         min: 0,
    //         max: 200,
    //         //axisLabel: {
    //         //    interval: 0,
    //         //    rotate: 25
    //         //}
    //     },
    //     series: [
    //         {
    //             //name:"哈哈楼",
    //             data: data.new_index,
    //             type: 'line',
    //             lineStyle: {
    //                 width: 1, //default value:2,
    //                 color: "green"
    //             },
    //             //itemStyle : { normal: {label : {show: true}}}
    //         }
    //     ]
    // };
    var option_old = {
        //backgroundColor: '#12cf96',
        // grid: {
        //     left: '7%',
        //     right: '7%',
        //     bottom: '3%',
        //     containLabel: true
        // },
        // legend: {
        //     data: ['新行业', '旧行业'],
        //
        // },
        legend: {
            // orient: 'vertical',
            x: 'center',
            // top: '8%',//距上边距
            //top: 6,
            // itemWidth: 8,
            // itemHeight: 8,
            // formatter: '{name}',
            // textStyle: {
            //     color: 'black',
            //     fontWeight: 500,
            //     fontSize: 10
            // },
            data: [{name: '新行业', icon: 'rect', color: 'white'},
                {name: '旧行业', icon: 'rect', color: 'black'},
                // {name: '其他行业', icon: 'rect', color: 'black'},
                //{name: '2016', icon: 'rect'},
                //{name: '2017', icon: 'rect'},
                //{name: '2018', icon: 'rect'}
            ]
        },
        title: {
            text: '新旧动能行业用电量指数',
            textStyle: {
                color: 'black',
                fontSize: 14
            }
        },

        // tooltip: {
        //
        //     trigger: 'axis',
        //     axisPointer: {
        //         type: 'cross'
        //     },
        //
        // },
        name: "seriesName",
        xAxis: {
            name: '日期',
            show: false,
            type: 'category',
            // axisLabel: {
            //     interval: 0,
            //     rotate: 295
            // },
            data: data.date
        },
        yAxis: {
            //name: '数量',

            type: 'value',
            min: 70,
            max: 200,
            //axisLabel: {
            //    interval: 0,
            //    rotate: 25
            //}
        },
        grid: {
            top: '20%',//距上边距

            left: '10%',//距离左边距

            right: '10%',//距离右边距

            bottom: '10%',//距离下边距

            //containLabel: true,

        },
        series: [
            {
                name:"旧行业",
                data: data.old_index,
                itemStyle: {normal: {color: 'red'}},
                type: 'line',
                lineStyle: {
                    width: 2, //default value:2,
                    color: "red"
                },
                // itemStyle : { normal: {label : {show: true}}}
            },
            {
                name:"新行业",
                data: data.new_index,
                type: 'line',
                itemStyle: {normal: {color: 'green'}},
                lineStyle: {
                    width: 2, //default value:2,
                    color: "green"
                },
                //itemStyle : { normal: {label : {show: true}}}
            }
        ]
    };

    // myChart_new_index.setOption(option_new);
    myChart_old_index.setOption(option_old);
}

$(function () {
    $.get("/new_old_pow/new_old_ind_index",
        function (data) {
            // console.log('======================================')
            // console.log(data.data)
            // console.log('========================================')
            if (data.msg == 200) {
                new_old_index(data.data)
            } else {
                alert("信息不存在")
            }

        }
    )

});