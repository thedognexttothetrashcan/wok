from flask import Flask, Blueprint, render_template, jsonify, request

from www.model import fu_zhou_data as all_ind_pow_data_show


fu_zhou_new_old_pow = Blueprint('fu_zhou_new_old_pow', __name__, url_prefix='/fu_zhou_new_old_pow')


@fu_zhou_new_old_pow.route('/index/')
def t3_index():
    return render_template('{}/show_data.html'.format('show'),
                           menu_status={'c_menu': 'demo_show', 'p_menu': 'reputation'},
                           current_industry='show')


@fu_zhou_new_old_pow.route('/index1/')
def t3_index1():
    return render_template('{}/power_fu_zhou_show.html'.format('show'),
                           menu_status={'c_menu': 'fu_zhou', 'p_menu': 'dataDig'},
                           current_industry='show')


# 新旧行业占比
@fu_zhou_new_old_pow.route('/power_proportion/')
def power_proportion():
    year = request.args.get('year')

    data = all_ind_pow_data_show.get_all_pow_consum(year)
    # print(source_data)

    return jsonify({"msg": 200, "data": data})


# 新行业排名
@fu_zhou_new_old_pow.route('/new_pow_top10/')
def new_ind_top10():
    year = request.args.get('year')
    tag = request.args.get('tag')
    data = all_ind_pow_data_show.get_new_ind_top10(year, tag)
    # print('*' * 100)
    # print(source_data)
    # print(tag)
    # print('*' * 100)
    return jsonify({'data': data, 'msg': 200})


# 新动能行业用电量指数
@fu_zhou_new_old_pow.route('new_old_ind_index')
def new_ind_index():
    data = all_ind_pow_data_show.get_new_ind_index()
    return jsonify({'data': data, 'msg': 200})


# 旧动能行业用电量指数
@fu_zhou_new_old_pow.route('old_ind_index')
def old_ind_index():
    pass


# 新旧行业增速
@fu_zhou_new_old_pow.route('new_old_ind_speed_up')
def use_pow_speed_up():
    data = all_ind_pow_data_show.get_pow_speed()
    return jsonify({'msg': 200, 'data': data})
