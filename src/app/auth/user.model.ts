import { Roles } from "../models/user.model";

export class User {
  constructor(
    public userName: string,
    public id: number,
    public roles: Roles,
    public name: string,
    public phone_number: string,
    public token: string,
    public tokenExpirationDate: Date,
  ) {}

  get userToken() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.token;
  }
}