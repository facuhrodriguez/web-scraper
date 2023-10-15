export class PageInvalid extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PageInvalid';
  }
}
