#!/usr/bin/env python3
import json

from flask import request, session, jsonify, render_template
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api, bcrypt
from models import User, Destination, Review

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")


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
        rating = request.json.get('rating')
        price = request.json.get('price')


        if not name or not image or not description or not location or not category or not price:
            return {'message': 'All fields are required.'}, 400

        destination = Destination(name=name, image=image, description=description, location=location, category=category, price=price, rating=rating)
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
        rating = request.json.get('rating')
        price = request.json.get('price')

        if not name and not image and not description and not location and not category and not price:
            return {'message': 'At least one field needs to be updated.'}, 400
        
        destination.name = name
        destination.image = image
        destination.description = description
        destination.location = location
        destination.category = category
        destination.rating = rating
        destination.price = price
        db.session.commit()
        return destination.to_dict(), 200
    
    def put(self, id):
        # Retrieve the destination object
        destination = Destination.query.filter(Destination.id == id).first()
        if not destination:
            return {'message': 'Destination not found.'}, 404

        # Get the data from the request
        data = request.get_json()

        # Update the destination fields if present in the request data
        for field in ['name', 'image', 'description', 'location', 'category', 'price', 'rating']:
            if field in data:
                setattr(destination, field, data[field])

        try:
            # Commit the changes to the database
            db.session.commit()
        except Exception as e:
            # Rollback in case of an error
            db.session.rollback()
            return {'message': 'Failed to update destination', 'error': str(e)}, 500

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
        return {'error': 'Admin privileges required'}, 405

    def get(self):
        if self.check_admin_privileges() is not True:
            return self.check_admin_privileges()

        destinations = Destination.query.all()
        return [destination.to_dict() for destination in destinations], 200

    def post(self):
        if self.check_admin_privileges() is not True:
            return self.check_admin_privileges()

        data = request.get_json()
        required_fields = ['name', 'image', 'description', 'location', 'category', 'price', 'rating']
        
        if not all(field in data for field in required_fields):
            return {'message': 'All fields are required.'}, 400

        new_destination = Destination(
            name=data['name'],
            image=data['image'],
            description=data['description'],
            location=data['location'],
            category=data['category'],
            rating=data['rating'],
            price=data['price']

        )
        db.session.add(new_destination)
        db.session.commit()
        return new_destination.to_dict(), 201

    def patch(self, id):
        # Check admin privileges
        admin_check = self.check_admin_privileges()
        if not admin_check is True:
            return admin_check
        
        # Retrieve the destination object
        destination = Destination.query.get(id)
        if not destination:
            return {'message': 'Destination not found.'}, 404

        # Get the data from the request
        data = request.get_json()

        # Update the destination fields if present in the request data
        for field in ['name', 'image', 'description', 'location', 'category', 'price', 'rating']:
            if field in data:
                setattr(destination, field, data[field])

        try:
            # Commit the changes to the database
            db.session.commit()
        except Exception as e:
            # Rollback in case of an error
            db.session.rollback()
            return {'message': 'Failed to update destination', 'error': str(e)}, 500

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
    

class ReviewList(Resource):
    def get(self):
        reviews = Review.query.all()  # Retrieve all reviews
        return [review.to_dict() for review in reviews], 200

    def post(self):
        if 'user_id' in session and session['user_id'] is not None:
                user_id = session['user_id']
                comment = request.json.get('comment')
                destination_id = request.json.get('destination_id')

                destination = Destination.query.filter_by(id=destination_id).first()

                if destination:
                    new_review = Review(comment=comment, user_id=user_id, destination_id=destination_id)
                    try:
                        db.session.add(new_review)
                        db.session.commit()
                        return new_review.to_dict(), 201
                    except IntegrityError:
                        db.session.rollback()
                        return {'message': 'Review failed.'}, 409
                else:
                    return {'message': 'Destination'}, 201

        

class ReviewDetail(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first()

        if not review:
            return jsonify({'error': 'Review not found!'}), 404
        
        return review.to_dict(), 200
    
    def delete(self, id):
        review = Review.query.filter_by(id=id).first()

        if not review:
            return jsonify({'error': 'Review not found!'}), 404

        db.session.delete(review)
        db.session.commit()

        return jsonify({'message': 'Review deleted successfully!'}), 200
    

api.add_resource(CheckSession, '/check_session', endpoint='/check_session')
api.add_resource(Signup, '/signup', endpoint='/signup')
api.add_resource(LogIn, '/login', endpoint='/login')
api.add_resource(Logout, '/logout', endpoint='/logout')
api.add_resource(DestinationList, '/destinations', endpoint='/destinations')
api.add_resource(DestinationDetail, '/destinations/<int:id>', endpoint='/destinations/<int:id>')
api.add_resource(AdminDestinationResource, '/admin/destinations', endpoint='/admin/destinations')
api.add_resource(AdminDestinationResource, '/admin/destinations/<int:id>', endpoint='/admin/destinations/<int:id>')
api.add_resource(ReviewList, '/reviews')
api.add_resource(ReviewDetail, '/reviews/<int:id>', endpoint='/reviews/<int:id>')
api.add_resource(ReviewList, '/destinations/<int:id>/reviews', endpoint='/destinations/<int:id>/reviews')
api.add_resource(AdminDestinationResource, '/admin/destinations/new', endpoint='/admin/destinations/new')

 
if __name__ == '__main__':
    app.run(port=5555, debug=True)
    


        




       