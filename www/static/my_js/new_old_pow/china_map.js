function china_big_map() {
// 获取url参数
    (function ($) {
        $.getUrlParam = function (name, aTarget) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = aTarget.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    })(jQuery);

// base64编码
    function Base64() {
        // private property
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        // public method for encoding
        this.encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        }

        // public method for decoding
        this.decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        }

        // private method for UTF-8 encoding
        _utf8_encode = function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        }

        // private method for UTF-8 decoding
        _utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }

    var mapList = [
        {
            "id": "11",
            "name": "北京市"
        },
        {
            "id": "12",
            "name": "天津市"
        },
        {
            "id": "13",
            "name": "河北省"
        },
        {
            "id": "14",
            "name": "山西省"
        },
        {
            "id": "15",
            "name": "内蒙古自治区"
        },
        {
            "id": "21",
            "name": "辽宁省"
        },
        {
            "id": "22",
            "name": "吉林省"
        },
        {
            "id": "23",
            "name": "黑龙江省"
        },
        {
            "id": "31",
            "name": "上海市"
        },
        {
            "id": "32",
            "name": "江苏省"
        },
        {
            "id": "33",
            "name": "浙江省"
        },
        {
            "id": "34",
            "name": "安徽省"
        },
        {
            "id": "35",
            "name": "福建省"

        },
        {
            "id": "36",
            "name": "江西省"
        },
        {
            "id": "37",
            "name": "山东省"
        },
        {
            "id": "41",
            "name": "河南省"
        },
        {
            "id": "42",
            "name": "湖北省"
        },
        {
            "id": "43",
            "name": "湖南省"
        },
        {
            "id": "44",
            "name": "广东省"
        },
        {
            "id": "45",
            "name": "广西壮族自治区"
        },
        {
            "id": "46",
            "name": "海南省"
        },
        {
            "id": "50",
            "name": "重庆市"
        },
        {
            "id": "51",
            "name": "四川省"
        },
        {
            "id": "52",
            "name": "贵州省"
        },
        {
            "id": "53",
            "name": "云南省"
        },
        {
            "id": "54",
            "name": "西藏自治区"
        },
        {
            "id": "61",
            "name": "陕西省"
        },
        {
            "id": "62",
            "name": "甘肃省"
        },
        {
            "id": "63",
            "name": "青海省"
        },
        {
            "id": "64",
            "name": "宁夏回族自治区"
        },
        {
            "id": "65",
            "name": "新疆维吾尔自治区"
        },
        {
            "id": "71",
            "name": "台湾省"
        },
        {
            "id": "81",
            "name": "香港特别行政区"
        },
        {
            "id": "82",
            "name": "澳门特别行政区"
        }
    ];

    function getProId(name) {
        for (let i in mapList) {
            if (mapList[i].name == name) {
                return mapList[i].id;
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

    function randomData() {
        return Math.round(Math.random() * 500);
    }

    var mydata1 = [
        {name: '北京', value: '100'}, {name: '天津', value: randomData()},
        {name: '上海', value: randomData()}, {name: '重庆', value: randomData()},
        {name: '河北', value: randomData()}, {name: '河南', value: randomData()},
        {name: '云南', value: randomData()}, {name: '辽宁', value: randomData()},
        {name: '黑龙江', value: randomData()}, {name: '湖南', value: randomData()},
        {name: '安徽', value: randomData()}, {name: '山东', value: randomData()},
        {name: '新疆', value: randomData()}, {name: '江苏', value: randomData()},
        {name: '浙江', value: randomData()}, {name: '江西', value: randomData()},
        {name: '湖北', value: randomData()}, {name: '广西', value: randomData()},
        {name: '甘肃', value: randomData()}, {name: '山西', value: randomData()},
        {name: '内蒙古', value: randomData()}, {name: '陕西', value: randomData()},
        {name: '吉林', value: randomData()}, {name: '福建', value: randomData()},
        {name: '贵州', value: randomData()}, {name: '广东', value: randomData()},
        {name: '青海', value: randomData()}, {name: '西藏', value: randomData()},
        {name: '四川', value: randomData()}, {name: '宁夏', value: randomData()},
        {name: '海南', value: randomData()}, {name: '台湾', value: randomData()},
        {name: '香港', value: randomData()}, {name: '澳门', value: randomData()}
    ];


    var myChart_china = echarts.init(document.getElementById("main"));
    var myChart_china1 = echarts.init(document.getElementById("main1"));
    var myChart_china2 = echarts.init(document.getElementById("main2"));
    var param = $.getUrlParam('param', self);

    myChart_china.showLoading();
    myChart_china.hideLoading();
    echarts.registerMap('china', chinaJson);
    myChart_china.setOption(option = {
        visualMap: {
            min: 0,
            max: 10,
            text: ['High', 'Low'],
            seriesIndex: [1],                   //必须设置此项,否则会覆盖标注点颜色
            realtime: true,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            },
            textStyle: {
                color: 'lime'
            }
        },
        geo: {
            map: 'china',
            roam: true,
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
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis: {
                    areaColor: null,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        series: [
            {
                roam: true,
                type: 'scatter',
                coordinateSystem: 'geo',

            }
        ]
    });
    myChart_china.on('click', function (params) {
        console.log(params.name + " >>>>>>>>> 第一级")
        var name = params.name;
        // window.location.href = `{{ url_for('new_old_pow.t3_index1') }}?param=${new Base64().encode(params.name)}&catalog=province`;
        // window.location.href = `http://127.0.0.1:9000/new_old_pow/index1/?param=${new Base64().encode(params.name)}&catalog=province`;

        $('#main').hide();
        $('#main1').show();

        function get_cap_id() {
            captial_id = params.data.id;
            return captial_id
        }

        myChart_china1.showLoading();
        // "static/json/getmetryCouties/" + id + '.js',
        // $.getJSON("{{ url_for('static', filename='json/geometryProvince/') }}" + getProId(params.name) + '.js',
        $.getJSON("/static/json/geometryProvince/" + getProId(name) + '.js', function (geoJson) {
            myChart_china1.hideLoading();
            echarts.registerMap(getProId(params.name), geoJson);
            myChart_china1.setOption(option = {
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
                // visualMap: {
                //     min: 0,
                //     max: 10,
                //     text: ['High', 'Low'],
                //     seriesIndex: [1],                   //必须设置此项,否则会覆盖标注点颜色
                //     realtime: true,
                //     calculable: true,
                //     inRange: {
                //         color: ['lightskyblue', 'yellow', 'orangered']
                //     },
                //     textStyle: {
                //         color: 'lime'
                //     }
                // },
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
                    //source_data: m1,

                }]
            });
            //myChart_china.on('click',eConsole);
            console.log('第二级>>>>>>>>>>>' + params.name)
            myChart_china1.on('click', function (params) {
                // alert('TODO')


                alert('城市名字：' + params.name, +geoJson)
                console.log(getCityId(geoJson))
                console.log(geoJson)
                $.getJSON("http://127.0.0.1:9000/t/get_json?id=" + getCityId(geoJson, params.name), function (data) {
                    // $.getJSON("static/json/geotryCouties/"+getCityId(geoJson,params.name)+'.js',function (source_data) {
                    console.log("source_data------------------");
                    console.log(data);
                    foo(getCityId(geoJson, params.name), data)
                })


                // $(function () {
                //     f()
                // TODO
                // })
                // alert(geoJson)
                // console.log(p)
                $('#main1').hide();
                $('#main2').show();
                // foo(getCityId(geoJson, params.name))


            });

            //     var city_name = params.name;
            //     // console.log(get_cap_id());
            //     console.log(params.name);
            //
            //
            //     // 折线图
            //     // $.ajax({
            //     //     url: "{{ url_for('t.data_show') }}",
            //     //     source_data: {city_name: params.name, captial_id: get_cap_id()},
            //     //     //url: "/t/data_show/",
            //     //     success: function (source_data) {
            //     //         console.log(source_data)
            //     //         var myChart_china2 = echarts.init(document.getElementById('main2'));
            //     //         var option2 = {
            //     //             //backgroundColor: '#12cf96',
            //     //             grid: {
            //     //                 left: '7%',
            //     //                 right: '7%',
            //     //                 bottom: '3%',
            //     //                 containLabel: true
            //     //             },
            //     //             title: {
            //     //                 text: '数据展示',
            //     //             },
            //     //
            //     //             tooltip: {
            //     //
            //     //                 trigger: 'axis',
            //     //                 axisPointer: {
            //     //                     type: 'cross'
            //     //                 },
            //     //
            //     //             },
            //     //             name: "seriesName",
            //     //             xAxis: {
            //     //                 name: '日期',
            //     //                 type: 'category',
            //     //                 axisLabel: {
            //     //                     interval: 0,
            //     //                     rotate: 295
            //     //                 },
            //     //                 source_data: source_data['X']
            //     //             },
            //     //             yAxis: {
            //     //                 name: '数量',
            //     //
            //     //                 type: 'value',
            //     //                 //axisLabel: {
            //     //                 //    interval: 0,
            //     //                 //    rotate: 25
            //     //                 //}
            //     //             },
            //     //             series: [{
            //     //                 source_data: source_data['Y'],
            //     //                 type: 'line',
            //     //                 lineStyle: {
            //     //                     width: 2 //default value:2,
            //     //
            //     //                 },
            //     //
            //     //             }]
            //     //         };
            //     //         // 使用刚指定的配置项和数据显示图表。
            //     //         myChart_china2.setOption(option2)
            //     //
            //     //
            //     //     }
            //     // });
            //
            //     return params.name
            //
            // });

        });

        // 第三级>>>>>>>>>>
        function foo(name, data) {
            // $.getJSON("static/json/getmetryCouties/" + id + '.js', function (geoJson) {

            myChart_china2.hideLoading();
            // myChart_china2.showLoading();

            echarts.registerMap(name, data);
            myChart_china2.setOption(option = {
                backgroundColor: "red",
                tooltip: {
                    show: true,
                    formatter: function (params, ticket, callback) {
                        return params.seriesName + '<br />' + params.name + '：' + params.value
                    }
                },

                title: {
                    text: name,
                    subtext: '',
                    x: 'center'
                },
                visualMap: {
                    min: 0,
                    max: 10,
                    text: ['High', 'Low'],
                    seriesIndex: [1],                   //必须设置此项,否则会覆盖标注点颜色
                    realtime: true,
                    calculable: true,
                    inRange: {
                        color: ['lightskyblue', 'yellow', 'orangered']
                    },
                    textStyle: {
                        color: 'lime'
                    }
                },
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
                    //source_data: m1,

                }]
            });
            // })
        }
    });

}

