"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductInfo = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class OrderProductInfo {
    async getUserOrderedProducts(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `SELECT * FROM products WHERE id IN (SELECT product_id FROM ordersProducts WHERE order_id=${id});`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`${error} Cannot get user's order products`);
        }
    }
    async create(orderProduct) {
        try {
            const connection = await database_1.default.connect();
            const sql = ` INSERT INTO ordersProducts (order_id,product_id,quantity) VALUES ('${orderProduct.order_id}','${orderProduct.product_id}','${orderProduct.quantity}')`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error('Cannot create order');
        }
    }
}
exports.OrderProductInfo = OrderProductInfo;
