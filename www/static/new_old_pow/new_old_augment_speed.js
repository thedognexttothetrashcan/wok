var myCharts_aug_spd = echarts.init(document.getElementById('growth_rate'));

function augment_speed(data) {


    var option_aug_spd = {
        title: {
            text: '行业用电量增速',
            left: 'left',
            textStyle: {
                color: 'black',
                fontSize: 15
            }
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
                    type: 'shadow',

                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: true,
                // name: '千瓦时',
                // min: 1000,
                // max: 10000,
                // interval: 50,
                axisLabel: {
                    formatter: '{value} 亿',
                    splitLine: {
                        show: false
                    }
                },
                splitLine: {
                    show: false
                }
            },
            {
                type: 'value',
                name: '单位: 千瓦时',
                show: true,
                // min: 1000,
                // max: 10000,
                // interval: 5,
                axisLabel: {
                    formatter: '{value} 亿',
                    splitLine: {
                        show: false
                    }
                },
                splitLine: {
                    show: true
                }
            }
        ],
        series: [
            {
                name: '新行业',
                type: 'bar',
                data: data.new_ind,
                itemStyle: {
                    //通常情况下：
                    normal: {
                        //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                        color: '#44590e'
                        }
                    },

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
        $.get("/new_old_pow/new_old_ind_speed_up", function (data) {
            // console.log(data)
            augment_speed(data.data)
        })
    });
