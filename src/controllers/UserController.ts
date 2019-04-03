import { Request, Response } from 'express'
import Queue from 'bee-queue'
import User from '../schemas/User'
import { MailDataInterface } from '../interfaces/MailJobInterface'
import * as env from '../.env'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await User.find({})

    return res.json(users)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const user = await User.create(req.body)

    return res.json(user)
  }

  public async sendMail (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const user = await User.findById(id)

    if (user) {
      const queue = new Queue('mailer')
      const retries = 3
      const data: MailDataInterface = {
        from: env.MAIL_NOREPLY,
        to: user.email,
        subject: 'TS Node test',
        html: 'Hello World!'
      }

      const job = queue.createJob(data)

      job.retries(retries).save()

      return res.json({ success: true, message: 'Email sent.' })
    }

    return res.status(404).json({ success: false, message: 'User not found.' })
  }
}

export default new UserController()
