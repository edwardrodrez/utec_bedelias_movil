import { Direccion } from './direccion';

export interface Persona {
    ci:string,
    nombre:string,
    apellido:string,
    correo:string,
    telefono:string,
    fechaDeNacimiento:string,
    sexo:string,
    direccion:Direccion,
    idusuario?:number,
    idinscripcion?:number
}
