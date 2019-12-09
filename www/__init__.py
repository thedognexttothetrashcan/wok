from flask import Flask

from www.views import test, test2, industry_power_view
from www.views import power_tour_view
from www.views import fu_zhou_inds_pow_view


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        app.config.from_pyfile('../config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    app.register_blueprint(test.t)
    app.register_blueprint(test2.t1)
    app.register_blueprint(industry_power_view.new_old_pow)
    app.register_blueprint(power_tour_view.pow_tour)
    app.register_blueprint(fu_zhou_inds_pow_view.fu_zhou_new_old_pow)

    return app