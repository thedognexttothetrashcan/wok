from json import dumps

from flask import Flask, Blueprint, render_template, jsonify, request

from www.model import cheng_de_tour_index

pow_tour = Blueprint('pow_tour', __name__, url_prefix='/pow_tour')



@pow_tour.route('/index/')
def tour_index():
    return render_template('{}/power_tour_index.html'.format('show'),
                           menu_status={'c_menu': 'tour', 'p_menu': 'dataDig'},
                           current_industry='show')



# 承德旅游用电量占比
@pow_tour.route('/tour_proportion/')
def tour_proportion():
    year = request.args.get('year')

    data = cheng_de_tour_index.get_cd_proportion(year)
    # print(source_data)
    return jsonify({"msg": 200, "data": data})


# 承德旅游用电量增速
@pow_tour.route('/tour_speed/')
def tour_speed():
    data = cheng_de_tour_index.get_cd_tour_speed()
    # print(source_data)
    # return jsonify({"msg": 200, "source_data": source_data})
    # return jsonify({'msg':200,'source_data':''})
    return dumps({"msg": 200, "data": data})


# 承德旅游用电量需求增速
@pow_tour.route('/tour_need_speed/')
def tour_need_speed():
    data = cheng_de_tour_index.get_cd_need_speed()
    # print(source_data)
    return dumps({"msg": 200, "data": data})


# 承德旅游发展指数
@pow_tour.route('/tour_dev_index/')
def tour_dev_index():
    data = cheng_de_tour_index.get_cd_tour_index()
    # print(source_data)
    # return jsonify({"msg": 200, "source_data": source_data})
    return jsonify({'msg':200,'data':data})









