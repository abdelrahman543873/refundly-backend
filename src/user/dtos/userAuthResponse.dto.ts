export class UserAuthResponse {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  companyId?: number;
  token: string;
}
