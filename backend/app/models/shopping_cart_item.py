from .db import db, environment, SCHEMA


class ShoppingCartItem(db.Model):
    __tablename__ = "ShoppingCartItem"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    menu_item_id = db.Column(db.Integer, db.ForeignKey("MenuItem.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("Users.id"))

    # relations
    # ONE Shopping cart item to Many menu item
    menu_item = db.relationship("MenuItem", back_populates="shopping_item")

    # One shopping cart item to ONE user
    user_cart = db.relationship("User", back_populates="cart_user")

    def to_dict(self):
        return {
            "id": self.id,
            "menu_item_id": self.menu_item_id,
            "user_id": self.user_id,
        }
