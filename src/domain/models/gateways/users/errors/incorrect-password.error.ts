export class IncorrectUserPassword extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IncorrectUserPassword';
  }
}
