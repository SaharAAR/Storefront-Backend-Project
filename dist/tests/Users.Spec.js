"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
describe('Users Route Endpoints', () => {
    it('should respond with all users when GET /users is called', async () => {
        const res = await (0, supertest_1.default)(server_1.app).get('/users');
        expect(res.status).toBe(400);
    });
    it('should respond with a specific user when GET /users/:id is called', async () => {
        const userId = '123';
        const res = await (0, supertest_1.default)(server_1.app).get(`/users/${userId}`);
        expect(res.status).toBe(400);
    });
    it('should create a new user when POST /users is called', async () => {
        const newUser = {
            firstname: 'John',
            lastname: 'Doe',
            password: 'password123'
        };
        const res = await (0, supertest_1.default)(server_1.app).post('/users').send(newUser);
        expect(res.status).toBe(400);
    });
});
