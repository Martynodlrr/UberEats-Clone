# code needs to be tested

import json
from flask_login import login_required
from decimal import Decimal
from flask import Blueprint
from enum import Enum
from app.forms import RestaurantForm
from app.models import Restaurant
from models import db

restaurant_routes = Blueprint('restaurants', __name__)


class EnumEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Enum):
            return obj.value
        elif isinstance(obj, Decimal):
            return str(obj)
        return super().default(obj)


@restaurant_routes.route('/')
def restaurants():
    """
    Query for all restaurants and returns them in a list of restaurant dictionaries
    """
    restaurants = Restaurant.query.all()

    if not restaurant:
        return json.dumps({'message': 'Restaurant not found'}), 404

    res = {'restaurants': [restaurant.to_dict() for restaurant in restaurants]}
    return json.dumps(res, cls=EnumEncoder)


@restaurant_routes.route('/<int:id>')
def restaurant(id):
    """
    Query for a restaurant by id and returns that restaurant in a dictionary
    """
    restaurant = Restaurant.query.get(id)
    res = {'restaurant': [restaurant.to_dict()]}
    return json.dumps(res, cls=EnumEncoder)


@restaurant_routes.route('/', methods=['POST'])
@login_required
def create_restaurant():
    """
    Creates a restaurant and returns that restaurant in a dictionary
    """
    form = RestaurantForm()

    if form.validate_on_submit():
        new_restaurant = Restaurant(
            description=form.data['description'],
            category=form.data['category'],
            address=form.data['address'],
            image=form.data['image'],
            name=form.data['name']
        )
        db.session.add(new_restaurant)
        db.session.commit()
        res = {'restaurant': [new_restaurant.to_dict()]}
        return json.dumps(res, cls=EnumEncoder), 201
    if form.errors:
        return form.errors


@restaurant_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_restaurant(id):
    """
    Updates a restaurant and returns the updated restaurant in a dictionary
    """
    restaurant = Restaurant.query.get(id)

    if not restaurant:
        return json.dumps({'message': 'Restaurant not found'}), 404

    form = RestaurantForm()

    if form.validate_on_submit():
        restaurant.description = form.data['description']
        restaurant.category = form.data['category']
        restaurant.address = form.data['address']
        restaurant.image = form.data['image']
        restaurant.name = form.data['name']

        db.session.commit()
        res = {'restaurant': [restaurant.to_dict()]}
        return json.dumps(res, cls=EnumEncoder)
    if form.errors:
        return form.errors


@restaurant_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_restaurant(id):
    """
    Deletes a restaurant
    """
    restaurant = Restaurant.query.get(id)
    if restaurant:
        db.session.delete(restaurant)
        db.session.commit()
        return json.dumps({'message': 'Restaurant deleted successfully'}), 200
    else:
        return json.dumps({'message': 'Restaurant not found'}), 404
