import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'
import * as env from './.env'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(cors())
  }

  private database (): void {
    mongoose.connect(`mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`, {
      user: env.DB_USER,
      pass: env.DB_PASS,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  }

  private routes (): void {
    this.express.use(router)
  }
}

export default new App().express
