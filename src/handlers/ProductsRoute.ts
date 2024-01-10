import express from 'express'
import { ProductInfo, type Product } from '../models/Products'
import jwt, { type Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
const products = express.Router()
dotenv.config()

products.get('/', async (_req: express.Request, res: express.Response) => {
  try {
    const productModel = new ProductInfo()
    const response = await productModel.index()
    res.json(response)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
})

products.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const productModel = new ProductInfo()
    const response = await productModel.show(req.params.id)
    res.json(response)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
})

products.post('/', async (req: express.Request, res: express.Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price
  }

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
    const productModel = new ProductInfo()
    await productModel.create(product)
    res.send('product added')
  } catch (err) {
    res.status(400)
    res.json(err)
  }
})

export default products
