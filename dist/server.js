"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const ProductsRoute_1 = __importDefault(require("./handlers/ProductsRoute"));
const UsersRoute_1 = __importDefault(require("./handlers/UsersRoute"));
const OrdersRoute_1 = __importDefault(require("./handlers/OrdersRoute"));
const cors_1 = __importDefault(require("cors"));
const OrdersProductsRoute_1 = __importDefault(require("./handlers/OrdersProductsRoute"));
const app = (0, express_1.default)();
exports.app = app;
const address = '0.0.0.0:3000';
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
app.use('/products', ProductsRoute_1.default);
app.use('/users', UsersRoute_1.default);
app.use('/orders', OrdersRoute_1.default);
app.use('/ordersProducts', OrdersProductsRoute_1.default);
