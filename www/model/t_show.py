import json

import pandas as pd
import numpy as np

from www.db_helper import db_156
# from www.db_helper import mc


def get_data():
    data = pd.read_csv('/Users/xingwenhao/work_pro/result_2.csv', header=None)

    X = data[data.columns[0]].tolist()
    temp_Y = np.round(data[data.columns[1]].tolist(), 2)
    # res = list(db_156.get_list("select * from work_test.csv limit 10"))
    df = pd.DataFrame(list(db_156.get_list("select * from work_test.csv1 limit 30")))
    df1 = df[df.columns[1:]]
    df1[df1.columns[0]].astype(str)
    X1 = df1[df1.columns[0]].map(lambda x:str(x)).map(lambda x:x.split( )[0])
    Y1 = df1[df1.columns[1]].tolist()
    # sql1 = 'SELECT * FROM axf_goods  WHERE  id = 1'
    # result1 = mc.select_one(sql1)
    # print(json.dumps(result1[1], ensure_ascii=False))

    return {
        "X": X1.tolist(),
        "Y": Y1
    }
