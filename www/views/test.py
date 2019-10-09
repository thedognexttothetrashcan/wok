from flask import Blueprint,render_template,jsonify,request

from www.model.t_show import get_data

t = Blueprint('t',__name__,url_prefix='/t')

@t.route('/t/')
def index():
    return render_template('{}/reputation/viewpoint_index.html'.format('show'),
                           menu_status={'c_menu': 'demo_show', 'p_menu': 'reputation'},
                           current_industry='show')


@t.route('/data_show/')
def data_show():
    print('*'*100)
    # print(get_data())
    print(request.args.get('city_name'))
    print(request.args.get('captial_id'))
    print('*'*100)

    return jsonify(get_data())


@t.route('/change/')
def change():
    return "<h1><span style={'color':'red'}>hello</span> <span>Flask</span></h1>"
