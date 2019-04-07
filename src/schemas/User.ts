import { Schema, model } from 'mongoose'
import UserInterface from './../interfaces/UserInterface'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true,
    select: false
  }
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
