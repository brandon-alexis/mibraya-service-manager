import { UserAlreadyExists, UserNotFound } from '../exception'
import { User } from '../model/User'
import { UserRepository } from '../repository/UserRepository'
import {
  encryptPassword,
  verifyPassword,
} from '../../../shared/util/handlePassword'
import { UserInvalid } from '../exception/UserInvalid'

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async registerUser(user: User): Promise<User> {
    const userEmail = user.getEmail()
    const foundUser = await this.userRepository.getByEmail(userEmail)

    if (foundUser) {
      throw new UserAlreadyExists()
    }

    const userPassword = user.getPassword()
    const hashedPassword = await encryptPassword(userPassword)

    user.setPassword(hashedPassword)

    const newUser = new User(user.getId(), user.getEmail(), user.getPassword())

    return newUser
  }

  public async loginUser(user: User): Promise<User> {
    const foundUser = await this.userRepository.getByEmail(user.getEmail())

    if (!foundUser) {
      throw new UserNotFound()
    }

    const isPasswordValid = await verifyPassword(
      user.getPassword(),
      foundUser.getPassword()
    )

    if (!isPasswordValid) {
      throw new UserInvalid()
    }

    const newUser = new User(
      foundUser.getId(),
      foundUser.getEmail(),
      foundUser.getPassword()
    )

    return newUser
  }
}
