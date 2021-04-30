import { Previa } from './previa';
import { Tiposdecurso } from './tipodecurso';

export interface Curso {
    idcurso?:number,
    credito:number,
    nombre:string,
    idareadeestudio?:number,
    idtiposDeCurso?:number,
    tipo_de_curso?:Tiposdecurso,
    previas:Previa[]
}
