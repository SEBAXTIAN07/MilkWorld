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
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
  providers: [MessageService],
})
export class ActividadesComponent implements OnInit {
  products!: Product[];
  fechaHoy!: Date;
  cols!: Column[];
  items: MenuItem[] = [];
  constructor() {
    this.fechaHoy = new Date();
  }
  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'name', header: 'Nombre' },
    ];

    this.products = [
      { id: '1', name: 'Finca 1' },
      { id: '6', name: 'Finca 2' },
    ];
  }
}
