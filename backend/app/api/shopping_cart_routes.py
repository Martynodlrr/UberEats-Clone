# code needs to be tested

import json
from flask_login import login_required
from flask import Blueprint, request
from app.models import db, ShoppingCartItem, MenuItem

shopping_cart_routes = Blueprint("shopping-carts", __name__)


# @shopping_cart_routes.route('/<int:userId>')
# @login_required
# def get_shopping_cart(userId):
#     """
#     Query for a shopping cart by userId and return that shopping cart in a dictionary
#     """
#     shopping_cart = ShoppingCart.query.filter_by(user_id=userId)

#     if shopping_cart:
#         return json.dumps({'Shopping cart': [shopping_cart.to_dict()]})
#     else:
#         return json.dumps({'message': 'Shopping cart not found'}), 404


#       **THIS IS BONUS FEATURE**
@shopping_cart_routes.route("/<int:userId>", methods=["PUT"])
@login_required
def update_shopping_cart(userId):
    """
    Updates a shopping cart and returns that updated shopping cart in a dictionary
    """
    shopping_cart = ShoppingCartItem.query.filter_by(user_id=userId)

    if not shopping_cart:
        return json.dumps({"message": "Shopping cart not found"}), 404

    data = request.get_json()
    item = MenuItem.query.filter(item_id=data.get("itemId"))
    # check to see how we recieve itemId or this line will not work as intended ^
    shopping_cart.append(item)

    db.session.add(item)
    db.session.commit()

    return json.dumps({"Shopping cart": [shopping_cart.to_dict()]})


@shopping_cart_routes.route("/<int:userId>/item/<int:itemId>", methods=["DELETE"])
@login_required
def delete_shopping_cart_item(userId, itemId):
    """
    Deletes a single item from the shopping cart
    """
    shopping_cart = ShoppingCartItem.query.filter_by(user_id=userId).all()

    if not shopping_cart:
        return json.dumps({"message": "Shopping cart not found"}), 404

    item = MenuItem.query.filter(id=itemId)

    if not item:
        return json.dumps({"message": "Item not found"}), 404

    if item not in shopping_cart.items:
        return json.dumps({"message": "Item not found in shopping cart"}), 404

    db.session.delete(item)
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
        return json.dumps({"message": "Shopping cart not found"}), 404

    for item in shopping_cart.items:
        db.session.delete(item)

    db.session.commit()

    return json.dumps({"message": "Cart cleared successfully"})
