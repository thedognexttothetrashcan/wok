from flask import Flask, Blueprint, render_template, jsonify, request

pow_tour = Blueprint('pow_tour', __name__, url_prefix='/pow_tour')


@pow_tour.route('/index/')
def tour_index():
    return render_template('{}/power_tour_index.html'.format('show'),
                           menu_status={'c_menu': 'tour', 'p_menu': 'dataDig'},
                           current_industry='show')

