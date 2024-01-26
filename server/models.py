from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!


chef_portfolio_association = db.Table(
    "chef_portfolio_association",
    db.Column("chef_id", db.Integer, db.ForeignKey("chefs.id")),
    db.Column("portfolio_id", db.Integer, db.ForeignKey("portfolios.id")),
)


class Chef(db.Model, SerializerMixin):
    __tablename__ = "chefs"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    specialty = db.Column(db.String)
    bio = db.Column(db.String)
    location = db.Column(db.String)
  

    # Relationships
    portfolios = db.relationship(
        "Portfolio",
        secondary=chef_portfolio_association,
        back_populates="chef",
    )
    engagements = db.relationship(
        "Engagement",
        back_populates="chef",
    )

    portfolios_associations = association_proxy("portfolios", "engagements")
    # Serialization Rules
    serialize_rules = ("-engagements",)

    # Validation

    @validates("name", "bio", "location")
    def validates_chef(self, _, value):
        if not value:
            raise ValueError("Cannot be left empty")
        return value


class Portfolio(db.Model, SerializerMixin):
    __tablename__ = "portfolios"

    id = db.Column(db.Integer, primary_key=True)
    # chef_id = db.Column(db.Integer, db.ForeignKey("chefs.id"), nullable=False)
    title = db.Column(db.String)
    description = db.Column(db.String)
    image_url = db.Column(db.String)
    likes = db.Column(db.Integer, default=0)
    # Relationships
    chef = db.relationship(
        "Chef",
        secondary=chef_portfolio_association,
        back_populates="portfolios",
        cascade="all, delete-orphan",
        single_parent=True,
    )
    engagements = db.relationship(
        "Engagement", back_populates="portfolio", cascade="all, delete-orphan"
    )

    comments = db.relationship(
        "Comment", back_populates="portfolio", cascade="all, delete-orphan"
    )

    chefs = association_proxy("engagements", "chef")
    # Serialization Rules
    serialize_rules = ("-engagements",)

    # validations
    @validates("title")
    def validate_title(self, _, title):
        if not title:
            raise ValueError("Title cannot be an empty string")
        return title

    @validates("description")
    def validate_description(self, _, description):
        if not description:
            raise ValueError("Description cannot be an empty string")
        return description


class Engagement(db.Model, SerializerMixin):
    __tablename__ = "engagements"

    id = db.Column(db.Integer, primary_key=True)
    comment_body = db.Column(db.Text)

    chef_id = db.Column(db.Integer, db.ForeignKey("chefs.id"), nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey("portfolios.id"), nullable=False)

    # Relationships
    chef = db.relationship("Chef", back_populates="engagements")
    portfolio = db.relationship("Portfolio", back_populates="engagements")

    # Serialization Rules
    serialize_rules = ("-chef", "-portfolio")

    @validates("comment_body")
    def validate_comment_body(self, _, value):
        if not value:
            raise ValueError("Comment body cannot be empty")
        return value


class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text)
    portfolio_id = db.Column(db.Integer, db.ForeignKey("portfolios.id"), nullable=False)

    portfolio = db.relationship("Portfolio", back_populates="comments")

    serialize_rules = ("-portfolio",)

    @validates("body")
    def validate_body(self, _, body):
        if not body:
            raise ValueError("Body cannot be blank.")
        return body



