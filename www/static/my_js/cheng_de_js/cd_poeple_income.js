var myChart_peo_inc = echarts.init(document.getElementById('peo_inc'));

function people_income(data) {
    // 基于准备好的dom，初始化echarts实例


    var option = {
        title: {
            text: '旅游行业用电与旅游人数、收入分析',
            x: 'left',
            textStyle: {
                color: 'black',
                fontSize: 16
            }
        },
        legend: {
            data: ['住宿', '餐饮', '交通', '人数', '收入'],
            // x: 'right'
            right: '10%',
        },
        xAxis: {
            name:'日期',
            type: 'category',
            data: [2015, 2016, 2017, 2018]
        },
        yAxis: {
            name:'指数',
            type: 'value'
        },
        //hotel,100,113.6095085,131.7560823,146.329125
        // dining,100,117.2895466,148.561845,188.8381427
        // transport,100,166.1831433,169.1215487,287.866022
        // people,100,138.4219011,173.0523048,209.2602102
        // income,100,149.7871082,202.0934358,256.2182141
        //住宿blue 餐饮 green 交通red 人数yellow 收入gray
        series: [{
            name: '住宿',
            color:'blue',
            data: [100,113.6095085,131.7560823,146.329125],
            type: 'line'
        }, {
            name: '餐饮',
            color:'green',
            //color:'#0033CC',
            data: [100,117.2895466,148.561845,188.8381427],
            type: 'line'
        },
            {
                name: '交通',
                color: 'red',
                data: [100,166.1831433,169.1215487,287.866022],
                type: 'line'
            },
            {
                name: '人数',
                color: 'yellow',
                data: [100,138.4219011,173.0523048,209.2602102],
                type: 'line'
            },
            {
                name: '收入',
                color: 'gray',
                data: [100,149.7871082,202.0934358,256.2182141],
                type: 'line'
            }
        ]
    };


    myChart_peo_inc.setOption(option);
}

$(function () {
    // $.get("/pow_tour/tour_speed",
    //     function (data) {
    //         // console.log('======================================')
    //         var data = JSON.parse(data);
    //         // console.log(data.data)
    //         // console.log('========================================')
    //         if (data.msg == 200) {
    //             people_income(data.data)
    //         } else {
    //             alert("信息不存在")
    //         }
    //
    //     }
    // )
    people_income()
});