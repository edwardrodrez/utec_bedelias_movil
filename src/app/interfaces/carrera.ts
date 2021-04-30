import { Curso } from './curso';


export interface Carrera {
    idcarrera?:number,
    creditoMinimo:number,
    nombre:string,
    cursos?:Curso[]
}
