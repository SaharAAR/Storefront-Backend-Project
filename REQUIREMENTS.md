# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints & Routes
#### Products
- Index [GET] Route: /products
- Show [GET] Route:  /products/:id
- Create [token required] [POST] Route: /products 


#### Users
- Index [token required] [GET] Route: /users
- Show [token required] [GET] Route: /users/:id
- Create [token required] [POST] Route: /users/:id 
  Body parameters:
  firstname (string). lastname (string), password (string).

#### Orders
- Index [token required] [GET] Route: /orders
- Show [token required] [GET] Route: /orders/:id
- Create [token required] [POST] Route: /orders/:id

- Current Order by user (args: user id)[token required] [GET] Route:/orders/:id
- Get Ordered Products by Order ID [token required] [GET] Route: /ordersProducts/:id

## Data Shapes
#### Products
-  id
- name
- price

#### Users
- id
- firstName
- lastName
- password

### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

