import { Client } from '../model/Client'
import { ClientRepository } from './ClientRepository'

import { PrismaClient } from '@prisma/client'

export class PrismaClientRepository implements ClientRepository {
  private client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }

  public async create(client: Client): Promise<Client> {
    const createdClient = await this.client.client.create({
      data: {
        id: client.getId(),
        name: client.getName(),
      },
    })

    const newClient = new Client(createdClient.id, createdClient.name)

    return newClient
  }

  public async getAll(): Promise<Client[]> {
    const foundClients = await this.client.client.findMany()

    const clients: Client[] = foundClients.map(({ id, name }) => {
      return new Client(id, name)
    })

    return clients
  }

  public async getById(id: string): Promise<Client | null> {
    const foundClient = await this.client.client.findFirst({ where: { id } })

    if (!foundClient) {
      return null
    }

    const client = new Client(foundClient.id, foundClient.name)

    return client
  }

  public async update(id: string, client: Client): Promise<Client> {
    const updatedClient = await this.client.client.update({
      where: { id },
      data: {
        id: client.getId(),
        name: client.getName(),
      },
    })

    const newClient = new Client(updatedClient.id, updatedClient.name)

    return newClient
  }

  public async delete(id: string): Promise<void> {
    await this.client.client.delete({ where: { id } })
  }
}
