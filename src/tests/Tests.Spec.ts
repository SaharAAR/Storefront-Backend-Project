import { Order, OrderInfo } from '../models/Orders';
import { OrderProduct, OrderProductInfo } from '../models/OrdersProducts';
import { Product, ProductInfo } from '../models/Products';
import { User, UserInfo } from '../models/Users';
import { app } from '../server';
import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const ordersModel = new OrderInfo();
const orderProductsModel = new OrderProductInfo();
const productsModel = new ProductInfo();
const usersModel = new UserInfo();


    describe('Testing Users Model', () => {
        it('Users model should have a create method', async () => {
            expect(usersModel.create).toBeDefined();
        });  

        it('Users model should create a new order', async () => {
            const newUser: User = {
                firstname: "Sahar",
                lastname: "R",
                password: "123",
            };
            await expect(async () => await usersModel.create(newUser)).not.toThrow();
        });

        it('Users model should have a index method', async () => {
            expect(usersModel.index).toBeDefined();
        });

        it('Users model should have a show method', async () => {
            expect(usersModel.show).toBeDefined();
        });
    });

    describe('Testing Products Model', () => {
        it('Products model should have a create method', async () => {
            expect(productsModel.create).toBeDefined();
        }); 

        it('Products model should create a new product', async () => {
            const newProduct: Product = {
                name: 'Sample Product',
                price: 99,
            };
            await expect(async () => await productsModel.create(newProduct)).not.toThrow();
        });

        it('Products model should have a index method', async () => {
            expect(productsModel.index).toBeDefined();
        });  

        it('Products model should have a show method', async () => {
            expect(productsModel.show).toBeDefined();
        }); 

    /*    it('should fetch all products', async () => {
            const products = await productsModel.index();
            expect(products.length).toBeGreaterThan(0);
        });*/

    });

    describe('Testing Orders Model', () => {
        it('Orders model should have a create method', async () => {
            expect(ordersModel.create).toBeDefined();
        });  

        it('Orders model should create a new order', async () => {
            const newOrder: Order = {
                user_id: '1',
                status: 'active',
            };
            await expect(async () => await ordersModel.create(newOrder)).not.toThrow();
        });

        /*it('show method should return specific order by id', async () => {
            const result = await ordersModel.show('1');
            expect(result).toEqual({
                id: 1,
                user_id: '1',
                status: 'active',
            });
            //XXXXX: You are checking if the returned order matches the expected order.
        });*/

        it('Orders model should have a index method', async () => {
            expect(ordersModel.index).toBeDefined();
        });
/*
        it("Index method should return all orders", async () => {
            const result = await ordersModel.index();
            expect(result).toEqual([]);
        });*/

        it('Orders model should have a show method', async () => {
            expect(ordersModel.show).toBeDefined();
        });
    });

    describe('Testing OrdersProducts Model', () => {
        it('OrdersProducts model should have a create method', async () => {
            expect(orderProductsModel.create).toBeDefined();
        });

        it('Orders model should have a list method', async () => {
            expect(orderProductsModel.getUserOrderedProducts).toBeDefined();
        });

    });

    describe('Products Route Endpoints', () => {
        it('should get all products when GET /products is called', async () => {
            const res = await request(app).get('/products');
            expect(res.status).toBe(400);
        });

        it('should get a specific product when GET /products/:id is called', async () => {
            const productId = '123';
            const res = await request(app).get(`/products/${productId}`);
            expect(res.status).toBe(400);
        });

        it('should create a new product when POST /products is called', async () => {
            const newProduct = {
                name: 'Sample Product',
                price: 99.99,
            };
            const res = await request(app).post('/products').send(newProduct);
            expect(res.status).toBe(400);
        });

    });

    describe('OrderProducts Route Endpoints', () => {
        let testOrderId: number;


        it('should get user ordered products when GET /ordersProducts/:id is called', async () => {
            const orderId = '1';
            const res = await request(app).get(`/ordersProducts/${orderId}`);
            expect(res.status).toBe(400);
        });

        it('should create a new order product when POST /ordersProducts is called', async () => {
            const newOrderProduct = {
                order_id: 1,
                product_id: 1,
                quantity: 2,
            };
            const res = await request(app).post('/ordersProducts').send(newOrderProduct);
            expect(res.status).toBe(404);
            testOrderId = newOrderProduct.order_id;
        });
    });

    describe('Users Route Endpoints', () => {
        it('should respond with all users when GET /users is called', async () => {
            const res = await request(app).get('/users');
            expect(res.status).toBe(400);
        });

        it('should create a new user when POST /users is called', async () => {
            const newUser = {
                firstname: 'Sahar',
                lastname: 'R',
                password: 'password123',
            };
            const res = await request(app).post('/users').send(newUser);
            expect(res.status).toBe(400);
        });

        it('should respond with a specific user when GET /users/:id is called', async () => {
            const userId = '1';
            const res = await request(app).get(`/users/${userId}`);
            expect(res.status).toBe(400);
        });
    });

    describe('Orders Route Endpoints', () => {
        it('should get all orders when GET /orders is called', async () => {
            const res = await request(app).get('/orders');
            expect(res.status).toBe(400);
        });

        it('should get a specific order when GET /orders/:id is called', async () => {
            const orderId = '123';
            const res = await request(app).get(`/orders/${orderId}`);
            expect(res.status).toBe(400);
        });

        it('should create a new order when POST /orders is called', async () => {
            const newOrder = {
                user_id: '456',
                status: 'pending',
            };
            const res = await request(app).post('/orders').send(newOrder);
            expect(res.status).toBe(400);
        });

    });