function china_big_map() {
    var myChart = echarts.init(document.getElementById('main'));
    var myChart1 = echarts.init(document.getElementById('main1'));

    //var myChart1 = echarts.init(document.getElementById('main1'));

    //echarts.registerMap('china', chinaJson);

    function randomData() {
        return Math.round(Math.random() * 600);
    }


    var m = [{id: '11', name: '北京', value: randomData()},
        {id: '12', name: '天津', value: randomData()},
        {id: '13', name: '河北', value: randomData()},
        {id: '14', name: '山西', value: 222},
        {id: '15', name: '内蒙古', value: randomData()},
        {id: '21', name: '辽宁', value: randomData()},
        {id: '22', name: '吉林', value: randomData()},
        {id: '23', name: '黑龙江', value: 111},
        {id: '31', name: '上海', value: randomData()},
        {id: '32', name: '江苏', value: 444},
        {id: '33', name: '浙江', value: randomData()},
        {id: '34', name: '安徽', value: randomData()},
        {id: '35', name: '福建', value: randomData()},
        {id: '36', name: '江西', value: randomData()},
        {id: '37', name: '山东', value: randomData()},
        {id: '41', name: '河南', value: randomData()},
        {id: '42', name: '湖北', value: randomData()},
        {id: '43', name: '湖南', value: randomData()},
        {id: '44', name: '广东', value: randomData()},
        {id: '45', name: '广西', value: randomData()},
        {id: '46', name: '海南', value: randomData()},
        {id: '50', name: '重庆', value: randomData()},
        {id: '51', name: '四川', value: randomData()},
        {id: '52', name: '贵州', value: randomData()},
        {id: '53', name: '云南', value: randomData()},
        {id: '54', name: '西藏', value: randomData()},
        {id: '61', name: '陕西', value: randomData()},
        {id: '62', name: '甘肃', value: randomData()},
        {id: '63', name: '青海', value: randomData()},
        {id: '64', name: '宁夏', value: randomData()},
        {id: '65', name: '新疆', value: randomData()},
        {id: '71', name: '台湾', value: randomData()},
        {id: '81', name: '香港', value: randomData()},
        {id: '82', name: '澳门', value: randomData()},
        {id: '83', name: '南海诸岛', value: "0.0"},];


    function getProId(name) {
        for (let i in m) {
            if (m[i].name == name) {
                //console.log(m[i])
                return m[i].id;
            }
        }
    }

    function getCityId(geoJson, name) {
        for (let i in geoJson.features) {
            if (geoJson.features[i].properties.name == name) {
                return geoJson.features[i].properties.id + "00";
            }
        }
    }

    var optionMap = {
        backgroundColor: '#ecf0f5',
        //image:img,

        title: {
            text: '全国地图大数据',
            subtext: '',
            x: 'center'
        },
        // tooltip: {
        //     trigger: 'item'
        // },

        //左侧小导航图标
        visualMap: {
            show: true,
            x: 'left',
            y: 'center',
            splitList: [
                {start: 500, end: 600}, {start: 400, end: 500},
                {start: 300, end: 400}, {start: 200, end: 300},
                {start: 100, end: 200}, {start: 0, end: 100},
            ],
            color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
        },
        itemStyle: {
            normal: {
                borderWidth: 5, //区域边框宽度
                borderColor: '#009fe8', //区域边框颜色
                areaColor: "#ffefd5", //区域颜色
            },
            emphasis: {//鼠标滑过地图高亮的相关设置
                borderWidth: .5,
                borderColor: '#4b0082',
                areaColor: "#ffdead",
            }
        },

        //配置属性
        series: [{
            name: '用电量',
            type: 'map',
            mapType: 'china',
            roam: true,
            //roam: false,
            aspectScale: 0.75,//这个参数用于 scale 地图的长宽比。最终的 aspect 的计算方式是：geoBoundingRect.width / geoBoundingRect.height * aspectScale
            zoom: 1.2,//当前视角的缩放比例。

            label: {
                normal: {
                    show: true,  //省份名称

                },
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        formatter: function (par) {
                            return par.name
                            // return par.name + '\n' + par.value
                        }
                    },
                    borderWidth: 0
                },
                emphasis: {
                    label: {
                        show: true
                    },
                    areaColor: 'rgb(213, 214, 79)',
                }
            },

            //data: mapList  //数据
            data: m,  //数据
            //data: mapList  //数据
            //clickable:false

        }]
    };
    //初始化echarts实例#ecf0f5
    myChart.on('click', function (params) {

        $('#main').hide();
        $('#main1').show();
        //$('#main_hist').show();
        console.log(params.data.name + ':' + params.data.id)
        // 柱状图

        //myChart.clear();
        //$('main1').show();
        function get_cap_id() {
            captial_id = params.data.id;
            return captial_id
        }

        myChart.showLoading();
        // $.getJSON("{{ url_for('static', filename='json/geometryProvince/') }}" + getProId(params.name) + '.js',
        $.getJSON("/static/json/geometryProvince/" + getProId(params.name) + '.js',
            function (geoJson) {

                myChart.hideLoading();
                echarts.registerMap(getProId(params.name), geoJson);
                myChart1.setOption(option = {
                    backgroundColor: "gray",
                    tooltip: {
                        show: true,
                        formatter: function (params, ticket, callback) {
                            return params.seriesName + '<br />' + params.name + '：' + params.value
                        }
                    },

                    title: {
                        text: params.name,
                        subtext: '',
                        x: 'center'
                    },
                    //visualMap: {
                    //    min: 0,
                    //    max: 10,
                    //    text: ['High', 'Low'],
                    //    seriesIndex: [1],                   //必须设置此项,否则会覆盖标注点颜色
                    //    realtime: true,
                    //    calculable: true,
                    //    inRange: {
                    //        color: ['lightskyblue', 'yellow', 'orangered']
                    //    },
                    //    textStyle: {
                    //        color: 'lime'
                    //    }
                    //},
                    geo: {
                        map: getProId(params.name),
                        roam: true, // 地图是否缩放

                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#3ebee6'                        //省份字体颜色
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'red',
                                //borderColor: 'rgba(0, 0, 0, 0.2)'
                                normal: {
                                    label: {
                                        show: true,
                                        formatter: function (pars) {
                                            return pars.name + '\n' + pars.value
                                        }
                                    },
                                },
                            },
                            emphasis: {
                                areaColor: null,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: 'blue'
                                //shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },

                    //clickable: false,
                    series: [{
                        name: "",
                        roam: false,
                        zoom: 1.25,
                        aspectScale: 0.75,
                        geoIndex: 10,
                        type: 'map',
                        coordinateSystem: 'geo',
                        //clickable:false // 取消点击事件
                        //data: m1,

                    }]
                });
                //myChart.on('click',eConsole);

                myChart1.on('click', function (params) {
                    $(function () {
                        f()
                    })
                    alert("没有啦")
                    //console.log("感受到巴两三年大声道")
                    //alert('your code');
                    //$('#main').hide()
                    // $("#main_hist").hide();
                    // $("#line > #line_h3 > #p1").html(params.name + ":")
                    // $("#line > #line_h3 > #p2").html("平均值" + ":" + randomData())
                    // $("#line > #line_h3 > #p3").html("最大值" + ":" + randomData())
                    // $("#line > #line_h3 > #p4").html("最小值" + ":" + randomData())
                    // $("#line > #line_h3").attr("class", "selt")
                    // $("#line_h3").show();
                    // $("#main2").show();

                    var city_name = params.name;
                    console.log(get_cap_id());
                    console.log(params.name);


                    // 折线图
                    // $.ajax({
                    //     url: "{{ url_for('t.data_show') }}",
                    //     data: {city_name: params.name, captial_id: get_cap_id()},
                    //     //url: "/t/data_show/",
                    //     success: function (data) {
                    //         console.log(data)
                    //         var myChart2 = echarts.init(document.getElementById('main2'));
                    //         var option2 = {
                    //             //backgroundColor: '#12cf96',
                    //             grid: {
                    //                 left: '7%',
                    //                 right: '7%',
                    //                 bottom: '3%',
                    //                 containLabel: true
                    //             },
                    //             title: {
                    //                 text: '数据展示',
                    //             },
                    //
                    //             tooltip: {
                    //
                    //                 trigger: 'axis',
                    //                 axisPointer: {
                    //                     type: 'cross'
                    //                 },
                    //
                    //             },
                    //             name: "seriesName",
                    //             xAxis: {
                    //                 name: '日期',
                    //                 type: 'category',
                    //                 axisLabel: {
                    //                     interval: 0,
                    //                     rotate: 295
                    //                 },
                    //                 data: data['X']
                    //             },
                    //             yAxis: {
                    //                 name: '数量',
                    //
                    //                 type: 'value',
                    //                 //axisLabel: {
                    //                 //    interval: 0,
                    //                 //    rotate: 25
                    //                 //}
                    //             },
                    //             series: [{
                    //                 data: data['Y'],
                    //                 type: 'line',
                    //                 lineStyle: {
                    //                     width: 2 //default value:2,
                    //
                    //                 },
                    //
                    //             }]
                    //         };
                    //         // 使用刚指定的配置项和数据显示图表。
                    //         myChart2.setOption(option2)
                    //
                    //
                    //     }
                    // });

                    return params.name

                });

            });

    });


    //使用制定的配置项和数据显示图表
    myChart.setOption(optionMap);

}

$(function () {
    china_big_map();
});