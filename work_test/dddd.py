from flask import jsonify
from json import dumps

data = {
    'd1': [1, 2, 3, 4, 5, 6],
    'd2': [1, 2, 3, 4, 5, 6],
    'd3': [1, 2, 3, 4, 5, 6],
}
print(dumps(data))
