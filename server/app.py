#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, jsonify
from flask_restful import Resource
import ipdb

# Local imports
from config import app, db, api

# Add your model imports
from models import Chef, Portfolio, Engagement

# Views go here!


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


class Chefs(Resource):
    def get(self):
        return make_response([chef.to_dict() for chef in Chef.query.all()], 200)

    def post(self):
        data = request.get_json()
        chef = Chef()
        # portfolio = Portfolio()

        try:
            chef.name = data.get("name")
            chef.specialty = data.get("specialty")
            chef.bio = data.get("bio")
            chef.location = data.get("location")
            # chef.profile_image = data.get("profile_image")

            # portfolio.title = data.get("title")
            # portfolio.description = data.get("description")
            # portfolio.image_url = data.get("portfolio_image_url")

            db.session.add(chef)
            db.session.commit()

            return make_response(chef.to_dict(rules=("portfolios", "engagements")), 201)
        except ValueError as e:
            return make_response({"error": e.__str__()}, 400)


class ChefsById(Resource):
    def get(self, id):
        chef = Chef.query.get(id)

        if not chef:
            return make_response({"error": "Chef not found"}, 404)

        return make_response(
            chef.to_dict(rules=("engagements",)),
            200,
        )

    def patch(self, id):
        chef = Chef.query.get(id)

        if not chef:
            return make_response({"errors": "Chef not found"}, 404)

        data = request.get_json()

        try:
            for attr in data:
                setattr(chef, attr, data[attr])

            db.session.add(chef)
            db.session.commit()
            return make_response(chef.to_dict(), 202)

        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

    def delete(self, id):
        chef = Chef.query.get(id)

        if not chef:
            return make_response({"error": "Chef not found"}, 404)

        db.session.delete(chef)
        db.session.commit()
        return make_response({}, 204)


class Portfolios(Resource):
    def get(self):
        return make_response(
            [portfolio.to_dict() for portfolio in Portfolio.query.all()], 200
        )

    def post(self):
        data = request.get_json()

        try:
            title = data.get("title")
            description = data.get("description")
            image_url = data.get("image_url")

            if not title or not description:
                return make_response({"errors": ["Incomplete data provided"]}, 400)

            new_portfolio = Portfolio(
                title=title,
                description=description,
                image_url=image_url,
            )

            db.session.add(new_portfolio)
            db.session.commit()

            return make_response(new_portfolio.to_dict(), 201)

        except ValueError:
            return make_response({"errors": ["Validation errors"]}, 400)

    def delete(self):
        data = request.get_json()

        portfolio_id = data.get("portfolio_id")
        if not portfolio_id:
            return make_response({"errors": ["Portfolio ID not provided"]}, 400)

        portfolio = Portfolio.query.get(portfolio_id)

        if not portfolio:
            return make_response({"errors": ["Portfolio not found"]}, 404)

        db.session.delete(portfolio)
        db.session.commit()

        return make_response({"message": "Portfolio deleted successfully"}, 200)


class Engagements(Resource):
    def post(self):
        data = request.get_json()

        try:
            comment_body = data.get("comment_body")
            likes = data.get("likes")
            chef_id = data.get("chef_id")
            portfolio_id = data.get("portfolio_id")

            engagement = Engagement(
                comment_body=comment_body,
                likes=likes,
                chef_id=chef_id,
                portfolio_id=portfolio_id,
            )

            db.session.add(engagement)
            db.session.commit()

            return make_response(engagement.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["Validation errors"]}, 400)


class EngagementsById(Resource):
    def get(self, id):
        engagement = Engagement.query.get(id)

        if not engagement:
            return make_response({"error": "Engagement not found"}, 404)

        return make_response(
            engagement.to_dict(),
            200,
        )

    def patch(self, id):
        engagement = Engagement.query.get(id)

        if not engagement:
            return make_response({"error": "Engagement not found"}, 404)

        data = request.get_json()

        try:
            for attr in data:
                setattr(engagement, attr, data[attr])

            db.session.add(engagement)
            db.session.commit()

            return make_response(engagement.to_dict(), 200)

        except ValueError:
            return make_response({"errors": ["Validation errors"]}, 400)

    def delete(self, id):
        engagement = Engagement.query.get(id)

        if not engagement:
            return make_response({"error": "Engagement not found"}, 404)

        db.session.delete(engagement)
        db.session.commit()

        return make_response({"message": "Engagement deleted successfully"}, 200)


class PortfolioEngagements(Resource):
    def get(self, portfolio_id):
        try:
            engagements = Engagement.query.filter_by(portfolio_id=portfolio_id).all()

            engagements_data = [engagement.to_dict() for engagement in engagements]

            return make_response(engagements_data, 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)


class PortfolioById(Resource):
    def patch(self, id):
        portfolio = Portfolio.query.get(id)

        if not portfolio:
            return make_response({"error": "Portfolio not found"}, 404)

        data = request.get_json()

        try:
            for attr in data:
                setattr(portfolio, attr, data[attr])

            db.session.add(portfolio)
            db.session.commit()
            return make_response(jsonify(portfolio.to_dict()), 200)

        except ValueError:
            return make_response({"errors": ["Validation errors"]}, 400)

    def post(self, id):
        portfolio = Portfolio.query.get(id)
        if not portfolio:
            return make_response({"error": "Portfolio not found"}, 404)

        data = request.get_json()

        comment_body = data.get("comment_body")
        chef_id = data.get("chef_id")

        if not comment_body:
            return make_response({"errors": ["Comment body is missing"]}, 400)
        if chef_id is None:
            return make_response({"errors": ["Chef ID is missing"]}, 400)
        new_engagement = Engagement(
            comment_body=comment_body,
            chef_id=chef_id,
            portfolio_id=portfolio.id,
        )

        try:
            db.session.add(new_engagement)
            db.session.commit()
            return make_response(jsonify(new_engagement.to_dict()), 201)

        except ValueError:
            return make_response({"errors": ["Validation errors"]}, 400)


api.add_resource(Chefs, "/chefs")
api.add_resource(ChefsById, "/chefs/<int:id>")
api.add_resource(Portfolios, "/portfolios")
api.add_resource(PortfolioById, "/portfolios/<int:id>")
api.add_resource(Engagements, "/engagements")
api.add_resource(EngagementsById, "/engagements/<int:id>")
api.add_resource(PortfolioEngagements, "/portfolios/<int:portfolio_id>/engagements")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
