# code needs to be tested
import json
from flask_login import login_required
from flask import Blueprint, jsonify
from app.forms import ReviewForm
from app.models import Review
from models import db

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/')
def reviews_by_restaurant_id():
    """
    Fetches all reviews by restaurant id and returns the list of reviews in a dictionary
    """
    reviews = Review.query.all()

    return json.dumps({'reviews': [review.to_dict() for review in reviews]})


@review_routes.route('/restaurants/<int:restaurantId>')
def reviews_by_restaurant_id(restaurantId):
    reviews = Review.query.filter_by(restaurant_id=restaurantId).all()

    if not reviews:
        return json.dumps({'message': 'Restaurant has no reviews'}), 404

    return json.dumps({'reviews': [review.to_dict() for review in reviews]})


@review_routes.route('/restaurants/<int:restaurantId>', methods=['POST'])
@login_required
def create_review(restaurantId):
    """
    Creates a review based on restaurant id and returns that review in a dictionary
    """
    form = ReviewForm()

    if form.validate_on_submit():
        new_review = Review(
            restaurant_id=restaurantId,
            description=form.data['body'],
            rating=form.data['rating']
        )
        db.session.add(new_review)
        db.session.commit()

        return json.dumps({'review': new_review.to_dict()}), 201

    if form.errors:
        return form.errors


@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    """
    Updates a review and returns that updated review in a dictionary
    """
    review = Review.query.get(id)

    if not review:
        return jsonify({'message': 'Review not found'}), 404

    form = ReviewForm()

    if form.validate_on_submit():
        review.description = form.data['description']
        review.rating = form.data['rating']

        db.session.commit()
        return json.dumps({'review': review.to_dict()})

    if form.errors:
        return form.errors


@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    """
    Deletes a review based on review id
    """
    review = Review.query.get(id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return json.dumps({'message': 'Review deleted successfully'}), 200

    return json.dumpsjson.dumps({'message': 'Review not found'}), 404
