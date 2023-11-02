import { objeto } from './objeto';

export interface registroActividades {
  code: number;
  mensaje: string;
  numeroTransaccion: string;
  fecha: string;
  objeto: objeto;
  set: string;
}
