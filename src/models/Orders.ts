import client from '../database'
import dotenv from 'dotenv'

dotenv.config()

export interface Order {
  id?: number
  user_id: string
  status: string
}
export class OrderInfo {
  async index (): Promise<Order[]> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT * FROM orders;'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`${error} Cannot get the orders`)
    }
  }

  async show (id: string): Promise<Order> {
    try {
      const connection = await client.connect()
      const sql = `SELECT * FROM orders WHERE id=${id};`
      const result = await connection.query(sql)
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`${error} Cannot get order with ID ${id}`)
    }
  }

  async create (order: Order): Promise<Order> {
    try {
      const connection = await client.connect()
      let sql = `INSERT INTO orders (user_id,status) VALUES ('${order.user_id}','${order.status}')`
      let result = await connection.query(sql)
      sql = `SELECT * FROM orders WHERE user_id='${order.user_id}';`
      result = await connection.query(sql)
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot create order ${order.user_id}`)
    }
  }
}
