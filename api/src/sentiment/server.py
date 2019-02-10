# dependencies
# Flask
# google cloud
# six
# python3

from google.cloud import language_v1
from google.cloud.language_v1 import enums
import six

# flask server
from flask import Flask, json, request
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

@app.route('/sentiment', methods=['POST'])
def get_sentiment():

    if request.headers["Content-Type"] == "application/json":
        content = request.json["message"]
    else:
        return "No message passed"

    type_ = enums.Document.Type.PLAIN_TEXT
    document = {'type': type_, 'content': content}

    response = sa.getInstance().analyze_sentiment(document)
    sentiment = response.document_sentiment

    res = {}
    res["score"] = sentiment.score
    res["magnitude"] = sentiment.magnitude
    return json.dumps(res)