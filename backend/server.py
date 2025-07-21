from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)

# 💥 This ensures CORS is fully open for development
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

SAVE_FILE = 'saves.json'

# Create save file if missing
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
    try:
        with open(SAVE_FILE, 'r') as f:
            content = f.read().strip()
            data = json.loads(content) if content else {"loc": 0, "locPerClick": 1}
    except Exception as e:
        print("[ERROR] loading save:", e)
        data = {"loc": 0, "locPerClick": 1}
    return jsonify(data), 200

if __name__ == '__main__':
    app.run(debug=True, extra_files=[])
