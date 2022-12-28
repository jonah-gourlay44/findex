from enum import Enum

class Error(Enum):
    NO_ERROR = 0
    FORMAT_ERROR = 1
    REQUEST_ERROR = 2
    SERVER_ERROR = 3
        

ERROR_DICT = {}
ERROR_MESSAGES = [
    'No error', 
    'Bad JSON, could not be formatted.',
    'Bad request, could not be processed.',
    'Server error.'
]
for i,error in enumerate(Error):
    ERROR_DICT[error] = ERROR_MESSAGES[i]