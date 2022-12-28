import json, re

from .errors import ERROR_DICT, Error

def format_ticker_json(obj):

    symbol_key = None
    for key in obj.keys():
        if re.search('symbol', key):
            symbol_key = key
            break
    
    name_key = None
    for key in obj.keys():
        if re.search('name', key):
            name_key = key
            break

    formatted = {
        'symbol': obj[symbol_key],
        'name': obj[name_key]
    }

    return formatted

def format_ticker_response_json(items):
    res = {
        'tickers': [],
        'error': Error.NO_ERROR.value,
        'message': ERROR_DICT[Error.NO_ERROR]
    }

    for item in items:
        res['tickers'].append(format_ticker_json(item))

    return res
