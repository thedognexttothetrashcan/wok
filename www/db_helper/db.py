import pymysql
from DBUtils.PooledDB import PooledDB
from sqlalchemy import create_engine
from .decrator import try_again, handle_error
# import MySQLdb


class Db:
    def __init__(self, host=None, port=3306, user=None, password=None, Db=None):

        self.host = host
        self.port = port
        self.user = user
        self.password = password
        self.Db = Db
        self.pool = PooledDB(creator=pymysql, host=host, port=port, user=user, passwd=password)
        # self.pool = PooledDB(MySQLdb, 5, host='localhost', user='root', passwd='pwd', db='myDB', port=3306)

    def __enter__(self):
        self.con = self.pool.connection()
        self.cursor = self.con.cursor()

    def __exit__(self, type, value, trace):

        self.cursor.close()
        self.con.close()

    @handle_error
    @try_again  # 先执行
    def get_list(self, sql, params=None):
        if not self.Db is None:
            self.cursor.execute('use {};'.format(self.Db))
        self.cursor.execute(sql, params)
        return self.cursor.fetchall()

    @handle_error
    @try_again  # 先执行
    def get_one(self, sql, params=None):
        self.cursor.execute(sql, params)
        return self.cursor.fetchone()

    def get_many_by_many(self, sql, params=None, size=100):
        self.open_con()
        self.cursor.execute(sql, params)

        items = self.cursor.fetchmany(size)
        while items:
            yield items
            items = self.cursor.fetchmany(size)

        self.close_con()

    @handle_error
    @try_again
    def execute_sql(self, sql, params):

        self.cursor.execute(sql, params)
        self.con.commit()
        id = self.cursor.lastrowid
        return id

    @handle_error
    @try_again
    def execute_many_sql(self, sql, params):
        self.cursor.executemany(sql, params)
        self.con.commit()

    @handle_error
    @try_again
    def engine(self, db=None):
        conn = create_engine("mysql+pymysql://%s:%s@%s:%s/%s" % (self.user, self.password, self.host, self.port, db))
        return conn

    def open_con(self):
        self.con = self.pool.connection()
        self.cursor = self.con.cursor()

    def close_con(self):
        if hasattr(self, 'con'):
            self.cursor.close()
            self.con.close()




