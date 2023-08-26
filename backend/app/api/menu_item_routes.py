# # code needs to be tested
# # **  W.I.P.  **
# import json
# from flask_login import login_required
# from flask import Blueprint, jsonify
# from app.forms import MenuItemForm
# from app.models import db, MenuItem

# menu_items_routes = Blueprint('menu-items', __name__)


# @menu_items_routes.route('/')
# def reviews_by_restaurant_id():
#     reviews = MenuItem.query.all()

#     return json.dumps({'reviews': [review.to_dict() for review in reviews]})


# @menu_items_routes.route('/restaurants/<int:restaurantId>')
# def reviews_by_restaurant_id(restaurantId):
#     menu_item = MenuItem.query.filter_by(restaurant_id=restaurantId).all()

#     if not reviews:
#         return jsonify({'message': 'Restaurant has no reviews'}), 404

#     return json.dumps({'reviews': [review.to_dict() for review in reviews]})


# @menu_items_routes.route('/restaurants/<int:restaurantId>', methods=['POST'])
# @login_required
# def create_review(restaurantId):
#     form = MenuItemForm()

#     if form.validate_on_submit():
#         menu_item = MenuItem(
#             restaurant_id=restaurantId,
#             description=form.data['body'],
#             rating=form.data['rating']
#         )
#         db.session.add(new_review)
#         db.session.commit()

#         return json.dumps({'review': new_review.to_dict()}), 201

#     if form.errors:
#         return form.errors


# @menu_items_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def update_review(id):
#     menu_item = MenuItem.query.get(id)

#     if not menu_item:
#         return json.dumps({'message': 'Review not found'}), 404

#     form = MenuItemForm()

#     if form.validate_on_submit():
#         review.description = form.data['description']
#         review.rating = form.data['rating']

#         db.session.commit()
#         return json.dumps({'review': review.to_dict()})

#     if form.errors:
#         return form.errors


# @menu_items_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_review(id):
#     menu_item = MenuItem.query.get(id)
#     if menu_item:
#         db.session.delete(menu_item)
#         db.session.commit()
#         return json.dumps({'message': 'Menu Item deleted successfully'}), 200

#     return json.dumps({'message': 'Menu Item not found'}), 404
