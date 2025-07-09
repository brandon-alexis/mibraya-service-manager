import { Client } from '../model/Client'

export interface ClientRepository {
  create(client: Client): Promise<Client>
  getAll(): Promise<Client[]>
  getById(id: string): Promise<Client | null>
  update(id: string, client: Client): Promise<Client>
  delete(id: string): Promise<void>
}
