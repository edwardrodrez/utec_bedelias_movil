import { CarreraArea } from './carrera-area';
import { Curso } from './curso';

export interface Areadeestudio {
    idareadeestudio?:number,
    nombre:string,
    carrera_area:CarreraArea[],
    cursos:Curso[]
}
