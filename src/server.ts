import express, { type Request, type Response } from 'express'
import bodyParser from 'body-parser'
import products from './handlers/ProductsRoute'
import users from './handlers/UsersRoute'
import orders from './handlers/OrdersRoute'
import cors from 'cors'
import ordersProducts from './handlers/OrdersProductsRoute'

const app: express.Application = express()
const address: string = '0.0.0.0:3000'

app.use(bodyParser.json())
app.use(cors())

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})

app.use('/products', products)
app.use('/users', users)
app.use('/orders', orders)
app.use('/ordersProducts', ordersProducts)
export { app }
