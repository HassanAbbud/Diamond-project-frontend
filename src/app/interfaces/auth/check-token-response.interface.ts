import { User } from "./user.interface";

export interface CheckTokenResponse {
  usuario: User;
  token: string;
}
