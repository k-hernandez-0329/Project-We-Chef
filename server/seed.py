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
        food_related_bios = [
            "Passionate about creating delectable pastries that delight the senses.",
            "Bringing culinary expertise to every dish, creating memorable dining experiences.",
            "Innovative chef specializing in gourmet creations and flavor pairings.",
            "Dedicated to the art of culinary perfection, crafting savory masterpieces.",
            "Inspiring others with the love for cooking and the joy of sharing delicious meals.",
            "Elevating the dining experience with creative and mouthwatering dishes.",
            "Bringing a fusion of flavors to the table, a true culinary artist at heart.",
            "Crafting culinary wonders that leave a lasting impression on taste buds.",
            "Exploring the world of gastronomy, one exquisite dish at a time.",
            "Passionate about culinary education and sharing the secrets of exceptional cooking.",
        ]

        c = Chef(
            name=fake.name(),
            specialty=specialty,
            bio=rc(food_related_bios),
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
        "Exquisite Culinary Creation",
        "Mouthwatering Delight",
        "Gastronomic Marvel",
        "Divine Flavor Fusion",
        "Sensational Taste Symphony",
        "Epicurean Delicacy",
        "Irresistible Gourmet Treat",
        "Culinary Bliss Extravaganza",
        "Delectable Culinary Masterpiece",
        "Flavors of Paradise",
        "Savory Elegance",
        "Epicure's Delight",
        "Tantalizing Culinary Adventure",
        "Artistry on a Plate",
        "Heavenly Flavor Harmony",
        "Sumptuous Gastronomic Journey",
        "Culinary Wonders Unleashed",
        "Taste Sensation Spectacle",
        "Palate-Pleasing Perfection",
        "Elevated Culinary Experience",
    ]
    food_related_descriptions = [
        "A delightful culinary creation",
        "Savor the taste of perfection",
        "Experience gourmet excellence",
        "A journey of flavors",
        "Indulge in a culinary masterpiece",
        "Elevate your senses with perfection on a plate",
        "Embark on a gourmet journey like never before",
        "A symphony of flavors dancing on your palate",
        "Discover the artistry behind every bite",
        "Savor the richness of gastronomic excellence",
        "A delightful fusion of textures and tastes",
        "Culinary bliss in every mouthful",
        "Experience a gastronomic adventure of a lifetime",
        "A sensory delight for true food enthusiasts",
        "An ode to the essence of exquisite dining",
        "Taste the magic of carefully crafted flavors",
        "Gourmet sophistication served with elegance",
        "A celebration of flavors that captivate the soul",
        "Delight in the culinary wonders presented before you",
        "Sensational taste that lingers on the palate",
        "A tapestry of flavors woven into a culinary masterpiece",
        "Gastronomic pleasures brought to life",
        "Epicurean delights that redefine culinary artistry",
        "A symposium of taste, texture, and aroma",
    ]
    for _ in range(1, 10):
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

    positive_comments = [
        "Wow, this is exceptional!",
        "Great job! The presentation is incredible.",
        "This looks amazing. Thank you for sharing!",
        "Incredible presentation and attention to detail.",
        "Absolutely stunning. You have a talent!",
        "I'm impressed. The culinary skills are top-notch!",
        "This dish is a work of art. Well done!",
        "Thank you for sharing your amazing creations!",
        "I can't believe how good this looks. Great work!",
        "You have a gift for presentation. Bravo!",
        "Absolutely mouth-watering! Your culinary skills shine.",
        "I'm blown away by the beauty of this dish. Great job!",
        "Wow, the colors and presentation are phenomenal.",
        "This looks like a masterpiece. Thank you for sharing your talent!",
        "Incredible attention to detail. You're a true artist!",
        "I can almost taste the perfection through the screen. Bravo!",
        "This dish deserves all the applause. Well done!",
        "Your creativity in the kitchen is truly inspiring.",
        "I'm speechless. Your culinary presentations are unmatched!",
        "Every detail is perfection. A feast for the eyes and taste buds!",
    ]
    for _ in range(20):
        e = Engagement(
            comment_body=rc(positive_comments),
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
