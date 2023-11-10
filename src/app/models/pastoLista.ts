import { pasto } from './pasto';

export interface pastoLista {
  code: number;
  mensaje: string;
  numeroTransaccion: string;
  listaResultado: [pasto];
  fecha: string;
  objeto: string;
  set: string;
}
