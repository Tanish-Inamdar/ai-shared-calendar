from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/ping")
def ping():
    return jsonify({"message": "Backend is working!"})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
