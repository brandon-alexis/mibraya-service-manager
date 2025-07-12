export class UserInvalid extends Error {
  constructor() {
    super('Usuario o contraseña incorrecta')
  }
}
