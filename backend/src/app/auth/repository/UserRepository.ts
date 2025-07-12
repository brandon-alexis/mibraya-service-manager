import { User } from '../model/User'

export interface UserRepository {
  register(user: User): Promise<User>
  getByEmail(email: string): Promise<User | null>
}
