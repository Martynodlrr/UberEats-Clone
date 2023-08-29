import json
from flask_login import login_required
from flask import Blueprint, jsonify,request
from app.forms import MenuItemForm
from app.models import db, MenuItem
from app.api.aws import (upload_file_to_s3, get_unique_filename)

menu_items_routes = Blueprint('menu-items', __name__)


@menu_items_routes.route('/')
def menu_items():
    menu_items = MenuItem.query.all()

    return json.dumps({'menuItems': [menu_item.to_dict() for menu_item in menu_items]})

#get all the menu items for each restaurant
@menu_items_routes.route('/restaurants/<int:restaurantId>')
def menu_items_by_restaurant_id(restaurantId):
    menu_items = MenuItem.query.filter_by(restaurant_id=restaurantId).all()

    if not menu_items:
        return jsonify({'message': 'Restaurant has no menu items'}), 404

    return json.dumps({'menuItems': [menu_item.to_dict() for menu_item in menu_items]})

#create new menu item
@menu_items_routes.route('/restaurants/<int:restaurantId>', methods=['POST'])
@login_required
def create_meun_item(restaurantId):
    form = MenuItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    upload = upload_file_to_s3(form.data['image'])

    if 'url' not in upload:
        return upload

    if form.validate_on_submit():
        new_menu_item = MenuItem(
            restaurant_id=restaurantId,
            name=form.data['name'],
            price=form.data['price'],
            image=upload["url"],
            calories=form.data['calories']
        )

        db.session.add(new_menu_item)
        db.session.commit()

        return json.dumps({'menuItem': new_menu_item.to_dict()}), 201

    if form.errors:
        return form.errors

#update route
@menu_items_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_menu_item(id):
    menu_item = MenuItem.query.get(id)

    if not menu_item:
        return json.dumps({'message': 'Menu Item not found'}), 404

    form = MenuItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.data['image']:
        upload = upload_file_to_s3(form.data['image'])

        if 'url' not in upload:
            return upload
        else:
            menu_item.image=upload["url"]

    if form.validate_on_submit():
        menu_item.name=form.data['name']
        menu_item.price=form.data['price']
        menu_item.image=form.data['image']
        menu_item.calories=form.data['calories']

        db.session.commit()
        return json.dumps({'menuItem': menu_item.to_dict()})

    if form.errors:
        return form.errors


@menu_items_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    menu_item = MenuItem.query.get(id)
    if menu_item:
        db.session.delete(menu_item)
        db.session.commit()
        return json.dumps({'message': 'Menu Item deleted successfully'}), 200

    return json.dumps({'message': 'Menu Item not found'}), 404
