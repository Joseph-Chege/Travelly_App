# Travelly App

This is a Flask application for managing destinations and user reviews. It supports user authentication, CRUD operations for destinations, and review management. The app is built using Flask, SQLAlchemy, and Flask-RESTful, with a PostgreSQL database.

## Requirements

- Python 3.11.9 or higher
- Flask
- Flask-RESTful
- SQLAlchemy
- Flask-Bcrypt
- Flask-SQLAlchemy
- SQLAlchemy-Serializer
- Honcho

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Joseph-Chege/Travelly_App.git
    cd your-repo
    ```

2. **Create a virtual environment:**

    ```bash
    python3 -m venv venv
    ```

3. **Activate the virtual environment:**

    - On macOS and Linux:
    
        ```bash
        source venv/bin/activate
        ```

    - On Windows:
    
        ```bash
        venv\Scripts\activate
        ```

4. **Install the dependencies:**

    ```bash
    pip install honcho
    pip install -r requirements.txt
    ```

5. **Run the application from root directory:**

    ```bash
    honcho start -f Procfile.dev
    ```

## API Endpoints

### User Endpoints

- **Check Session:**
  - `GET /check_session`
  - Retrieves the current user's session information.

- **Sign Up:**
  - `POST /signup`
  - Creates a new user account.

- **Log In:**
  - `POST /login`
  - Authenticates a user and starts a session.

- **Logout:**
  - `DELETE /logout`
  - Logs out the current user and ends the session.

### Destination Endpoints

- **List Destinations:**
  - `GET /destinations`
  - Retrieves a list of all destinations.

- **Create Destination:**
  - `POST /destinations`
  - Creates a new destination (Admin only).

- **Retrieve Destination:**
  - `GET /destinations/<id>`
  - Retrieves a specific destination by ID.

- **Update Destination:**
  - `PUT /destinations/<id>`
  - Updates a specific destination by ID (Admin only).

- **Delete Destination:**
  - `DELETE /destinations/<id>`
  - Deletes a specific destination by ID (Admin only).

### Review Endpoints

- **List Reviews:**
  - `GET /reviews`
  - Retrieves a list of all reviews.

- **Create Review:**
  - `POST /reviews`
  - Creates a new review for a destination.

- **Retrieve Review:**
  - `GET /reviews/<id>`
  - Retrieves a specific review by ID.

- **Delete Review:**
  - `DELETE /reviews/<id>`
  - Deletes a specific review by ID.

## Models

- **User:**
  - `id`: Integer, primary key
  - `username`: String, unique
  - `_password_hash`: String
  - `email`: String, unique
  - `is_admin`: Boolean
  - `created_at`: DateTime, default to now

- **Destination:**
  - `id`: Integer, primary key
  - `name`: String
  - `image`: String
  - `description`: Text
  - `location`: String
  - `category`: String
  - `rating`: Integer
  - `price`: Integer
  - `created_at`: DateTime, default to now

- **Review:**
  - `id`: Integer, primary key
  - `comment`: Text
  - `created_at`: DateTime, default to now
  - `user_id`: Integer, foreign key to User
  - `destination_id`: Integer, foreign key to Destination


