"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = require("../models/Users");
const UsersAuthenticate_1 = __importDefault(require("./UsersAuthenticate"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const users = express_1.default.Router();
dotenv_1.default.config();
users.use(UsersAuthenticate_1.default);
users.get('/', async (req, res) => {
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
        const userModel = new Users_1.UserInfo();
        const response = await userModel.index();
        res.json(response);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
users.get('/:id', async (req, res) => {
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
        const userModel = new Users_1.UserInfo();
        const response = await userModel.show(req.params.id);
        res.json(response);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
users.post('/', async (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    try {
        const userModel = new Users_1.UserInfo();
        const newUser = await userModel.create(user);
        const secret = process.env.TOKEN_SECRET;
        const token = jsonwebtoken_1.default.sign(newUser, secret);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = users;
