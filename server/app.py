#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api, bcrypt
from models import User, Destination, Review

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()

        if user:
            return user.to_dict()
        else:
            return {'message': 'Session expired or invalid.'}, 401
        

class Signup(Resource):
    def post(self):
        username = request.json.get('username')
        email = request.json.get('email')
        password = request.json.get('password')

        if not username or not email or not password:
            return {'message': 'All fields are required.'}, 400

        try:
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            user = User(username=username, _password_hash=hashed_password, email=email)
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 201
        except IntegrityError:
            return {'message': 'Username or email already exists.'}, 409
        

class LogIn(Resource):
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')

        user = User.query.filter(User.username == username).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            return {'message': 'Invalid username or password.'}, 401
        

class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return {'message': 'Logged out successfully.'}, 200
    

class DestinationList(Resource):
    def get(self):
        destinations = Destination.query.all()
        return [destination.to_dict() for destination in destinations]
    
    def post(self):
        name = request.json.get('name')
        image = request.json.get('image')
        description = request.json.get('description')
        location = request.json.get('location')
        category = request.json.get('category')

        if not name or not image or not description or not location or not category:
            return {'message': 'All fields are required.'}, 400

        destination = Destination(name=name, image=image, description=description, location=location, category=category)
        db.session.add(destination)
        db.session.commit()
        return destination.to_dict(), 201
    

api.add_resource(CheckSession, '/check_session')
api.add_resource(Signup, '/signup')
api.add_resource(LogIn, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(DestinationList, '/destinations')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
    


        




       