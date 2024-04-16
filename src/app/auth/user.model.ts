export class User {
  constructor(
    public userName: string,
    public id: number,
    public name: string,
    public phone_number: string,
    public config: {
      roles: string[];
      region: string[];
    },
    public token: string,
    public tokenExpirationDate: Date,
  ) {}

  get userToken() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.token;
  }

  get isAdmin():boolean {
    return this.config.roles.includes('Core') || this.config.roles.includes('Root') || false;
  } 
}

export class Config {
  roles: string[];
  region: string[];
}