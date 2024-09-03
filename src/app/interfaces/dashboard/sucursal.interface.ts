import { User } from "../auth/user.interface";
import { Empresa } from "./empresa.interface";

export interface Sucursal {
  idSucursal?: number;
  empresa: Empresa; // Assuming you have imported the Empresa model
  nombreSucursal: string;
  ciudad: string;
  estado: string;
  activo: boolean;
  usuario?: User; // Assuming you have imported the User model
}
