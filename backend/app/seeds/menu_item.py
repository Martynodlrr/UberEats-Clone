
from sqlalchemy.sql import text
from random import randint
from faker import Faker
from app.models import db, environment, SCHEMA
from app.models import MenuItem
from .menu_item_data import menu_data

def seed_menu_items():
    menu_items=[]
    for i in range(1, 45):
        for item_name in menu_data[i][0]:
            item_data = {
                "restaurant_id": i,
                "name": item_name,
                "price": randint(1, 10),
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
