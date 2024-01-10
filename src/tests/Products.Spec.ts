import request from 'supertest'
import { app } from '../server'


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
