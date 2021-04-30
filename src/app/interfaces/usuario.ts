import { Certificado } from './certificado';
import { Persona } from './persona';

export interface Usuario {
    idusuario?:number,
    password?:string,
    persona:Persona
}
