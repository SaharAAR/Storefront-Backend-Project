"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
describe('Products Route Endpoints', () => {
    it('should get all products when GET /products is called', async () => {
        const res = await (0, supertest_1.default)(server_1.app).get('/products');
        expect(res.status).toBe(400);
    });
    it('should get a specific product when GET /products/:id is called', async () => {
        const productId = '123';
        const res = await (0, supertest_1.default)(server_1.app).get(`/products/${productId}`);
        expect(res.status).toBe(400);
    });
    it('should create a new product when POST /products is called', async () => {
        const newProduct = {
            name: 'Sample Product',
            price: 99.99,
        };
        const res = await (0, supertest_1.default)(server_1.app).post('/products').send(newProduct);
        expect(res.status).toBe(400);
    });
});
