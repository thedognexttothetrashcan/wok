var myCharts_new_top10 = echarts.init(document.getElementById("new_ind_top10"));
<!--  -->

// 新行业排名
function new_power_top10(data) {
    var option_new_top10 = {
        title: {
            text: data.year+'新动能行业耗电量Top10',
            left: 'left',
            itemGap: 2,
            textStyle: {
                color: 'black',
                fontSize: 15
            }
        },

        //tooltip: {
        //  trigger: 'axis',
        //axisPointer: {
        //  type: 'shadow'
        //}
        //},
        //legend: {
        //    data: ['2018年']
        //},
        // grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true,
        // },
        grid: {
            top: '12%',//距上边距

            left: '36%',//距离左边距

            right: '10%',//距离右边距

            bottom: '20%',//距离下边距
            //containLabel: true,

        },
        xAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                show: false,
                textStyle: {
                    color: '#c3dbff',  //更改坐标轴文字颜色
                    fontSize: 14      //更改坐标轴文字大小
                }
            },
            splitLine: {
                show: false
            },


            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#315070' //更改坐标轴颜色
                }
            }

        },
        yAxis: {
            splitLine: {
                show: false
            },

            type: 'category',

            // New data
            data: data.industry_name_y,

            axisLabel: {
                show: true,
                textStyle: {
                    color: "black",
                    fontSize: 10,
                    fontWeight: 900,
                }
            },

        },
        series: [
            {
                inverse: false,
                name: '2018年',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // 给出颜色组
                            var colorList = ['#4c8c41'];
                            //var colorList = ['#cca272', '#cda266', '#d7a02b', '#c8ba23',];
                            return colorList[params.dataIndex]
                        },
                    },

                },
                label: {
                    normal: {
                        //show: true,// 显示百分比
                        show: false,// 不显示百分比
                        formatter: function (p) {
                            // Number(15.7784514000.toString().match(/^\d+(?:\.\d{0,2})?/))
                            //console.log(p.value)
                            num = p.value / 3.461149e+12 * 100;
                            return Number(num.toString().match(/^\d+(?:\.\d{0,2})?/)) + "%"
                            //return Math.floor(p.value / 1398193377473.0 * 100) +'%'
                        },
                        position: "right",
                        textStyle: {
                            //'rgba(247,187,65,1)'
                            color: "rgba(247,187,65,1)",
                            fontSize: 20
                        }
                    }
                },

                // New data
                data: data.industry_num

            },

        ]
    };
    myCharts_new_top10.setOption(option_new_top10)
}

$(function () {
    //console.log($("#new_ind_year").val()+'----000000-----');
    $.get("/new_old_pow/new_pow_top10?year=" + $("#new_ind_year").val()+ '&'+'tag=new',
        function (data) {
            //console.log(data.data)
            if (data.msg == 200) {
                new_power_top10(data.data)
            } else {
                alert("信息不存在")
            }

        }
    )

});
$("#new_ind_year").change(function () {
    //console.log($("#pow_proportion").val()+"--------")
    $.get('/new_old_pow/new_pow_top10?year=' + $("#new_ind_year").val() + '&'+'tag=new',
        function (data) {
            //console.log(data.msg)
            //console.log(data.data)
            if (data.msg == 200) {
                new_power_top10(data.data)
            } else {
                alert("信息不存在")
            }
        }
    )

});


// 旧行业排名
var myCharts_old_top10 = echarts.init(document.getElementById("old_ind_top10"));

function old_power_top10(data) {
    var option_old_top10 = {
        title: {
            text: data.year+'旧动能行业耗电量Top10',
            left: 'left',
            itemGap: 2,
            textStyle: {
                color: 'black',
                fontSize: 15
            }
        },

        //tooltip: {
        //  trigger: 'axis',
        //axisPointer: {
        //  type: 'shadow'
        //}
        //},
        //legend: {
        //    data: ['2018年']
        //},
        // grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true,
        //
        //
        // },
        grid: {
            top: '12%',//距上边距

            left: '36%',//距离左边距

            right: '10%',//距离右边距

            bottom: '20%',//距离下边距
            //containLabel: true,

        },
        xAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                show: false,
                textStyle: {
                    color: '#c3dbff',  //更改坐标轴文字颜色
                    fontSize: 14      //更改坐标轴文字大小
                }
            },
            splitLine: {
                show: false
            },


            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#315070' //更改坐标轴颜色
                }
            }

        },
        yAxis: {
            splitLine: {
                show: false
            },

            type: 'category',

            // Old data
            data: data.industry_name_y,
            // data: [' 水的生产和供应业',
            //     '农、林、牧、渔服务业',
            //     ' 煤炭开采和洗选业',
            //     ' 石油加工、炼焦及核燃料加工业',
            //     ' 橡胶和塑料制品业',
            //     ' 电力、热力的生产和供应业',
            //     ' 纺织业（轻）',
            //     ' 非金属矿物制品业',
            //     ' 化学原料及化学制品制造业',
            //     ' 黑色金属冶炼及压延加工业'],

            axisLabel: {
                show: true,
                textStyle: {
                    color: "black",
                    fontSize: 10,
                    fontWeight: 900,
                }
            },

        },
        series: [
            {
                inverse: false,
                name: '2018年',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // 给出颜色组
                            var colorList = ['red'];
                            //var colorList = ['#cca272', '#cda266', '#d7a02b', '#c8ba23',];
                            return colorList[params.dataIndex]
                        },
                    },

                },
                label: {
                    normal: {
                        //show: true,// 显示百分比
                        show: false,// 不显示百分比
                        formatter: function (p) {
                            // Number(15.7784514000.toString().match(/^\d+(?:\.\d{0,2})?/))
                            //console.log(p.value)
                            num = p.value / 3.461149e+12 * 100;
                            return Number(num.toString().match(/^\d+(?:\.\d{0,2})?/)) + "%"
                            //return Math.floor(p.value / 1398193377473.0 * 100) +'%'
                        },
                        position: "right",
                        textStyle: {
                            //'rgba(247,187,65,1)'
                            color: "rgba(247,187,65,1)",
                            fontSize: 20
                        }
                    }
                },

                //---------------------
                // Old data
                data:data.industry_num

            },

        ]
    };
    myCharts_old_top10.setOption(option_old_top10)
}

$(function () {
    //console.log($("#old_ind_year").val()+'----000000-----');
    $.get("/new_old_pow/new_pow_top10?year=" + $("#old_ind_year").val()+ '&'+'tag=old',
        function (data) {
            // console.log(data.data)
            if (data.msg == 200) {
                console.log(data.data)
                old_power_top10(data.data)
            } else {
                alert("信息不存在")
            }

        }
    )

});
$("#old_ind_year").change(function () {
    //console.log($("#pow_proportion").val()+"--------")
    $.get('/new_old_pow/new_pow_top10?year=' + $("#old_ind_year").val()+ '&'+'tag=old',
        function (data) {
            //console.log(data.msg)
            // console.log(data.data)
            if (data.msg == 200) {
                console.log(data.data)
                old_power_top10(data.data)
            } else {
                alert("信息不存在")
            }
        }
    )

});
