import { departamentos } from './departamentos';

export interface responseDepartamento {
  code: number;
  mensaje: string;
  numeroTransaccion: string;
  listaResultado: [departamentos];
}
