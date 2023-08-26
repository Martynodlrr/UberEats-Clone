from .db import db, environment, SCHEMA

class Review(db.Model):
    __tablename__ = 'Reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))
    body = db.Column(db.String(255),nullable=False)
    rating = db.Column(db.Integer,nullable=False)

    #relations Many reviews to ONE user
    user_review = db.relationship("User",back_populates='reviews_user')
    restaurant_reviews = db.relationship("Restaurant",back_populates='reviews_restaurant')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'restaurant_id': self.restaurant_id,
            'body': self.body,
            'rating': self.rating,
        }
