import os
import pymysql
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from api.routes import routes_bp

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(routes_bp)

if __name__ == "__main__":
    port = int(os.getenv('PORT', 5000))
    print(f"serwer działa na porcie: {port}")
    app.run(debug=True, port=port)