var myCharts = echarts.init(document.getElementById("use_pow_proportion"));

//var myCharts1 = echarts.init(document.getElementById("test1"));

function new_old_ind_data(data) {
    var option = {
        title: {
            text: data.year + '新旧行业用电量占比--全国',
            x: 'left',
            textStyle: {
                color: 'black',
                fontSize: 14
            }
        },
        //tooltip: {
        //    trigger: 'item',
        //    formatter: "{a} <br/>{b} : {c} "
        //},
        grid: {
            top: '12%',//距上边距
            left: '36%',//距离左边距
            right: '10%',//距离右边距
            bottom: '20%',//距离下边距
            //containLabel: true,

        },
        legend: {
            orient: 'vertical',
            x: 'left',
            top: '8%',//距上边距
            //top: 6,
            itemWidth: 8,
            itemHeight: 8,
            formatter: '{name}',
            textStyle: {
                color: 'black',
                fontWeight: 500,
                fontSize: 10
            },
            data: [{name: '新行业', icon: 'rect', color: 'black'},
                {name: '旧行业', icon: 'rect', color: 'black'},
                {name: '其他行业', icon: 'rect', color: 'black'},
                //{name: '2016', icon: 'rect'},
                //{name: '2017', icon: 'rect'},
                //{name: '2018', icon: 'rect'}
            ]
        }
        ,
        calculable: true,
        series: [
            {
                name: '2014年****',
                type: 'pie',
                radius: '70%',//饼图的半径大小
                center: ['42%', '50%'],//饼图的位置
                label: {            //饼图图形上的文本标签
                    normal: {
                        show: true,
                        position: 'inner', //标签的位置
                        textStyle: {
                            fontWeight: 300,
                            fontSize: 16    //文字的字体大小
                        },
                        //formatter: '{d}%',
                        //formatter: function (params) {
                        //    console.log(params)
                        //    return params.name +":"+`\n`+ params.value
                        //
                        //}
                        formatter: function (p) {
                            // console.log(p.value / 3.461149e+12 * 100 + ':' + p.value)
                            num = p.value / data.all_inds * 100;
                            return Number(num.toString().match(/^\d+(?:\.\d{0,2})?/)) + "%"
                        },


                    }
                },
                //'all_inds'
                // 'old_ind'
                // 'new_ind'
                // 'other'
                data: [
                    {value: data.new_ind, name: '新行业', itemStyle: {normal: {color: 'green'}}},
                    {value: data.old_ind, name: '旧行业', itemStyle: {normal: {color: 'red'}}},
                    {value: data.other, name: '其他行业', itemStyle: {normal: {color: '#f6aa31'}}},
                    //{value: 1.436602e+12, name: '2016', itemStyle: {normal: {color: 'black'}}},
                    //{value: 1.509557e+12, name: '2017', itemStyle: {normal: {color: 'gray'}}},
                    //{value: 1.608951e+12, name: '2018', itemStyle: {normal: {color: '#FFE200'}}},
                ]
            },

        ]
    };
    myCharts.setOption(option)
}

$(function () {
    //console.log($("#pow_proportion").val()+'--------------');
    $.get('/new_old_pow/power_proportion?year=' + $("#pow_proportion").val(),
        function (data) {
            //console.log(data.data)
            if (data.msg == 200) {
                new_old_ind_data(data.data)
            } else {
                alert("信息不存在")
            }

        }
    )

});
$("#pow_proportion").change(function () {
    //console.log($("#pow_proportion").val()+"--------")

    $.get('/new_old_pow/power_proportion?year=' + $("#pow_proportion").val(),
        function (data) {
            //console.log(data.msg)
            //console.log(data.data)
            if (data.msg == 200) {
                new_old_ind_data(data.data)
            } else {
                alert("信息不存在")
            }
        }
    )

});

