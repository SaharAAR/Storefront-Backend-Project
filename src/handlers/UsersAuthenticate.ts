import express from 'express'
import { UserInfo, type User } from '../models/Users'
const authenticate = express.Router()

authenticate.post(
  '/authenticate',
  async (req: express.Request, res: express.Response) => {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    }
    try {
      const userModel = new UserInfo()
      const response = await userModel.authenticate(user)
      res.json(response)
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  }
)

export default authenticate
