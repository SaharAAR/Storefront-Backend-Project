import client from '../database'

export interface Product {
  id?: number
  name: string
  price: number
}
export class ProductInfo {
  async index (): Promise<Product[]> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT * FROM products;'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`${error} Cannot get products`)
    }
  }

  async show (id: string): Promise<Product> {
    try {
      const connection = await client.connect()
      const sql = `SELECT * FROM products WHERE id=${id};`
      const result = await connection.query(sql)
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`${error} Cannot get product with ID ${id}`)
    }
  }

  async create (product: Product): Promise<Product> {
    try {
      const connection = await client.connect()
      let sql = `INSERT INTO products (name, price) VALUES ('${product.name}','${product.price}')`
      let result = await connection.query(sql)
      sql = `SELECT * FROM products WHERE name='${product.name}';`
      result = await connection.query(sql)
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot create Product ${product.name}`)
    }
  }
}
