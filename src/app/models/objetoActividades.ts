import { listarActividadConsumo } from "./listarActividadConsumo";

export interface objetoActividades {
    numeroActividad: number;
    codigoPotrero: string;
    tipoActividad: string;
    fechaInicio: string;
    fechaFinal: string;
    usuarioLoggeado: string;
    actividadConsumo: listarActividadConsumo;

  }
