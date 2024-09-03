import { User } from "../auth/user.interface";

export interface Empresa {
  idEmpresa?: number;
  claveEmpresa: string;
  nombreEmpresa: string;
  activo: boolean;
  usuario?: User;
}
