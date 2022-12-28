import time, os
from flask import Flask, json
from flask_cors import CORS
import yfinance as yf
import numpy as np
from datetime import datetime as dt

from .query import api_request, search_yahoo_tickers, FuncException, FieldException
from .utils import format_ticker_response_json
from .errors import ERROR_DICT, Error

app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'index.sqlite')
)
CORS(app)

try:
    os.makedirs(app.instance_path)
except OSError:
    pass

from . import db
db.init_app(app)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/ticker_query/<symbol>', methods=('GET',))
def get_ticker_list(symbol):
    try:
        res = api_request('SYMBOL_SEARCH', keywords=symbol)
        status = 200

        print(res)
        
        if res.get('bestMatches') is not None:
            res = format_ticker_response_json(res['bestMatches'])
        else:
            res = {'error': Error.FORMAT_ERROR.value, 'message': ERROR_DICT[Error.FORMAT_ERROR]}
            status = 500

        return json_response(res, status=status)
    except FuncException:
        return json_response({'error': Error.REQUEST_ERROR.value, 'message': ERROR_DICT[Error.REQUEST_ERROR]}, status=400)
    except FieldException:
        return json_response({'error': Error.REQUEST_ERROR.value, 'message': ERROR_DICT[Error.REQUEST_ERROR]}, status=400)
    except Exception:
        return json_response({'error': Error.SERVER_ERROR.value, 'message': ERROR_DICT[Error.SERVER_ERROR]}, status=500)

@app.route('/ticker_query_yahoo/<symbol>', methods=('GET',))
def get_ticker_list_yahoo(symbol):
    try: 
        res = search_yahoo_tickers(symbol)
        status = 200

        if res.get('data') is not None:
            if res['data'].get('items') is not None:
                res = format_ticker_response_json(res['data']['items'])
            else:
                res = {'error': Error.FORMAT_ERROR.value, 'message': ERROR_DICT[Error.FORMAT_ERROR]}
        else:
            res = {'error': Error.FORMAT_ERROR.value, 'message': ERROR_DICT[Error.FORMAT_ERROR]}

        return json_response(res)
    except Exception:
        return json_response({'error' : Error.SERVER_ERROR.value, 'message': ERROR_DICT[Error.SERVER_ERROR]}, status=500)

@app.route('/ticker_history_yahoo/<symbol>', methods=('GET',))
def get_ticker_history_yahoo(symbol):
    try:
        res = yf.Ticker(symbol)
        history = res.history(period='max').reset_index().to_dict()
        info = res.info

        dates = np.array(list(history['Date'].values()), dtype=dt)

        format_date = lambda date : dt.strftime(date, '%d-%b-%Y')
        format_dates = np.vectorize(format_date)

        history['Date'] = list(format_dates(dates))

        res = {
            'history': history,
            'info': info
        }

        status = 200

        return json_response(res)
    except Exception as e:
        print(e)
        return json_response({'error': Error.SERVER_ERROR.value, 'message': ERROR_DICT[Error.SERVER_ERROR]}, status=500)


def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})
