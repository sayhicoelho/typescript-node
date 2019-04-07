import User from '../schemas/User'

class UserService {
  public async checkIfEmailExists (email: string): Promise<boolean> {
    const emailExists = await User.findOne({ email }).countDocuments()

    return emailExists > 0
  }
}

export default new UserService()
