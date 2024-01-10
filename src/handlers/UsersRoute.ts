import express from 'express'
import { UserInfo, type User } from '../models/Users'
import authenticate from './UsersAuthenticate'
import jwt, { type Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
const users = express.Router()
dotenv.config()

users.use(authenticate)
users.get('/', async (req: express.Request, res: express.Response) => {
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
    const userModel = new UserInfo()
    const response = await userModel.index()
    res.json(response)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
})

users.get('/:id', async (req: express.Request, res: express.Response) => {
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
    const userModel = new UserInfo()
    const response = await userModel.show(req.params.id)
    res.json(response)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
})

users.post('/', async (req: express.Request, res: express.Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  }

  try {
    const userModel = new UserInfo()
    const newUser = await userModel.create(user)
    const secret = process.env.TOKEN_SECRET as Secret
    const token = jwt.sign(newUser, secret)
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
})

export default users
