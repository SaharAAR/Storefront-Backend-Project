"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Products_1 = require("../models/Products");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const products = express_1.default.Router();
dotenv_1.default.config();
products.get('/', async (_req, res) => {
    try {
        const productModel = new Products_1.ProductInfo();
        const response = await productModel.index();
        res.json(response);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
products.get('/:id', async (req, res) => {
    try {
        const productModel = new Products_1.ProductInfo();
        const response = await productModel.show(req.params.id);
        res.json(response);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
products.post('/', async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price
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
        const productModel = new Products_1.ProductInfo();
        await productModel.create(product);
        res.send('product added');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = products;
