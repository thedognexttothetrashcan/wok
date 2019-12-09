var myChart_need_speed = echarts.init(document.getElementById('need_speed'));

function need_speed(data) {
    // 基于准备好的dom，初始化echarts实例


    var option_old = {
        title: {
            text: '旅游行业用电需求增速',
            x: 'left',
            textStyle: {
                color: 'black',
                fontSize: 16
            }
        },
        grid: {
            top: '20%',//距上边距

            left: '10%',//距离左边距

            right: '10%',//距离右边距

            bottom: '11%',//距离下边距
            //containLabel: true,

        },
        legend: {
            data: ['住宿', '餐饮', '交通'],
            // x: 'center'
            left: '1%',
            top: '10%'
        },
        xAxis: {
            // name:'日期',
            type: 'category',
            data: data.year
            // source_data: [2016, 2017, 2018]
        },
        yAxis: {
            type: 'value',
            min: 100,
            max: 240,
        },
        //住宿blue 餐饮 green 交通red 人数yellow 收入gray
        series: [{
            name: '住宿',
            color: 'blue',
            data: data.hotel,
            // source_data: [21.683403166025702, 31.004150617660148, 39.74863689517768],
            type: 'line'
        }, {
            name: '餐饮',
            color: 'green',
            data: data.dining,
            // source_data: [13.674300333918207, 28.29148793089411, 18.478394631665264],
            type: 'line'
        },
            {
                name: '交通',
                color: 'red',
                data: data.transport,
                // source_data: [2.4490867108187517, 0.2730189351471954, 3.385821394719653],
                type: 'line'
            }
        ]
    };


    // myChart_new_index.setOption(option_new);
    myChart_need_speed.setOption(option_old);
}

$(function () {
    $.get("/pow_tour/tour_need_speed",
        function (data) {
            // console.log('======================================')
            var data = JSON.parse(data);
            // console.log(source_data.source_data)
            // console.log('========================================')
            if (data.msg == 200) {
                need_speed(data.data)
            } else {
                alert("信息不存在")
            }

        }
    )
    // need_speed()
});