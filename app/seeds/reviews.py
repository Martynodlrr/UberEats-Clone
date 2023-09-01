
from app.models import db, environment, SCHEMA, Review

from sqlalchemy.sql import text
from random import randint
from faker import Faker

def seed_reviews():
    fake = Faker()
    reviews = []
    for i in range(1,45):
        for j in range (2,11):
            review_data = {
                "user_id": j,
                "restaurant_id": i,
                "body":fake.paragraph(),
                "rating":randint(1,5)
            }
            reviews.append(review_data)
    [db.session.add(Review(**review)) for review in reviews]
    db.session.commit()
    db.session.commit()
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
