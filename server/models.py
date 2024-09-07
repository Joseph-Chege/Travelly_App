from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.sql import func

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-reviews.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    _password_hash = db.Column(db.String(128))
    email = db.Column(db.String(120), unique=True)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=func.now())

    reviews = db.relationship("Review", back_populates="user", cascade='all, delete-orphan')
    destinations = association_proxy('reviews', 'destination')

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        if isinstance(password, bytes):
            password = password.decode('utf-8') 
        password_hash = bcrypt.generate_password_hash(
            password)
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self.password_hash, password)
    
    @validates('password_hash')
    def validate_password_hash(self, key, password_hash):
        if not password_hash:
            raise ValueError("Password is required.")
        return True
    
    def __repr__(self):
        return f"User {self.username}, {self.email}, {self.password_hash}"
    

class Destination(db.Model, SerializerMixin):
    __tablename__ = 'destinations'

    serialize_rules = ('-reviews.destination',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), index=True)
    image = db.Column(db.String(255))
    description = db.Column(db.Text)
    location = db.Column(db.String(120))
    category = db.Column(db.String)
    rating = db.Column(db.Integer)
    price = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=func.now())

    reviews = db.relationship("Review", back_populates="destination", cascade='all, delete-orphan')
    users = association_proxy('reviews', 'user')
   

    def __repr__(self):
        return f"Destination {self.name}, {self.location}, {self.category}, {self.rating}"
    

class Review(db.Model, SerializerMixin):
    __tablename__ ='reviews'

    serialize_rules = ('-user.reviews', '-destination.reviews',)

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))

    user = db.relationship("User", back_populates="reviews")
    destination = db.relationship("Destination", back_populates="reviews")

    def __repr__(self):
        return f"Review {self.comment}, {self.created_at}, {self.user_id}, {self.destination_id}"


