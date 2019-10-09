from functools import wraps
from time import sleep
import pymysql


def try_again(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        count = 1
        while count < 5:
            try:
                return func(*args, **kwargs)

            except pymysql.err.OperationalError as e:
                if count == 4:
                    raise e
                sleep(3)
                print('try agian {}...'.format(count))
                count = count + 1

    return wrapper


def handle_error(func):
    @wraps(func)
    def wrapper(obj, *args, **kwargs):
        try:
            obj.open_con()
            return func(obj, *args, **kwargs)

        except Exception as e:
            raise e
        finally:

            obj.close_con()

    return wrapper