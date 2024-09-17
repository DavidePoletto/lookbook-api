# LookBook API

LookBook is an application for selling and swapping second-hand clothing. This RESTful API allows for managing users, products, and swap orders, providing a scalable backend for the LookBook project.

## Features

- User management (create, update, delete)
- Product management (create, update, delete)
- Swap order management (create, update, delete)
- Filtering swap orders by date or product
- Uses MySQL and MongoDB as databases
- Security with prepared statements to prevent SQL Injection and protection against NoSQL Injection

## Technologies Used

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **MySQL** with **mysql2**
- **dotenv** for environment variable management

## Requirements

- **Node.js** version 16.x or higher
- **MySQL** version 8.x or higher
- **MongoDB** version 4.x or higher

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/lookbook-api.git
   cd lookbook-api

2. Install dependencies:

    npm install

3. Create a .env file in the project root and configure the environment variables:
    # .env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=simplepass
    DB_NAME=lookbook

    MONGO_URI=mongodb://localhost:27017/lookbook
    PORT=3000

4. Run the MySQL migrations to create the tables:

    mysql -u root -p lookbook < migrations.sql

## Running the Project

1. Start MongoDB and MySQL.

2. Start the application:
    npm start

3. The server will listen on http://localhost:3000

## API Example

### Create a New User

POST /api/users
Content-Type: application/json

{
  "firstName": "Mario",
  "lastName": "Rossi",
  "email": "mario.rossi@example.com"
}

### Get All Users

GET /api/users

### Create a New Product

POST /api/products
Content-Type: application/json

{
  "name": "Vintage T-shirt",
  "photos": ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"]
}

### Get All Products

GET /api/products

### Create a New Swap Order

POST /api/swaporders
Content-Type: application/json

{
  - "user1": "64a76d9e8c07b32a58e5f129",
  - "user2": "64a76e1b8c07b32a58e5f130",
  - "product1": "64a77a5c8c07b32a58e5f131",
  - "product2": "64a77a7a8c07b32a58e5f132"
}

### Filter Swap Orders by Date

GET /api/swaporders?startDate=2024-01-01&endDate=2024-12-31

### Project Structure
- app.js: Main entry point of the application.
- routes/: Contains all the API routes for users, products, and swap orders.
- models/: Contains the Mongoose models and MySQL configuration.
- migrations.sql: Script for creating MySQL tables.
- controllers/: Contains the logic for managing the APIs (if applicable).

### Security
- SQL Injection: MySQL queries are protected using prepared statements.
- NoSQL Injection: MongoDB queries are handled using Mongoose, which provides protection against NoSQL Injection attacks.

### Contributions

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License
This project is licensed under the MIT License.

