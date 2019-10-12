var myChart_old_index = echarts.init(document.getElementById('tour_speed'));

function new_old_index() {
    // 基于准备好的dom，初始化echarts实例


    var option_old = {
        title: {
            text: '旅游行业用电量增速',
            x: 'left',
            textStyle: {
                color: 'black',
                fontSize: 16
            }
        },
        legend: {
            data: ['住宿', '餐饮', '交通'],
            x: 'center'
        },
        xAxis: {
            type: 'category',
            data: [2016, 2017, 2018]
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '住宿',
            data: [13.60950852, 15.97275969, 11.06062234],
            type: 'line'
        }, {
            name: '餐饮',
            data: [17.28954656, 26.66247702, 27.11079536],
            type: 'line'
        },
            {
                name: '交通',
                color: 'black',
                data: [66.18314333, 1.76817292199202, 70.21250355],
                type: 'line'
            }
        ]
    };


    // myChart_new_index.setOption(option_new);
    myChart_old_index.setOption(option_old);
}

$(function () {
    $.get("/pow_tour/tour_speed",
        function (data) {
            // console.log('======================================')
            console.log(data.data)
            // console.log('========================================')
            if (data.msg == 200) {
                new_old_index(data.data)
            } else {
                alert("信息不存在")
            }

        }
    )
    new_old_index()
});