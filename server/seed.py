from faker import Faker
import random

from config import app, db, bcrypt
from models import User, Destination, Review
from datetime import datetime


fake = Faker()

with app.app_context():

    categories = ['Romantic', 'Adventure', 'Beach', 'Park', 'Local']
    fixed_password = "AdminPassword123!"

    User.query.delete()
    Destination.query.delete()
    Review.query.delete()
    db.session.commit()

    users = []
    admin = User(username='admin', password_hash=fixed_password,
            is_admin=True)
    db.session.add(admin)
    users.append(admin)
    db.session.commit()

    users = []
    for _ in range(10):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password_hash=bcrypt.generate_password_hash(fake.password(length=12)),
            created_at=fake.date_time_this_century(before_now=True, after_now=False)
        )
        db.session.add(user)
        users.append(user)
        db.session.commit()

    
    destinations = []
    for _ in range(20):
        destination = Destination(
            name=fake.city(),
            image=fake.image_url(),
            description=fake.text(max_nb_chars=200),
            location=fake.country(),
            category=random.choice(categories),
            price=random.randint(200, 1000),
            rating=random.randint(1, 5),
            created_at=fake.date_time_this_century(before_now=True, after_now=False)
    
        )
        db.session.add(destination)
        destinations.append(destination)
        db.session.commit()

    
    for destination in destinations:
        for _ in range(random.randint(1, 30)):
            review = Review(
                comment=fake.text(max_nb_chars=200),
                user_id=random.choice(users).id,
                destination_id=destination.id,
                created_at=fake.date_time_this_century(before_now=True, after_now=False)
            )
            db.session.add(review)
            db.session.commit()

    print("Database initialized with sample data.")
   

