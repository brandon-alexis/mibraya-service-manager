import { PrismaClient } from '@prisma/client'
import { UserRepository } from './UserRepository'
import { User } from '../model/User'

export class PrismaUserRepository implements UserRepository {
  private client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }

  public async register(user: User): Promise<User> {
    const createdUser = await this.client.user.create({
      data: {
        id: user.getId(),
        email: user.getEmail(),
        password: user.getPassword(),
      },
    })

    const newUser = new User(
      createdUser.id,
      createdUser.email,
      createdUser.password
    )

    return newUser
  }

  public async getByEmail(email: string): Promise<User | null> {
    const foundUser = await this.client.user.findFirst({
      where: { email },
    })

    if (!foundUser) {
      return null
    }

    const newUser = new User(foundUser.id, foundUser.email, foundUser.password)

    return newUser
  }
}