$(function () {
    china_big_map();
});


// function china_big_map() {
//     var myChart_china = echarts.init(document.getElementById('main'));
//     var myChart_china1 = echarts.init(document.getElementById('main1'));
//
//     //var myChart_china1 = echarts.init(document.getElementById('main1'));
//
//     //echarts.registerMap('china', chinaJson);
//
//     function randomData() {
//         return Math.round(Math.random() * 600);
//     }
//
//
//     var m = [{id: '11', name: '北京', value: randomData()},
//         {id: '12', name: '天津', value: randomData()},
//         {id: '13', name: '河北', value: randomData()},
//         {id: '14', name: '山西', value: 222},
//         {id: '15', name: '内蒙古', value: randomData()},
//         {id: '21', name: '辽宁', value: randomData()},
//         {id: '22', name: '吉林', value: randomData()},
//         {id: '23', name: '黑龙江', value: 111},
//         {id: '31', name: '上海', value: randomData()},
//         {id: '32', name: '江苏', value: 444},
//         {id: '33', name: '浙江', value: randomData()},
//         {id: '34', name: '安徽', value: randomData()},
//         {id: '35', name: '福建', value: randomData()},
//         {id: '36', name: '江西', value: randomData()},
//         {id: '37', name: '山东', value: randomData()},
//         {id: '41', name: '河南', value: randomData()},
//         {id: '42', name: '湖北', value: randomData()},
//         {id: '43', name: '湖南', value: randomData()},
//         {id: '44', name: '广东', value: randomData()},
//         {id: '45', name: '广西', value: randomData()},
//         {id: '46', name: '海南', value: randomData()},
//         {id: '50', name: '重庆', value: randomData()},
//         {id: '51', name: '四川', value: randomData()},
//         {id: '52', name: '贵州', value: randomData()},
//         {id: '53', name: '云南', value: randomData()},
//         {id: '54', name: '西藏', value: randomData()},
//         {id: '61', name: '陕西', value: randomData()},
//         {id: '62', name: '甘肃', value: randomData()},
//         {id: '63', name: '青海', value: randomData()},
//         {id: '64', name: '宁夏', value: randomData()},
//         {id: '65', name: '新疆', value: randomData()},
//         {id: '71', name: '台湾', value: randomData()},
//         {id: '81', name: '香港', value: randomData()},
//         {id: '82', name: '澳门', value: randomData()},
//         {id: '83', name: '南海诸岛', value: "0.0"},];
//
//
//     function getProId(name) {
//         for (let i in m) {
//             if (m[i].name == name) {
//                 //console.log(m[i])
//                 return m[i].id;
//             }
//         }
//     }
//
//     function getCityId(geoJson, name) {
//         for (let i in geoJson.features) {
//             if (geoJson.features[i].properties.name == name) {
//                 return geoJson.features[i].properties.id + "00";
//             }
//         }
//     }
//
//     var optionMap = {
//         backgroundColor: '#ecf0f5',
//         //image:img,
//
//         title: {
//             text: '全国地图大数据',
//             subtext: '',
//             x: 'center'
//         },
//         // tooltip: {
//         //     trigger: 'item'
//         // },
//
//         //左侧小导航图标
//         visualMap: {
//             show: true,
//             x: 'left',
//             y: 'center',
//             splitList: [
//                 {start: 500, end: 600}, {start: 400, end: 500},
//                 {start: 300, end: 400}, {start: 200, end: 300},
//                 {start: 100, end: 200}, {start: 0, end: 100},
//             ],
//             color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
//         },
//         itemStyle: {
//             normal: {
//                 borderWidth: 5, //区域边框宽度
//                 borderColor: '#009fe8', //区域边框颜色
//                 areaColor: "#ffefd5", //区域颜色
//             },
//             emphasis: {//鼠标滑过地图高亮的相关设置
//                 borderWidth: .5,
//                 borderColor: '#4b0082',
//                 areaColor: "#ffdead",
//             }
//         },
//
//         //配置属性
//         series: [{
//             name: '用电量',
//             type: 'map',
//             mapType: 'china',
//             roam: true,
//             //roam: false,
//             aspectScale: 0.75,//这个参数用于 scale 地图的长宽比。最终的 aspect 的计算方式是：geoBoundingRect.width / geoBoundingRect.height * aspectScale
//             zoom: 1.2,//当前视角的缩放比例。
//
//             label: {
//                 normal: {
//                     show: true,  //省份名称
//
//                 },
//                 emphasis: {
//                     show: false
//                 }
//             },
//             itemStyle: {
//                 normal: {
//                     label: {
//                         show: false,
//                         formatter: function (par) {
//                             return par.name
//                             // return par.name + '\n' + par.value
//                         }
//                     },
//                     borderWidth: 0
//                 },
//                 emphasis: {
//                     label: {
//                         show: true
//                     },
//                     areaColor: 'rgb(213, 214, 79)',
//                 }
//             },
//
//             //source_data: mapList  //数据
//             source_data: m,  //数据
//             //source_data: mapList  //数据
//             //clickable:false
//
//         }]
//     };
//     //初始化echarts实例#ecf0f5
//     myChart_china.on('click', function (params) {
//
//         $('#main').hide();
//         $('#main1').show();
//         //$('#main_hist').show();
//         console.log(params.source_data.name + ':' + params.source_data.id)
//         // 柱状图
//
//         //myChart_china.clear();
//         //$('main1').show();
//         function get_cap_id() {
//             captial_id = params.source_data.id;
//             return captial_id
//         }
//
//         myChart_china.showLoading();
//         // $.getJSON("{{ url_for('static', filename='json/geometryProvince/') }}" + getProId(params.name) + '.js',
//         $.getJSON("/static/json/geometryProvince/" + getProId(params.name) + '.js',
//             function (geoJson) {
//
//                 myChart_china.hideLoading();
//                 echarts.registerMap(getProId(params.name), geoJson);
//                 myChart_china1.setOption(option = {
//                     backgroundColor: "gray",
//                     tooltip: {
//                         show: true,
//                         formatter: function (params, ticket, callback) {
//                             return params.seriesName + '<br />' + params.name + '：' + params.value
//                         }
//                     },
//
//                     title: {
//                         text: params.name,
//                         subtext: '',
//                         x: 'center'
//                     },
//                     //visualMap: {
//                     //    min: 0,
//                     //    max: 10,
//                     //    text: ['High', 'Low'],
//                     //    seriesIndex: [1],                   //必须设置此项,否则会覆盖标注点颜色
//                     //    realtime: true,
//                     //    calculable: true,
//                     //    inRange: {
//                     //        color: ['lightskyblue', 'yellow', 'orangered']
//                     //    },
//                     //    textStyle: {
//                     //        color: 'lime'
//                     //    }
//                     //},
//                     geo: {
//                         map: getProId(params.name),
//                         roam: true, // 地图是否缩放
//
//                         label: {
//                             normal: {
//                                 show: true,
//                                 textStyle: {
//                                     color: '#3ebee6'                        //省份字体颜色
//                                 }
//                             }
//                         },
//                         itemStyle: {
//                             normal: {
//                                 borderColor: 'red',
//                                 //borderColor: 'rgba(0, 0, 0, 0.2)'
//                                 normal: {
//                                     label: {
//                                         show: true,
//                                         formatter: function (pars) {
//                                             return pars.name + '\n' + pars.value
//                                         }
//                                     },
//                                 },
//                             },
//                             emphasis: {
//                                 areaColor: null,
//                                 shadowOffsetX: 0,
//                                 shadowOffsetY: 0,
//                                 shadowBlur: 20,
//                                 borderWidth: 0,
//                                 shadowColor: 'blue'
//                                 //shadowColor: 'rgba(0, 0, 0, 0.5)'
//                             }
//                         }
//                     },
//
//                     //clickable: false,
//                     series: [{
//                         name: "",
//                         roam: false,
//                         zoom: 1.25,
//                         aspectScale: 0.75,
//                         geoIndex: 10,
//                         type: 'map',
//                         coordinateSystem: 'geo',
//                         //clickable:false // 取消点击事件
//                         //source_data: m1,
//
//                     }]
//                 });
//                 //myChart_china.on('click',eConsole);
//
//                 myChart_china1.on('click', function (params) {
//                     $(function () {
//                         f()
//                     })
//                     alert("没有啦")
//                     //console.log("感受到巴两三年大声道")
//                     //alert('your code');
//                     //$('#main').hide()
//                     // $("#main_hist").hide();
//                     // $("#line > #line_h3 > #p1").html(params.name + ":")
//                     // $("#line > #line_h3 > #p2").html("平均值" + ":" + randomData())
//                     // $("#line > #line_h3 > #p3").html("最大值" + ":" + randomData())
//                     // $("#line > #line_h3 > #p4").html("最小值" + ":" + randomData())
//                     // $("#line > #line_h3").attr("class", "selt")
//                     // $("#line_h3").show();
//                     // $("#main2").show();
//
//                     var city_name = params.name;
//                     console.log(get_cap_id());
//                     console.log(params.name);
//
//
//                     // 折线图
//                     // $.ajax({
//                     //     url: "{{ url_for('t.data_show') }}",
//                     //     source_data: {city_name: params.name, captial_id: get_cap_id()},
//                     //     //url: "/t/data_show/",
//                     //     success: function (source_data) {
//                     //         console.log(source_data)
//                     //         var myChart_china2 = echarts.init(document.getElementById('main2'));
//                     //         var option2 = {
//                     //             //backgroundColor: '#12cf96',
//                     //             grid: {
//                     //                 left: '7%',
//                     //                 right: '7%',
//                     //                 bottom: '3%',
//                     //                 containLabel: true
//                     //             },
//                     //             title: {
//                     //                 text: '数据展示',
//                     //             },
//                     //
//                     //             tooltip: {
//                     //
//                     //                 trigger: 'axis',
//                     //                 axisPointer: {
//                     //                     type: 'cross'
//                     //                 },
//                     //
//                     //             },
//                     //             name: "seriesName",
//                     //             xAxis: {
//                     //                 name: '日期',
//                     //                 type: 'category',
//                     //                 axisLabel: {
//                     //                     interval: 0,
//                     //                     rotate: 295
//                     //                 },
//                     //                 source_data: source_data['X']
//                     //             },
//                     //             yAxis: {
//                     //                 name: '数量',
//                     //
//                     //                 type: 'value',
//                     //                 //axisLabel: {
//                     //                 //    interval: 0,
//                     //                 //    rotate: 25
//                     //                 //}
//                     //             },
//                     //             series: [{
//                     //                 source_data: source_data['Y'],
//                     //                 type: 'line',
//                     //                 lineStyle: {
//                     //                     width: 2 //default value:2,
//                     //
//                     //                 },
//                     //
//                     //             }]
//                     //         };
//                     //         // 使用刚指定的配置项和数据显示图表。
//                     //         myChart_china2.setOption(option2)
//                     //
//                     //
//                     //     }
//                     // });
//
//                     return params.name
//
//                 });
//
//             });
//
//     });


//使用制定的配置项和数据显示图表
// myChart_china.setOption(optionMap);

// }

// $(function () {
//     china_big_map();
// });
