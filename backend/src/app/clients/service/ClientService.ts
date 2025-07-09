import { ClientAlreadyExists, ClientNotFound } from '../exception'
import { Client } from '../model/Client'
import { ClientRepository } from '../repository/ClientRepository'

export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async createClient(client: Client): Promise<Client> {
    const foundClients = await this.clientRepository.getAll()

    const foundClient = foundClients.find(
      (_client) => _client.getName() == client.getName()
    )

    if (foundClient) {
      throw new ClientAlreadyExists()
    }

    const createdClient = await this.clientRepository.create(client)

    return createdClient
  }

  public async getAllClients(): Promise<Client[]> {
    const foundClients = await this.clientRepository.getAll()

    return foundClients
  }

  public async getClientById(id: string): Promise<Client> {
    const foundClient = await this.clientRepository.getById(id)

    if (!foundClient) {
      throw new ClientNotFound()
    }

    return foundClient
  }

  public async updateClient(id: string, client: Client): Promise<Client> {
    const foundClient = await this.clientRepository.getById(id)

    if (!foundClient) {
      throw new ClientNotFound()
    }

    const foundClients = await this.clientRepository.getAll()

    const foundClientByName = foundClients.find(
      (_client) => _client.getName() == client.getName()
    )

    if (foundClientByName) {
      throw new ClientAlreadyExists()
    }

    const updatedClient = await this.clientRepository.update(id, client)

    return updatedClient
  }

  public async deleteClient(id: string): Promise<void> {
    const foundClient = await this.clientRepository.getById(id)

    if (!foundClient) {
      throw new ClientNotFound()
    }

    await this.clientRepository.delete(id)
  }
}
