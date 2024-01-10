import express from 'express'
import jwt, { type Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { OrderProductInfo } from '../models/OrdersProducts'
const ordersProducts = express.Router()
dotenv.config()

ordersProducts.get(
  '/:id',
  async (req: express.Request, res: express.Response) => {
    try {
      const authorizationHeader = req.headers.authorization!
      const token = authorizationHeader.split(' ')[1]
      jwt.verify(token, process.env.TOKEN_SECRET as Secret)
    } catch (error) {
      res.status(400)
      res.json(error)
      return
    }

    try {
      const ordersProductsModel = new OrderProductInfo()
      const response = await ordersProductsModel.getUserOrderedProducts(
        req.params.id
      )
      res.json(response)
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  }
)

export default ordersProducts
