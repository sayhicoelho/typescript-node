import { Schema, model } from 'mongoose'
import UserInterface from './../interfaces/UserInterface'

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})

UserSchema.methods.fullName = function (): string {
  return `${this.firstName} ${this.lastName}`
}

export default model<UserInterface>('User', UserSchema)
