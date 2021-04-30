import { Carrera } from './carrera';
import { Direccion } from './direccion';

export interface Sede {
    idsede?:number,
    nombre: string,
    direccion?:Direccion,
    carreras?:Carrera[]
}
