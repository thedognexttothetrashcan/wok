from flask import Blueprint, render_template

t1 = Blueprint("t1",__name__,url_prefix='/t1/')


@t1.route('/')
def t1_index():
    return render_template('{}/dig_data.html'.format('show'),
                           menu_status={'c_menu': 'kw_discovery', 'p_menu': 'dataDig'},
                           current_industry='show')


# @t1.route('/demo/')
# def t1_demo():
#     return render_template('{}/demo.html'.format('show'),
#                            menu_status={'c_menu': 'kw_discovery', 'p_menu': 'dataDig'},
#                            current_industry='show')



