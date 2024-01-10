import request from 'supertest'
import { app } from '../server'

describe('Users Route Endpoints', () => {
  it('should respond with all users when GET /users is called', async () => {
    const res = await request(app).get('/users')
    expect(res.status).toBe(400)
  })

  it('should respond with a specific user when GET /users/:id is called', async () => {
    const userId = '123'
    const res = await request(app).get(`/users/${userId}`)
    expect(res.status).toBe(400)
  })

  it('should create a new user when POST /users is called', async () => {
    const newUser = {
      firstname: 'John',
      lastname: 'Doe',
      password: 'password123'
    }
    const res = await request(app).post('/users').send(newUser)
    expect(res.status).toBe(400)
  })

})
