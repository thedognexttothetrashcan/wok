import os
import pandas as pd


def path_help(path):
    dir_path = os.path.join(
        os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "..")))
    return os.path.join(dir_path, 'www/data/{}'.format(path))


# 新旧行业占比
def get_all_pow_consum(year):
    model_path = path_help('all_ind_power_consumption.csv')

    b_df = pd.read_csv(model_path)
    b_df.rename(columns={b_df.columns[0]: 'year'}, inplace=True)
    b_df['other'] = b_df[b_df.columns[1]] - b_df[b_df.columns[2]] - b_df[b_df.columns[3]]
    result = b_df.query('year=={}'.format(year))

    data = {
        'all_inds': result.all_inds.tolist()[0],
        'old_ind': result.old_ind.tolist()[0],
        'new_ind': result.new_ind.tolist()[0],
        'other': result.other.tolist()[0],
        'year': year
    }
    return data


# 新行业排名
def get_new_ind_top10(year):
    model_path = path_help('new_ind_top10.csv')

    new_ind_data = pd.read_csv(model_path, encoding='gbk')

    new_ind_data = new_ind_data.iloc[:, 1:]
    new_ind_data.sort_values(by=[new_ind_data.columns[2]], inplace=True)
    industry_name = new_ind_data[new_ind_data.columns[0]].tolist()
    industry_num = new_ind_data[new_ind_data.columns[2]].tolist()

    return {
        'industry_name_y': industry_name,
        'industry_num': industry_num,
        'year': year
    }


# 旧行业排名
def get_old_ind_top10(year):
    model_path = path_help('new_ind_top10.csv')
    new_ind_data = pd.read_csv(model_path, encoding='gbk')

    new_ind_data = new_ind_data.iloc[:, 1:]
    new_ind_data.sort_values(by=[new_ind_data.columns[2]], inplace=True)
    industry_name = new_ind_data[new_ind_data.columns[0]].tolist()
    industry_num = new_ind_data[new_ind_data.columns[2]].tolist()

    return {
        'industry_name_y': industry_name,
        'industry_num': industry_num,
        'year': year
    }


# 新动能行业用电量指数
def get_new_ind_index():
    model_path = path_help('power_index_df.csv')
    new_ind_index = pd.read_csv(model_path)

    new_ind_index.rename(columns={new_ind_index.columns[0]: 'date'}, inplace=True)

    date = new_ind_index['date'].tolist()
    old_index = new_ind_index['old'].tolist()
    new_index = new_ind_index['new'].tolist()
    # print(date)
    # print(old_index)
    # print(old_index)

    return {
        'date': date,
        'old_index': old_index,
        'new_index': new_index
    }


# 新旧动能用电量增速
def get_pow_speed():
    speed = pd.read_csv(path_help('all_ind_power_consumption.csv'))
    speed['mean'] = (speed['old_ind'] + speed['new_ind']) / 2

    data = {
        "year": speed[speed.columns[0]].tolist(),
        "old_ind": speed[speed.columns[2]].tolist(),
        "new_ind": speed[speed.columns[3]].tolist(),
        "mean": speed[speed.columns[-1]].tolist()
    }

    return data
