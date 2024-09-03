from faker import Faker
import random

from config import app, db
from models import User, Destination, Review

fake = Faker()

with app.app_context():

    User.query.delete()
    Destination.query.delete()
    Review.query.delete()
    db.session.commit()

    users = []
    for _ in range(10):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password_hash=fake.password(length=12)
        )
        users.append(user)
        db.session.add(user)
        db.session.commit()

    destinations = []
    for _ in range(10):
        destination = Destination(
            name=fake.city(),
            image=fake.image_url(),
            description=fake.text(max_nb_chars=200),
            location=fake.country(),
            category=fake.random_element(['Romantic', 'Adventure', 'Beach', 'Park']),
            rating=random.randint(1, 5)
        )
        destinations.append(destination)
        db.session.add(destination)
        db.session.commit()

    for user in users:
        for _ in range(random.randint(1, 5)):
            review = Review(
                comment=fake.text(max_nb_chars=100),
                user=user,
                destination=random.choice(destinations)
            )
            db.session.add(review)
            db.session.commit()


    print("Database initialized with sample data.")

