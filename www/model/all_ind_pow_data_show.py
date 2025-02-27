import os
import pandas as pd


def path_help(path):
    dir_path = os.path.join(
        os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "..")))
    return os.path.join(dir_path, 'www/data/all_national_power/{}'.format(path))


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
def get_new_ind_top10(year, tag):
    if tag == 'new':
        model_path = path_help('new_data.csv')

        new_ind_data = pd.read_csv(model_path)

        """
        对原始数据的处理转换
        model_path = path_help('new_ind_top10.csv')
        new_ind_data = pd.read_csv(model_path, encoding='gbk')
        
        year_data = [i for i in new_ind_data.columns if i.isdigit()]
        new_name = ['chinese_ind_name2013',
                    'chinese_ind_name2014',
                    'chinese_ind_name2015',
                    'chinese_ind_name2016',
                    'chinese_ind_name2017',
                    'chinese_ind_name2018']

        for v in range(len([i for i in new_ind_data.columns if i.isdigit()])):
            new_ind_data.rename(columns={[j for j in new_ind_data.columns if j.startswith('chi')][v]: new_name[v]},
                                inplace=True)
        """
        
        # 检索数据
        new_ind_data = new_ind_data[['chinese_ind_name' + str(year), str(year)]]

        # print(new_ind_data)
        new_ind_data.sort_values(by=[new_ind_data.columns[1]], inplace=True)
        industry_name = new_ind_data[new_ind_data.columns[0]].tolist()
        industry_num = new_ind_data[new_ind_data.columns[1]].tolist()

        return {
            'industry_name_y': industry_name,
            'industry_num': industry_num,
            'year': year
        }
    elif tag == 'old':
        model_path = path_help('old_data.csv')

        old_ind_data = pd.read_csv(model_path)
        old_ind_data = old_ind_data[['chinese_ind_name' + str(year), str(year)]]

        # print(old_ind_data)
        old_ind_data.sort_values(by=[old_ind_data.columns[1]], inplace=True)
        industry_name = old_ind_data[old_ind_data.columns[0]].tolist()
        industry_num = old_ind_data[old_ind_data.columns[1]].tolist()

        return {
            'industry_name_y': industry_name,
            'industry_num': industry_num,
            'year': year
        }
    else:
        return None


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
        "old_ind": (speed[speed.columns[2]] / 100000000).tolist(),
        "new_ind": (speed[speed.columns[3]] / 100000000).tolist(),
        "mean": (speed[speed.columns[-1]] / 100000000).tolist()
    }

    return data









