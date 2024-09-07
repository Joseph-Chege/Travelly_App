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
        if not session.get('user_id'):
            return {'message': 'Admin privileges required.'}, 403
        
        name = request.json.get('name')
        image = request.json.get('image')
        description = request.json.get('description')
        location = request.json.get('location')
        category = request.json.get('category')
        price = request.json.get('price')


        if not name or not image or not description or not location or not category or not price:
            return {'message': 'All fields are required.'}, 400

        destination = Destination(name=name, image=image, description=description, location=location, category=category)
        db.session.add(destination)
        db.session.commit()
        return destination.to_dict(), 201
    

class DestinationDetail(Resource):
    def get(self, id):
        destination = Destination.query.filter(Destination.id == id).first()
        if not destination:
            return {'message': 'Destination not found.'}, 404
        return destination.to_dict(), 200
    
    def post(self, id):
        destination = Destination.query.filter(Destination.id == id).first()
        if not destination:
            return {'message': 'Destination not found.'}, 404
        
        name = request.json.get('name')
        image = request.json.get('image')
        description = request.json.get('description')
        location = request.json.get('location')
        category = request.json.get('category')
        price = request.json.get('price')

        if not name and not image and not description and not location and not category and not price:
            return {'message': 'At least one field needs to be updated.'}, 400
        
        destination.name = name
        destination.image = image
        destination.description = description
        destination.location = location
        destination.category = category
        destination.price = price
        db.session.commit()
        return destination.to_dict(), 200
    
    def delete(self, id):
        destination = Destination.query.filter(Destination.id == id).first()
        if not destination:
            return {'message': 'Destination not found.'}, 404
        
        db.session.delete(destination)
        db.session.commit()
        return {'message': 'Destination deleted successfully.'}, 200
     

class AdminDestinationResource(Resource):
    def check_admin_privileges(self):
        user_id = session.get('user_id')
        user = User.query.filter_by(id=user_id).first()
        if user and user.is_admin:
            return True
        return {'error': 'Admin privileges required'}, 403

    def get(self):
        if self.check_admin_privileges() is not True:
            return self.check_admin_privileges()

        destinations = Destination.query.all()
        return [destination.to_dict() for destination in destinations], 200

    def post(self):
        if self.check_admin_privileges() is not True:
            return self.check_admin_privileges()

        data = request.get_json()
        required_fields = ['name', 'image', 'description', 'location', 'category', 'price']
        
        if not all(field in data for field in required_fields):
            return {'message': 'All fields are required.'}, 400

        new_destination = Destination(
            name=data['name'],
            image=data['image'],
            description=data['description'],
            location=data['location'],
            category=data['category'],
            price=data['price']

        )
        db.session.add(new_destination)
        db.session.commit()
        return new_destination.to_dict(), 201

    def put(self, id):
        if self.check_admin_privileges() is not True:
            return self.check_admin_privileges()

        destination = Destination.query.get(id)
        if not destination:
            return {'message': 'Destination not found.'}, 404

        data = request.get_json()
        for field in ['name', 'image', 'description', 'location', 'category', 'price']:
            if field in data:
                setattr(destination, field, data[field])

        db.session.commit()
        return destination.to_dict(), 200

    def delete(self, id):
        if self.check_admin_privileges() is not True:
            return self.check_admin_privileges()

        destination = Destination.query.get(id)
        if not destination:
            return {'message': 'Destination not found.'}, 404

        db.session.delete(destination)
        db.session.commit()
        return {'message': 'Destination deleted successfully.'}, 200



api.add_resource(CheckSession, '/check_session', endpoint='/check_session')
api.add_resource(Signup, '/signup', endpoint='/signup')
api.add_resource(LogIn, '/login', endpoint='/login')
api.add_resource(Logout, '/logout', endpoint='/logout')
api.add_resource(DestinationList, '/destinations', endpoint='/destinations')
api.add_resource(DestinationDetail, '/destinations/<int:id>', endpoint='/destinations/<int:id>')
api.add_resource(AdminDestinationResource, '/admin/destinations', endpoint='/admin/destinations')






if __name__ == '__main__':
    app.run(port=5555, debug=True)
    


        




       