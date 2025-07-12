import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'

import { UserService } from '../service/UserService'
import { User } from '../model/User'
import { UserAlreadyExists, UserNotFound } from '../exception'
import { handleError } from '../../../shared/util/handleError'

export class UserController {
  constructor(private readonly userService: UserService) {}

  public async registerUser(req: Request, res: Response) {
    const { email, password }: { email: string; password: string } = req.body
    const userId = uuid()
    const newUser = new User(userId, email, password)

    try {
      const createdUser = await this.userService.registerUser(newUser)

      res
        .status(201)
        .json({ data: createdUser, message: 'Usuario creado con exito' })
    } catch (error) {
      if (error instanceof UserAlreadyExists) {
        return handleError(res, error.message)
      }

      handleError(res)
    }
  }

  public async loginUser(req: Request, res: Response) {
    const { email, password }: { email: string; password: string } = req.body

    const newUser = new User('', email, password)

    try {
      const foundUser = await this.userService.loginUser(newUser)

      res.status(200).json({ data: foundUser })
    } catch (error) {
      if (error instanceof UserNotFound) {
        handleError(res, error.message)
      }

      handleError(res)
    }
  }
}
