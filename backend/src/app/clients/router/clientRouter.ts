import { Router } from 'express'
import { ClientService } from '../service/ClientService'
import { ClientRepository } from '../repository/ClientRepository'
import { PrismaClientRepository } from '../repository/PrismaClientRepository'
import { ClientController } from '../controller/ClientController'

export const router: Router = Router()
const clientRepository: ClientRepository = new PrismaClientRepository()
const clientService: ClientService = new ClientService(clientRepository)
const clientController: ClientController = new ClientController(clientService)

router
  .post('/', clientController.createClient.bind(clientController))
  .get('/', clientController.getAllClients.bind(clientController))
  .get('/:id', clientController.getClientById.bind(clientController))
  .put('/:id', clientController.updateClient.bind(clientController))
  .delete('/:id', clientController.deleteClient.bind(clientController))
