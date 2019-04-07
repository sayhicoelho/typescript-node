import { Request, Response } from 'express'
import AuthService from '../services/AuthService'
import UserService from '../services/UserService'

class AuthController {
  public async login (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const token = await AuthService.getTokenAfterLogin(email, password)

    if (token) return res.json({ token })

    return res.status(401).json({ message: 'Email or password incorrect.' })
  }

  public async register (req: Request, res: Response): Promise<Response> {
    const emailExist = await UserService.checkIfEmailExist(req.body.email)

    if (emailExist) return res.status(400).json({ message: 'Email has already been taken.' })

    const token = await AuthService.getTokenAfterRegister(req.body)

    if (token) return res.json({ token })

    return res.status(400).json({ message: 'Bad request.' })
  }

  public async forgotPassword (req: Request, res: Response): Promise<Response> {
    // Send password reset code to user email.
    return res.json({ success: true })
  }

  public async resetPassword (req: Request, res: Response): Promise<Response> {
    // Update user password.
    return res.json({ success: true })
  }

  public async logout (req: Request, res: Response): Promise<Response> {
    // TODO: Remove current session from user sessions.
    return res.json({ success: true })
  }

  public async getAuthUser (req: Request, res: Response): Promise<Response> {
    const { user } = res.locals

    return res.json({ user })
  }
}

export default new AuthController()
