export class User {
  constructor(
    private readonly id: string,
    private email: string,
    private password: string
  ) {}

  public getId(): string {
    return this.id
  }

  public getEmail(): string {
    return this.email
  }

  public setEmail(email: string) {
    this.email = email
  }

  public getPassword(): string {
    return this.password
  }

  public setPassword(password: string) {
    this.password = password
  }
}
