import { municipio } from './municipio';

export interface departamentos {
  codigoDepartamento: number;
  nombreDepartamento: number;
  listaMunicipios: [municipio];
}
