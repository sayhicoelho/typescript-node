import { Request, Response, NextFunction } from 'express'

export default function GuestMiddleware (req: Request, res: Response, next: NextFunction): Response {
  const { authorization } = req.headers

  if (authorization) return res.status(401).json({ message: 'You are already logged in.' })

  next()
}
