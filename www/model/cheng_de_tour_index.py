import os
from json import dumps

import pandas as pd

# 获取当前path
def path_help(path):
    dir_path = os.path.join(
        os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "..")))
    return os.path.join(dir_path, 'www/data/cheng_de/{}'.format(path))


# 旅游行业占比
def get_cd_proportion(year):
    model_path = path_help('ind_per_res.csv')

    b_df = pd.read_csv(model_path)

    b_df.rename(columns={b_df.columns[0]: 'inds'}, inplace=True)
    b_df.set_index(b_df[b_df.columns[0]], inplace=True, drop=True)
    del b_df['inds']
    res = b_df[str(year)]

    data = {
        'hotel': res.hotel,
        'dining': res.dining,
        'transport': res.transport,
        'all': res.sum(),
        'year': year
    }
    # print(data)
    return data


# 旅游行业增速
def get_cd_tour_speed():
    model_path = path_help('speed.csv')

    res = pd.read_csv(model_path)

    # res.rename(columns={res.columns[0]: 'inds'})
    res.rename(columns={res.columns[0]: 'inds'}, inplace=True)

    res.set_index('inds', inplace=True, drop=True)

    # 行业
    # inds = res.index
    # 年份
    year = list(res.columns)

    hotel = res.loc['hotel', :].tolist()
    dining = res.loc['dining', :].tolist()
    transport = res.loc['transport', :].tolist()
    # print(hotel,dining,transport)

    # [res.loc[i, :].tolist() for i in res.index]
    # TODO
    data = {
        'year': year,
        'hotel': hotel,
        'dining': dining,
        'transport': transport
    }
    # print(hotel)
    return data


# 旅游行业需求增速
def get_cd_need_speed():
    model_path = path_help('need_speed.csv')

    res = pd.read_csv(model_path)

    # res.rename(columns={res.columns[0]: 'inds'})
    res.rename(columns={res.columns[0]: 'inds'}, inplace=True)

    res.set_index('inds', inplace=True, drop=True)

    # 行业
    # inds = res.index
    # 年份
    year = list(res.columns)

    hotel = res.loc['hotel', :].tolist()
    dining = res.loc['dining', :].tolist()
    transport = res.loc['transport', :].tolist()
    # print(hotel, dining, transport)


    data = {
        'year': year,
        'hotel': hotel,
        'dining': dining,
        'transport': transport
    }
    # print(hotel)
    return data


# 旅游行业指数
def get_cd_tour_index():
    model_path = path_help('tour_develop_index.csv')

    res = pd.read_csv(model_path, header=None)
    res.columns = ['year', 'index_num']
    # print(res['year'].to_list())
    # print(res['index_num'].to_list())
    data = {
        'year': [i[:-3] for i in res['year'].tolist()],
        'index_num': res['index_num'].tolist()
    }
    return data


