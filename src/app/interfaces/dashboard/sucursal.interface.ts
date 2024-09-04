import { User } from "../auth/user.interface";
import { Empresa } from "./empresa.interface";

export interface Sucursal {
  idSucursal?: number;
  empresa: Empresa;
  nombreSucursal: string;
  ciudad: string;
  estado: string;
  activo: boolean;
  usuario?: User;
}
