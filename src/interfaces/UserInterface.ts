import { Document } from 'mongoose'

export default interface UserInterface extends Document {
  email?: string,
  firstName?: string,
  lastName?: string,
  fullName(): string
}
