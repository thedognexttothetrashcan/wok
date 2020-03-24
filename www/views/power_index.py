from flask import Flask, Blueprint, render_template, jsonify, request

from www.model import all_ind_pow_data_show

pow_index = Blueprint('pow_index', __name__, url_prefix='')

@pow_index.route('/')
def power_index():
    return render_template('{}/power_index.html'.format('show'),
                           menu_status={'c_menu': 'pow_index', 'p_menu': 'dataDig'},
                           current_industry='show')

