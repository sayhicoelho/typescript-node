import bcrypt from 'bcryptjs'
import moment from 'moment'
import jwt from 'jwt-simple'
import User from '../schemas/User'
import * as env from '../.env'
import UserInterface from './../interfaces/UserInterface'
import TokenPayloadInterface from '../interfaces/TokenPayloadInterface'

class AuthService {
  private generateToken (user: UserInterface): string {
    const payload: TokenPayloadInterface = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(env.JWT_EXP, 'm').unix()
    }

    return jwt.encode(payload, env.JWT_SECRET)
  }

  public async getTokenAfterLogin (email: string, password: string): Promise<string> {
    const user = await User.findOne({ email }).select('+password')

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)

      if (isMatch) {
        return this.generateToken(user)
      }
    }

    return null
  }

  public async getTokenAfterRegister ({ firstName, lastName, email, password }): Promise<string> {
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10)
      })

      return this.generateToken(user)
    } catch (err) {
      return null
    }
  }
}

export default new AuthService()
