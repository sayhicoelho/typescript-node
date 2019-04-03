import { Job } from 'bee-queue'

export interface MailDataInterface {
  from: string,
  to: string,
  subject: string,
  html: string
}

export default interface MailJobInterface extends Job {
  data: MailDataInterface
}
