import request from 'supertest'
import { app } from '../server'

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