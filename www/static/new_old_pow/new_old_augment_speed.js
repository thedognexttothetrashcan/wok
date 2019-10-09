var myCharts_aug_spd = echarts.init(document.getElementById('growth_rate'));

function augment_speed(data) {


    var option_aug_spd = {
        title: {
            text: '用电量增速',
            left: 'left'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        // toolbox: {
        //     feature: {
        //         dataView: {show: true, readOnly: false},
        //         magicType: {show: true, type: ['line', 'bar']},
        //         restore: {show: true},
        //         saveAsImage: {show: true}
        //     }
        // },
        legend: {
            data: ['新行业', '旧行业', '平均增速']
        },
        xAxis: [
            {
                type: 'category',
                data: data.year,
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                show:false,
                name: '度数',
                // min: 1000,
                // max: 10000,
                // interval: 50,
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
            {
                type: 'value',
                name: '平均',
                show:false,
                // min: 1000,
                // max: 10000,
                // interval: 5,
                axisLabel: {
                    formatter: '{value} °C'
                }
            }
        ],
        series: [
            {
                name: '新行业',
                type: 'bar',
                data:data.new_ind


            },
            {
                name: '旧行业',
                type: 'bar',
                data: data.old_ind
            },
            {
                name: '平均增速',
                type: 'line',
                yAxisIndex: 1,
                data: data.mean
            }
        ]
    };
    myCharts_aug_spd.setOption(option_aug_spd)


}

$(function () {
    $.get("/new_old_pow/new_old_ind_speed_up",function (data) {
        // console.log(data)
        augment_speed(data.data)
    })
        });
