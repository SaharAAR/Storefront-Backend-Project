"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = require("../models/Users");
const authenticate = express_1.default.Router();
authenticate.post('/authenticate', async (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    try {
        const userModel = new Users_1.UserInfo();
        const response = await userModel.authenticate(user);
        res.json(response);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = authenticate;
