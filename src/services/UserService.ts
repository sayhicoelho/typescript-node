import User from '../schemas/User'

class UserService {
  public async checkIfEmailExist (email: string): Promise<boolean> {
    const emailExist = await User.findOne({ email }).countDocuments()

    return emailExist > 0
  }
}

export default new UserService()
