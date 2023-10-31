import { Raza } from './raza';

export interface animalesLista {
  codigoPotrero: string;
  numeroCrotal: string;
  nombreAnimal: string;
  fechaNacimiento: string;
  numeroPartos: number;
  raza: Raza;
}
