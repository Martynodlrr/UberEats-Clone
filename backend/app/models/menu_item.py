from .db import db, environment, SCHEMA

class MenuItem(db.Model):
    __tablename__ = 'menu_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("Restaurant.id"))
    name = db.Column(db.String(60), nullable=False, unique=True)
    price = db.Column(db.Float,nullable=False)
    image = db.Column(db.String(255),nullable=False)
    calories = db.Column(db.Integer,nullable=False)

    #! POssibly wrong
    #relations
    #MANY menu items to ONE restaurant

    #ONE menu item to ONE shopping cart item??

    def to_dict(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'name': self.name,
            'price':self.price,
            'image':self.image,
            'calories':self.calories
        }
