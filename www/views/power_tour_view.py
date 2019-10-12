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
    # print(data)
    return jsonify({"msg": 200, "data": data})


# 承德旅游用电量占比
@pow_tour.route('/tour_speed/')
def tour_speed():
    data = cheng_de_tour_index.get_cd_tour_speed()
    # print(data)
    # return jsonify({"msg": 200, "data": data})
    return jsonify({'msg':200,'data':''})










