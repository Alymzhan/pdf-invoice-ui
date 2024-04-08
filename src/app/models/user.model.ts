export class UserResponse {
    User: Users;
    message: string;
    status: boolean;
  }

  export class UsersResponse {
    Users: Users[];
    message: string;
    status: boolean;
  }
  
  export class Users {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    userName: string;
    password: string;
    token: string;
    name: string;
    phone_number: string;
    config: Config;
    isActive: boolean;
  }

  export class Config {
    roles: string[];
    region: string[];
  }
