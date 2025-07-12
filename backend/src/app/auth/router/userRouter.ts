import { Router } from 'express'
import { UserRepository } from '../repository/UserRepository'
import { PrismaUserRepository } from '../repository/PrismaUserRepository'
import { UserService } from '../service/UserService'
import { UserController } from '../controller/UserController'

export const router: Router = Router()
const userReposiroty: UserRepository = new PrismaUserRepository()
const userService: UserService = new UserService(userReposiroty)
const userController: UserController = new UserController(userService)

router
  .post('/', userController.registerUser.bind(userController))
  .post('/email', userController.loginUser.bind(userController))
