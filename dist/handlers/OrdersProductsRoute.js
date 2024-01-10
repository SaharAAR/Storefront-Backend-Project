"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const OrdersProducts_1 = require("../models/OrdersProducts");
const ordersProducts = express_1.default.Router();
dotenv_1.default.config();
ordersProducts.get('/:id', async (req, res) => {
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
        const ordersProductsModel = new OrdersProducts_1.OrderProductInfo();
        const response = await ordersProductsModel.getUserOrderedProducts(req.params.id);
        res.json(response);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = ordersProducts;
