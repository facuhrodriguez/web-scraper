export class PageNotExist extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PageNotExist';
  }
}
