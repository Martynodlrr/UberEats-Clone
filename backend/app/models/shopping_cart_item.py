from .db import db,environment,SCHEMA
from .shopping_cart import shopping_cart

class ShoppingCartItem(db.Model):
    __tablename__ = 'shopping_cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    menu_item_id = db.Column(db.Integer, db.ForeignKey("MenuItem.id"))
    shopping_cart_id = db.Column(db.Integer, db.ForeignKey("ShoppingCart.id"))

    #relations
    #ONE Shopping cart item to ONE menu item
    menu_item = db.relationship("MenuItem",back_populates='shopping_item')

    #join table
    item_cart = db.relationship(
        "User",
        secondary= shopping_cart,
        back_populates='user_cart'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'menu_item_id': self.menu_item_id,
            'shopping_cart_id': self.shopping_cart_id
        }
