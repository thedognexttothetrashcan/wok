import os
import pandas as pd


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
    model_path = path_help('ind_tb_res.csv')

    res = pd.read_csv(model_path)

    res.rename(columns={res.columns[0]: 'inds'})
    res.rename(columns={res.columns[0]: 'inds'}, inplace=True)

    res.set_index('inds', inplace=True, drop=True)

    # 行业
    inds = res.index
    # 年份
    year = res.columns

    hotel = res.loc['hotel', :].tolist()
    dining = res.loc['dining', :].tolist()
    transport = res.loc['transport', :].tolist()
    # print(hotel,dining,transport)

    # [res.loc[i, :].tolist() for i in res.index]

    # data = {
    #     'year': year,
    #     'hotel': hotel,
    #     'dining': dining,
    #     'transport': transport
    # }
    # print(hotel)
    return get_cd_proportion(2017)


# print(get_cd_tour_speed())
