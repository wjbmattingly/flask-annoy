from flask import Flask, request, jsonify
from flask_cors import CORS
from annoy import AnnoyIndex
import pandas as pd
from sentence_transformers import SentenceTransformer

app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})

annoy_index = None
df = None
rgs = None
model = None

@app.route('/')
def hello():
    return 'Semantic Search Flask API'

@app.before_first_request
def initialize_data():
    global annoy_index, df, rgs, model
    annoy_index = load_annoy()
    df, rgs = load_data()
    model = load_model()

def load_annoy():
    t = AnnoyIndex(384, "angular")
    t.load("official_index.ann")
    return t

def load_model():
    model = SentenceTransformer('all-MiniLM-L6-v2')
    return model

def load_data():
    df = pd.read_csv("database.csv")
    rgs = df.rg.unique()
    rgs.sort()

    return df, rgs

# Endpoint to query the Annoy index
@app.route('/query', methods=['GET'])
def query():
    input_query = request.args.get('input_query', default='', type=str)
    num_results = request.args.get('num_results', default=10, type=int)

    if not input_query:
        return jsonify({'error': 'Please provide a valid input_query'}), 400

    emb = model.encode(input_query)
    res = annoy_index.get_nns_by_vector(emb, num_results)
    res = df.iloc[res]
    # print(res.iloc[0])

    # Convert DataFrame to dictionary
    res_dict = res.to_dict(orient='records')
    print(res_dict[0])

    # Return JSON object with similar items
    return jsonify({'similar_items': res_dict})

if __name__ == '__main__':
    app.run(debug=True)
