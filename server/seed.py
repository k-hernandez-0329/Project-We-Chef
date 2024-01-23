#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from unicodedata import category

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
        city = fake.city()
        state = fake.state_abbr()

        location = f"{city}, {state}"
        c = Chef(
            name=fake.name(),
            specialty=specialty,
            bio=rc(food_related_bios),
            location=location,
            # profile_image=fake.image_url(),
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
    food_images = [
        "https://images.pexels.com/photos/5893799/pexels-photo-5893799.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/1639556/pexels-photo-1639556.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/604969/pexels-photo-604969.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/7937471/pexels-photo-7937471.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/1525234/pexels-photo-1525234.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/19859339/pexels-photo-19859339/free-photo-of-cupcakes-on-plate.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/5857832/pexels-photo-5857832.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/1998633/pexels-photo-1998633.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/3776942/pexels-photo-3776942.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/3806365/pexels-photo-3806365.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/5945568/pexels-photo-5945568.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/691147/pexels-photo-691147.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/1332267/pexels-photo-1332267.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/6605902/pexels-photo-6605902.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/2647934/pexels-photo-2647934.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/19347048/pexels-photo-19347048/free-photo-of-delicious-vietnamese-meals-on-plates-on-table.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/5638555/pexels-photo-5638555.png?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/4828314/pexels-photo-4828314.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=300",
        "https://images.pexels.com/photos/4281820/pexels-photo-4281820.jpeg?auto=compress&cs=tinysrgb&w=300",
    ]
    for _ in range(10):
        title = rc(food_related_titles)
        description = rc(food_related_descriptions)
        image_url = rc(food_images)

        p = Portfolio(
            title=title,
            description=description,
            image_url=image_url,
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


def assign_portfolios_to_chefs(
    chefs, food_related_titles, food_related_descriptions, food_images
):
    for chef in chefs:
        if not chef.portfolios:
            title = rc(food_related_titles)
            description = rc(food_related_descriptions)
            image_url = rc(food_images)

            chef_portfolio = Portfolio(
                title=title,
                description=description,
                image_url=image_url,
            )

            chef.portfolios.append(chef_portfolio)
            db.session.add(chef_portfolio)  # Add the portfolio to the session

    db.session.commit()  # Commit the session after all portfolios are added
    return chefs


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
