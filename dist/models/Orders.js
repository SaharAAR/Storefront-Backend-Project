"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderInfo = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class OrderInfo {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM orders;';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`${error} Cannot get the orders`);
        }
    }
    async show(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE id=${id};`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`${error} Cannot get order with ID ${id}`);
        }
    }
    async create(order) {
        try {
            const connection = await database_1.default.connect();
            let sql = `INSERT INTO orders (user_id,status) VALUES ('${order.user_id}','${order.status}')`;
            let result = await connection.query(sql);
            sql = `SELECT * FROM orders WHERE user_id='${order.user_id}';`;
            result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot create order ${order.user_id}`);
        }
    }
}
exports.OrderInfo = OrderInfo;
