import { Potrero } from './potrero';

export interface finca {
  id_persona: string;
  codigoFinca: string;
  nombreFinca: string;
  numeroTelefono: number;
  codigoDepartamento: number;
  codigoMunicipio: number;
  nombreVereda: string;
  tipoOrdeno: string;
  numeroOrdenoDiario: number;
  areaTotal: number;
  usoSuplemento: string;
  potreros: [Potrero];
}
