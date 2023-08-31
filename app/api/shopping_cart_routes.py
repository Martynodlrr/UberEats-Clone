import json
from flask_login import login_required
from flask import Blueprint, request
from app.models import db, ShoppingCartItem, MenuItem

shopping_cart_routes = Blueprint("shopping-carts", __name__)


@shopping_cart_routes.route('/<int:userId>')
@login_required
def get_shopping_cart(userId):
    """
    Query for a shopping cart by userId and return that shopping cart in a dictionary
    """
    shopping_cart = ShoppingCartItem.query.filter(ShoppingCartItem.user_id==userId).all()
    cart_res = []
    for cart_item in shopping_cart:
        item_dict = cart_item.to_dict()
        item_dict['name'] = cart_item.menu_item.name
        item_dict['price'] = cart_item.menu_item.price
        cart_res.append(item_dict)
    return {'Shopping cart': cart_res}


@shopping_cart_routes.route("/<int:userId>", methods=["PUT"])
@login_required
def update_shopping_cart(userId):

    data = request.get_json(force=True)

    item = MenuItem.query.filter(MenuItem.id == data['menu_item_id']).first()

    if not item:
        return {"error": "Item not found"}, 404

    new_cart_item = ShoppingCartItem(user_id=userId, menu_item_id=item.id)
    db.session.add(new_cart_item)
    db.session.commit()

    shopping_cart = ShoppingCartItem.query.filter(ShoppingCartItem.user_id == userId).all()
    cart_res = []

    for cart_item in shopping_cart:
        item_dict = cart_item.to_dict()
        item_dict['name'] = cart_item.menu_item.name
        item_dict['price'] = cart_item.menu_item.price
        cart_res.append(item_dict)

    return {"Shopping cart": cart_res}



@shopping_cart_routes.route("/item/<int:itemId>", methods=["DELETE"])
@login_required
def delete_shopping_cart_item(itemId):
    """
    Deletes a single item from the shopping cart
    """
    cart_item = ShoppingCartItem.query.get(itemId)

    if not cart_item:
        return json.dumps({"message": "Item not found in shopping cart"}), 404

    db.session.delete(cart_item)
    db.session.commit()

    return json.dumps({"message": "Item deleted successfully"})

@shopping_cart_routes.route("/<int:userId>", methods=["DELETE"])
@login_required
def clear_shopping_cart(userId):
    """
    Clears the entire shopping cart
    """
    shopping_cart = ShoppingCartItem.query.filter_by(user_id=userId).all()

    if not shopping_cart:
        return json.dumps({"message": "Shopping cart is already empty"}), 404

    for cart_item in shopping_cart:
        db.session.delete(cart_item)

    db.session.commit()

    return json.dumps({"message": "Cart cleared successfully"})
