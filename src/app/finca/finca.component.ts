import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { responseValidarUsuario } from '../models/responseValidarUsuario';
import { finca } from '../models/finca';
import { responseListarFinca } from '../models/responseListarFinca';

interface Column {
  field: string;
  header: string;
}

export interface Product {
  id?: string;
  name?: string;
}

@Component({
  selector: 'app-finca',
  templateUrl: './finca.component.html',
  styleUrls: ['./finca.component.css'],
  providers: [MessageService],
})
export class FincaComponent implements OnInit {
  products!: Product[];
  responseValidarUsuario!: responseListarFinca;
  finca: finca = {
    id_persona: '',
    codigoFinca: '',
    nombreFinca: '',
    numeroTelefono: 0,
    codigoDepartamento: 0,
    codigoMunicipio: 0,
    nombreVereda: '',
    tipoOrdeno: '',
    numeroOrdenoDiario: 0,
    areaTotal: 0,
    usoSuplemento: '',
    potreros: [
      {
        nombrePotrero: '',
        areaPotrero: 0,
        capacidadMaximaForraje: 0,
        capacidadMaximaAgua: 0,
        cupoMaximoAnimales: 0,
        codigoPasto: 0,
        codigoFinca: '',
      },
    ],
  };
  seleccionarFinca = [this.finca];
  cols!: Column[];
  items: MenuItem[] = [];
  stpe1: boolean = true; // Inicialmente visible
  stpe2: boolean = false; // Inicialmente visible

  constructor(public messageService: MessageService) {}

  ngOnInit() {
    this.responseValidarUsuario = JSON.parse(
      localStorage.getItem('infoUsuario')!
    );
    this.seleccionarFinca = this.responseValidarUsuario.listaResultado;

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'name', header: 'Nombre' },
    ];

    this.products = [
      { id: '1', name: 'Finca 1' },
      { id: '6', name: 'Finca 2' },
    ];
  }

  validarStpe(numero: number) {
    numero == 1 ? (this.stpe1 = true) : (this.stpe1 = false);
    numero == 2 ? (this.stpe2 = true) : (this.stpe2 = false);
  }

  selectFinca(products: finca) {
    localStorage.setItem(
      'infoFinca',
      JSON.stringify(products)
    );
    // localStorage.setItem('NombreFinca', products.name!);
    (this.stpe1 = true) ? (this.stpe1 = false) : true;
    (this.stpe2 = true) ? (this.stpe2 = false) : true;
  }
}
