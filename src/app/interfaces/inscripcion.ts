import { Persona } from './persona';

export interface Inscripcion {
    idInscripcion?:number,
    persona:Persona,
    ci:string,
    estado:string,
    escolaridad:string,
    carnetSalud:string,
    idperiododeinscripciones?:number
}
