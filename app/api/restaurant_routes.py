from flask_login import login_required
from flask import Blueprint, request
from decimal import Decimal
from enum import Enum
import random
import json
from app.models import db, Restaurant
from app.forms import RestaurantForm
from app.api.aws import (upload_file_to_s3, get_unique_filename)

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

    if not restaurants:
        return json.dumps({'message': 'No restaurants available'}), 404

    res = {'restaurants': [restaurant.to_dict() for restaurant in restaurants]}
    return json.dumps(res, cls=EnumEncoder)


@restaurant_routes.route('/<int:id>')
def restaurant(id):
    """
    Query for a restaurant by id and returns that restaurant in a dictionary
    """
    restaurant = Restaurant.query.get(id)

    if not restaurant:
        return json.dumps({'message': 'Restaurant not found'}), 404

    res = {'restaurant': [restaurant.to_dict()]}
    return json.dumps(res, cls=EnumEncoder)

@restaurant_routes.route('/user/<int:userId>')
def user_restaurant(userId):
    """
    Query for a restaurant by user id and returns the restaurants in a dictionary
    """
    restaurant = Restaurant.query.filter(Restaurant.user_id == userId).all()

    if not restaurant:
        return json.dumps({'message': 'User has no restaurant'}), 404

    res = {'restaurant': [restaurant.to_dict()]}
    return json.dumps(res, cls=EnumEncoder)


@restaurant_routes.route('/<int:userId>')
def user_restaurants(userId):
    """
    Query for a restaurant by user id and returns the restaurants in a dictionary
    """
    restaurant = Restaurant.query.filter(Restaurant.ownerId == userId).all()

    if not restaurant:
        return json.dumps({'message': 'User has no restaurant'}), 404

    res = {'restaurant': [restaurant.to_dict()]}
    return json.dumps(res, cls=EnumEncoder)


@restaurant_routes.route('/', methods=['POST'])
# @login_required
def create_restaurant():
    """
    Creates a restaurant and returns that restaurant in a dictionary
    """
    form = RestaurantForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    # Extract file from form data
    image_file = request.files.get('image')

    if not image_file:
        return {"error": "Image file is required."}, 400

    upload = upload_file_to_s3(image_file)
    if 'url' not in upload:
        return upload, 500

    # Get other form data
    description = request.form.get('description')
    category = request.form.get('category')
    address = request.form.get('address')
    name = request.form.get('name')
    user_id = int(request.form.get('user_id'))  # assuming user_id is sent as string in the form

    new_restaurant = Restaurant(
        description=description,
        category=category,
        address=address,
        image=upload["url"],
        name=name,
        user_id=user_id,
        miles_to_user=random.uniform(0.01, 5)
    )

    db.session.add(new_restaurant)
    db.session.commit()

    res = new_restaurant.to_dict()
    return json.dumps(res, cls=EnumEncoder)


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
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.data['image']:
        upload = upload_file_to_s3(form.data['image'])

        if 'url' not in upload:
            return upload
        else:
            restaurant.image=upload["url"]

    if form.validate_on_submit():
        restaurant.description=form.data['description']
        restaurant.category=form.data['category']
        restaurant.address=form.data['address']
        restaurant.name=form.data['name']

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
        return json.dumps([{'message': 'Restaurant deleted successfully'}]), 200
    else:
        return json.dumps([{'message': 'Restaurant not found'}]), 404
