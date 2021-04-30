import { Curso } from './curso';

export interface Previa {
    idprevia?:number,
    tipoPrevia:string,
    idcurso?:number,
    idcursoprevio?:number,
    idcarrera?:number,
    curso?:Curso
}
