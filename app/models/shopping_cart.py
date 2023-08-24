from .db import db, environment


#join table
shopping_cart = db.Table(
    "shoppingCart",
    db.Model.metadata,
    db.Column("user_id", db.ForeignKey("users.id"),primary_key=True),
    #not sure about this one tie into shipping cart items
    db.Column("shopping_cart_id",db.ForeignKey("shopping_cart_items.id",primary_key=True))
)
