export class UserNotExist extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Usernotexist';
  }
}
