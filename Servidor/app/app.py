from flask import Flask, jsonify, request
from flask_cors import CORS
from middleware import middleware
from routes.tasks import tasks_bp

app = Flask(__name__)
CORS(app)

app.before_request(middleware)

app.register_blueprint(tasks_bp, url_prefix='/tasks')


if __name__ == "__main__":
    print("Iniciando el servidor...")
    app.run(debug=True)
