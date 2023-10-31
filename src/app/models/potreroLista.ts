import { animalesLista } from './animalesLista';

export interface PotreroLista {
  nombrePotrero: string;
  areaPotrero: number;
  capacidadMaximaForraje: number;
  capacidadMaximaAgua: number;
  cupoMaximoAnimales: number;
  codigoPasto: number;
  codigoFinca: string;
  animales?: [animalesLista] ;
}
