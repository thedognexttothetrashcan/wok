
# coding: utf-8

# 去除0值

# 去除0值
def drop_zero_rows(df):
    df = df.drop(df[df['elec_thsimonth']==0].index)
    return df


# 类型转换
def series_code_convert(value):
    """
    转换行业编码为float
    """
    if value:
        new_value = float(value)
    else:
        new_value = np.nan
    return new_value


def change_datatype(df):
    """
    保证serial_num，elec_thsimonth为float类型
    """
    df['serial_num'] = df['serial_num'].apply(series_code_convert)
#     df['install_capa_thismonth']= df['install_capa_thismonth'].astype('float64')
    df['elec_thsimonth'] = df['elec_thsimonth'].astype('float64')
    return df


# ### 检查空值

# In[ ]:


display(data_18.isnull().any(), data_17.isnull().any())

display(data_18.count(), data_17.count())


# In[2]:


# 查看空值

res1_pivot[res1_pivot.isnull().T.any()]


# ### 删除空值

# In[ ]:


def drop_zero_rows(df):
    df = df.drop(df[df['elec_thsimonth']==0].index)
    return df


# In[ ]:


res1_pivot = res1_pivot.dropna(subset=['201811'])


# ### 标准化

# In[ ]:


(norm - norm.min()) / (norm.max() - norm.min())


# ### 异常值
# 
# #### 样本与并均值的偏差大于2倍的标准差

# In[ ]:


mean = norm1.mean().values
std = 2 * norm1.std()
ab_new = norm[norm1.values - mean > std.values]


# ### 画图

# In[ ]:


from matplotlib import font_manager

my_font = font_manager.FontProperties(fname="/Library/Fonts/Songti.ttc")

plt.figure(figsize=(20,6))
plt.plot(res1_pivot.loc[2,'201801':])
plt.title(inds_map[2],fontproperties=my_font,fontsize = 20)

plt.xticks(rotation=-90)
plt.grid(axis='both')


# ## 统计方法
# 

# In[ ]:


# 同比版1

# 1：每年
# 12：每月
# period = 1 | period = 12

def power_consumption_index(df, period):
    n_col = df.values.shape[1]
    n_row = df.values.shape[0]
    values = df.values
    result_matrix = np.zeros([n_row,n_col])

    for i in range(0,(n_col)):
        for j in range(0,(n_row)):
            if (i+period)<=n_col-1:
                tongbi_shu = values[j,i+period]/values[j,i]
                result_matrix[j,i+period] = tongbi_shu*100
    return result_matrix


# In[ ]:


# 同比版2
def cal_yoy(df):
    res = (df.T.diff(12)/df.T.shift(12)).T.iloc[:,12:]*100
    return res


# In[ ]:


# 基期版
def power_consumption_index(df):
    n_col = df.values.shape[1]
    n_row = df.values.shape[0]
    result_matrix = np.zeros([n_row,n_col])
    
    for i in range(0,(n_row)):
        for j in range(0,(n_col)):
            result_matrix[i,j]=df.iloc[i,j]/df.iloc[i,0]*100
    return result_matrix


# In[ ]:


# 耗电量指数,以2014年为基期,先全都算出来
cumpute_df = res1_pivot.loc[:,'201401':'201908']


power_consumption_df = pd.DataFrame(power_consumption_index(cumpute_df),                                    columns=cumpute_df.columns)

power_consumption_df[power_consumption_df==0]=100

power_consumption_df.columns = power_consumption_df.columns.astype(str)


# In[ ]:


# 计算行业耗电量指数
new_power_con_index = new_power_consumption_unlabel.apply(lambda x: x.sum()/new_power_consumption.shape[0],axis=0).values
old_power_con_index = old_power_consumption_unlabel.apply(lambda x: x.sum()/old_power_consumption.shape[0],axis=0).values



# 计算行业耗电量指数
new_index = new.apply(lambda x: x.sum()/new.shape[0],axis=0).values
old_index = old.apply(lambda x: x.sum()/old.shape[0],axis=0).values


# ### 排名

# In[ ]:


# 计算每个行业，每年的汇总值
for i in range(2011,2019):
    new_inds1[str(i)] = new_inds1.loc[:,(str(i)+'01'):(str(i)+'12')].apply(lambda x : x.sum(),axis=1)
new_inds1['inds_name'] = new_inds1.index.map(inds_map)

# 去除行业名称以数字开头有数字的
new_inds1['inds_name'] = new_inds1['inds_name'].str.replace('\d{1,2}\.',"")
new_inds1['inds_name'] = new_inds1['inds_name'].str.replace('\d{1,2}\、',"")


# In[3]:


df_list = []
for i in range(2011,2019):
    df_list.append(new_inds1.sort_values([str(i)],ascending=False)[['inds_name',str(i)]][:10].reset_index())
new_ind_top10 = pd.concat(df_list,axis=1)
new_ind_top10


# ### 占比

# In[ ]:


# 所有
year = list(np.unique([i[:-2] for i in res1_pivot.columns.unique()]))
df = pd.DataFrame(index=year)

l = []
for y in year:
    l.append(res1_pivot.loc[:,[i for i in res1_pivot.columns if i.startswith(str(y))]].sum().sum())
    
df['all_pow'] = l

# 新行业
new = []
for y in year:
    n.append(new_inds.loc[:,[i for i in res1_pivot.columns if i.startswith(str(y))]].sum().sum())
df['new_pow'] = new


# 旧行业
old = []
for y in year:
    o.append(old_inds.loc[:,[i for i in res1_pivot.columns if i.startswith(str(y))]].sum().sum())
df['old_pow'] = old

# 占比
df['new_pow_proportion'] = df['new_pow'] / df['all_pow'] * 100

df['old_pow_proportion'] = df['old_pow'] / df['all_pow'] * 100


# ### 累加和

# In[4]:


# 累加和        
def add_sum(a):
    ll = []
    for i in range(2011,2020):    
        ll.append(a.loc[:,(str(i)+'01'):(str(i)+'12')].cumsum(axis=1))
        if i == 2019:
            ll.append(a.loc[:,(str(i)+'01'):(str(i)+'08')].cumsum(axis=1))
    return np.abs(pd.concat(ll,axis=1))


# ### 迭代DF处理异常值

# In[5]:


def singular(df): 
    '''
    df: pd.Dataframe like install_reshape
    fill_max:
    fill_min:
    '''
    df_row_num = df.values.shape[0]
    df_col_num = df.values.shape[1]
    df_des = df.T.describe()
    df_m = df.values
    
    for i in range(df_row_num):
        # 计算出IQR= Q3-Q1
        Q3 = df_des.values[6,i]
        median = df_des.values[5,i]
        Q1 = df_des.values[4,i]
        max_num = df_des.values[7,i]
        IQR = Q3 - Q1

        for j in range(df_col_num):
            if df_m[i,j]>100*median:
                if median==0:
                    df_m[i,j]=df_m[i,:].mean()
#                 df_m[i,j] = median
            elif df_m[i,j]>(Q3+3*IQR):
                df_m[i,j] = Q3
            elif df_m[i,j]<(Q1-3*IQR):
                df_m[i,j] = Q1
        
    return df

