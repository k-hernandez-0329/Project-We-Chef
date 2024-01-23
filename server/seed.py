#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker


# Local imports
from app import app
from models import db, Chef, Portfolio, Engagement


def create_chefs():
    chefs = []
    for _ in range(10):
        specialty = rc(
            [
                "Pastry Chef",
                "Sous Chef",
                "Executive Chef",
                "Line Cook",
                "Culinary Instructor",
                "Prep Cook",
            ]
        )
        c = Chef(
            name=fake.name(),
            specialty=specialty,
            bio=fake.paragraph(),
            location=fake.city(),
        )
        chefs.append(c)

    return chefs


def create_portfolios(chefs):
    portfolios = []
    food_related_titles = [
        "Delicious Dish",
        "Tasty Creation",
        "Gourmet Delight",
        "Savory Masterpiece",
        "Flavorful Experience",
    ]
    food_related_descriptions = [
        "A delightful culinary creation",
        "Savor the taste of perfection",
        "Experience gourmet excellence",
        "A journey of flavors",
    ]
    for _ in range(randint(1, 5)):
        title = rc(food_related_titles)
        description = rc(food_related_descriptions)
        p = Portfolio(
            title=title,
            description=description,
            image_url=fake.image_url(),
        )
        portfolios.append(p)

    return portfolios


def create_engagements(chefs, portfolios):
    engagements = []
    for _ in range(30):
        e = Engagement(
            comment_body=fake.text(),
            likes=randint(0, 15),
            chef_id=rc(chefs).id,
            portfolio_id=rc(portfolios).id,
        )
        engagements.append(e)

    return engagements


if __name__ == "__main__":
    fake = Faker("en_US")

    with app.app_context():
        print("Creating tables...")
        db.create_all()

        print("Clearing db...")
        # Seed code goes here!
        db.session.query(Chef).delete()
        db.session.query(Portfolio).delete()
        db.session.query(Engagement).delete()

        print("Seeding chefs...")
        chefs = create_chefs()
        db.session.add_all(chefs)
        db.session.commit()

        print("Seeding portfolios...")
        portfolios = create_portfolios(chefs)
        db.session.add_all(portfolios)
        db.session.commit()

        print("Seeding engagements...")
        engagements = create_engagements(chefs, portfolios)
        db.session.add_all(engagements)
        db.session.commit()

        print("Done seeding!")
