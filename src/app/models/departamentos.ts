import { municipio } from './municipio';

export interface departamentos {
  codigoDepartamento: string;
  nombreDepartamento: number;
  listaMunicipios: [municipio];
}
