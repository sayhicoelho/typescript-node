import { Request, Response, NextFunction } from 'express'
import jwt from 'jwt-simple'
import moment from 'moment'
import * as env from '../.env'
import User from '../schemas/User'
import TokenPayloadInterface from '../interfaces/TokenPayloadInterface'

export default async function AuthMiddleware (req: Request, res: Response, next: NextFunction): Promise<Response> {
  let payload: TokenPayloadInterface = null

  const { authorization } = req.headers

  if (!authorization) return res.status(401).json({ message: 'Token missing.' })

  const token = authorization.split(' ')[1]

  try {
    payload = jwt.decode(token, env.JWT_SECRET)
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid.' })
  }

  if (payload.exp <= moment().unix()) return res.status(401).json({ message: 'Token expired.' })

  const user = await User.findById(payload.sub)

  if (!user) return res.status(404).json({ message: 'User not found.' })

  res.locals.user = user

  next()
}
