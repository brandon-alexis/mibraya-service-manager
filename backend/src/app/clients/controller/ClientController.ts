import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import { ClientService } from '../service/ClientService'
import { Client } from '../model/Client'
import { handleError } from '../../../shared/util/handleError'
import { ClientAlreadyExists, ClientNotFound } from '../exception'

export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  public async createClient(req: Request, res: Response) {
    const { name }: { name: string } = req.body
    const clientId = uuid()
    const client = new Client(clientId, name)

    try {
      const createdClient = await this.clientService.createClient(client)

      return res
        .status(201)
        .json({ data: createdClient, message: 'Cliente creado con exito' })
    } catch (error) {
      if (error instanceof ClientAlreadyExists) {
        return handleError(res, error.message, 400)
      }

      return handleError(res)
    }
  }

  public async getAllClients(req: Request, res: Response) {
    try {
      const foundClients = await this.clientService.getAllClients()

      return res.status(200).json({ data: foundClients })
    } catch (error) {
      return handleError(res)
    }
  }

  public async getClientById(req: Request, res: Response) {
    const { id } = req.params

    try {
      const foundClient = await this.clientService.getClientById(id)

      return res.status(200).json({ data: foundClient })
    } catch (error) {
      if (error instanceof ClientNotFound) {
        return handleError(res, error.message, 400)
      }

      return handleError(res)
    }
  }

  public async updateClient(req: Request, res: Response) {
    const { name }: { name: string } = req.body
    const { id } = req.params

    const client = new Client(id, name)

    try {
      const updatedClient = await this.clientService.updateClient(id, client)

      return res
        .status(201)
        .json({ data: updatedClient, message: 'Cliente actualizado con exito' })
    } catch (error) {
      if (error instanceof ClientNotFound) {
        return handleError(res, error.message, 400)
      }

      if (error instanceof ClientAlreadyExists) {
        return handleError(res, error.message, 400)
      }
      console.log(error)
      return handleError(res)
    }
  }

  public async deleteClient(req: Request, res: Response) {
    const { id } = req.params

    try {
      await this.clientService.deleteClient(id)

      return res.status(200).json({ message: 'Cliente eliminado con exito' })
    } catch (error) {
      if (error instanceof ClientNotFound) {
        return handleError(res, error.message, 400)
      }

      return handleError(res)
    }
  }
}
