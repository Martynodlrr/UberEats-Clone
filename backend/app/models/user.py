from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .shopping_cart_item import ShoppingCartItems

class User(db.Model, UserMixin):
    __tablename__ = 'Users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    #! Potentially broken
    #relations 1 to many
    reviews_user = db.relationship("Review", back_populates='user_review')
    restaurants_user = db.relationship("Restaurant", back_populates='user_restaurant')

    #one user to ONE cart
    cart_user = db.relationship("ShoppingCartItems",uselist=False,back_populates='user_cart')
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
