
from sqlalchemy.sql import text
from random import randint
from faker import Faker
from app.models import db, environment, SCHEMA
from app.models import MenuItem


def seed_menu_items():
    fake = Faker()
    menu_items = []
    item_dict = {
        1:
            [
                
            ],

    }
    for i in range(1, 45):
        for menu_item in len(item_dict[i][0]):
            item_data = {
                "restaurant_id": i,
                # item_dict[name][0][item]
                "name": "test_menu_item_name",
                "price": randint(1, 10),
                # item_dict[name][1][item] for image
                "image": "https://i.imgur.com/1ZoHOCG.jpeg",
                "calories": randint(300, 1000)
            }
            menu_items.append(item_data)
    [db.session.add(MenuItem(**item)) for item in menu_items]
    db.session.commit()


def undo_menu_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.MenuItems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM MenuItems"))

    db.session.commit()
