from multiprocessing.dummy import Pool as ThreadPool

pool = ThreadPool(4)

from google.cloud import automl_v1beta1 as automl
from google.cloud.automl_v1beta1.proto import service_pb2

from flask import Flask, json, request

app = Flask(__name__)

model_ids = [
  'TCN7512273721116461880',
  'TCN5493229612304608070',
  'TCN2974166473326201289',
  'TCN5816516006604246435'
]

project_id = 'nobully'
content = ''

@app.route('/toxicity', methods=['POST'])
def get_prediction():
  global content
  if request.headers["Content-Type"] == "application/json":
    content = request.json["message"]
  else:
    content = ""
    return "No message passed"

  results = pool.map(predict, model_ids)

  return results

def predict(model_id):
  global project_id
  prediction_client = automl.PredictionServiceClient()
  name = 'projects/{}/locations/us-central1/models/{}'.format(project_id, model_id)
  payload = {'text_snippet': {'content': content, 'mime_type': 'text/plain' }}
  params = {}
  return prediction_client.predict(name, payload, params)
