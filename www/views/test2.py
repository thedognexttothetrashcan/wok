from flask import Blueprint, render_template

t1 = Blueprint("t1",__name__,url_prefix='/t1/')


@t1.route('/')
def t1_index():
    return render_template('{}/china_test.html'.format('show'),
                           menu_status={'c_menu': 'kw_discovery', 'p_menu': 'dataDig'},
                           current_industry='show')
# return render_template('{}/dig_data.html'.format('show'),
#                            menu_status={'c_menu': 'kw_discovery', 'p_menu': 'dataDig'},
#                            current_industry='show')








# @t1.route('/demo/')
# def t1_demo():
#     return render_template('{}/demo.html'.format('show'),
#                            menu_status={'c_menu': 'kw_discovery', 'p_menu': 'dataDig'},
#                            current_industry='show')


# install_singular
# ChenDe_travel_2004-2018
# elec_singular.csv

# sn_input


# 每个月具体指 单位亿元 到月度

# 装节容量 不能小于0  不能
# 配出两个指数
# 梳理代码
# 全国行业动能可视化地图

# 数据规范





