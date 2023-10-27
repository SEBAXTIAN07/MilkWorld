import { animales } from './animales';

export interface Potrero {
  codigoPotrero: string;
  nombrePotrero: string;
  areaPotrero: number;
  capacidadMaximaForraje: number;
  capacidadMaximaAgua: number;
  cupoMaximoAnimales: number;
  codigoPasto: number;
  codigoFinca: string;
  animales: [animales];
}
