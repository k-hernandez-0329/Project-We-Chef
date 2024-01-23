#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import Chef, Portfolio, Engagement

# Views go here!


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


class Chefs(Resource):
    pass


class ChefsById(Resource):
    pass


class Portfolios(Resource):
    pass


class Engagements(Resource):
    pass


api.add_resource(Chefs, "/chefs")
api.add_resource(ChefsById, "/chefs/<int:id>")
api.add_resource(Portfolios, "/portfolios")
api.add_resource(Engagements, "/engagements")
if __name__ == "__main__":
    app.run(port=5555, debug=True)
