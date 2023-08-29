
from sqlalchemy.sql import text
import random
from random import randint
from faker import Faker
from app.models import db, environment, SCHEMA
from app.models import MenuItem
from .menu_item_data import menu_data

def generate_price():
    random_value = random.randint(1, 10)

    random_threshold = random.random()  # generates a float between 0 and 1

    if random_threshold < 0.2:  # 20% chance
        return random_value - 0.5
    elif random_threshold < .6:  # 40% chance
        return random_value - 0.01
    else:  # 40% chance
        return random_value

def seed_menu_items():
    menu_items=[]
    for i in range(1, 46):
        for item_name in menu_data[i][0]:
            item_data = {
                "restaurant_id": i,
                "name": item_name,
                "price": generate_price(),
                "image": menu_data[i][1][menu_data[i][0].index(item_name)],  # Use index to get corresponding image
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
