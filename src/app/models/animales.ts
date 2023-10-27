import { Raza } from './raza';

export interface animales {
  numeroCrotal: string;
  nombreAnimal: string;
  fechaNacimiento: string;
  numeroPartos: number;
  codigoPotrero: string;
  raza: [Raza];
}
