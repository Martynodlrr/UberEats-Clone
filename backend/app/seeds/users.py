from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    romeo = User(
        username='romeogalvan',email='romeogalvan@aa.io', password = 'password')
    amanda = User(
        username='amorrow',email='amanda@aa.io', password = 'password')
    martyn = User(
        username='yayadinero',email='martyn@aa.io', password = 'password')
    hunter = User(
        username='hunter12756',email='hunter@aa.io', password = 'password')
    brad = User(
        username='bradDaGoat',email='brad@aa.io', password = 'password')
    david = User(
        username='davidN',email='david@aa.io', password = 'password')
    keegan = User(
        username='pmMe@2ampls',email='keegan@aa.io', password = 'password')
    andrew = User(
        username='andrewww',email='andrew@aa.io', password = 'password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(romeo)
    db.session.add(amanda)
    db.session.add(martyn)
    db.session.add(hunter)
    db.session.add(brad)
    db.session.add(david)
    db.session.add(keegan)
    db.session.add(andrew)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.Users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM Users"))

    db.session.commit()
