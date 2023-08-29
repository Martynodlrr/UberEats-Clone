from .db import db, environment, SCHEMA, add_prefix_for_prod
from .restaurant_enum import RestaurantType

class Restaurant(db.Model):
    __tablename__ = 'Restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    image = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    category = db.Column(db.Enum(RestaurantType))
    description = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("Users.id")))
    miles_to_user = db.Column(db.Float)

    #relationships
    # ONE restaurant to many reviews
    reviews_restaurant = db.relationship("Review",back_populates='restaurant_reviews')
    # ONE Restaurant to many menu
    menu_restaurant = db.relationship("MenuItem",back_populates='restaurant_menu')
    # MANY restaurants to ONE user
    user_restaurant = db.relationship("User",back_populates='restaurant_user')

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
