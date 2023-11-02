import { potreroCodigo } from "./potreroCodigo";

export interface fincaCodigo {
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
    potreros: [potreroCodigo];
  }
  