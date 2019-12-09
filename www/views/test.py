import json
import os
import zipfile

from flask import Blueprint, render_template, jsonify, request, send_from_directory, app

from www.model.t_show import get_data

t = Blueprint('t',__name__,url_prefix='/t')

@t.route('/t/')
def index():
    return render_template('{}/reputation/viewpoint_index.html'.format('show'),
                           menu_status={'c_menu': 'demo_show', 'p_menu': 'reputation'},
                           current_industry='show')


@t.route('/data_show/')
def data_show():
    print('*'*100)
    # print(get_data())
    print(request.args.get('city_name'))
    print(request.args.get('captial_id'))
    print('*'*100)

    return jsonify(get_data())


@t.route('/change/')
def change():
    return "<h1><span style={'color':'red'}>hello</span> <span>Flask</span></h1>"
    # return render_template('demo.html')


def path_help(path):
    dir_path = os.path.join(
        os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "..")))
    return os.path.join(dir_path, 'www/static/json/geometryCouties/{}.js'.format(path))


import pandas as pd
@t.route('/get_json/')
def get_json():
    id = request.args.get('id')
    # open(path_help(str(id)))
    f = open('/Users/xingwenhao/work_pro/www/static/json/geometryCouties/{}.js'.format(id))
    return f.read()
#
# """"""
# from work_test.Demo import data_preprocess
# @t.route('/demo/', methods=['get','post'])
# def change1():
#     # 原生文件上传 没有条件
#             # 获取文件上传
#     if request.method == 'POST':
#         file = request.files.get('file')
#         file1 = request.files.get('file1')
#         a = '/www/static/my_js/cheng_de_js/cd_dev_index.js'
#         print(os.getcwd()+a)
#         # print(file)
#
#     # os.getcwd()获取当前的绝对路径
#     #     file.save(os.path.join(os.getcwd(), 'static/upload/a.jpeg'))
#     #     file.save(os.path.join(os.getcwd(), 'static/upload/xxx.py'))
#     #     print(pd.read_csv(file1).head())
#
#         # print(pd.read_csv(file).head())
#         # data_preprocess.read_data(pd.read_csv(file), pd.read_csv(file1))
# # return render_template('upload.html')
#     return render_template('demo.html')
#
# def zip_ya(start_dir):
#     start_dir = start_dir  # 要压缩的文件夹路径
#     file_news = start_dir + '.zip'  # 压缩后文件夹的名字
#
#     z = zipfile.ZipFile(file_news, 'w', zipfile.ZIP_DEFLATED)
#     for dir_path, dir_names, file_names in os.walk(start_dir):
#         f_path = dir_path.replace(start_dir, '')  # 这一句很重要，不replace的话，就从根目录开始复制
#         f_path = f_path and f_path + os.sep or ''  # 实现当前文件夹以及包含的所有文件的压缩
#         for filename in file_names:
#             z.write(os.path.join(dir_path, filename), f_path + filename)
#     z.close()
#     return file_news
#
#
# def zipDir(dirpath, outFullName):
#     '''
#     压缩指定文件夹
#     :param dirpath: 目标文件夹路径
#     :param outFullName:  压缩文件保存路径+XXXX.zip
#     :return: 无
#     '''
#     zip = zipfile.ZipFile(outFullName, 'w', zipfile.ZIP_DEFLATED)
#     for path, dirnames, filenames in os.walk(dirpath):
#         # 去掉目标和路径，只对目标文件夹下边的文件及文件夹进行压缩（包括父文件夹本身）
#         this_path = os.path.abspath('.')
#         fpath = path.replace(this_path, '')
#         for filename in filenames:
#             zip.write(os.path.join(path, filename), os.path.join(fpath, filename))
#     zip.close()
#
#
# def get_zip():
#     # folder = os.path.abspath(os.getcwd()) # make sure folder is absolute
#     folder = os.getcwd()+'/www/data/cheng_de/' # make sure folder is absolute
#     print(folder)
#     # Figure out the filename this code should used based on
#     # what files already exist.
#     number = 1
#     while True:
#         zipFilename = os.path.basename(folder) + '_' + str(number) + '.zip'
#         if not os.path.exists(zipFilename):
#             break
#         number = number + 1
#
#     # Create the zip file.
#     print('Creating %s...' % (zipFilename))
#     backupZip = zipfile.ZipFile(zipFilename, 'w')
#
#     # Walk the entire folder tree and compress the files in each folder.
#     for foldername, subfolders, filenames in os.walk(folder):
#         print('Adding files in %s...' % (foldername))
#         # Add the current folder to the ZIP file.
#         backupZip.write(foldername)
#
#         # Add all the files in this folder to the ZIP file.
#         for filename in filenames:
#             if filename.startswith(os.path.basename(folder) + '_') and filename.endswith('.zip'):
#                 continue  # don't backup the backup ZIP files
#             backupZip.write(os.path.join(foldername, filename))
#     backupZip.close()
#     print('Done.')
#
# @t.route("/download/")
# def downloader():
#     # filename = 'cd_dev_index.js'
#     # a = '/www/static/my_js/cheng_de_js/'
#     # dirpath = os.path.join(os.getcwd(), a)  # 这里是下在目录，从工程的根目录写起，比如你要下载static/js里面的js文件，这里就要写“static/js”
#     # print(dirpath)
#     # return send_from_directory(dirpath, filename, as_attachment=False)  # as_attachment=True 一定要写，不然会变成打开，而不是下载
#
#     # print(zip_ya('data/cheng_de/'))
#     # zipDir('data/cheng_de/', 'data/cheng_de/')
#     # a = 'data/cheng_de/'
#     # dirpath = os.path.join(os.getcwd(), a)
#     # get_zip()
#     # exit()
#     if request.method == "GET":
#         p = os.getcwd()+'/www/static/my_js/cheng_de_js/'
#         os.system('zip -r ./www/zzzz.zip {}'.format(p))
#
#         filename = 'zzzz.zip'
#
#         # if os.path.isfile(os.path.join('static/my_js/cheng_de_js/', filename)):
#         # print(os.system('pwd'))
#         print(os.getcwd()+'www/')
#         return send_from_directory(os.getcwd()+'/www/', filename, as_attachment=True)
#         # pass
#
#     else:
#         return "哈哈哈"
