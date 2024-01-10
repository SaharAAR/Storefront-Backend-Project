import client from '../database'

import dotenv from 'dotenv'
import { type Product } from './Products'

dotenv.config()

export interface OrderProduct {
  id?: number
  order_id: number
  product_id: number
  quantity: number
}
export class OrderProductInfo {
  async getUserOrderedProducts (id: string): Promise<Product[]> {
    try {
      const connection = await client.connect()
      const sql = `SELECT * FROM products WHERE id IN (SELECT product_id FROM ordersProducts WHERE order_id=${id});`
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`${error} Cannot get user's order products`)
    }
  }

  async create (orderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const connection = await client.connect()

      const sql = ` INSERT INTO ordersProducts (order_id,product_id,quantity) VALUES ('${orderProduct.order_id}','${orderProduct.product_id}','${orderProduct.quantity}')`
      const result = await connection.query(sql)
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Cannot create order')
    }
  }
}
