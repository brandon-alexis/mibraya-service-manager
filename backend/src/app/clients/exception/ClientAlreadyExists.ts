export class ClientAlreadyExists extends Error {
  constructor() {
    super('El cliente ya existe')
  }
}
