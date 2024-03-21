# Contacts Management System

This is a Node.js and Express application for managing contacts with user authentication. Each user can register, login, view their profile, and perform CRUD operations on their contacts.

## Features

- User Registration: Users can register by providing their email and password.
- User Login: Registered users can log in using their email and password.
- JWT Authentication: JSON Web Token (JWT) is used for user authentication.
- User Profile: Users can view their profile information, including their email and other details.
- Contact Management: Users can perform CRUD operations on their contacts (Create, Read, Update, Delete).

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt (Password hashing)
- Express Validator (Input validation)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bhupendrasambare/NodeJs-contacts-application.git
   ```

2. Navigate to the project directory:

   ```bash
   cd NodeJs-contacts-application
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   
   Create a `.env` file in the root directory and add the following variables:
   ```
    PORT=6000
    CONNECTION_STRING=mongodb+srv://root:password@curd.tnzons1.mongodb.net/curd
    ACCESS_TOKEN_SECRET=bhupendrasambarethewebdeveloper
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. Access the application in your browser at `http://localhost:6000`.

## API Endpoints

- POST /api/users/register - Register a new user.
- POST /api/users/login - Login a user.
- GET /api/users/profile - Get user profile.
- POST /api/contacts - Create a new contact.
- GET /api/contacts - Get all contacts of the authenticated user.
- GET /api/contacts/:id - Get a single contact by ID.
- PUT /api/contacts/:id - Update a contact by ID.
- DELETE /api/contacts/:id - Delete a contact by ID.

## Example CURL Commands

Replace `{{token}}` with the actual token obtained after login.

```bash
# Create a new contact
curl --location 'localhost:6000/api/contacts' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--data-raw '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890"
}'

# Get a contact by ID
curl --location 'localhost:6000/api/contacts/65fc9483396f24e092a87028' \
--header 'Authorization: Bearer {{token}}'

# Update a contact by ID
curl --location --request PUT 'localhost:6000/api/contacts/65fc9483396f24e092a87028' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{token}}' \
--data-raw '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phone": "1234567890"
}'

# Delete a contact by ID
curl --location --request DELETE 'localhost:6000/api/contacts/65f63193ea4beca9afd9a8c0' \
--header 'Authorization: Bearer {{token}}'

# Register a new user
curl --location 'localhost:6000/api/users/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName": "username",
    "email": "user@example.com",
    "password": "password",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "1234567890"
}'

# Login user
curl --location 'localhost:6000/api/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user@example.com",
    "password": "password"
}'

# Get all users
curl --location 'localhost:6000/api/users/get' \
--header 'Authorization: Bearer {{token}}'

# Get user profile
curl --location 'localhost:6000/api/users/profile' \
--header 'Authorization: Bearer {{token}}'
```

## Author

[Bhupendra sambare](https://github.com/bhupendrasambare)