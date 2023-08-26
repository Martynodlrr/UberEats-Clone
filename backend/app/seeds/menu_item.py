
from ..models import db, environment, SCHEMA
from ..models.menu_item import MenuItem
from sqlalchemy.sql import text
from random import randint
from faker import Faker


def seed_menu_items():
    fake = Faker()
    menu_items = []
    item_dict = {
        1:
            [
                [
                    "Barq's® Root Beer",
                    "Buddy Fruits® Apple Sauce",
                    "Chick-fil-A Chick-n-Strips®",
                    "Chick-fil-A Waffle Potato Fries®",
                    "Chick-fil-A® Chicken Sandwich",
                    "Chick-fil-A® Cool Wrap",
                    "Chick-fil-A® Cool Wrap Meal",
                    "Chick-fil-A® Deluxe Meal",
                    "Chick-fil-A® Deluxe Sandwich",
                    "Chick-fil-A® Diet Lemonade",
                    "Chick-fil-A® Grilled Chicken Club Sandwich"
                ],
                [
                    "https://tb-static.uber.com/prod/image-proc/process%E2%80%A…bf898844c89/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
                    "https://tb-static.uber.com/prod/image-proc/process%E2%80%A…a68f39761e9/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
                    "https://tb-static.uber.com/prod/image-proc/process%E2%80%A…c090e3ee35c/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
                    "https://tb-static.uber.com/prod/image-proc/process%E2%80%A…62d15517f1f/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
                    "https://tb-static.uber.com/prod/image-proc/process%E2%80%A…df67952bf41/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
                    "https://tb-static.uber.com/prod/image-proc/process%E2%80%A…9711213f885/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
                    "https://tb-static.uber.com/prod/image-proc/process%E2%80%A…7311b6dad/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
                    "https://tb-static.uber.com/prod/image-proc/process%E2%80%A…7f3f45e126/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
                    "https://tb-static.uber.com/prod/image-proc/process%E2%80%A…af493c80381/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
                    "https://tb-static.uber.com/prod/image-proc/process%E2%80%A…9bd1450fb40/5954bcb006b10dbfd0bc160f6370faf3.jpeg",
                    "https://tb-static.uber.com/prod/image-proc/process%E2%80%A…ca88de34765/5954bcb006b10dbfd0bc160f6370faf3.jpeg"
                ]
            ],

    }
    for name in range(1, 45):
        for item in range(1, 10):
            item_data = {
                "restaurant_id": name,
                # item_dict[name][0][item]
                "name": "test_menu_item_name",
                "price": randint(1, 10),
                # item_dict[name][1][item] for image
                "image": "https://i.imgur.com/1ZoHOCG.jpeg",
                "calories": randint(300, 1000, 50)
            }
            menu_items.append(item_data)
    [db.session.add(MenuItem(**item)) for item in menu_items]
    db.session.commit()


def undo_menu_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu_items"))

    db.session.commit()
