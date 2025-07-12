export class UserAlreadyExists extends Error {
  constructor() {
    super('El usuario ya existe')
  }
}
