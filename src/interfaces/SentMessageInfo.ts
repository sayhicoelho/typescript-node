import SMTPConnection from 'nodemailer/lib/smtp-connection'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export default interface SentMessageInfo extends SMTPConnection.SentMessageInfo, SMTPTransport.SentMessageInfo { }
