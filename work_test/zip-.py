# import os
# import zipfile
#
# def get_zip(folder):
#     # folder = os.path.abspath(os.getcwd()) # make sure folder is absolute
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
#                 continue # don't backup the backup ZIP files
#             backupZip.write(os.path.join(foldername, filename))
#     backupZip.close()
#     print('Done.')




import datetime

#
# now=datetime.datetime.now()
# future = '2020-11-16 18:33:14'
# future_time = datetime.datetime.strptime(future, '%Y-%m-%d %H:%M:%S')
# res = future_time - now
#
# if res.days < 0:
#     print('使用已到期')
#
# else:
#     print('您的使用时间还有{}天'.format(res.days))
#
# delta = datetime.timedelta(days=3650)
#
# n_days = now + delta
# print(n_days.strftime('%Y-%m-%d %H:%M:%S'))


# def test_make_token(user):
#     token = make_token(user, "test")
# s = TimedJSONWebSignatureSerializer('123abc')
# unpacked_token = s.loads(token)
# assert user.id == unpacked_token["id"]
# assert "test" == unpacked_token["op"]

from itsdangerous import TimedJSONWebSignatureSerializer as ser

s = ser('ylkj', 3600*24*5)
a = s.dumps({'res': '23:67:90'})
print(s.loads(a))
# print(a)

