import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

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

  cols!: Column[];
  items: MenuItem[] = [];
  stpe1: boolean = true; // Inicialmente visible
  stpe2: boolean = false; // Inicialmente visible

  constructor(public messageService: MessageService) {}

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'name', header: 'Nombre' },
    ];

    this.products = [
      { id: '1', name: 'Deiby Me lo Chupa' },
      { id: '6', name: 'Sebas' },
    ];
  }

  validarStpe(numero: number) {
    console.log(numero);
    numero == 1 ? (this.stpe1 = true) : (this.stpe1 = false);
    numero == 2 ? (this.stpe2 = true) : (this.stpe2 = false);
  }

  selectFinca(products: Product) {
    console.log(products.id);
    localStorage.setItem('NombreFinca', products.name!);
    (this.stpe1 = true) ? (this.stpe1 = false) : true;
    (this.stpe2 = true) ? (this.stpe2 = false) : true;
  }
}
