"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Orders_1 = require("../models/Orders");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const orders = express_1.default.Router();
dotenv_1.default.config();
orders.get('/', async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (error) {
        res.status(400);
        res.json(error);
        return;
    }
    try {
        const orderModel = new Orders_1.OrderInfo();
        const response = await orderModel.index();
        res.json(response);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
orders.get('/:id', async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (error) {
        res.status(400);
        res.json(error);
        return;
    }
    try {
        const orderModel = new Orders_1.OrderInfo();
        const response = await orderModel.show(req.params.id);
        res.json(response);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
orders.post('/', async (req, res) => {
    const order = {
        user_id: req.body.user_id,
        status: req.body.status
    };
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (error) {
        res.status(400);
        res.json(error);
        return;
    }
    try {
        const orderModel = new Orders_1.OrderInfo();
        await orderModel.create(order);
        res.send('order added');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = orders;
