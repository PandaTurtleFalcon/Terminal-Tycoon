from flask import Flask, request, jsonify
import json
import os
app = Flask(__name__)
SAVE_FILE = 'saves.json'
if not os.path.exists(SAVE_FILE):
    with open(SAVE_FILE, 'w') as f:
        json.dump({}, f)
@app.route('/save', methods=['POST'])
def save_progress():
    data = request.json
    with open(SAVE_FILE, 'w') as f:
        json.dump(data, f)
    return jsonify({'status': 'saved'}), 200
@app.route('/load', methods=['GET'])
def load_progress():
    with open(SAVE_FILE, 'r') as f:
        data = json.load(f)
    return jsonify(data), 200
if __name__ == '__main__':
    app.run(debug = True)