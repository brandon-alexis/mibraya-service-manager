import { hash, compare } from 'bcrypt'

export const encryptPassword = async (password: string): Promise<string> => {
  const encryptedPassword = hash(password, 10)

  return encryptedPassword
}

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isValidPassword = compare(password, hashedPassword)

  return isValidPassword
}
