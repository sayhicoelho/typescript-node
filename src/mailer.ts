import nodemailer from 'nodemailer'
import { Options } from 'nodemailer/lib/smtp-transport'
import * as env from './.env'

const options: Options = {
  host: env.MAIL_HOST,
  port: env.MAIL_PORT,
  secure: env.MAIL_SECURE,
  auth: {
    user: env.MAIL_USERNAME,
    pass: env.MAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: env.MAIL_REJECT_UNAUTHORIZED,
    ciphers: env.MAIL_CIPHERS
  }
}

export default nodemailer.createTransport(options)
