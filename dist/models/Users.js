"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UserInfo {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM users;';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`${error} Cannot get users`);
        }
    }
    async show(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `SELECT * FROM users WHERE id=${id};`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`${error} Cannot get user with ID ${id}`);
        }
    }
    async create(user) {
        try {
            const connection = await database_1.default.connect();
            const hashPassword = bcrypt_1.default.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
            let sql = `INSERT INTO users (firstName, lastName, password) VALUES ('${user.firstname}','${user.lastname}','${hashPassword}');`;
            let result = await connection.query(sql);
            sql = `SELECT * FROM users WHERE firstName='${user.firstname}';`;
            result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot create User ${user.firstname}`);
        }
    }
    async authenticate(user) {
        try {
            const connection = await database_1.default.connect();
            const sql = `SELECT password FROM users WHERE firstName='${user.firstname}';`;
            const result = await connection.query(sql);
            if (result.rows.length > 0) {
                const foundUser = result.rows[0];
                console.log(user);
                if (bcrypt_1.default.compareSync(user.password + BCRYPT_PASSWORD, foundUser.password)) {
                    return foundUser;
                }
            }
            return null;
        }
        catch (error) {
            throw new Error(`User (${user.firstname}) could not be authenticated`);
        }
    }
}
exports.UserInfo = UserInfo;
