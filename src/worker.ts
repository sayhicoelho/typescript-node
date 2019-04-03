import Queue, { DoneCallback } from 'bee-queue'
import { SendMailOptions } from 'nodemailer'
import MailJobInterface from './interfaces/MailJobInterface'
import SentMessageInfo from './interfaces/SentMessageInfo'
import transporter from './mailer'

const queue = new Queue('mailer')

queue.on('ready', (): void => {
  queue.process<void>((job: MailJobInterface, done: DoneCallback<void>): void => {
    console.log('processing job: ' + job.id)

    const mailOptions: SendMailOptions = {
      from: job.data.from,
      to: job.data.to,
      subject: job.data.subject,
      html: job.data.html
    }

    transporter.sendMail(mailOptions, (err: Error, info: SentMessageInfo) => {
      if (err) {
        return console.error(err, info)
      }

      done(err)
    })
  })
})

console.log('processing jobs...')
