import { finca } from "./finca";

export interface responseListarFinca {
  code: number;
  mensaje: string;
  numeroTransaccion: string;
  listaResultado: [finca];
  fecha: string;
  objeto: string;
  set: string;
}
