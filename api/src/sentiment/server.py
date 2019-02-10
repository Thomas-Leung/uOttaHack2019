# dependencies
# Flask
# google cloud
# six
# python3

from google.cloud import language_v1
from google.cloud.language_v1 import enums
import six

# flask server
from flask import Flask
app = Flask(__name__)


class SAClient:
    """
        Have a single instance of the Google NLP client
    """
    instance = None
    
    def __init__(self):
        # create the singleton instance if does not exist
        if not SAClient.instance:
            SAClient.instance = language_v1.LanguageServiceClient()
    
    def getInstance(self):
        return SAClient.instance

sa = SAClient()

@app.route('/')
def get_sentiment(content):

    if isinstance(content, six.binary_type):
        content = content.decode('utf-8')
    
    type_ = enums.Document.Type.PLAIN_TEXT
    document = {'type': type_, 'content': content}

    response = client.analyze_sentiment(document)
    sentiment = response.document_sentiment

    response = {}
    response["score"] = sentiment.score
    response["magnitude"] = sentiment.magnitude
    return response
