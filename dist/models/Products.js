"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInfo = void 0;
const database_1 = __importDefault(require("../database"));
class ProductInfo {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM products;';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`${error} Cannot get products`);
        }
    }
    async show(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `SELECT * FROM products WHERE id=${id};`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`${error} Cannot get product with ID ${id}`);
        }
    }
    async create(product) {
        try {
            const connection = await database_1.default.connect();
            let sql = `INSERT INTO products (name, price) VALUES ('${product.name}','${product.price}')`;
            let result = await connection.query(sql);
            sql = `SELECT * FROM products WHERE name='${product.name}';`;
            result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot create Product ${product.name}`);
        }
    }
    async deleteAll() {
        let connection;
        try {
            connection = await database_1.default.connect();
            const sql = 'DELETE FROM products;';
            await connection.query(sql);
        }
        catch (error) {
            throw new Error(`Cannot delete all products: ${error}`);
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    }
}
exports.ProductInfo = ProductInfo;
