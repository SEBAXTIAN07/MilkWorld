import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
export interface Product {
  id?: string;
  name?: string;
}

@Component({
  selector: 'app-potrero',
  templateUrl: './potrero.component.html',
  styleUrls: ['./potrero.component.css'],
  providers: [MessageService],
})
export class PotreroComponent {
  products!: Product[];
  items: MenuItem[] = [];
  stpe1: boolean = true; 
  stpe4: boolean = false; 
  stpe5: boolean = false; 
  stpe6: boolean = false; 
  
  constructor(public messageService: MessageService) {}

  ngOnInit() {
    this.products = [
      { id: '1', name: 'Prueba' },
      { id: '6', name: 'Prueba' },
    ];
  }

  validarStpe(numero: number) {



    numero == 1 ? (this.stpe1 = true) : (this.stpe1 = false);
    numero == 4 ? (this.stpe4 = true) : (this.stpe4 = false);
    numero == 5 ? (this.stpe5 = true) : (this.stpe5 = false);
    numero == 6 ? (this.stpe6 = true) : (this.stpe6 = false);
  }
}
