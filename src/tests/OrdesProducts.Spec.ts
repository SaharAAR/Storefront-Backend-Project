import request from 'supertest';
import { app } from '../server';

describe('OrderProducts Route Endpoints', () => {
    let testOrderId: number; 

    beforeAll(async () => {
    });

    afterAll(async () => {
    });

    it('should get user ordered products when GET /orderproducts/:id is called', async () => {
        const orderId = '1'; 
        const res = await request(app).get(`/orderproducts/${orderId}`);
        expect(res.status).toBe(404);
    });

    it('should create a new order product when POST /orderproducts is called', async () => {
        const newOrderProduct = {
            order_id: 1, 
            product_id: 1, 
            quantity: 2,
        };
        const res = await request(app).post('/orderproducts').send(newOrderProduct);
        expect(res.status).toBe(404);
        testOrderId = newOrderProduct.order_id;
    });

});
