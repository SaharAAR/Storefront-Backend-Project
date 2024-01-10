### Storefront Backend Project
Welcome to the Storefront Backend Project! This repository contains a basic Node.js and Express application that serves as a starting point for building an API.

## Getting Started
To get started with the project, follow these steps:

# Prerequisites
Ensure you have the following installed:

- Node.js
- PostgreSQL

# Installation

1. Clone this repository to your local machine.
2. Run the command yarn in your terminal at the project root to install dependencies.

# Database Schema

1. products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
);


2. users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

3. orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    status VARCHAR(20) NOT NULL
);

4. ordersProducts (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


# Backend and Database Ports

- Backend Port: 3000
- Database Port: 5432

# Database Migrations

- Run database migrations using db-migrate up to set up your database schema.

 
## Running the Project
1. Start the server by running yarn start.
2. Access the main endpoint at (/).
3. Explore and interact with the endpoints:	
	- Products: http://localhost:3000/products		
	- Users: http://localhost:3000/users
	- Orders: http://localhost:3000/orders

# Required Technologies
This application uses the following technologies:

- PostgreSQL for the database
- Node.js/Express for the application logic
- dotenv for managing environment variables
- db-migrate for database migrations
- jsonwebtoken for working with JWTs
- jasmine for testing