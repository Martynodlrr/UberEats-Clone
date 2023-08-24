from .db import db, environment, SCHEMA
from enum import Enum

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    image = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    category = db.Column(Enum('fast-food','asian','mexican','american'))
    description = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    miles_to_user = db.Column(db.Float, nullable=False)


    #! Confusion
    #relationships
    # ONE restaurant to many reviews
    # ONE Restaurant to many menu

    # MANY restaurants to ONE user
    user = db.relationship("User",back_populates='restaurant')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image': self.image,
            'address': self.address,
            'category': self.category,
            'description': self.description,
            'user_id':self.user_id,
            'miles_to_user':self.miles_to_user
        }
