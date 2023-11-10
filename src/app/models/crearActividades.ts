import { actividadConsumo } from "./actividadConsumo";

export interface crearActividades {
  codigoPotrero: string;
  tipoActividad: string;
  fechaInicio: string;
  fechaFinal: string;
  usuarioLoggeado: string;
  actividadConsumo: actividadConsumo;
}
