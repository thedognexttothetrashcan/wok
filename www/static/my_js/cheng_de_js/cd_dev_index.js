// var myChart_new_index = echarts.init(document.getElementById('new_pow_index'));
var myChart_tour_index = echarts.init(document.getElementById('tour_index'));

function tour_index(data) {
    // 基于准备好的dom，初始化echarts实例

    var option_tour_index = {
        // backgroundColor: '#12cf96',
        // grid: {
        //     top: '20%',//距上边距
        //
        //     left: '10%',//距离左边距
        //
        //     right: '10%',//距离右边距
        //
        //     bottom: '10%',//距离下边距
        //
        //     //containLabel: true,
        //
        // },
        // legend: {
        //     data: ['新行业', '旧行业'],
        //
        // },
        legend: {
            // orient: 'vertical',
            x: 'right',
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
            // data: [{name: '新行业', icon: 'rect', color: 'white'},
            //     {name: '旧行业', icon: 'rect', color: 'black'},
                // {name: '其他行业', icon: 'rect', color: 'black'},
                //{name: '2016', icon: 'rect'},
                //{name: '2017', icon: 'rect'},
                //{name: '2018', icon: 'rect'}
            // ]
        },
        title: {
            text: '城市旅游发展指数',
            textStyle: {
                color: 'black',
                fontSize: 18
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
            show: true,
            type: 'category',
            axisLabel: {
                interval: 0,
                rotate: 295
            },
            data: data.year
        },
        yAxis: {
            name: '指数',

            type: 'value',
            min: 95,
            max: 104,
            //axisLabel: {
            //    interval: 0,
            //    rotate: 25
            //}
        },

        series: [
            {
                // name:"旧行业",
                data: data.index_num,
                itemStyle: {normal: {color: 'red'}},
                type: 'line',
                lineStyle: {
                    width: 1, //default value:2,
                    color: "red"
                },
                //itemStyle : { normal: {label : {show: true}}}
            },
            // {
            //     name:"新行业",
            //     data: data.new_index,
            //     type: 'line',
            //     itemStyle: {normal: {color: 'green'}},
            //     lineStyle: {
            //         width: 1, //default value:2,
            //         color: "green"
            //     },
            //     //itemStyle : { normal: {label : {show: true}}}
            // }
        ]
    };

    // myChart_new_index.setOption(option_new);
    myChart_tour_index.setOption(option_tour_index);
}

$(function () {
    $.get("/pow_tour/tour_dev_index",
        function (data) {
            // console.log('======================================')
            // console.log(data.data)
            // console.log('========================================')
            if (data.msg == 200) {
                tour_index(data.data)
            } else {
                alert("信息不存在")
            }

        }
    )

});