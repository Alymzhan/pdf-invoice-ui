export class UserResponse {
    User: User;
    message: string;
    status: boolean;
  }
  
  export class User {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    userName: string;
    password: string;
    token: string;
    name: string;
    phone_number: string;
    roles: Roles;
    isActive: boolean;
  }
  
  export class Roles {
    roles: string[];
  }