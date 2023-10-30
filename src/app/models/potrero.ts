import { animales } from './animales';

export interface Potrero {
  nombrePotrero: string;
  areaPotrero: number;
  capacidadMaximaForraje: number;
  capacidadMaximaAgua: number;
  cupoMaximoAnimales: number;
  codigoPasto: number;
  codigoFinca: string;
  animales?: [animales] ;
}
