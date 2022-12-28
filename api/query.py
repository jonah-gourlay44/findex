import json, os, requests, re

BASE_URL = 'https://www.alphavantage.co/query?'
API_MAP = {
    'TIME_SERIES_INTRADAY': {
        'required': {
            'symbol': None,
            'interval': ['1min', '5min', '15min', '30min', '60min']
        },
        'optional': {
            'adjusted': ['true', 'false'],
            'outputsize': ['compact', 'full'],
            'datatype': ['json', 'csv']
        }
    },
    'TIME_SERIES_DAILY': {
        'required': {
            'symbol': None
        },
        'optional': {
            'adjusted': ['compact', 'full'],
            'datatype': ['json', 'csv']
        }
    },
    'GLOBAL_QUOTE': {
        'required': {
            'symbol': None
        },
        'optional': {
            'datatype': ['json', 'csv']
        }
    },
    'SYMBOL_SEARCH': {
        'required': {
            'keywords': None
        },
        'optional': {
            'datatype': ['json', 'csv']
        }
    }
}

class FuncException(Exception):
    def __init__(self, message):
        super().__init__(message)

class FieldException(Exception):
    def __init__(seld, message):
        super().__init__(message)

def get_api_key():
    return os.environ.get('ALPHA_VANTAGE_KEY')

def api_request(func, **kwargs):
    if not func in API_MAP.keys():
        raise FuncException('Unsupported API function: {}'.format(field))

    fields = API_MAP[func]

    for field in fields['required']:
        if field not in kwargs.keys():
            raise FieldException('Missing required field: {}'.format(field))

    url = BASE_URL + 'function=' + func + '&'

    for field in kwargs.keys():
        if field not in fields['required'].keys() and field not in fields['optional'].keys():
            raise FieldException('{} function has no field {}'.format(func, field))
        elif field in fields['required'].keys():
            if fields['required'][field] is not None and kwargs[field] not in fields['required'][field]:
                raise FieldException('Unsupported option for {} field: {}'.format(field, kwargs[field]))
            else:
                url += field + '=' + kwargs[field] + '&'
        elif field in fields['optional'].keys():
            if fields['optional'][field] is not None and kwargs[field] not in fields['optional'][field]:
                raise FieldException('Unsupported option for {} field: {}'.format(field, kwargs[field]))
            else:
                url += field + '=' + kwargs[field] + '&'
        else:
            raise FieldException('Unable to add {} field to the request'.format(field))
        
    url += 'apikey=' + get_api_key()

    return requests.get(url).json()

def search_yahoo_tickers(symbol):
    base_url = 'https://finance.yahoo.com/_finance_doubledown/api/resource/searchassist'
    params = {
        'searchTerm': symbol,
        'device': 'console',
        'returnMeta': 'true'
    }
    
    query = lambda x: ';searchTerm={}?'.format(re.sub(' ', '%20', x['searchTerm']))
    args = lambda x: 'device={}&returnMeta={}'.format(x['device'], x['returnMeta'])
    construct_url = lambda x: base_url + query(x) + args(x)
    
    url = construct_url(params)
    
    symb_resp = requests.get(url).json() if not symbol == '' else {}
    
    return symb_resp