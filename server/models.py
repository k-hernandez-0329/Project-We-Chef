from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!


class Chef(db.Model, SerializerMixin):
    __tablename__ = "chefs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    specialty = db.Column(db.String)
    bio = db.Column(db.String)

    location = db.Column(db.String)

    # Relationships
    # portfolios = db.relationship(
    #     "Portfolio", back_populates="chef", cascade="all, delete-orphan"
    # )
    engagements = db.relationship(
        "Engagement", back_populates="chef", cascade="all, delete-orphan"
    )

    portfolios = association_proxy("portfolio", "engagements")
    # Serialization Rules
    serialize_rules = ("-engagements",)
    # Validation


class Portfolio(db.Model, SerializerMixin):
    __tablename__ = "portfolios"

    id = db.Column(db.Integer, primary_key=True)
    # chef_id = db.Column(db.Integer, db.ForeignKey("chefs.id"), nullable=False)
    title = db.Column(db.String)
    description = db.Column(db.String)
    image_url = db.Column(db.String)
    # Relationships
    # chef = db.relationship(
    #     "Chef",
    #     back_populates="portfolios",
    #     cascade="all, delete-orphan",
    #     single_parent=True,
    # )
    engagements = db.relationship(
        "Engagement", back_populates="portfolio", cascade="all, delete-orphan"
    )

    chefs = association_proxy("engagements", "chef")
    # Serialization Rules
    serialize_rules = ("-engagements",)


class Engagement(db.Model, SerializerMixin):
    __tablename__ = "engagements"

    id = db.Column(db.Integer, primary_key=True)
    comment_body = db.Column(db.Text)
    likes = db.Column(db.Integer)

    chef_id = db.Column(db.Integer, db.ForeignKey("chefs.id"), nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey("portfolios.id"), nullable=False)

    # Relationships
    chef = db.relationship("Chef", back_populates="engagements")
    portfolio = db.relationship("Portfolio", back_populates="engagements")

    # Serialization Rules
    serialize_rules = ("-chef", "-portfolio")
