import { objetoRespuestaActiviades } from "./objetoRespuestaActiviades";


export interface respuestaGenericaActividades {
    code: number;
    mensaje: string;
    numeroTransaccion: string;
    listaResultado: [];
    fecha: string;
    objeto: objetoRespuestaActiviades;
    set: string;
  }
  